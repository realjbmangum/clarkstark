import type { APIRoute } from 'astro';

export const prerender = false;

// GET - get supplements and daily log
export const GET: APIRoute = async ({ url, locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const date = url.searchParams.get('date');

  try {
    // Get all supplements
    const supplements = await db.prepare(`
      SELECT * FROM supplements ORDER BY timing, name
    `).all();

    let taken: number[] = [];

    if (date) {
      // Get which supplements were taken on this date
      const checklist = await db.prepare(`
        SELECT supplements_taken FROM daily_checklist WHERE date = ?
      `).bind(date).first();

      if (checklist?.supplements_taken) {
        try {
          taken = JSON.parse(checklist.supplements_taken);
        } catch {}
      }
    }

    return new Response(JSON.stringify({
      supplements: supplements.results,
      taken
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching supplements:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch supplements' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - create, update, delete supplements or log daily intake
export const POST: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.json();
    const { action } = data;

    if (action === 'create') {
      // Create new supplement
      const { name, dosage, timing, notes, active } = data;
      await db.prepare(`
        INSERT INTO supplements (name, dosage, timing, notes, active)
        VALUES (?, ?, ?, ?, ?)
      `).bind(name, dosage, timing, notes, active ? 1 : 0).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'update') {
      // Update supplement
      const { id, name, dosage, timing, notes, active } = data;
      await db.prepare(`
        UPDATE supplements SET name = ?, dosage = ?, timing = ?, notes = ?, active = ?
        WHERE id = ?
      `).bind(name, dosage, timing, notes, active ? 1 : 0, id).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'delete') {
      // Delete supplement
      const { id } = data;
      await db.prepare('DELETE FROM supplements WHERE id = ?').bind(id).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'log') {
      // Log/unlog supplement for a date
      const { date, supplement_id, taken } = data;

      // Get current supplements_taken for this date
      const checklist = await db.prepare(`
        SELECT supplements_taken FROM daily_checklist WHERE date = ?
      `).bind(date).first();

      let currentTaken: number[] = [];
      if (checklist?.supplements_taken) {
        try {
          currentTaken = JSON.parse(checklist.supplements_taken);
        } catch {}
      }

      // Update the array
      if (taken && !currentTaken.includes(supplement_id)) {
        currentTaken.push(supplement_id);
      } else if (!taken) {
        currentTaken = currentTaken.filter(id => id !== supplement_id);
      }

      // Upsert the daily_checklist
      await db.prepare(`
        INSERT INTO daily_checklist (date, supplements_taken)
        VALUES (?, ?)
        ON CONFLICT(date) DO UPDATE SET supplements_taken = ?
      `).bind(date, JSON.stringify(currentTaken), JSON.stringify(currentTaken)).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error handling supplement action:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
