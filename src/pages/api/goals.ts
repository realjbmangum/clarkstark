import type { APIRoute } from 'astro';

export const prerender = false;

// GET - get all goals
export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const goals = await db.prepare(`
      SELECT * FROM goals ORDER BY achieved ASC, created_at DESC
    `).all();

    return new Response(JSON.stringify({ goals: goals.results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch goals' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - create, update, delete, or mark achieved
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
      const { type, target_value, target_date, current_value, unit, description } = data;

      await db.prepare(`
        INSERT INTO goals (type, target_value, target_date, current_value, unit, description)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(type, target_value, target_date || null, current_value || null, unit || null, description || null).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'update') {
      const { id, type, target_value, target_date, current_value, unit, description } = data;

      await db.prepare(`
        UPDATE goals
        SET type = ?, target_value = ?, target_date = ?, current_value = ?, unit = ?, description = ?
        WHERE id = ?
      `).bind(type, target_value, target_date || null, current_value || null, unit || null, description || null, id).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'update_progress') {
      const { id, current_value } = data;

      await db.prepare(`
        UPDATE goals SET current_value = ? WHERE id = ?
      `).bind(current_value, id).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'achieve') {
      const { id } = data;

      await db.prepare(`
        UPDATE goals SET achieved = 1 WHERE id = ?
      `).bind(id).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'delete') {
      const { id } = data;

      await db.prepare(`DELETE FROM goals WHERE id = ?`).bind(id).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error with goals:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
