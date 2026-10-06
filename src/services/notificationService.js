import {
  getData,
  saveData
} from "../storage/storage";

const NOTIFICATIONS_KEY =
  "@legalmind/notifications";

const DEFAULT_NOTIFICATIONS = [];

export async function getNotifications() {
  const notifications = await getData(
    NOTIFICATIONS_KEY,
    DEFAULT_NOTIFICATIONS
  );

  return Array.isArray(notifications)
    ? notifications
    : [];
}

export async function addNotification({
  title = "",
  message = "",
  type = "info",
  data = null
}) {
  const notifications =
    await getNotifications();

  const notification = {
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
    title,
    message,
    type,
    data,
    read: false,
    createdAt: new Date().toISOString()
  };

  notifications.unshift(notification);

  await saveData(
    NOTIFICATIONS_KEY,
    notifications
  );

  return notification;
}

export async function markAsRead(id) {
  const notifications =
    await getNotifications();

  const updated = notifications.map(
    (item) =>
      item.id === id
        ? {
            ...item,
            read: true
          }
        : item
  );

  await saveData(
    NOTIFICATIONS_KEY,
    updated
  );

  return updated;
}

export async function markAllAsRead() {
  const notifications =
    await getNotifications();

  const updated = notifications.map(
    (item) => ({
      ...item,
      read: true
    })
  );

  await saveData(
    NOTIFICATIONS_KEY,
    updated
  );

  return updated;
}

export async function getUnreadCount() {
  const notifications =
    await getNotifications();

  return notifications.filter(
    (item) => !item.read
  ).length;
}

export async function removeNotification(id) {
  const notifications =
    await getNotifications();

  const updated = notifications.filter(
    (item) => item.id !== id
  );

  await saveData(
    NOTIFICATIONS_KEY,
    updated
  );

  return updated;
}

export async function clearNotifications() {
  await saveData(
    NOTIFICATIONS_KEY,
    []
  );

  return [];
}

export async function notifyAchievement(
  achievement
) {
  if (!achievement) {
    return null;
  }

  return addNotification({
    title: "🏆 نوې لاسته راوړنه!",
    message:
      achievement.title ||
      "تاسې یوه نوې لاسته راوړنه ترلاسه کړه.",
    type: "achievement",
    data: {
      achievementId: achievement.id
    }
  });
}

export async function notifyCaseCompleted({
  role,
  score
}) {
  return addNotification({
    title: "⚖️ قضیه بشپړه شوه",
    message:
      `ستاسې قضیه بشپړه شوه. د پرمختګ نمرې: ${score}`,
    type: "case_completed",
    data: {
      role,
      score
    }
  });
}