import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Run next-intl middleware first
  const response = intlMiddleware(request);

  // Add pathname for metadata usage (mainly for canonical)
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ar|ru|zh|de)/:path*']
};
