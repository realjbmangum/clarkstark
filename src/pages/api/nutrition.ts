import type { APIRoute } from 'astro';

export const prerender = false;

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

    if (data.type === 'meal') {
      // Log individual meal
      const { date, meal_type, description, calories, protein, carbs, fat } = data;

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
