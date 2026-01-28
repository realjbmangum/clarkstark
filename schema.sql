-- ClarkStark D1 Schema
-- Fitness tracking app

-- User settings/profile (single user for now)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Workout templates (the actual workout definitions)
CREATE TABLE IF NOT EXISTS workout_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- strength, power, hypertrophy, speed, conditioning
  focus TEXT,
  duration TEXT,
  warmup_cardio TEXT,
  warmup_mobility TEXT, -- JSON array
  circuit_instructions TEXT,
  finisher_name TEXT,
  finisher_description TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Exercises within templates
CREATE TABLE IF NOT EXISTS template_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  name TEXT NOT NULL,
  sets INTEGER,
  reps TEXT,
  tempo TEXT,
  notes TEXT,
  section TEXT DEFAULT 'main', -- main, core, warmup
  sort_order INTEGER DEFAULT 0,
  FOREIGN KEY (template_id) REFERENCES workout_templates(id)
);

-- Workout log (actual completed workouts)
CREATE TABLE IF NOT EXISTS workout_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  template_id TEXT,
  workout_name TEXT,
  duration_minutes INTEGER,
  notes TEXT,
  energy_level INTEGER, -- 1-10
  completed INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Exercise log (actual sets/reps performed)
CREATE TABLE IF NOT EXISTS exercise_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workout_log_id INTEGER NOT NULL,
  exercise_name TEXT NOT NULL,
  set_number INTEGER NOT NULL,
  reps INTEGER,
  weight REAL,
  notes TEXT,
  FOREIGN KEY (workout_log_id) REFERENCES workout_log(id)
);

-- Body metrics
CREATE TABLE IF NOT EXISTS body_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,
  weight REAL,
  waist REAL,
  chest REAL,
  arms REAL,
  thighs REAL,
  neck REAL,
  body_fat REAL, -- calculated Navy method
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Nutrition log (daily summary)
CREATE TABLE IF NOT EXISTS nutrition_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,
  calories INTEGER,
  protein INTEGER,
  carbs INTEGER,
  fat INTEGER,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Meals (individual meals logged)
CREATE TABLE IF NOT EXISTS meals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  meal_type TEXT, -- breakfast, lunch, dinner, snack
  description TEXT,
  calories INTEGER,
  protein INTEGER,
  carbs INTEGER,
  fat INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Recipes
CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT, -- breakfast, lunch, dinner, snack, shake
  prep_time INTEGER, -- minutes
  cook_time INTEGER, -- minutes
  servings INTEGER DEFAULT 1,
  calories INTEGER,
  protein INTEGER,
  carbs INTEGER,
  fat INTEGER,
  ingredients TEXT, -- JSON array
  instructions TEXT, -- JSON array of steps
  notes TEXT,
  favorite INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Meal plans (weekly)
CREATE TABLE IF NOT EXISTS meal_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week_start TEXT NOT NULL, -- Monday of the week
  day_of_week INTEGER NOT NULL, -- 0=Mon, 6=Sun
  meal_type TEXT NOT NULL, -- breakfast, lunch, dinner
  recipe_id INTEGER,
  custom_meal TEXT, -- if not using a recipe
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

-- Water log
CREATE TABLE IF NOT EXISTS water_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  amount_liters REAL NOT NULL,
  logged_at TEXT DEFAULT (datetime('now'))
);

-- Daily checklist
CREATE TABLE IF NOT EXISTS daily_checklist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,
  workout_done INTEGER DEFAULT 0,
  protein_target INTEGER DEFAULT 0,
  water_target INTEGER DEFAULT 0,
  sleep_hours REAL,
  supplements_taken TEXT, -- JSON array of supplement IDs
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Supplements tracking
CREATE TABLE IF NOT EXISTS supplements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  dosage TEXT,
  timing TEXT, -- morning, with_meal, pre_workout, post_workout, evening
  active INTEGER DEFAULT 1,
  notes TEXT
);

-- Goals
CREATE TABLE IF NOT EXISTS goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- weight, waist, arms, strength, habit
  target_value REAL,
  target_date TEXT,
  current_value REAL,
  unit TEXT,
  description TEXT,
  achieved INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_workout_log_date ON workout_log(date);
CREATE INDEX IF NOT EXISTS idx_nutrition_log_date ON nutrition_log(date);
CREATE INDEX IF NOT EXISTS idx_body_metrics_date ON body_metrics(date);
CREATE INDEX IF NOT EXISTS idx_meals_date ON meals(date);
CREATE INDEX IF NOT EXISTS idx_water_log_date ON water_log(date);
CREATE INDEX IF NOT EXISTS idx_daily_checklist_date ON daily_checklist(date);

-- Streak tracking
CREATE TABLE IF NOT EXISTS streak (
  id INTEGER PRIMARY KEY CHECK (id = 1), -- single row
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_workout_date TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Initialize streak row
INSERT OR IGNORE INTO streak (id, current_streak, longest_streak) VALUES (1, 0, 0);

-- Spotify playlists per workout type
CREATE TABLE IF NOT EXISTS playlists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workout_type TEXT NOT NULL UNIQUE,
  spotify_url TEXT,
  name TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Verse cache (daily)
CREATE TABLE IF NOT EXISTS verse_cache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,
  reference TEXT NOT NULL,
  text TEXT NOT NULL,
  category TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Insert default settings
INSERT OR IGNORE INTO settings (key, value) VALUES
  ('protein_target', '150'),
  ('water_target_liters', '3'),
  ('sleep_target_hours', '7'),
  ('height_inches', '70'),
  ('timezone', 'America/New_York');
