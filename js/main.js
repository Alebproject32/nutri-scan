import { getRecipesByIngredient } from "./modules/recipeServices.mjs";
import { recipeCardTemplate } from "./modules/recipeTemplate.mjs";

const searchBtn = document.querySelector("#search-btn");
const ingredientInput = document.querySelector("#ingredient-input");
const recipeGrid = document.querySelector("#recipe-grid");

// Test my conexion
console.log("Script loaded. Button found:", searchBtn);

searchBtn.addEventListener("click", async () => {
  const query = ingredientInput.value;
  console.log("Searching ingredients:", query);

  if (query) {
    try {
      recipeGrid.innerHTML =
        "<p>🍎 Searching delicious recipes or Scanning recipes...🍏</p>";
      const recipes = await getRecipesByIngredient(query);

      console.log("Recibing data of Edamam:", recipes);
      renderSimpleResults(recipes);
    } catch (error) {
      console.error("Error in searching:", error);
    }
  } else {
    alert("Please enter an ingredient first");
  }
});

function renderSimpleResults(recipes) {
  recipeGrid.innerHTML = "";
  if (recipes.length === 0) {
    recipeGrid.innerHTML =
      "<p>No recipes found. Try again with another ingredient!</p>";
    return;
  }

  const htmlCards = recipes.map((hit) => recipeCardTemplate(hit)).join("");
  recipeGrid.innerHTML = htmlCards;
}
