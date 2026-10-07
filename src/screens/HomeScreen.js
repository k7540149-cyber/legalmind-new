import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/app";

const HOME_BACKGROUND = require("../../assets/legalmind_home_background.png");

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

  const displayName = profile?.name?.trim() || "";

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={HOME_BACKGROUND}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.overlay} />

        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.topButton}
              onPress={() => navigate("profile")}
            >
              <Text style={styles.topIcon}>👤</Text>

              <Text style={styles.topText}>
                {text.profile}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.topButton}
              onPress={() => navigate("favorites")}
            >
              <Text style={styles.topIcon}>⭐</Text>

              <Text style={styles.topText}>
                {text.favorites}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <View style={styles.hero}>
              <View style={styles.logoCircle}>
                <Text style={styles.logo}>⚖️</Text>
              </View>

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
      </ImageBackground>
    </SafeAreaView>
  );
}

function MenuCard({ icon, title, onPress }) {
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

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },

  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 12, 20, 0.48)",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  content: {
    flexGrow: 1,
    paddingBottom: 12,
  },

  topBar: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topButton: {
    minHeight: 44,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(7, 24, 39, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.65)",
    borderRadius: 12,
  },

  topIcon: {
    fontSize: 20,
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
    paddingTop: 22,
    paddingBottom: 26,
  },

  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(7, 24, 39, 0.78)",
    borderWidth: 2,
    borderColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  logo: {
    fontSize: 42,
  },

  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0.5,
    textShadowColor: "#000000",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  tagline: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 5,
  },

  welcome: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 13,
    textAlign: "center",
    backgroundColor: "rgba(7, 24, 39, 0.65)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  menuContainer: {
    width: "100%",
  },

  menuCard: {
    minHeight: 70,
    width: "100%",
    backgroundColor: "rgba(11, 61, 50, 0.90)",
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 15,
    paddingHorizontal: 15,
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
    marginLeft: 8,
  },

  creatorArea: {
    flex: 1,
    minHeight: 55,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 5,
  },

  creator: {
    color: "#D0D7DD",
    fontSize: 11,
    textShadowColor: "#000000",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 3,
  },
});