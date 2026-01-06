-- Carnivore-Friendly High Protein Recipes Seed Data
-- Run via: npx wrangler d1 execute clark-stark-workout --file=seed-recipes.sql

-- Clear existing recipes (optional - comment out to keep existing)
-- DELETE FROM recipes;

INSERT INTO recipes (name, category, prep_time, cook_time, servings, calories, protein, carbs, fat, ingredients, instructions, notes, favorite) VALUES
-- Breakfast
('Steak & Eggs', 'breakfast', 5, 15, 1, 650, 55, 2, 48,
'["8oz ribeye steak", "3 eggs", "2 tbsp butter", "salt and pepper"]',
'["Season steak with salt and pepper", "Heat cast iron over high heat", "Cook steak 3-4 min per side for medium-rare", "Rest steak 5 min", "Fry eggs in butter to preference", "Serve together"]',
'Classic carnivore breakfast. Perfect post-workout.', 1),

('Bacon & Eggs', 'breakfast', 2, 15, 1, 480, 32, 1, 38,
'["6 strips thick-cut bacon", "3 eggs", "salt and pepper"]',
'["Cook bacon in cold pan, medium heat until crispy", "Pour off excess grease, leaving 1 tbsp", "Fry eggs in bacon fat", "Season and serve together"]',
'Simple and satisfying. Save bacon fat for cooking.', 1),

('Ground Beef Scramble', 'breakfast', 5, 10, 1, 520, 42, 2, 38,
'["6oz ground beef (80/20)", "3 eggs", "1 tbsp butter", "salt and pepper"]',
'["Brown ground beef in pan, breaking into small pieces", "Push beef to side, scramble eggs in butter", "Mix together and season"]',
'Quick protein-packed breakfast.', 0),

-- Lunch
('Smash Burgers', 'lunch', 5, 10, 2, 700, 50, 0, 55,
'["1 lb ground beef (80/20)", "4 slices cheese (optional)", "salt and pepper"]',
'["Divide beef into 4 balls", "Heat cast iron very hot", "Smash balls flat with spatula", "Season with salt", "Cook 2 min, flip, add cheese", "Cook 1 more min"]',
'Crispy edges, juicy center. No bun needed.', 1),

('Carnivore Beef Patties', 'lunch', 5, 12, 4, 350, 28, 0, 26,
'["1 lb ground beef (80/20)", "1 tsp salt", "1/2 tsp black pepper"]',
'["Mix beef with salt and pepper", "Form into 4 patties", "Cook in cast iron 4-5 min per side", "Rest 2 min before eating"]',
'Perfect for meal prep. Reheat in pan.', 1),

('Beef & Butter Bowl', 'lunch', 5, 15, 1, 680, 45, 0, 55,
'["8oz ground beef", "2 tbsp butter", "salt to taste"]',
'["Brown ground beef in pan", "Drain if desired", "Add butter and let melt", "Season with salt"]',
'Simple, satisfying, and high fat.', 0),

-- Dinner
('Reverse Sear Ribeye', 'dinner', 5, 45, 1, 800, 60, 0, 62,
'["16oz ribeye steak", "salt", "2 tbsp butter", "fresh rosemary (optional)"]',
'["Salt steak and let sit 30 min", "Bake at 250F until internal temp 115F (about 30 min)", "Rest 5 min", "Sear in screaming hot cast iron with butter, 1 min per side", "Rest 5 min, slice against grain"]',
'Restaurant quality at home. Worth the effort.', 1),

('Pan-Seared Pork Chops', 'dinner', 5, 15, 2, 450, 45, 0, 28,
'["2 bone-in pork chops (1 inch thick)", "2 tbsp butter", "salt and pepper"]',
'["Bring chops to room temp", "Season generously with salt and pepper", "Heat cast iron over medium-high", "Add butter, then chops", "Cook 4-5 min per side until golden", "Rest 5 min"]',
'Juicy and flavorful. Don''t overcook.', 1),

('Crispy Chicken Thighs', 'dinner', 5, 35, 4, 380, 32, 0, 28,
'["4 bone-in, skin-on chicken thighs", "salt and pepper", "1 tbsp butter"]',
'["Pat thighs very dry with paper towels", "Season with salt and pepper", "Place skin-side down in cold pan", "Turn heat to medium, cook 20 min without moving", "Flip, cook 10 more min", "Rest 5 min"]',
'Crispy skin is the key. Start in cold pan.', 1),

('Baked Salmon', 'dinner', 5, 15, 1, 450, 46, 0, 28,
'["8oz salmon fillet", "1 tbsp butter", "salt and pepper", "lemon (optional)"]',
'["Preheat oven to 400F", "Season salmon with salt and pepper", "Place on baking sheet, top with butter", "Bake 12-15 min until flakes easily", "Squeeze lemon if desired"]',
'Omega-3 powerhouse. Wild-caught preferred.', 1),

('Beef Short Ribs', 'dinner', 10, 180, 4, 550, 40, 0, 42,
'["3 lbs beef short ribs", "salt and pepper", "1 cup beef broth"]',
'["Season ribs with salt and pepper", "Brown in Dutch oven on all sides", "Add broth, cover", "Braise at 300F for 3 hours", "Meat should fall off bone"]',
'Weekend meal prep. Makes incredible leftovers.', 0),

-- Snacks
('Beef Jerky (Homemade)', 'snack', 30, 240, 8, 100, 15, 2, 3,
'["2 lbs lean beef (eye of round)", "salt", "pepper"]',
'["Slice beef 1/4 inch thick against grain", "Season with salt and pepper", "Dehydrate at 160F for 4-6 hours", "Store in airtight container"]',
'Great protein snack. No sugar added.', 0),

('Bacon Wrapped Eggs', 'snack', 5, 20, 6, 140, 10, 0, 11,
'["6 eggs", "6 strips bacon"]',
'["Wrap bacon around inside of muffin tin cups", "Crack egg into each cup", "Bake at 375F for 20 min", "Let cool slightly before removing"]',
'Perfect grab-and-go protein.', 0),

-- Shakes (carnivore-adjacent)
('Protein Power Shake', 'shake', 2, 0, 1, 300, 50, 8, 8,
'["2 scoops whey protein", "8oz water or milk", "ice"]',
'["Add protein and liquid to blender", "Blend until smooth", "Add ice and blend again"]',
'Post-workout essential. Quick protein.', 1),

('Egg White Shake', 'shake', 2, 0, 1, 200, 40, 2, 2,
'["1 cup pasteurized egg whites", "1 scoop protein powder", "water", "ice"]',
'["Combine all ingredients", "Blend until smooth"]',
'Extra protein, low calorie option.', 0);
