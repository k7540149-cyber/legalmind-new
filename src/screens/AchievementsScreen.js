import React, {
  useEffect,
  useState
} from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { COLORS } from "../constants/app";

import {
  getAchievements,
  ACHIEVEMENT_DEFINITIONS
} from "../services/achievementService";

export default function AchievementsScreen({
  language = "pashto",
  onBack
}) {
  const [
    achievements,
    setAchievements
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  async function loadAchievements() {
    try {
      const saved =
        await getAchievements();

      const savedMap =
        new Map(
          (
            Array.isArray(saved)
              ? saved
              : []
          ).map(
            (item) => [
              String(item?.id || ""),
              item
            ]
          )
        );

      const all =
        Array.isArray(
          ACHIEVEMENT_DEFINITIONS
        )
          ? ACHIEVEMENT_DEFINITIONS
          : [];

      const merged =
        all.map((definition) => {
          const savedItem =
            savedMap.get(
              String(
                definition.id
              )
            );

          return {
            ...definition,
            ...(savedItem || {}),
            unlocked:
              savedItem?.unlocked ===
                true ||
              savedItem?.earned ===
                true
          };
        });

      setAchievements(merged);
    } catch (error) {
      console.error(
        "LegalMind achievements error:",
        error
      );

      setAchievements([]);
    } finally {
      setLoading(false);
    }
  }

  const text =
    language === "english"
      ? {
          title:
            "Achievements",
          back:
            "Back",
          unlocked:
            "Unlocked",
          locked:
            "Locked",
          hidden:
            "???",
          empty:
            "No achievements yet.",
          loading:
            "..."
        }
      : language === "dari"
      ? {
          title:
            "دستاوردها",
          back:
            "برگشت",
          unlocked:
            "دریافت شده",
          locked:
            "قفل",
          hidden:
            "؟؟؟",
          empty:
            "هنوز دستاوردی وجود ندارد.",
          loading:
            "..."
        }
      : {
          title:
            "لاسته راوړنې",
          back:
            "بېرته",
          unlocked:
            "ترلاسه شوې",
          locked:
            "بنده",
          hidden:
            "؟؟؟",
          empty:
            "تر اوسه هېڅ لاسته راوړنه نشته.",
          loading:
            "..."
        };

  function getLocalized(value) {
    if (!value) {
      return "";
    }

    if (
      typeof value ===
      "string"
    ) {
      return value;
    }

    return (
      value?.[language] ||
      value?.pashto ||
      value?.dari ||
      value?.english ||
      ""
    );
  }

  if (loading) {
    return (
      <SafeAreaView
        style={styles.safe}
      >
        <View style={styles.center}>
          <Text
            style={styles.loading}
          >
            {text.loading}
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
              {text.back}
            </Text>
          </TouchableOpacity>

          <Text
            style={
              styles.headerTitle
            }
            numberOfLines={1}
          >
            🏆 {text.title}
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

          {achievements.length ===
          0 ? (
            <View
              style={
                styles.empty
              }
            >
              <Text
                style={
                  styles.emptyIcon
                }
              >
                🏆
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                {text.empty}
              </Text>
            </View>
          ) : (
            achievements.map(
              (
                item,
                index
              ) => {
                const unlocked =
                  item?.unlocked ===
                    true ||
                  item?.earned ===
                    true;

                const hidden =
                  item?.id ===
                    "hidden-001" ||
                  item?.id ===
                    "hidden-002" ||
                  item?.hidden ===
                    true;

                const title =
                  hidden &&
                  !unlocked
                    ? text.hidden
                    : getLocalized(
                        item?.title
                      ) || "—";

                const description =
                  hidden &&
                  !unlocked
                    ? text.hidden
                    : getLocalized(
                        item?.description
                      );

                return (
                  <View
                    key={
                      item?.id ||
                      `achievement-${index}`
                    }
                    style={[
                      styles.card,
                      unlocked &&
                        styles.unlockedCard,
                      hidden &&
                        !unlocked &&
                        styles.hiddenCard
                    ]}
                  >

                    <View
                      style={[
                        styles.iconBox,
                        unlocked &&
                          styles.unlockedIconBox
                      ]}
                    >
                      <Text
                        style={
                          styles.icon
                        }
                      >
                        {unlocked
                          ? item?.icon ||
                            "🏆"
                          : hidden
                          ? "🔒"
                          : item?.icon ||
                            "🏅"}
                      </Text>
                    </View>

                    <View
                      style={
                        styles.info
                      }
                    >
                      <Text
                        style={
                          styles.title
                        }
                      >
                        {title}
                      </Text>

                      <Text
                        style={
                          styles.description
                        }
                      >
                        {description}
                      </Text>

                      <Text
                        style={[
                          styles.status,
                          unlocked &&
                            styles.unlockedStatus
                        ]}
                      >
                        {unlocked
                          ? `✓ ${text.unlocked}`
                          : `🔒 ${text.locked}`}
                      </Text>
                    </View>

                  </View>
                );
              }
            )
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
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
      paddingBottom: 30
    },

    card: {
      backgroundColor:
        "#102536",
      borderWidth: 1,
      borderColor:
        "#315044",
      borderRadius: 16,
      padding: 15,
      marginBottom: 11,
      flexDirection:
        "row",
      alignItems:
        "center"
    },

    unlockedCard: {
      borderColor:
        COLORS.gold,
      backgroundColor:
        COLORS.emerald
    },

    hiddenCard: {
      opacity: 0.72
    },

    iconBox: {
      width: 54,
      height: 54,
      borderRadius: 27,
      backgroundColor:
        "#0B1D2A",
      alignItems:
        "center",
      justifyContent:
        "center",
      marginRight: 13
    },

    unlockedIconBox: {
      backgroundColor:
        "#4D4018"
    },

    icon: {
      fontSize: 27
    },

    info: {
      flex: 1,
      minWidth: 0
    },

    title: {
      color:
        COLORS.white,
      fontSize: 16,
      fontWeight:
        "800",
      marginBottom: 5
    },

    description: {
      color:
        COLORS.lightGray,
      fontSize: 13,
      lineHeight: 19
    },

    status: {
      color:
        "#7F8C98",
      fontSize: 12,
      fontWeight:
        "800",
      marginTop: 7
    },

    unlockedStatus: {
      color:
        COLORS.gold
    },

    empty: {
      backgroundColor:
        "#102536",
      borderWidth: 1,
      borderColor:
        "#315044",
      borderRadius: 15,
      padding: 30,
      alignItems:
        "center",
      marginTop: 20
    },

    emptyIcon: {
      fontSize: 42,
      marginBottom: 12
    },

    emptyText: {
      color:
        COLORS.lightGray,
      fontSize: 15,
      textAlign:
        "center"
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