import { getRecipesByIngredient } from "./modules/recipeServices.mjs";
import { recipeCardTemplate } from "./modules/recipeTemplate.mjs";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "./modules/favorites.mjs";

// DOM Element Selection
const searchBtn = document.querySelector("#search-btn");
const ingredientInput = document.querySelector("#ingredient-input");
const recipeGrid = document.querySelector("#recipe-grid");
const favoritesLink = document.querySelector("#favorites-link");

// Connection test for debugging purposes
console.log("Script loaded. Button found:", searchBtn);

/**
 * Search Button Event Listener
 * Handles input validation, API calls, and rendering initial search results.
 */
searchBtn.addEventListener("click", async () => {
  const query = ingredientInput.value.trim();

  ingredientInput.classList.remove("input-error");

  // Input Validation: Check for empty string
  if (!query) {
    ingredientInput.classList.add("input-error");
    alert("Please enter an ingredient to start searching 🍎");
    return;
  }

  // Input Validation: Ensure the query is long enough for the API to be effective
  if (query.length < 3) {
    ingredientInput.classList.add("input-error");
    alert("The ingredient name is too short. Try at least 3 characters.");
    return;
  }

  console.log("Searching ingredients:", query);

  // Set UI context to Search Mode
  recipeGrid.classList.remove("favorites-mode");
  recipeGrid.classList.add("search-mode");

  try {
    // Show loading state to the user
    recipeGrid.innerHTML =
      "<p>🍎 Searching delicious recipes or Scanning recipes...🍏</p>";

    // Fetch data from external Recipe Service (Edamam API)
    const recipes = await getRecipesByIngredient(query);

    console.log("Receiving data from API:", recipes);
    renderSimpleResults(recipes);
  } catch (error) {
    console.error("Error in searching:", error);
    recipeGrid.innerHTML =
      "<p>❌ Something went wrong. Please try again later.</p>";
  }
});

/**
 * Renders the recipe cards into the main grid.
 * @param {Array} recipes
 */
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

/**
 * Main Grid Event Delegation
 * Handles clicks for Info (Modal), Saving to Favorites, and Removing from Favorites.
 */
recipeGrid.addEventListener("click", (e) => {
  // 1. NUTRITIONAL DETAILS VIEW (MODAL)
  const infoBtn = e.target.closest(".info-btn");
  if (infoBtn) {
    try {
      const recipe = JSON.parse(infoBtn.dataset.recipe);
      const modal = document.querySelector("#recipe-modal");
      const details = document.querySelector("#modal-details");

      const getNutrient = (nutrientKey) => {
        return recipe.totalNutrients && recipe.totalNutrients[nutrientKey]
          ? `${Math.round(recipe.totalNutrients[nutrientKey].quantity)}g`
          : "N/A";
      };

      const fat = getNutrient("FAT");
      const carbs = getNutrient("CHOCDF");
      const protein = getNutrient("PROCNT");
      const fiber = getNutrient("FIBTG");

      // Inject nutritional data into the modal content
      details.innerHTML = `
          <h2>${recipe.label} - Nutrition</h2>
          <ul class="nutrition-list">
              <li><strong>Fat:</strong> <span>${fat}</span></li>
              <li><strong>Carbs:</strong> <span>${carbs}</span></li>
              <li><strong>Protein:</strong> <span>${protein}</span></li>
              <li><strong>Fiber:</strong> <span>${fiber}</span></li>
          </ul>
          <p style="font-size: 0.8rem; color: #666; margin-top: 15px;">
            * Values are approximate based on the API data.
          </p>
      `;

      modal.style.display = "block";
      console.log("Modal opened with safe data parsing");
    } catch (error) {
      console.error("Error parsing recipe data for modal:", error);
    }
  }

  // 2. SAVE TO FAVORITES
  if (e.target.classList.contains("save-btn")) {
    try {
      const recipeData = JSON.parse(e.target.dataset.recipe);
      addToFavorites(recipeData);

      // Feedback
      e.target.textContent = "❤️ Saved";
      e.target.style.backgroundColor = "#e74c3c";
    } catch (error) {
      console.error("Error parsing recipe data:", error);
    }
  }

  // 3. DELETE FROM FAVORITES
  if (e.target.classList.contains("delete-btn")) {
    const recipeLabel = e.target.dataset.label;
    removeFromFavorites(recipeLabel);

    const savedRecipes = getFavorites();
    const formattedFavorites = savedRecipes.map((recipe) => ({ recipe }));
    renderSimpleResults(formattedFavorites);
  }
});

/**
 * Favorites Navigation Handler
 */
favoritesLink.addEventListener("click", (e) => {
  e.preventDefault();

  // Favorites Mode
  recipeGrid.classList.remove("search-mode");
  recipeGrid.classList.add("favorites-mode");

  const savedRecipes = getFavorites();
  document.querySelector(".recipe-results h2").textContent = "YOUR FAVORITES";

  const formattedFavorites = savedRecipes.map((recipe) => ({ recipe }));
  renderSimpleResults(formattedFavorites);

  if (savedRecipes.length === 0) {
    recipeGrid.innerHTML =
      "<p>You haven't saved any recipes yet. Start searching and click ⭐!</p>";
  }
});

/**
 * Modal Close Controllers
 */
document.querySelector(".close-modal").addEventListener("click", () => {
  document.querySelector("#recipe-modal").style.display = "none";
});

// Close modal when clicking outside the content area
window.addEventListener("click", (event) => {
  const modal = document.querySelector("#recipe-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
