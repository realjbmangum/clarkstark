import type { APIRoute } from 'astro';

export const prerender = false;

// Helper function to validate date format (YYYY-MM-DD)
function isValidDate(dateString: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

// Helper function to validate numeric value
function isValidNumber(value: unknown): boolean {
  if (value === null || value === undefined) return true; // Optional fields
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
}

// GET - get water intake for a date
export const GET: APIRoute = async ({ url, locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

  try {
    const result = await db.prepare(`
      SELECT SUM(amount_liters) as total,
             json_group_array(json_object('id', id, 'amount', amount_liters, 'time', logged_at)) as entries
      FROM water_log
      WHERE date = ?
    `).bind(date).first() as { total: number | null; entries: string };

    const total = result?.total || 0;
    const entries = result?.entries ? JSON.parse(result.entries) : [];

    // Get target from settings
    const targetResult = await db.prepare(`
      SELECT value FROM settings WHERE key = 'water_target_liters'
    `).first() as { value: string } | null;

    const target = targetResult ? parseFloat(targetResult.value) : 3;

    return new Response(JSON.stringify({
      date,
      total,
      target,
      entries: entries.filter((e: any) => e.id !== null),
      progress: Math.round((total / target) * 100)
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching water:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch water intake' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - log water intake
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
    const date = data.date || new Date().toISOString().split('T')[0];
    const amount = data.amount_liters || data.amount || 0.5; // default 500ml

    // Validate date if provided
    if (data.date && !isValidDate(data.date)) {
      return new Response(JSON.stringify({ error: 'Invalid date format. Use YYYY-MM-DD' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate amount
    if (!isValidNumber(amount) || (amount !== undefined && amount <= 0)) {
      return new Response(JSON.stringify({ error: 'Amount must be a positive number' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db.prepare(`
      INSERT INTO water_log (date, amount_liters)
      VALUES (?, ?)
    `).bind(date, amount).run();

    // Get updated total
    const result = await db.prepare(`
      SELECT SUM(amount_liters) as total FROM water_log WHERE date = ?
    `).bind(date).first() as { total: number };

    return new Response(JSON.stringify({ success: true, total: result?.total || 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error logging water:', error);
    return new Response(JSON.stringify({ error: 'Failed to log water' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
