'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import Button from '../../components/Button'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { addItem } from '@/lib/store/cartSlice'
import { useCartContext } from '../../components/CartContext'
import type { Project, Price } from '@/lib/types/project'
import type { CartItem } from '@/lib/types/cart'
import AddOns from './AddOns'

interface DonationSidebarProps {
  project: Project
  isArabic: boolean
}

export default function DonationSidebar({
  project,
  isArabic
}: DonationSidebarProps) {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.items)
  const { isCartOpen } = useCartContext()

  // Default donation amounts
  const defaultAmounts: Price[] = [
    { amount: 50, currency: 'USD' },
    { amount: 100, currency: 'USD' },
    { amount: 200, currency: 'USD' },
    { amount: 300, currency: 'USD' }
  ]

  const hasPrices =
    project.prices && Array.isArray(project.prices) && project.prices.length > 0
  const prices = hasPrices ? project.prices : defaultAmounts
  const lowestPriceIndex = 0
  const [selectedPriceIndex, setSelectedPriceIndex] =
    useState<number>(lowestPriceIndex)
  const selectedPrice = prices[selectedPriceIndex] || prices[0]
  const selectedAmount = selectedPrice?.amount || 0
  const isSadaqahSacrifice = project.slug === 'sadaqah-sacrifice'
  const isAqeeqah = project.slug === 'aqeeqah'
  const isWaterWells = project.slug === 'water-well'
  const showAddOns = isSadaqahSacrifice || isAqeeqah
  const isCompactMobile = isWaterWells || isAqeeqah || isSadaqahSacrifice
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  const handleDonate = () => {
    const selectedPrice = prices[selectedPriceIndex] || prices[0]

    const cartItem: CartItem = {
      projectId: project.id,
      projectSlug: project.slug,
      projectTitle: project.title,
      projectImageUrl: project.image_url,
      amount: selectedAmount,
      currency: selectedPrice.currency || 'USD'
      // Base donation: do not set label/description so cart treats it as base
    }

    // Check if item already exists before dispatching
    const existingItem = cartItems.find(item => item.projectId === project.id)
    const isUpdate = !!existingItem

    dispatch(addItem(cartItem))

    if (isUpdate) {
      toast.success(
        isArabic ? 'تم تحديث مبلغ التبرع' : 'Donation amount updated!',
        {
          description: isArabic
            ? `${project.title} - $${selectedAmount} USD`
            : `${project.title} - $${selectedAmount} USD`
        }
      )
    } else {
      toast.success(
        isArabic ? 'تمت إضافة التبرع إلى السلة' : 'Added to cart successfully!',
        {
          description: isArabic
            ? `${project.title} - $${selectedAmount} USD`
            : `${project.title} - $${selectedAmount} USD`
        }
      )
    }
  }

  return (
    <>
      {/* Mobile: Bottom Sticky Donation Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 lg:hidden ${
          isCartOpen ? 'translate-y-full' : 'translate-y-0'
        } ${isCompactMobile && !isMobileExpanded ? 'p-2' : 'p-4'}`}
      >
        {isCompactMobile && !isMobileExpanded ? (
          /* Compact Preview Mode */
          <div
            className='bg-primary-50 dark:bg-primary-900/20 mx-auto max-w-md cursor-pointer rounded-lg p-3'
            onClick={() => setIsMobileExpanded(true)}
          >
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <span className='text-xs text-gray-600 dark:text-gray-400'>
                  {isArabic ? 'مبلغ التبرع' : 'Donation Amount'}
                </span>
                <span className='text-base font-bold text-primary-300'>
                  ${selectedAmount.toLocaleString()} USD
                  {selectedPrice.label ? ` - ${selectedPrice.label}` : ''}
                </span>
              </div>
              <svg
                className='h-5 w-5 text-gray-600 dark:text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>
        ) : (
          /* Expanded Mode */
          <div className='mx-auto max-w-md space-y-3'>
            {isCompactMobile && (
              <div className='flex items-center justify-between pb-2'>
                <h4 className='text-sm font-semibold text-gray-900 dark:text-white'>
                  {isArabic ? 'اختر مبلغ التبرع' : 'Select Donation Amount'}
                </h4>
                <button
                  onClick={() => setIsMobileExpanded(false)}
                  className='rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                >
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            )}
            <select
              value={selectedPriceIndex}
              onChange={e => setSelectedPriceIndex(Number(e.target.value))}
              className='w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            >
              {prices.map((price: Price, index: number) => (
                <option key={index} value={index}>
                  ${price.amount.toLocaleString()} USD
                  {price.label ? ` - ${price.label}` : ''}
                  {price.description ? ` (${price.description})` : ''}
                </option>
              ))}
            </select>
            {showAddOns && (
              <AddOns
                project={project}
                isArabic={isArabic}
                className='mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800'
              />
            )}
            <Button
              variant='primary'
              size='medium'
              className='w-full'
              onClick={handleDonate}
            >
              {isArabic ? 'تبرع الآن' : 'Donate Now'}
            </Button>
          </div>
        )}
      </div>

      {/* Desktop: Sidebar */}
      <div className='hidden lg:col-span-5 lg:block'>
        <div className='sticky top-24 rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-lg dark:border-gray-800 dark:bg-gray-800'>
          <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>
            {isArabic ? 'مبالغ التبرع' : 'Donation Amounts'}
          </h3>

          {/* Amount Selection */}
          <div className='mb-5 space-y-2.5'>
            {prices.map((price: Price, index: number) => (
              <label
                key={index}
                className={`group flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-all ${
                  selectedPriceIndex === index
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600'
                }`}
              >
                <input
                  type='radio'
                  name='donation-amount'
                  value={index}
                  checked={selectedPriceIndex === index}
                  onChange={e => setSelectedPriceIndex(Number(e.target.value))}
                  className='mt-0.5 h-4 w-4 text-primary-300 focus:ring-primary-300'
                />
                <div className='min-w-0 flex-1'>
                  <div className='flex flex-wrap items-baseline justify-between gap-2'>
                    <span className='text-base font-bold text-gray-900 dark:text-white'>
                      ${price.amount.toLocaleString()} USD
                    </span>
                    {price.label && (
                      <span className='whitespace-nowrap text-xs font-semibold text-gray-700 dark:text-gray-300'>
                        {price.label}
                      </span>
                    )}
                  </div>
                  {price.description && (
                    <p className='mt-1.5 text-xs leading-relaxed text-gray-600 dark:text-gray-400'>
                      {price.description}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
          {showAddOns && <AddOns project={project} isArabic={isArabic} />}

          {/* Single Donate Button */}
          <Button
            variant='primary'
            size='large'
            className='w-full'
            onClick={handleDonate}
          >
            {isArabic ? 'تبرع الآن' : 'Donate Now'}
          </Button>
        </div>
      </div>
    </>
  )
}
