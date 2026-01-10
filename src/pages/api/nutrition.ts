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

// GET - get nutrition log for a date or range
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
    let nutritionResult;
    let mealsResult;

    if (date) {
      // Get single day
      nutritionResult = await db.prepare(`
        SELECT * FROM nutrition_log WHERE date = ?
      `).bind(date).first();

      mealsResult = await db.prepare(`
        SELECT * FROM meals WHERE date = ? ORDER BY meal_type
      `).bind(date).all();

      return new Response(JSON.stringify({
        nutrition: nutritionResult,
        meals: mealsResult.results
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (startDate && endDate) {
      // Get date range with daily summaries
      nutritionResult = await db.prepare(`
        SELECT * FROM nutrition_log
        WHERE date BETWEEN ? AND ?
        ORDER BY date DESC
      `).bind(startDate, endDate).all();

      return new Response(JSON.stringify({ nutrition: nutritionResult.results }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Get last 7 days
      nutritionResult = await db.prepare(`
        SELECT * FROM nutrition_log
        ORDER BY date DESC
        LIMIT 7
      `).all();

      return new Response(JSON.stringify({ nutrition: nutritionResult.results }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error fetching nutrition:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch nutrition' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - log nutrition/meals
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

    // Validate type field
    if (!data.type || !['meal', 'daily', 'delete_meal'].includes(data.type)) {
      return new Response(JSON.stringify({ error: 'Invalid type. Must be meal, daily, or delete_meal' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (data.type === 'meal') {
      // Log individual meal
      const { date, meal_type, description, calories, protein, carbs, fat } = data;

      // Validate required fields for meal
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

      // Validate numeric fields
      const numericFields = { calories, protein, carbs, fat };
      for (const [field, value] of Object.entries(numericFields)) {
        if (!isValidNumber(value)) {
          return new Response(JSON.stringify({ error: `${field} must be a valid number` }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      await db.prepare(`
        INSERT INTO meals (date, meal_type, description, calories, protein, carbs, fat)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(date, meal_type, description, calories, protein, carbs, fat).run();

      // Update daily nutrition summary
      await db.prepare(`
        INSERT INTO nutrition_log (date, calories, protein, carbs, fat)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(date) DO UPDATE SET
          calories = calories + excluded.calories,
          protein = protein + excluded.protein,
          carbs = carbs + excluded.carbs,
          fat = fat + excluded.fat
      `).bind(date, calories || 0, protein || 0, carbs || 0, fat || 0).run();

    } else if (data.type === 'daily') {
      // Update daily summary directly
      const { date, calories, protein, carbs, fat, notes } = data;

      // Validate required fields for daily
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

      // Validate numeric fields
      const numericFields = { calories, protein, carbs, fat };
      for (const [field, value] of Object.entries(numericFields)) {
        if (!isValidNumber(value)) {
          return new Response(JSON.stringify({ error: `${field} must be a valid number` }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      await db.prepare(`
        INSERT INTO nutrition_log (date, calories, protein, carbs, fat, notes)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(date) DO UPDATE SET
          calories = excluded.calories,
          protein = excluded.protein,
          carbs = excluded.carbs,
          fat = excluded.fat,
          notes = excluded.notes
      `).bind(date, calories, protein, carbs, fat, notes).run();

    } else if (data.type === 'delete_meal') {
      // Delete a meal and subtract from daily totals
      const { meal_id, date } = data;

      // Validate required fields for delete_meal
      if (!meal_id || typeof meal_id !== 'number') {
        return new Response(JSON.stringify({ error: 'meal_id is required and must be a number' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

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

      // Get the meal first to know what to subtract
      const meal = await db.prepare(`
        SELECT * FROM meals WHERE id = ?
      `).bind(meal_id).first();

      if (meal) {
        // Delete the meal
        await db.prepare(`DELETE FROM meals WHERE id = ?`).bind(meal_id).run();

        // Subtract from daily nutrition
        await db.prepare(`
          UPDATE nutrition_log SET
            calories = MAX(0, calories - ?),
            protein = MAX(0, protein - ?),
            carbs = MAX(0, carbs - ?),
            fat = MAX(0, fat - ?)
          WHERE date = ?
        `).bind(meal.calories || 0, meal.protein || 0, meal.carbs || 0, meal.fat || 0, date).run();
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving nutrition:', error);
    return new Response(JSON.stringify({ error: 'Failed to save nutrition' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
