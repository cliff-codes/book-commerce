import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of static files that should not be handled by dynamic routes
const staticFiles = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'site.webmanifest',
  'apple-touch-icon.png',
  'robots.txt',
  'sitemap.xml',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for a static file
  const isStaticFile = staticFiles.some(file => pathname.includes(file));
  
  // If it's a static file, let it pass through to the public directory
  if (isStaticFile) {
    return NextResponse.next();
  }
  
  // For all other requests, continue with normal processing
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
