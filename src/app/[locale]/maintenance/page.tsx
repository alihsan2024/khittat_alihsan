import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'We are improving your experience',
  robots: {
    index: false,
    follow: false
  }
}

const CONTACT_EMAIL = 'info@khittatalihsan.org.lb'

export default async function MaintenancePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('')
  const year = new Date().getFullYear()

  return (
    <section className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 px-4 py-16'>
      {/* Soft brand glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-200/20 blur-3xl'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-mainYellow/10 blur-3xl'
      />

      <div className='relative w-full max-w-2xl rounded-3xl bg-white/95 p-8 text-center shadow-2xl ring-1 ring-white/50 backdrop-blur sm:p-12'>
        {/* Logo */}
        <div className='mx-auto mb-8 w-fit rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-100'>
          <Image
            src='/logo_black.png'
            alt='Khittat Al Ihsan Charitable Organization'
            width={120}
            height={120}
            priority
            className='h-auto w-24 object-contain sm:w-28'
          />
        </div>

        {/* Status pill */}
        <span className='inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-300'>
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-300 opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-primary-300' />
          </span>
          {t('Maintenance_Badge')}
        </span>

        <h1 className='mt-5 text-3xl font-black leading-tight text-primary-500 sm:text-4xl'>
          {t('Maintenance_Title')}
        </h1>

        <p className='mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600'>
          {t('Maintenance_Message')}
        </p>

        {/* Indeterminate progress */}
        <div
          aria-hidden
          className='mx-auto mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-primary-100'
        >
          <div className='animate-maintenance-sweep h-full w-1/3 rounded-full bg-gradient-to-r from-primary-300 to-primary' />
        </div>

        {/* Contact */}
        <div className='mt-10 border-t border-gray-100 pt-8'>
          <h2 className='text-sm font-bold uppercase tracking-wide text-gray-500'>
            {t('Maintenance_Contact_Title')}
          </h2>
          <div className='mt-4 flex flex-wrap items-center justify-center gap-3'>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className='inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-400 transition-colors hover:bg-primary-200'
            >
              <FiMail className='h-4 w-4 shrink-0' />
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${t('Phone_Value').replace(/\s/g, '')}`}
              dir='ltr'
              className='inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-400 transition-colors hover:bg-primary-200'
            >
              <FiPhone className='h-4 w-4 shrink-0' />
              {t('Phone_Value')}
            </a>
          </div>
          <p className='mt-4 inline-flex items-center gap-2 text-sm text-gray-500'>
            <FiMapPin className='h-4 w-4 shrink-0' />
            {t('Footer_Office_Address')}
          </p>
        </div>

        {/* Language — full page loads, so `lang`/`dir` on <html> are re-rendered */}
        {/* eslint-disable @next/next/no-html-link-for-pages */}
        <div className='mt-8 flex items-center justify-center gap-2 text-sm'>
          <a
            href='/en'
            className={`rounded-full px-3 py-1 transition-colors ${
              locale === 'en'
                ? 'bg-primary-500 font-semibold text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            English
          </a>
          <a
            href='/ar'
            className={`rounded-full px-3 py-1 transition-colors ${
              locale === 'ar'
                ? 'bg-primary-500 font-semibold text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            العربية
          </a>
        </div>
        {/* eslint-enable @next/next/no-html-link-for-pages */}

        <p className='mt-8 text-xs text-gray-400'>
          © {year} {t('Footer_Copyright')}
        </p>
      </div>
    </section>
  )
}
