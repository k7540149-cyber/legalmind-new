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

import {
  clearAllLegalMindData
} from "../storage/storage";

export default function SettingsScreen({
  language = "pashto",
  onBack,
  onLanguageChange,
  onAbout
}) {
  const [settings, setSettings] =
    useState({
      soundEnabled: true,
      musicEnabled: true,
      vibrationEnabled: true,
      notificationsEnabled: true,
      language: "pashto"
    });

  const [loading, setLoading] =
    useState(true);

  const [resetting, setResetting] =
    useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const saved =
        await getSettings();

      if (saved) {
        setSettings({
          soundEnabled:
            saved.soundEnabled !== false,

          musicEnabled:
            saved.musicEnabled !== false,

          vibrationEnabled:
            saved.vibrationEnabled !== false,

          notificationsEnabled:
            saved.notificationsEnabled !== false,

          language:
            saved.language ||
            language ||
            "pashto"
        });
      }
    } catch (error) {
      console.error(
        "LegalMind settings error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function toggleSetting(key) {
    const currentValue =
      Boolean(settings[key]);

    const newValue =
      !currentValue;

    const updated = {
      ...settings,
      [key]: newValue
    };

    setSettings(updated);

    try {
      const saved =
        await updateSetting(
          key,
          newValue
        );

      setSettings((current) => ({
        ...current,
        ...saved
      }));
    } catch (error) {
      console.error(
        "LegalMind setting update error:",
        error
      );

      setSettings((current) => ({
        ...current,
        [key]: currentValue
      }));
    }
  }

  async function changeLanguage(
    value
  ) {
    try {
      const saved =
        await updateSetting(
          "language",
          value
        );

      setSettings((current) => ({
        ...current,
        ...saved,
        language: value
      }));

      onLanguageChange?.(value);
    } catch (error) {
      console.error(
        "LegalMind language error:",
        error
      );
    }
  }

  function confirmReset() {
    Alert.alert(
      getText("resetTitle"),
      getText("resetMessage"),
      [
        {
          text: getText("cancel"),
          style: "cancel"
        },
        {
          text: getText("reset"),
          style: "destructive",
          onPress:
            resetGame
        }
      ]
    );
  }

  async function resetGame() {
    if (resetting) {
      return;
    }

    setResetting(true);

    try {
      await clearAllLegalMindData();

      Alert.alert(
        "LegalMind",
        getText("resetDone")
      );
    } catch (error) {
      console.error(
        "LegalMind reset error:",
        error
      );

      Alert.alert(
        "LegalMind",
        getText("resetError")
      );
    } finally {
      setResetting(false);
    }
  }

  function getText(key) {
    const texts = {
      pashto: {
        title:
          "تنظیمات",
        back:
          "بېرته",
        sound:
          "د غږ اغېزې",
        music:
          "شالید موسیقي",
        vibration:
          "وېبریشن",
        notifications:
          "خبرتیاوې",
        language:
          "ژبه",
        pashto:
          "پښتو",
        dari:
          "دري",
        english:
          "انګلیسي",
        about:
          "د اپلیکیشن په اړه",
        reset:
          "د لوبې معلومات پاکول",
        resetTitle:
          "⚠️ د معلوماتو پاکول",
        resetMessage:
          "ایا د LegalMind ټول محلي پروفایل، پرمختګ، خوښې، لاسته راوړنې او تنظیمات پاک شي؟ دا کار بېرته نه راګرځي.",
        cancel:
          "لغوه",
        resetDone:
          "د LegalMind ټول محلي معلومات پاک شول.",
        resetError:
          "د معلوماتو د پاکولو پر مهال ستونزه رامنځته شوه.",
        loading:
          "..."
      },

      dari: {
        title:
          "تنظیمات",
        back:
          "برگشت",
        sound:
          "صداهای بازی",
        music:
          "موسیقی پس‌زمینه",
        vibration:
          "لرزش",
        notifications:
          "اعلان‌ها",
        language:
          "زبان",
        pashto:
          "پشتو",
        dari:
          "دری",
        english:
          "انگلیسی",
        about:
          "درباره برنامه",
        reset:
          "حذف معلومات بازی",
        resetTitle:
          "⚠️ حذف معلومات",
        resetMessage:
          "آیا تمام پروفایل، پیشرفت، علاقه‌مندی‌ها، دستاوردها و تنظیمات محلی LegalMind حذف شود؟ این کار برگشت‌پذیر نیست.",
        cancel:
          "لغو",
        resetDone:
          "تمام معلومات محلی LegalMind حذف شد.",
        resetError:
          "هنگام حذف معلومات مشکل ایجاد شد.",
        loading:
          "..."
      },

      english: {
        title:
          "Settings",
        back:
          "Back",
        sound:
          "Sound Effects",
        music:
          "Background Music",
        vibration:
          "Vibration",
        notifications:
          "Notifications",
        language:
          "Language",
        pashto:
          "Pashto",
        dari:
          "Dari",
        english:
          "English",
        about:
          "About the App",
        reset:
          "Reset Game Data",
        resetTitle:
          "⚠️ Reset Data",
        resetMessage:
          "Delete all local LegalMind profile, progress, favorites, achievements, and settings? This cannot be undone.",
        cancel:
          "Cancel",
        resetDone:
          "All local LegalMind data has been deleted.",
        resetError:
          "There was a problem deleting the data.",
        loading:
          "..."
      }
    };

    return (
      texts?.[language]?.[key] ||
      texts.pashto[key] ||
      ""
    );
  }

  if (loading) {
    return (
      <SafeAreaView
        style={styles.safe}
      >
        <View
          style={styles.center}
        >
          <Text
            style={styles.loading}
          >
            {getText("loading")}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safe}
    >
      <View
        style={styles.container}
      >

        <View
          style={styles.header}
        >
          <TouchableOpacity
            style={
              styles.backButton
            }
            onPress={onBack}
            activeOpacity={0.8}
            disabled={resetting}
          >
            <Text
              style={
                styles.backIcon
              }
            >
              ‹
            </Text>

            <Text
              style={
                styles.backText
              }
            >
              {getText("back")}
            </Text>
          </TouchableOpacity>

          <Text
            style={
              styles.headerTitle
            }
            numberOfLines={1}
          >
            ⚙️ {getText("title")}
          </Text>

          <View
            style={
              styles.headerSpace
            }
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.content
          }
        >

          <Text
            style={
              styles.sectionTitle
            }
          >
            🔊
          </Text>

          <SettingSwitch
            title={getText("sound")}
            value={
              settings.soundEnabled
            }
            onChange={() =>
              toggleSetting(
                "soundEnabled"
              )
            }
          />

          <SettingSwitch
            title={getText("music")}
            value={
              settings.musicEnabled
            }
            onChange={() =>
              toggleSetting(
                "musicEnabled"
              )
            }
          />

          <SettingSwitch
            title={getText("vibration")}
            value={
              settings.vibrationEnabled
            }
            onChange={() =>
              toggleSetting(
                "vibrationEnabled"
              )
            }
          />

          <SettingSwitch
            title={
              getText(
                "notifications"
              )
            }
            value={
              settings.notificationsEnabled
            }
            onChange={() =>
              toggleSetting(
                "notificationsEnabled"
              )
            }
          />

          <Text
            style={
              styles.sectionTitle
            }
          >
            🌐 {getText("language")}
          </Text>

          <View
            style={
              styles.languageCard
            }
          >

            <LanguageButton
              title={getText("pashto")}
              active={
                settings.language ===
                "pashto"
              }
              onPress={() =>
                changeLanguage(
                  "pashto"
                )
              }
            />

            <LanguageButton
              title={getText("dari")}
              active={
                settings.language ===
                "dari"
              }
              onPress={() =>
                changeLanguage(
                  "dari"
                )
              }
            />

            <LanguageButton
              title={getText("english")}
              active={
                settings.language ===
                "english"
              }
              onPress={() =>
                changeLanguage(
                  "english"
                )
              }
            />

          </View>

          <Text
            style={
              styles.sectionTitle
            }
          >
            ℹ️
          </Text>

          <TouchableOpacity
            style={
              styles.actionCard
            }
            onPress={onAbout}
            activeOpacity={0.8}
            disabled={resetting}
          >
            <Text
              style={
                styles.actionIcon
              }
            >
              📱
            </Text>

            <Text
              style={
                styles.actionText
              }
            >
              {getText("about")}
            </Text>

            <Text
              style={styles.arrow}
            >
              ›
            </Text>
          </TouchableOpacity>

          <Text
            style={
              styles.sectionTitle
            }
          >
            ⚠️
          </Text>

          <TouchableOpacity
            style={[
              styles.resetCard,
              resetting &&
                styles.disabledCard
            ]}
            onPress={
              confirmReset
            }
            activeOpacity={0.8}
            disabled={resetting}
          >
            <Text
              style={
                styles.resetTitle
              }
            >
              🗑️ {getText("reset")}
            </Text>

            <Text
              style={
                styles.resetDescription
              }
            >
              {language ===
              "english"
                ? "All local progress and profile data will be deleted."
                : language ===
                  "dari"
                ? "تمام پیشرفت و معلومات محلی حذف می‌شود."
                : "ټول محلي پرمختګ او پروفایل معلومات به پاک شي."}
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
    <View
      style={
        styles.settingCard
      }
    >
      <Text
        style={
          styles.settingText
        }
      >
        {title}
      </Text>

      <Switch
        value={Boolean(value)}
        onValueChange={onChange}
        trackColor={{
          false:
            "#34434D",
          true:
            COLORS.gold
        }}
        thumbColor={
          value
            ? COLORS.white
            : "#B8C2CC"
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
        active &&
          styles.activeLanguage
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.languageText,
          active &&
            styles.activeLanguageText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor:
        COLORS.navy
    },

    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 10
    },

    header: {
      height: 54,
      flexDirection:
        "row",
      alignItems:
        "center",
      justifyContent:
        "space-between"
    },

    backButton: {
      minWidth: 80,
      minHeight: 44,
      flexDirection:
        "row",
      alignItems:
        "center"
    },

    backIcon: {
      color:
        COLORS.gold,
      fontSize: 34,
      lineHeight: 36
    },

    backText: {
      color:
        COLORS.white,
      fontSize: 14,
      fontWeight:
        "700"
    },

    headerTitle: {
      flex: 1,
      color:
        COLORS.white,
      fontSize: 20,
      fontWeight:
        "800",
      textAlign:
        "center"
    },

    headerSpace: {
      width: 80
    },

    content: {
      paddingTop: 12,
      paddingBottom: 35
    },

    sectionTitle: {
      color:
        COLORS.gold,
      fontSize: 18,
      fontWeight:
        "900",
      marginTop: 12,
      marginBottom: 9
    },

    settingCard: {
      minHeight: 60,
      backgroundColor:
        COLORS.emerald,
      borderWidth: 1,
      borderColor:
        "#315044",
      borderRadius: 14,
      paddingHorizontal: 15,
      marginBottom: 9,
      flexDirection:
        "row",
      alignItems:
        "center",
      justifyContent:
        "space-between"
    },

    settingText: {
      flex: 1,
      color:
        COLORS.white,
      fontSize: 15,
      fontWeight:
        "700"
    },

    languageCard: {
      backgroundColor:
        "#102536",
      borderWidth: 1,
      borderColor:
        "#315044",
      borderRadius: 14,
      padding: 10,
      marginBottom: 5
    },

    languageButton: {
      minHeight: 46,
      borderRadius: 10,
      alignItems:
        "center",
      justifyContent:
        "center",
      marginVertical: 3
    },

    activeLanguage: {
      backgroundColor:
        COLORS.gold
    },

    languageText: {
      color:
        COLORS.lightGray,
      fontSize: 14,
      fontWeight:
        "800"
    },

    activeLanguageText: {
      color:
        COLORS.navy
    },

    actionCard: {
      minHeight: 62,
      backgroundColor:
        COLORS.emerald,
      borderWidth: 1,
      borderColor:
        COLORS.gold,
      borderRadius: 14,
      paddingHorizontal: 15,
      flexDirection:
        "row",
      alignItems:
        "center"
    },

    actionIcon: {
      fontSize: 23,
      marginRight: 12
    },

    actionText: {
      flex: 1,
      color:
        COLORS.white,
      fontSize: 15,
      fontWeight:
        "800"
    },

    arrow: {
      color:
        COLORS.gold,
      fontSize: 30
    },

    resetCard: {
      backgroundColor:
        "#32191A",
      borderWidth: 1,
      borderColor:
        COLORS.danger,
      borderRadius: 14,
      padding: 15
    },

    disabledCard: {
      opacity: 0.55
    },

    resetTitle: {
      color:
        COLORS.white,
      fontSize: 15,
      fontWeight:
        "900",
      marginBottom: 6
    },

    resetDescription: {
      color:
        "#D7BABA",
      fontSize: 12,
      lineHeight: 18
    },

    center: {
      flex: 1,
      alignItems:
        "center",
      justifyContent:
        "center"
    },

    loading: {
      color:
        COLORS.gold,
      fontSize: 25
    }
  });