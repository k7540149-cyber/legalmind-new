import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  COLORS
} from "../constants/app";

export default function HomeScreen({
  profile,
  language = "pashto",
  onNavigate
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
      : "Defense Attorney Role in a Case"
  };

  function navigate(screen, params = {}) {
    if (typeof onNavigate === "function") {
      onNavigate(screen, params);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topButton}
            onPress={() =>
              navigate("Profile")
            }
          >
            <Text style={styles.topIcon}>
              👤
            </Text>

            <Text style={styles.topText}>
              {text.profile}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topButton}
            onPress={() =>
              navigate("Favorites")
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

          {profile?.name ? (
            <Text style={styles.welcome}>
              {profile.name}، ښه راغلاست
            </Text>
          ) : null}
        </View>

        <View style={styles.menuContainer}>

          <MenuCard
            icon="📚"
            title={text.terminology}
            onPress={() =>
              navigate("Terminology")
            }
          />

          <MenuCard
            icon="👨‍⚖️"
            title={text.judge}
            onPress={() =>
              navigate("RoleCases", {
                role: "judge"
              })
            }
          />

          <MenuCard
            icon="⚖️"
            title={text.prosecutor}
            onPress={() =>
              navigate("RoleCases", {
                role: "prosecutor"
              })
            }
          />

          <MenuCard
            icon="👨‍💼"
            title={text.defense}
            onPress={() =>
              navigate("RoleCases", {
                role: "defense"
              })
            }
          />

        </View>

        <View style={styles.creatorArea}>
          <Text style={styles.creator}>
            Designed by: Omid Momand
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

function MenuCard({
  icon,
  title,
  onPress
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

        <Text style={styles.menuTitle}>
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
    backgroundColor: COLORS.navy
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  topButton: {
    minHeight: 44,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },

  topIcon: {
    fontSize: 21
  },

  topText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700"
  },

  hero: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 22,
    paddingBottom: 28
  },

  logo: {
    fontSize: 56,
    marginBottom: 8
  },

  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0.5
  },

  tagline: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 6
  },

  welcome: {
    color: COLORS.lightGray,
    fontSize: 14,
    marginTop: 16
  },

  menuContainer: {
    width: "100%",
    gap: 12
  },

  menuCard: {
    minHeight: 70,
    width: "100%",
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  menuLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center"
  },

  menuIcon: {
    fontSize: 27,
    width: 42,
    textAlign: "center"
  },

  menuTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 34,
    fontWeight: "300",
    marginLeft: 8
  },

  creatorArea: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 8
  },

  creator: {
    color: "#7F8C98",
    fontSize: 11
  }
});