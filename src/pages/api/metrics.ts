import type { APIRoute } from 'astro';

export const prerender = false;

// GET - get body metrics
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
  const limit = url.searchParams.get('limit') || '30';

  try {
    let result;

    if (date) {
      result = await db.prepare(`
        SELECT * FROM body_metrics WHERE date = ?
      `).bind(date).first();

      return new Response(JSON.stringify({ metric: result }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      result = await db.prepare(`
        SELECT * FROM body_metrics
        ORDER BY date DESC
        LIMIT ?
      `).bind(parseInt(limit)).all();

      return new Response(JSON.stringify({ metrics: result.results }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch metrics' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - log body metrics
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
    const { date, weight, waist, chest, arms, thighs, neck, notes } = data;

    // Calculate body fat using Navy method if we have the measurements
    let bodyFat = null;
    if (waist && neck) {
      // Get height from settings
      const heightResult = await db.prepare(`
        SELECT value FROM settings WHERE key = 'height_inches'
      `).first() as { value: string } | null;

      const heightInches = heightResult ? parseFloat(heightResult.value) : 70;

      // Navy method for men: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
      bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(heightInches) + 36.76;
      bodyFat = Math.round(bodyFat * 10) / 10; // Round to 1 decimal
    }

    await db.prepare(`
      INSERT INTO body_metrics (date, weight, waist, chest, arms, thighs, neck, body_fat, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(date) DO UPDATE SET
        weight = excluded.weight,
        waist = excluded.waist,
        chest = excluded.chest,
        arms = excluded.arms,
        thighs = excluded.thighs,
        neck = excluded.neck,
        body_fat = excluded.body_fat,
        notes = excluded.notes
    `).bind(date, weight, waist, chest, arms, thighs, neck, bodyFat, notes).run();

    return new Response(JSON.stringify({ success: true, body_fat: bodyFat }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving metrics:', error);
    return new Response(JSON.stringify({ error: 'Failed to save metrics' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
