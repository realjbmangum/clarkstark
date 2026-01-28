import type { APIRoute } from 'astro';

export const prerender = false;

// Helper to get Monday of current week in Eastern timezone
function getMondayOfWeek(): string {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = eastern.getDay();
  const diff = eastern.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(eastern.setDate(diff));
  return monday.toISOString().split('T')[0];
}

// Challenge types that rotate weekly
const CHALLENGE_TYPES = [
  {
    id: 'workouts_4',
    title: 'Complete 4 workouts this week',
    target: 4,
    unit: 'workouts',
    query: 'workout_count'
  },
  {
    id: 'workouts_5',
    title: 'Complete 5 workouts this week',
    target: 5,
    unit: 'workouts',
    query: 'workout_count'
  },
  {
    id: 'protein_5',
    title: 'Hit protein target 5 days',
    target: 5,
    unit: 'days',
    query: 'protein_days'
  },
  {
    id: 'water_6',
    title: 'Hit water goal 6 days',
    target: 6,
    unit: 'days',
    query: 'water_days'
  },
  {
    id: 'weekday_all',
    title: 'Train every weekday (Mon-Fri)',
    target: 5,
    unit: 'workouts',
    query: 'weekday_workouts'
  }
];

// Get challenge for current week (based on week number)
function getChallengeForWeek(): typeof CHALLENGE_TYPES[0] {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return CHALLENGE_TYPES[weekNumber % CHALLENGE_TYPES.length];
}

// GET - get current weekly challenge with progress
export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    // Return challenge without progress if no DB
    const challenge = getChallengeForWeek();
    return new Response(JSON.stringify({
      ...challenge,
      progress: 0,
      completed: false
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const challenge = getChallengeForWeek();
    const monday = getMondayOfWeek();

    let progress = 0;

    switch (challenge.query) {
      case 'workout_count': {
        // Count workouts this week
        const result = await db.prepare(`
          SELECT COUNT(*) as count FROM workout_log
          WHERE date >= ? AND completed = 1
        `).bind(monday).first() as { count: number };
        progress = result?.count || 0;
        break;
      }

      case 'protein_days': {
        // Count days where protein target was hit
        const targetResult = await db.prepare(`
          SELECT value FROM settings WHERE key = 'protein_target'
        `).first() as { value: string } | null;
        const target = parseInt(targetResult?.value || '150');

        const result = await db.prepare(`
          SELECT COUNT(DISTINCT date) as count FROM meals
          WHERE date >= ?
          GROUP BY date
          HAVING SUM(protein) >= ?
        `).bind(monday, target).all();
        progress = result?.results?.length || 0;
        break;
      }

      case 'water_days': {
        // Count days where water target was hit
        const targetResult = await db.prepare(`
          SELECT value FROM settings WHERE key = 'water_target_liters'
        `).first() as { value: string } | null;
        const target = parseFloat(targetResult?.value || '3');

        const result = await db.prepare(`
          SELECT date, SUM(amount_liters) as total FROM water_log
          WHERE date >= ?
          GROUP BY date
          HAVING total >= ?
        `).bind(monday, target).all();
        progress = result?.results?.length || 0;
        break;
      }

      case 'weekday_workouts': {
        // Count weekday workouts (Mon=1 to Fri=5)
        const result = await db.prepare(`
          SELECT COUNT(*) as count FROM workout_log
          WHERE date >= ?
            AND completed = 1
            AND CAST(strftime('%w', date) AS INTEGER) BETWEEN 1 AND 5
        `).bind(monday).first() as { count: number };
        progress = result?.count || 0;
        break;
      }
    }

    return new Response(JSON.stringify({
      ...challenge,
      progress,
      completed: progress >= challenge.target,
      week_start: monday
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching challenge:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch challenge' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
