import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/app";
import { getCaseById } from "../data/cases";
import {
  canOpenCase,
  startCase,
} from "../services/caseService";
import {
  isFavorite,
  toggleFavorite,
} from "../services/favoritesService";

export default function CaseDetailScreen({
  caseId,
  language = "pashto",
  onBack,
  onStart,
}) {
  const [caseData, setCaseData] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  const text =
    language === "english"
      ? {
          back: "Back",
          loading: "Loading case...",
          notFound: "Case not found.",
          judge: "Judge",
          prosecutor: "Prosecutor",
          defense: "Defense Attorney",
          difficulty: "Difficulty",
          story: "Case Story",
          people: "People",
          evidence: "Evidence",
          legalIssue: "Legal Issue",
          task: "Your Task",
          start: "Start Case",
          lockedTitle: "Case Locked",
          lockedMessage:
            "Complete the previous case first.",
          startError:
            "The case could not be started.",
          retry: "Try Again",
        }
      : language === "dari"
      ? {
          back: "برگشت",
          loading: "قضیه در حال بارگذاری...",
          notFound: "قضیه پیدا نشد.",
          judge: "قاضی",
          prosecutor: "څارنوال",
          defense: "وکیل مدافع",
          difficulty: "سطح دشواری",
          story: "داستان قضیه",
          people: "اشخاص",
          evidence: "شواهد",
          legalIssue: "موضوع حقوقی",
          task: "وظیفه شما",
          start: "شروع قضیه",
          lockedTitle: "قضیه قفل است",
          lockedMessage:
            "اول قضیه قبلی را تکمیل کنید.",
          startError:
            "قضیه شروع نشد.",
          retry: "دوباره تلاش",
        }
      : {
          back: "بېرته",
          loading: "قضیه لوډ کېږي...",
          notFound: "قضیه پیدا نه شوه.",
          judge: "قاضي",
          prosecutor: "څارنوال",
          defense: "مدافع وکیل",
          difficulty: "د ستونزې کچه",
          story: "د قضیې کیسه",
          people: "اشخاص",
          evidence: "شواهد",
          legalIssue: "حقوقي موضوع",
          task: "ستا دنده",
          start: "قضیه پیل کړه",
          lockedTitle: "قضیه بنده ده",
          lockedMessage:
            "لومړی مخکینۍ قضیه بشپړه کړه.",
          startError:
            "قضیه پیل نه شوه.",
          retry: "بیا هڅه",
        };

  useEffect(() => {
    let mounted = true;

    async function loadCase() {
      setLoading(true);

      try {
        const data = getCaseById(caseId);

        if (!mounted) return;

        setCaseData(data);

        if (data?.id) {
          const saved = await isFavorite(
            "cases",
            data.id
          );

          if (mounted) {
            setFavorite(Boolean(saved));
          }
        } else {
          setFavorite(false);
        }
      } catch (error) {
        console.error(
          "LegalMind case detail error:",
          error
        );

        if (mounted) {
          setCaseData(null);
          setFavorite(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCase();

    return () => {
      mounted = false;
    };
  }, [caseId]);

  async function handleFavorite() {
    if (!caseData?.id) return;

    try {
      const updated = await toggleFavorite(
        "cases",
        caseData.id
      );

      const savedCases = Array.isArray(
        updated?.cases
      )
        ? updated.cases
        : [];

      setFavorite(
        savedCases.includes(caseData.id)
      );
    } catch (error) {
      console.error(
        "LegalMind case favorite error:",
        error
      );
    }
  }

  async function handleStart() {
    if (!caseData?.id || starting) return;

    setStarting(true);

    try {
      const allowed = await canOpenCase(
        caseData.role,
        caseData.id
      );

      if (!allowed) {
        Alert.alert(
          text.lockedTitle,
          text.lockedMessage
        );
        return;
      }

      await startCase(
        caseData.role,
        caseData.id
      );

      if (typeof onStart === "function") {
        onStart(caseData.id);
      }
    } catch (error) {
      console.error(
        "LegalMind start case error:",
        error
      );

      Alert.alert(
        "LegalMind",
        text.startError
      );
    } finally {
      setStarting(false);
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

  if (!caseData) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.notFoundIcon}>
            ⚖️
          </Text>

          <Text style={styles.emptyText}>
            {text.notFound}
          </Text>

          <TouchableOpacity
            style={styles.backButtonLarge}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {text.back}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const title =
    caseData.title?.[language] ||
    caseData.title?.pashto ||
    caseData.title ||
    "—";

  const story =
    caseData.story?.[language] ||
    caseData.story?.pashto ||
    caseData.story ||
    "";

  const legalIssue =
    caseData.legalIssue?.[language] ||
    caseData.legalIssue?.pashto ||
    caseData.legalIssue ||
    "";

  const roleTask =
    caseData.roleTask?.[language] ||
    caseData.roleTask?.pashto ||
    caseData.roleTask ||
    "";

  const taskFromTasks =
    caseData.tasks?.[caseData.role]?.[
      language
    ] ||
    caseData.tasks?.[caseData.role]?.pashto ||
    "";

  const task = roleTask || taskFromTasks;

  const people = Array.isArray(
    caseData.people
  )
    ? caseData.people
    : [];

  const evidence = Array.isArray(
    caseData.evidence
  )
    ? caseData.evidence
    : [];

  const roleTitle =
    caseData.role === "judge"
      ? text.judge
      : caseData.role === "prosecutor"
      ? text.prosecutor
      : text.defense;

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
            ⚖️ {roleTitle}
          </Text>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavorite}
            activeOpacity={0.8}
          >
            <Text style={styles.favoriteIcon}>
              {favorite ? "⭐" : "☆"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.titleCard}>
            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.difficulty}>
              {text.difficulty}:{" "}
              {caseData.difficulty || 1}
            </Text>
          </View>

          <Section
            title={`📖 ${text.story}`}
            text={story}
          />

          {people.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                👥 {text.people}
              </Text>

              {people.map((person, index) => {
                const name =
                  person?.name?.[language] ||
                  person?.name?.pashto ||
                  person?.name ||
                  "—";

                const statement =
                  person?.statement?.[
                    language
                  ] ||
                  person?.statement?.pashto ||
                  person?.statement ||
                  "";

                return (
                  <View
                    key={
                      person?.id ||
                      `person-${index}`
                    }
                    style={styles.infoCard}
                  >
                    <Text
                      style={styles.cardTitle}
                    >
                      {name}
                    </Text>

                    {statement ? (
                      <Text
                        style={styles.cardText}
                      >
                        {statement}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
          )}

          {evidence.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                📄 {text.evidence}
              </Text>

              {evidence.map((item, index) => {
                const name =
                  item?.name?.[language] ||
                  item?.name?.pashto ||
                  item?.name ||
                  "—";

                const description =
                  item?.description?.[
                    language
                  ] ||
                  item?.description?.pashto ||
                  item?.description ||
                  "";

                return (
                  <View
                    key={
                      item?.id ||
                      `evidence-${index}`
                    }
                    style={styles.infoCard}
                  >
                    <Text
                      style={styles.cardTitle}
                    >
                      {name}
                    </Text>

                    {description ? (
                      <Text
                        style={styles.cardText}
                      >
                        {description}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
          )}

          {legalIssue ? (
            <Section
              title={`⚖️ ${text.legalIssue}`}
              text={legalIssue}
            />
          ) : null}

          {task ? (
            <Section
              title={`🎯 ${text.task}`}
              text={task}
            />
          ) : null}

          <TouchableOpacity
            style={[
              styles.startButton,
              starting &&
                styles.startButtonDisabled,
            ]}
            onPress={handleStart}
            disabled={starting}
            activeOpacity={0.85}
          >
            {starting ? (
              <ActivityIndicator
                size="small"
                color={COLORS.navy}
              />
            ) : (
              <Text
                style={styles.startButtonText}
              >
                ⚖️ {text.start}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function Section({ title, text }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.cardText}>
          {text || "—"}
        </Text>
      </View>
    </View>
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
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 6,
  },

  favoriteButton: {
    width: 50,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: {
    fontSize: 26,
  },

  content: {
    paddingTop: 12,
    paddingBottom: 35,
  },

  titleCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },

  title: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: "900",
    lineHeight: 29,
  },

  difficulty: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 9,
  },

  section: {
    marginBottom: 17,
  },

  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 9,
  },

  infoCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 14,
    padding: 15,
  },

  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 7,
  },

  cardText: {
    color: COLORS.lightGray,
    fontSize: 14,
    lineHeight: 23,
  },

  startButton: {
    backgroundColor: COLORS.gold,
    minHeight: 54,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7,
  },

  startButtonDisabled: {
    opacity: 0.7,
  },

  startButtonText: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: "900",
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

  notFoundIcon: {
    fontSize: 44,
    marginBottom: 12,
  },

  emptyText: {
    color: COLORS.lightGray,
    fontSize: 16,
    textAlign: "center",
  },

  backButtonLarge: {
    marginTop: 20,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 14,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: "900",
  },
});