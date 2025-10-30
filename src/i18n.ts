import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['en', 'ar']
export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  const locale = await requestLocale

  if (!locale || !locales.includes(locale)) {
    notFound()
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
