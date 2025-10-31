import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert AUD to USD
 * Conversion rate: 1 AUD = 0.65 USD
 * Rounds up to nearest dollar
 */
export function audToUsd(aud: number): number {
  return Math.ceil(aud * 0.65)
}
