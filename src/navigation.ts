'use client'
import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation'
import { locales } from './i18n'

export const localePrefix = 'always'

export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/projects': '/projects',
  '/projects/[slug]': '/projects/[slug]',
  '/contact': '/contact',
  '/faq': '/faq',
  '/admin': '/admin',
  '/admin/login': '/admin/login',
  '/checkout': '/checkout',
  '/thank-you': '/thank-you'
} satisfies Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames })
