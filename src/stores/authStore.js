import { create } from 'zustand';
import { authApi, AUTH_TOKEN_STORAGE_KEY } from '@services/api';
import { attributionPayload } from '@utils/partner';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  loadFromStorage: async () => {
    const userJson = localStorage.getItem('landing_user');
    if (!userJson) return;
    try {
      const user = JSON.parse(userJson);
      set({ user, isAuthenticated: true });
      const { data } = await authApi.me();
      set({ user: data, isAuthenticated: true });
      localStorage.setItem('landing_user', JSON.stringify(data));
    } catch {
      localStorage.removeItem('landing_user');
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      set({ user: null, isAuthenticated: false });
    }
  },

  _setAuth: (user, token) => {
    localStorage.setItem('landing_user', JSON.stringify(user));
    if (token) {
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    }
    set({ user, isAuthenticated: true, isLoading: false });
  },

  sendCode: async (email) => {
    set({ isLoading: true });
    try {
      const { data } = await authApi.sendCode({ email, ...attributionPayload() });
      set({ isLoading: false });
      return { success: true, email: data.email };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.response?.data?.detail || 'Ошибка отправки кода' };
    }
  },

  checkEmail: async (email) => {
    set({ isLoading: true });
    try {
      const { data } = await authApi.checkEmail({ email });
      set({ isLoading: false });
      return { success: true, hasPassword: data.has_password };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.response?.data?.detail || 'Ошибка проверки email' };
    }
  },

  passwordLogin: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await authApi.passwordLogin({ email, password });
      const { data } = response;
      const jwt = data.token || response.headers['x-auth-token'] || response.headers['X-Auth-Token'];
      get()._setAuth(data.user, jwt);
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.response?.data?.detail || 'Неверный email или пароль' };
    }
  },

  verifyCode: async (email, code) => {
    set({ isLoading: true });
    try {
      const response = await authApi.verifyCode({ email, code });
      const { data } = response;
      const jwt = data.token || response.headers['x-auth-token'] || response.headers['X-Auth-Token'];
      get()._setAuth(data.user, jwt);
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.response?.data?.detail || 'Неверный код' };
    }
  },

  resendCode: async (email) => {
    try {
      await authApi.resendCode({ email });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Не удалось отправить код' };
    }
  },

  googleLogin: async (credential) => {
    set({ isLoading: true });
    try {
      const response = await authApi.googleLogin({ credential, ...attributionPayload() });
      const { data } = response;
      const jwt = data.token || response.headers['x-auth-token'] || response.headers['X-Auth-Token'];
      get()._setAuth(data.user, jwt);
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.response?.data?.detail || 'Ошибка Google' };
    }
  },

  startPhoneAuth: async (phone) => {
    set({ isLoading: true });
    try {
      const { data } = await authApi.phoneStart({ phone, ...attributionPayload() });
      set({ isLoading: false });
      return { success: true, ...data };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.detail || 'Не удалось начать авторизацию по телефону',
      };
    }
  },

  checkPhoneAuth: async (requestId) => {
    try {
      const response = await authApi.phoneStatus(requestId);
      const { data } = response;
      if (data.status === 'pending') {
        return { success: true, pending: true };
      }
      const jwt = data.token || response.headers['x-auth-token'] || response.headers['X-Auth-Token'];
      get()._setAuth(data.user, jwt);
      return { success: true, pending: false };
    } catch (error) {
      const detail = error.response?.data?.detail;
      const statusValue = error.response?.data?.status;
      if (statusValue && statusValue !== 'pending') {
        return { success: false, error: detail || 'Авторизация не удалась' };
      }
      return { success: false, error: detail || 'Ошибка проверки статуса' };
    }
  },

  fetchWhatsAppConfig: async () => {
    try {
      const { data } = await authApi.whatsappConfig();
      return { success: true, ...data };
    } catch {
      return { success: false, enabled: false, bot_url: null, code_ttl_seconds: 180 };
    }
  },

  verifyWhatsAppCode: async (code) => {
    set({ isLoading: true });
    try {
      const response = await authApi.whatsappVerifyCode({ code, ...attributionPayload() });
      const { data } = response;
      const jwt = data.token || response.headers['x-auth-token'] || response.headers['X-Auth-Token'];
      get()._setAuth(data.user, jwt);
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.detail || 'Неверный код',
      };
    }
  },

  logout: async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    localStorage.removeItem('landing_user');
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
