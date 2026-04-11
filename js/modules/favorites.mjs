import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const FAVORITES_KEY = "nutri-scan-favorites";

export function addToFavorites(recipe) {
  const favorites = getLocalStorage(FAVORITES_KEY);

  // First, If recipe exist.
  const exists = favorites.find((fav) => fav.label === recipe.label);

  if (!exists) {
    favorites.push(recipe);
    setLocalStorage(FAVORITES_KEY, favorites);
    alert("¡Receta guardada en favoritos!");
  } else {
    alert("Esta receta ya está en tus favoritos.");
  }
}

export function getFavorites() {
  return getLocalStorage(FAVORITES_KEY);
}

//Delete or remove
export function removeFromFavorites(recipeLabel) {
  let favorites = getLocalStorage(FAVORITES_KEY);

  favorites = favorites.filter((fav) => fav.label !== recipeLabel);
  setLocalStorage(FAVORITES_KEY, favorites);
}
