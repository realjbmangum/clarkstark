import type { APIRoute } from 'astro';

export const prerender = false;

// GET - get dashboard data (today's summary + weekly stats)
export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  try {
    // Today's workout
    const todayWorkout = await db.prepare(`
      SELECT * FROM workout_log WHERE date = ? LIMIT 1
    `).bind(today).first();

    // Today's nutrition
    const todayNutrition = await db.prepare(`
      SELECT * FROM nutrition_log WHERE date = ?
    `).bind(today).first();

    // Today's water
    const todayWater = await db.prepare(`
      SELECT SUM(amount_liters) as total FROM water_log WHERE date = ?
    `).bind(today).first() as { total: number | null };

    // Week's workout count
    const weekWorkouts = await db.prepare(`
      SELECT COUNT(*) as count FROM workout_log WHERE date >= ?
    `).bind(weekAgo).first() as { count: number };

    // Latest body metrics
    const latestMetrics = await db.prepare(`
      SELECT * FROM body_metrics ORDER BY date DESC LIMIT 1
    `).first();

    // Starting metrics (oldest in last 30 days or first ever)
    const startingMetrics = await db.prepare(`
      SELECT * FROM body_metrics ORDER BY date ASC LIMIT 1
    `).first();

    // Weekly protein average
    const weekProtein = await db.prepare(`
      SELECT AVG(protein) as avg FROM nutrition_log WHERE date >= ?
    `).bind(weekAgo).first() as { avg: number | null };

    // Get goals
    const goals = await db.prepare(`
      SELECT * FROM goals WHERE achieved = 0 ORDER BY created_at DESC LIMIT 5
    `).all();

    // Get settings/targets
    const settings = await db.prepare(`
      SELECT key, value FROM settings
    `).all();

    const settingsMap = (settings.results as { key: string; value: string }[]).reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Record<string, string>);

    return new Response(JSON.stringify({
      today: {
        date: today,
        workout: todayWorkout,
        nutrition: todayNutrition,
        water: todayWater?.total || 0,
      },
      week: {
        workoutsCompleted: weekWorkouts?.count || 0,
        avgProtein: Math.round(weekProtein?.avg || 0),
      },
      metrics: {
        current: latestMetrics,
        starting: startingMetrics,
      },
      goals: goals.results,
      settings: settingsMap,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch dashboard data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
