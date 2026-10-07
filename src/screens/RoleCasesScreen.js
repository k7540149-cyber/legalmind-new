import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/app";
import { getRoleConfig } from "../data/roles";
import { getDifficulty } from "../data/levels";
import { getRoleCases } from "../services/caseService";

export default function RoleCasesScreen({
  role,
  language = "pashto",
  onBack,
  onOpenCase,
}) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const text =
    language === "english"
      ? {
          back: "Back",
          judge: "Judge",
          prosecutor: "Prosecutor",
          defense: "Defense Attorney",
          locked: "Locked",
          completed: "Completed",
          start: "Start Case",
          noCase: "No case available.",
          loading: "Loading cases...",
          error: "Could not load cases.",
          retry: "Try Again",
        }
      : language === "dari"
      ? {
          back: "برگشت",
          judge: "قاضی",
          prosecutor: "څارنوال",
          defense: "وکیل مدافع",
          locked: "قفل",
          completed: "تکمیل شده",
          start: "شروع قضیه",
          noCase: "قضیه‌ای موجود نیست.",
          loading: "قضایا در حال بارگذاری...",
          error: "قضایا بارگذاری نشد.",
          retry: "دوباره تلاش",
        }
      : {
          back: "بېرته",
          judge: "قاضي",
          prosecutor: "څارنوال",
          defense: "مدافع وکیل",
          locked: "بند",
          completed: "بشپړه شوې",
          start: "قضیه پیل کړه",
          noCase: "اوس قضیه موجوده نه ده.",
          loading: "قضیې لوډ کېږي...",
          error: "قضیې لوډ نه شوې.",
          retry: "بیا هڅه",
        };

  const roleConfig = getRoleConfig(role);

  const roleName =
    role === "judge"
      ? text.judge
      : role === "prosecutor"
      ? text.prosecutor
      : text.defense;

  const loadCases = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getRoleCases(role);

      if (Array.isArray(data)) {
        setCases(data);
      } else {
        setCases([]);
      }
    } catch (err) {
      console.error(
        "LegalMind role cases error:",
        err
      );

      setCases([]);
      setError(text.error);
    } finally {
      setLoading(false);
    }
  }, [role, text.error]);

  useEffect(() => {
    loadCases();
  }, [loadCases]);

  function handleOpenCase(caseId, unlocked) {
    if (!unlocked) return;

    if (
      typeof onOpenCase === "function" &&
      caseId
    ) {
      onOpenCase(caseId);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={COLORS.gold}
          />

          <Text style={styles.loadingText}>
            {text.loading}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <Text style={styles.backIcon}>
              ‹
            </Text>

            <Text style={styles.backText}>
              {text.back}
            </Text>
          </TouchableOpacity>

          <Text
            style={styles.headerTitle}
            numberOfLines={2}
          >
            {roleConfig?.icon || "⚖️"} {roleName}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {error}
            </Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={loadCases}
              activeOpacity={0.8}
            >
              <Text
                style={styles.retryText}
              >
                {text.retry}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {cases.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>
                ⚖️
              </Text>

              <Text style={styles.emptyText}>
                {text.noCase}
              </Text>
            </View>
          ) : (
            cases.map((item, index) => {
              const title =
                item?.title?.[language] ||
                item?.title?.pashto ||
                item?.title ||
                "—";

              const story =
                item?.story?.[language] ||
                item?.story?.pashto ||
                item?.story ||
                "";

              const difficulty =
                getDifficulty(
                  item?.difficulty
                );

              const difficultyText =
                difficulty?.[language] ||
                difficulty?.pashto ||
                difficulty?.english ||
                "";

              const unlocked =
                item?.unlocked === true;

              const completed =
                item?.completed === true;

              return (
                <TouchableOpacity
                  key={
                    item?.id ||
                    `case-${index}`
                  }
                  activeOpacity={
                    unlocked ? 0.82 : 1
                  }
                  disabled={!unlocked}
                  style={[
                    styles.caseCard,
                    !unlocked &&
                      styles.lockedCard,
                    completed &&
                      styles.completedCard,
                  ]}
                  onPress={() =>
                    handleOpenCase(
                      item?.id,
                      unlocked
                    )
                  }
                >
                  <View style={styles.caseTop}>
                    <View
                      style={styles.caseIcon}
                    >
                      <Text
                        style={styles.iconText}
                      >
                        {completed
                          ? "✅"
                          : unlocked
                          ? "⚖️"
                          : "🔒"}
                      </Text>
                    </View>

                    <View
                      style={styles.caseInfo}
                    >
                      <Text
                        numberOfLines={2}
                        style={styles.caseTitle}
                      >
                        {title}
                      </Text>

                      {difficultyText ? (
                        <Text
                          style={
                            styles.difficulty
                          }
                        >
                          {difficultyText}
                        </Text>
                      ) : null}
                    </View>
                  </View>

                  {story ? (
                    <Text
                      numberOfLines={4}
                      style={styles.story}
                    >
                      {story}
                    </Text>
                  ) : null}

                  <View
                    style={styles.caseBottom}
                  >
                    <Text
                      style={[
                        styles.status,
                        completed &&
                          styles.completedStatus,
                        !unlocked &&
                          styles.lockedStatus,
                      ]}
                    >
                      {completed
                        ? text.completed
                        : unlocked
                        ? text.start
                        : text.locked}
                    </Text>

                    {unlocked && !completed ? (
                      <Text
                        style={styles.arrow}
                      >
                        ›
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  header: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    minWidth: 80,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
  },

  backIcon: {
    color: COLORS.gold,
    fontSize: 34,
    lineHeight: 36,
  },

  backText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 2,
  },

  headerTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 6,
  },

  headerSpace: {
    width: 80,
  },

  content: {
    paddingTop: 12,
    paddingBottom: 30,
  },

  caseCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  lockedCard: {
    opacity: 0.55,
    borderColor: "#53615E",
  },

  completedCard: {
    borderColor: COLORS.success,
  },

  caseTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  caseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#102536",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  iconText: {
    fontSize: 25,
  },

  caseInfo: {
    flex: 1,
    minWidth: 0,
  },

  caseTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
  },

  difficulty: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 5,
  },

  story: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 14,
  },

  caseBottom: {
    marginTop: 14,
    minHeight: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  status: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "900",
  },

  completedStatus: {
    color: COLORS.success,
  },

  lockedStatus: {
    color: "#8B969E",
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 32,
  },

  empty: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    marginTop: 20,
  },

  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },

  emptyText: {
    color: COLORS.lightGray,
    fontSize: 15,
    textAlign: "center",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  loadingText: {
    color: COLORS.lightGray,
    fontSize: 15,
    marginTop: 12,
  },

  errorBox: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    marginBottom: 4,
    alignItems: "center",
  },

  errorText: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },

  retryButton: {
    minHeight: 44,
    paddingHorizontal: 22,
    borderRadius: 10,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },

  retryText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: "900",
  },
});