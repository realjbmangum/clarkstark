// ClarkStark - Meal Plan Data
// Weekly meal prep and daily targets

export interface DailyTargets {
  protein: number;
  caloriesMin: number;
  caloriesMax: number;
  waterGallons: number;
}

export interface PrepTask {
  id: string;
  task: string;
  category: 'protein' | 'sides' | 'snacks' | 'prep';
  estimatedTime: string;
}

export interface MealContainer {
  id: string;
  name: string;
  contents: string;
  protein: number;
  calories: number;
}

export const DAILY_TARGETS: DailyTargets = {
  protein: 200,
  caloriesMin: 1800,
  caloriesMax: 2200,
  waterGallons: 1
};

export const PREP_TASKS: PrepTask[] = [
  // Protein prep
  { id: 'grill_chicken', task: 'Grill chicken thighs (2 lbs)', category: 'protein', estimatedTime: '25 min' },
  { id: 'cook_ground_beef', task: 'Brown ground beef (2 lbs)', category: 'protein', estimatedTime: '15 min' },
  { id: 'hard_boil_eggs', task: 'Hard boil eggs (12)', category: 'protein', estimatedTime: '15 min' },
  { id: 'cook_bacon', task: 'Cook bacon (1 lb)', category: 'protein', estimatedTime: '20 min' },

  // Sides prep
  { id: 'roast_veggies', task: 'Roast mixed vegetables', category: 'sides', estimatedTime: '30 min' },
  { id: 'make_rice', task: 'Cook rice (if eating carbs)', category: 'sides', estimatedTime: '20 min' },

  // Snacks
  { id: 'portion_nuts', task: 'Portion out nuts/snacks', category: 'snacks', estimatedTime: '5 min' },
  { id: 'prep_shakes', task: 'Pre-portion protein powder', category: 'snacks', estimatedTime: '5 min' },

  // General prep
  { id: 'wash_containers', task: 'Wash meal containers', category: 'prep', estimatedTime: '10 min' },
  { id: 'clean_fridge', task: 'Clean out fridge', category: 'prep', estimatedTime: '10 min' },
  { id: 'fill_bottles', task: 'Fill water bottles for week', category: 'prep', estimatedTime: '5 min' },
];

export const MEAL_CONTAINERS: MealContainer[] = [
  { id: 'lunch_1', name: 'Monday Lunch', contents: 'Chicken thighs + veggies', protein: 45, calories: 450 },
  { id: 'lunch_2', name: 'Tuesday Lunch', contents: 'Ground beef bowl', protein: 40, calories: 400 },
  { id: 'lunch_3', name: 'Wednesday Lunch', contents: 'Chicken thighs + veggies', protein: 45, calories: 450 },
  { id: 'lunch_4', name: 'Thursday Lunch', contents: 'Ground beef bowl', protein: 40, calories: 400 },
  { id: 'lunch_5', name: 'Friday Lunch', contents: 'Chicken thighs + veggies', protein: 45, calories: 450 },
  { id: 'snack_eggs', name: 'Egg Snacks', contents: '12 hard boiled eggs', protein: 72, calories: 840 },
];

export const SHOPPING_LIST = [
  // Proteins
  { item: 'Chicken thighs', amount: '2 lbs', category: 'protein' },
  { item: 'Ground beef (80/20)', amount: '2 lbs', category: 'protein' },
  { item: 'Eggs', amount: '2 dozen', category: 'protein' },
  { item: 'Bacon', amount: '1 lb', category: 'protein' },
  { item: 'Ribeye steaks', amount: '2-3', category: 'protein' },

  // Vegetables
  { item: 'Broccoli', amount: '2 heads', category: 'produce' },
  { item: 'Asparagus', amount: '1 bunch', category: 'produce' },
  { item: 'Bell peppers', amount: '3', category: 'produce' },
  { item: 'Onions', amount: '2', category: 'produce' },

  // Snacks
  { item: 'Mixed nuts', amount: '1 container', category: 'snacks' },
  { item: 'Protein powder', amount: 'check supply', category: 'snacks' },
  { item: 'Greek yogurt', amount: '4 cups', category: 'snacks' },

  // Essentials
  { item: 'Olive oil', amount: 'check supply', category: 'pantry' },
  { item: 'Salt & seasonings', amount: 'check supply', category: 'pantry' },
];

export const SAMPLE_DAILY_MEALS = {
  breakfast: [
    { name: '4 eggs + 4 bacon', protein: 34, calories: 420 },
    { name: '3 eggs + ground beef', protein: 38, calories: 380 },
    { name: 'Protein shake + 2 eggs', protein: 37, calories: 290 },
  ],
  lunch: [
    { name: 'Chicken thighs (8oz) + veggies', protein: 50, calories: 450 },
    { name: 'Ground beef bowl (8oz)', protein: 45, calories: 400 },
    { name: 'Ribeye (6oz) + side', protein: 40, calories: 500 },
  ],
  dinner: [
    { name: 'Ribeye steak (10oz)', protein: 65, calories: 700 },
    { name: 'Salmon (8oz) + veggies', protein: 50, calories: 450 },
    { name: 'Pork chops (2) + side', protein: 55, calories: 550 },
  ],
  snacks: [
    { name: 'Protein shake', protein: 25, calories: 150 },
    { name: '3 hard boiled eggs', protein: 18, calories: 210 },
    { name: 'Greek yogurt', protein: 20, calories: 150 },
    { name: 'Mixed nuts (1oz)', protein: 6, calories: 170 },
  ]
};

export function getDailyProteinExample(): { meals: string[]; totalProtein: number; totalCalories: number } {
  // Example day hitting 200g protein
  const meals = [
    '4 eggs + 4 bacon (34g)',
    'Chicken thighs 8oz (50g)',
    'Protein shake (25g)',
    '3 hard boiled eggs (18g)',
    'Ribeye 10oz (65g)',
    'Greek yogurt (20g)'
  ];
  return {
    meals,
    totalProtein: 212,
    totalCalories: 2080
  };
}
