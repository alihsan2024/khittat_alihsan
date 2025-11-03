import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { FiMail, FiMapPin, FiClock, FiPhone } from 'react-icons/fi'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const title =
    locale === 'ar'
      ? `${t('Contact_Title')} | جمعية خطط الإحسان الخيرية`
      : `${t('Contact_Title')} | Khitat Al-Ihsan Charity`

  return {
    title,
    description: t('Contact_Description'),
    alternates: {
      languages: {
        en: '/en/contact',
        ar: '/ar/contact'
      }
    },
    openGraph: {
      title: t('Contact_Title'),
      description: t('Contact_Description')
    }
  }
}

export default async function ContactPage() {
  const t = await getTranslations()

  return (
    <div className='min-h-[60vh] px-4 py-16'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-4xl font-bold text-primary-500'>
          {t('Contact_Title')}
        </h1>
        <p className='mb-8 text-lg text-gray-700 dark:text-gray-300'>
          {t('Contact_Description')}
        </p>

        <div className='grid gap-8 md:grid-cols-2'>
          {/* Address */}
          <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900'>
            <div className='mb-4 flex items-center gap-3'>
              <FiMapPin className='h-6 w-6 text-primary-500' />
              <h3 className='text-lg font-bold text-primary-500'>
                {t('Office_Address')}
              </h3>
            </div>
            <p className='text-gray-700 dark:text-gray-300'>
              Tripoli, Meetien Street, Al-Mohntazah Building, Shop Number 2
            </p>
          </div>

          {/* Hours */}
          <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900'>
            <div className='mb-4 flex items-center gap-3'>
              <FiClock className='h-6 w-6 text-primary-500' />
              <h3 className='text-lg font-bold text-primary-500'>
                {t('Opening_Hours')}
              </h3>
            </div>
            <p className='text-gray-700 dark:text-gray-300'>
              Monday – Friday, 8:00 am – 4:00 pm
            </p>
          </div>

          {/* Email */}
          <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900'>
            <div className='mb-4 flex items-center gap-3'>
              <FiMail className='h-6 w-6 text-primary-500' />
              <h3 className='text-lg font-bold text-primary-500'>
                {t('Email')}
              </h3>
            </div>
            <a
              href='mailto:khitattalihsan@gmail.com'
              className='text-gray-700 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400'
            >
              khitattalihsan@gmail.com
            </a>
          </div>

          {/* WhatsApp */}
          <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900'>
            <div className='mb-4 flex items-center gap-3'>
              <FiPhone className='h-6 w-6 text-primary-500' />
              <h3 className='text-lg font-bold text-primary-500'>WhatsApp</h3>
            </div>
            <a
              href='https://wa.me/96176482281'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-700 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400'
            >
              +961 76 482 281
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
