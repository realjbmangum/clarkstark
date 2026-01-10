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

// GET - get all goals
export const GET: APIRoute = async ({ url, locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Pagination parameters
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '100'), 100);
  const offset = parseInt(url.searchParams.get('offset') || '0');

  try {
    const goals = await db.prepare(`
      SELECT * FROM goals ORDER BY achieved ASC, created_at DESC LIMIT ? OFFSET ?
    `).bind(limit, offset).all();

    return new Response(JSON.stringify({
      goals: goals.results,
      pagination: { limit, offset }
    }), {
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

    // Validate action field
    if (!action || !['create', 'update', 'update_progress', 'achieve', 'delete'].includes(action)) {
      return new Response(JSON.stringify({ error: 'Invalid action. Must be create, update, update_progress, achieve, or delete' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'create') {
      const { type, target_value, target_date, current_value, unit, description } = data;

      // Validate required fields for create
      if (!type || typeof type !== 'string' || type.trim() === '') {
        return new Response(JSON.stringify({ error: 'Type is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!isValidNumber(target_value)) {
        return new Response(JSON.stringify({ error: 'target_value must be a valid number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (target_date && !isValidDate(target_date)) {
        return new Response(JSON.stringify({ error: 'Invalid target_date format. Use YYYY-MM-DD' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!isValidNumber(current_value)) {
        return new Response(JSON.stringify({ error: 'current_value must be a valid number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

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

      // Validate required fields for update
      if (!id || typeof id !== 'number') {
        return new Response(JSON.stringify({ error: 'ID is required and must be a number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!type || typeof type !== 'string' || type.trim() === '') {
        return new Response(JSON.stringify({ error: 'Type is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!isValidNumber(target_value)) {
        return new Response(JSON.stringify({ error: 'target_value must be a valid number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (target_date && !isValidDate(target_date)) {
        return new Response(JSON.stringify({ error: 'Invalid target_date format. Use YYYY-MM-DD' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!isValidNumber(current_value)) {
        return new Response(JSON.stringify({ error: 'current_value must be a valid number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

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

      // Validate required fields for update_progress
      if (!id || typeof id !== 'number') {
        return new Response(JSON.stringify({ error: 'ID is required and must be a number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!isValidNumber(current_value)) {
        return new Response(JSON.stringify({ error: 'current_value must be a valid number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

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

      // Validate required fields for achieve
      if (!id || typeof id !== 'number') {
        return new Response(JSON.stringify({ error: 'ID is required and must be a number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

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

      // Validate required fields for delete
      if (!id || typeof id !== 'number') {
        return new Response(JSON.stringify({ error: 'ID is required and must be a number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

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
