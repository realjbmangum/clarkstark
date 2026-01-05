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
- Quick-add common foods (chicken, shake, yogurt, eggs, etc.)
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
- Transformation goal progress bars

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

4. Deploy:
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
| `src/pages/schedule.astro` | Weekly schedule |
| `src/pages/api/*.ts` | D1 API routes |
| `src/data/workouts.ts` | CST workout templates |
| `src/layouts/Layout.astro` | Main layout with nav |
| `schema.sql` | D1 database schema |
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

### Jan 4, 2025
- Initial build with Astro + D1
- Created full D1 schema (13 tables)
- Built 6 API routes (workouts, nutrition, metrics, recipes, water, dashboard)
- Created 6 pages (dashboard, workout, nutrition, recipes, metrics, schedule)
- Migrated CST workout templates from original clark-stark
- Gumroad-style UI with Tailwind

## Migration from Google Sheets

This app replaces the previous Google Sheets + Apps Script version. Benefits:
- No more Apps Script maintenance
- Faster queries with D1
- Simpler deployment (just wrangler)
- Better offline support potential
- Easier to add features
