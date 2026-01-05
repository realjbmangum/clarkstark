import type { APIRoute } from 'astro';

export const prerender = false;

// GET - get recipes
export const GET: APIRoute = async ({ url, locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = url.searchParams.get('id');
  const category = url.searchParams.get('category');
  const favorites = url.searchParams.get('favorites');

  try {
    let result;

    if (id) {
      result = await db.prepare(`
        SELECT * FROM recipes WHERE id = ?
      `).bind(id).first();

      return new Response(JSON.stringify({ recipe: result }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      let query = 'SELECT * FROM recipes';
      const conditions = [];
      const bindings = [];

      if (category) {
        conditions.push('category = ?');
        bindings.push(category);
      }

      if (favorites === 'true') {
        conditions.push('favorite = 1');
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY name';

      const stmt = db.prepare(query);
      result = bindings.length > 0
        ? await stmt.bind(...bindings).all()
        : await stmt.all();

      return new Response(JSON.stringify({ recipes: result.results }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch recipes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - add/update recipe
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
    const {
      id, name, category, prep_time, cook_time, servings,
      calories, protein, carbs, fat, ingredients, instructions, notes, favorite
    } = data;

    // Convert arrays to JSON strings
    const ingredientsJson = JSON.stringify(ingredients || []);
    const instructionsJson = JSON.stringify(instructions || []);

    if (id) {
      // Update existing
      await db.prepare(`
        UPDATE recipes SET
          name = ?, category = ?, prep_time = ?, cook_time = ?, servings = ?,
          calories = ?, protein = ?, carbs = ?, fat = ?,
          ingredients = ?, instructions = ?, notes = ?, favorite = ?
        WHERE id = ?
      `).bind(
        name, category, prep_time, cook_time, servings,
        calories, protein, carbs, fat,
        ingredientsJson, instructionsJson, notes, favorite ? 1 : 0, id
      ).run();

      return new Response(JSON.stringify({ success: true, id }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Insert new
      const result = await db.prepare(`
        INSERT INTO recipes (name, category, prep_time, cook_time, servings, calories, protein, carbs, fat, ingredients, instructions, notes, favorite)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        name, category, prep_time, cook_time, servings,
        calories, protein, carbs, fat,
        ingredientsJson, instructionsJson, notes, favorite ? 1 : 0
      ).run();

      return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error saving recipe:', error);
    return new Response(JSON.stringify({ error: 'Failed to save recipe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE - delete recipe
export const DELETE: APIRoute = async ({ url, locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Recipe ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await db.prepare('DELETE FROM recipes WHERE id = ?').bind(id).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete recipe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
