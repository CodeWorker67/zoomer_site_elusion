import { useEffect, useState } from 'react';
import { RouteMeta } from '@components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound, Loader2 } from 'lucide-react';
import { userApi } from '@services/api';
import useAuthStore from '@stores/authStore';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';
import { BRAND_META, ROUTES } from '@utils/constants';

export default function SettingsPage() {
  const { user, loadFromStorage } = useAuthStore();
  const [hasPassword, setHasPassword] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  useEffect(() => {
    userApi.passwordStatus()
      .then(({ data }) => setHasPassword(data.has_password))
      .catch(() => setHasPassword(false))
      .finally(() => setLoading(false));
  }, []);

  const resetForms = () => {
    setPassword('');
    setPasswordConfirm('');
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    try {
      await userApi.setPassword({ password, password_confirm: passwordConfirm });
      setHasPassword(true);
      resetForms();
      setSavedMsg('Пароль сохранён. Теперь можно входить по нему.');
      toast.success('Пароль установлен');
      await loadFromStorage();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Не удалось сохранить пароль');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    try {
      await userApi.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        password_confirm: newPasswordConfirm,
      });
      resetForms();
      setSavedMsg('Пароль сохранён. Теперь можно входить по нему.');
      toast.success('Пароль изменён');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Не удалось сменить пароль');
    } finally {
      setSaving(false);
    }
  };

  const handleRemovePassword = async () => {
    if (!currentPassword) {
      toast.error('Введите текущий пароль');
      return;
    }
    setSaving(true);
    setSavedMsg('');
    try {
      await userApi.removePassword({ current_password: currentPassword });
      setHasPassword(false);
      resetForms();
      toast.success('Вход по паролю отключён');
      await loadFromStorage();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Не удалось удалить пароль');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <RouteMeta path={ROUTES.SETTINGS} />
      <section className="py-12 sm:py-16 min-h-[calc(100vh-4rem)]">
        <div className="max-w-lg mx-auto px-4">
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center gap-1.5 text-happ-muted hover:text-happ-ink text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Link>

          <h1 className="text-2xl font-bold text-happ-ink mb-8">Настройки</h1>

          {loading ? (
            <div className="card-dark flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-zoomer-neon animate-spin" />
            </div>
          ) : (
            <div className="card-dark">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-zoomer-neon shrink-0" />
                  <h2 className="text-lg font-bold text-white">Вход по паролю</h2>
                </div>
                {hasPassword && (
                  <span className="text-xs text-zoomer-neon font-medium shrink-0">✓ включён</span>
                )}
              </div>

              {hasPassword ? (
                <>
                  <p className="text-happ-muted text-sm mb-6">
                    Вы входите по паролю. Вход по коду из письма продолжает работать — на случай,
                    если пароль забудется.
                  </p>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <PasswordField
                      label="Текущий пароль"
                      value={currentPassword}
                      onChange={setCurrentPassword}
                      placeholder="Текущий пароль"
                    />
                    <PasswordField
                      label="Новый пароль"
                      value={newPassword}
                      onChange={setNewPassword}
                      placeholder="Новый пароль (от 4 символов)"
                    />
                    <PasswordField
                      label="Повторите"
                      value={newPasswordConfirm}
                      onChange={setNewPasswordConfirm}
                      placeholder="Повторите"
                    />
                    {savedMsg && (
                      <p className="text-sm text-zoomer-neon">{savedMsg}</p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={saving}
                        className={`flex-1 text-sm ${saving ? 'opacity-50' : ''}`}
                      >
                        {saving ? 'Сохраняем...' : 'Сменить пароль'}
                      </Button>
                      <button
                        type="button"
                        onClick={handleRemovePassword}
                        disabled={saving}
                        className="text-sm text-happ-muted hover:text-red-400 transition-colors px-4 py-2"
                      >
                        Убрать
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <p className="text-happ-muted text-sm mb-6">
                    Задайте пароль от 4 символов — вход станет быстрее и не будет зависеть
                    от доставки письма.
                  </p>
                  <form onSubmit={handleSetPassword} className="space-y-4">
                    <PasswordField
                      label="Пароль (от 4 символов)"
                      value={password}
                      onChange={setPassword}
                      placeholder="Пароль (от 4 символов)"
                    />
                    <PasswordField
                      label="Повторите"
                      value={passwordConfirm}
                      onChange={setPasswordConfirm}
                      placeholder="Повторите"
                    />
                    <Button
                      type="submit"
                      disabled={saving || password.length < 4}
                      className={`w-full text-sm ${saving ? 'opacity-50' : ''}`}
                    >
                      {saving ? 'Сохраняем...' : 'Установить пароль'}
                    </Button>
                  </form>
                </>
              )}

              {user?.email && (
                <p className="text-happ-faint text-xs mt-6 pt-4 border-t border-zoomer-border">
                  Аккаунт: {user.email}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PasswordField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm text-happ-muted mb-1.5">{label}</label>
      <input
        type="password"
        required
        minLength={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-happ-gray border border-black/[0.07] text-happ-ink text-sm focus:border-zoomer-neon focus:outline-none"
        placeholder={placeholder}
        autoComplete={label.includes('Текущ') ? 'current-password' : 'new-password'}
      />
    </div>
  );
}
