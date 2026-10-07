import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/app";
import {
  terminologyLetters,
  getTermsByLetter,
} from "../data/terminology";

export default function TerminologyScreen({
  language = "pashto",
  onBack,
  onOpenTerm,
}) {
  const [selectedLetter, setSelectedLetter] =
    useState(terminologyLetters[0] || "");

  const [search, setSearch] = useState("");

  const text =
    language === "english"
      ? {
          title: "Legal Terminology",
          back: "Back",
          search: "Search legal term...",
          empty: "No terms found.",
          all: "All",
        }
      : language === "dari"
      ? {
          title: "اصطلاحات حقوقی",
          back: "برگشت",
          search: "جستجوی اصطلاح حقوقی...",
          empty: "هیچ اصطلاحی پیدا نشد.",
          all: "همه",
        }
      : {
          title: "حقوقي ترمینالوژي",
          back: "بېرته",
          search: "حقوقي اصطلاح ولټوئ...",
          empty: "هیڅ اصطلاح پیدا نه شوه.",
          all: "ټول",
        };

  const normalizedSearch = search
    .trim()
    .toLowerCase();

  const terms = useMemo(() => {
    let result = [];

    try {
      if (normalizedSearch) {
        const allLetters =
          Array.isArray(terminologyLetters)
            ? terminologyLetters
            : [];

        const seen = new Set();

        allLetters.forEach((letter) => {
          const letterTerms =
            getTermsByLetter(
              letter,
              language
            );

          if (!Array.isArray(letterTerms)) {
            return;
          }

          letterTerms.forEach((item) => {
            if (
              item?.id &&
              !seen.has(item.id)
            ) {
              seen.add(item.id);
              result.push(item);
            }
          });
        });
      } else {
        result = getTermsByLetter(
          selectedLetter,
          language
        );

        if (!Array.isArray(result)) {
          result = [];
        }
      }
    } catch (error) {
      console.error(
        "LegalMind terminology error:",
        error
      );

      result = [];
    }

    if (!normalizedSearch) {
      return result;
    }

    return result.filter((item) => {
      const data =
        item?.[language] ||
        item?.pashto ||
        null;

      if (!data) return false;

      const term = String(
        data.term || ""
      ).toLowerCase();

      const definition = String(
        data.definition || ""
      ).toLowerCase();

      const simpleExplanation =
        String(
          data.simpleExplanation || ""
        ).toLowerCase();

      return (
        term.includes(normalizedSearch) ||
        definition.includes(normalizedSearch) ||
        simpleExplanation.includes(
          normalizedSearch
        )
      );
    });
  }, [
    selectedLetter,
    normalizedSearch,
    language,
  ]);

  function handleLetterPress(letter) {
    setSelectedLetter(letter);
    setSearch("");
  }

  function handleOpenTerm(termId) {
    if (
      typeof onOpenTerm !== "function" ||
      !termId
    ) {
      return;
    }

    onOpenTerm(termId);
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
            📚 {text.title}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={text.search}
          placeholderTextColor="#7F8C98"
          style={styles.search}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />

        <View style={styles.body}>
          {!normalizedSearch ? (
            <View style={styles.lettersContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                  styles.lettersContent
                }
              >
                {Array.isArray(
                  terminologyLetters
                ) &&
                  terminologyLetters.map(
                    (letter) => {
                      const active =
                        selectedLetter ===
                        letter;

                      return (
                        <TouchableOpacity
                          key={letter}
                          activeOpacity={0.75}
                          style={[
                            styles.letterButton,
                            active &&
                              styles.activeLetter,
                          ]}
                          onPress={() =>
                            handleLetterPress(
                              letter
                            )
                          }
                        >
                          <Text
                            style={[
                              styles.letterText,
                              active &&
                                styles.activeLetterText,
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
          ) : null}

          <View
            style={[
              styles.results,
              normalizedSearch &&
                styles.resultsFull,
            ]}
          >
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
                    {text.empty}
                  </Text>
                </View>
              ) : (
                terms.map((item, index) => {
                  const data =
                    item?.[language] ||
                    item?.pashto ||
                    {};

                  return (
                    <TouchableOpacity
                      key={
                        item?.id ||
                        `term-${index}`
                      }
                      activeOpacity={0.82}
                      style={styles.termCard}
                      onPress={() =>
                        handleOpenTerm(
                          item?.id
                        )
                      }
                    >
                      <View
                        style={styles.termInfo}
                      >
                        <Text
                          style={
                            styles.termTitle
                          }
                          numberOfLines={2}
                        >
                          {data.term ||
                            "—"}
                        </Text>

                        {data.definition ? (
                          <Text
                            numberOfLines={3}
                            style={
                              styles.termDefinition
                            }
                          >
                            {
                              data.definition
                            }
                          </Text>
                        ) : null}
                      </View>

                      <Text
                        style={styles.arrow}
                      >
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
    backgroundColor: COLORS.navy,
  },

  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  header: {
    minHeight: 54,
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

  headerTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 5,
  },

  headerSpace: {
    width: 80,
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
    marginBottom: 12,
  },

  body: {
    flex: 1,
    flexDirection: "row",
  },

  lettersContainer: {
    width: 48,
    marginRight: 10,
  },

  lettersContent: {
    alignItems: "center",
    paddingVertical: 4,
    paddingBottom: 20,
  },

  letterButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    backgroundColor: "#102536",
  },

  activeLetter: {
    backgroundColor: COLORS.gold,
  },

  letterText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  activeLetterText: {
    color: COLORS.navy,
  },

  results: {
    flex: 1,
    minWidth: 0,
  },

  resultsFull: {
    width: "100%",
  },

  resultsContent: {
    paddingBottom: 25,
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
    alignItems: "center",
  },

  termInfo: {
    flex: 1,
    minWidth: 0,
  },

  termTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 5,
  },

  termDefinition: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 20,
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 32,
    marginLeft: 8,
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
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
});