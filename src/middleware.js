import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const allow =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/age/verify') ||
    pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|css|js|mp4|webm)$/);

  if (allow) return NextResponse.next();
  // If you want a hard redirect when not verified, implement here.
  return NextResponse.next();
}

export const config = { matcher: '/:path*' };
