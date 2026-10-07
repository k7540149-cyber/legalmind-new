import React, { useEffect, useState } from "react";
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
import { getTermById } from "../data/terminology";
import {
  isFavorite,
  toggleFavorite,
} from "../services/favoritesService";

export default function TermDetailScreen({
  termId,
  language = "pashto",
  onBack,
}) {
  const [term, setTerm] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadTerm() {
      setLoading(true);

      try {
        const found = getTermById(termId);

        if (!mounted) return;

        setTerm(found);

        if (found?.id) {
          const saved = await isFavorite(
            "terminology",
            found.id
          );

          if (mounted) {
            setFavorite(Boolean(saved));
          }
        } else {
          setFavorite(false);
        }
      } catch (error) {
        console.error(
          "LegalMind term detail error:",
          error
        );

        if (mounted) {
          setTerm(null);
          setFavorite(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTerm();

    return () => {
      mounted = false;
    };
  }, [termId]);

  async function handleFavorite() {
    if (!term?.id) return;

    try {
      const updated = await toggleFavorite(
        "terminology",
        term.id
      );

      const terminologyFavorites =
        Array.isArray(updated?.terminology)
          ? updated.terminology
          : [];

      setFavorite(
        terminologyFavorites.includes(term.id)
      );
    } catch (error) {
      console.error(
        "LegalMind favorite error:",
        error
      );
    }
  }

  const backText =
    language === "english"
      ? "Back"
      : language === "dari"
      ? "برگشت"
      : "بېرته";

  const definitionTitle =
    language === "english"
      ? "1. Definition"
      : language === "dari"
      ? "۱. تعریف"
      : "۱. تعریف";

  const explanationTitle =
    language === "english"
      ? "2. Simple Explanation"
      : language === "dari"
      ? "۲. تشریح ساده"
      : "۲. ساده تشریح";

  const exampleTitle =
    language === "english"
      ? "3. Example"
      : language === "dari"
      ? "۳. مثال"
      : "۳. مثال";

  const notFoundText =
    language === "english"
      ? "Term not found."
      : language === "dari"
      ? "اصطلاح پیدا نشد."
      : "اصطلاح پیدا نه شوه.";

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={COLORS.gold}
          />

          <Text style={styles.loadingText}>
            {language === "english"
              ? "Loading..."
              : language === "dari"
              ? "در حال بارگذاری..."
              : "لوډ کېږي..."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!term) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.notFoundIcon}>
            📚
          </Text>

          <Text style={styles.notFound}>
            {notFoundText}
          </Text>

          <TouchableOpacity
            style={styles.backButtonLarge}
            onPress={onBack}
            activeOpacity={0.8}
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
    term?.[language] ||
    term?.pashto ||
    {};

  const explanation =
    data.explanation ||
    data.simpleExplanation ||
    "";

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
            accessibilityRole="button"
            accessibilityLabel={
              favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
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
              {data.term || "—"}
            </Text>
          </View>

          <Section
            title={definitionTitle}
            text={data.definition}
          />

          <Section
            title={explanationTitle}
            text={explanation}
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
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    minHeight: 44,
    minWidth: 80,
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

  favoriteButton: {
    width: 48,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: {
    fontSize: 28,
  },

  content: {
    paddingTop: 14,
    paddingBottom: 30,
  },

  titleCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 22,
  },

  term: {
    color: COLORS.gold,
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },

  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 9,
  },

  sectionCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 14,
    padding: 17,
  },

  sectionText: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 25,
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

  notFound: {
    color: COLORS.lightGray,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },

  backButtonLarge: {
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    color: COLORS.navy,
    fontWeight: "800",
    fontSize: 15,
  },
});