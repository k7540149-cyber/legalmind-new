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
import {
  getNotifications,
  markNotificationAsRead,
  clearNotifications,
} from "../services/notificationService";

export default function NotificationsScreen({
  language = "pashto",
  onBack,
}) {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const text =
    language === "english"
      ? {
          title: "Notifications",
          back: "Back",
          empty: "No notifications yet.",
          clear: "Clear all",
          clearConfirm: "Clear all notifications?",
          cancel: "Cancel",
          confirm: "Clear",
          read: "Read",
          unread: "Unread",
        }
      : language === "dari"
      ? {
          title: "اعلان‌ها",
          back: "برگشت",
          empty: "هنوز اعلانی وجود ندارد.",
          clear: "پاک کردن همه",
          clearConfirm: "همه اعلان‌ها پاک شوند؟",
          cancel: "لغو",
          confirm: "پاک کردن",
          read: "خوانده شده",
          unread: "خوانده نشده",
        }
      : {
          title: "خبرتیاوې",
          back: "بېرته",
          empty: "تر اوسه هېڅ خبرتیا نشته.",
          clear: "ټولې پاکې کړه",
          clearConfirm: "ټولې خبرتیاوې پاکې شي؟",
          cancel: "لغوه",
          confirm: "پاکول",
          read: "لوستل شوې",
          unread: "نه لوستل شوې",
        };

  const loadNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();

      setNotifications(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "LegalMind notifications load error:",
        error
      );

      setNotifications([]);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  async function handleRefresh() {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  }

  async function handleRead(notification) {
    if (!notification?.id || notification.read) {
      return;
    }

    try {
      await markNotificationAsRead(
        notification.id
      );

      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                read: true,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "LegalMind notification read error:",
        error
      );
    }
  }

  function handleClear() {
    if (notifications.length === 0) {
      return;
    }

    const confirmed =
      typeof globalThis?.confirm === "function"
        ? globalThis.confirm(
            text.clearConfirm
          )
        : true;

    if (!confirmed) {
      return;
    }

    clearAllNotifications();
  }

  async function clearAllNotifications() {
    try {
      await clearNotifications();
      setNotifications([]);
    } catch (error) {
      console.error(
        "LegalMind notifications clear error:",
        error
      );
    }
  }

  const unreadCount = notifications.filter(
    (item) => !item?.read
  ).length;

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

        <View style={styles.summaryRow}>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryText}>
              {unreadCount}{" "}
              {language === "english"
                ? "unread"
                : language === "dari"
                ? "خوانده نشده"
                : "نا لوستل شوې"}
            </Text>
          </View>

          {notifications.length > 0 ? (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              activeOpacity={0.8}
            >
              <Text style={styles.clearText}>
                🗑️ {text.clear}
              </Text>
            </TouchableOpacity>
          ) : null}
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
                  getLocalizedValue(
                    notification?.title,
                    language,
                    "LegalMind"
                  );

                const message =
                  getLocalizedValue(
                    notification?.message,
                    language,
                    ""
                  );

                const icon =
                  notification?.icon || "🔔";

                const isRead =
                  Boolean(notification?.read);

                return (
                  <TouchableOpacity
                    key={
                      notification?.id ||
                      `notification-${index}`
                    }
                    style={[
                      styles.card,
                      isRead && styles.readCard,
                    ]}
                    onPress={() =>
                      handleRead(notification)
                    }
                    activeOpacity={0.82}
                  >
                    <View style={styles.iconBox}>
                      <Text style={styles.icon}>
                        {icon}
                      </Text>
                    </View>

                    <View style={styles.info}>
                      <View style={styles.titleRow}>
                        <Text
                          style={[
                            styles.title,
                            isRead &&
                              styles.readTitle,
                          ]}
                        >
                          {title}
                        </Text>

                        <View
                          style={[
                            styles.statusDot,
                            isRead &&
                              styles.readDot,
                          ]}
                        />
                      </View>

                      {message ? (
                        <Text
                          style={[
                            styles.message,
                            isRead &&
                              styles.readMessage,
                          ]}
                        >
                          {message}
                        </Text>
                      ) : null}

                      {notification?.createdAt ? (
                        <Text style={styles.date}>
                          {formatDate(
                            notification.createdAt
                          )}
                        </Text>
                      ) : null}

                      <Text style={styles.status}>
                        {isRead
                          ? text.read
                          : text.unread}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            )
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function getLocalizedValue(
  value,
  language,
  fallback = ""
) {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return (
      value[language] ||
      value.pashto ||
      value.dari ||
      value.english ||
      fallback
    );
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value);
  }

  return fallback;
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
    fontWeight: "700",
  },

  headerTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },

  headerSpace: {
    width: 80,
  },

  summaryRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  summaryBadge: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  summaryText: {
    color: COLORS.lightGray,
    fontSize: 12,
    fontWeight: "700",
  },

  clearButton: {
    minHeight: 42,
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  clearText: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: "800",
  },

  content: {
    paddingTop: 8,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
  },

  readCard: {
    opacity: 0.72,
    borderColor: "#315044",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#102536",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  icon: {
    fontSize: 23,
  },

  info: {
    flex: 1,
    minWidth: 0,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  title: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  readTitle: {
    color: "#D2D8DD",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
    marginLeft: 8,
  },

  readDot: {
    backgroundColor: "#66747F",
  },

  message: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 20,
  },

  readMessage: {
    color: "#89959E",
  },

  date: {
    color: "#7F8C98",
    fontSize: 11,
    marginTop: 7,
  },

  status: {
    color: "#7F8C98",
    fontSize: 10,
    marginTop: 5,
    fontWeight: "700",
  },

  empty: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    marginTop: 20,
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