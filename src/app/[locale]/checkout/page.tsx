'use client'

import { useMemo, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import type { CartItem } from '@/lib/types/cart'
import Button from '../components/Button'
import { supabase } from '@/lib/supabase'
import { clearCart } from '@/lib/store/cartSlice'
import { useRouter } from '@/src/navigation'

type Method = 'western_union' | 'wise'

export default function CheckoutPage() {
  const t = useTranslations()
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const cartItems = useAppSelector(state => state.cart.items)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const totalAmount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.amount, 0),
    [cartItems]
  )

  const [step, setStep] = useState<1 | 2>(1)
  const [method, setMethod] = useState<Method | ''>('')
  const [submitting, setSubmitting] = useState(false)
  const [code] = useState(
    () =>
      `KHC-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`
  )
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const payload = {
        code,
        method,
        items: cartItems as unknown as Record<string, unknown>[],
        total_amount: totalAmount,
        currency: 'USD'
      }
      const { error } = await supabase.from('checkouts').insert(payload)
      if (error) throw error
      dispatch(clearCart())
      router.push('/thank-you')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const wu = {
    title: isArabic ? 'ويسترن يونيون' : 'Western Union',
    rows: [
      {
        k: isArabic ? 'الاسم' : 'Name',
        v: 'Khitat Al-Ihsan Charitable Organization'
      },
      { k: isArabic ? 'البلد' : 'Country', v: 'Lebanon' },
      { k: 'Phone', v: '+961 3 976 426' }
    ]
  }

  const wise = {
    title: 'Wise',
    rows: [
      { k: isArabic ? 'الاسم' : 'Account Name', v: 'Khitat Al-Ihsan Charity' },
      { k: isArabic ? 'العملة' : 'Currency', v: 'USD' },
      {
        k: isArabic ? 'ملاحظة' : 'Note',
        v: isArabic ? 'أدخل رمز التحويل' : 'Include transfer code'
      }
    ]
  }

  return (
    <div className='px-4 py-12'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
          {isArabic ? 'الدفع' : 'Checkout'}
        </h1>

        {/* Cart Summary */}
        <div className='mb-6 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
              {isArabic ? 'إجمالي التبرع' : 'Total Donation'}
            </span>
            <span className='text-xl font-extrabold text-primary-300'>
              ${totalAmount} USD
            </span>
          </div>
        </div>

        {/* Stepper */}
        <div className='mb-6 flex items-center gap-3 text-sm'>
          <div
            className={`flex h-8 items-center rounded-full px-3 ${
              step === 1
                ? 'bg-primary-300/10 text-primary-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            1. {isArabic ? 'اختر الطريقة' : 'Select Method'}
          </div>
          <div
            className={`flex h-8 items-center rounded-full px-3 ${
              step === 2
                ? 'bg-primary-300/10 text-primary-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            2. {isArabic ? 'التأكيد والإرسال' : 'Confirm & Submit'}
          </div>
        </div>

        {step === 1 ? (
          <div className='space-y-4'>
            {/* Method cards */}
            {[wu, wise].map((m, idx) => (
              <details
                key={idx}
                className='group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm dark:border-gray-800 dark:bg-gray-900'
              >
                <summary className='flex cursor-pointer list-none items-center justify-between text-base font-semibold text-gray-900 dark:text-white'>
                  {m.title}
                  <span className='ml-3 text-primary-300 transition-transform group-open:rotate-90'>
                    ›
                  </span>
                </summary>
                <div className='mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300'>
                  {m.rows.map((r, i) => (
                    <div key={i} className='flex items-center justify-between'>
                      <span className='font-medium'>{r.k}</span>
                      <span>{r.v}</span>
                    </div>
                  ))}
                  <Button
                    variant='primary'
                    size='medium'
                    className='mt-3'
                    onClick={() => {
                      setMethod(idx === 0 ? 'western_union' : 'wise')
                      setStep(2)
                    }}
                  >
                    {isArabic ? 'المتابعة' : 'Continue'}
                  </Button>
                </div>
              </details>
            ))}
          </div>
        ) : (
          <div className='space-y-5'>
            <div className='rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                {isArabic
                  ? 'استخدم رمز التحويل التالي في تفاصيل الحوالة، ثم اضغط إرسال:'
                  : 'Use the following transfer code in your payment reference, then submit:'}
              </p>
              <p className='mt-2 text-xl font-extrabold tracking-wider text-primary-300'>
                {code}
              </p>
            </div>

            <div className='rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
              <h3 className='mb-2 text-base font-semibold text-gray-900 dark:text-white'>
                {isArabic ? 'مراجعة العناصر' : 'Review Items'}
              </h3>
              <ul className='space-y-2 text-sm text-gray-700 dark:text-gray-300'>
                {cartItems.map((i: CartItem, idx: number) => (
                  <li key={idx} className='flex items-center justify-between'>
                    <span className='truncate'>
                      {i.projectTitle}
                      {i.label ? ` — ${i.label}` : ''}
                    </span>
                    <span className='font-semibold'>
                      ${i.amount} {i.currency}
                    </span>
                  </li>
                ))}
              </ul>
              <div className='mt-3 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-800'>
                <span className='text-sm font-semibold'>
                  {isArabic ? 'الإجمالي' : 'Total'}
                </span>
                <span className='text-lg font-extrabold text-primary-300'>
                  ${totalAmount} USD
                </span>
              </div>
            </div>

            {error && <p className='text-sm text-red-600'>{error}</p>}

            <div className='flex items-center gap-3'>
              <Button
                variant='secondary'
                size='medium'
                onClick={() => setStep(1)}
              >
                {isArabic ? 'رجوع' : 'Back'}
              </Button>
              <Button
                variant='primary'
                size='medium'
                onClick={onSubmit}
                disabled={submitting}
              >
                {submitting
                  ? isArabic
                    ? 'جار الإرسال…'
                    : 'Submitting…'
                  : isArabic
                    ? 'إرسال'
                    : 'Submit'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
