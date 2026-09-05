/**
 * Site-wide maintenance gate.
 *
 * Turn it on with `MAINTENANCE_MODE=true`. Every public request is then
 * rewritten to the branded maintenance page. Set `MAINTENANCE_BYPASS_TOKEN`
 * to keep a way in for yourself: visiting any page with `?preview=<token>`
 * drops a cookie that unlocks the real site for that browser.
 */

export const MAINTENANCE_BYPASS_COOKIE = 'khittat_maintenance_bypass'
export const MAINTENANCE_HEADER = 'x-maintenance'
export const MAINTENANCE_PREVIEW_PARAM = 'preview'
export const MAINTENANCE_PATH = 'maintenance'

/**
 * Header next-intl reads to resolve the locale. The gate rewrites before the
 * next-intl middleware runs, so it has to set this itself.
 */
export const NEXT_INTL_LOCALE_HEADER = 'X-NEXT-INTL-LOCALE'

// A week — long enough to survive a deploy, short enough to expire on its own.
export const MAINTENANCE_BYPASS_MAX_AGE = 60 * 60 * 24 * 7

export const isMaintenanceEnabled = (): boolean =>
  process.env.MAINTENANCE_MODE === 'true'

export const maintenanceBypassToken = (): string =>
  process.env.MAINTENANCE_BYPASS_TOKEN ?? ''

/**
 * Paths that stay reachable while the gate is on: the admin area (it sits
 * behind its own login) plus everything Next.js needs to serve the page.
 */
const EXEMPT_PREFIXES = [
  '/admin',
  '/en/admin',
  '/ar/admin',
  '/api',
  '/_next',
  '/_vercel'
]

export const isExemptPath = (pathname: string): boolean =>
  EXEMPT_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
