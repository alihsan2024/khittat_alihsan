import { ThemeProvider } from '@/src/app/[locale]/components/ThemeProvider'
import { ReduxProvider } from '@/src/app/[locale]/components/ReduxProvider'
import { CartProvider } from '@/src/app/[locale]/components/CartContext'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import NextTopLoader from 'nextjs-toploader'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import './globals.css'

const avenir = localFont({
  src: [
    {
      path: '../../../public/fonts/Avenir Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../public/fonts/Avenir Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../../public/fonts/Avenir Heavy.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../../public/fonts/Avenir Black.ttf',
      weight: '900',
      style: 'normal'
    }
  ],
  variable: '--font-avenir',
  display: 'swap'
})
export const metadata: Metadata = {
  title: {
    template: '%s | Khitat Al-Ihsan Charity',
    default: 'Khitat Al-Ihsan Charity Social Association'
  },
  description:
    'Founded in 2018 in Tripoli, Lebanon. A charity serving with dignity, compassion, and integrity. Standing with those in need.',
  keywords: [
    'charity',
    'humanitarian aid',
    'NGO',
    'Tripoli Lebanon',
    'Al-Ihsan',
    'relief work',
    'social assistance'
  ],
  authors: [{ name: 'Khitat Al-Ihsan Charity Social Association' }],
  creator: 'Khitat Al-Ihsan Charity Social Association',
  publisher: 'Khitat Al-Ihsan Charity Social Association',
  metadataBase: new URL('https://khittatalihsan.com'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ar: '/ar'
    }
  },
  openGraph: {
    title: 'Khitat Al-Ihsan Charity Social Association',
    description:
      'Founded in 2018 in Tripoli, Lebanon. A charity serving with dignity, compassion, and integrity.',
    url: 'https://khittatalihsan.com',
    siteName: 'Khitat Al-Ihsan Charity',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khitat Al-Ihsan Charity Social Association',
    description:
      'Founded in 2018 in Tripoli, Lebanon. A charity serving with dignity, compassion, and integrity.',
    creator: '@khittatalihsan'
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${avenir.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className='flex min-h-screen flex-col'>
        <ReduxProvider>
          <CartProvider>
            <ThemeProvider
              enableSystem={false}
              attribute='class'
              defaultTheme='light'
              themes={['light', 'dark']}
            >
              <NextIntlClientProvider locale={locale} messages={messages}>
                <NextTopLoader
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  easing='ease'
                  speed={200}
                  shadow='0 0 10px #2299DD,0 0 5px #2299DD'
                  color='var(--primary)'
                  showSpinner={false}
                />
                <Header locale={locale} />
                <main className='mx-auto max-w-screen-2xl flex-1'>
                  {children}
                </main>
                <Footer />
                <Toaster />
              </NextIntlClientProvider>
            </ThemeProvider>
          </CartProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
