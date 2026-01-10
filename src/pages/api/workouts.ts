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

// GET - get workouts for a date range
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
  const startDate = url.searchParams.get('start');
  const endDate = url.searchParams.get('end');

  try {
    let result;

    if (date) {
      // Get single day's workout
      result = await db.prepare(`
        SELECT wl.*,
          (SELECT json_group_array(json_object(
            'id', el.id,
            'exercise_name', el.exercise_name,
            'set_number', el.set_number,
            'reps', el.reps,
            'weight', el.weight,
            'notes', el.notes
          ))
          FROM exercise_log el WHERE el.workout_log_id = wl.id) as exercises
        FROM workout_log wl
        WHERE wl.date = ?
        ORDER BY wl.created_at DESC
      `).bind(date).all();
    } else if (startDate && endDate) {
      // Get date range
      result = await db.prepare(`
        SELECT * FROM workout_log
        WHERE date BETWEEN ? AND ?
        ORDER BY date DESC
      `).bind(startDate, endDate).all();
    } else {
      // Get recent 30 days
      result = await db.prepare(`
        SELECT * FROM workout_log
        ORDER BY date DESC
        LIMIT 30
      `).all();
    }

    return new Response(JSON.stringify({ workouts: result.results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch workouts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - log a new workout
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
    const { date, template_id, workout_name, duration_minutes, notes, energy_level, exercises } = data;

    // Validate required fields
    if (!date || typeof date !== 'string') {
      return new Response(JSON.stringify({ error: 'Date is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!isValidDate(date)) {
      return new Response(JSON.stringify({ error: 'Invalid date format. Use YYYY-MM-DD' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!isValidNumber(duration_minutes)) {
      return new Response(JSON.stringify({ error: 'Duration must be a valid number' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!isValidNumber(energy_level)) {
      return new Response(JSON.stringify({ error: 'Energy level must be a valid number' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate exercises array if provided
    if (exercises && !Array.isArray(exercises)) {
      return new Response(JSON.stringify({ error: 'Exercises must be an array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (exercises && exercises.length > 0) {
      for (let i = 0; i < exercises.length; i++) {
        const ex = exercises[i];
        if (!isValidNumber(ex.set_number) || !isValidNumber(ex.reps) || !isValidNumber(ex.weight)) {
          return new Response(JSON.stringify({ error: `Exercise ${i + 1}: set_number, reps, and weight must be valid numbers` }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // Insert workout log - convert undefined to null for D1
    const workoutResult = await db.prepare(`
      INSERT INTO workout_log (date, template_id, workout_name, duration_minutes, notes, energy_level)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      date || null,
      template_id || null,
      workout_name || null,
      duration_minutes || null,
      notes || null,
      energy_level || null
    ).run();

    const workoutId = workoutResult.meta.last_row_id;

    // Insert exercise logs - convert undefined to null for D1
    if (exercises && exercises.length > 0) {
      for (const exercise of exercises) {
        await db.prepare(`
          INSERT INTO exercise_log (workout_log_id, exercise_name, set_number, reps, weight, notes)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(
          workoutId,
          exercise.exercise_name || null,
          exercise.set_number || null,
          exercise.reps || null,
          exercise.weight || null,
          exercise.notes || null
        ).run();
      }
    }

    return new Response(JSON.stringify({ success: true, id: workoutId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving workout:', error);
    return new Response(JSON.stringify({ error: 'Failed to save workout' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
