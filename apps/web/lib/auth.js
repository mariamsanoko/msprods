export const SESSION_COOKIE_NAME = 'msprods_session';

export function isAuthenticated(session) {
  return Boolean(session?.user?.id && session?.accessToken);
}

export function getDashboardRedirect(session) {
  return isAuthenticated(session) ? '/dashboard' : '/login';
}
