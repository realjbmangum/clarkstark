# PRD: ClarkStark Motivation System

> Transform ClarkStark from a fitness tracker into a daily motivation system that shows up for you like a workout buddy.

**Created:** January 28, 2026
**Status:** Draft
**Priority:** High

---

## Problem Statement

ClarkStark tracks workouts effectively but doesn't create motivation. The app is passive - it waits for you to log things rather than actively engaging you. This leads to:
- Stale, repetitive feeling workouts
- No visible accountability (streaks, progress)
- No daily "spark" to get moving
- Missing the energy a workout buddy provides

## Solution Overview

Add four interconnected features that create a daily engagement loop:

1. **The Daily Spark** - Morning kickoff screen with today's plan + motivation
2. **Streak System** - Visual "don't break the chain" accountability
3. **Music Integration** - One-tap Spotify playlists per workout type
4. **Faith Integration** - Scripture tied to fitness themes via Bible API

---

## Goals

1. Create a reason to open the app every morning
2. Make streaks impossible to ignore (hero placement)
3. Reduce friction to start working out (music one-tap away)
4. Connect fitness journey to faith (daily scripture)
5. Keep weekly challenges simple and achievable

## Non-Goals

- Social features / sharing (not now)
- AI-generated coaching or voice memos (future)
- Post-workout journaling (nice-to-have, not MVP)
- Evening accountability check-ins (future)
- Workout variety/shuffle engine (future)

---

## User Stories

### Story 1: Daily Spark Screen

**As a user, I want to see a motivating "Daily Spark" screen when I open the app so I know exactly what today looks like and feel ready to train.**

**Acceptance Criteria:**
- [ ] New `/spark` page (or make this the new index)
- [ ] Shows: Today's date, day of week, "Day X" of streak
- [ ] Shows: Today's scheduled workout name and type
- [ ] Shows: Scripture of the day (from Bible API) with reference
- [ ] Shows: "Start Workout" button linking to today's workout
- [ ] Shows: Spotify playlist button for today's workout type
- [ ] Clean, focused layout - no clutter
- [ ] Works offline with cached scripture if API fails

**Technical Notes:**
- Bible API: api.bible (free tier) or bible-api.com
- Cache today's verse in localStorage
- Map workout types to scripture themes:
  - Strength days → verses about strength, power
  - Hypertrophy → perseverance, discipline
  - Recovery → rest, renewal
  - Speed → endurance, running the race

---

### Story 2: Streak System (Hero Placement)

**As a user, I want to see my current streak prominently on every page so I'm constantly reminded not to break the chain.**

**Acceptance Criteria:**
- [ ] Streak counter visible in header/nav on ALL pages
- [ ] Format: flame icon + "Day 12" or similar
- [ ] Streak increments when a workout is logged for that day
- [ ] Streak resets to 0 if a day is missed (no workout logged)
- [ ] On Daily Spark page: larger streak display with "Don't break the chain" text
- [ ] Visual feedback when streak increases (subtle animation)
- [ ] Streak persists in database (not just localStorage)

**Database Changes:**
```sql
-- Add to existing tables or create new
ALTER TABLE settings ADD COLUMN current_streak INTEGER DEFAULT 0;
ALTER TABLE settings ADD COLUMN longest_streak INTEGER DEFAULT 0;
ALTER TABLE settings ADD COLUMN last_workout_date TEXT;
```

**Streak Logic:**
- On workout save: check if `last_workout_date` is yesterday or today
  - If yesterday: increment streak, update date
  - If today: just update date (already counted)
  - If older: reset streak to 1, update date
- On app load: check if streak is broken (last_workout_date < yesterday)

---

### Story 3: Weekly Mini-Challenges

**As a user, I want simple weekly challenges to give me short-term goals beyond just "don't break streak."**

**Acceptance Criteria:**
- [ ] Weekly challenge displayed on Daily Spark page
- [ ] Challenge auto-generates each Monday based on patterns:
  - "Complete 4 workouts this week"
  - "Log protein 5 days this week"
  - "Hit your water goal 6 days"
  - "Do all scheduled workouts Mon-Fri"
- [ ] Progress indicator (e.g., "3/4 workouts")
- [ ] Visual completion state when challenge is met
- [ ] Challenge history viewable (optional, low priority)

**Technical Notes:**
- Calculate progress from existing logged data
- No new tables needed - derive from workout_log, nutrition_log, water_log
- Rotate through 4-5 challenge types weekly

---

### Story 4: Spotify Music Integration

**As a user, I want to tap one button to start my workout playlist so music doesn't add friction.**

**Acceptance Criteria:**
- [ ] Spotify button on Daily Spark page
- [ ] Spotify button on Workout page
- [ ] Each workout type maps to a playlist:
  - Upper Strength → Heavy lifting playlist
  - Lower Power → Explosive/hype playlist
  - Hypertrophy → Pump/volume playlist
  - Speed & Arms → High energy playlist
  - Active Recovery → Chill/low-key playlist
- [ ] Tapping opens Spotify app/web with that playlist
- [ ] Playlist URLs stored in config (easy to update)
- [ ] Fallback: if no playlist configured, hide button

**Technical Notes:**
- Use Spotify URI format: `spotify:playlist:PLAYLIST_ID`
- Or web URL: `https://open.spotify.com/playlist/PLAYLIST_ID`
- Store in settings table or config file
- User can customize their playlist links in settings (future)

**Default Playlists (find good public ones):**
- Strength: Beast Mode / Heavy Metal Workout
- Power: Workout Beats / Gym Motivation
- Hypertrophy: Pump Up / Lifting
- Speed: Cardio / High Energy
- Recovery: Chill / Lo-Fi

---

### Story 5: Scripture Integration via Bible API

