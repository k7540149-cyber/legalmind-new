import { uniqueById, uniqueByField } from "./uniqueData";
import { uniqueFavorites } from "./favoritesValidator";
import { uniqueAchievements } from "./achievementValidator";
import { uniqueSyncQueue } from "./syncValidator";
import { validateProgress } from "./progressValidator";
import { validateCases } from "./caseValidator";
import { validateTerminology } from "./terminologyValidator";

export function cleanCases(cases = []) {
  return validateCases(cases).cases;
}

export function cleanTerminology(terms = []) {
  return validateTerminology(terms).terms;
}

export function cleanFavorites(favorites = []) {
  return uniqueFavorites(favorites);
}

export function cleanAchievements(achievements = []) {
  return uniqueAchievements(achievements);
}

export function cleanSyncQueue(queue = []) {
  return uniqueSyncQueue(queue);
}

export function cleanProgress(progress = {}) {
  return validateProgress(progress);
}

export function cleanUsers(users = []) {
  return uniqueByField(users, "email");
}

export function cleanById(items = []) {
  return uniqueById(items);
}

export function cleanData({
  cases = [],
  terminology = [],
  favorites = [],
  achievements = [],
  syncQueue = [],
  progress = {},
  users = []
} = {}) {
  return {
    cases: cleanCases(cases),
    terminology: cleanTerminology(terminology),
    favorites: cleanFavorites(favorites),
    achievements: cleanAchievements(achievements),
    syncQueue: cleanSyncQueue(syncQueue),
    progress: cleanProgress(progress),
    users: cleanUsers(users)
  };
}