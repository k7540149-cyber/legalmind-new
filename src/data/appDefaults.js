import { LANGUAGES } from "./languages";
import { ROLES } from "./roles";

export const DEFAULT_PROFILE = {
  name: "",
  surname: "",
  email: "",
  setupComplete: false,
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
  attempt: 0,
  hintsUsed: 0,
  startedAt: null,
  completed: false,
};

export const APP_LIMITS = {
  totalCases: 100,
  minimumScore: 40,
  maximumRoleSkill: 100,
  maximumAttempt: 100,
  maximumHints: 100,
};

export const SETUP_FIELDS = [
  "name",
  "surname",
  "email",
];

export const ABOUT_CREATOR = {
  name: "اميد مومند",
  displayName: "اميد حسن زی",
  university: "ننګرهار پوهنتون",
  faculty: "حقوق او سياسي علوم",
  department: "حقوقي علوم",
  semester: "5",
  classYear: "3",
  academicYear: "1405",
  email: "omidhasanzai@gmail.com",
  telegram: "@momand330",
  appVersion: "9",
};