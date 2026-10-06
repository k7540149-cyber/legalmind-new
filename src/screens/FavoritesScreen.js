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
import { getCaseById } from "../data/cases";
import { getFavorites } from "../services/favoritesService";

export default function FavoritesScreen({
  language = "pashto",
  onBack,
  onOpenTerm,
  onOpenCase
}) {
  const [favorites, setFavorites] = useState({
    terminology: [],
    cases: []
  });

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    const saved = await getFavorites();
    setFavorites(saved);
  }

  const text =
    language === "english"
      ? {
          title: "Favorites",
          terminology: "Legal Terminology",
          cases: "Cases",
          emptyTerms: "No favorite terms yet.",
          emptyCases: "No favorite cases yet.",
          back: "Back"
        }
      : language === "dari"
      ? {
          title: "مورد علاقه‌ها",
          terminology: "اصطلاحات حقوقی",
          cases: "قضایا",
          emptyTerms: "هنوز اصطلاحی در مورد علاقه‌ها نیست.",
          emptyCases: "هنوز قضیه‌ای در مورد علاقه‌ها نیست.",
          back: "برگشت"
        }
      : {
          title: "خوښې شوې",
          terminology: "حقوقي ترمینالوژي",
          cases: "قضیې",
          emptyTerms: "تر اوسه هېڅ حقوقي اصطلاح خوښه شوې نه ده.",
          emptyCases: "تر اوسه هېڅ قضیه خوښه شوې نه ده.",
          back: "بېرته"
        };

  const favoriteTerms = favorites.terminology
    .map((id) => getTermById(id))
    .filter(Boolean);

  const favoriteCases = favorites.cases
    .map((id) => getCaseById(id))
    .filter(Boolean);

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

          <Text style={styles.headerTitle}>
            ⭐ {text.title}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          <Text style={styles.sectionTitle}>
            📚 {text.terminology}
          </Text>

          {favoriteTerms.length === 0 ? (
            <Empty text={text.emptyTerms} />
          ) : (
            favoriteTerms.map((item) => {
              const data =
                item[language] || item.pashto;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  activeOpacity={0.82}
                  onPress={() =>
                    onOpenTerm?.(item.id)
                  }
                >
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>
                      {data.term}
                    </Text>

                    <Text
                      numberOfLines={2}
                      style={styles.cardDescription}
                    >
                      {data.definition}
                    </Text>
                  </View>

                  <Text style={styles.arrow}>
                    ›
                  </Text>
                </TouchableOpacity>
              );
            })
          )}

          <Text style={styles.sectionTitle}>
            ⚖️ {text.cases}
          </Text>

          {favoriteCases.length === 0 ? (
            <Empty text={text.emptyCases} />
          ) : (
            favoriteCases.map((item) => {
              const title =
                item.title?.[language] ||
                item.title?.pashto ||
                item.title ||
                "—";

              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  activeOpacity={0.82}
                  onPress={() =>
                    onOpenCase?.(item.id)
                  }
                >
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>
                      {title}
                    </Text>

                    <Text style={styles.cardDescription}>
                      ⚖️ {item.role || ""}
                    </Text>
                  </View>

                  <Text style={styles.arrow}>
                    ›
                  </Text>
                </TouchableOpacity>
              );
            })
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function Empty({ text }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>
        ☆
      </Text>

      <Text style={styles.emptyText}>
        {text}
      </Text>
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
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center"
  },

  headerSpace: {
    width: 80
  },

  content: {
    paddingTop: 12,
    paddingBottom: 30
  },

  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 10
  },

  card: {
    minHeight: 78,
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },

  cardInfo: {
    flex: 1,
    minWidth: 0
  },

  cardTitle: {
    color: COLORS.gold,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 5
  },

  cardDescription: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 19
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 32,
    marginLeft: 8
  },

  empty: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 14,
    padding: 22,
    alignItems: "center",
    marginBottom: 10
  },

  emptyIcon: {
    color: COLORS.gold,
    fontSize: 35,
    marginBottom: 8
  },

  emptyText: {
    color: COLORS.lightGray,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21
  }
});