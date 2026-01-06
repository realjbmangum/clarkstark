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

  // Use Eastern timezone
  const easternDate = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const nowEastern = new Date(easternDate);
  const today = nowEastern.toISOString().split('T')[0];

  const weekAgoDate = new Date(nowEastern);
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);
  const weekAgo = weekAgoDate.toISOString().split('T')[0];

  // Get start of current week (Monday)
  const dayOfWeek = nowEastern.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(nowEastern);
  monday.setDate(monday.getDate() + mondayOffset);
  const weekStart = monday.toISOString().split('T')[0];

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

    // Get this week's workouts (for calendar)
    const weekWorkoutDates = await db.prepare(`
      SELECT date FROM workout_log WHERE date >= ? ORDER BY date
    `).bind(weekStart).all();

    // Get supplements progress for today
    const allSupplements = await db.prepare(`
      SELECT COUNT(*) as total FROM supplements WHERE active = 1
    `).first() as { total: number };

    const todayChecklist = await db.prepare(`
      SELECT supplements_taken FROM daily_checklist WHERE date = ?
    `).bind(today).first();

    let supplementsTaken = 0;
    if (todayChecklist?.supplements_taken) {
      try {
        supplementsTaken = JSON.parse(todayChecklist.supplements_taken as string).length;
      } catch {}
    }

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
      weekWorkoutDates: (weekWorkoutDates.results as { date: string }[]).map(w => w.date),
      supplements: {
        taken: supplementsTaken,
        total: allSupplements?.total || 0,
      },
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
