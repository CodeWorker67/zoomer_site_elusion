const STORAGE_KEY = 'landing_onboarding_done';

export function isOnboardingComplete(userId) {
  if (!userId) return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ids = JSON.parse(raw);
    return Array.isArray(ids) && ids.includes(String(userId));
  } catch {
    return false;
  }
}

export function markOnboardingComplete(userId) {
  if (!userId) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(ids) ? ids : [];
    const key = String(userId);
    if (!next.includes(key)) {
      next.push(key);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([String(userId)]));
  }
}
