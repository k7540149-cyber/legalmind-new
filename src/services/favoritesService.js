import {
  getData,
  saveData,
  STORAGE_KEYS
} from "../storage/storage";

import { DEFAULT_FAVORITES } from "../data/appDefaults";

import {
  addUniqueFavorite,
  removeFavorite as removeUniqueFavorite,
  uniqueFavorites
} from "../utils/favoritesValidator";

function normalizeType(type) {
  const value = String(type || "").trim();

  if (
    value !== "terminology" &&
    value !== "cases"
  ) {
    return null;
  }

  return value;
}

function normalizeId(id) {
  return String(id || "").trim();
}

export async function getFavorites() {
  const saved = await getData(
    STORAGE_KEYS.FAVORITES,
    DEFAULT_FAVORITES
  );

  return {
    terminology: Array.isArray(saved?.terminology)
      ? [...new Set(saved.terminology.map(normalizeId).filter(Boolean))]
      : [],
    cases: Array.isArray(saved?.cases)
      ? [...new Set(saved.cases.map(normalizeId).filter(Boolean))]
      : []
  };
}

async function saveFavorites(favorites) {
  const cleanFavorites = {
    terminology: [
      ...new Set(
        Array.isArray(favorites?.terminology)
          ? favorites.terminology
              .map(normalizeId)
              .filter(Boolean)
          : []
      )
    ],
    cases: [
      ...new Set(
        Array.isArray(favorites?.cases)
          ? favorites.cases
              .map(normalizeId)
              .filter(Boolean)
          : []
      )
    ]
  };

  await saveData(
    STORAGE_KEYS.FAVORITES,
    cleanFavorites
  );

  return cleanFavorites;
}

export async function isFavorite(type, id) {
  const cleanType = normalizeType(type);
  const cleanId = normalizeId(id);

  if (!cleanType || !cleanId) {
    return false;
  }

  const favorites = await getFavorites();

  return favorites[cleanType].includes(cleanId);
}

export async function addFavorite(type, id) {
  const cleanType = normalizeType(type);
  const cleanId = normalizeId(id);

  if (!cleanType || !cleanId) {
    return getFavorites();
  }

  const favorites = await getFavorites();

  const unique = addUniqueFavorite(
    favorites[cleanType].map((favoriteId) => ({
      type: cleanType,
      id: favoriteId
    })),
    {
      type: cleanType,
      id: cleanId
    }
  );

  const updatedFavorites = {
    ...favorites,
    [cleanType]: unique
      .filter(
        (item) => item.type === cleanType
      )
      .map((item) => item.id)
  };

  return saveFavorites(updatedFavorites);
}

export async function removeFavorite(type, id) {
  const cleanType = normalizeType(type);
  const cleanId = normalizeId(id);

  if (!cleanType || !cleanId) {
    return getFavorites();
  }

  const favorites = await getFavorites();

  return saveFavorites({
    ...favorites,
    [cleanType]: removeUniqueFavorite(
      favorites[cleanType].map((favoriteId) => ({
        type: cleanType,
        id: favoriteId
      })),
      cleanType,
      cleanId
    ).map((item) => item.id)
  });
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

  return uniqueFavorites(
    favorites.terminology.map((id) => ({
      type: "terminology",
      id
    }))
  ).map((item) => item.id);
}

export async function getFavoriteCases() {
  const favorites = await getFavorites();

  return uniqueFavorites(
    favorites.cases.map((id) => ({
      type: "cases",
      id
    }))
  ).map((item) => item.id);
}

export async function clearFavorites() {
  return saveFavorites({
    terminology: [],
    cases: []
  });
}