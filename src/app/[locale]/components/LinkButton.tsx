'use client'

import React from 'react'
import { Link } from '@/src/navigation'
import { cn } from '@/lib/utils'

type LinkHref =
  | string
  | {
      pathname: string
      params?: Record<string, string>
      query?: Record<string, string | number | boolean>
    }

interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'yellow'
  size?: 'small' | 'medium' | 'large'
  rounded?: boolean
  href: LinkHref
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  className,
  href,
  ...props
}) => {
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  }

  const baseStyles =
    'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 inline-block'

  const variantStyles = {
    primary:
      'bg-primary-300 text-white hover:bg-primary-400 focus:ring-primary-300',
    secondary:
      'bg-white text-primary-300 border border-primary-300 hover:bg-primary-100 focus:ring-primary-300',
    yellow: 'bg-mainYellow text-black hover:bg-yellow-500 focus:ring-yellow-400'
  }

  return (
    <Link
      href={href as any}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        rounded && 'rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export default LinkButton
