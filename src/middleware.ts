import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

// Define protected routes
const protectedRoutes = [
  '/account',
  '/admin',
];

// Define admin-only routes
const adminRoutes = [
  '/admin',
];

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/blog',
  '/shop',
  '/about',
  '/contact',
  '/legal',
  '/auth',
  '/api/auth',
  '/api/search',
  '/api/sitemap',
  '/api/robots',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and API routes (except protected ones)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    (pathname.startsWith('/api') && !pathname.startsWith('/api/auth'))
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if route is admin-only
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Get token from cookies
  const token = request.cookies.get('access_token')?.value;

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing admin route, verify admin permissions
  if (isAdminRoute && token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const groups = payload['cognito:groups'] as string[] || [];
      
      if (!groups.includes('admin') && !groups.includes('superadmin')) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch (error) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing public route with valid token, allow access
  if (isPublicRoute && token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      // Token is valid, allow access
    } catch (error) {
      // Invalid token, clear cookies and continue
      const response = NextResponse.next();
      response.cookies.delete('access_token');
      response.cookies.delete('id_token');
      response.cookies.delete('refresh_token');
      response.cookies.delete('expires_at');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
