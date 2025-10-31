'use client'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import Button from './Button'
import LinkButton from './LinkButton'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './ThemeSwitch'
import CartSidebar from './CartSidebar'

interface Props {
  locale: string
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const isDark = theme === 'dark' || theme === 'discord' || theme === 'netflix'

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === `/${locale}` || pathname === '/'
    }
    return pathname?.includes(path)
  }

  if (!mounted) {
    return null
  }

  return (
    <header
      className={`sticky top-0 z-50 shadow-sm transition-colors ${
        isDark
          ? 'border-b border-gray-800 bg-gray-900'
          : 'border-b border-gray-200 bg-white'
      }`}
    >
      <div className='mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3 md:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='flex items-center'>
          <Image
            src='/logo_black.png'
            alt='Logo'
            width={100}
            height={100}
            className='object-contain'
          />
        </Link>

        {/* Mobile Right Side: Cart + Menu Button */}
        <div className='flex items-center gap-3 md:hidden'>
          <CartSidebar isArabic={locale === 'ar'} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
            aria-label='Toggle menu'
          >
            {mobileMenuOpen ? (
              <FiX
                className={`h-6 w-6 transition-colors ${
                  isDark ? 'text-white' : 'text-gray-700'
                }`}
              />
            ) : (
              <FiMenu
                className={`h-6 w-6 transition-colors ${
                  isDark ? 'text-white' : 'text-gray-700'
                }`}
              />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden items-center gap-2 md:flex'>
          <Link
            href='/'
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/')
                ? 'dark:bg-primary-900 bg-primary-100 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {t('Home')}
          </Link>
          <Link
            href='/about'
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/about')
                ? 'dark:bg-primary-900 bg-primary-100 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {t('About')}
          </Link>
          <Link
            href='/projects'
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/projects')
                ? 'dark:bg-primary-900 bg-primary-100 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {t('Projects')}
          </Link>
          <Link
            href='/contact'
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/contact')
                ? 'dark:bg-primary-900 bg-primary-100 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {t('Contact')}
          </Link>
          <Link
            href='/faq'
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/faq')
                ? 'dark:bg-primary-900 bg-primary-100 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {t('FAQ')}
          </Link>
        </nav>

        {/* Desktop Right side buttons */}
        <div className='hidden items-center gap-2 md:flex'>
          <LinkButton href='/projects' variant='yellow' size='small'>
            {t('Donate')}
          </LinkButton>
          <CartSidebar isArabic={locale === 'ar'} />
          <ThemeSwitch locale={locale} />
          <LangSwitcher locale={locale} />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className='fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden'
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l shadow-2xl transition-transform md:hidden ${
              isDark
                ? 'border-gray-800 bg-gray-900'
                : 'border-gray-200 bg-white'
            } ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className='flex h-full flex-col'>
              {/* Menu Header */}
              <div className='flex items-center justify-between border-b px-6 py-4'>
                <h2 className='text-lg font-bold text-gray-900 dark:text-white'>
                  {t('Menu')}
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className='rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                  aria-label='Close menu'
                >
                  <FiX className='h-5 w-5' />
                </button>
              </div>

              {/* Menu Items */}
              <nav className='flex-1 overflow-y-auto px-4 py-6'>
                <div className='space-y-1'>
                  <Link
                    href='/'
                    className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isActive('/')
                        ? 'dark:bg-primary-900/30 bg-primary-100 text-primary-600 shadow-sm dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('Home')}
                  </Link>
                  <Link
                    href='/about'
                    className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isActive('/about')
                        ? 'dark:bg-primary-900/30 bg-primary-100 text-primary-600 shadow-sm dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('About')}
                  </Link>
                  <Link
                    href='/projects'
                    className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isActive('/projects')
                        ? 'dark:bg-primary-900/30 bg-primary-100 text-primary-600 shadow-sm dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('Projects')}
                  </Link>
                  <Link
                    href='/contact'
                    className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isActive('/contact')
                        ? 'dark:bg-primary-900/30 bg-primary-100 text-primary-600 shadow-sm dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('Contact')}
                  </Link>
                  <Link
                    href='/faq'
                    className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isActive('/faq')
                        ? 'dark:bg-primary-900/30 bg-primary-100 text-primary-600 shadow-sm dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('FAQ')}
                  </Link>
                </div>

                {/* Settings Section */}
                <div className='mt-8 border-t pt-6 dark:border-gray-800'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                        {t('Theme')}
                      </span>
                      <ThemeSwitch locale={locale} />
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                        {t('Language')}
                      </span>
                      <LangSwitcher locale={locale} />
                    </div>
                  </div>
                </div>
              </nav>

              {/* Bottom Button */}
              <div className='border-t px-4 py-4 dark:border-gray-800'>
                <LinkButton
                  href='/projects'
                  variant='yellow'
                  size='large'
                  className='w-full text-base font-semibold'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('Donate')}
                </LinkButton>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
