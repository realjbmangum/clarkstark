import type { APIRoute } from 'astro';

export const prerender = false;

// USDA FoodData Central API - Free government nutrition database
// Get your free API key at: https://fdc.nal.usda.gov/api-key-signup.html
// Or use DEMO_KEY for testing (limited requests)

const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export const GET: APIRoute = async ({ url, locals }) => {
  const runtime = (locals as any).runtime;

  // Get API key from environment or use DEMO_KEY
  const apiKey = runtime?.env?.USDA_API_KEY || 'DEMO_KEY';

  const query = url.searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter "q" is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Search USDA FoodData Central
    const searchUrl = `${USDA_BASE_URL}/foods/search?api_key=${apiKey}&query=${encodeURIComponent(query)}&pageSize=10&dataType=Foundation,SR%20Legacy`;

    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(`USDA API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform USDA response to our simplified format
    const foods = (data.foods || []).map((food: any) => {
      // Extract nutrients from the nutrients array
      const nutrients = food.foodNutrients || [];

      const getNutrient = (name: string): number => {
        const nutrient = nutrients.find((n: any) =>
          n.nutrientName?.toLowerCase().includes(name.toLowerCase()) ||
          n.nutrientId === getUSDANutrientId(name)
        );
        return Math.round(nutrient?.value || 0);
      };

      return {
        id: food.fdcId,
        name: food.description || food.lowercaseDescription,
        brand: food.brandOwner || null,
        servingSize: '100g',
        calories: getNutrient('energy'),
        protein: getNutrient('protein'),
        carbs: getNutrient('carbohydrate'),
        fat: getNutrient('total lipid') || getNutrient('fat'),
        fiber: getNutrient('fiber'),
        sugar: getNutrient('sugars'),
        sodium: getNutrient('sodium'),
      };
    });

    return new Response(JSON.stringify({ foods }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Food search error:', error);

    // Fallback to local database for common foods
    const fallbackFoods = getFallbackFoods(query);

    return new Response(JSON.stringify({
      foods: fallbackFoods,
      fallback: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// USDA Nutrient IDs for common nutrients
function getUSDANutrientId(name: string): number {
  const ids: Record<string, number> = {
    'energy': 1008,
    'protein': 1003,
    'fat': 1004,
    'carbohydrate': 1005,
    'fiber': 1079,
    'sugars': 2000,
    'sodium': 1093,
  };
  return ids[name.toLowerCase()] || 0;
}

// Fallback local database for common carnivore/high-protein foods
function getFallbackFoods(query: string): any[] {
  const q = query.toLowerCase();

  const foods: Record<string, any> = {
    'ribeye': { name: 'Ribeye Steak', calories: 291, protein: 24, carbs: 0, fat: 21, fiber: 0 },
    'steak': { name: 'Beef Steak', calories: 271, protein: 26, carbs: 0, fat: 18, fiber: 0 },
    'ground beef': { name: 'Ground Beef (85% lean)', calories: 250, protein: 26, carbs: 0, fat: 17, fiber: 0 },
    'chicken breast': { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 4, fiber: 0 },
    'chicken thigh': { name: 'Chicken Thigh', calories: 209, protein: 26, carbs: 0, fat: 11, fiber: 0 },
    'salmon': { name: 'Atlantic Salmon', calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
    'eggs': { name: 'Whole Eggs (2)', calories: 156, protein: 12, carbs: 1, fat: 11, fiber: 0 },
    'egg': { name: 'Whole Egg (1 large)', calories: 78, protein: 6, carbs: 0.6, fat: 5, fiber: 0 },
    'bacon': { name: 'Bacon (4 strips)', calories: 180, protein: 10, carbs: 1, fat: 14, fiber: 0 },
    'pork chop': { name: 'Pork Chop', calories: 231, protein: 25, carbs: 0, fat: 14, fiber: 0 },
    'burger': { name: 'Beef Burger Patty', calories: 300, protein: 25, carbs: 0, fat: 20, fiber: 0 },
    'greek yogurt': { name: 'Greek Yogurt', calories: 97, protein: 17, carbs: 6, fat: 1, fiber: 0 },
    'cottage cheese': { name: 'Cottage Cheese', calories: 98, protein: 11, carbs: 3, fat: 4, fiber: 0 },
    'protein shake': { name: 'Whey Protein Shake', calories: 150, protein: 25, carbs: 3, fat: 2, fiber: 0 },
    'cashews': { name: 'Cashews (1 oz)', calories: 157, protein: 5, carbs: 9, fat: 12, fiber: 1 },
    'peanuts': { name: 'Peanuts (1 oz)', calories: 161, protein: 7, carbs: 5, fat: 14, fiber: 2 },
    'almonds': { name: 'Almonds (1 oz)', calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 4 },
  };

  const results: any[] = [];

  for (const [key, food] of Object.entries(foods)) {
    if (q.includes(key) || key.includes(q)) {
      results.push({
        id: key,
        servingSize: '100g',
        sugar: 0,
        sodium: 0,
        ...food
      });
    }
  }

  // If no matches, return top carnivore foods
  if (results.length === 0) {
    return [
      { id: 'ribeye', name: 'Ribeye Steak', servingSize: '100g', calories: 291, protein: 24, carbs: 0, fat: 21, fiber: 0 },
      { id: 'ground_beef', name: 'Ground Beef', servingSize: '100g', calories: 250, protein: 26, carbs: 0, fat: 17, fiber: 0 },
      { id: 'chicken', name: 'Chicken Breast', servingSize: '100g', calories: 165, protein: 31, carbs: 0, fat: 4, fiber: 0 },
    ];
  }

  return results;
}
