export function generateId(prefix = "item") {
  const timestamp = Date.now().toString(36);
  const random = Math.random()
    .toString(36)
    .substring(2, 10);

  return `${prefix}-${timestamp}-${random}`;
}

export function generateCaseId(role, number) {
  const safeRole = String(role || "case")
    .trim()
    .toLowerCase();

  const safeNumber = String(number).padStart(3, "0");

  return `case-${safeRole}-${safeNumber}`;
}

export function generateUserId() {
  return generateId("user");
}

export function generateAchievementId(name) {
  const safeName = String(name || "achievement")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  return `achievement-${safeName}`;
}

export function generateNotificationId() {
  return generateId("notification");
}