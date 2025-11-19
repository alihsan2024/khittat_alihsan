'use client'

import { toast } from 'sonner'
import Button from '../../components/Button'
import { useAppDispatch } from '@/lib/store/hooks'
import { addItem } from '@/lib/store/cartSlice'
import type { Project } from '@/lib/types/project'
import type { CartItem } from '@/lib/types/cart'

interface AddOnsProps {
  project: Project
  isArabic: boolean
  className?: string
}

export default function AddOns({ project, isArabic, className }: AddOnsProps) {
  const dispatch = useAppDispatch()

  const addAddon = (amount: number, label: string, description?: string) => {
    const cartItem: CartItem = {
      projectId: project.id,
      projectSlug: project.slug,
      projectTitle: project.title,
      projectImageUrl: project.image_url,
      amount,
      currency: 'USD',
      label,
      description
    }

    dispatch(addItem(cartItem))

    toast.success(
      isArabic ? 'تمت إضافة الإضافة إلى السلة' : 'Add-on added to cart!',
      {
        description: `${label} - $${amount} USD`
      }
    )
  }

  return (
    <div
      className={
        className ??
        'mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-800'
      }
    >
      <h3 className='mb-4 text-xl font-bold text-gray-900 dark:text-white'>
        {isArabic ? 'إضافات اختيارية' : 'Optional Add-ons'}
      </h3>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-base font-semibold text-gray-900 dark:text-white'>
              {isArabic ? 'وليمة' : 'Waleemah'}
            </span>
            <span className='text-sm font-bold text-primary-300'>$80 USD</span>
          </div>
          <p className='mb-3 text-sm text-gray-600 dark:text-gray-400'>
            {isArabic
              ? 'وليمة مجتمعية - تكفي 100 شخص'
              : 'Community Feast - Feeds 100 people'}
          </p>
          <Button
            variant='primary'
            size='small'
            className='w-full'
            onClick={() =>
              addAddon(
                80,
                isArabic ? 'وليمة' : 'Waleemah',
                isArabic
                  ? 'وليمة مجتمعية - تكفي 100 شخص'
                  : 'Community Feast - Feeds 100 people'
              )
            }
          >
            {isArabic ? 'أضف إلى السلة' : 'Add to Cart'}
          </Button>
        </div>

        <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-base font-semibold text-gray-900 dark:text-white'>
              {isArabic ? '25 كجم أرز' : '25 kg Rice'}
            </span>
            <span className='text-sm font-bold text-primary-300'>$39 USD</span>
          </div>
          <p className='mb-3 text-sm text-gray-600 dark:text-gray-400'>
            {isArabic ? 'إضافة اختيارية' : 'Optional add-on'}
          </p>
          <Button
            variant='secondary'
            size='small'
            className='w-full'
            onClick={() =>
              addAddon(
                39,
                isArabic ? '25 كجم أرز' : '25 kg Rice',
                isArabic ? 'إضافة اختيارية' : 'Optional add-on'
              )
            }
          >
            {isArabic ? 'أضف إلى السلة' : 'Add to Cart'}
          </Button>
        </div>
      </div>
      <p className='mt-3 text-xs text-gray-600 dark:text-gray-400'>
        {isArabic
          ? 'ملاحظة: الوليمة لا تُرتب إلا مع ذبيحة الصدقة.'
          : 'Note: Waleemah can only be arranged together with a Sadaqah Sacrifice.'}
      </p>
    </div>
  )
}
