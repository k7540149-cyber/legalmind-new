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
import { getRoleConfig } from "../data/roles";
import { getDifficulty } from "../data/levels";
import { getRoleCases } from "../services/caseService";

export default function RoleCasesScreen({
  role,
  language = "pashto",
  onBack,
  onOpenCase
}) {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    loadCases();
  }, [role]);

  async function loadCases() {
    const data = await getRoleCases(role);
    setCases(data);
  }

  const roleConfig = getRoleConfig(role);

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
          noCase: "No case available."
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
          noCase: "قضیه‌ای موجود نیست."
        }
      : {
          back: "بېرته",
          judge: "قاضي",
          prosecutor: "څارنوال",
          defense: "مدافع وکیل",
          locked: "بند",
          completed: "بشپړه شوې",
          start: "قضیه پیل کړه",
          noCase: "اوس قضیه موجوده نه ده."
        };

  const roleName =
    role === "judge"
      ? text.judge
      : role === "prosecutor"
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

          <Text style={styles.headerTitle}>
            {roleConfig?.icon || "⚖️"}{" "}
            {roleName}
          </Text>

          <View style={styles.headerSpace} />
        </View>

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
            cases.map((item) => {
              const title =
                item.title?.[language] ||
                item.title?.pashto ||
                item.title ||
                "—";

              const story =
                item.story?.[language] ||
                item.story?.pashto ||
                item.story ||
                "";

              const difficulty =
                getDifficulty(item.difficulty);

              const difficultyText =
                difficulty?.[language] ||
                difficulty?.pashto ||
                "";

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={
                    item.unlocked ? 0.82 : 1
                  }
                  disabled={!item.unlocked}
                  style={[
                    styles.caseCard,
                    !item.unlocked &&
                      styles.lockedCard
                  ]}
                  onPress={() => {
                    if (
                      item.unlocked &&
                      typeof onOpenCase ===
                        "function"
                    ) {
                      onOpenCase(item.id);
                    }
                  }}
                >
                  <View style={styles.caseTop}>
                    <View style={styles.caseIcon}>
                      <Text style={styles.iconText}>
                        {item.completed
                          ? "✅"
                          : item.unlocked
                          ? "⚖️"
                          : "🔒"}
                      </Text>
                    </View>

                    <View style={styles.caseInfo}>
                      <Text
                        numberOfLines={2}
                        style={styles.caseTitle}
                      >
                        {title}
                      </Text>

                      <Text
                        style={styles.difficulty}
                      >
                        {difficultyText}
                      </Text>
                    </View>
                  </View>

                  <Text
                    numberOfLines={3}
                    style={styles.story}
                  >
                    {story}
                  </Text>

                  <View style={styles.caseBottom}>
                    <Text
                      style={[
                        styles.status,
                        item.completed &&
                          styles.completedStatus,
                        !item.unlocked &&
                          styles.lockedStatus
                      ]}
                    >
                      {item.completed
                        ? text.completed
                        : item.unlocked
                        ? text.start
                        : text.locked}
                    </Text>

                    {item.unlocked &&
                      !item.completed && (
                        <Text
                          style={styles.arrow}
                        >
                          ›
                        </Text>
                      )}
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
    fontSize: 19,
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

  caseCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12
  },

  lockedCard: {
    opacity: 0.55,
    borderColor: "#53615E"
  },

  caseTop: {
    flexDirection: "row",
    alignItems: "center"
  },

  caseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#102536",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },

  iconText: {
    fontSize: 25
  },

  caseInfo: {
    flex: 1,
    minWidth: 0
  },

  caseTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800"
  },

  difficulty: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5
  },

  story: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 14
  },

  caseBottom: {
    marginTop: 14,
    minHeight: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  status: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "800"
  },

  completedStatus: {
    color: COLORS.success
  },

  lockedStatus: {
    color: "#8B969E"
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 32
  },

  empty: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    marginTop: 20
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