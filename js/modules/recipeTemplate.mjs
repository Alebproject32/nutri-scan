export function recipeCardTemplate(hit) {
  const recipe = hit.recipe;

  //calories
  const calories = Math.round(recipe.calories);

  //(Labels) as 'Gluten-Free' o 'Vegan'
  const healthLabels = recipe.healthLabels.slice(0, 3).join(", ");

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

                <a href="${recipe.url}" target="_blank" rel="noopener noreferrer" class="view-recipe-btn">
                    View Recipe
                </a>
            </div>
        </div>
    `;
}
