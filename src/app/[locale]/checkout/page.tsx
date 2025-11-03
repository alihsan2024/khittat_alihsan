'use client'

import { useMemo, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import type { CartItem } from '@/lib/types/cart'
import Button from '../components/Button'
import { supabase } from '@/lib/supabase'
import { clearCart } from '@/lib/store/cartSlice'
import { useRouter } from '@/src/navigation'
import { toast } from 'sonner'
import { FiCopy, FiCheck } from 'react-icons/fi'

type Method = 'wise'

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
      `KHC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  )
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<{
    transferCode: boolean
    accountId: boolean
    phoneNumber: boolean
  }>({
    transferCode: false,
    accountId: false,
    phoneNumber: false
  })

  const copyToClipboard = async (
    text: string,
    key: 'transferCode' | 'accountId' | 'phoneNumber'
  ) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(prev => ({ ...prev, [key]: true }))
      toast.success(isArabic ? 'تم النسخ إلى الحافظة' : 'Copied to clipboard!')
      setTimeout(() => {
        setCopied(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      toast.error(isArabic ? 'فشل النسخ' : 'Failed to copy to clipboard')
    }
  }

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

  const wise = {
    title: 'Wise',
    rows: [
      { k: isArabic ? 'معرف الحساب' : 'Account ID', v: '30422319-03' },
      { k: isArabic ? 'رقم الهاتف' : 'Phone Number', v: '9613976426' },
      {
        k: isArabic ? 'ملاحظة' : 'Note',
        v: isArabic ? 'أدخل رمز التحويل' : 'Include transfer code'
      }
    ]
  }

  return (
    <div className='relative w-full py-6'>
      <div className='w-full'>
        <div className='w-full'>
          {/* Header */}
          <div className='mb-4'>
            <h1 className='text-xl font-bold text-gray-900 dark:text-white md:text-2xl'>
              {isArabic ? 'الدفع' : 'Checkout'}
            </h1>
          </div>

          {/* Cart Summary Card */}
          <div className='mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {isArabic ? 'إجمالي التبرع' : 'Total Donation'}
                </p>
                <p className='text-2xl font-bold text-primary-300'>
                  ${totalAmount.toLocaleString()} USD
                </p>
              </div>
              <div className='bg-primary-50 dark:bg-primary-900/20 rounded-md px-4 py-2'>
                <p className='text-primary-700 text-sm font-medium dark:text-primary-300'>
                  {cartItems.length}{' '}
                  {isArabic
                    ? cartItems.length === 1
                      ? 'مشروع'
                      : 'مشاريع'
                    : cartItems.length === 1
                      ? 'Project'
                      : 'Projects'}
                </p>
              </div>
            </div>
          </div>

          {/* Compact Stepper */}
          <div className='mb-5'>
            <div className='relative flex items-center justify-center gap-2'>
              {/* Step 1 */}
              <div className='flex items-center gap-1.5'>
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all ${
                    step === 1
                      ? 'border-primary-300 bg-primary-300 text-white'
                      : step === 2
                        ? 'border-primary-300 bg-white text-primary-300 dark:bg-gray-900'
                        : 'border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900'
                  }`}
                >
                  1
                </div>
                <span
                  className={`hidden text-xs font-medium sm:inline ${
                    step === 1
                      ? 'text-primary-300'
                      : step === 2
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {isArabic ? 'اختر الطريقة' : 'Select Method'}
                </span>
              </div>

              {/* Connector Line */}
              <div className='flex-1 border-t-2 border-gray-200 dark:border-gray-800'>
                <div
                  className={`h-full border-t-2 transition-all ${
                    step === 2 ? 'border-primary-300' : 'border-transparent'
                  }`}
                />
              </div>

              {/* Step 2 */}
              <div className='flex items-center gap-1.5'>
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all ${
                    step === 2
                      ? 'border-primary-300 bg-primary-300 text-white'
                      : 'border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900'
                  }`}
                >
                  2
                </div>
                <span
                  className={`hidden text-xs font-medium sm:inline ${
                    step === 2
                      ? 'text-primary-300'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {isArabic ? 'التأكيد والإرسال' : 'Confirm & Submit'}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {step === 1 ? (
            <div className='grid w-full gap-4'>
              <div className='rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'>
                <div className='p-5'>
                  <div className='mb-4 flex items-center gap-4'>
                    <div className='dark:bg-primary-900/30 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100'>
                      <svg
                        className='h-5 w-5 text-primary-300'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='text-base font-semibold text-gray-900 dark:text-white'>
                        {wise.title}
                      </h3>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {isArabic
                          ? 'طريقة الدفع الآمنة'
                          : 'Secure payment method'}
                      </p>
                    </div>
                  </div>

                  <div className='mb-4 space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50'>
                    {wise.rows.map((r, i) => {
                      const isAccountId =
                        r.k === (isArabic ? 'معرف الحساب' : 'Account ID')
                      const isPhoneNumber =
                        r.k === (isArabic ? 'رقم الهاتف' : 'Phone Number')

                      return (
                        <div
                          key={i}
                          className='flex items-center justify-between border-b border-gray-200 pb-3 last:border-0 last:pb-0 dark:border-gray-700'
                        >
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                            {r.k}
                          </span>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                              {r.v}
                            </span>
                            {(isAccountId || isPhoneNumber) && (
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    r.v,
                                    isAccountId ? 'accountId' : 'phoneNumber'
                                  )
                                }
                                className='rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-primary-300 dark:hover:bg-gray-700 dark:hover:text-primary-400'
                                title={isArabic ? 'نسخ' : 'Copy'}
                              >
                                {copied[
                                  isAccountId ? 'accountId' : 'phoneNumber'
                                ] ? (
                                  <FiCheck className='h-4 w-4 text-green-600 dark:text-green-400' />
                                ) : (
                                  <FiCopy className='h-4 w-4' />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Button
                    variant='primary'
                    size='medium'
                    className='w-full'
                    onClick={() => {
                      setMethod('wise')
                      setStep(2)
                    }}
                  >
                    {isArabic ? 'المتابعة' : 'Continue with Wise'}
                  </Button>
                  <Button
                    variant='secondary'
                    size='medium'
                    className='mt-3 w-full'
                    onClick={() => {
                      router.push('/')
                    }}
                  >
                    {isArabic ? 'العودة إلى الرئيسية' : 'Return Home'}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className='grid w-full gap-4 md:grid-cols-2'>
              {/* Transfer Code Card */}
              <div className='from-primary-50 dark:border-primary-800 dark:from-primary-900/20 dark:to-primary-800/10 rounded-lg border-2 border-primary-200 bg-gradient-to-br to-primary-100/50 p-5'>
                <div className='mb-3 flex items-center gap-2'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary-300'>
                    <svg
                      className='h-4 w-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>
                    {isArabic ? 'رمز التحويل' : 'Transfer Code'}
                  </h3>
                </div>
                <p className='mb-3 text-sm text-gray-700 dark:text-gray-300'>
                  {isArabic
                    ? 'استخدم رمز التحويل التالي في تفاصيل الحوالة:'
                    : 'Use the following transfer code in your payment reference:'}
                </p>
                <div className='rounded-lg bg-white p-4 text-center dark:bg-gray-900'>
                  <div className='flex items-center justify-center gap-3'>
                    <p className='font-mono text-xl font-bold tracking-wider text-primary-300'>
                      {code}
                    </p>
                    <button
                      onClick={() => copyToClipboard(code, 'transferCode')}
                      className='rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary-300 dark:hover:bg-gray-800 dark:hover:text-primary-400'
                      title={isArabic ? 'نسخ' : 'Copy'}
                    >
                      {copied.transferCode ? (
                        <FiCheck className='h-5 w-5 text-green-600 dark:text-green-400' />
                      ) : (
                        <FiCopy className='h-5 w-5' />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Review Items Card */}
              <div className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900'>
                <h3 className='mb-3 text-sm font-semibold text-gray-900 dark:text-white'>
                  {isArabic ? 'مراجعة العناصر' : 'Review Items'}
                </h3>
                <div className='mb-3 max-h-56 space-y-2 overflow-y-auto'>
                  {cartItems.map((i: CartItem, idx: number) => (
                    <div
                      key={idx}
                      className='flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 p-2.5 dark:border-gray-800 dark:bg-gray-800/50'
                    >
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-gray-900 dark:text-white'>
                          {i.projectTitle}
                        </p>
                        {i.label && (
                          <p className='mt-0.5 text-xs text-gray-600 dark:text-gray-400'>
                            {i.label}
                          </p>
                        )}
                      </div>
                      <div className='ml-3 text-right'>
                        <p className='text-sm font-semibold text-gray-900 dark:text-white'>
                          ${i.amount.toLocaleString()} {i.currency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='bg-primary-50 dark:bg-primary-900/20 flex items-center justify-between rounded-md border-t border-gray-200 p-3 dark:border-gray-800'>
                  <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                    {isArabic ? 'الإجمالي' : 'Total'}
                  </span>
                  <span className='text-lg font-bold text-primary-300'>
                    ${totalAmount.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className='col-span-full rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20'>
                  <p className='text-sm font-medium text-red-700 dark:text-red-400'>
                    {error}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className='col-span-full mt-2 flex items-center gap-4'>
                <Button
                  variant='secondary'
                  size='medium'
                  className='flex-1'
                  onClick={() => setStep(1)}
                >
                  {isArabic ? 'رجوع' : 'Back'}
                </Button>
                <Button
                  variant='primary'
                  size='medium'
                  className='flex-1'
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
    </div>
  )
}
