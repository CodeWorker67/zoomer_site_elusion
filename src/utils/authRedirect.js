import { ROUTES } from './constants';

/** После входа — раздел «Купить»; старый /onboarding больше не используется. */
export function navigateAfterAuth(navigate, redirectPath) {
  if (redirectPath && redirectPath !== ROUTES.ONBOARDING) {
    navigate(redirectPath, { replace: true });
    return;
  }
  navigate(ROUTES.DASHBOARD, { state: { tab: 'buy' }, replace: true });
}
