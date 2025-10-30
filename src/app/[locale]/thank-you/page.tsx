'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import LinkButton from '../components/LinkButton'
import { useAppDispatch } from '@/lib/store/hooks'
import { clearCart } from '@/lib/store/cartSlice'

export default function ThankYouPage() {
  const t = useTranslations()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Ensure cart is cleared if user lands here directly
    dispatch(clearCart())
  }, [dispatch])

  return (
    <div className='px-4 py-20'>
      <div className='mx-auto max-w-2xl text-center'>
        <h1 className='mb-3 text-3xl font-extrabold text-primary-300'>
          {t('Thank_You') || 'Thank you!'}
        </h1>
        <p className='mb-8 text-gray-700 dark:text-gray-300'>
          {t('Thank_You_Body') ||
            'We have received your submission. Please complete your transfer using the provided code. Our team will verify and reach out with confirmation.'}
        </p>
        <div className='flex items-center justify-center gap-3'>
          <LinkButton href='/' variant='primary' size='medium'>
            {t('Back_Home') || 'Back to Home'}
          </LinkButton>
          <LinkButton href='/projects' variant='secondary' size='medium'>
            {t('View_All_Projects') || 'View Projects'}
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
