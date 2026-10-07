import {
  normalizeEmail,
  normalizeText
} from "./duplicateProtection";

export function findUserByEmail(users = [], email) {
  const targetEmail = normalizeEmail(email);

  if (!targetEmail) {
    return null;
  }

  return (
    users.find(
      (user) =>
        normalizeEmail(user?.email) === targetEmail
    ) || null
  );
}

export function canCreateUser(users = [], email) {
  return !findUserByEmail(users, email);
}

export function addUniqueUser(users = [], user) {
  if (!user?.id || !user?.email) {
    return {
      users,
      added: false,
      reason: "invalid_user"
    };
  }

  if (!canCreateUser(users, user.email)) {
    return {
      users,
      added: false,
      reason: "duplicate_email"
    };
  }

  return {
    users: [
      ...users,
      {
        ...user,
        email: normalizeEmail(user.email),
        name: normalizeText(user.name),
        surname: normalizeText(user.surname)
      }
    ],
    added: true,
    reason: null
  };
}

export function updateUserUnique(
  users = [],
  updatedUser
) {
  if (!updatedUser?.id) {
    return {
      users,
      updated: false,
      reason: "invalid_user"
    };
  }

  const email = normalizeEmail(updatedUser.email);

  const duplicateEmail = users.some(
    (user) =>
      String(user?.id) !== String(updatedUser.id) &&
      normalizeEmail(user?.email) === email
  );

  if (duplicateEmail) {
    return {
      users,
      updated: false,
      reason: "duplicate_email"
    };
  }

  return {
    users: users.map((user) =>
      String(user?.id) === String(updatedUser.id)
        ? {
            ...user,
            ...updatedUser,
            email,
            name: normalizeText(updatedUser.name),
            surname: normalizeText(
              updatedUser.surname
            )
          }
        : user
    ),
    updated: true,
    reason: null
  };
}