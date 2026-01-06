-- Iron Forge Supplement Stack
-- Run via Cloudflare D1 Console or: npx wrangler d1 execute clark-stark-workout --file=seed-supplements.sql

DELETE FROM supplements;

INSERT INTO supplements (name, dosage, timing, notes, active) VALUES
-- MORNING (with breakfast containing fat)
('Multivitamin', '1 capsule', 'morning', 'Thorne Basic Nutrients - with food', 1),
('Vitamin D3 + K2', '5000 IU / 100mcg', 'morning', 'Take with fat for absorption', 1),
('B12 Sublingual', '1000-5000mcg', 'morning', 'Under tongue - methylcobalamin', 1),
('Electrolytes', '1 packet', 'morning', 'LMNT in 32oz water - first thing', 1),
('Fish Oil (Omega-3)', '2-3 softgels', 'morning', 'Thorne Super EPA - with food', 1),

-- EVENING (with dinner)
('Multivitamin', '1 capsule', 'evening', 'Second dose - with dinner', 1),
('Zinc', '30mg', 'evening', 'NOT with calcium/iron - zinc picolinate', 1),

-- BEFORE BED
('Magnesium Glycinate', '400-600mg', 'evening', '30-60 min before sleep', 1),

-- ANYTIME (training days)
('Creatine Monohydrate', '5g', 'anytime', 'Post-workout or in shake', 1),
('Whey Protein', '25-50g', 'post_workout', 'Within 30 min of training', 1);
