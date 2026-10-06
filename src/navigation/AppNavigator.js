import React, { useEffect, useState } from "react";

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

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);

  const [language, setLanguage] = useState("pashto");
  const [screen, setScreen] = useState("home");

  const [selectedTermId, setSelectedTermId] =
    useState(null);

  const [selectedRole, setSelectedRole] =
    useState(null);

  const [selectedCaseId, setSelectedCaseId] =
    useState(null);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      const profile = await getProfile();
      const settings = await getSettings();

      setSetupComplete(
        Boolean(profile?.setupComplete)
      );

      setLanguage(
        settings?.language || "pashto"
      );
    } finally {
      setLoading(false);
    }
  }

  function goHome() {
    setScreen("home");
  }

  function openRole(role) {
    setSelectedRole(role);
    setScreen("roleCases");
  }

  function openCase(caseId) {
    setSelectedCaseId(caseId);
    setScreen("caseDetail");
  }

  function openGameplay(caseId) {
    setSelectedCaseId(caseId);
    setScreen("caseGameplay");
  }

  if (loading) {
    return null;
  }

  if (!setupComplete) {
    return (
      <OnboardingScreen
        language={language}
        onComplete={() => {
          setSetupComplete(true);
          setScreen("home");
        }}
      />
    );
  }

  if (screen === "home") {
    return (
      <HomeScreen
        language={language}
        onNavigate={(destination) => {
          if (destination === "terminology") {
            setScreen("terminology");
          }

          if (destination === "judge") {
            openRole("judge");
          }

          if (destination === "prosecutor") {
            openRole("prosecutor");
          }

          if (destination === "defense") {
            openRole("defense");
          }

          if (destination === "profile") {
            setScreen("profile");
          }

          if (destination === "favorites") {
            setScreen("favorites");
          }

          if (destination === "notifications") {
            setScreen("notifications");
          }
        }}
      />
    );
  }

  if (screen === "terminology") {
    return (
      <TerminologyScreen
        language={language}
        onBack={goHome}
        onOpenTerm={(termId) => {
          setSelectedTermId(termId);
          setScreen("termDetail");
        }}
      />
    );
  }

  if (screen === "termDetail") {
    return (
      <TermDetailScreen
        termId={selectedTermId}
        language={language}
        onBack={() =>
          setScreen("terminology")
        }
      />
    );
  }

  if (screen === "profile") {
    return (
      <ProfileScreen
        language={language}
        onBack={goHome}
        onOpenProgress={() =>
          setScreen("progress")
        }
        onOpenAchievements={() =>
          setScreen("achievements")
        }
        onOpenSettings={() =>
          setScreen("settings")
        }
      />
    );
  }

  if (screen === "progress") {
    return (
      <ProfileProgressScreen
        language={language}
        onBack={() =>
          setScreen("profile")
        }
      />
    );
  }

  if (screen === "achievements") {
    return (
      <AchievementsScreen
        language={language}
        onBack={() =>
          setScreen("profile")
        }
      />
    );
  }

  if (screen === "settings") {
    return (
      <SettingsScreen
        language={language}
        onBack={() =>
          setScreen("profile")
        }
        onLanguageChange={(newLanguage) => {
          setLanguage(newLanguage);
        }}
        onAbout={() =>
          setScreen("about")
        }
      />
    );
  }

  if (screen === "about") {
    return (
      <AboutScreen
        language={language}
        onBack={() =>
          setScreen("settings")
        }
      />
    );
  }

  if (screen === "notifications") {
    return (
      <NotificationsScreen
        language={language}
        onBack={goHome}
      />
    );
  }

  if (screen === "favorites") {
    return (
      <FavoritesScreen
        language={language}
        onBack={goHome}
        onOpenTerm={(termId) => {
          setSelectedTermId(termId);
          setScreen("termDetail");
        }}
        onOpenCase={openCase}
      />
    );
  }

  if (screen === "roleCases") {
    return (
      <RoleCasesScreen
        role={selectedRole}
        language={language}
        onBack={goHome}
        onOpenCase={openCase}
      />
    );
  }

  if (screen === "caseDetail") {
    return (
      <CaseDetailScreen
        caseId={selectedCaseId}
        language={language}
        onBack={() =>
          setScreen("roleCases")
        }
        onStart={openGameplay}
      />
    );
  }

  if (screen === "caseGameplay") {
    return (
      <CaseGameplayScreen
        caseId={selectedCaseId}
        language={language}
        onBack={() =>
          setScreen("caseDetail")
        }
        onCompleted={() =>
          setScreen("roleCases")
        }
      />
    );
  }

  return null;
}