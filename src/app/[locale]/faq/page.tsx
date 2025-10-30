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
      ? `${t('FAQ_Title')} | جمعية خطط الإحسان الخيرية`
      : `${t('FAQ_Title')} | Khitat Al-Ihsan Charity`

  return {
    title,
    description: t('FAQ_Description'),
    alternates: {
      languages: {
        en: '/en/faq',
        ar: '/ar/faq'
      }
    },
    openGraph: {
      title: t('FAQ_Title'),
      description: t('FAQ_Description')
    }
  }
}

export default async function FAQPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations()
  const isArabic = locale === 'ar'

  const faqs = isArabic
    ? [
        {
          q: 'كيف يمكنني التبرع؟',
          a: 'يمكنك التبرع عبر موقعنا من خلال اختيار الحملة، ثم تحديد المبلغ وإكمال عملية الدفع بأمان.'
        },
        {
          q: 'هل التبرعات آمنة؟',
          a: 'نعم، نستخدم مزوّدي دفع موثوقين ونحرص على حماية بياناتك.'
        },
        {
          q: 'أين تُصرف التبرعات؟',
          a: 'تذهب التبرعات مباشرة لبرامجنا: الإغاثة الغذائية، العيون، الصحة، ذبائح الصدقة، والمزيد حسب نية المتبرّع.'
        },
        {
          q: 'هل يمكنني الحصول على تأكيد؟',
          a: 'نعم، نرسل تحديثات وتأكيدا بحسب نوع الحملة. بالنسبة للذبائح، يمكن إرسال فيديو عند الطلب.'
        }
      ]
    : [
        {
          q: 'How do I donate?',
          a: 'Choose a campaign on our website, select an amount, and complete secure checkout.'
        },
        {
          q: 'Is my donation secure?',
          a: 'Yes. We use trusted payment providers and protect your data.'
        },
        {
          q: 'Where do donations go?',
          a: 'Funds go directly to our programs: food relief, gift of sight, health, Sadaqah sacrifices, and more according to your intent.'
        },
        {
          q: 'Will I receive confirmation?',
          a: 'Yes. We send updates and confirmations depending on the campaign. For sacrifices, video can be provided upon request.'
        }
      ]

  return (
    <div className='min-h-[60vh] px-4 py-16'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-4 text-4xl font-bold text-primary-500'>
          {t('FAQ_Title')}
        </h1>
        <p className='mb-8 text-lg text-gray-700 dark:text-gray-300'>
          {t('FAQ_Description')}
        </p>

        <div className='space-y-3'>
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className='group rounded-xl border border-gray-200 bg-white p-4 open:bg-white open:shadow-sm dark:border-gray-800 dark:bg-gray-900'
            >
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-gray-900 dark:text-white ${
                  isArabic ? 'text-right' : ''
                }`}
              >
                {item.q}
                <span className='ml-3 text-primary-300 transition-transform group-open:rotate-90'>
                  ›
                </span>
              </summary>
              <p
                className={`mt-2 text-sm leading-7 text-gray-700 dark:text-gray-300 ${
                  isArabic ? 'text-right' : ''
                }`}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
