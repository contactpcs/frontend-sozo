import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Protected Routes Configuration
 */
const PROTECTED_ROUTES = [
  '/dashboard',
  '/doctor',
  '/patient',
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
  
  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Get auth token from cookie
  const authToken = request.cookies.get('sozo_auth_token')?.value;
  const isAuthenticated = !!authToken;

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    // Only add redirect param for specific dashboard routes
    if (pathname !== '/dashboard') {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing auth routes while authenticated
  if (isAuthRoute && isAuthenticated) {
    // For authenticated users accessing auth routes, redirect to their role-specific dashboard
    // Note: We can't easily get user role in middleware, so redirect to a generic route that will handle role-based routing
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Handle root route redirect for authenticated users
  if (pathname === '/' && isAuthenticated) {
    // The main page.tsx will handle role-based redirection
    return NextResponse.next();
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
