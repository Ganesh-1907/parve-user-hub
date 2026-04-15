const TOKEN_STORAGE_KEY = "token";
const AUTH_STORAGE_KEY = "parve-auth";
const CART_STORAGE_KEY = "parve-cart";
const WISHLIST_STORAGE_KEY = "parve-wishlist";

const getAuthStorage = () => window.localStorage;
const getLegacySessionStorage = () => window.sessionStorage;

const getStorageValue = (key: string) => {
  const currentValue = getAuthStorage().getItem(key);
  if (currentValue !== null) {
    return currentValue;
  }

  const legacyValue = getLegacySessionStorage().getItem(key);
  if (legacyValue !== null) {
    getAuthStorage().setItem(key, legacyValue);
    getLegacySessionStorage().removeItem(key);
  }

  return legacyValue;
};

const decodeJwtPayload = (token: string) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const normalized = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");

    return JSON.parse(window.atob(normalized));
  } catch {
    return null;
  }
};

export const getStoredToken = () => getStorageValue(TOKEN_STORAGE_KEY);

export const setStoredToken = (token: string) => {
  getAuthStorage().setItem(TOKEN_STORAGE_KEY, token);
  getLegacySessionStorage().removeItem(TOKEN_STORAGE_KEY);
};

export const isTokenExpired = (token: string) => {
  const payload = decodeJwtPayload(token);

  if (!payload || typeof payload.exp !== "number") {
    return true;
  }

  return payload.exp * 1000 <= Date.now();
};

export const getTokenExpiryTime = (token: string) => {
  const payload = decodeJwtPayload(token);

  if (!payload || typeof payload.exp !== "number") {
    return null;
  }

  return payload.exp * 1000;
};

export const hasValidToken = () => {
  const token = getStoredToken();
  return !!token && !isTokenExpired(token);
};

export const clearPersistedSession = () => {
  getAuthStorage().removeItem(TOKEN_STORAGE_KEY);
  getAuthStorage().removeItem(AUTH_STORAGE_KEY);
  getAuthStorage().removeItem(CART_STORAGE_KEY);
  getAuthStorage().removeItem(WISHLIST_STORAGE_KEY);
  getLegacySessionStorage().removeItem(TOKEN_STORAGE_KEY);
  getLegacySessionStorage().removeItem(AUTH_STORAGE_KEY);
  getLegacySessionStorage().removeItem(CART_STORAGE_KEY);
  getLegacySessionStorage().removeItem(WISHLIST_STORAGE_KEY);
};
