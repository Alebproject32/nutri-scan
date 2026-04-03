// js/main.js
import { getRecipesByIngredient } from "./modules/recipeServices.mjs";

const searchBtn = document.querySelector("#search-btn");
const ingredientInput = document.querySelector("#ingredient-input");
const recipeGrid = document.querySelector("#recipe-grid");

// Prueba de conexión inmediata
console.log("Script cargado. Botón encontrado:", searchBtn);

searchBtn.addEventListener("click", async () => {
  const query = ingredientInput.value;
  console.log("Buscando ingrediente:", query); // Esto debe salir al hacer clic

  if (query) {
    try {
      recipeGrid.innerHTML = "<p>🍎 Scanning recipes...</p>";
      const recipes = await getRecipesByIngredient(query);

      console.log("Datos recibidos de Edamam:", recipes);
      renderSimpleResults(recipes);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  } else {
    alert("Please enter an ingredient first");
  }
});

function renderSimpleResults(recipes) {
  recipeGrid.innerHTML = "";
  if (recipes.length === 0) {
    recipeGrid.innerHTML = "<p>No recipes found. Try again!</p>";
    return;
  }

  recipes.forEach((hit) => {
    const p = document.createElement("p");
    p.textContent = `🍏 ${hit.recipe.label}`;
    recipeGrid.appendChild(p);
  });
}
