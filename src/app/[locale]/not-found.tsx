import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Button from './components/Button'

export default async function NotFound() {
  const t = await getTranslations()

  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-primary-500'>404</h1>
        <h2 className='mt-4 text-3xl font-bold text-gray-900 dark:text-white'>
          {t('404_Title')}
        </h2>
        <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>
          {t('404_Message')}
        </p>
        <div className='mt-8'>
          <Link href='/'>
            <Button variant='primary' size='large'>
              {t('404_Home')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
