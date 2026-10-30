import axios from 'axios';
import { API_BASE_URL } from '@utils/constants';

export const AUTH_TOKEN_STORAGE_KEY = 'landing_auth_token';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('landing_user');
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      const path = window.location.pathname;
      if (!path.includes('/auth/login')) {
        window.location.href = '/auth/login?reason=session_expired';
      }
    }
    return Promise.reject(error);
  },
);

export const authApi = {
  sendCode: (data) => api.post('/auth/send-code', data),
  verifyCode: (data) => api.post('/auth/verify-code', data),
  resendCode: (data) => api.post('/auth/resend-code', data),
  checkEmail: (data) => api.post('/auth/check-email', data),
  passwordLogin: (data) => api.post('/auth/password-login', data),
  googleLogin: (data) => api.post('/auth/google', data),
  phoneStart: (data) => api.post('/auth/phone/start', data),
  phoneStatus: (requestId) => api.get(`/auth/phone/status/${requestId}`),
  whatsappConfig: () => api.get('/auth/whatsapp/config'),
  whatsappVerifyCode: (data) => api.post('/auth/whatsapp/verify-code', data),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const configApi = {
  tariffs: () => api.get('/config/tariffs'),
};

export const paymentApi = {
  /** { tariff_id: '30'|'90'|'180'|'365', devices?: 1..10, method: 'sbp'|'card' } */
  createPayment: (data) => api.post('/payments/create', data),
  /** { add_count: 1..N, method: 'sbp'|'card' } */
  createAddDevicesPayment: (data) => api.post('/payments/create-add-devices', data),
  getStatus: (id) => api.get(`/payments/${id}/status`),
};

export const userApi = {
  subscription: () => api.get('/user/subscription'),
  keys: () => api.get('/user/keys'),
  addDevicesOptions: () => api.get('/user/add-devices'),
  passwordStatus: () => api.get('/user/password-status'),
  setPassword: (data) => api.post('/user/set-password', data),
  changePassword: (data) => api.post('/user/change-password', data),
  removePassword: (data) => api.post('/user/remove-password', data),
};

export const trialApi = {
  activate: () => api.post('/trial/activate'),
};

export const partnerApi = {
  stats: () => api.get('/user/partner'),
};

export default api;
