import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getAllProjects } from '@/lib/queries/projects'
import ProjectCard from '../components/ProjectCard'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const title =
    locale === 'ar'
      ? `${t('Projects_Title')} | جمعية خطط الإحسان الخيرية`
      : `${t('Projects_Title')} | Khitat Al-Ihsan Charity`

  return {
    title,
    description: t('Projects_Description'),
    alternates: {
      languages: {
        en: '/en/projects',
        ar: '/ar/projects'
      }
    },
    openGraph: {
      title: t('Projects_Title'),
      description: t('Projects_Description')
    }
  }
}

export default async function ProjectsPage() {
  const t = await getTranslations()
  const projects = await getAllProjects()

  return (
    <div className='px-4 py-16'>
      <div className='mx-auto max-w-screen-2xl'>
        <div className='mx-auto max-w-4xl'>
          <h1 className='mb-4 text-4xl font-bold text-primary-500'>
            {t('Projects_Title')}
          </h1>
          <p className='text-lg text-gray-700 dark:text-gray-300'>
            {t('Projects_Description')}
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
