import { useEffect, useState, useCallback } from 'react';
import { RouteMeta } from '@components/seo/PageMeta';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, KeyRound, Phone } from 'lucide-react';
import useAuthStore from '@stores/authStore';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';
import { ROUTES, BRAND_META } from '@utils/constants';
import { navigateAfterAuth } from '@utils/authRedirect';
import { buildTelegramBotUrl } from '@utils/botLink';
import {
  initGoogleAuth,
  isGoogleAuthConfigured,
  triggerGoogleSignIn,
} from '@utils/googleAuth';

const METHODS = [
  {
    id: 'email',
    label: 'Почта',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Телефон',
    icon: <Phone className="w-7 h-7" strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    id: 'whatsapp',
    hiddenFromSelect: true,
    label: 'WhatsApp',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: 'telegram',
    label: 'Telegram',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#229ED9" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    id: 'google',
    label: 'Google',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const goAfterAuth = useCallback(() => {
    navigateAfterAuth(navigate, redirect);
  }, [navigate, redirect]);
  const {
    isAuthenticated,
    sendCode,
    verifyCode,
    resendCode,
    googleLogin,
    checkEmail,
    passwordLogin,
    startPhoneAuth,
    checkPhoneAuth,
    fetchWhatsAppConfig,
    verifyWhatsAppCode,
    isLoading,
  } = useAuthStore();
  const [step, setStep] = useState('select');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [whatsappCode, setWhatsappCode] = useState('');
  const [whatsappConfig, setWhatsappConfig] = useState(null);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneSession, setPhoneSession] = useState(null);

  useEffect(() => {
    if (isAuthenticated) goAfterAuth();
  }, [isAuthenticated, goAfterAuth]);

  const handleGoogleSuccess = useCallback(async (credential) => {
    const result = await googleLogin(credential);
    if (result.success) {
      toast.success('Вы вошли через Google!');
      goAfterAuth();
    } else {
      toast.error(result.error);
    }
  }, [googleLogin, goAfterAuth]);

  useEffect(() => {
    initGoogleAuth(handleGoogleSuccess);
  }, [handleGoogleSuccess]);

  const triggerGoogle = useCallback(async () => {
    if (!isGoogleAuthConfigured()) {
      toast.error('Google вход не настроен (VITE_GOOGLE_CLIENT_ID)');
      return;
    }
    const result = await triggerGoogleSignIn();
    if (result.ok) return;
    if (result.reason === 'missing_client_id') {
      toast.error('Google вход не настроен (VITE_GOOGLE_CLIENT_ID)');
    } else if (result.reason === 'not_displayed' || result.reason === 'skipped') {
      toast.error('Не удалось открыть окно Google. Разрешите всплывающие окна или войдите по почте.');
    } else {
      toast.error('Google вход временно недоступен');
    }
  }, []);

  const backToSelect = () => {
    setStep('select');
    setCode('');
    setWhatsappCode('');
    setWhatsappConfig(null);
    setPassword('');
    setPhoneSession(null);
  };

  const handleEmailContinue = async (e) => {
    e.preventDefault();
    const check = await checkEmail(email);
    if (!check.success) {
      toast.error(check.error);
      return;
    }
    if (check.hasPassword) {
      setStep('password');
      return;
    }
    const result = await sendCode(email);
    if (result.success) {
      toast.success('Код отправлен на почту');
      setStep('code');
    } else {
      toast.error(result.error);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    const result = await passwordLogin(email, password);
    if (result.success) {
      toast.success('Вы вошли!');
      goAfterAuth();
    } else {
      toast.error(result.error);
    }
  };

  const handleSwitchToCode = async () => {
    const result = await sendCode(email);
    if (result.success) {
      toast.success('Код отправлен на почту');
      setStep('code');
    } else {
      toast.error(result.error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const result = await verifyCode(email, code);
    if (result.success) {
      toast.success('Вы вошли!');
      goAfterAuth();
    } else {
      toast.error(result.error);
    }
  };

  const handleResend = async () => {
    const result = await resendCode(email);
    if (result.success) toast.success('Код отправлен повторно');
    else toast.error(result.error);
  };

  const handlePhoneContinue = async (e) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      toast.error('Введите корректный номер телефона');
      return;
    }
    const result = await startPhoneAuth(phone);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    setPhoneSession({
      requestId: result.request_id,
      callToPhone: result.call_to_phone,
      callToPhoneDisplay: result.call_to_phone_display,
      timeout: result.timeout || 180,
    });
    setStep('phone-call');
  };

  const handlePhoneAuthComplete = useCallback(async () => {
    toast.success('Вы вошли по телефону!');
    goAfterAuth();
  }, [goAfterAuth]);

  const handleWhatsappVerify = async (e) => {
    e.preventDefault();
    const result = await verifyWhatsAppCode(whatsappCode);
    if (result.success) {
      toast.success('Вы вошли через WhatsApp!');
      goAfterAuth();
    } else {
      toast.error(result.error);
    }
  };

  const handleMethodSelect = async (methodId, triggerGoogle) => {
    if (methodId === 'email') {
      setStep('email');
      return;
    }
    if (methodId === 'phone') {
      setStep('phone');
      return;
    }
    if (methodId === 'whatsapp') {
      const cfg = await fetchWhatsAppConfig();
      if (!cfg.success || !cfg.enabled || !cfg.bot_url) {
        toast.error('Вход через WhatsApp временно недоступен');
        return;
      }
      setWhatsappConfig(cfg);
      setStep('whatsapp');
      return;
    }
    if (methodId === 'telegram') {
      window.open(buildTelegramBotUrl(), '_blank', 'noopener,noreferrer');
      return;
    }
    if (methodId === 'google') {
      triggerGoogle?.();
    }
  };

  return (
    <>
      <RouteMeta path={ROUTES.LOGIN} />
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 relative">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        <div className="relative w-full max-w-md mx-4">
          <AnimatePresence mode="wait">
            {step === 'select' && (
              <MethodSelect
                key="select"
                onSelect={handleMethodSelect}
                triggerGoogle={triggerGoogle}
              />
            )}

            {(step === 'email' || step === 'code' || step === 'password') && (
              <EmailFlow
                key="email-flow"
                step={step}
                email={email}
                code={code}
                password={password}
                isLoading={isLoading}
                onBack={backToSelect}
                onEmailChange={setEmail}
                onCodeChange={setCode}
                onPasswordChange={setPassword}
                onEmailContinue={handleEmailContinue}
                onPasswordLogin={handlePasswordLogin}
                onSwitchToCode={handleSwitchToCode}
                onVerify={handleVerify}
                onResend={handleResend}
                triggerGoogle={triggerGoogle}
                onSelectPhone={() => setStep('phone')}
              />
            )}

            {(step === 'phone' || step === 'phone-call') && (
              <PhoneFlow
                key="phone-flow"
                step={step}
                phone={phone}
                phoneSession={phoneSession}
                isLoading={isLoading}
                onBack={backToSelect}
                onPhoneChange={setPhone}
                onPhoneContinue={handlePhoneContinue}
                onRetry={() => setStep('phone')}
                checkPhoneAuth={checkPhoneAuth}
                onSuccess={handlePhoneAuthComplete}
                triggerGoogle={triggerGoogle}
                onSelectEmail={() => setStep('email')}
              />
            )}

            {step === 'whatsapp' && whatsappConfig && (
              <WhatsAppFlow
                key="whatsapp-flow"
                config={whatsappConfig}
                code={whatsappCode}
                isLoading={isLoading}
                onBack={backToSelect}
                onCodeChange={setWhatsappCode}
                onVerify={handleWhatsappVerify}
                triggerGoogle={triggerGoogle}
                onSelectEmail={() => setStep('email')}
              />
            )}
          </AnimatePresence>

          {step !== 'select' && (
            <p className="text-center text-sm text-happ-faint mt-6">
              Нет аккаунта? Он создастся автоматически при первом входе.
            </p>
          )}

          <p className="text-center text-xs text-happ-faint mt-6">
            Продолжая, вы соглашаетесь с{' '}
            <Link to={ROUTES.TERMS} className="text-zoomer-neon hover:underline">условиями</Link>
            {' '}и{' '}
            <Link to={ROUTES.PRIVACY} className="text-zoomer-neon hover:underline">политикой конфиденциальности</Link>
          </p>
        </div>
      </section>
    </>
  );
}

function MethodSelect({ onSelect, triggerGoogle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-happ-ink mb-2">Личный кабинет</h1>
      <p className="text-happ-muted text-sm mb-8">Войдите или создайте аккаунт</p>

      <p className="text-happ-muted text-sm sm:text-base mb-10 leading-relaxed">
        Всего 2 шага — выбрать способ входа и получить подписку
      </p>

      <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-8">
        {METHODS.filter((method) => !method.hiddenFromSelect).map((method, i) => (
          <motion.button
            key={method.id}
            type="button"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.08 * i, duration: 0.35, ease: 'easeOut' }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(method.id, triggerGoogle)}
            className="group flex flex-col items-center gap-3 focus:outline-none"
          >
            <span className="w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 rounded-2xl border border-happ-blue/25 bg-white flex items-center justify-center text-happ-blue shadow-[0_4px_16px_rgba(10,108,255,0.08)] transition-all duration-300 group-hover:border-happ-blue/50 group-hover:shadow-[0_4px_20px_rgba(10,108,255,0.18)] group-hover:bg-happ-gray">
              {method.icon}
            </span>
            <span className="text-sm text-happ-muted group-hover:text-happ-ink transition-colors">{method.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function EmailFlow({
  step,
  email,
  code,
  password,
  isLoading,
  onBack,
  onEmailChange,
  onCodeChange,
  onPasswordChange,
  onEmailContinue,
  onPasswordLogin,
  onSwitchToCode,
  onVerify,
  onResend,
  triggerGoogle,
  onSelectPhone,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-happ-muted hover:text-happ-ink text-sm mb-6 mx-auto"
      >
        <ArrowLeft className="w-4 h-4" />
        Другой способ входа
      </button>

      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-happ-ink mb-2">Личный кабинет</h1>
        <p className="text-happ-muted text-sm">Войдите или создайте аккаунт</p>
      </div>

      <div className="card-dark">
        {step === 'email' ? (
          <form onSubmit={onEmailContinue} className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl border border-zoomer-neon/30 bg-zoomer-neon/10 flex items-center justify-center mx-auto mb-4 text-zoomer-neon">
                <Mail className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-happ-ink mb-1">Вход по почте</h2>
              <p className="text-happ-muted text-sm">Введите email для входа</p>
            </div>

            <div>
              <label htmlFor="login-email" className="block text-sm text-happ-muted mb-1.5">Электронная почта</label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-happ-gray border border-black/[0.07] text-happ-ink text-sm focus:border-zoomer-neon focus:outline-none"
                placeholder="name@example.com"
                autoFocus
              />
            </div>

            <Button type="submit" disabled={isLoading} className={`w-full text-sm ${isLoading ? 'opacity-50' : ''}`}>
              {isLoading ? 'Проверяем...' : 'Продолжить →'}
            </Button>

            <OrDivider />
            <AlternateMethods triggerGoogle={triggerGoogle} onSelectPhone={onSelectPhone} />
          </form>
        ) : step === 'password' ? (
          <form onSubmit={onPasswordLogin} className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl border border-zoomer-neon/30 bg-zoomer-neon/10 flex items-center justify-center mx-auto mb-4 text-zoomer-neon">
                <KeyRound className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-happ-ink mb-1">Вход в аккаунт</h2>
              <p className="text-happ-muted text-sm">{email}</p>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm text-happ-muted mb-1.5">Пароль</label>
              <input
                id="login-password"
                type="password"
                required
                minLength={4}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-happ-gray border border-black/[0.07] text-happ-ink text-sm focus:border-zoomer-neon focus:outline-none"
                placeholder="Ваш пароль"
                autoFocus
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" disabled={isLoading || password.length < 4} className="w-full text-sm">
              {isLoading ? 'Входим...' : 'Войти →'}
            </Button>

            <button
              type="button"
              onClick={onSwitchToCode}
              disabled={isLoading}
              className="w-full text-center text-sm text-happ-faint hover:text-zoomer-neon"
            >
              Забыли пароль? <span className="text-zoomer-neon">Войти по коду</span>
            </button>
          </form>
        ) : (
          <form onSubmit={onVerify} className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl border border-zoomer-neon/30 bg-zoomer-neon/10 flex items-center justify-center mx-auto mb-4 text-zoomer-neon">
                <Mail className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-happ-ink mb-1">Введите код</h2>
              <p className="text-happ-muted text-sm">
                Код отправлен на <span className="text-happ-ink font-medium">{email}</span>
              </p>
            </div>

            <input
              type="text"
              inputMode="numeric"
              required
              value={code}
              onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-4 rounded-xl bg-happ-gray border border-black/[0.07] text-happ-ink text-center text-2xl tracking-widest focus:border-zoomer-neon focus:outline-none"
              placeholder="000000"
              maxLength={6}
              autoFocus
            />

            <Button type="submit" disabled={isLoading || code.length !== 6} className="w-full text-sm">
              {isLoading ? 'Проверяем...' : 'Войти →'}
            </Button>

            <button type="button" onClick={onResend} className="w-full text-center text-sm text-happ-faint hover:text-zoomer-neon">
              Отправить код повторно
            </button>

            <OrDivider />
            <AlternateMethods triggerGoogle={triggerGoogle} compact />
          </form>
        )}
      </div>
    </motion.div>
  );
}

function PhoneFlow({
  step,
  phone,
  phoneSession,
  isLoading,
  onBack,
  onPhoneChange,
  onPhoneContinue,
  onRetry,
  checkPhoneAuth,
  onSuccess,
  triggerGoogle,
  onSelectEmail,
}) {
  const [secondsLeft, setSecondsLeft] = useState(phoneSession?.timeout || 180);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (step !== 'phone-call' || !phoneSession?.requestId) return undefined;
    setSecondsLeft(phoneSession.timeout || 180);
    setWaiting(true);
    let cancelled = false;

    const poll = async () => {
      const result = await checkPhoneAuth(phoneSession.requestId);
      if (cancelled) return;
      if (result.success && !result.pending) {
        setWaiting(false);
        onSuccess();
        return;
      }
      if (!result.success && !result.pending) {
        setWaiting(false);
        toast.error(result.error);
      }
    };

    poll();
    const pollInterval = setInterval(poll, 3000);
    const timerInterval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      cancelled = true;
      clearInterval(pollInterval);
      clearInterval(timerInterval);
    };
  }, [step, phoneSession, checkPhoneAuth, onSuccess]);

  const formatTimer = (total) => {
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-happ-muted hover:text-happ-ink text-sm mb-6 mx-auto"
      >
        <ArrowLeft className="w-4 h-4" />
        Другой способ входа
      </button>

      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-happ-ink mb-2">Личный кабинет</h1>
        <p className="text-happ-muted text-sm">Войдите или создайте аккаунт</p>
      </div>

      <div className="card-dark">
        {step === 'phone' ? (
          <form onSubmit={onPhoneContinue} className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl border border-zoomer-neon/30 bg-zoomer-neon/10 flex items-center justify-center mx-auto mb-4 text-zoomer-neon">
                <Phone className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-happ-ink mb-1">Вход по телефону</h2>
              <p className="text-happ-muted text-sm">Введите номер для подтверждения звонком</p>
            </div>

            <div>
              <label htmlFor="login-phone" className="block text-sm text-happ-muted mb-1.5">Номер телефона</label>
              <input
                id="login-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => onPhoneChange(formatPhoneInput(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-happ-gray border border-black/[0.07] text-happ-ink text-sm focus:border-zoomer-neon focus:outline-none"
                placeholder="+7 (999) 123-45-67"
                autoFocus
              />
            </div>

            <Button type="submit" disabled={isLoading} className={`w-full text-sm ${isLoading ? 'opacity-50' : ''}`}>
              {isLoading ? 'Подготавливаем...' : 'Продолжить →'}
            </Button>

            <OrDivider />
            <AlternateMethods triggerGoogle={triggerGoogle} onSelectEmail={onSelectEmail} />
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl border border-zoomer-neon/30 bg-zoomer-neon/10 flex items-center justify-center mx-auto mb-4 text-zoomer-neon">
                <Phone className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-happ-ink mb-1">Позвоните для входа</h2>
              <p className="text-happ-muted text-sm">
                С номера <span className="text-happ-ink font-medium">{phone}</span>
              </p>
            </div>

            <div className="rounded-xl border border-zoomer-neon/30 bg-zoomer-neon/5 px-4 py-5 text-center">
              <p className="text-xs uppercase tracking-wide text-happ-muted mb-2">Позвоните на номер</p>
              <a
                href={`tel:${phoneToTelUri(phoneSession?.callToPhone || phoneSession?.callToPhoneDisplay)}`}
                className="text-2xl sm:text-3xl font-bold text-zoomer-neon hover:underline"
              >
                {phoneSession?.callToPhoneDisplay || phoneSession?.callToPhone}
              </a>
              <p className="text-happ-faint text-xs mt-3">
                Звонок сбросится автоматически. Поднимать трубку не нужно.
              </p>
            </div>

            <div className="text-center text-sm text-happ-muted">
              {waiting ? (
                <span>Ожидаем звонок... {formatTimer(secondsLeft)}</span>
              ) : (
                <span>Время ожидания истекло</span>
              )}
            </div>

            {!waiting && (
              <Button type="button" onClick={onRetry} className="w-full text-sm">
                Попробовать снова
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function WhatsAppFlow({
  config,
  code,
  isLoading,
  onBack,
  onCodeChange,
  onVerify,
  triggerGoogle,
  onSelectEmail,
}) {
  const ttlMin = Math.max(1, Math.round((config.code_ttl_seconds || 180) / 60));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-happ-muted hover:text-happ-ink text-sm mb-6 mx-auto"
      >
        <ArrowLeft className="w-4 h-4" />
        Другой способ входа
      </button>

      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-happ-ink mb-2">Личный кабинет</h1>
        <p className="text-happ-muted text-sm">Вход через WhatsApp</p>
      </div>

      <div className="card-dark">
        <form onSubmit={onVerify} className="space-y-4">
          <div className="text-center mb-2">
            <div className="w-14 h-14 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-happ-ink mb-1">Получите код в WhatsApp</h2>
            <p className="text-happ-muted text-sm">
              Откройте чат с ботом и отправьте любое сообщение — придёт 6-значный код. Введите его ниже.
            </p>
          </div>

          <a
            href={config.bot_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-[#25D366]/50 bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all text-sm font-medium text-white"
          >
            Открыть WhatsApp
          </a>

          <p className="text-center text-xs text-happ-faint">Код действует {ttlMin} мин.</p>

          <input
            type="text"
            inputMode="numeric"
            required
            value={code}
            onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-4 rounded-xl bg-happ-gray border border-black/[0.07] text-happ-ink text-center text-2xl tracking-widest focus:border-zoomer-neon focus:outline-none"
            placeholder="000000"
            maxLength={6}
            autoFocus
          />

          <Button type="submit" disabled={isLoading || code.length !== 6} className="w-full text-sm">
            {isLoading ? 'Проверяем...' : 'Войти →'}
          </Button>

          <OrDivider />
          <AlternateMethods triggerGoogle={triggerGoogle} onSelectEmail={onSelectEmail} />
        </form>
      </div>
    </motion.div>
  );
}

/** E.164 for tel: — API may return digits without leading + */
function phoneToTelUri(phone) {
  if (!phone) return '';
  const raw = String(phone).trim();
  const withPlus = raw.replace(/[^\d+]/g, '');
  if (withPlus.startsWith('+')) return withPlus;
  const digits = withPlus.replace(/\D/g, '');
  return digits ? `+${digits}` : '';
}

function formatPhoneInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  let normalized = digits;
  if (normalized.startsWith('8')) normalized = `7${normalized.slice(1)}`;
  if (!normalized.startsWith('7')) normalized = `7${normalized}`;
  const rest = normalized.slice(1);
  let out = '+7';
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += `) ${rest.slice(3, 6)}`;
  if (rest.length >= 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length >= 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-black/10" />
      <span className="text-happ-faint text-xs shrink-0">или</span>
      <div className="flex-1 h-px bg-black/10" />
    </div>
  );
}

function AlternateMethods({ triggerGoogle, compact = false, onSelectPhone, onSelectEmail }) {
  return (
    <div className={`flex flex-col gap-3 w-full ${compact ? 'pt-1' : ''}`}>
      {onSelectEmail && (
        <button type="button" onClick={onSelectEmail} className="auth-alt-btn">
          <Mail className="w-5 h-5 shrink-0 text-happ-blue" aria-hidden />
          <span>Продолжить с почтой</span>
        </button>
      )}
      {onSelectPhone && (
        <button type="button" onClick={onSelectPhone} className="auth-alt-btn">
          <Phone className="w-5 h-5 shrink-0 text-happ-blue" aria-hidden />
          <span>Продолжить с телефоном</span>
        </button>
      )}
      <button type="button" onClick={triggerGoogle} className="auth-alt-btn">
        <GoogleIcon />
        <span>Продолжить с Google</span>
      </button>
      <a
        href={buildTelegramBotUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="auth-alt-btn"
      >
        <TelegramIcon />
        <span>Telegram</span>
      </a>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#229ED9" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

