import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Paths that don't require authentication
const publicPaths = ['/auth/login', '/auth/signup'];

// Paths that require specific roles
const roleBasedPaths = {
  '/admin': ['ADMIN'],
  '/books/add': ['ADMIN', 'LIBRARIAN'],
  '/books/edit': ['ADMIN', 'LIBRARIAN'],
  '/manage/books': ['ADMIN', 'LIBRARIAN'],
  '/manage/users': ['ADMIN'],
  '/my-books': ['USER', 'LIBRARIAN', 'ADMIN'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get('token')?.value;

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // Verify token
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );


    // Get user role from token
    const userRole = verified.payload.role as string;

    // Check role-based access
    for (const [path, roles] of Object.entries(roleBasedPaths)) {
      if (pathname.startsWith(path)) {
        if (!roles.includes(userRole)) {
          console.log('Middleware: Access denied, redirecting to home.');
          return NextResponse.redirect(new URL('/home', request.url));
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware: Token verification failed, redirecting to login.', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
