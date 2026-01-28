# ClarkStark - Fitness Tracking App

Personal fitness tracking app for the 2026 transformation journey. Built with Astro + Cloudflare D1.

**Live:** https://clarkstark.jbmangum.com (protected by Cloudflare Access)

## Stack

- Astro (server mode, `@astrojs/cloudflare` adapter)
- Tailwind CSS (Gumroad-inspired light theme)
- Cloudflare D1 (SQLite database)
- Cloudflare Pages (hosting)
- Cloudflare Access (Zero Trust authentication)

## Features

### Dashboard (`/`)
- Today's scheduled workout with quick start
- Stats: workouts this week, protein today, water intake, current weight
- Water tracking with quick-add buttons (250ml, 500ml, 750ml, 1L)
- Protein progress bar
- Active goals display
- Weekly calendar view

### Workouts (`/workout`)
- CST-based workout templates (Pat McNamara style)
- 6 workout types: upper_strength, lower_power, upper_hypertrophy, lower_hypertrophy, speed_arms, active_recovery
- Exercise logging with sets, reps, weight
- Rest timer (60s, 90s, 120s)
- Warmup checklist
- Finisher tracking

### Schedule (`/schedule`)
- Weekly training split view
- Color-coded by training type
- CST principles reminder
- Click to start any workout

### Nutrition (`/nutrition`)
- Daily macro tracking (calories, protein, carbs, fat)
- Water intake tracking with progress bar
- Quick-add carnivore foods (ribeye, ground beef, eggs, bacon, salmon, burger patties, pork chops, chicken thighs, protein shake, Greek yogurt, cashews, peanuts)
- Custom meal logging
- Protein target progress bar
- Meal history

### Recipes (`/recipes`)
- Recipe library with categories
- Full macro information per recipe
- Ingredients and instructions
- Favorites system
- Add/edit recipes

### Body Metrics (`/metrics`)
- Weight, waist, chest, arms, thighs, neck tracking
- Automatic body fat calculation (Navy method)
- Progress history table
- Transformation goal progress bars (starting 250 lbs → goal 210 lbs)

### Supplements (`/supplements`)
- Track daily supplement stack
- Add/edit supplements with dosage and timing
- Daily checklist grouped by timing (morning, with meal, pre/post workout, evening)
- Active/inactive supplement status

## Database Schema (D1)

Key tables:
- `workout_log` - Completed workouts
- `exercise_log` - Individual sets/reps logged
- `nutrition_log` - Daily macro summaries
- `meals` - Individual meals
- `body_metrics` - Body measurements
- `recipes` - Recipe library
- `meal_plans` - Weekly meal planning
- `water_log` - Water intake
- `supplements` - Supplement definitions
- `daily_checklist` - Daily tracking (supplements taken, etc.)
- `goals` - Transformation goals
- `settings` - User preferences

See `schema.sql` for full schema.

## Local Development

```bash
npm run dev
```

For D1 locally, use wrangler's local mode:
```bash
npx wrangler d1 execute clarkstark-db --local --file=schema.sql
```

## Deploy to Cloudflare

1. Create D1 database:
```bash
npx wrangler d1 create clarkstark-db
```

2. Update `wrangler.toml` with the database_id

3. Apply schema:
```bash
npx wrangler d1 execute clarkstark-db --file=schema.sql
```

4. Seed carnivore recipes (optional):
```bash
npx wrangler d1 execute clark-stark-workout --file=seed-recipes.sql
```

5. Deploy:
```bash
npm run build
npx wrangler pages deploy dist
```

## Key Files

| File | Purpose |
|------|---------|
| `src/pages/index.astro` | Dashboard |
| `src/pages/workout.astro` | Workout tracker |
| `src/pages/nutrition.astro` | Nutrition logging |
| `src/pages/recipes.astro` | Recipe library |
| `src/pages/metrics.astro` | Body metrics |
| `src/pages/supplements.astro` | Supplement tracking |
| `src/pages/schedule.astro` | Weekly schedule |
| `src/pages/api/*.ts` | D1 API routes |
| `src/data/workouts.ts` | CST workout templates |
| `src/layouts/Layout.astro` | Main layout with nav |
| `schema.sql` | D1 database schema |
| `seed-recipes.sql` | Carnivore recipe seed data |
| `wrangler.toml` | Cloudflare config |

## Workout Templates (CST-Based)

| ID | Name | Type | Day |
|----|------|------|-----|
| upper_strength | Upper Strength - Push | Strength | Monday |
| lower_power | Lower Power - Explosive | Power | Tuesday |
| upper_hypertrophy | Upper Hypertrophy - Pull | Hypertrophy | Wednesday |
| lower_hypertrophy | Lower Hypertrophy - Volume | Hypertrophy | Thursday |
| speed_arms | Speed & Arms Friday | Speed | Friday |
| active_recovery | Active Recovery | Conditioning | Saturday |
| rest_day | Rest Day | Rest | Sunday |