**As a user, I want to see a daily scripture related to my fitness journey to connect my training to my faith.**

**Acceptance Criteria:**
- [ ] Daily verse displayed on Daily Spark page
- [ ] Verse is thematically relevant to fitness/discipline/strength
- [ ] Shows verse text + reference (e.g., "Hebrews 12:11")
- [ ] New verse each day (rotation or API-driven)
- [ ] Graceful fallback if API is unavailable
- [ ] Verse cached locally to reduce API calls

**Bible API Options:**
1. **api.bible** (American Bible Society) - Free tier, requires API key
2. **bible-api.com** - Free, no auth, simpler
3. **Custom curated list** - Fallback option

**Curated Verse Categories:**
```javascript
const fitnessVerses = {
  strength: [
    { ref: "Isaiah 40:31", theme: "renewed strength" },
    { ref: "Philippians 4:13", theme: "strength through Christ" },
    { ref: "Psalm 18:32-34", theme: "God gives strength" },
  ],
  discipline: [
    { ref: "Hebrews 12:11", theme: "discipline yields fruit" },
    { ref: "1 Corinthians 9:27", theme: "discipline your body" },
    { ref: "Proverbs 12:1", theme: "love discipline" },
  ],
  perseverance: [
    { ref: "Galatians 6:9", theme: "don't grow weary" },
    { ref: "James 1:12", theme: "blessed who perseveres" },
    { ref: "Romans 5:3-4", theme: "suffering produces perseverance" },
  ],
  rest: [
    { ref: "Matthew 11:28", theme: "rest for the weary" },
    { ref: "Psalm 23:2-3", theme: "restores my soul" },
    { ref: "Exodus 20:8-10", theme: "sabbath rest" },
  ],
  endurance: [
    { ref: "Hebrews 12:1", theme: "run with endurance" },
    { ref: "1 Corinthians 9:24-25", theme: "run to win" },
    { ref: "2 Timothy 4:7", theme: "finished the race" },
  ]
};
```

**Logic:**
1. Determine today's workout type
2. Select verse category matching that type
3. Fetch full verse text from Bible API
4. Display with reference
5. Cache for 24 hours

---

## Technical Considerations

### API: Bible API Integration

**Recommended: bible-api.com** (simplest, no auth)
```
GET https://bible-api.com/hebrews+12:11
```

Response:
```json
{
  "reference": "Hebrews 12:11",
  "text": "No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it.",
  "translation_name": "World English Bible"
}
```

**Fallback:** Store 30-50 verses locally, rotate daily based on date.

### Database Schema Changes

```sql
-- Streak tracking (add to settings or new table)
ALTER TABLE settings ADD COLUMN current_streak INTEGER DEFAULT 0;
ALTER TABLE settings ADD COLUMN longest_streak INTEGER DEFAULT 0;
ALTER TABLE settings ADD COLUMN last_workout_date TEXT;

-- Playlist configuration
CREATE TABLE IF NOT EXISTS playlists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workout_type TEXT NOT NULL UNIQUE,
  spotify_url TEXT,
  name TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Verse cache
CREATE TABLE IF NOT EXISTS verse_cache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,
  reference TEXT NOT NULL,
  text TEXT NOT NULL,
  category TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### New/Modified Files

| File | Change |
|------|--------|
| `src/pages/spark.astro` | NEW - Daily Spark page |
| `src/pages/index.astro` | Redirect to /spark or embed spark content |
| `src/layouts/Layout.astro` | Add streak to header |
| `src/pages/api/streak.ts` | NEW - Streak CRUD |
| `src/pages/api/verse.ts` | NEW - Bible API integration |
| `src/pages/api/challenge.ts` | NEW - Weekly challenge logic |
| `src/data/verses.ts` | NEW - Curated verse list |
| `src/data/playlists.ts` | NEW - Spotify playlist config |
| `schema.sql` | Add streak, playlist, verse_cache tables |

### UI/UX Notes

**Daily Spark Layout (mobile-first):**
```
┌─────────────────────────────┐
│  🔥 Day 12                  │  ← Streak hero
│  Don't break the chain      │
├─────────────────────────────┤
│  TUESDAY, JAN 28            │
│  Upper Strength - Push      │
├─────────────────────────────┤
│  📖 "No discipline seems    │  ← Scripture
│  pleasant at the time..."   │
│  — Hebrews 12:11            │
├─────────────────────────────┤
│  🎵 [Open Spotify Playlist] │  ← Music button
├─────────────────────────────┤
│  [  START WORKOUT  ]        │  ← Primary CTA
├─────────────────────────────┤
│  Weekly Challenge:          │
│  ████████░░ 3/4 workouts    │
└─────────────────────────────┘
```

---

## Implementation Order

1. **Streak System** - Foundation for motivation (Story 2)
2. **Daily Spark Page** - The new home (Story 1)
3. **Scripture Integration** - Faith connection (Story 5)
4. **Spotify Integration** - Reduce friction (Story 4)
5. **Weekly Challenges** - Extra motivation layer (Story 3)

---

## Success Metrics

- App opens increase (checking Daily Spark)
- Average streak length > 7 days
- Workout completion rate increases
- User reports feeling more motivated (qualitative)

---

## Future Enhancements (Post-MVP)

- Post-workout journaling prompts
- Evening accountability check-in notification
- Workout variety/shuffle within CST framework
- Monthly challenge themes
- Share streak to accountability partner
- AI-generated daily encouragement

---

## Decisions Made

1. **`/spark` becomes the new homepage** - redirect index to spark
2. **New Living Translation (NLT)** - requires api.bible with API key (NLT is copyrighted)
3. **Hard reset on missed days** - tough love, streak goes to 0

---

*PRD ready for review. Let me know if anything needs adjustment before we start building.*
