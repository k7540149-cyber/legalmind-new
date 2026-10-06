import {
  getData,
  saveData,
  STORAGE_KEYS
} from "../storage/storage";

import { DEFAULT_FAVORITES } from "../data/appDefaults";

export async function getFavorites() {
  const saved = await getData(
    STORAGE_KEYS.FAVORITES,
    DEFAULT_FAVORITES
  );

  return {
    terminology: Array.isArray(saved?.terminology)
      ? saved.terminology
      : [],
    cases: Array.isArray(saved?.cases)
      ? saved.cases
      : []
  };
}

async function saveFavorites(favorites) {
  await saveData(
    STORAGE_KEYS.FAVORITES,
    favorites
  );

  return favorites;
}

export async function isFavorite(type, id) {
  const favorites = await getFavorites();

  if (!favorites[type]) {
    return false;
  }

  return favorites[type].includes(id);
}

export async function addFavorite(type, id) {
  const favorites = await getFavorites();

  if (!favorites[type]) {
    return favorites;
  }

  if (!favorites[type].includes(id)) {
    favorites[type].push(id);
  }

  return saveFavorites(favorites);
}

export async function removeFavorite(type, id) {
  const favorites = await getFavorites();

  if (!favorites[type]) {
    return favorites;
  }

  favorites[type] = favorites[type].filter(
    (item) => item !== id
  );

  return saveFavorites(favorites);
}

export async function toggleFavorite(type, id) {
  const favorite = await isFavorite(type, id);

  if (favorite) {
    return removeFavorite(type, id);
  }

  return addFavorite(type, id);
}

export async function getFavoriteTerminology() {
  const favorites = await getFavorites();

  return favorites.terminology;
}

export async function getFavoriteCases() {
  const favorites = await getFavorites();

  return favorites.cases;
}

export async function clearFavorites() {
  const emptyFavorites = {
    terminology: [],
    cases: []
  };

  return saveFavorites(emptyFavorites);
}