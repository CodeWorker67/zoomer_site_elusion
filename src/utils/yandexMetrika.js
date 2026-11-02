const rawId = String(import.meta.env.VITE_YANDEX_METRIKA_ID || '').trim();

/** Подключение счётчика из VITE_YANDEX_METRIKA_ID; без значения — no-op. */
export function initYandexMetrika() {
  if (!rawId || !/^\d+$/.test(rawId)) return;

  const id = Number(rawId);
  const tagUrl = `https://mc.yandex.ru/metrika/tag.js?id=${rawId}`;

  (function bootstrap(m, e, t, r, i, k, a) {
    m[i] = m[i] || function ymStub() {
      (m[i].a = m[i].a || []).push(arguments);
    };
    m[i].l = 1 * new Date();
    for (let j = 0; j < document.scripts.length; j += 1) {
      if (document.scripts[j].src === r) return;
    }
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, 'script', tagUrl, 'ym');

  window.ym(id, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}
