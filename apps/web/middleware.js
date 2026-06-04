import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('msprods_token')?.value;
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login?next=/dashboard', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
