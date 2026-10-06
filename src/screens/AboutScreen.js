import React from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { COLORS } from "../constants/app";

export default function AboutScreen({
  language = "pashto",
  onBack
}) {
  const text =
    language === "english"
      ? {
          title: "About LegalMind",
          back: "Back",
          description:
            "LegalMind is an educational and practical application for law students. It helps students learn legal terminology and practice real-world legal analysis through Judge, Prosecutor, and Defense Attorney roles.",
          offline:
            "The core learning experience works offline. Progress and settings are stored locally on the device.",
          creator: "About the Creator",
          name: "Name",
          displayName: "Display Name",
          university: "University",
          faculty: "Faculty",
          department: "Department",
          semester: "Semester",
          classYear: "Class / Year",
          academicYear: "Academic Year",
          email: "Email",
          telegram: "Telegram",
          version: "App Version",
          emailAction: "Email Creator",
          telegramAction: "Open Telegram"
        }
      : language === "dari"
      ? {
          title: "درباره LegalMind",
          back: "برگشت",
          description:
            "LegalMind یک برنامه آموزشی و عملی برای محصلان حقوق است که اصطلاحات حقوقی و تحلیل قضایا را در نقش‌های قاضی، څارنوال و وکیل مدافع تمرین می‌دهد.",
          offline:
            "بخش اصلی آموزش بدون اینترنت کار می‌کند. پیشرفت و تنظیمات در دستگاه ذخیره می‌شود.",
          creator: "درباره سازنده",
          name: "نام",
          displayName: "نام نمایشی",
          university: "دانشگاه",
          faculty: "پوهنځی",
          department: "دیپارتمنت",
          semester: "سمستر",
          classYear: "صنف / سال",
          academicYear: "سال تحصیلی",
          email: "ایمیل",
          telegram: "تلگرام",
          version: "نسخه برنامه",
          emailAction: "ایمیل به سازنده",
          telegramAction: "باز کردن تلگرام"
        }
      : {
          title: "د LegalMind په اړه",
          back: "بېرته",
          description:
            "LegalMind د حقوقو محصلینو لپاره یو تعلیمي او عملي اپلیکیشن دی. د حقوقي ترمینالوژۍ زده کړه او د قاضي، څارنوال او مدافع وکیل په رولونو کې د قضیو عملي تحلیل تمرینوي.",
          offline:
            "د زده کړې اصلي برخه پرته له انټرنېټ څخه کار کوي. پرمختګ او تنظیمات په وسیله کې خوندي کېږي.",
          creator: "د جوړوونکي په اړه",
          name: "نوم",
          displayName: "ښودل کېدونکی نوم",
          university: "پوهنتون",
          faculty: "پوهنځی",
          department: "څانګه",
          semester: "سمستر",
          classYear: "صنف / کال",
          academicYear: "تحصیلي کال",
          email: "ایمیل",
          telegram: "ټیلیګرام",
          version: "د اپلیکیشن نسخه",
          emailAction: "جوړوونکي ته ایمیل",
          telegramAction: "ټیلیګرام پرانیستل"
        };

  async function openEmail() {
    await Linking.openURL(
      "mailto:omidhasanzai@gmail.com"
    );
  }

  async function openTelegram() {
    await Linking.openURL(
      "https://t.me/momand330"
    );
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

          <Text style={styles.headerTitle}>
            ℹ️ {text.title}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          <View style={styles.introCard}>
            <Text style={styles.logo}>
              ⚖️
            </Text>

            <Text style={styles.appName}>
              LegalMind
            </Text>

            <Text style={styles.tagline}>
              Learn • Analyze • Decide
            </Text>

            <Text style={styles.description}>
              {text.description}
            </Text>

            <Text style={styles.offline}>
              📴 {text.offline}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
            👤 {text.creator}
          </Text>

          <View style={styles.creatorCard}>
            <InfoRow
              label={text.name}
              value="اميد مومند"
            />

            <InfoRow
              label={text.displayName}
              value="اميد حسن زی"
            />

            <InfoRow
              label={text.university}
              value="ننګرهار پوهنتون"
            />

            <InfoRow
              label={text.faculty}
              value="حقوق او سياسي علوم"
            />

            <InfoRow
              label={text.department}
              value="حقوقي علوم"
            />

            <InfoRow
              label={text.semester}
              value="5"
            />

            <InfoRow
              label={text.classYear}
              value="3"
            />

            <InfoRow
              label={text.academicYear}
              value="1405"
            />

            <InfoRow
              label={text.version}
              value="9"
            />
          </View>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={openEmail}
            activeOpacity={0.82}
          >
            <Text style={styles.contactIcon}>
              ✉️
            </Text>

            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>
                {text.email}
              </Text>

              <Text style={styles.contactValue}>
                omidhasanzai@gmail.com
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={openTelegram}
            activeOpacity={0.82}
          >
            <Text style={styles.contactIcon}>
              ✈️
            </Text>

            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>
                {text.telegram}
              </Text>

              <Text style={styles.contactValue}>
                @momand330
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function InfoRow({
  label,
  value
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
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
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center"
  },

  headerSpace: {
    width: 80
  },

  content: {
    paddingTop: 12,
    paddingBottom: 35
  },

  introCard: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 17,
    padding: 20,
    alignItems: "center",
    marginBottom: 20
  },

  logo: {
    fontSize: 50,
    marginBottom: 8
  },

  appName: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900"
  },

  tagline: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 5,
    marginBottom: 15
  },

  description: {
    color: COLORS.lightGray,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center"
  },

  offline: {
    color: COLORS.white,
    backgroundColor: "#102536",
    borderRadius: 11,
    padding: 11,
    marginTop: 15,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center"
  },

  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10
  },

  creatorCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 12
  },

  infoRow: {
    minHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#263C49",
    justifyContent: "center"
  },

  infoLabel: {
    color: "#7F8C98",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 3
  },

  infoValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700"
  },

  contactButton: {
    minHeight: 67,
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },

  contactIcon: {
    fontSize: 23,
    marginRight: 12
  },

  contactInfo: {
    flex: 1
  },

  contactLabel: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 3
  },

  contactValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700"
  },

  arrow: {
    color: COLORS.gold,
    fontSize: 30
  }
});