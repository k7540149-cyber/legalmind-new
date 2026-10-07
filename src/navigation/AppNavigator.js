import React, { useCallback, useEffect, useState } from "react";

import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import TerminologyScreen from "../screens/TerminologyScreen";
import TermDetailScreen from "../screens/TermDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import RoleCasesScreen from "../screens/RoleCasesScreen";
import CaseDetailScreen from "../screens/CaseDetailScreen";
import CaseGameplayScreen from "../screens/CaseGameplayScreen";
import AchievementsScreen from "../screens/AchievementsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileProgressScreen from "../screens/ProfileProgressScreen";

import { getProfile } from "../services/profileService";
import { getSettings } from "../services/settingsService";

const SCREENS = {
  HOME: "home",
  TERMINOLOGY: "terminology",
  TERM_DETAIL: "termDetail",
  PROFILE: "profile",
  PROGRESS: "progress",
  ACHIEVEMENTS: "achievements",
  SETTINGS: "settings",
  ABOUT: "about",
  NOTIFICATIONS: "notifications",
  FAVORITES: "favorites",
  ROLE_CASES: "roleCases",
  CASE_DETAIL: "caseDetail",
  CASE_GAMEPLAY: "caseGameplay",
};

const DEFAULT_LANGUAGE = "pashto";

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);
  const [language, setLanguage] = useState(
    DEFAULT_LANGUAGE
  );

  const [screen, setScreen] = useState(
    SCREENS.HOME
  );

  const [selectedTermId, setSelectedTermId] =
    useState(null);

  const [selectedRole, setSelectedRole] =
    useState(null);

  const [selectedCaseId, setSelectedCaseId] =
    useState(null);

  const initialize = useCallback(async () => {
    try {
      const profile = await getProfile();
      const settings = await getSettings();

      setSetupComplete(
        Boolean(profile?.setupComplete)
      );

      setLanguage(
        settings?.language ||
          DEFAULT_LANGUAGE
      );
    } catch (error) {
      console.error(
        "LegalMind navigator initialization error:",
        error
      );

      setSetupComplete(false);
      setLanguage(DEFAULT_LANGUAGE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  function goHome() {
    setScreen(SCREENS.HOME);
  }

  function openTerminology() {
    setScreen(SCREENS.TERMINOLOGY);
  }

  function openTerm(termId) {
    if (!termId) return;

    setSelectedTermId(termId);
    setScreen(SCREENS.TERM_DETAIL);
  }

  function openProfile() {
    setScreen(SCREENS.PROFILE);
  }

  function openProgress() {
    setScreen(SCREENS.PROGRESS);
  }

  function openAchievements() {
    setScreen(SCREENS.ACHIEVEMENTS);
  }

  function openSettings() {
    setScreen(SCREENS.SETTINGS);
  }

  function openAbout() {
    setScreen(SCREENS.ABOUT);
  }

  function openNotifications() {
    setScreen(SCREENS.NOTIFICATIONS);
  }

  function openFavorites() {
    setScreen(SCREENS.FAVORITES);
  }

  function openRole(role) {
    if (!role) return;

    setSelectedRole(role);
    setScreen(SCREENS.ROLE_CASES);
  }

  function openCase(caseId) {
    if (!caseId) return;

    setSelectedCaseId(caseId);
    setScreen(SCREENS.CASE_DETAIL);
  }

  function openGameplay(caseId) {
    if (!caseId) return;

    setSelectedCaseId(caseId);
    setScreen(SCREENS.CASE_GAMEPLAY);
  }

  function handleHomeNavigation(destination) {
    switch (destination) {
      case "terminology":
        openTerminology();
        break;

      case "judge":
        openRole("judge");
        break;

      case "prosecutor":
        openRole("prosecutor");
        break;

      case "defense":
        openRole("defense");
        break;

      case "profile":
        openProfile();
        break;

      case "favorites":
        openFavorites();
        break;

      case "notifications":
        openNotifications();
        break;

      default:
        break;
    }
  }

  function handleSetupComplete() {
    setSetupComplete(true);
    setScreen(SCREENS.HOME);
  }

  function handleLanguageChange(
    newLanguage
  ) {
    if (
      typeof newLanguage !== "string" ||
      !newLanguage.trim()
    ) {
      return;
    }

    setLanguage(newLanguage);
  }

  if (loading) {
    return null;
  }

  if (!setupComplete) {
    return (
      <OnboardingScreen
        language={language}
        onComplete={handleSetupComplete}
      />
    );
  }

  if (screen === SCREENS.HOME) {
    return (
      <HomeScreen
        language={language}
        onNavigate={
          handleHomeNavigation
        }
      />
    );
  }

  if (screen === SCREENS.TERMINOLOGY) {
    return (
      <TerminologyScreen
        language={language}
        onBack={goHome}
        onOpenTerm={openTerm}
      />
    );
  }

  if (screen === SCREENS.TERM_DETAIL) {
    return (
      <TermDetailScreen
        termId={selectedTermId}
        language={language}
        onBack={() =>
          setScreen(
            SCREENS.TERMINOLOGY
          )
        }
      />
    );
  }

  if (screen === SCREENS.PROFILE) {
    return (
      <ProfileScreen
        language={language}
        onBack={goHome}
        onOpenProgress={
          openProgress
        }
        onOpenAchievements={
          openAchievements
        }
        onOpenSettings={
          openSettings
        }
      />
    );
  }

  if (screen === SCREENS.PROGRESS) {
    return (
      <ProfileProgressScreen
        language={language}
        onBack={() =>
          setScreen(
            SCREENS.PROFILE
          )
        }
      />
    );
  }

  if (screen === SCREENS.ACHIEVEMENTS) {
    return (
      <AchievementsScreen
        language={language}
        onBack={() =>
          setScreen(
            SCREENS.PROFILE
          )
        }
      />
    );
  }

  if (screen === SCREENS.SETTINGS) {
    return (
      <SettingsScreen
        language={language}
        onBack={() =>
          setScreen(
            SCREENS.PROFILE
          )
        }
        onLanguageChange={
          handleLanguageChange
        }
        onAbout={openAbout}
      />
    );
  }

  if (screen === SCREENS.ABOUT) {
    return (
      <AboutScreen
        language={language}
        onBack={() =>
          setScreen(
            SCREENS.SETTINGS
          )
        }
      />
    );
  }

  if (screen === SCREENS.NOTIFICATIONS) {
    return (
      <NotificationsScreen
        language={language}
        onBack={goHome}
      />
    );
  }

  if (screen === SCREENS.FAVORITES) {
    return (
      <FavoritesScreen
        language={language}
        onBack={goHome}
        onOpenTerm={openTerm}
        onOpenCase={openCase}
      />
    );
  }

  if (screen === SCREENS.ROLE_CASES) {
    return (
      <RoleCasesScreen
        role={selectedRole}
        language={language}
        onBack={goHome}
        onOpenCase={openCase}
      />
    );
  }

  if (screen === SCREENS.CASE_DETAIL) {
    return (
      <CaseDetailScreen
        caseId={selectedCaseId}
        language={language}
        onBack={() =>
          setScreen(
            SCREENS.ROLE_CASES
          )
        }
        onStart={openGameplay}
      />
    );
  }

  if (screen === SCREENS.CASE_GAMEPLAY) {
    return (
      <CaseGameplayScreen
        caseId={selectedCaseId}
        language={language}
        onBack={() =>
          setScreen(
            SCREENS.CASE_DETAIL
          )
        }
        onCompleted={() =>
          setScreen(
            SCREENS.ROLE_CASES
          )
        }
      />
    );
  }

  return null;
}