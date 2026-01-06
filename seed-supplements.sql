-- Default Supplement Stack Seed Data
-- Run via: npx wrangler d1 execute clark-stark-workout --file=seed-supplements.sql

-- Clear existing supplements (optional - comment out to keep existing)
-- DELETE FROM supplements;

INSERT INTO supplements (name, dosage, timing, notes, active) VALUES
-- Morning Stack
('Vitamin D3', '5000 IU', 'morning', 'Take with fat for absorption', 1),
('Omega-3 Fish Oil', '2000mg', 'morning', 'EPA/DHA for heart and brain', 1),
('Magnesium Glycinate', '400mg', 'morning', 'Muscle recovery and sleep', 1),
('Zinc', '30mg', 'morning', 'Immune support and testosterone', 1),
('Vitamin K2', '100mcg', 'morning', 'Take with D3 for calcium absorption', 1),
('B-Complex', '1 capsule', 'morning', 'Energy and metabolism', 1),

-- With Meals
('Digestive Enzymes', '1 capsule', 'with_meal', 'With protein-heavy meals', 1),

-- Pre-Workout
('Creatine Monohydrate', '5g', 'pre_workout', 'Strength and power output', 1),
('Caffeine', '200mg', 'pre_workout', 'Optional - skip if training late', 1),
('Citrulline Malate', '6g', 'pre_workout', 'Pump and endurance', 1),

-- Post-Workout
('Whey Protein', '25-50g', 'post_workout', 'Within 30 min of training', 1),
('Electrolytes', '1 scoop', 'post_workout', 'Sodium, potassium, magnesium', 1),

-- Evening Stack
('Magnesium Glycinate', '200mg', 'evening', 'Additional dose for sleep', 1),
('Ashwagandha', '600mg', 'evening', 'Stress and cortisol management', 1),
('Melatonin', '3mg', 'evening', 'Optional - for sleep if needed', 0);
