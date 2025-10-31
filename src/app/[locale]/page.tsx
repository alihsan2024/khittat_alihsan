import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { FiArrowRight, FiHeart, FiUsers, FiTarget } from 'react-icons/fi'
import { getAllProjects } from '@/lib/queries/projects'
import type { Project } from '@/lib/types/project'
import Button from './components/Button'
import LinkButton from './components/LinkButton'
import HomeFAQ from './components/HomeFAQ'
import ProjectCard from './components/ProjectCard'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const title =
    locale === 'ar'
      ? 'الرئيسية | جمعية خطط الإحسان الخيرية'
      : 'Home | Khitat Al-Ihsan Charity'
  const description = t('Subheading')

  return {
    title,
    description,
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar'
      }
    },
    openGraph: {
      title: t('Heading'),
      description,
      images: [
        {
          url: 'https://alihsan.s3.ap-southeast-2.amazonaws.com/projects/1708467504622-alihsan-coverImage.png',
          width: 1200,
          height: 630,
          alt: 'Khitat Al-Ihsan Charity'
        }
      ]
    }
  }
}

export default async function HomePage() {
  const t = await getTranslations()

  // Fetch projects from database
  let projects: Project[] = []
  try {
    projects = await getAllProjects()
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Continue with empty projects array if there's an error
  }

  return (
    <div className='flex flex-col'>
      {/* Hero Banner */}
      <section className='relative h-[60vh] overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage:
              'url(https://alihsan.s3.ap-southeast-2.amazonaws.com/projects/1708467504622-alihsan-coverImage.png)'
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-r from-primary-600/50 to-primary-500/40' />
        </div>
        <div className='relative mx-auto flex h-full max-w-screen-2xl items-center px-4 md:px-6 lg:px-8'>
          <div className='max-w-2xl space-y-4 text-white'>
            <h1 className='text-3xl font-bold md:text-4xl lg:text-5xl'>
              {t('Heading')}
            </h1>
            <p className='text-base text-white/90 md:text-lg'>
              {t('Subheading')}
            </p>
            <div className='flex gap-3 pt-2'>
              <LinkButton href='/projects' variant='yellow' size='medium'>
                {t('Donate')}
              </LinkButton>
              <LinkButton href='/contact' variant='secondary' size='medium'>
                {t('Contact')}
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className='relative overflow-hidden bg-white py-16 dark:bg-gray-900 lg:py-20'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-[0.03] dark:opacity-[0.05]'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        <div className='relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8'>
          <div className='grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16'>
            {/* Image - Left Side */}
            <div className='order-2 lg:order-1 lg:col-span-6'>
              <div className='group relative'>
                <div className='absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary-300/20 via-primary-300/30 to-primary-300/20 opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-75'></div>
                <div className='relative h-[400px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10'>
                  <Image
                    src='https://alihsan.s3.ap-southeast-2.amazonaws.com/images/PolicyPage/8E5A5569+Large.jpeg'
                    alt='About Us'
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-br from-primary-300/10 via-transparent to-primary-300/5'></div>
                </div>
              </div>
            </div>

            {/* Content - Right Side */}
            <div className='order-1 lg:order-2 lg:col-span-6'>
              <div className='space-y-6'>
                {/* Badge */}
                <div className='inline-flex items-center gap-2 rounded-full bg-primary-300/10 px-4 py-2 text-sm font-semibold text-primary-300 ring-1 ring-primary-300/20'>
                  <FiHeart className='h-4 w-4' />
                  <span>{t('Since_2018')}</span>
                </div>

                {/* Heading */}
                <h2 className='text-3xl font-bold tracking-tight text-primary-300 dark:text-white md:text-4xl lg:text-5xl'>
                  {t('About')}
                </h2>

                {/* Description */}
                <p className='text-base leading-7 text-gray-600 dark:text-gray-300 md:text-lg md:leading-8'>
                  {t('About_Description')}
                </p>

                {/* Stats/Features */}
                <div className='grid grid-cols-2 gap-4 pt-4'>
                  <div className='rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200 dark:bg-gray-800/50 dark:ring-gray-700'>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-lg bg-primary-300/10 p-2'>
                        <FiUsers className='h-5 w-5 text-primary-300' />
                      </div>
                      <div>
                        <p className='text-sm font-semibold text-gray-900 dark:text-white'>
                          {t('Community')}
                        </p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          {t('Since_2018')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200 dark:bg-gray-800/50 dark:ring-gray-700'>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-lg bg-primary-300/10 p-2'>
                        <FiTarget className='h-5 w-5 text-primary-300' />
                      </div>
                      <div>
                        <p className='text-sm font-semibold text-gray-900 dark:text-white'>
                          {t('Mission')}
                        </p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          {t('Humanitarian')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className='pt-2'>
                  <LinkButton
                    href='/about'
                    variant='primary'
                    size='medium'
                    className='group inline-flex items-center gap-2'
                  >
                    {t('Learn_More')}
                    <FiArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className='bg-gray-50 py-16 dark:bg-gray-900'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8'>
          <div className='mb-8 flex items-center justify-between'>
            <h2 className='text-3xl font-bold text-primary-300'>
              {t('Current_Projects')}
            </h2>
            <LinkButton href='/projects' variant='secondary' size='medium'>
              {t('View_All_Projects')}
            </LinkButton>
          </div>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {projects.length > 0 ? (
              projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800'>
                <p className='text-center text-gray-600 dark:text-gray-400'>
                  {t('No_Projects')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      {/* <section className='py-16'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8'>
          <div className='mb-8 flex items-center justify-between'>
            <h2 className='text-3xl font-bold text-primary-300'>
              {t('Latest_Updates')}
            </h2>
            <LinkButton href='/projects' variant='secondary' size='small'>
              {t('View_All_Projects')}
            </LinkButton>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900'
              >
                <div className='mb-3 flex items-center justify-between'>
                  <span className='rounded-full bg-primary-300/10 px-3 py-1 text-xs font-semibold text-primary-300 ring-1 ring-primary-300/20'>
                    {t('Update')}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <h3 className='mb-2 line-clamp-2 text-base font-bold text-gray-900 dark:text-white'>
                  {t('No_Updates')}
                </h3>
                <p className='line-clamp-3 text-sm text-gray-600 dark:text-gray-300'>
                  {t('Subheading')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className='bg-gray-50 py-16 dark:bg-gray-900'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8'>
          <div className='mb-8 flex items-center justify-between'>
            <div>
              <h2 className='text-3xl font-bold text-primary-300'>
                {t('FAQ_Title')}
              </h2>
              <p className='mt-2 text-gray-700 dark:text-gray-300'>
                {t('FAQ_Description')}
              </p>
            </div>
            <LinkButton href='/faq' variant='secondary' size='small'>
              {t('FAQ_Title')}
            </LinkButton>
          </div>

          <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900'>
            <HomeFAQ />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='py-16'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8'>
          <div className='grid gap-8 lg:grid-cols-2'>
            <div>
              <h2 className='mb-4 text-3xl font-bold text-primary-300'>
                {t('Contact_Title')}
              </h2>
              <p className='mb-6 text-gray-700 dark:text-gray-300'>
                {t('Contact_Description')}
              </p>
              <div className='flex flex-wrap gap-3'>
                <LinkButton href='/contact' variant='primary' size='medium'>
                  {t('Contact')}
                </LinkButton>
              </div>
            </div>
            <div className='grid gap-4'>
              <div className='rounded-xl border border-gray-200 bg-white p-5 ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10'>
                <p className='font-semibold text-primary-300'>
                  {t('Office_Address')}
                </p>
                <p className='text-sm text-gray-700 dark:text-gray-300'>
                  Tripoli, Meetien Street, Al-Mohntazah Building, Shop Number 2
                </p>
              </div>
              <div className='rounded-xl border border-gray-200 bg-white p-5 ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10'>
                <p className='font-semibold text-primary-300'>{t('Email')}</p>
                <a
                  href='mailto:khitattalihsan@gmail.com'
                  className='text-sm text-gray-700 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-400'
                >
                  khitattalihsan@gmail.com
                </a>
              </div>
              <div className='rounded-xl border border-gray-200 bg-white p-5 ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10'>
                <p className='font-semibold text-primary-300'>Phone</p>
                <a
                  href='tel:+9613976426'
                  className='text-sm text-gray-700 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-400'
                >
                  +961 3 976 426
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
