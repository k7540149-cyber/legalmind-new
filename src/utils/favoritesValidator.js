export function uniqueFavorites(favorites = []) {
  const seen = new Set();

  return favorites.filter((item) => {
    const type = String(item?.type || "").trim();
    const id = String(item?.id || "").trim();

    if (!type || !id) {
      return false;
    }

    const key = `${type}:${id}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function isFavoriteDuplicate(
  favorites = [],
  type,
  id
) {
  const key = `${String(type || "").trim()}:${String(
    id || ""
  ).trim()}`;

  return favorites.some(
    (item) =>
      `${String(item?.type || "").trim()}:${String(
        item?.id || ""
      ).trim()}` === key
  );
}

export function addUniqueFavorite(
  favorites = [],
  favorite
) {
  if (!favorite?.type || !favorite?.id) {
    return favorites;
  }

  if (
    isFavoriteDuplicate(
      favorites,
      favorite.type,
      favorite.id
    )
  ) {
    return favorites;
  }

  return [...favorites, favorite];
}

export function removeFavorite(
  favorites = [],
  type,
  id
) {
  return favorites.filter(
    (item) =>
      !(
        String(item?.type || "").trim() ===
          String(type || "").trim() &&
        String(item?.id || "").trim() ===
          String(id || "").trim()
      )
  );
}