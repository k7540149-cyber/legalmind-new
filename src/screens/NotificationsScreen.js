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
import { getNotifications } from "../services/notificationService";

export default function NotificationsScreen({
  language = "pashto",
  onBack
}) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const data = await getNotifications();
    setNotifications(
      Array.isArray(data) ? data : []
    );
  }

  const text =
    language === "english"
      ? {
          title: "Notifications",
          back: "Back",
          empty: "No notifications yet."
        }
      : language === "dari"
      ? {
          title: "اعلان‌ها",
          back: "برگشت",
          empty: "هنوز اعلانی وجود ندارد."
        }
      : {
          title: "خبرتیاوې",
          back: "بېرته",
          empty: "تر اوسه هېڅ خبرتیا نشته."
        };

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
            🔔 {text.title}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {notifications.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>
                🔔
              </Text>

              <Text style={styles.emptyText}>
                {text.empty}
              </Text>
            </View>
          ) : (
            notifications.map(
              (notification, index) => {
                const title =
                  notification.title?.[
                    language
                  ] ||
                  notification.title?.pashto ||
                  notification.title ||
                  "LegalMind";

                const message =
                  notification.message?.[
                    language
                  ] ||
                  notification.message?.pashto ||
                  notification.message ||
                  "";

                const icon =
                  notification.icon ||
                  "🔔";

                return (
                  <View
                    key={
                      notification.id ||
                      index
                    }
                    style={[
                      styles.card,
                      notification.read &&
                        styles.readCard
                    ]}
                  >
                    <View style={styles.iconBox}>
                      <Text style={styles.icon}>
                        {icon}
                      </Text>
                    </View>

                    <View style={styles.info}>
                      <Text style={styles.title}>
                        {title}
                      </Text>

                      <Text style={styles.message}>
                        {message}
                      </Text>

                      {notification.createdAt ? (
                        <Text style={styles.date}>
                          {formatDate(
                            notification.createdAt
                          )}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                );
              }
            )
          )}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

function formatDate(value) {
  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString();
  } catch {
    return "";
  }
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
    fontSize: 20,
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

  card: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row"
  },

  readCard: {
    opacity: 0.7,
    borderColor: "#315044"
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#102536",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },

  icon: {
    fontSize: 23
  },

  info: {
    flex: 1,
    minWidth: 0
  },

  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 5
  },

  message: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 20
  },

  date: {
    color: "#7F8C98",
    fontSize: 11,
    marginTop: 7
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