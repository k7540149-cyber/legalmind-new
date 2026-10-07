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
import { getProfile } from "../services/profileService";
import { getProgress } from "../engine/caseProgress";

export default function ProfileScreen({
  language = "pashto",
  onBack,
  onOpenProgress,
  onOpenAchievements,
  onOpenSettings,
}) {
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const [progress, setProgress] = useState({
    level: 1,
    progressPoints: 0,
    roles: {},
  });

  const [refreshing, setRefreshing] = useState(false);

  const text =
    language === "english"
      ? {
          profile: "Profile",
          level: "Level",
          points: "Progress Points",
          judge: "Judge",
          prosecutor: "Prosecutor",
          defense: "Defense Attorney",
          roleProgress: "Role Progress",
          progress: "Your Progress",
          achievements: "Achievements",
          settings: "Settings",
          back: "Back",
        }
      : language === "dari"
      ? {
          profile: "پروفایل",
          level: "سطح",
          points: "امتیازات پیشرفت",
          judge: "قاضی",
          prosecutor: "څارنوال",
          defense: "وکیل مدافع",
          roleProgress: "پیشرفت نقش‌ها",
          progress: "پیشرفت شما",
          achievements: "دستاوردها",
          settings: "تنظیمات",
          back: "برگشت",
        }
      : {
          profile: "پروفایل",
          level: "کچه",
          points: "د پرمختګ نمرې",
          judge: "قاضي",
          prosecutor: "څارنوال",
          defense: "مدافع وکیل",
          roleProgress: "د رولونو پرمختګ",
          progress: "ستا پرمختګ",
          achievements: "لاسته راوړنې",
          settings: "تنظیمات",
          back: "بېرته",
        };

  const loadProfile = useCallback(async () => {
    try {
      const savedProfile = await getProfile();
      const savedProgress = await getProgress();

      if (savedProfile && typeof savedProfile === "object") {
        setProfile({
          name: savedProfile.name || "",
          surname: savedProfile.surname || "",
          email: savedProfile.email || "",
        });
      }

      if (savedProgress && typeof savedProgress === "object") {
        setProgress({
          level: normalizeNumber(
            savedProgress.level,
            1,
            1,
            10
          ),
          progressPoints: normalizeNumber(
            savedProgress.progressPoints,
            0,
            0,
            1000000
          ),
          roles:
            savedProgress.roles &&
            typeof savedProgress.roles === "object"
              ? savedProgress.roles
              : {},
        });
      }
    } catch (error) {
      console.error(
        "LegalMind profile load error:",
        error
      );
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  async function handleRefresh() {
    setRefreshing(true);
    await loadProfile();
    setRefreshing(false);
  }

  const judgeSkill = normalizeNumber(
    progress.roles?.judge?.skill,
    0,
    0,
    100
  );

  const prosecutorSkill = normalizeNumber(
    progress.roles?.prosecutor?.skill,
    0,
    0,
    100
  );

  const defenseSkill = normalizeNumber(
    progress.roles?.defense?.skill,
    0,
    0,
    100
  );

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
            👤 {text.profile}
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
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                👤
              </Text>
            </View>

            <Text style={styles.name}>
              {profile.name || "—"}{" "}
              {profile.surname || ""}
            </Text>

            <Text style={styles.email}>
              {profile.email || "—"}
            </Text>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.stat}>
              <Text style={styles.statIcon}>
                🏆
              </Text>

              <Text style={styles.statLabel}>
                {text.level}
              </Text>

              <Text style={styles.statValue}>
                {level}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.stat}>
              <Text style={styles.statIcon}>
                ⭐
              </Text>

              <Text style={styles.statLabel}>
                {text.points}
              </Text>

              <Text style={styles.statValue}>
                {points}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            {text.roleProgress}
          </Text>

          <RoleProgress
            icon="👨‍⚖️"
            title={text.judge}
            value={judgeSkill}
          />

          <RoleProgress
            icon="⚖️"
            title={text.prosecutor}
            value={prosecutorSkill}
          />

          <RoleProgress
            icon="👨‍💼"
            title={text.defense}
            value={defenseSkill}
          />

          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.82}
            onPress={onOpenProgress}
          >
            <Text style={styles.actionIcon}>
              📊
            </Text>

            <Text style={styles.actionText}>
              {text.progress}
            </Text>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.82}
            onPress={onOpenAchievements}
          >
            <Text style={styles.actionIcon}>
              🏆
            </Text>

            <Text style={styles.actionText}>
              {text.achievements}
            </Text>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.82}
            onPress={onOpenSettings}
          >
            <Text style={styles.actionIcon}>
              ⚙️
            </Text>

            <Text style={styles.actionText}>
              {text.settings}
            </Text>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function RoleProgress({
  icon,
  title,
  value,
}) {
  const safeValue = normalizeNumber(
    value,
    0,
    0,
    100
  );

  return (
    <View style={styles.roleCard}>
      <View style={styles.roleHeader}>
        <Text style={styles.roleIcon}>
          {icon}
        </Text>

        <Text style={styles.roleTitle}>
          {title}
        </Text>

        <Text style={styles.roleValue}>
          {safeValue}%
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${safeValue}%`,
            },
          ]}
        />
      </View>
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
    Math.min(
      maximum,
      Math.floor(number)
    )
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

  profileCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },

  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#102536",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 38,
  },

  name: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: "900",
    textAlign: "center",
  },

  email: {
    color: COLORS.lightGray,
    fontSize: 14,
    marginTop: 7,
    textAlign: "center",
  },

  statsCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 16,
    marginTop: 14,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statIcon: {
    fontSize: 25,
    marginBottom: 5,
  },

  statLabel: {
    color: COLORS.lightGray,
    fontSize: 12,
    textAlign: "center",
  },

  statValue: {
    color: COLORS.gold,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 3,
  },

  divider: {
    width: 1,
    height: 55,
    backgroundColor: "#315044",
  },

  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 24,
    marginBottom: 10,
  },

  roleCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  roleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  roleIcon: {
    fontSize: 24,
    width: 36,
  },

  roleTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },

  roleValue: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: "900",
  },

  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#203746",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.gold,
    borderRadius: 4,
  },

  actionCard: {
    minHeight: 58,
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 14,
    marginTop: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  actionIcon: {
    fontSize: 24,
    width: 40,
  },

  actionText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 32,
  },
});