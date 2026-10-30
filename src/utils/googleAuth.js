import { GOOGLE_CLIENT_ID } from '@utils/constants';

let scriptPromise = null;
let initialized = false;
let credentialHandler = null;
let buttonHost = null;

function loadGoogleScript() {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('gsi script error')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('gsi script error'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

function ensureButtonHost() {
  if (buttonHost?.isConnected) return buttonHost;
  buttonHost = document.createElement('div');
  buttonHost.setAttribute('aria-hidden', 'true');
  buttonHost.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;';
  document.body.appendChild(buttonHost);
  return buttonHost;
}

export function isGoogleAuthConfigured() {
  return Boolean(GOOGLE_CLIENT_ID);
}

/** Один раз на приложение — повторный initialize ломает GIS. */
export async function initGoogleAuth(onCredential) {
  if (!GOOGLE_CLIENT_ID) {
    return { ok: false, reason: 'missing_client_id' };
  }
  credentialHandler = onCredential;
  try {
    await loadGoogleScript();
  } catch {
    return { ok: false, reason: 'script_load_failed' };
  }
  if (!window.google?.accounts?.id) {
    return { ok: false, reason: 'gsi_unavailable' };
  }
  if (!initialized) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        if (response?.credential) {
          credentialHandler?.(response.credential);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
      itp_support: true,
    });
    const host = ensureButtonHost();
    host.innerHTML = '';
    window.google.accounts.id.renderButton(host, {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: 'signin_with',
      width: 280,
    });
    initialized = true;
  } else {
    credentialHandler = onCredential;
  }
  return { ok: true };
}

export async function triggerGoogleSignIn() {
  const init = await initGoogleAuth(credentialHandler);
  if (!init.ok) return init;

  const host = ensureButtonHost();
  const clickTarget =
    host.querySelector('[role="button"]')
    || host.querySelector('iframe');

  if (clickTarget) {
    clickTarget.click();
    return { ok: true, mode: 'button' };
  }

  return new Promise((resolve) => {
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        resolve({
          ok: false,
          reason: 'not_displayed',
          detail: notification.getNotDisplayedReason?.() || '',
        });
        return;
      }
      if (notification.isSkippedMoment()) {
        resolve({
          ok: false,
          reason: 'skipped',
          detail: notification.getSkippedReason?.() || '',
        });
        return;
      }
      resolve({ ok: true, mode: 'prompt' });
    });
  });
}
