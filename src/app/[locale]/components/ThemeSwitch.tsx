'use client'
import { capitalize } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { FiSun } from 'react-icons/fi'
import { useOnClickOutside } from 'usehooks-ts'
import Button from './Button'

interface ThemeSwitchProps {
  locale?: string
}

export default function ThemeSwitch({ locale = 'en' }: ThemeSwitchProps) {
  const t = useTranslations('')
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // New state to control dropdown visibility
  const { setTheme, resolvedTheme, themes, theme } = useTheme()
  const ref = useRef(null)
  const isRTL = locale === 'ar'
  const isDark = theme === 'dark' || theme === 'discord' || theme === 'netflix'
  useEffect(() => setMounted(true), [])
  useOnClickOutside(ref, () => setIsOpen(false))

  const buttonClasses = `inline-flex items-center gap-2 transition-colors ${
    isDark
      ? 'border border-gray-700 bg-gray-800 text-white hover:bg-gray-700'
      : 'border border-primary-500 bg-white text-primary-500 hover:bg-primary-50'
  }`

  if (!mounted)
    return (
      <Button
        size='small'
        type='button'
        className={buttonClasses}
        id='options-menu'
        aria-expanded={isOpen}
        onClick={() => {}}
      >
        <FiSun className='h-4 w-4' />
      </Button>
    )

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div ref={ref} className='relative inline-block text-left'>
      <Button
        size='small'
        type='button'
        className={buttonClasses}
        id='options-menu'
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <FiSun className='h-4 w-4' />
      </Button>
      {isOpen && (
        <div
          className={`absolute ${isRTL ? 'left-0' : 'right-0'} z-50 mt-2 w-36 rounded-md shadow-lg ring-1 transition-colors ${
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
            {themes.map(themeItem => {
              const isSelected = themeItem === theme
              return (
                <button
                  key={themeItem}
                  onClick={() => {
                    setTheme(themeItem)
                    setIsOpen(false)
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                    isDark
                      ? isSelected
                        ? 'bg-primary-900 font-medium text-primary-300'
                        : 'text-gray-300 hover:bg-gray-700'
                      : isSelected
                        ? 'bg-primary-100 font-medium text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {capitalize(themeItem)}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
