import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Protected Routes Configuration
 */
const PROTECTED_ROUTES = [
  '/dashboard',
  '/dashboard/patients',
  '/dashboard/assessments',
  '/dashboard/review',
  '/dashboard/admin',
  '/dashboard/settings',
];

/**
 * Auth Routes (redirect to dashboard if already authenticated)
 */
const AUTH_ROUTES = ['/login', '/register'];

/**
 * Middleware Function
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get auth token from cookie
  const authToken = request.cookies.get('sozo_auth_token')?.value;
  const isAuthenticated = !!authToken;

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing auth routes while authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard/patients', request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

/**
 * Middleware Configuration
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
