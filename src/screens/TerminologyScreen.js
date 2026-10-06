import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import {
  COLORS
} from "../constants/app";

import {
  terminologyLetters,
  getTermsByLetter
} from "../data/terminology";

export default function TerminologyScreen({
  language = "pashto",
  onBack,
  onOpenTerm
}) {
  const [selectedLetter, setSelectedLetter] =
    useState(terminologyLetters[0]);

  const [search, setSearch] = useState("");

  const terms = useMemo(() => {
    const byLetter = getTermsByLetter(
      selectedLetter,
      language
    );

    if (!search.trim()) {
      return byLetter;
    }

    const query = search
      .trim()
      .toLowerCase();

    return byLetter.filter((item) => {
      const term =
        item?.[language]?.term || "";

      return term
        .toLowerCase()
        .includes(query);
    });
  }, [selectedLetter, search, language]);

  const title =
    language === "english"
      ? "Legal Terminology"
      : language === "dari"
      ? "اصطلاحات حقوقی"
      : "حقوقي ترمینالوژي";

  const searchPlaceholder =
    language === "english"
      ? "Search legal term..."
      : language === "dari"
      ? "جستجوی اصطلاح حقوقی..."
      : "حقوقي اصطلاح ولټوئ...";

  const emptyText =
    language === "english"
      ? "No terms found."
      : language === "dari"
      ? "هیچ اصطلاحی پیدا نشد."
      : "هیڅ اصطلاح پیدا نه شوه.";

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
              {language === "english"
                ? "Back"
                : language === "dari"
                ? "برگشت"
                : "بېرته"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            {title}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={searchPlaceholder}
          placeholderTextColor="#7F8C98"
          style={styles.search}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.body}>

          <View style={styles.lettersContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                styles.lettersContent
              }
            >
              {terminologyLetters.map(
                (letter) => {
                  const active =
                    selectedLetter === letter;

                  return (
                    <TouchableOpacity
                      key={letter}
                      activeOpacity={0.75}
                      style={[
                        styles.letterButton,
                        active &&
                          styles.activeLetter
                      ]}
                      onPress={() => {
                        setSelectedLetter(letter);
                        setSearch("");
                      }}
                    >
                      <Text
                        style={[
                          styles.letterText,
                          active &&
                            styles.activeLetterText
                        ]}
                      >
                        {letter}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </ScrollView>
          </View>

          <View style={styles.results}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                styles.resultsContent
              }
            >
              {terms.length === 0 ? (
                <View style={styles.empty}>
                  <Text style={styles.emptyIcon}>
                    📚
                  </Text>

                  <Text style={styles.emptyText}>
                    {emptyText}
                  </Text>
                </View>
              ) : (
                terms.map((item) => {
                  const data =
                    item[language] ||
                    item.pashto;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.82}
                      style={styles.termCard}
                      onPress={() => {
                        if (
                          typeof onOpenTerm ===
                          "function"
                        ) {
                          onOpenTerm(item.id);
                        }
                      }}
                    >
                      <View style={styles.termInfo}>
                        <Text
                          style={
                            styles.termTitle
                          }
                        >
                          {data.term}
                        </Text>

                        <Text
                          numberOfLines={2}
                          style={
                            styles.termDefinition
                          }
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
            </ScrollView>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.navy
  },

  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10
  },

  header: {
    minHeight: 52,
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
    fontWeight: "700",
    marginLeft: 2
  },

  title: {
    flex: 1,
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center"
  },

  headerSpace: {
    width: 80
  },

  search: {
    minHeight: 50,
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 12,
    color: COLORS.white,
    fontSize: 15,
    paddingHorizontal: 15,
    marginTop: 8,
    marginBottom: 12
  },

  body: {
    flex: 1,
    flexDirection: "row"
  },

  lettersContainer: {
    width: 48,
    marginRight: 10
  },

  lettersContent: {
    alignItems: "center",
    paddingVertical: 4
  },

  letterButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    backgroundColor: "#102536"
  },

  activeLetter: {
    backgroundColor: COLORS.gold
  },

  letterText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700"
  },

  activeLetterText: {
    color: COLORS.navy
  },

  results: {
    flex: 1
  },

  resultsContent: {
    paddingBottom: 20
  },

  termCard: {
    minHeight: 82,
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },

  termInfo: {
    flex: 1,
    minWidth: 0
  },

  termTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 5
  },

  termDefinition: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 20
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 32,
    marginLeft: 8
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80
  },

  emptyIcon: {
    fontSize: 42,
    marginBottom: 12
  },

  emptyText: {
    color: COLORS.lightGray,
    fontSize: 15,
    textAlign: "center"
  }
});