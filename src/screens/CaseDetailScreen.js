import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { COLORS } from "../constants/app";
import { getCaseById } from "../data/cases";
import {
  canOpenCase,
  startCase
} from "../services/caseService";
import { addFavorite, removeFavorite, isFavorite } from "../services/favoritesService";

export default function CaseDetailScreen({
  caseId,
  language = "pashto",
  onBack,
  onStart
}) {
  const [caseData, setCaseData] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCase();
  }, [caseId]);

  async function loadCase() {
    try {
      const data = getCaseById(caseId);
      setCaseData(data);

      if (data) {
        const savedFavorite = await isFavorite(
          "cases",
          data.id
        );
        setFavorite(savedFavorite);
      }
    } finally {
      setLoading(false);
    }
  }

  async function toggleFavorite() {
    if (!caseData) return;

    if (favorite) {
      await removeFavorite("cases", caseData.id);
      setFavorite(false);
    } else {
      await addFavorite("cases", caseData.id);
      setFavorite(true);
    }
  }

  async function handleStart() {
    if (!caseData) return;

    const allowed = await canOpenCase(
      caseData.role,
      caseData.id
    );

    if (!allowed) {
      Alert.alert(
        language === "english"
          ? "Case Locked"
          : language === "dari"
          ? "قضیه قفل است"
          : "قضیه بنده ده",
        language === "english"
          ? "Complete the previous case first."
          : language === "dari"
          ? "اول قضیه قبلی را تکمیل کنید."
          : "لومړی مخکینۍ قضیه بشپړه کړه."
      );
      return;
    }

    await startCase(
      caseData.role,
      caseData.id
    );

    onStart?.(caseData.id);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.loadingText}>
            ...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!caseData) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            قضیه پیدا نه شوه.
          </Text>

          <TouchableOpacity
            style={styles.backButtonLarge}
            onPress={onBack}
          >
            <Text style={styles.buttonText}>
              بېرته
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

  const task =
    caseData.roleTask?.[language] ||
    caseData.roleTask?.pashto ||
    caseData.roleTask ||
    "";

  const people = caseData.people || [];
  const evidence = caseData.evidence || [];

  const roleTitle =
    caseData.role === "judge"
      ? language === "english"
        ? "Judge"
        : language === "dari"
        ? "قاضی"
        : "قاضي"
      : caseData.role === "prosecutor"
      ? language === "english"
        ? "Prosecutor"
        : language === "dari"
        ? "څارنوال"
        : "څارنوال"
      : language === "english"
      ? "Defense Attorney"
      : language === "dari"
      ? "وکیل مدافع"
      : "مدافع وکیل";

  const startText =
    language === "english"
      ? "Start Case"
      : language === "dari"
      ? "شروع قضیه"
      : "قضیه پیل کړه";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backIcon}>
              ‹
            </Text>

            <Text style={styles.backText}>
              {language === "english"
                ? "Back"
                : language === "dari"
                ? "برگشت"
                : "بېرته"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            ⚖️ {roleTitle}
          </Text>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
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
              {language === "english"
                ? "Difficulty"
                : language === "dari"
                ? "سطح دشواری"
                : "د ستونزې کچه"}{" "}
              {caseData.difficulty || 1}
            </Text>
          </View>

          <Section
            title={
              language === "english"
                ? "Case Story"
                : language === "dari"
                ? "د قضیې کیسه"
                : "د قضیې کیسه"
            }
            text={story}
          />

          {people.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                👥{" "}
                {language === "english"
                  ? "People"
                  : language === "dari"
                  ? "اشخاص"
                  : "اشخاص"}
              </Text>

              {people.map((person, index) => {
                const name =
                  person.name?.[language] ||
                  person.name?.pashto ||
                  person.name ||
                  "—";

                const statement =
                  person.statement?.[language] ||
                  person.statement?.pashto ||
                  person.statement ||
                  "";

                return (
                  <View
                    key={person.id || index}
                    style={styles.infoCard}
                  >
                    <Text style={styles.cardTitle}>
                      {name}
                    </Text>

                    {statement ? (
                      <Text style={styles.cardText}>
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
                📄{" "}
                {language === "english"
                  ? "Evidence"
                  : language === "dari"
                  ? "شواهد"
                  : "شواهد"}
              </Text>

              {evidence.map((item, index) => {
                const name =
                  item.name?.[language] ||
                  item.name?.pashto ||
                  item.name ||
                  "—";

                const description =
                  item.description?.[language] ||
                  item.description?.pashto ||
                  item.description ||
                  "";

                return (
                  <View
                    key={item.id || index}
                    style={styles.infoCard}
                  >
                    <Text style={styles.cardTitle}>
                      {name}
                    </Text>

                    <Text style={styles.cardText}>
                      {description}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          {legalIssue ? (
            <Section
              title={
                language === "english"
                  ? "Legal Issue"
                  : language === "dari"
                  ? "حقوقي موضوع"
                  : "حقوقي موضوع"
              }
              text={legalIssue}
            />
          ) : null}

          {task ? (
            <Section
              title={
                language === "english"
                  ? "Your Task"
                  : language === "dari"
                  ? "ستاسې دنده"
                  : "ستا دنده"
              }
              text={task}
            />
          ) : null}

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStart}
            activeOpacity={0.85}
          >
            <Text style={styles.startButtonText}>
              ⚖️ {startText}
            </Text>
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
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center"
  },

  favoriteButton: {
    width: 50,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  },

  favoriteIcon: {
    fontSize: 25
  },

  content: {
    paddingTop: 12,
    paddingBottom: 35
  },

  titleCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16
  },

  title: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: "800",
    lineHeight: 29
  },

  difficulty: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 8
  },

  section: {
    marginBottom: 16
  },

  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 9
  },

  infoCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 14,
    padding: 15
  },

  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 7
  },

  cardText: {
    color: COLORS.lightGray,
    fontSize: 14,
    lineHeight: 22
  },

  startButton: {
    backgroundColor: COLORS.gold,
    minHeight: 54,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8
  },

  startButtonText: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: "900"
  },

  backButtonLarge: {
    marginTop: 20,
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 13
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "800"
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  loadingText: {
    color: COLORS.gold,
    fontSize: 24
  },

  emptyText: {
    color: COLORS.lightGray,
    fontSize: 16
  }
});