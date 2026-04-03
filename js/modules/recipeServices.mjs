const APP_ID = "b6bf8213";
const APP_KEY = "fd7b2cbeed3c3a64ba44b845905fc537";
const BASE_URL = "https://api.edamam.com/api/recipes/v2";
//const BASE_URL = "https://api.edamam.com/search";

export async function getRecipesByIngredient(query) {
  try {
    const url = `${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    //const url = `${BASE_URL}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      console.error(`Status: ${response.status}`);
      throw new Error("Error fetching data from Edamam");
    }

    const data = await response.json();
    console.log("¡Éxito! Datos recibidos:", data.hits);
    return data.hits;
  } catch (error) {
    console.error("Recipe Service Error:", error);
    return [];
  }
}
