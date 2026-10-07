import {
  getData,
  saveData
} from "../storage/storage";

const NOTIFICATIONS_KEY =
  "@legalmind/notifications";

const DEFAULT_NOTIFICATIONS = [];

const ALLOWED_TYPES = [
  "info",
  "achievement",
  "case_completed",
  "reward",
  "system"
];

function cleanText(value = "") {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function cleanType(type) {
  const value =
    cleanText(type).toLowerCase();

  return ALLOWED_TYPES.includes(value)
    ? value
    : "info";
}

function cleanNotifications(
  notifications = []
) {
  if (!Array.isArray(notifications)) {
    return [];
  }

  const seen = new Set();

  return notifications
    .filter(
      (item) =>
        item &&
        typeof item === "object"
    )
    .map((item) => ({
      ...item,
      id: cleanText(item.id),
      title: cleanText(item.title),
      message: cleanText(item.message),
      type: cleanType(item.type),
      data:
        item.data ?? null,
      read: item.read === true,
      createdAt:
        item.createdAt ||
        new Date().toISOString()
    }))
    .filter((item) => {
      if (!item.id) {
        return false;
      }

      if (seen.has(item.id)) {
        return false;
      }

      seen.add(item.id);
      return true;
    });
}

function createNotificationId() {
  return `notification-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export async function getNotifications() {
  const notifications =
    await getData(
      NOTIFICATIONS_KEY,
      DEFAULT_NOTIFICATIONS
    );

  const clean =
    cleanNotifications(
      notifications
    );

  if (
    Array.isArray(notifications) &&
    clean.length !== notifications.length
  ) {
    await saveData(
      NOTIFICATIONS_KEY,
      clean
    );
  }

  return clean;
}

export async function addNotification({
  title = "",
  message = "",
  type = "info",
  data = null
}) {
  const cleanTitle =
    cleanText(title);

  const cleanMessage =
    cleanText(message);

  if (!cleanTitle || !cleanMessage) {
    return null;
  }

  const notifications =
    await getNotifications();

  /*
   * Prevent the same notification
   * from being added repeatedly.
   */
  const duplicate =
    notifications.find(
      (item) =>
        item.title === cleanTitle &&
        item.message === cleanMessage &&
        item.type === cleanType(type)
    );

  if (duplicate) {
    return duplicate;
  }

  const notification = {
    id: createNotificationId(),
    title: cleanTitle,
    message: cleanMessage,
    type: cleanType(type),
    data: data ?? null,
    read: false,
    createdAt:
      new Date().toISOString()
  };

  const updated = [
    notification,
    ...notifications
  ];

  await saveData(
    NOTIFICATIONS_KEY,
    updated
  );

  return notification;
}

export async function markAsRead(id) {
  const cleanId =
    cleanText(id);

  if (!cleanId) {
    return getNotifications();
  }

  const notifications =
    await getNotifications();

  const updated =
    notifications.map(
      (item) =>
        item.id === cleanId
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

  const updated =
    notifications.map(
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
    (item) =>
      item.read !== true
  ).length;
}

export async function removeNotification(
  id
) {
  const cleanId =
    cleanText(id);

  if (!cleanId) {
    return getNotifications();
  }

  const notifications =
    await getNotifications();

  const updated =
    notifications.filter(
      (item) =>
        item.id !== cleanId
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
  if (!achievement?.id) {
    return null;
  }

  return addNotification({
    title:
      "🏆 نوې لاسته راوړنه!",
    message:
      achievement.title ||
      "تاسې یوه نوې لاسته راوړنه ترلاسه کړه.",
    type: "achievement",
    data: {
      achievementId:
        achievement.id
    }
  });
}

export async function notifyCaseCompleted({
  role,
  score
}) {
  const cleanRole =
    cleanText(role);

  const cleanScore =
    Number(score);

  const safeScore =
    Number.isFinite(cleanScore)
      ? Math.max(
          0,
          Math.floor(cleanScore)
        )
      : 0;

  return addNotification({
    title:
      "⚖️ قضیه بشپړه شوه",
    message:
      `ستاسې قضیه بشپړه شوه. د پرمختګ نمرې: ${safeScore}`,
    type:
      "case_completed",
    data: {
      role:
        cleanRole || null,
      score:
        safeScore
    }
  });
}

export async function notifyReward({
  title = "🎁 ځانګړې جایزه!",
  message = "تاسې یوه ځانګړې جایزه ترلاسه کړې.",
  data = null
} = {}) {
  return addNotification({
    title,
    message,
    type: "reward",
    data
  });
}

export async function notifySystem({
  title = "LegalMind",
  message = "",
  data = null
} = {}) {
  return addNotification({
    title,
    message,
    type: "system",
    data
  });
}