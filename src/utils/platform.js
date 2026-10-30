/** Определяет платформу пользователя для ссылок на скачивание. */
export function detectPlatform() {
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';

  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return 'windows';
  if (/Mac/i.test(platform)) return 'macos';
  return 'windows';
}

export function platformLabel(key) {
  const labels = {
    ios: 'iPhone',
    android: 'Android',
    windows: 'Windows',
    macos: 'macOS',
  };
  return labels[key] || 'устройство';
}
