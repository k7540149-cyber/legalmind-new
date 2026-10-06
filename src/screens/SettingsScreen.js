import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { COLORS } from "../constants/app";
import {
  getSettings,
  updateSetting
} from "../services/settingsService";
import { resetProgress } from "../engine/caseProgress";
import { clearAllLegalMindData } from "../storage/storage";

export default function SettingsScreen({
  language = "pashto",
  onBack,
  onLanguageChange,
  onAbout
}) {
  const [settings, setSettings] = useState({
    soundEffects: true,
    backgroundMusic: true,
    vibration: true,
    notifications: true,
    language: "pashto"
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const saved = await getSettings();

    if (saved) {
      setSettings((current) => ({
        ...current,
        ...saved
      }));
    }
  }

  async function toggleSetting(key) {
    const value = !settings[key];

    const updated = {
      ...settings,
      [key]: value
    };

    setSettings(updated);
    await updateSetting(key, value);
  }

  async function changeLanguage(value) {
    const updated = {
      ...settings,
      language: value
    };

    setSettings(updated);
    await updateSetting("language", value);
    onLanguageChange?.(value);
  }

  function confirmReset() {
    Alert.alert(
      "⚠️",
      language === "english"
        ? "Reset all game data? This action cannot be undone."
        : language === "dari"
        ? "همه معلومات بازی حذف شود؟ این کار برگشت‌پذیر نیست."
        : "د لوبې ټول معلومات پاک شي؟ دا کار بېرته نه راګرځي.",
      [
        {
          text:
            language === "english"
              ? "Cancel"
              : language === "dari"
              ? "لغو"
              : "لغوه",
          style: "cancel"
        },
        {
          text:
            language === "english"
              ? "Reset"
              : language === "dari"
              ? "حذف"
              : "پاکول",
          style: "destructive",
          onPress: resetGame
        }
      ]
    );
  }

  async function resetGame() {
    await resetProgress();
    await clearAllLegalMindData();

    Alert.alert(
      "LegalMind",
      language === "english"
        ? "Game data has been reset."
        : language === "dari"
        ? "معلومات بازی دوباره تنظیم شد."
        : "د لوبې معلومات پاک شول."
    );
  }

  const text =
    language === "english"
      ? {
          title: "Settings",
          back: "Back",
          sound: "Sound Effects",
          music: "Background Music",
          vibration: "Vibration",
          notifications: "Notifications",
          language: "Language",
          pashto: "Pashto",
          dari: "Dari",
          english: "English",
          about: "About the App",
          reset: "Reset Game Data",
          resetWarning: "Delete all local progress and profile data."
        }
      : language === "dari"
      ? {
          title: "تنظیمات",
          back: "برگشت",
          sound: "صداهای بازی",
          music: "موسیقی پس‌زمینه",
          vibration: "لرزش",
          notifications: "اعلان‌ها",
          language: "زبان",
          pashto: "پشتو",
          dari: "دری",
          english: "انگلیسی",
          about: "درباره برنامه",
          reset: "حذف معلومات بازی",
          resetWarning: "تمام پیشرفت و معلومات محلی حذف می‌شود."
        }
      : {
          title: "تنظیمات",
          back: "بېرته",
          sound: "د غږ اغېزې",
          music: "شالید موسیقي",
          vibration: "وېبریشن",
          notifications: "خبرتیاوې",
          language: "ژبه",
          pashto: "پښتو",
          dari: "دري",
          english: "انګلیسي",
          about: "د اپلیکیشن په اړه",
          reset: "د لوبې معلومات پاکول",
          resetWarning:
            "ټول محلي پرمختګ او پروفایل معلومات به پاک شي."
        };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backIcon}>‹</Text>

            <Text style={styles.backText}>
              {text.back}
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            ⚙️ {text.title}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          <Text style={styles.sectionTitle}>
            🔊
          </Text>

          <SettingSwitch
            title={text.sound}
            value={settings.soundEffects}
            onChange={() =>
              toggleSetting("soundEffects")
            }
          />

          <SettingSwitch
            title={text.music}
            value={settings.backgroundMusic}
            onChange={() =>
              toggleSetting("backgroundMusic")
            }
          />

          <SettingSwitch
            title={text.vibration}
            value={settings.vibration}
            onChange={() =>
              toggleSetting("vibration")
            }
          />

          <SettingSwitch
            title={text.notifications}
            value={settings.notifications}
            onChange={() =>
              toggleSetting("notifications")
            }
          />

          <Text style={styles.sectionTitle}>
            🌐 {text.language}
          </Text>

          <View style={styles.languageCard}>

            <LanguageButton
              title={text.pashto}
              active={
                settings.language === "pashto"
              }
              onPress={() =>
                changeLanguage("pashto")
              }
            />

            <LanguageButton
              title={text.dari}
              active={
                settings.language === "dari"
              }
              onPress={() =>
                changeLanguage("dari")
              }
            />

            <LanguageButton
              title={text.english}
              active={
                settings.language === "english"
              }
              onPress={() =>
                changeLanguage("english")
              }
            />

          </View>

          <Text style={styles.sectionTitle}>
            ℹ️
          </Text>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={onAbout}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>
              📱
            </Text>

            <Text style={styles.actionText}>
              {text.about}
            </Text>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>
            ⚠️
          </Text>

          <TouchableOpacity
            style={styles.resetCard}
            onPress={confirmReset}
            activeOpacity={0.8}
          >
            <Text style={styles.resetTitle}>
              🗑️ {text.reset}
            </Text>

            <Text style={styles.resetDescription}>
              {text.resetWarning}
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function SettingSwitch({
  title,
  value,
  onChange
}) {
  return (
    <View style={styles.settingCard}>
      <Text style={styles.settingText}>
        {title}
      </Text>

      <Switch
        value={Boolean(value)}
        onValueChange={onChange}
        trackColor={{
          false: "#34434D",
          true: COLORS.gold
        }}
        thumbColor={
          value ? COLORS.white : "#B8C2CC"
        }
      />
    </View>
  );
}

function LanguageButton({
  title,
  active,
  onPress
}) {
  return (
    <TouchableOpacity
      style={[
        styles.languageButton,
        active && styles.activeLanguage
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.languageText,
          active && styles.activeLanguageText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.navy
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10
  },

  header: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  backButton: {
    minWidth: 80,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center"
  },

  backIcon: {
    color: COLORS.gold,
    fontSize: 34,
    lineHeight: 36
  },

  backText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700"
  },

  headerTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center"
  },

  headerSpace: {
    width: 80
  },

  content: {
    paddingTop: 12,
    paddingBottom: 35
  },

  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 12,
    marginBottom: 9
  },

  settingCard: {
    minHeight: 60,
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  settingText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700"
  },

  languageCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 14,
    padding: 10,
    marginBottom: 5
  },

  languageButton: {
    minHeight: 46,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 3
  },

  activeLanguage: {
    backgroundColor: COLORS.gold
  },

  languageText: {
    color: COLORS.lightGray,
    fontSize: 14,
    fontWeight: "800"
  },

  activeLanguageText: {
    color: COLORS.navy
  },

  actionCard: {
    minHeight: 62,
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center"
  },

  actionIcon: {
    fontSize: 23,
    marginRight: 12
  },

  actionText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800"
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 30
  },

  resetCard: {
    backgroundColor: "#32191A",
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 14,
    padding: 15
  },

  resetTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 6
  },

  resetDescription: {
    color: "#D7BABA",
    fontSize: 12,
    lineHeight: 18
  }
});