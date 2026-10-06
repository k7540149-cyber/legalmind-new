import { LANGUAGES } from "./languages";
import { ROLES } from "./roles";

export const DEFAULT_PROFILE = {
  name: "",
  surname: "",
  email: "",
};

export const DEFAULT_PROGRESS = {
  level: 1,
  progressPoints: 0,

  roles: {
    [ROLES.JUDGE]: {
      completedCases: [],
      unlockedCases: ["case-judge-001"],
      skill: 0,
    },

    [ROLES.PROSECUTOR]: {
      completedCases: [],
      unlockedCases: ["case-prosecutor-001"],
      skill: 0,
    },

    [ROLES.DEFENSE]: {
      completedCases: [],
      unlockedCases: ["case-defense-001"],
      skill: 0,
    },
  },
};

export const DEFAULT_SETTINGS = {
  language: LANGUAGES.PASHTO,
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  notificationsEnabled: true,
};

export const DEFAULT_ACHIEVEMENTS = [];

export const DEFAULT_FAVORITES = {
  terminology: [],
  cases: [],
};

export const DEFAULT_CASE_STATE = {
  activeCaseId: null,
  role: null,
  attempts: 0,
  hintsUsed: 0,
  submitted: false,
  completed: false,
};

export const APP_LIMITS = {
  totalCases: 100,
  minimumScore: 40,
  maximumRoleSkill: 100,
};

export const SETUP_FIELDS = [
  "name",
  "surname",
  "email",
];