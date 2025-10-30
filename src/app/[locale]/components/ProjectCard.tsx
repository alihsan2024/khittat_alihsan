'use client'

import Image from 'next/image'
import { Link } from '@/src/navigation'
import { FiArrowRight } from 'react-icons/fi'
import type { Project, Price } from '@/lib/types/project'
import { useLocale } from 'next-intl'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale()
  const isArabic = locale === 'ar'
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
  const lowestPrice = Math.min(...prices.map((p: Price) => p.amount || 0))

  const arTitle = project.title_ar || (project as any).arabic_title
  const arBrief = project.brief_description_ar || (project as any).arabic_desc
  const displayTitle = isArabic && arTitle ? arTitle : project.title
  const displayBrief =
    isArabic && arBrief ? (arBrief as string) : project.brief_description

  return (
    <Link href={`/projects/${project.slug}`}>
      <div
        className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-gray-800 dark:bg-gray-800 ${
          isArabic ? 'text-right' : ''
        }`}
      >
        {/* Image */}
        <div className='relative h-52 overflow-hidden'>
          <Image
            src={project.image_url}
            alt={displayTitle}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>
          <div
            className={`absolute left-0 top-0 m-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-600 shadow-sm backdrop-blur ${
              isArabic ? 'left-auto right-0' : ''
            }`}
          >
            {isArabic ? 'حملة' : 'Campaign'}
          </div>
        </div>

        {/* Content */}
        <div className='p-6'>
          <h3 className='mb-2 line-clamp-2 text-xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
            {displayTitle}
          </h3>
          <p className='mb-5 line-clamp-3 text-[13px] leading-relaxed text-gray-600 dark:text-gray-300'>
            {displayBrief}
          </p>

          {/* Price & CTA */}
          <div
            className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {isArabic ? 'ابتداءً من' : 'Starting from'}
              </span>
              <span className='text-lg font-extrabold text-primary-300'>
                ${lowestPrice} USD
              </span>
            </div>
            <div
              className={`flex items-center gap-2 text-primary-300 transition-transform group-hover:translate-x-1 ${
                isArabic ? 'flex-row-reverse' : ''
              }`}
            >
              <span className='text-sm font-semibold'>
                {isArabic ? 'عرض التفاصيل' : 'View Details'}
              </span>
              <FiArrowRight className='h-4 w-4' />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
