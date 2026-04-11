import { getRecipesByIngredient } from "./modules/recipeServices.mjs";
import { recipeCardTemplate } from "./modules/recipeTemplate.mjs";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "./modules/favorites.mjs";

const searchBtn = document.querySelector("#search-btn");
const ingredientInput = document.querySelector("#ingredient-input");
const recipeGrid = document.querySelector("#recipe-grid");
const favoritesLink = document.querySelector("#favorites-link");

// Test my conexion
console.log("Script loaded. Button found:", searchBtn);

searchBtn.addEventListener("click", async () => {
  const query = ingredientInput.value;
  console.log("Searching ingredients:", query);
  recipeGrid.classList.remove("favorites-mode");
  recipeGrid.classList.add("search-mode");

  if (query) {
    try {
      recipeGrid.innerHTML =
        "<p>🍎 Searching delicious recipes or Scanning recipes...🍏</p>";
      const recipes = await getRecipesByIngredient(query);

      console.log("Receiving data from API:", recipes);
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

recipeGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("save-btn")) {
    try {
      const recipeData = JSON.parse(e.target.dataset.recipe);
      addToFavorites(recipeData);
      e.target.textContent = "❤️ Saved";
      e.target.style.backgroundColor = "#e74c3c";
    } catch (error) {
      console.error("Error parsing recipe data:", error);
    }
  }
  //Delete button
  if (e.target.classList.contains("delete-btn")) {
    const recipeLabel = e.target.dataset.label;
    removeFromFavorites(recipeLabel);

    const savedRecipes = getFavorites();
    const formattedFavorites = savedRecipes.map((recipe) => ({ recipe }));
    renderSimpleResults(formattedFavorites);
  }
});

favoritesLink.addEventListener("click", (e) => {
  e.preventDefault();
  recipeGrid.classList.remove("search-mode");
  recipeGrid.classList.add("favorites-mode");

  const savedRecipes = getFavorites();

  document.querySelector(".recipe-results h2").textContent = "YOUR FAVORITES";

  const formattedFavorites = savedRecipes.map((recipe) => ({ recipe }));

  renderSimpleResults(formattedFavorites);

  //Feedback
  if (savedRecipes.length === 0) {
    recipeGrid.innerHTML =
      "<p>You haven't saved any recipes yet. Start searching and click ⭐!</p>";
  }
});
