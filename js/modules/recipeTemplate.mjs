export function recipeCardTemplate(hit) {
  const recipe = hit.recipe;

  // Calories
  const calories =
    recipe.calories !== "N/A" ? Math.round(recipe.calories) : "---";

  const healthLabels = recipe.healthLabels.slice(0, 3).join(", ");

  // Convert to string
  const recipeString = JSON.stringify(recipe).replace(/'/g, "&apos;");

  return `
        <div class="recipe-card">
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.label}" loading="lazy">
            </div>
            <div class="recipe-content">
                <span class="recipe-category">${recipe.dietLabels[0] || "Healthy"}</span>
                <h3>${recipe.label}</h3>
                
                <div class="recipe-info">
                    <div class="info-item">
                        <span class="icon">🔥</span>
                        <span>${calories} kcal</span>
                    </div>
                    <div class="info-item">
                        <span class="icon">🍃</span>
                        <span>${healthLabels}</span>
                    </div>
                </div>

                <div class="recipe-actions">
                    <a href="${recipe.url}" target="_blank" rel="noopener noreferrer" class="view-recipe-btn">
                        View Recipe
                    </a>
                    
                    <button class="save-btn" data-recipe='${recipeString}'>
                        ⭐ Favorite
                    </button>

                    <button class="delete-btn" data-label="${recipe.label}">
                        🗑️ Remove
                    </button>
                </div>
            </div>
        </div>
    `;
}
