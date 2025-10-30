'use client'

import { useLocale } from 'next-intl'

interface FAQItem {
  q: string
  a: string
}

export default function HomeFAQ() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const faqs: FAQItem[] = isArabic
    ? [
        {
          q: 'كيف يمكنني التبرع؟',
          a: 'اختر الحملة، حدِّد المبلغ، ثم أكمل الدفع بأمان عبر موقعنا.'
        },
        {
          q: 'هل التبرعات آمنة؟',
          a: 'نعم، نستخدم مزوّدي دفع موثوقين ونحمي بيانات المتبرعين.'
        },
        {
          q: 'أين تُصرف التبرعات؟',
          a: 'تذهب مباشرة لبرامجنا: إغاثة غذائية، صحة وعيون، ذبائح الصدقة، وغيرها.'
        },
        {
          q: 'هل يمكنني الحصول على تأكيد؟',
          a: 'نرسل تحديثات بحسب نوع الحملة. لذبائح الصدقة، يمكن إرسال فيديو عند الطلب.'
        }
      ]
    : [
        {
          q: 'How do I donate?',
          a: 'Choose a campaign, select an amount, and complete secure checkout.'
        },
        {
          q: 'Are donations secure?',
          a: 'Yes, we use trusted payment providers and protect donor data.'
        },
        {
          q: 'Where do funds go?',
          a: 'Directly to our programs: food relief, health and sight, Sadaqah sacrifices, and more.'
        },
        {
          q: 'Will I get confirmation?',
          a: 'Yes—updates depend on the campaign. For sacrifices, video can be provided upon request.'
        }
      ]

  return (
    <div className='space-y-3'>
      {faqs.map((item, idx) => (
        <details
          key={idx}
          className='group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm dark:border-gray-800 dark:bg-gray-900'
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
  )
}
