import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { COLORS } from "../constants/app";
import { getProgress } from "../engine/caseProgress";

export default function ProfileProgressScreen({
  language = "pashto",
  onBack
}) {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    const data = await getProgress();
    setProgress(data);
  }

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
          noActivity: "No activity yet."
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
          noActivity: "هنوز فعالیتی وجود ندارد."
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
          noActivity: "تر اوسه هېڅ فعالیت نشته."
        };

  if (!progress) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.loading}>
            ...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const roles = progress.roles || {};

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text
            onPress={onBack}
            style={styles.back}
          >
            ‹ {text.back}
          </Text>

          <Text style={styles.headerTitle}>
            📊 {text.title}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          <View style={styles.levelCard}>
            <Text style={styles.levelLabel}>
              🏆 {text.level}
            </Text>

            <Text style={styles.levelNumber}>
              {progress.level || 1}
            </Text>

            <Text style={styles.points}>
              ⭐ {progress.progressPoints || 0}{" "}
              {text.points}
            </Text>
          </View>

          <RoleProgress
            icon="👨‍⚖️"
            title={text.judge}
            skill={roles.judge?.skill || 0}
          />

          <RoleProgress
            icon="⚖️"
            title={text.prosecutor}
            skill={roles.prosecutor?.skill || 0}
          />

          <RoleProgress
            icon="👨‍💼"
            title={text.defense}
            skill={roles.defense?.skill || 0}
          />

          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>
              🎯 {text.latest}
            </Text>

            <Text style={styles.activityText}>
              {progress.lastActivity ||
                text.noActivity}
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
  skill
}) {
  const safeSkill = Math.max(
    0,
    Math.min(100, Number(skill) || 0)
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
              width: `${safeSkill}%`
            }
          ]}
        />
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

  back: {
    minWidth: 80,
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
    paddingVertical: 12
  },

  headerTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center"
  },

  headerSpace: {
    width: 80
  },

  content: {
    paddingTop: 12,
    paddingBottom: 35
  },

  levelCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    marginBottom: 16
  },

  levelLabel: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: "800"
  },

  levelNumber: {
    color: COLORS.white,
    fontSize: 48,
    fontWeight: "900",
    marginVertical: 5
  },

  points: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700"
  },

  roleCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10
  },

  roleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11
  },

  roleTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800"
  },

  skill: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: "900"
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#263A46",
    borderRadius: 5,
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.gold,
    borderRadius: 5
  },

  activityCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 15,
    padding: 16,
    marginTop: 8
  },

  activityTitle: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8
  },

  activityText: {
    color: COLORS.lightGray,
    fontSize: 14,
    lineHeight: 21
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  loading: {
    color: COLORS.gold,
    fontSize: 25
  }
});