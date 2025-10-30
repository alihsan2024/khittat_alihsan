import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'yellow'
  size?: 'small' | 'medium' | 'large'
  rounded?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  className,
  ...props
}) => {
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  }

  const baseStyles =
    'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantStyles = {
    primary:
      'bg-primary-300 text-white hover:bg-primary-400 focus:ring-primary-300',
    secondary:
      'bg-white text-primary-300 border border-primary-300 hover:bg-primary-100 focus:ring-primary-300',
    yellow: 'bg-mainYellow text-black hover:bg-yellow-500 focus:ring-yellow-400'
  }

  return (
    <button
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
    </button>
  )
}

export default Button
