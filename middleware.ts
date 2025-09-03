import { NextRequest, NextResponse } from 'next/server'
import { TOKEN_PATH } from './constants/tokens'
import { AUTH_ROUTES, HOME_ROUTE, LOGIN_ROUTE } from './constants/mainRoutes'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (/\.(jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|otf)$/.test(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get(TOKEN_PATH)?.value
  const signInUrl = new URL(LOGIN_ROUTE, request.url)
  const homeUrl = new URL(HOME_ROUTE, request.url)

  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  if (!token) {
    if (!isAuthRoute) {
      return NextResponse.redirect(signInUrl)
    }
  } else if (token) {
    if (isAuthRoute) {
      return NextResponse.redirect(homeUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
