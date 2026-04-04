const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

export async function getRecipesByIngredient(query) {
  try {
    console.log("Trying conected to:", query);
    const url = `${BASE_URL}?s=${query}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error in the server: ${response.status}`);
    }

    const data = await response.json();
    if (data.meals) {
      return data.meals.map((meal) => ({
        recipe: {
          label: meal.strMeal,
          image: meal.strMealThumb,
          calories: "N/A",
          url:
            meal.strSource || `https://www.themealdb.com/meal/${meal.idMeal}`,
          healthLabels: [meal.strCategory, meal.strArea],
          dietLabels: [],
        },
      }));
    }
    return [];
  } catch (error) {
    console.error("Recipe Service Error (TheMealDB):", error);
    return [];
  }
}
