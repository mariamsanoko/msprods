const PROTECTED_PREFIX = '/dashboard';

export function middleware(request) {
  const pathname = request?.nextUrl?.pathname || '/';
  const hasSession = Boolean(request?.cookies?.get?.('msprods_session'));

  if (pathname.startsWith(PROTECTED_PREFIX) && !hasSession) {
    return { redirect: '/login' };
  }

  return { next: true };
}

export const config = {
  matcher: ['/dashboard/:path*']
};
