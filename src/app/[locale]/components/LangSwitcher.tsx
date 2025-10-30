'use client'
import { capitalize } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'
import { FiGlobe } from 'react-icons/fi'
import Button from './Button'

interface LangSwitcherProps {
  locale?: string
}

const LangSwitcher: React.FC<LangSwitcherProps> = ({ locale = 'en' }) => {
  interface Option {
    country: string
    code: string
  }
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()
  const { theme } = useTheme()

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false)
  const isRTL = locale === 'ar'
  const isDark = theme === 'dark' || theme === 'discord' || theme === 'netflix'
  const options: Option[] = [
    { country: 'English', code: 'en' },
    { country: 'العربية', code: 'ar' }
  ]

  const buttonClasses = `inline-flex items-center gap-2 transition-colors ${
    isDark
      ? 'border border-gray-700 bg-gray-800 text-white hover:bg-gray-700'
      : 'border border-primary-500 bg-white text-primary-500 hover:bg-primary-50'
  }`

  return (
    <div className='relative'>
      <Button
        className={buttonClasses}
        size='small'
        onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
        onBlur={() => setIsOptionsExpanded(false)}
      >
        <FiGlobe className='h-4 w-4' />
      </Button>
      {isOptionsExpanded && (
        <div
          className={`absolute ${isRTL ? 'left-0' : 'right-0'} z-50 mt-2 w-28 origin-top-right rounded-md shadow-lg ring-1 transition-colors ${
            isDark
              ? 'border border-gray-700 bg-gray-800 ring-gray-700'
              : 'bg-white ring-black ring-opacity-5'
          }`}
        >
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {options.map(lang => {
              const isSelected =
                pathname === `/${lang.code}` ||
                pathname.startsWith(`/${lang.code}/`)
              return (
                <Link
                  key={lang.code}
                  href={`/${lang.code}/${urlSegments.join('/')}`}
                >
                  <button
                    lang={lang.code}
                    onMouseDown={e => {
                      e.preventDefault()
                    }}
                    className={`block w-full px-4 py-2 text-sm transition-colors ${isRTL ? 'text-right' : 'text-left'} ${
                      isDark
                        ? isSelected
                          ? 'bg-primary-900 font-medium text-primary-300'
                          : 'text-gray-300 hover:bg-gray-700'
                        : isSelected
                          ? 'bg-primary-100 font-medium text-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {capitalize(lang.country)}
                  </button>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LangSwitcher
