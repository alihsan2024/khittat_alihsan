import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const title =
    locale === 'ar'
      ? `${t('About')} | جمعية خطط الإحسان الخيرية`
      : `${t('About')} | Khitat Al-Ihsan Charity`

  return {
    title,
    description: t('About_Description'),
    alternates: {
      languages: {
        en: '/en/about',
        ar: '/ar/about'
      }
    },
    openGraph: {
      title: t('About'),
      description: t('About_Description')
    }
  }
}

export default async function AboutPage() {
  const t = await getTranslations()

  return (
    <div className='flex flex-col'>
      {/* Hero */}
      <section className='relative h-[45vh] min-h-[380px] overflow-hidden'>
        <div className='absolute inset-0'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='https://alihsan.s3.ap-southeast-2.amazonaws.com/images/PolicyPage/8E5A5569+Large.jpeg'
            alt='About Khitat Al-Ihsan'
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/60' />
        </div>
        <div className='relative mx-auto flex h-full max-w-screen-2xl items-end px-4 pb-10 md:px-6 lg:px-8'>
          <div className='max-w-3xl text-white'>
            <h1 className='mb-3 text-4xl font-extrabold md:text-5xl'>
              {t('About')}
            </h1>
            <p className='text-base text-white/90 md:text-lg'>
              {t('About_Description')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className='bg-white py-16 dark:bg-gray-900'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8'>
          <div className='grid gap-10 lg:grid-cols-3'>
            <div className='lg:col-span-2'>
              <div className='space-y-6 text-gray-700 dark:text-gray-300'>
                <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10'>
                  <h2 className='mb-3 text-2xl font-bold text-primary-300'>
                    {t('Vision')}
                  </h2>
                  <p className='text-base leading-7 md:text-lg md:leading-8'>
                    {t('Vision_Description')}
                  </p>
                </div>

                <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10'>
                  <h2 className='mb-3 text-2xl font-bold text-primary-300'>
                    {t('Mission')}
                  </h2>
                  <p className='text-base leading-7 md:text-lg md:leading-8'>
                    {t('Mission_Description')}
                  </p>
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10'>
                <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                  {t('Since_2018')}
                </p>
                <p className='mt-1 text-3xl font-extrabold text-primary-300'>
                  2018
                </p>
              </div>
              <div className='rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10'>
                <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                  {t('Current_Projects')}
                </p>
                <p className='mt-1 text-3xl font-extrabold text-primary-300'>
                  6+
                </p>
              </div>
              <div className='rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10'>
                <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                  {t('Community')}
                </p>
                <p className='mt-1 text-3xl font-extrabold text-primary-300'>
                  1000+
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
