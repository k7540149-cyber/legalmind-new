import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { COLORS } from "../constants/app";
import { getTermById } from "../data/terminology";
import {
  isFavorite,
  toggleFavorite
} from "../services/favoritesService";

export default function TermDetailScreen({
  termId,
  language = "pashto",
  onBack
}) {
  const [term, setTerm] = useState(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    loadTerm();
  }, [termId]);

  async function loadTerm() {
    const found = getTermById(termId);

    setTerm(found);

    if (found) {
      const saved = await isFavorite(
        "terminology",
        found.id
      );

      setFavorite(saved);
    }
  }

  async function handleFavorite() {
    if (!term) return;

    const updated = await toggleFavorite(
      "terminology",
      term.id
    );

    const isSaved =
      updated.terminology.includes(term.id);

    setFavorite(isSaved);
  }

  const backText =
    language === "english"
      ? "Back"
      : language === "dari"
      ? "برگشت"
      : "بېرته";

  const definitionTitle =
    language === "english"
      ? "Definition"
      : language === "dari"
      ? "تعریف"
      : "تعریف";

  const explanationTitle =
    language === "english"
      ? "Simple Explanation"
      : language === "dari"
      ? "تشریح ساده"
      : "ساده تشریح";

  const exampleTitle =
    language === "english"
      ? "Example"
      : language === "dari"
      ? "مثال"
      : "مثال";

  if (!term) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.notFound}>
            {language === "english"
              ? "Term not found."
              : language === "dari"
              ? "اصطلاح پیدا نشد."
              : "اصطلاح پیدا نه شوه."}
          </Text>

          <TouchableOpacity
            style={styles.backButtonLarge}
            onPress={onBack}
          >
            <Text style={styles.backButtonText}>
              {backText}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const data =
    term[language] || term.pashto;

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
              {backText}
            </Text>
          </TouchableOpacity>

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
            <Text style={styles.term}>
              {data.term}
            </Text>
          </View>

          <Section
            title={definitionTitle}
            text={data.definition}
          />

          <Section
            title={explanationTitle}
            text={data.explanation}
          />

          <Section
            title={exampleTitle}
            text={data.example}
          />
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

      <View style={styles.sectionCard}>
        <Text style={styles.sectionText}>
          {text}
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
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  backButton: {
    minHeight: 44,
    minWidth: 80,
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

  favoriteButton: {
    width: 48,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  },

  favoriteIcon: {
    fontSize: 28
  },

  content: {
    paddingTop: 14,
    paddingBottom: 30
  },

  titleCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 22
  },

  term: {
    color: COLORS.gold,
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center"
  },

  section: {
    marginBottom: 18
  },

  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 9
  },

  sectionCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 14,
    padding: 17
  },

  sectionText: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 25
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },

  notFound: {
    color: COLORS.lightGray,
    fontSize: 16,
    marginBottom: 20
  },

  backButtonLarge: {
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14
  },

  backButtonText: {
    color: COLORS.navy,
    fontWeight: "800",
    fontSize: 15
  }
});