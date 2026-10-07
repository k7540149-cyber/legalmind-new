import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/app";
import { getProgress } from "../engine/caseProgress";

export default function ProfileProgressScreen({
  language = "pashto",
  onBack,
}) {
  const [progress, setProgress] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const text =
    language === "english"
      ? {
          title: "Your Progress",
          back: "Back",
          level: "Overall Level",
          points: "Progress Points",
          judge: "Judge",
          prosecutor: "Prosecutor",
          defense: "Defense Attorney",
          skill: "Skill",
          latest: "Latest Activity",
          noActivity: "No activity yet.",
          completed: "Completed Cases",
          cases: "cases",
        }
      : language === "dari"
      ? {
          title: "پیشرفت شما",
          back: "برگشت",
          level: "سطح عمومی",
          points: "امتیازات پیشرفت",
          judge: "قاضی",
          prosecutor: "څارنوال",
          defense: "وکیل مدافع",
          skill: "مهارت",
          latest: "آخرین فعالیت",
          noActivity: "هنوز فعالیتی وجود ندارد.",
          completed: "قضایای تکمیل‌شده",
          cases: "قضیه",
        }
      : {
          title: "ستا پرمختګ",
          back: "بېرته",
          level: "عمومي کچه",
          points: "د پرمختګ نمرې",
          judge: "قاضي",
          prosecutor: "څارنوال",
          defense: "مدافع وکیل",
          skill: "مهارت",
          latest: "وروستی فعالیت",
          noActivity: "تر اوسه هېڅ فعالیت نشته.",
          completed: "بشپړې شوې قضیې",
          cases: "قضیې",
        };

  const loadProgress = useCallback(async () => {
    try {
      const data = await getProgress();

      setProgress(
        data && typeof data === "object"
          ? data
          : null
      );
    } catch (error) {
      console.error(
        "LegalMind progress load error:",
        error
      );

      setProgress(null);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  async function handleRefresh() {
    setRefreshing(true);
    await loadProgress();
    setRefreshing(false);
  }

  if (!progress) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.loading}>...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const level = normalizeNumber(
    progress.level,
    1,
    1,
    10
  );

  const points = normalizeNumber(
    progress.progressPoints,
    0,
    0,
    1000000
  );

  const roles = progress.roles || {};

  const judge = roles.judge || {};
  const prosecutor = roles.prosecutor || {};
  const defense = roles.defense || {};

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <Text style={styles.backIcon}>‹</Text>

            <Text style={styles.backText}>
              {text.back}
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            📊 {text.title}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={COLORS.gold}
            />
          }
        >
          <View style={styles.levelCard}>
            <Text style={styles.levelLabel}>
              🏆 {text.level}
            </Text>

            <Text style={styles.levelNumber}>
              {level}
            </Text>

            <Text style={styles.points}>
              ⭐ {points} {text.points}
            </Text>
          </View>

          <RoleProgress
            icon="👨‍⚖️"
            title={text.judge}
            skill={judge.skill}
            completedCases={
              Array.isArray(judge.completedCases)
                ? judge.completedCases.length
                : 0
            }
            completedText={text.completed}
            casesText={text.cases}
          />

          <RoleProgress
            icon="⚖️"
            title={text.prosecutor}
            skill={prosecutor.skill}
            completedCases={
              Array.isArray(
                prosecutor.completedCases
              )
                ? prosecutor.completedCases.length
                : 0
            }
            completedText={text.completed}
            casesText={text.cases}
          />

          <RoleProgress
            icon="👨‍💼"
            title={text.defense}
            skill={defense.skill}
            completedCases={
              Array.isArray(defense.completedCases)
                ? defense.completedCases.length
                : 0
            }
            completedText={text.completed}
            casesText={text.cases}
          />

          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>
              🎯 {text.latest}
            </Text>

            <Text style={styles.activityText}>
              {getActivityText(
                progress.lastActivity,
                text.noActivity
              )}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function RoleProgress({
  icon,
  title,
  skill,
  completedCases,
  completedText,
  casesText,
}) {
  const safeSkill = normalizeNumber(
    skill,
    0,
    0,
    100
  );

  const safeCompleted = normalizeNumber(
    completedCases,
    0,
    0,
    100
  );

  return (
    <View style={styles.roleCard}>
      <View style={styles.roleHeader}>
        <Text style={styles.roleTitle}>
          {icon} {title}
        </Text>

        <Text style={styles.skill}>
          {safeSkill}%
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${safeSkill}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.completedText}>
        {completedText}: {safeCompleted} {casesText}
      </Text>
    </View>
  );
}

function normalizeNumber(
  value,
  fallback,
  minimum,
  maximum
) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.max(
    minimum,
    Math.min(maximum, Math.floor(number))
  );
}

function getActivityText(value, fallback) {
  if (
    typeof value === "string" &&
    value.trim()
  ) {
    return value.trim();
  }

  return fallback;
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
    height: 54,
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
  },

  headerTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },

  headerSpace: {
    width: 80,
  },

  content: {
    paddingTop: 12,
    paddingBottom: 35,
  },

  levelCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    marginBottom: 16,
  },

  levelLabel: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: "800",
  },

  levelNumber: {
    color: COLORS.white,
    fontSize: 48,
    fontWeight: "900",
    marginVertical: 5,
  },

  points: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },

  roleCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },

  roleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
  },

  roleTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },

  skill: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: "900",
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#263A46",
    borderRadius: 5,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.gold,
    borderRadius: 5,
  },

  completedText: {
    color: "#8997A2",
    fontSize: 11,
    marginTop: 9,
    fontWeight: "600",
  },

  activityCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 15,
    padding: 16,
    marginTop: 8,
  },

  activityTitle: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8,
  },

  activityText: {
    color: COLORS.lightGray,
    fontSize: 14,
    lineHeight: 21,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.navy,
  },

  loading: {
    color: COLORS.gold,
    fontSize: 25,
  },
});