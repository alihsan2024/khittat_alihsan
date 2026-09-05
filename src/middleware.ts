import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from './i18n'
import {
  MAINTENANCE_BYPASS_COOKIE,
  MAINTENANCE_BYPASS_MAX_AGE,
  MAINTENANCE_HEADER,
  MAINTENANCE_PATH,
  MAINTENANCE_PREVIEW_PARAM,
  NEXT_INTL_LOCALE_HEADER,
  isExemptPath,
  isMaintenanceEnabled,
  maintenanceBypassToken
} from './maintenance'
import { localePrefix } from './navigation'
type CustomMiddleware = (req: NextRequest) => Promise<NextRequest>
const customMiddleware: CustomMiddleware = async req => {
  console.log('Custom middleware executed before next-intl')
  return req
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix
})

/** Best guess at the visitor's language, so the gate speaks their locale. */
function resolveLocale(req: NextRequest): string {
  const fromPath = req.nextUrl.pathname.split('/')[1]
  if (locales.includes(fromPath)) return fromPath

  const fromCookie = req.cookies.get('NEXT_LOCALE')?.value
  if (fromCookie && locales.includes(fromCookie)) return fromCookie

  const fromHeader = req.headers.get('accept-language')?.toLowerCase() ?? ''
  return fromHeader.startsWith('ar') ? 'ar' : 'en'
}

/**
 * Returns a response when the request should be gated, or `null` to let the
 * request continue to the real site.
 */
function maintenanceGate(req: NextRequest): NextResponse | null {
  if (!isMaintenanceEnabled()) return null

  const { pathname, searchParams } = req.nextUrl
  if (isExemptPath(pathname)) return null

  const token = maintenanceBypassToken()

  // `?preview=<token>` unlocks the site for this browser.
  if (token && searchParams.get(MAINTENANCE_PREVIEW_PARAM) === token) {
    const cleanUrl = req.nextUrl.clone()
    cleanUrl.searchParams.delete(MAINTENANCE_PREVIEW_PARAM)
    const res = NextResponse.redirect(cleanUrl)
    res.cookies.set(MAINTENANCE_BYPASS_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: MAINTENANCE_BYPASS_MAX_AGE
    })
    return res
  }

  if (token && req.cookies.get(MAINTENANCE_BYPASS_COOKIE)?.value === token) {
    return null
  }

  const locale = resolveLocale(req)
  const url = req.nextUrl.clone()
  url.pathname = `/${locale}/${MAINTENANCE_PATH}`
  url.search = ''

  const headers = new Headers(req.headers)
  // Flags the request so the layout can drop the header/footer chrome.
  headers.set(MAINTENANCE_HEADER, '1')
  headers.set(NEXT_INTL_LOCALE_HEADER, locale)

  const res = NextResponse.rewrite(url, { request: { headers } })
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  res.headers.set('Cache-Control', 'no-store, must-revalidate')
  res.headers.set('Retry-After', '3600')
  return res
}

export default async function middleware(
  req: NextRequest
): Promise<ReturnType<typeof intlMiddleware>> {
  await customMiddleware(req)
  return maintenanceGate(req) ?? intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
