'use client'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { FiMail, FiMapPin, FiClock } from 'react-icons/fi'

export const Footer = () => {
  const t = useTranslations('')
  const { theme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <footer
      className={`relative overflow-hidden border-t py-12 transition-colors ${
        isDark
          ? 'border-gray-800 bg-gray-900 text-white'
          : 'border-gray-200 bg-white text-gray-900'
      }`}
    >
      {/* Gradient Pattern Overlay */}
      <div
        className={`absolute inset-0 opacity-5 ${
          isDark
            ? 'bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600'
            : 'bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300'
        }`}
      />
      <div className='relative'>
        <div className='relative mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8'>
          <div className='grid gap-8 lg:grid-cols-12'>
            {/* Logo and About */}
            <div className='lg:col-span-4'>
              <Link href='/' className='mb-6 inline-block'>
                <div
                  className={`rounded-xl p-4 shadow-lg transition-colors ${
                    isDark ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
                >
                  <Image
                    src='/logo_black.png'
                    alt='Logo'
                    width={100}
                    height={100}
                    className='object-contain'
                  />
                </div>
              </Link>
              <h3
                className={`mb-3 text-xl font-bold ${
                  isDark ? 'text-white' : 'text-primary-500'
                }`}
              >
                {t('About')}
              </h3>
              <p
                className={`mb-2 text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {t('Registered_Name')}: Khitat Al-Ihsan Charity Social
                Association
              </p>
              <p
                className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {t('NGO_Registration_Number')}: 50
              </p>
            </div>

            {/* Quick Links */}
            <div className='lg:col-span-2'>
              <h3
                className={`mb-4 text-lg font-bold uppercase tracking-wide ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Quick Links
              </h3>
              <ul className='space-y-3'>
                <li>
                  <Link
                    href='/'
                    className='inline-block text-sm transition-all hover:translate-x-1 hover:font-semibold'
                  >
                    {t('Home')}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    className='inline-block text-sm transition-all hover:translate-x-1 hover:font-semibold'
                  >
                    {t('About')}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/projects'
                    className='inline-block text-sm transition-all hover:translate-x-1 hover:font-semibold'
                  >
                    {t('Projects')}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/faq'
                    className='inline-block text-sm transition-all hover:translate-x-1 hover:font-semibold'
                  >
                    {t('FAQ')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className='lg:col-span-3'>
              <h3
                className={`mb-4 text-lg font-bold uppercase tracking-wide ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t('Contact')}
              </h3>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div
                    className={`rounded-lg p-2 transition-colors ${
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <FiMapPin
                      className={`h-5 w-5 ${
                        isDark ? 'text-primary-400' : 'text-primary-500'
                      }`}
                    />
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {t('Footer_Office_Address')}
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <div
                    className={`rounded-lg p-2 transition-colors ${
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <FiClock
                      className={`h-5 w-5 ${
                        isDark ? 'text-primary-400' : 'text-primary-500'
                      }`}
                    />
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {t('Footer_Hours')}
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <div
                    className={`rounded-lg p-2 transition-colors ${
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <FiMail
                      className={`h-5 w-5 ${
                        isDark ? 'text-primary-400' : 'text-primary-500'
                      }`}
                    />
                  </div>
                  <a
                    href='mailto:khitattalihsan@gmail.com'
                    className={`text-sm underline-offset-2 transition-all hover:underline ${
                      isDark
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-700 hover:text-primary-500'
                    }`}
                  >
                    khitattalihsan@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className='lg:col-span-3'>
              <h3
                className={`mb-4 text-lg font-bold uppercase tracking-wide ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t('Vision')}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {t('Vision_Description')}
              </p>
            </div>
          </div>

          <div
            className={`mt-12 border-t pt-8 ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            }`}
          >
            <p
              className={`text-center text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              © {new Date().getFullYear()} {t('Footer_Copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
