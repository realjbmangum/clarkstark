import type { APIRoute } from 'astro';

export const prerender = false;

// Helper to get today's date in Eastern timezone
function getTodayEastern(): string {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return eastern.toISOString().split('T')[0];
}

// Helper to get yesterday's date in Eastern timezone
function getYesterdayEastern(): string {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  eastern.setDate(eastern.getDate() - 1);
  return eastern.toISOString().split('T')[0];
}

// GET - get current streak
export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any).runtime;
  const db = runtime?.env?.DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get streak data
    const streak = await db.prepare(`
      SELECT current_streak, longest_streak, last_workout_date, updated_at
      FROM streak WHERE id = 1
    `).first() as { current_streak: number; longest_streak: number; last_workout_date: string | null; updated_at: string } | null;

    if (!streak) {
      // Initialize streak if not exists
      await db.prepare(`
        INSERT OR IGNORE INTO streak (id, current_streak, longest_streak) VALUES (1, 0, 0)
      `).run();

      return new Response(JSON.stringify({
        current_streak: 0,
        longest_streak: 0,
        last_workout_date: null,
        is_broken: false
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const today = getTodayEastern();
    const yesterday = getYesterdayEastern();

    // Check if streak is broken (last workout was before yesterday)
    let isBroken = false;
    let currentStreak = streak.current_streak;

    if (streak.last_workout_date &&
        streak.last_workout_date !== today &&
        streak.last_workout_date !== yesterday) {
      // Streak is broken - reset it
      isBroken = true;
      currentStreak = 0;

      await db.prepare(`
        UPDATE streak SET current_streak = 0, updated_at = datetime('now') WHERE id = 1
      `).run();
    }

    return new Response(JSON.stringify({
      current_streak: currentStreak,
      longest_streak: streak.longest_streak,
      last_workout_date: streak.last_workout_date,
      is_broken: isBroken
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching streak:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch streak' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - update streak (called when workout is completed)
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
    const workoutDate = data.date || getTodayEastern();

    // Get current streak
    const streak = await db.prepare(`
      SELECT current_streak, longest_streak, last_workout_date
      FROM streak WHERE id = 1
    `).first() as { current_streak: number; longest_streak: number; last_workout_date: string | null } | null;

    const today = getTodayEastern();
    const yesterday = getYesterdayEastern();

    let newStreak = 1;
    let longestStreak = streak?.longest_streak || 0;

    if (streak?.last_workout_date) {
      if (streak.last_workout_date === workoutDate) {
        // Already logged today, don't increment
        newStreak = streak.current_streak;
      } else if (streak.last_workout_date === yesterday ||
                 (workoutDate === today && streak.last_workout_date === yesterday)) {
        // Consecutive day - increment streak
        newStreak = streak.current_streak + 1;
      } else if (workoutDate > streak.last_workout_date) {
        // Missed days - reset to 1 (tough love)
        newStreak = 1;
      } else {
        // Logging for a past date, don't change current streak
        newStreak = streak.current_streak;
      }
    }

    // Update longest streak if needed
    if (newStreak > longestStreak) {
      longestStreak = newStreak;
    }

    // Update database
    await db.prepare(`
      UPDATE streak
      SET current_streak = ?,
          longest_streak = ?,
          last_workout_date = ?,
          updated_at = datetime('now')
      WHERE id = 1
    `).bind(newStreak, longestStreak, workoutDate).run();

    return new Response(JSON.stringify({
      success: true,
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_workout_date: workoutDate
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating streak:', error);
    return new Response(JSON.stringify({ error: 'Failed to update streak' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
