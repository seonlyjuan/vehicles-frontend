const USER_STORAGE_KEY = 'user';

export function getStoredUser() {
  const value = localStorage.getItem(USER_STORAGE_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export function saveUser(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
}
