import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import LinkButton from '../components/LinkButton'

const ORPHAN_BANNER_IMAGE =
  'https://edtqeahcijnyzultlcbc.supabase.co/storage/v1/object/public/banners/banners/1772174147112-txdc4bumhif.jpeg'

const content = {
  en: {
    title: 'Details of the Orphan Child Sponsorship Project',
    intro: [
      'Because we have worked with children in orphanages and lived their suffering, and because we found that despite the care they receive, these children suffer from family disintegration, we decided to work in the opposite direction. We have strived to keep the orphaned child within his or her family and to care for the child in his natural environment.',
      "If a child loses his father, why should he also be deprived of his mother, siblings, home, and surroundings?",
      'Providing financial sponsorship helps the mother and enables her to keep her child under her care. No matter how much we try, we will never find anyone better than a mother to nurture and protect her child.'
    ],
    followUpTitle: 'Follow-up of the Sponsored Child',
    followUp: [
      "The field assessment team conducts regular visits to the sponsored child's family to check on their conditions and follow up on the child's situation.",
      "If it is found that the family's living conditions have improved due to the mother's remarriage, the sponsor is informed and has the sole choice to:"
    ],
    followUpList: [
      'Continue the sponsorship,',
      'Stop it,',
      'Or replace the child with another who is more in need.'
    ],
    followUpEnd: "At the end of each academic year, the sponsor is informed of the child's school results and the changes that occurred in his or her life during the year, in addition to receiving a recent photo of the child with his family, so that the sponsor can follow the child's development through different stages of growth.",
    sponsorshipAmountTitle: 'Sponsorship Amount',
    sponsorshipAmount: [
      'The minimum monthly sponsorship amount is USD 80 or 120 AUD.',
      'Families of sponsored children also benefit from in-kind donations received regularly by the association. In addition, orphaned children are offered many recreational activities throughout the year to bring joy and happiness to their hearts.'
    ],
    conditionsTitle: 'Conditions for Sponsorship',
    conditions: [
      'The child must be an orphan (with or without a guardian).',
      'The child must remain enrolled in school; if he drops out, the sponsorship is automatically discontinued.',
      'Sponsorship continues until the completion of the child\'s university education.'
    ],
    additionalSupportTitle: 'Additional Support in Orphan Sponsorship',
    additionalSupport: "The sponsor may pay the monthly amount on special occasions and may also provide additional assistance such as:",
    additionalSupportList: [
      'School registration fees,',
      'Purchasing books,',
      'Eid clothing,',
      'Sending toys and sweets,',
      'Providing food parcels during the month of Ramadan.'
    ],
    terminationTitle: 'Termination of Sponsorship',
    termination: "The sponsor has the right to stop the sponsorship at any time, provided that the association is informed at least one month in advance, so that another sponsor can be secured for the child.",
    closing: 'May Allah accept your good deeds and reward you abundantly.',
    cta: 'Sponsor an Orphan',
    ctaLink: '/projects/orphan-sponsorship'
  },
  ar: {
    title: 'تفاصيل مشروع كفالة الطفل اليتيم',
    intro: [
      'لأننا عملنا مع أطفال في دور الأيتام وعشنا معاناتهم، ولأننا وجدنا أن هؤلاء الأطفال رغم الرعاية التي يتلقونها يعانون من تفكك أسري، قررنا العمل في الاتجاه المعاكس. سعينا إلى إبقاء الطفل اليتيم في أسرته ورعايته في بيئته الطبيعية.',
      'إذا فقد الطفل أباه، فلماذا يُحرم أيضاً من أمه وإخوته وبيته ومحيطه؟',
      'تقديم الكفالة المالية يساعد الأم ويمكّنها من الإبقاء على طفلها في رعايتها. ومهما بذلنا من جهد، فلن نجد أفضل من الأم لتربية طفلها وحمايته.'
    ],
    followUpTitle: 'متابعة الطفل المكفول',
    followUp: [
      'يقوم فريق التقييم الميداني بزيارات دورية لأسرة الطفل المكفول للاطلاع على أوضاعهم ومتابعة وضع الطفل.',
      'إذا تبين أن أوضاع الأسرة المعيشية قد تحسنت بسبب زواج الأم مرة أخرى، يُعلم الكافل وله الخيار الوحيد في:'
    ],
    followUpList: [
      'متابعة الكفالة،',
      'إيقافها،',
      'أو استبدال الطفل بآخر أكثر احتياجاً.'
    ],
    followUpEnd: 'في نهاية كل عام دراسي، يُعلم الكافل بنتائج الطفل المدرسية والتغييرات التي طرأت على حياته خلال العام، بالإضافة إلى استلام صورة حديثة للطفل مع أسرته، حتى يتمكن الكافل من متابعة تطور الطفل عبر مراحل النمو المختلفة.',
    sponsorshipAmountTitle: 'مبلغ الكفالة',
    sponsorshipAmount: [
      'الحد الأدنى للكفالة الشهرية هو 80 دولاراً أمريكياً أو 120 دولاراً أسترالياً.',
      'أسر الأطفال المكفولين تستفيد أيضاً من التبرعات العينية التي تتلقاها الجمعية بانتظام. بالإضافة إلى ذلك، يُقدّم للأطفال الأيتام العديد من الأنشطة الترفيهية على مدار العام لزرع الفرح والسعادة في قلوبهم.'
    ],
    conditionsTitle: 'شروط الكفالة',
    conditions: [
      'أن يكون الطفل يتيماً (مع وصي أو بدونه).',
      'أن يبقى الطفل مسجلاً في المدرسة؛ فإن تسرب منها تُوقف الكفالة تلقائياً.',
      'تستمر الكفالة حتى إتمام تعليم الطفل الجامعي.'
    ],
    additionalSupportTitle: 'الدعم الإضافي في كفالة الأيتام',
    additionalSupport: 'يجوز للكافل دفع المبلغ الشهري في مناسبات خاصة كما يجوز له تقديم مساعدات إضافية مثل:',
    additionalSupportList: [
      'رسوم التسجيل المدرسي،',
      'شراء الكتب،',
      'ملابس العيد،',
      'إرسال ألعاب وحلويات،',
      'توفير طرود غذائية خلال شهر رمضان.'
    ],
    terminationTitle: 'إنهاء الكفالة',
    termination: 'يحق للكافل إيقاف الكفالة في أي وقت، شريطة إبلاغ الجمعية قبل شهر واحد على الأقل، حتى يتم تأمين كافل آخر للطفل.',
    closing: 'تقبل الله منكم طيب الأعمال ووفاكم أجره.',
    cta: 'اكفل يتيماً',
    ctaLink: '/projects/orphan-sponsorship'
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale === 'ar' ? 'ar' : 'en']
  const title =
    locale === 'ar'
      ? `${c.title} | جمعية خطط الإحسان الخيرية`
      : `${c.title} | Khitat Al-Ihsan Charity`
  return {
    title,
    description: c.intro[0],
    alternates: {
      languages: {
        en: '/en/orphan-child-sponsorship',
        ar: '/ar/orphan-child-sponsorship'
      }
    },
    openGraph: {
      title: c.title,
      description: c.intro[0],
      images: [{ url: ORPHAN_BANNER_IMAGE, width: 1200, height: 630, alt: c.title }]
    }
  }
}

export default async function OrphanChildSponsorshipPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const c = content[isArabic ? 'ar' : 'en']

  return (
    <div className='flex min-h-screen flex-col bg-white dark:bg-gray-900'>
      {/* Hero */}
      <section className='relative h-[45vh] min-h-[320px] overflow-hidden'>
        <Image
          src={ORPHAN_BANNER_IMAGE}
          alt={c.title}
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70' />
        <div className='relative mx-auto flex h-full max-w-screen-2xl items-end px-4 pb-10 md:px-6 lg:px-8'>
          <h1
            className={`max-w-screen-2xl text-4xl font-bold text-white md:text-5xl ${isArabic ? 'text-right' : ''}`}
          >
            {c.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className='py-16'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8'>
          <div className='space-y-10 text-base leading-7 text-gray-700 dark:text-gray-300 md:text-lg md:leading-8'>
            {/* Intro */}
            <div className='space-y-4'>
              {c.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Follow-up */}
            <div>
              <h2 className='mb-4 text-2xl font-bold text-primary-300 dark:text-white'>
                {c.followUpTitle}
              </h2>
              {c.followUp.map((para, i) => (
                <p key={i} className='mb-3'>
                  {para}
                </p>
              ))}
              <ul className='list-inside list-disc space-y-1 pl-2'>
                {c.followUpList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className='mt-4'>{c.followUpEnd}</p>
            </div>

            {/* Sponsorship Amount */}
            <div>
              <h2 className='mb-4 text-2xl font-bold text-primary-300 dark:text-white'>
                {c.sponsorshipAmountTitle}
              </h2>
              {c.sponsorshipAmount.map((para, i) => (
                <p key={i} className='mb-3'>
                  {para}
                </p>
              ))}
            </div>

            {/* Conditions */}
            <div>
              <h2 className='mb-4 text-2xl font-bold text-primary-300 dark:text-white'>
                {c.conditionsTitle}
              </h2>
              <ol className='list-inside list-decimal space-y-2 pl-2'>
                {c.conditions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>

            {/* Additional Support */}
            <div>
              <h2 className='mb-4 text-2xl font-bold text-primary-300 dark:text-white'>
                {c.additionalSupportTitle}
              </h2>
              <p className='mb-3'>{c.additionalSupport}</p>
              <ul className='list-inside list-disc space-y-1 pl-2'>
                {c.additionalSupportList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Termination */}
            <div>
              <h2 className='mb-4 text-2xl font-bold text-primary-300 dark:text-white'>
                {c.terminationTitle}
              </h2>
              <p>{c.termination}</p>
            </div>

            {/* Closing */}
            <p className='text-center text-lg font-medium text-primary-300 dark:text-primary-400'>
              {c.closing}
            </p>

            {/* CTA */}
            <div className='flex justify-center pt-4'>
              <LinkButton href={c.ctaLink} variant='primary' size='medium'>
                {c.cta}
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
