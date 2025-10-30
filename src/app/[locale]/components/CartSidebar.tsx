'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Link, useRouter } from '@/src/navigation'
import { FiShoppingCart, FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import {
  removeItemByIndex,
  clearCart,
  updateItemAmount
} from '@/lib/store/cartSlice'
import { toast } from 'sonner'
import Button from './Button'
import { cn } from '@/lib/utils'
import { useCartContext } from './CartContext'

interface CartSidebarProps {
  isArabic: boolean
}

export default function CartSidebar({ isArabic }: CartSidebarProps) {
  const { isCartOpen: isOpen, setIsCartOpen: setIsOpen } = useCartContext()
  const cartItems = useAppSelector(state => state.cart.items)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const totalAmount = cartItems.reduce((sum, item) => sum + item.amount, 0)
  const itemCount = cartItems.length

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleRemoveItem = (index: number) => {
    dispatch(removeItemByIndex(index))
    toast.success(isArabic ? 'تم حذف العنصر' : 'Item removed from cart', {
      duration: 2000
    })
  }

  const handleUpdateAmount = (projectId: string, newAmount: number) => {
    if (newAmount > 0) {
      dispatch(updateItemAmount({ projectId, amount: newAmount }))
    }
  }

  const handleClearCart = () => {
    if (
      confirm(
        isArabic
          ? 'هل أنت متأكد من حذف جميع العناصر؟'
          : 'Are you sure you want to clear the cart?'
      )
    ) {
      dispatch(clearCart())
      toast.success(isArabic ? 'تم مسح السلة' : 'Cart cleared', {
        duration: 2000
      })
    }
  }

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className='relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-primary-300 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400'
        aria-label={isArabic ? 'سلة التسوق' : 'Shopping Cart'}
      >
        <FiShoppingCart className='h-5 w-5' />
        {itemCount > 0 && (
          <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-300 text-xs font-bold text-white shadow-sm'>
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </button>

      {/* Sidebar */}
      {isOpen && (
        <div
          className={cn(
            'fixed right-0 top-0 z-[9999] h-full w-full max-w-md transform bg-white shadow-2xl transition-all duration-300 ease-out dark:bg-gray-900 lg:w-96'
          )}
          onClick={e => e.stopPropagation()}
        >
          <div className='relative flex h-full flex-col bg-white dark:bg-gray-900'>
            {/* Header */}
            <div className='from-primary-50 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r to-white px-4 py-3 dark:border-gray-800 dark:from-gray-900 dark:to-gray-900 lg:px-6 lg:py-5'>
              <div className='flex items-center gap-2 lg:gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary-300/10 lg:h-10 lg:w-10'>
                  <FiShoppingCart className='h-4 w-4 text-primary-300 lg:h-5 lg:w-5' />
                </div>
                <div>
                  <h2 className='text-lg font-bold text-gray-900 dark:text-white lg:text-xl'>
                    {isArabic ? 'سلة التبرع' : 'Donation Cart'}
                  </h2>
                  {itemCount > 0 && (
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      {isArabic
                        ? `${itemCount} ${itemCount === 1 ? 'عنصر' : 'عناصر'}`
                        : `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 lg:p-2'
                aria-label={isArabic ? 'إغلاق' : 'Close'}
              >
                <FiX className='h-5 w-5' />
              </button>
            </div>

            {/* Cart Items */}
            <div className='scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 flex-1 overflow-y-auto px-3 py-4 lg:px-4 lg:py-6'>
              {cartItems.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-12 text-center lg:py-16'>
                  <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 lg:mb-6 lg:h-20 lg:w-20'>
                    <FiShoppingCart className='h-8 w-8 text-gray-400 lg:h-10 lg:w-10' />
                  </div>
                  <h3 className='mb-2 text-base font-semibold text-gray-900 dark:text-white lg:text-lg'>
                    {isArabic ? 'السلة فارغة' : 'Your cart is empty'}
                  </h3>
                  <p className='text-xs text-gray-500 dark:text-gray-400 lg:text-sm'>
                    {isArabic
                      ? 'ابدأ بإضافة تبرعات إلى السلة'
                      : 'Start adding donations to your cart'}
                  </p>
                </div>
              ) : (
                <div className='space-y-2 lg:space-y-3'>
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.projectId}-${index}`}
                      className='group relative flex gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-primary-300/50 hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:border-primary-300/30 lg:gap-4 lg:rounded-xl'
                    >
                      {/* Project Image - Left Side */}
                      <Link
                        href={`/projects/${item.projectSlug}`}
                        onClick={() => setIsOpen(false)}
                        className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg lg:h-24 lg:w-24'
                      >
                        <Image
                          src={item.projectImageUrl}
                          alt={item.projectTitle}
                          fill
                          className='object-cover transition-transform duration-300 group-hover:scale-105'
                        />
                      </Link>

                      {/* Content - Right Side */}
                      <div className='flex flex-1 flex-col justify-between py-2 pr-2 lg:py-3'>
                        <div className='flex items-start justify-between gap-2'>
                          <div className='min-w-0 flex-1'>
                            <Link
                              href={`/projects/${item.projectSlug}`}
                              onClick={() => setIsOpen(false)}
                            >
                              <h3 className='line-clamp-2 text-sm font-semibold text-gray-900 transition-colors hover:text-primary-300 dark:text-white lg:text-base'>
                                {item.projectTitle}
                              </h3>
                            </Link>
                            {item.label && (
                              <p className='mt-0.5 text-xs text-gray-500 dark:text-gray-400'>
                                {item.label}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className='flex-shrink-0 rounded-lg p-1 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 lg:p-1.5'
                            aria-label={isArabic ? 'حذف' : 'Remove'}
                          >
                            <FiTrash2 className='h-3.5 w-3.5 lg:h-4 lg:w-4' />
                          </button>
                        </div>

                        {/* Amount Controls */}
                        <div className='mt-2 flex items-center justify-between'>
                          <div className='flex items-center gap-1.5 lg:gap-2'>
                            <button
                              onClick={() =>
                                handleUpdateAmount(
                                  item.projectId,
                                  item.amount - 50
                                )
                              }
                              disabled={item.amount <= 50}
                              className='hover:bg-primary-50 dark:hover:bg-primary-900/20 flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition-colors hover:border-primary-300 hover:text-primary-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-primary-400 lg:h-7 lg:w-7'
                              aria-label={isArabic ? 'تقليل' : 'Decrease'}
                            >
                              <FiMinus className='h-2.5 w-2.5 lg:h-3 lg:w-3' />
                            </button>
                            <span className='text-sm font-bold text-primary-300 lg:text-base'>
                              ${item.amount}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateAmount(
                                  item.projectId,
                                  item.amount + 50
                                )
                              }
                              className='hover:bg-primary-50 dark:hover:bg-primary-900/20 flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition-colors hover:border-primary-300 hover:text-primary-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-primary-400 lg:h-7 lg:w-7'
                              aria-label={isArabic ? 'زيادة' : 'Increase'}
                            >
                              <FiPlus className='h-2.5 w-2.5 lg:h-3 lg:w-3' />
                            </button>
                          </div>
                          <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                            {item.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className='border-t border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-900 lg:px-6 lg:py-5'>
                <div className='mb-3 flex items-center justify-between rounded-lg bg-white p-3 dark:bg-gray-800 lg:mb-5 lg:p-4'>
                  <span className='text-base font-semibold text-gray-900 dark:text-white lg:text-lg'>
                    {isArabic ? 'المجموع' : 'Total Amount'}
                  </span>
                  <div className='text-right'>
                    <span className='text-xl font-bold text-primary-300 lg:text-2xl'>
                      ${totalAmount}
                    </span>
                    <span className='ml-1 text-xs text-gray-500 dark:text-gray-400 lg:text-sm'>
                      USD
                    </span>
                  </div>
                </div>
                <div className='space-y-2 lg:space-y-3'>
                  <Button
                    variant='primary'
                    size='large'
                    className='w-full text-sm font-semibold lg:text-base'
                    onClick={() => {
                      setIsOpen(false)
                      router.push('/checkout')
                    }}
                  >
                    {isArabic ? 'المتابعة للدفع' : 'Proceed to Checkout'}
                  </Button>
                  <button
                    onClick={handleClearCart}
                    className='w-full text-xs font-medium text-gray-600 transition-colors hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 lg:text-sm'
                  >
                    {isArabic ? 'مسح جميع العناصر' : 'Clear All Items'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
