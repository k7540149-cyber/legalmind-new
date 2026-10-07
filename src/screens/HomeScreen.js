import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/app";

export default function HomeScreen({
  profile = null,
  language = "pashto",
  onNavigate,
}) {
  const isPashto = language === "pashto";
  const isDari = language === "dari";

  const text = {
    profile: isPashto
      ? "پروفایل"
      : isDari
      ? "پروفایل"
      : "Profile",

    favorites: isPashto
      ? "خوښې شوې"
      : isDari
      ? "مورد علاقه‌ها"
      : "Favorites",

    notifications: isPashto
      ? "خبرتیاوې"
      : isDari
      ? "اعلان‌ها"
      : "Notifications",

    terminology: isPashto
      ? "حقوقي ترمینالوژي"
      : isDari
      ? "اصطلاحات حقوقی"
      : "Legal Terminology",

    judge: isPashto
      ? "د قاضي رول په قضیه کې"
      : isDari
      ? "نقش قاضی در قضیه"
      : "Judge Role in a Case",

    prosecutor: isPashto
      ? "د څارنوال رول په قضیه کې"
      : isDari
      ? "نقش څارنوال در قضیه"
      : "Prosecutor Role in a Case",

    defense: isPashto
      ? "د مدافع وکیل رول په قضیه کې"
      : isDari
      ? "نقش وکیل مدافع در قضیه"
      : "Defense Attorney Role in a Case",

    welcome: isPashto
      ? "ښه راغلاست"
      : isDari
      ? "خوش آمدید"
      : "Welcome",
  };

  function navigate(destination, params = {}) {
    if (typeof onNavigate !== "function") return;

    onNavigate(destination, params);
  }

  const displayName =
    profile?.name?.trim() || "";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topButton}
            onPress={() => navigate("profile")}
          >
            <Text style={styles.topIcon}>
              👤
            </Text>

            <Text style={styles.topText}>
              {text.profile}
            </Text>
          </TouchableOpacity>

          <View style={styles.topRight}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.topButton}
              onPress={() =>
                navigate("notifications")
              }
            >
              <Text style={styles.topIcon}>
                🔔
              </Text>

              <Text style={styles.topText}>
                {text.notifications}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.topButton}
              onPress={() =>
                navigate("favorites")
              }
            >
              <Text style={styles.topIcon}>
                ⭐
              </Text>

              <Text style={styles.topText}>
                {text.favorites}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.hero}>
            <Text style={styles.logo}>
              ⚖️
            </Text>

            <Text style={styles.title}>
              LegalMind
            </Text>

            <Text style={styles.tagline}>
              Learn • Analyze • Decide
            </Text>

            {displayName ? (
              <Text style={styles.welcome}>
                {displayName}، {text.welcome}
              </Text>
            ) : null}
          </View>

          <View style={styles.menuContainer}>
            <MenuCard
              icon="📚"
              title={text.terminology}
              onPress={() =>
                navigate("terminology")
              }
            />

            <MenuCard
              icon="👨‍⚖️"
              title={text.judge}
              onPress={() =>
                navigate("judge", {
                  role: "judge",
                })
              }
            />

            <MenuCard
              icon="⚖️"
              title={text.prosecutor}
              onPress={() =>
                navigate("prosecutor", {
                  role: "prosecutor",
                })
              }
            />

            <MenuCard
              icon="👨‍💼"
              title={text.defense}
              onPress={() =>
                navigate("defense", {
                  role: "defense",
                })
              }
            />
          </View>

          <View style={styles.creatorArea}>
            <Text style={styles.creator}>
              Designed by: Omid Momand
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function MenuCard({
  icon,
  title,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      style={styles.menuCard}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Text style={styles.menuIcon}>
          {icon}
        </Text>

        <Text
          style={styles.menuTitle}
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>

      <Text style={styles.arrow}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  content: {
    flexGrow: 1,
    paddingBottom: 15,
  },

  topBar: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  topButton: {
    minHeight: 44,
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
  },

  topIcon: {
    fontSize: 21,
  },

  topText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 5,
  },

  hero: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
    paddingBottom: 30,
  },

  logo: {
    fontSize: 56,
    marginBottom: 8,
  },

  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  tagline: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 6,
  },

  welcome: {
    color: COLORS.lightGray,
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
  },

  menuContainer: {
    width: "100%",
  },

  menuCard: {
    minHeight: 70,
    width: "100%",
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  menuLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    fontSize: 27,
    width: 42,
    textAlign: "center",
  },

  menuTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22,
    marginLeft: 8,
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 34,
    fontWeight: "300",
    marginLeft: 8,
  },

  creatorArea: {
    flex: 1,
    minHeight: 60,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 8,
  },

  creator: {
    color: "#7F8C98",
    fontSize: 11,
  },
});