## Session History

### Jan 5, 2026
- Discussed KV vs D1 for fitness app (chose D1 for relational queries)
- Created new Astro project with Cloudflare adapter
- Designed D1 schema with 14 tables (settings, workout_log, exercise_log, body_metrics, nutrition_log, meals, recipes, meal_plans, water_log, daily_checklist, supplements, goals, workout_templates, template_exercises)
- Built 7 API routes: `/api/workouts`, `/api/nutrition`, `/api/metrics`, `/api/recipes`, `/api/water`, `/api/dashboard`, `/api/supplements`
- Created 7 pages: Dashboard, Workout, Nutrition, Recipes, Metrics, Supplements, Schedule
- Migrated CST workout templates from original clark-stark
- Gumroad-style UI with Tailwind (matching x-content app)
- Created D1 database: `clark-stark-workout` (ID: `0dca19c9-6f87-4d70-9dc7-53fe9d5d51bf`)
- Applied schema via Cloudflare Dashboard D1 Console
- Deployed to Cloudflare Pages via GitHub integration
- **Next:** Add D1 binding in Pages settings (Dashboard → Pages → clarkstark → Settings → Functions → D1 Database Bindings → Add: Variable=DB, Database=clark-stark-workout)

### Jan 5, 2026 (Session 2)
- Changed brand color from coral to burnt orange (#cc5500)
- Fixed timezone to Eastern (America/New_York) - date was rolling over at 7PM EST
- Added Supplements page with daily tracking checklist
- Updated nutrition quick-add with carnivore items (ribeye, bacon, pork chops, etc.) + water tracking
- Fixed Save Workout button with better error handling
- Fixed Mark Complete (finisher) button to toggle state
- Updated metrics: weight placeholder 250 lbs, goal 210 lbs (from 185/175)
- Created seed-recipes.sql with 15 carnivore-friendly recipes
- Added `/api/supplements` endpoint

### Jan 5, 2026 (Session 3)
- Fixed CSS variables for burnt orange (was still coral in global.css)
- Added button press feedback (scale down on active)
- Added delete meal functionality with confirmation
- Created seed-supplements.sql with AM/PM supplement stack
- Improved workout save error messaging for D1 binding issues

### Jan 28, 2026 - Motivation System
**Problem:** App tracks workouts but doesn't create motivation. User losing momentum.

**Solution:** Added "Daily Spark" motivation system with 4 core features:

1. **Streak System**
   - Flame icon + "Day X" in header on ALL pages
   - Hard reset if a day is missed (tough love)
   - Tracks current_streak and longest_streak in DB

2. **Daily Spark Page** (`/spark` - new homepage)
   - Streak hero (big flame + day count)
   - Today's workout with quick start
   - Scripture of the day (matched to workout type)
   - Spotify playlist button (one-tap music)
   - Weekly challenge with progress bar

3. **Scripture Integration**
   - Curated verses by category (strength, discipline, endurance, rest, perseverance)
   - Maps workout types to appropriate categories
   - Fetches NLT from api.bible if BIBLE_API_KEY is set
   - Falls back to curated verses (currently NIV-style)

4. **Spotify Integration**
   - Playlists mapped to each workout type
   - One-tap to open in Spotify

5. **Weekly Challenges**
   - Rotates weekly (4 workouts, 5 workouts, protein days, water days, weekdays)
   - Progress calculated from existing logged data

**Files Changed:**
- `schema.sql` - Added streak, playlists, verse_cache tables
- `src/data/verses.ts` - NEW: Curated scripture library
- `src/data/playlists.ts` - NEW: Spotify playlist config
- `src/pages/api/streak.ts` - NEW: Streak CRUD
- `src/pages/api/verse.ts` - NEW: Bible API integration
- `src/pages/api/challenge.ts` - NEW: Weekly challenge logic
- `src/pages/spark.astro` - NEW: Daily Spark homepage
- `src/pages/index.astro` - Redirects to /spark
- `src/pages/workout.astro` - Updates streak on save
- `src/layouts/Layout.astro` - Added streak to header, simplified nav

**To Deploy:**
1. Apply schema changes: `npx wrangler d1 execute clark-stark-workout --file=schema.sql`
2. (Optional) Add BIBLE_API_KEY to Cloudflare Pages environment for NLT translation
3. Deploy: `npm run build && npx wrangler pages deploy dist`

**PRD:** `tasks/prd-motivation-system.md`

## Migration from Google Sheets

This app replaces the previous Google Sheets + Apps Script version. Benefits:
- No more Apps Script maintenance
- Faster queries with D1
- Simpler deployment (just wrangler)
- Better offline support potential
- Easier to add features
