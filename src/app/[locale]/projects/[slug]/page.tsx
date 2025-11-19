import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProjectBySlug } from '@/lib/queries/projects'
import type { Price } from '@/lib/types/project'
import DonationSidebar from './DonationSidebar'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  try {
    const project = await getProjectBySlug(slug)
    const t = await getTranslations({ locale })

    const arTitle = (project as any).title_ar || (project as any).arabic_title
    const arBrief =
      (project as any).brief_description_ar || (project as any).arabic_desc
    const isArabic = locale === 'ar'
    const displayTitle = isArabic && arTitle ? arTitle : project.title
    const displayBrief =
      isArabic && arBrief ? arBrief : project.brief_description

    const title = isArabic
      ? `${displayTitle} | جمعية خطط الإحسان الخيرية`
      : `${displayTitle} | Khitat Al-Ihsan Charity`

    return {
      title,
      description: displayBrief,
      alternates: {
        languages: {
          en: `/en/projects/${slug}`,
          ar: `/ar/projects/${slug}`
        }
      },
      openGraph: {
        title: displayTitle,
        description: displayBrief,
        images: [
          {
            url: project.image_url,
            width: 1200,
            height: 630,
            alt: displayTitle
          }
        ]
      }
    }
  } catch (error) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    }
  }
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations()

  let project
  try {
    project = await getProjectBySlug(slug)
  } catch (error) {
    notFound()
  }

  // Determine content based on locale
  const isArabic = locale === 'ar'
  const arTitle = (project as any).title_ar || (project as any).arabic_title
  const arBrief =
    (project as any).brief_description_ar || (project as any).arabic_desc
  const displayTitle = isArabic && arTitle ? arTitle : project.title
  const displayBrief = isArabic && arBrief ? arBrief : project.brief_description

  // Gift of Sight Project Content
  const giftOfSightContent = {
    en: {
      intro: `Did you know that cataracts are the leading cause of blindness worldwide, affecting over 65 million people? The tragedy is not that a cure doesn't exist, cataract eye surgery is safe, quick, and restores vision in just 20 minutes. The tragedy is that in poor communities, people cannot afford it. There is hope, and You can be part of it.\n\nOur Gift of Sight Project brings free surgeries, follow-up care, hot meals, and even Qur'an gifts to those living in darkness.`,
      whatAre: {
        title: 'What are Cataracts?',
        content: `A cataract happens when the clear lens of the eye becomes cloudy. Instead of seeing clearly, it's like looking through a dirty or frosted window.\n\nCataracts are the leading cause of blindness worldwide. Most people think they only affect the elderly, but cataracts can develop at any age. They often start slowly, and many don't even notice until everyday tasks, like reading, walking, or recognising faces, become impossible.`
      },
      whyProblem: {
        title: 'Why are Cataracts a Problem in Disadvantaged Communities?',
        content: `In wealthier countries, cataract surgery is routine. But in poor and rural communities, people may live in blindness for years, or even a lifetime.\n\nWhy?\n\nThe surgery costs more than families can ever afford.\n\nHospitals and doctors are far away.\n\nThere are not enough trained specialists.\n\nThis means mothers cannot see their children grow. Fathers can't provide for their children. Elders lose their ability to walk safely. Children miss out on education and play. Entire families suffer when one person loses their sight.`
      },
      howSurgery: {
        title: 'How does Cataract Surgery Restore Sight?',
        content: `Cataract surgery is one of the safest and most successful medical procedures. In just 20 minutes, the cloudy lens is removed and replaced with a clear one. Vision is restored soon after, insha'Allah.\n\nAlhamdulillah, it is life changing. A person who walked in almost blind could see again.`
      },
      whatDonation: {
        title: 'What your donation provides',
        content: `When you give to the Gift of Sight Project, you are providing complete care, not just surgery.\n\nProvide Comprehensive Care:\n\nPre-surgery screening and assessment\n\nCataract surgery by qualified doctors\n\nEye drops and essential medication\n\nSunglasses to protect healing eyes\n\nFollow-up and aftercare\n\nOne of the unique aspects of our Gift of Sight Project is that we gift a Quran to each of our patients, so it is one of the first things they see and read, In Sha Allah.`
      },
      inIslam: {
        title: 'The Gift of Sight in Islam',
        content: `Sight is not just a sense; it is one of Allah's greatest blessings and a trust we are commanded to protect.\n\nThe Prophet ﷺ said:\n"Whoever relieves a believer's distress of the distressful aspects of this world, Allah will rescue him from a difficulty of the difficulties of the Hereafter." - Muslim\n\nBy restoring someone's sight, you are relieving one of the greatest hardships. And because this gift lasts a lifetime, it becomes sadaqah jariyah, ongoing charity that continues to bring you reward.`
      },
      callToAction: `You can be the reason someone steps out of darkness and into light.\n\n$75 = One cataract surgery\n\n$150 = Two surgeries\n\n$225 = Three surgeries\n\n$300 = Four surgeries\n\nYour donation restores dignity, education, independence, and connection.\n\nSight means seeing a loved one's smile. Reading the Qur'an. Walking safely to school. Working with dignity. For millions, these are dreams that can become reality through your support.\n\nYour donation restores sight and transforms lives. Help us reach more people in need of vision care.`
    },
    ar: {
      intro: `هل تعلم أن المياه البيضاء (الكتاركت) هي السبب الأول للعمى في العالم، حيث تؤثر على أكثر من 65 مليون إنسان؟ المأساة ليست في عدم وجود علاج — فعملية إزالة المياه البيضاء آمنة وسريعة وتعيد البصر خلال 20 دقيقة فقط. المأساة هي أن الفقراء لا يستطيعون تحمل تكاليفها.\n\nلكن هناك أمل — ويمكنك أن تكون جزءاً منه.\n\nمشروع هدية البصر يقدم عمليات مجانية، ورعاية متابعة، ووجبات ساخنة، وحتى مصاحف كهدية لأولئك الذين يعيشون في الظلام.`,
      whatAre: {
        title: 'ما هي المياه البيضاء (الكتاركت)؟',
        content: `تحدث المياه البيضاء عندما تصبح عدسة العين الصافية معتمة. بدلاً من الرؤية الواضحة، يصبح الأمر وكأنك تنظر من خلال زجاج متسخ أو ضبابي.\n\nالمياه البيضاء هي السبب الرئيسي للعمى عالمياً. يظن كثيرون أنها تصيب المسنين فقط، لكنها قد تتطور في أي عمر. تبدأ ببطء، وكثيرون لا يلاحظونها حتى تصبح المهام اليومية — مثل القراءة، والمشي، أو التعرف على الوجوه , مستحيلة.`
      },
      symptoms: {
        title: 'ما هي أعراض المياه البيضاء؟',
        content: `تبدأ المياه البيضاء بصمت، لكنها مع الوقت تؤثر على كل جوانب الحياة اليومية.\n\nمن يعاني منها قد يواجه:\n\nرؤية ضبابية أو غير واضحة\n\nانزعاج من الأضواء الساطعة\n\nرؤية ألوان باهتة أو مشوهة للبني والأصفر\n\nرؤية هالات حول الأضواء خاصة ليلاً\n\nعزلة اجتماعية لعدم القدرة على رؤية الوجوه بوضوح\n\n\n\nوفي الحالات المتقدمة قد يظهر بؤبؤ العين بلون رمادي أو أبيض. وعلى الرغم من أنها لا تسبب الألم عادة، إلا أنها تسلب الاستقلالية والثقة والارتباط بالأحبة.`
      },
      whyProblem: {
        title: 'لماذا تُعد المياه البيضاء مشكلة في المجتمعات الفقيرة؟',
        content: `في الدول الغنية، جراحة إزالة المياه البيضاء إجراء روتيني. أما في المناطق الفقيرة والريفية، فقد يعيش الناس في عمى سنوات طويلة أو مدى حياتهم.\n\nلماذا؟\n\nتكلفة العملية أعلى مما تستطيع الأسر تحمله\n\nالمستشفيات والأطباء بعيدون\n\nنقص الأطباء المتخصصين\n\n\n\nوهذا يعني أن الأمهات لا يستطعن رؤية أبنائهن، والآباء يفقدون القدرة على العمل، وكبار السن لا يتمكنون من المشي بأمان، والأطفال يحرمون من التعليم واللعب.`
      },
      howSurgery: {
        title: 'كيف تعيد جراحة المياه البيضاء البصر؟',
        content: `جراحة المياه البيضاء من أكثر العمليات أماناً ونجاحاً. في 20 دقيقة فقط، يتم إزالة العدسة المعتمة واستبدالها بعدسة صافية. يستعيد المريض بصره بسرعة، بإذن الله.\n\nإنها حقاً تغير الحياة. شخص كان يدخل العيادة شبه أعمى، يخرج وهو يبصر من جديد.`
      },
      whatDonation: {
        title: 'ماذا يقدم تبرعك؟',
        content: `عند دعمك لمشروع هدية البصر، فأنت توفر رعاية كاملة، وليس مجرد عملية جراحية:\n\nفحوصات وتشخيص قبل العملية\n\nجراحة المياه البيضاء على يد أطباء مختصين\n\nقطرات وأدوية أساسية للعين\n\nنظارات شمسية لحماية العين أثناء التعافي\n\nمتابعة ورعاية بعد العملية\n\n\n\nومن الجوانب المميزة لهذا المشروع أننا نهدي كل مريض مصحفاً، ليكون من أوائل ما يراه ويقرأه بعد استعادة بصره، إن شاء الله.`
      },
      inIslam: {
        title: 'هدية البصر في الإسلام',
        content: `البصر ليس مجرد حاسة، بل من أعظم نعم الله وأمانة يجب حفظها.\n\nقال الله ﷻ:\n"وَهُوَ الَّذِي أَنْشَأَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ قَلِيلًا مَا تَشْكُرُونَ" (المؤمنون: 78)\n\nوقال النبي ﷺ:\n"من نفّس عن مؤمن كربة من كرب الدنيا، نفّس الله عنه كربة من كرب يوم القيامة." – رواه مسلم\n\nإعادة البصر لأحدهم من أعظم صور تفريج الكرب، وهي صدقة جارية تستمر أجورها مدى الحياة.`
      },
      whyImportant: {
        title: 'لماذا هذا المشروع مهم؟',
        content: `تُظهر تقارير منظمة الصحة العالمية أن المياه البيضاء تسبب 51٪ من حالات العمى في العالم، أي أكثر من 65 مليون إنسان.\n\nهذا يعني أن أكثر من نصف المكفوفين في العالم يمكنهم استعادة بصرهم بعملية بسيطة وآمنة وميسورة التكلفة.\n\nولكن بدون دعم، يبقى الملايين محاصرين في الظلام.\n\nالمياه البيضاء تسبب ما يقارب نصف حالات العمى عالمياً\n\nالعملية تستغرق 20 دقيقة فقط\n\n$75 USD تكفي لإعادة البصر مدى الحياة\n\nتخيّل أن تكون أنت السبب في أن يرى شخص من جديد.`
      },
      callToAction: `يمكنك أن تكون السبب في خروج إنسان من الظلام إلى النور.\n\n$75 = عملية واحدة\n\n$150 = عمليتان\n\n$225 = ثلاث عمليات\n\n$300 = أربع عمليات\n\n\n\nتبرعك لا يعيد البصر فقط، بل يعيد الكرامة، والتعليم، والاستقلالية، والقدرة على الارتباط بالأحبة.\n\nالرؤية تعني أن يرى المرء ابتسامة أحبته، أن يقرأ القرآن، أن يمشي بأمان إلى المدرسة، وأن يعمل بكرامة.\n\nبالنسبة للملايين، هذه مجرد أحلام — لكنها يمكن أن تتحقق بفضل دعمك.\n\nمعاً، يمكننا كسر دائرة العمى الذي يمكن منعه.\n\nتبرعك يجلب النور حيث كان الظلام.\nتبرعك يعيد البصر ويغير الحياة.`
    }
  }

  const zakatContent = {
    en: {
      heading: 'Fulfill Your Obligation, Purify Your Wealth',
      whatIs: {
        title: 'What Is Zakat Al-Maal?',
        content: `Zakat is one of the five pillars of Islam. It's not just a form of giving, it's a divine obligation that purifies our wealth and uplifts those in need.\n\nZakat Al-Maal applies to wealth that is owned for a full lunar (Hijri) year. If it meets the nisab, you pay 2.5% on it.\n\nZakat isn't just about money, it's about justice, mercy, and the wellbeing of the Ummah.\n\n"Establish prayer and give Zakat, and whatever good you put forward for yourselves, you will find it with Allah. Surely Allah sees what you do."\n\n- Surah Al-Baqarah 2:110`
      },
      whoNeeds: {
        title: 'Who Needs to Pay Zakat?',
        content: `Each year, eligible Muslim who are adult, of sound mind, and you've held wealth that reaches or exceeds the nisab for a full Hijri year, then yes, Zakat is part of your obligation.\n\nIt's a beautiful responsibility that connects your heart to the Ummah and your wealth to a greater purpose.`
      },
      whatCounts: {
        title: 'What Counts as Zakatable Wealth',
        items: [
          'Cash and bank savings',
          'Gold and silver (including jewellery)',
          "Money you've lent to others",
          'Investments and shares',
          'Business inventory or trade goods',
          'Agricultural produce (with conditions)'
        ]
      },
      when: {
        title: 'When Do I Pay Zakat?',
        content: `You pay Zakat when:\n\nYour wealth reaches or exceeds the nisab\n\nYou've held that wealth for one full lunar year`
      },
      howToCalculate: {
        title: 'How to Calculate Zakat',
        steps: [
          'List all your zakatable assets (cash, gold, silver, business stock, receivables)',
          'Subtract short-term debts (due within the year)',
          'Check if the total meets the nisab.',
          'Pay 2.5% on that amount'
        ],
        note: 'Our calculator takes the guesswork out, it updates automatically based on gold and silver prices in Australia.'
      },
      nisab: {
        title: 'What Is the Nisab Threshold?',
        content: `The nisab is the minimum wealth required before Zakat becomes due. It's currently based on:\n\n85g of gold OR\n\n595g of silver\n\nTo prioritise the needs of the poor, scholars recommend using the silver nisab. Our calculator auto-updates the nisab value using current Australian market rates to ensure your Zakat is calculated correctly.`
      },
      where: {
        title: 'Where Does Your Zakat Go?',
        content: `Your Zakat is distributed through verified, Shariah-compliant programs that include:\n\nEmergency food and shelter\n\nOrphan support\n\nMedical assistance\n\nClean water\n\nEducation and sustainable solutions\n\nWe serve vulnerable communities across the globe to reach the most vulnerable communities.`
      },
      whyCalculator: {
        title:
          "Why Use Khitat Al-Ihsan Charity Association's Zakat Calculator?",
        items: [
          'Simple & Fast: User-friendly, mobile-ready',
          'Customisable: Add debts, investments, gold, and more',
          'Shariah-Compliant: Built with Islamic guidance',
          'Live Updates: Reflects daily gold/silver rates',
          'Secure Giving: Donate online with full confidence'
        ]
      },
      whyChoose: {
        title: 'Why Choose Khitat Al-Ihsan Charity Association?',
        content: `At Khitat Al-Ihsan Charity Association, we treat your Zakat as an amanah (trust).\n\nThat means:\n\nShariah-compliant processes\n\nClear reporting and project tracking\n\nGlobal reach, local impact\n\nSupervised by trusted scholars\n\nZakat is kept separate from other funds\n\nYou give with sincerity. We deliver with Ihsan (excellence).`
      },
      importance: {
        title: 'Why Is Zakat al-Maal So Important?',
        content: `Zakat isn't just numbers - it's a reflection of your gratitude to Allah ﷺ, your love for the Ummah, and your commitment to justice.\n\nBy giving Zakat, you help break cycles of poverty, empower families to stand on their feet, and support those facing hardship with dignity. It also serves as a shield for your wealth, protecting it from misfortune and increasing it through barakah.`
      },
      impact: {
        title: 'Real-World Impact of Your Zakat',
        content: `When you give your Zakat through Khitat Al-Ihsan Charity Association, it reaches the hearts that need it most. You give:\n\nA widow the means to feed her children with dignity\n\nAn elderly person the independence they deserve\n\nA refugee family the safety and privacy of a home\n\nAn orphan the opportunity to learn, grow, and dream\n\nAn entire village access to clean, life-saving water\n\nEvery dollar is used with intention, turning your 2.5% into food, medicine, shelter, and hope. It's more than aid. Its dignity restored.`
      },
      mercy: {
        title: 'The Mercy in Zakat',
        content: `Allah ﷺ did not make Zakat without wisdom. It purifies the soul from greed. It protects communities from inequality, and uplifts the hearts of those facing the weight of poverty.\n\nThe Prophet ﷺ said, 'Whoever pays the Zakat on his wealth will have its evil removed from him' - Ibn Majah.\n\nZakat isn't just a duty. It's a mercy.`
      },
      commitment: {
        title: 'Zakat is a Lifelong Commitment',
        content: `Paying Zakat is not a once year task, it's a yearly commitment that transforms how we see wealth and community. It's an act of ongoing worship that ties your rizq to your responsibility.\n\nWhen you give Zakat, you don't just follow a commandment, you live a value. And you become part of a global network of believers upholding the rights of the poor.`
      },
      calculate: {
        title: 'Calculate Your Zakat Al- Maal',
        content: `Use our calculator above to work out your Zakat and fulfill your obligation today.\n\nYour Zakat transforms lives. Support our programs and help us reach more people in need.`
      },
      changesLives: {
        title: 'Zakat Al Maal Changes Lives',
        content:
          'Your Zakat is lifeline. From as little as $100, you can help feed families, provide clean water, and empower communities in need.'
      }
    },
    ar: {
      heading: 'أدِّ واجبك وطهِّر مالك',
      whatIs: {
        title: 'ما هي زكاة المال؟',
        content: `الزكاة هي أحد أركان الإسلام الخمسة. ليست مجرد شكل من أشكال العطاء، بل هي فريضة إلهية تُطهِّر أموالنا وتنهض بالفقراء والمحتاجين.\n\nزكاة المال تجب على المال الذي يُملك حولاً قمرياً كاملاً، فإذا بلغ النصاب تُدفع بنسبة 2.5%.\n\nالزكاة ليست مجرد أموال، بل هي عدل ورحمة ورفعة لأمة الإسلام.\n\nقال الله ﷻ:\n"وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ إِنَّ اللَّهَ بِمَا تَعْمَلُونَ بَصِيرٌ"\n(البقرة: 110)`
      },
      whoNeeds: {
        title: 'من يجب عليه دفع الزكاة؟',
        content: `كل مسلم بالغ عاقل، يملك مالاً يبلغ النصاب ويحول عليه الحول القمري، تجب عليه الزكاة كل عام.\n\nإنها مسؤولية جميلة تربط قلبك بالأمة، ومالك بهدف أسمى.`
      },
      whatCounts: {
        title: 'ما الذي يُعد من الأموال الخاضعة للزكاة؟',
        items: [
          'النقود والمدخرات البنكية',
          'الذهب والفضة (بما في ذلك الحُلي)',
          'الأموال المُعارة للغير',
          'الاستثمارات والأسهم',
          'البضائع التجارية',
          'المحاصيل الزراعية (بشروطها)'
        ]
      },
      when: {
        title: 'متى أدفع الزكاة؟',
        content: `تدفع الزكاة عندما:\n\nيبلغ مالك النصاب أو يزيد عنه\n\nيمر عام هجري كامل على هذا المال`
      },
      howToCalculate: {
        title: 'كيف أحسب زكاتي؟',
        steps: [
          'اجمع كل أصولك الخاضعة للزكاة (نقد، ذهب، فضة، بضائع تجارية، ديون لك عند الآخرين)',
          'اطرح الديون القصيرة الأجل (الواجبة خلال سنة)',
          'تحقق إن كان المجموع يبلغ النصاب',
          'ادفع 2.5% من هذا المبلغ'
        ],
        note: 'حاسبتنا الإلكترونية تزيل عنك العناء، وتُحدّث تلقائياً وفق أسعار الذهب والفضة في أستراليا.\n\nولمصلحة الفقراء، يوصي العلماء باعتماد نصاب الفضة. حاسبتنا تُحدِّث النصاب يومياً وفق الأسعار المحلية لتضمن صحة حساب الزكاة.'
      },
      nisab: {
        title: 'ما هو النصاب؟',
        content: `النصاب هو الحد الأدنى للثروة المطلوبة قبل أن تجب الزكاة. يعتمد حالياً على:\n\n85 جرام من الذهب أو\n\n595 جرام من الفضة`
      },
      where: {
        title: 'أين تذهب زكاتك؟',
        content: `زكاتك تُوزع من خلال برامج موثوقة ومتوافقة مع الشريعة، تشمل:\n\nالغذاء والمأوى في حالات الطوارئ\n\nدعم الأيتام\n\nالمساعدات الطبية\n\nتوفير المياه النظيفة\n\nالتعليم والحلول المستدامة\n\nنخدم المجتمعات الأشد ضعفاً حول العالم للوصول إلى الأكثر حاجة.`
      },
      whyCalculator: {
        title: 'لماذا تستخدم حاسبة الزكاة من مؤسسة الإحسان؟',
        items: [
          'سريعة وبسيطة: سهلة الاستخدام ومتوافقة مع الهواتف',
          'مرنة: يمكنك إضافة الديون والاستثمارات والذهب وغيرها',
          'متوافقة مع الشريعة: بُنيت وفق التوجيهات الإسلامية',
          'مُحدّثة يومياً: مرتبطة بأسعار الذهب والفضة الحية',
          'آمنة: يمكنك التبرع بثقة واطمئنان'
        ]
      },
      whyChoose: {
        title: 'لماذا تختار مؤسسة الإحسان؟',
        content: `في مؤسسة الإحسان، نعتبر زكاتك أمانة.\n\nوهذا يعني:\n\nعمليات متوافقة مع الشريعة\n\nتقارير واضحة ومتابعة دقيقة للمشاريع\n\nأثر عالمي مع نتائج محلية\n\nإشراف من علماء ثقات\n\nفصل أموال الزكاة عن غيرها\n\nأنت تعطي بإخلاص، ونحن نُسلم بإحسان.`
      },
      importance: {
        title: 'لماذا زكاة المال مهمة جداً؟',
        content: `الزكاة ليست مجرد أرقام، بل انعكاس لشكر الله ﷻ، وحب الأمة، والالتزام بالعدل.\n\nبدفع الزكاة، تساهم في كسر حلقات الفقر، وتمكين الأسر، ودعم المحتاجين بكرامة. كما تحمي مالك وتزيده بالبركة.`
      },
      impact: {
        title: 'أثر زكاتك في العالم الواقعي',
        content: `زكاتك تصل إلى القلوب الأكثر حاجة. فأنت تمنح:\n\nأرملة القدرة على إطعام أطفالها بكرامة\n\nمسناً الاستقلالية التي يستحقها\n\nأسرة لاجئة الأمان والخصوصية\n\nيتيماً فرصة للتعلم والنمو والحلم\n\nقرية بأكملها وصولاً إلى ماء نقي ينقذ حياتهم\n\nكل دولار يُصرف بنية صادقة، يحوّل 2.5% من مالك إلى طعام ودواء ومأوى وأمل. إنها ليست مجرد معونة، بل استعادة للكرامة.`
      },
      mercy: {
        title: 'رحمة الزكاة',
        content: `لم يفرض الله الزكاة عبثاً. فهي تُطهر النفس من الشح، وتقي المجتمع من التفاوت، وتنهض بالمحتاجين.\n\nقال النبي ﷺ: "من أدى زكاة ماله فقد ذهب عنه شره." – رواه ابن ماجه\n\nالزكاة ليست واجباً فقط، بل رحمة.`
      },
      commitment: {
        title: 'الزكاة التزام مدى الحياة',
        content: `دفع الزكاة ليس مهمة سنوية عابرة، بل التزام متجدد يغيّر نظرتنا للمال والمجتمع. إنها عبادة مستمرة تربط رزقك بمسؤوليتك.\n\nحين تدفع زكاتك، لا تكتفي بأداء أمر، بل تعيش قيمة، وتصبح جزءاً من شبكة عالمية من المؤمنين الذين ينهضون بحقوق الفقراء.`
      },
      calculate: {
        title: 'احسب زكاتك الآن',
        content: `استخدم الحاسبة أعلاه لحساب زكاتك وأدِّ واجبك اليوم.\n\nزكاتك تُغيّر الأرواح. ادعم برامجنا وساعدنا في الوصول إلى المزيد من المحتاجين.`
      },
      changesLives: {
        title: 'زكاة المال تُغيّر الأرواح',
        content:
          'زكاتك هي شريان حياة. من 100 دولار فقط، يمكنك المساعدة في إطعام الأسر، وتوفير المياه النظيفة، وتمكين المجتمعات المحتاجة.'
      }
    }
  }

  // Health & Medical Support Project Content
  const healthMedicalContent = {
    en: {
      intro: `1 in 6 people live with a disability worldwide. Your donation provides mobility aids, medicine, and essential healthcare to restore dignity and independence.`,
      globalCrisis: {
        title: 'The Global Disability Crisis',
        content: `According to the World Health Organisation (WHO), 1.3 billion people, 1 in 6 globally, live with a significant disability. That means millions of families struggle daily with barriers to health, mobility, and dignity.\n\nDisabilities take many forms:\n\nPhysical: mobility loss, paralysis, amputation\n\nSensory: blindness, hearing loss\n\nCognitive: developmental or learning difficulties\n\nChronic illness: long-term medical conditions\n\nFor too many, these conditions restrict education, employment, and even worship.`
      },
      howLimits: {
        title: 'How Disability Limits Daily Life',
        content: `Without the right support, people with disabilities face unimaginable struggles:\n\nConfined to a single room without a wheelchair\n\nMissing school or work because they cannot move independently\n\nParents carrying children long distances because there is no mobility aid\n\nFamilies forced to choose between food or medicine\n\nIn disadvantaged communities, the impact is even harsher. Hospitals are far away. Medicine is unaffordable. Wheelchairs are a luxury. Yet with the right support, these struggles can be eased.`
      },
      whatDonation: {
        title: 'What Your Donation Provides',
        content: `Through Khitat Al-Ihsan Charity Association's Health & Medical Appeal, we work with trusted partners to deliver life-changing aid where it is needed most.\n\nYour generosity provides:\n\nMobility Aids: wheelchairs, crutches, walkers\n\nEssential Medicine: treatment for chronic conditions\n\nSpecialised Care: equipment for those living with disability\n\nBasic Needs: food aid and financial assistance for vulnerable families\n\nAccess to Healthcare: helping families reach ongoing medical support\n\nEvery wheelchair donated, every prescription filled, every aid delivered is relief and dignity restored.`
      },
      whyMatters: {
        title: 'Why This Appeal Matters Now',
        content: `Globally, 80% of people with disabilities live in low- and middle-income countries (WHO). For many, disability means isolation and poverty. Children with disabilities are less likely to attend school, while adults struggle to find or keep work.\n\nThe cycle is devastating: disability deepens poverty, and poverty worsens disability. But your donation interrupts this cycle. It puts hope back in the hands of families who thought the world had forgotten them.`
      },
      faithAction: {
        title: 'Faith and Compassion in Action',
        content: `The Qur'an reminds us:\n"…And do good; indeed, Allah loves the doers of good." (2:195)\n\nAnd the Prophet ﷺ said:\n"Whoever relieves a believer's hardship of this world, Allah will relieve his hardship on the Day of Resurrection." - Muslim\n\nSupporting someone with a disability is not just aid; it is a form of worship. It is Sadaqah Jariyah, an ongoing charity that continues to bring reward with every step, every prayer, every smile made possible.`
      },
      realImpact: {
        title: 'Real Impact: From Struggle to Dignity',
        content: `When you give:\n\nA mother no longer has to carry her teenage son because he now has a wheelchair\n\nAn elderly father can move independently and rejoin his community at the masjid\n\nA child living with disability can attend school for the first time\n\nFamilies receive medicine that relieves pain and restores hope\n\nThese aren't small changes. They are life-changing moments, and you can be the one who makes them happen.`
      },
      howHelp: {
        title: 'How You Can Help',
        content: `Your donation can provide:\n\nA wheelchair for someone confined to bed\n\nEssential medicine for those who cannot afford treatment\n\nFood aid for families facing both illness and poverty\n\nEvery contribution counts. Whether you give once or set up monthly support, your generosity provides lasting relief.`
      },
      whyChoose: {
        title: 'Why Choose Khitat Al-Ihsan Charity Social Association?',
        content: `We treat your donation as an amanah (trust). That means:\n\nShariah-compliant processes\n\nTransparent reporting and accountability\n\nGlobal reach with local partners\n\nLife-changing aid delivered with dignity\n\nTogether, we have provided thousands of families with mobility aids, medical support, and essential care, but the need is growing every day.`
      },
      legacy: {
        title: 'Build a Legacy of Care',
        content: `Disability should never mean despair. Health should never be out of reach.\n\nWith your help, we can provide life-changing aid, wheelchairs, medicine, and medical support to families who are waiting for relief.\n\nDonate today, and be the reason someone stands, walks, and smiles again.`
      }
    },
    ar: {
      intro: `واحد من كل ستة أشخاص في العالم يعيش مع إعاقة. تبرعك يوفّر أجهزة تساعد على الحركة، أدوية، ورعاية صحية أساسية تعيد الكرامة والاستقلالية.`,
      globalCrisis: {
        title: 'أزمة الإعاقة العالمية',
        content: `وفقًا لمنظمة الصحة العالمية (WHO)، هناك 1.3 مليار شخص – أي واحد من كل ستة عالميًا – يعيشون مع إعاقة كبيرة. وهذا يعني أن ملايين العائلات تكافح يوميًا مع عوائق في الصحة، الحركة، والكرامة.\n\nتأخذ الإعاقات أشكالًا متعددة:\n\nجسدية: فقدان الحركة، الشلل، البتر\n\nحسية: العمى، فقدان السمع\n\nإدراكية: صعوبات في النمو أو التعلم\n\nأمراض مزمنة: حالات طبية طويلة الأمد\n\nبالنسبة لكثيرين، هذه الحالات لا تحدّ من الحركة فقط — بل تقيّد التعليم، والعمل، وحتى العبادة.`
      },
      howLimits: {
        title: 'كيف تحدّ الإعاقة من الحياة اليومية',
        content: `من دون الدعم المناسب، يواجه ذوو الإعاقة صعوبات لا يمكن تصورها:\n\nمحاصرون في غرفة واحدة لغياب الكرسي المتحرك\n\nتفويت المدرسة أو العمل لعدم القدرة على الحركة المستقلة\n\nآباء يحملون أبناءهم لمسافات طويلة لغياب وسيلة للمساعدة على الحركة\n\nعائلات مضطرة للاختيار بين شراء الطعام أو الدواء\n\nفي المجتمعات الفقيرة، يكون الأثر أشد قسوة. المستشفيات بعيدة. الأدوية باهظة الثمن. الكراسي المتحركة رفاهية. ومع ذلك، يمكن تخفيف هذه المعاناة بالدعم المناسب.`
      },
      whatDonation: {
        title: 'ما الذي يوفّره تبرعك؟',
        content: `من خلال حملة الصحة والدعم الطبي لجمعية خطط الإحسان الخيرية الاجتماعية، نعمل مع شركاء موثوقين لتقديم مساعدات تغيّر حياة الناس حيث الحاجة أشد.\n\nتبرعك السخي يوفّر:\n\nأجهزة مساعدة على الحركة: كراسي متحركة، عكازات، أدوات مساعدة\n\nأدوية أساسية: لعلاج الحالات المزمنة\n\nرعاية متخصصة: أجهزة خاصة لمن يعيشون مع إعاقة\n\nاحتياجات أساسية: مساعدات غذائية ودعم مالي للأسر الضعيفة\n\nالوصول إلى الرعاية الصحية: مساعدة العائلات على الحصول على علاج مستمر\n\nكل كرسي متحرك يُقدّم، كل وصفة دواء تُصرف، كل مساعدة تُسلّم ليست مجرد دعم — بل كرامة تُستعاد.`
      },
      whyMatters: {
        title: 'لماذا تهم هذه الحملة الآن؟',
        content: `على مستوى العالم، يعيش 80% من ذوي الإعاقة في البلدان منخفضة ومتوسطة الدخل (WHO). وبالنسبة لكثيرين، تعني الإعاقة العزلة والفقر. الأطفال ذوو الإعاقة أقل احتمالًا للالتحاق بالمدرسة، بينما يعاني الكبار لإيجاد عمل أو الاحتفاظ به.\n\nإنها حلقة مدمرة: الإعاقة تعمّق الفقر، والفقر يزيد من حدة الإعاقة. لكن تبرعك يوقف هذه الحلقة. إنه يضع الأمل بين يدي العائلات التي ظنت أن العالم قد نسيها.`
      },
      faithAction: {
        title: 'الإيمان والرحمة في العمل',
        content: `يذكرنا القرآن الكريم:\n{وَأَحْسِنُوا إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ} (البقرة: 195)\n\nوقال النبي ﷺ:\n"مَن نفَّسَ عن مؤمن كُربةً من كُرَبِ الدنيا، نفَّسَ الله عنه كُربةً من كُرَبِ يومِ القيامة." (رواه مسلم)\n\nمساندة شخص من ذوي الإعاقة ليست مجرد مساعدة — إنها عبادة. إنها صدقة جارية، يستمر أجرها مع كل خطوة، وكل دعاء، وكل ابتسامة تتحقق.`
      },
      realImpact: {
        title: 'أثر حقيقي: من معاناة إلى كرامة',
        content: `عندما تتبرع:\n\nلم تعد أم مضطرة لحمل ابنها المراهق لأنه أصبح لديه كرسي متحرك\n\nيستطيع أب مسن التحرك باستقلالية والعودة إلى مجتمعه في المسجد\n\nطفل من ذوي الإعاقة يتمكن من الذهاب إلى المدرسة لأول مرة\n\nعائلات تحصل على أدوية تخفف الألم وتعيد الأمل\n\nهذه ليست تغييرات بسيطة. إنها لحظات تغيّر الحياة — ويمكنك أن تكون السبب فيها.`
      },
      howHelp: {
        title: 'كيف يمكنك المساعدة؟',
        content: `تبرعك يمكن أن يوفّر:\n\nكرسي متحرك واحد لمن حُصر في السرير\n\nدواء أساسي لمن لا يستطيع تحمّل تكاليف العلاج\n\nمساعدات غذائية للأسر التي تواجه المرض والفقر معًا\n\nكل مساهمة تحدث فرقًا. سواء تبرعت مرة واحدة أو دعمت شهريًا، فإن سخاءك يوفّر راحة دائمة.`
      },
      whyChoose: {
        title: 'لماذا تختار جمعية خطط الإحسان الخيرية الاجتماعية؟',
        content: `نحن نتعامل مع تبرعك كأمانة. وهذا يعني:\n\nعمليات متوافقة مع الشريعة\n\nتقارير شفافة ومحاسبة واضحة\n\nوصول عالمي من خلال شركاء محليين\n\nمساعدات تغيّر حياة الناس وتُقدّم بكرامة\n\nمعًا، قدّمنا آلاف الكراسي المتحركة، والدعم الطبي، والرعاية الأساسية للأسر، لكن الحاجة تزداد يومًا بعد يوم.`
      },
      legacy: {
        title: 'ابنِ إرثًا من الرعاية',
        content: `يجب ألا تعني الإعاقة اليأس. ولا ينبغي أن تكون الصحة بعيدة المنال.\n\nبمساعدتك، يمكننا توفير دعم يغيّر الحياة — كراسي متحركة، أدوية، ورعاية طبية — للأسر التي تنتظر الفرج.\n\nتبرع اليوم، وكن السبب في أن يقف شخص، أو يمشي، أو يبتسم من جديد.`
      }
    }
  }

  // Feed the Needy Project Content
  const feedTheNeedyContent = {
    en: {
      intro: `Despite a world that produces more than enough food, 345 million people face severe food insecurity.`,
      whyStarving: {
        title: 'Why Are People Still Starving?',
        content: `It's not just a lack of food, it's about access and distribution.\n\nPoverty & Inequality: Food is available, but millions can't afford it. Hunger becomes a daily struggle when families don't have the means to buy even basic staples.\n\nConflict & Displacement: Wars destroy farms, disrupt supply chains, and force families to leave their livelihoods behind. Without stable income or resources, people are left without food.\n\nClimate Change: Droughts, floods, and extreme weather events destroy crops, leaving communities without reliable food sources.\n\nEconomic Struggles: Inflation makes basic food items too expensive, pushing families into deeper food insecurity.\n\nFor many, one lost job, one bad season, or one crisis can mean the difference between eating and going hungry.`
      },
      malnutrition: {
        title: 'Malnutrition in Children: The Silent Killer',
        content: `The most heartbreaking impact of hunger is on children. 148 million children under five suffer from stunted growth due to malnutrition.\n\nA child dies from malnutrition every 10 seconds.\n\nWhen a child is malnourished, their body starts to break down. Their immune system weakens, and their brain development slows, making learning hard.\n\nMalnutrition isn't just about hunger; it's a lack of nutrients that leads to:\n\nStunting: Permanent effects on a child's growth, leading to lifelong health issues.\n\nWasting: Extreme weight loss leaves children weak and vulnerable to infections and diseases.\n\nMicronutrient Deficiencies: A lack of vitamins like iron and vitamin A can cause blindness, anemia, and even death.\n\nCan you imagine a mother watching her child fade away, knowing she has nothing left to give? No parent should ever feel this pain.`
      },
      howHelp: {
        title: 'How Can We Help?',
        content: `We can't just talk about hunger; we need to act.\n\nFeed a Family– A small donation provides hot meals and essential food supplies to those in need.\n\nSupport Nutrition Programs - It's not just about filling stomachs; it's about providing proper nutrients for healthy growth.\n\nAdvocate for Change – Raising awareness and supporting food security policies helps fight hunger at its root.\n\nDonate Regularly – Consistent support means families are never left without food.`
      },
      monthlyGiving: {
        title:
          'Make Your Giving Last: Provide Stability Through Monthly Donations',
        content: `Hunger doesn't stop after one meal, nor should our help. Committing to monthly giving ensures that families in crisis receive consistent access to food and essential supplies.\n\nSustained support allows us to plan more effectively, ensuring that vulnerable communities are never left without aid. Whether it's $10 or $100 a month, your recurring donation provides security, dignity, and hope to those who need it most.\n\nJoin our family of monthly supporters and make your impact last. Together, we can build a hunger-free future.`
      },
      beTheReason: {
        title: 'Be the Reason Someone Gets to Eat',
        content: `Just one meal can mean the world to a hungry child, and just one donation can help a struggling family survive.\n\nKhitat Al-Ihsan Charity Association is committed to feeding the needy globally. With your help, we provide meals, staples, and essential support to the most vulnerable.\n\nYou Can Make a Difference\n\nWhen you give, you're not just donating, you're providing hope, dignity, and relief.\n\nYour support means everything. Help end hunger today.`
      }
    },
    ar: {
      intro: `رغم أن العالم ينتج ما يكفي من الغذاء للجميع، إلا أن 345 مليون شخص يواجهون انعداماً حاداً في الأمن الغذائي.`,
      whyStarving: {
        title: 'لماذا لا يزال الناس يتضورون جوعاً؟',
        content: `المشكلة ليست قلة الطعام، بل في الوصول والتوزيع:\n\nالفقر وعدم المساواة: الطعام متوفر، لكن ملايين لا يستطيعون شراءه. الجوع يصبح معركة يومية عندما تعجز العائلات عن شراء أبسط الأساسيات.\n\nالنزاع والنزوح: الحروب تدمر المزارع، وتقطع سلاسل الإمداد، وتجبر الأسر على ترك مصادر رزقها. النتيجة: بلا دخل ولا غذاء.\n\nتغير المناخ: الجفاف والفيضانات والطقس القاسي يدمر المحاصيل ويترك المجتمعات بلا مصدر غذاء ثابت.\n\nالأزمات الاقتصادية: التضخم يجعل المواد الغذائية الأساسية بعيدة المنال، مما يدفع العائلات إلى جوع أشد.\n\nبالنسبة للكثيرين، وظيفة مفقودة واحدة، أو موسم سيئ واحد، أو أزمة واحدة، قد تعني الفرق بين الأكل والجوع.`
      },
      malnutrition: {
        title: 'سوء التغذية لدى الأطفال: القاتل الصامت',
        content: `أقسى آثار الجوع تُرى عند الأطفال:\n\n148 مليون طفل تحت سن الخامسة يعانون من التقزّم بسبب سوء التغذية.\n\nيموت طفل كل 10 ثوانٍ بسبب الجوع وسوء التغذية.\n\nسوء التغذية لا يعني فقط الجوع، بل نقص المغذيات الأساسية، مما يؤدي إلى:\n\nالتقزّم: ضعف النمو الدائم ومشكلات صحية مدى الحياة.\n\nالهزال: فقدان شديد للوزن يجعل الأطفال ضعفاء وعرضة للأمراض.\n\nنقص المغذيات الدقيقة: مثل نقص الحديد أو فيتامين A، يسبب العمى، فقر الدم، وقد يؤدي للوفاة.\n\nتخيّل أماً تشاهد طفلها يذبل أمام عينيها، وهي تعلم أنها لم يعد لديها ما تقدمه له. لا ينبغي لأي والد أن يعيش هذا الألم.`
      },
      howHelp: {
        title: 'كيف يمكننا المساعدة؟',
        content: `لا يكفي أن نتحدث عن الجوع — علينا أن نتحرك:\n\nإطعام أسرة: تبرع صغير يوفر وجبات ساخنة ومواد غذائية أساسية.\n\nدعم برامج التغذية: ليس فقط ملء البطون، بل تزويد الأطفال بما يحتاجونه للنمو الصحي.\n\nالمناصرة للتغيير: رفع الوعي ودعم سياسات الأمن الغذائي يعالج جذور المشكلة.\n\nالتبرع الدوري: الدعم المستمر يضمن أن الأسر لن تبقى بلا غذاء.`
      },
      monthlyGiving: {
        title: 'اجعل عطاؤك يدوم: استقرار عبر التبرع الشهري',
        content: `الجوع لا يتوقف بعد وجبة واحدة، وكذلك يجب ألا يتوقف عطاؤنا.\n\nالالتزام بالتبرع الشهري يضمن للأسر وصولاً ثابتاً للغذاء والإمدادات الأساسية. هذا الدعم المستمر يمكّننا من التخطيط بشكل أفضل حتى لا تُترك المجتمعات الضعيفة بلا عون.\n\nسواء كان 10 دولارات أو 100 دولار شهرياً، تبرعك المتكرر يوفر الأمان والكرامة والأمل.\n\nانضم إلى عائلة المتبرعين الشهريين واجعل أثرك دائماً. معاً، يمكننا بناء مستقبل بلا جوع.`
      },
      beTheReason: {
        title: 'كن السبب في أن يأكل شخص جائع',
        content: `وجبة واحدة قد تعني العالم لطفل جائع، وتبرع واحد قد ينقذ أسرة تكافح للبقاء.\n\nمؤسسة الإحسان ملتزمة بإطعام المحتاجين حول العالم. بدعمك، نوفر وجبات، ومؤن أساسية، ورعاية للفئات الأكثر ضعفاً.\n\nيمكنك أن تصنع فرقاً\n\nعندما تتبرع، فأنت لا تعطي مالاً فحسب، بل تمنح أملاً وكرامة وراحة.\n\nدعمك يعني الكثير. ساعدنا اليوم على إنهاء الجوع.`
      }
    }
  }

  // Gaza Emergency Project Content
  const gazaEmergencyContent = {
    en: {
      intro: `Gaza is living through one of the worst man-made humanitarian crises of our time. Relentless bombardment has destroyed homes, hospitals, schools, and farmland. Families who have already lost everything are being pushed into smaller and smaller corners of the strip, squeezed into overcrowded shelters with no food, no water, and no dignity.\n\nThe UN has confirmed famine in Gaza. Hunger is no longer a risk — it is a deadly reality. Children are starving, hospitals are collapsing without medicine or fuel, and more than 1.9 million people have been forcibly displaced multiple times.\n\nAmid this devastation, Khitat Al-Ihsan Charity Social Association is still delivering life-saving aid. Your donation today provides bread, hot meals, clean water, shelter, and emergency relief directly to families in Gaza.\n\nThe Prophet ﷺ said: "Whoever relieves a believer's hardship, Allah will relieve his hardship on the Day of Judgment." - Sahih Muslim`,
      whatsHappening: {
        title: "What's Happening in Gaza",
        content: `According to OCHA and the World Health Organisation (WHO):\n\nAlmost every home in Gaza is damaged or destroyed\n\n88% of schools have been wiped out\n\nHalf of hospitals are bombed or shut down\n\n68% of farmland and vital road networks are gone\n\nMore than 1.9 million people are displaced, many sleeping in the open\n\nThis is Gaza today. Entire neighbourhoods reduced to rubble. Families pushed from north to south with nowhere safe to go. Mothers unable to feed their children. Children too weak to walk.`
      },
      howWeDeliver: {
        title: 'How We Deliver Aid in Gaza',
        content: `Khitat Al-Ihsan Charity Social Association works with trusted local partners inside Gaza. These are people who have been serving their communities for years. They know the terrain, work under fire, and deliver aid with dignity and accountability.\n\nHere's how your donations reach families despite blockades and bombardment:\n\nRapid response: funds are kept ready for immediate purchase of food and water inside Gaza\n\nLocal sourcing: aid is procured directly in Gaza where possible, bypassing blocked borders\n\nCommunity embedded: our partners live among the people they serve, ensuring aid reaches the most vulnerable\n\nAccountability: distributions are GPS-tagged, photographed, and reported back\n\nThis is not aid promised. This is aid delivered.`
      },
      whatDonationSupports: {
        title: 'What Your Donation Supports',
        content: `Your generosity keeps families alive through projects already underway in Gaza:\n\nBread Distribution – fresh loaves baked and delivered daily to families with nothing left to eat\n\nHot Meals – community kitchens serving warm, culturally familiar meals in displacement camps\n\nWater Relief – 1,000L water trucks and tanks delivered north and south\n\nEmergency Aid – essential food packs, clothing, blankets, and shelter support for displaced families\n\nDeep Water Wells – two wells already built in Khan Younis, with funding for the next underway`
      },
      whyWeNeedYou: {
        title: 'Why We Need You',
        content: `Every minute counts. Prices of flour, oil, and water have skyrocketed, and when supplies appear, they must be purchased immediately. Being ready is the only way to save lives.\n\nYour donation means:\n\nA child receives bread tonight instead of sleeping hungry\n\nA family shares a hot meal in the midst of displacement\n\nFamilies have clean water to drink, wash, and survive\n\nEntire communities access long-term clean water through deep wells\n\nThe Prophet ﷺ said: "The believers, in their mutual love and compassion, are like one body. If one part aches, the whole body suffers." - Bukhari\n\nThis is our ummah. They are hurting. We must respond.`
      },
      howYouCanHelp: {
        title: 'How You Can Help',
        content: `Your sadaqah today provides life-saving relief:\n\n$20 = 10 loaves of bread baked and delivered\n\n$36 = 5 hot meals from our community kitchens\n\n$250 = 1,000L Water Truck supplying clean water\n\nDonate now. Stand with Gaza. Be the reason a family survives receives life saving aid.`
      }
    },
    ar: {
      intro: `غزة تعيش واحدة من أسوأ الأزمات الإنسانية من صنع الإنسان في عصرنا. القصف المتواصل دمّر البيوت والمستشفيات والمدارس والأراضي الزراعية. العائلات التي فقدت كل شيء تُدفع إلى زوايا أصغر فأصغر من القطاع، محشورة في ملاجئ مكتظة بلا طعام، بلا ماء، وبلا كرامة.\n\nالأمم المتحدة أكدت وقوع المجاعة في غزة. الجوع لم يعد خطرًا — بل أصبح واقعًا مميتًا. الأطفال يتضورون جوعًا، المستشفيات تنهار بلا دواء أو وقود، وأكثر من 1.9 مليون شخص نزحوا قسريًا عدة مرات.\n\nوسط هذا الدمار، تواصل جمعية خطط الإحسان الخيرية الاجتماعية تقديم المساعدات المنقذة للحياة. تبرعك اليوم يوفّر الخبز، الوجبات الساخنة، المياه النظيفة، المأوى، والإغاثة الطارئة مباشرة للعائلات في غزة.\n\nقال النبي ﷺ:\n"مَن نفَّسَ عن مؤمن كُربةً من كُرَبِ الدنيا، نفَّسَ الله عنه كُربةً من كُرَبِ يوم القيامة."\n– صحيح مسلم`,
      whatsHappening: {
        title: 'ما الذي يحدث في غزة؟',
        content: `وفقًا لمكتب الأمم المتحدة لتنسيق الشؤون الإنسانية (OCHA) ومنظمة الصحة العالمية (WHO):\n\nتقريبًا كل بيت في غزة تضرر أو دُمِّر\n\n88% من المدارس دُمِّرت بالكامل\n\nنصف المستشفيات تم قصفها أو إغلاقها\n\n68% من الأراضي الزراعية وشبكات الطرق الحيوية زالت\n\nأكثر من 1.9 مليون شخص مشرّدون، وكثير منهم ينامون في العراء\n\nهذه هي غزة اليوم. أحياء كاملة تحوّلت إلى أنقاض. عائلات دُفعت من الشمال إلى الجنوب دون مكان آمن. أمهات غير قادرات على إطعام أطفالهن. أطفال ضعفاء لدرجة لا يستطيعون معها المشي.`
      },
      howWeDeliver: {
        title: 'كيف نوصّل المساعدات داخل غزة؟',
        content: `تعمل جمعية خطط الإحسان الخيرية الاجتماعية مع شركاء محليين موثوقين داخل غزة. هؤلاء أناس يخدمون مجتمعاتهم منذ سنوات، يعرفون الأرض، يعملون تحت القصف، ويوصلون المساعدات بكرامة ومصداقية.\n\nهكذا تصل تبرعاتكم رغم الحصار والقصف:\n\nاستجابة سريعة: الأموال جاهزة لشراء الطعام والماء فورًا داخل غزة\n\nتأمين محلي: يتم شراء المساعدات مباشرة من داخل غزة حيثما أمكن، لتجاوز المعابر المغلقة\n\nتَوَغُّل مجتمعي: شركاؤنا يعيشون بين الناس الذين يخدمونهم، لضمان وصول المساعدات للأكثر ضعفًا\n\nالمساءلة: التوزيعات موثّقة بالصور، محددة المواقع GPS، ويُرفع تقرير عنها\n\nهذه ليست وعودًا بالمساعدة. هذه مساعدة تصل فعليًا.`
      },
      whatDonationSupports: {
        title: 'ماذا يدعم تبرعك؟',
        content: `كرمك يُبقي العائلات على قيد الحياة من خلال مشاريعنا الجارية في غزة:\n\nتوزيع الخبز – أرغفة طازجة تُخبز وتُوزع يوميًا للعائلات التي لا تجد شيئًا لتأكله\n\nوجبات ساخنة – مطابخ مجتمعية تقدّم وجبات دافئة ومألوفة في مخيمات النزوح\n\nمياه نظيفة – شاحنات وصهاريج مياه 1000 لتر توصل للشمال والجنوب\n\nإغاثة طارئة – طرود غذائية، ملابس، بطانيات، ودعم للمأوى للعائلات النازحة\n\nآبار مياه عميقة – بئرين بُنيا بالفعل في خان يونس، والتمويل جارٍ للبئر القادم`
      },
      whyWeNeedYou: {
        title: 'لماذا نحتاجك الآن؟',
        content: `كل دقيقة مهمة. أسعار الدقيق والزيت والماء ارتفعت بشكل هائل، وعندما تتوفر الإمدادات يجب شراؤها فورًا. الاستعداد هو الطريقة الوحيدة لإنقاذ الأرواح.\n\nتبرعك يعني:\n\nطفل يتناول خبزًا الليلة بدلًا من النوم جائعًا\n\nأسرة تتشارك وجبة ساخنة وسط النزوح\n\nعائلات تملك مياهًا نظيفة للشرب والغسل والبقاء\n\nمجتمعات كاملة تحصل على مياه آمنة طويلة الأمد عبر الآبار العميقة\n\nقال النبي ﷺ:\n"مَثَلُ المؤمنين في توادِّهم وتراحُمِهم وتعاطُفِهم مثلُ الجسد، إذا اشتكى منه عضوٌ تداعى له سائرُ الجسد بالسهر والحُمّى."\n– رواه البخاري\n\nهذه هي أمتنا. إنهم يتألمون. ويجب أن نلبي النداء.`
      },
      howYouCanHelp: {
        title: 'كيف يمكنك المساعدة؟',
        content: `صدقتك اليوم توفّر إغاثة منقذة للحياة:\n\n20 دولارًا = 10 أرغفة خبز تُخبز وتُوزع\n\n36 دولارًا = 5 وجبات ساخنة من مطابخنا المجتمعية\n\n250 دولارًا = شاحنة مياه 1000 لتر توصل مياه نظيفة\n\nتبرع الآن. قف مع غزة. كن السبب في بقاء أسرة على قيد الحياة.`
      }
    }
  }

  // Lebanon Community Kitchen Project Content
  const lebanonCommunityKitchenContent = {
    en: {
      intro: `In Tripoli and northern Lebanon, thousands rely on just daily hot meal meals. With your support, we're cooking, packing, and delivering fresh food to orphans, refugees, the elderly, and families struggling through crisis.`,
      whyLebanon: {
        title: 'Why Lebanon Needs Food Aid',
        content: `Lebanon is facing one of the world's worst economic crises in modern history. More than 80% of the population lives in poverty, and over 3.7 million people need food assistance(2024).\n\nThe Lebanese lira has lost over 98% of its value, prices have soared, and families are being forced to go without bare essentials. In the hardest-hit regions, food insecurity is now part of daily life.\n\n9 in 10 Syrian refugees live in extreme poverty\n\n80% of Palestinian refugees are below the national poverty line\n\n44% of all Lebanese now live below the poverty line\n\nIn these communities, a hot meal is a lifeline.`
      },
      whatIsLCK: {
        title: 'What Is the Lebanon Community Kitchen?',
        content: `The Lebanon Community Kitchen (LCK) is a fully equipped commercial kitchen based in Tripoli, serving some of the most vulnerable areas across northern Lebanon.\n\nOperating daily, the LCK:\n\nPrepares, packs, and delivers up to 500 fresh hot meals a day\n\nFollows strict food safety, hygiene, and efficiency protocols\n\nUses locally sourced ingredients to support Lebanese farmers and suppliers\n\nThis is a community-led response to hunger, built on dignity, quality, and consistency.`
      },
      whoWeServe: {
        title: 'Who We Serve',
        content: `Your support helps us feed:\n\nOrphans in orphanages\n\nElderly residents in nursing homes\n\nDisplaced Palestinian and Syrian refugees\n\nSingle mothers and families in urban slums and camps\n\nPeople with disabilities and the chronically ill\n\nMany of the families we serve live in shelters, with no income, no access to regular meals, and no safety net.\n\nIn these conditions, one cooked meal a day can mean the difference between despair and dignity.`
      },
      whereWeWork: {
        title: 'Where We Work in Northern Lebanon',
        content: `Al‑Ihsan Foundation prioritises the most underserved and vulnerable regions, including:\n\nTripoli\n\nBaddawi Refugee Camp\n\nBhanin, Mina, Souk Dahab\n\nAkkar\n\nWe deliver to local orphanages, masjids, and nursing homes to ensure hot meals reach those who need them most.`
      },
      ourImpact: {
        title: 'Our Impact to Date',
        content: `Thousands of hot meals served\n\n7+ regions across northern Lebanon\n\nLong-term partners in community networks\n\nBuilt employment and volunteer opportunities\n\nKitchen run by trained locals following top hygiene standards\n\nThe LCK is building resilience and restoring hope.`
      },
      kitchenBuilt: {
        title: "A Kitchen That's Built to Serve",
        content: `Commercial-grade facilities with transparent glass-panel layout\n\nTemperature-controlled storage for hygiene and food safety\n\nEco-conscious waste and water systems\n\nBackup generators to maintain operations during outages\n\nPPE and food safety protocols for all kitchen staff\n\nWe deliver two daily meal types:\n\nStandard Pack: Nutritious main dish\n\nComprehensive Pack: Meal + bread, salad, dates, and yoghurt\n\nWe also scale our operations during Ramadan, winter, and emergencies, so families never go hungry during the most critical times.`
      },
      whyMatters: {
        title: 'Why This Project Matters',
        content: `Al‑Ihsan Foundation is committed to feeding the hungry with dignity.\n\n"If the one giving charity knew that his charity falls in the hand of Allah before the hand of the poor, the delight of the one giving would be more than the delight of the one taking."\n - Imam Ibn Al-Qayyim رحمه الله\n\nThis is a legacy of compassion that starts with you.`
      },
      giveGift: {
        title: 'Give the Gift of Food Today',
        content: `With your donation, we can continue to provide hot, wholesome meals for those who need it most. Whether it's one meal or 100, every dish you help deliver brings relief, hope, and the mercy of Allah ﷻ.\n\n$60 = 30 hot meal\n$120 = 60 meals\n$235 = 120 meals\n\nDonate today, and feed someone who hasn't eaten today.`
      }
    },
    ar: {
      intro: `في طرابلس وشمال لبنان، يعتمد الآلاف على وجبة ساخنة واحدة فقط يوميًا. بدعمكم، نقوم بطهي الطعام، وتغليفه، وتوصيله للأيتام، واللاجئين، وكبار السن، والعائلات التي تعاني من الأزمات.`,
      whyLebanon: {
        title: 'لماذا يحتاج لبنان إلى المساعدات الغذائية؟',
        content: `يعيش لبنان واحدة من أسوأ الأزمات الاقتصادية في التاريخ الحديث. أكثر من 80٪ من السكان يعيشون تحت خط الفقر، وأكثر من 3.7 مليون شخص بحاجة إلى مساعدات غذائية (2024).\n\nفقدت الليرة اللبنانية أكثر من 98٪ من قيمتها، وارتفعت الأسعار بشكل جنوني، وأُجبرت العائلات على التخلي عن أبسط الاحتياجات. في المناطق الأكثر تضررًا، أصبحت المعاناة من الجوع واقعًا يوميًا.\n\n9 من كل 10 لاجئين سوريين يعيشون في فقر مدقع\n\n80٪ من اللاجئين الفلسطينيين تحت خط الفقر\n\n44٪ من اللبنانيين يعيشون الآن تحت خط الفقر (البنك الدولي، 2024)\n\nفي مثل هذه الظروف، الوجبة الساخنة ليست رفاهية، بل هي طوق نجاة.`
      },
      whatIsLCK: {
        title: 'ما هو مطبخ لبنان المجتمعي؟',
        content: `مطبخ لبنان المجتمعي هو مطبخ تجاري مجهز بالكامل يقع في مدينة طرابلس، يخدم المناطق الأكثر ضعفًا واحتياجًا في شمال لبنان.\n\nيعمل المطبخ يوميًا ويقوم بـ:\n\nتحضير وتغليف وتوزيع حتى 500 وجبة ساخنة طازجة يوميًا\n\nالالتزام بمعايير صارمة في السلامة الغذائية والنظافة والكفاءة\n\nاستخدام مكونات محلية المصدر لدعم المزارعين والموردين اللبنانيين\n\nهذا المشروع ليس مجرد برنامج غذائي، بل استجابة يقودها المجتمع نفسه لمواجهة الجوع بكرامة وجودة واستمرارية.`
      },
      whoWeServe: {
        title: 'من نخدم؟',
        content: `بدعمكم، نقوم بإيصال الطعام إلى:\n\nالأيتام في دور الأيتام\n\nكبار السن في دور الرعاية\n\nاللاجئين الفلسطينيين والسوريين المهجرين\n\nالأمهات العازبات والعائلات في الأحياء الفقيرة والمخيمات\n\nذوي الإعاقة والمصابين بأمراض مزمنة\n\nالعديد من العائلات التي نخدمها تعيش في مساكن غير آمنة، بلا دخل، ولا وجبات منتظمة، ولا أي شبكة دعم.\n\nفي ظل هذه الظروف، قد تعني وجبة مطبوخة واحدة في اليوم الفرق بين اليأس والكرامة.`
      },
      whereWeWork: {
        title: 'أين نعمل في شمال لبنان؟',
        content: `تركز مؤسسة الإحسان على أكثر المناطق فقرًا وتهميشًا، بما في ذلك:\n\nطرابلس\n\nمخيم البداوي للاجئين\n\nبنين، المينا، سوق الذهب\n\nعكار\n\nنُوصل الوجبات الساخنة إلى دور الأيتام، المساجد، ودور الرعاية لنضمن أن تصل الوجبات إلى من هم في أمسّ الحاجة إليها.`
      },
      ourImpact: {
        title: 'أثرنا حتى الآن',
        content: `تم تقديم مئات الآلاف من الوجبات الساخنة\n\nنخدم أكثر من 7 مناطق في شمال لبنان\n\nعلاقات شراكة طويلة الأمد مع شبكات المجتمع المحلي\n\nوفرنا فرص عمل وتطوع\n\nيُدار المطبخ بواسطة فريق محلي مدرّب وفقًا لأعلى معايير النظافة والسلامة\n\nالمطبخ لا يوزع الطعام فحسب، بل يُعيد بناء الأمل والكرامة.`
      },
      kitchenBuilt: {
        title: 'مطبخ بُني لخدمة الناس',
        content: `معدات تجارية احترافية مع تصميم شفاف بزجاج مرئي\n\nمخازن مبردة لضمان النظافة وسلامة الأغذية\n\nأنظمة إدارة للنفايات والمياه تراعي البيئة\n\nمولدات احتياطية لضمان استمرارية العمل في حالات الانقطاع\n\nمعدات وقاية شخصية (PPE) ومعايير صارمة لسلامة الطاقم\n\nنقدم نوعين من الوجبات يوميًا:\n\nالوجبة الأساسية: طبق مغذي رئيسي\n\nالوجبة الشاملة: طبق رئيسي + خبز، سلطة، تمر، زبادي\n\nنضاعف عملياتنا خلال رمضان، الشتاء، وحالات الطوارئ، حتى لا تبقى أي عائلة جائعة في أوقات الحاجة الشديدة.`
      },
      whyMatters: {
        title: 'لماذا هذا المشروع مهم بالنسبة لنا؟',
        content: `تلتزم مؤسسة الإحسان بإطعام الجائعين بكرامة، وليس بالمنّ.\n\n"لو علم المتصدق أن صدقته تقع في يد الله قبل أن تقع في يد الفقير، لكان فرحه بالعطاء أعظم من فرح الفقير بالأخذ."\n - الإمام ابن القيم رحمه الله (مدارج السالكين ١/٢٦)\n\nهذا المشروع ليس مجرد عطاء، بل هو إرث من الرحمة يبدأ بك.`
      },
      giveGift: {
        title: 'قدّم هدية الطعام اليوم',
        content: `بتبرعك، سنواصل توفير وجبات ساخنة ومغذية لمن هم في أمسّ الحاجة إليها. سواء كانت وجبة واحدة أو مئة — كل طبق تُساهم به هو راحة، أمل، ورحمة من الله ﷻ.\n\n٩٠ دولار = ٣٠ وجبة ساخنة\n\n١٨٠ دولار = ٦٠ وجبة\n\n٣٦٠ دولار = ١٢٠ وجبة\n\nتبرّع اليوم — واطعم جائعًا لم يأكل منذ الأمس.`
      }
    }
  }

  // Water Wells Project Content
  const waterWellsContent = {
    en: {
      intro: `Donate a Water Well | Water Should Give Life, Not Take It\n\nFor 2.2 billion people, water is a source of sickness, suffering, and death.`,
      reality: {
        title: 'The Reality of Dirty Water Worldwide',
        content: `Every year, 3.4 million people die from waterborne diseases. Of these, over 505,000 deaths are caused by contaminated drinking water (World Health Organisation).\n\nNot from thirst or dehydration. But from the very water they drink.\n\nCholera can kill within hours if untreated. Dysentery brings unbearable pain. Typhoid spreads silently, weakening communities. Polio leaves children permanently disabled, all because of dirty water.`
      },
      childrenToll: {
        title: 'The Deadly Toll of Unsafe Water on Children',
        content: `Every single day, more than 1,000 children under five die from diseases linked to unsafe water and poor sanitation. That's over 85,700 young lives lost each year due to diarrhea diseases alone.\n\nFor these children, survival isn't about finding water, it's about surviving it.\n\nYour support can change that.`
      },
      whereWeBuild: {
        title: 'Where We Build Water Wells',
        content: `At Khitat Al-Ihsan Charity Association, your generosity brings safe water to families across three countries:\n\nSri Lanka – Shallow Water Wells: Built in rural villages where families rely on rivers.\n\nUganda – Deep Hand-Pumped Water Wells: A reliable source of clean water for villages where children walk hours to fetch unsafe water. 1,000 liter water tank + wudu station\n\nIndonesia – Deep Electric Water Wells with Wudu Stations: Equipped with taps and a 1,000-litre tank, serving families, schools and Masajid for drinking and ablution.\n\nEach well is built to last, bringing relief, dignity, and a legacy of Sadaqah Jariyah to those who give.`
      },
      cost: {
        title: 'How Much Does a Water Well Cost?',
        content: `Shallow Water Well - Sri Lanka: $358\n\nDeep Water Well - Uganda, hand-pumped: $1,040\n\nDeep Water Well - Indonesia, electric: $1,040\n\nDeep Water Well with Water Station: $1,755\n\nEvery contribution funds construction, testing, and safe use, ensuring families have access to clean water for years to come.`
      },
      sadaqahJariyah: {
        title: 'Water Wells as Sadaqah Jariyah: The Best Ongoing Charity',
        content: `The Prophet Muhammad ﷺ said:\n\n"The best charity is giving water to drink." - Ahmad, An-Nasa'i\n\nWater is sadaqah jariyah, a continuous charity. Every sip taken becomes a du'a, a mercy, and an ongoing reward for you and your loved ones.\n\nAllah ﷻ says:\n"We made from water every living thing…" - Surah Al-Anbiya 21:30\n\nBy giving water, you don't just quench thirst, you restore health, dignity, and life itself.`
      },
      buildLegacy: {
        title: 'Build Your Legacy with Clean Water Today',
        content: `Whether given in memory of a loved one, for sadaqah jariyah, or purely for Allah's sake, your water well saves lives and changes futures.\n\n💧 Sponsor a Water Well today, and let your sadaqah flow, drop by drop.`
      }
    },
    ar: {
      intro: `التبرع بآبار المياه | الماء يجب أن يمنح الحياة لا أن يسلبها\n\nومع ذلك، يواجه 2.2 مليار إنسان حول العالم معاناة ووفاة بسبب المياه الملوثة.`,
      bitterReality: {
        title: 'الواقع المرير للمياه الملوثة',
        content: `كل عام، يموت 3.4 مليون شخص بسبب أمراض منقولة عبر المياه. أكثر من 505,000 حالة وفاة سنوياً سببها مياه الشرب الملوثة (منظمة الصحة العالمية).\n\nليست المشكلة عطشاً أو جفافاً، بل من الماء نفسه الذي يشربونه.\n\nالكوليرا تقتل خلال ساعات.\nالزحار يحوّل كل رشفة إلى آلام مبرحة.\nالتيفوئيد يضعف المناعة بصمت.\nوشلل الأطفال يترك الأطفال بعاهات دائمة — كل ذلك بسبب الماء الملوث.`
      },
      childrenAffected: {
        title: 'الأطفال هم الأكثر تضرراً',
        content: `يموت أكثر من 1000 طفل يومياً تحت سن الخامسة بسبب المياه غير الآمنة وسوء الصرف الصحي. هذا يعني أكثر من 85,700 حياة صغيرة تُفقد سنوياً بسبب الأمراض المعوية وحدها.\n\nبالنسبة لهؤلاء الأطفال، البقاء ليس في العثور على الماء، بل في النجاة منه.`
      },
      whereWeBuild: {
        title: 'أين نبني آبار المياه: سريلانكا، أوغندا، إندونيسيا',
        content: `من خلال جمعية خطط الإحسان، تصل تبرعاتكم إلى ثلاث دول أساسية:\n\nسريلانكا – بئر سطحي ($358 USD): يوفر مياه الشرب الآمنة للقرى الريفية.\n\nأوغندا – بئر عميق بمضخة يدوية ($1040 USD): مصدر دائم وآمن للمياه للأسر التي كانت تعتمد على الأنهار الملوثة.\n\nإندونيسيا – بئر عميق كهربائي مع محطة وضوء ($1040+ USD): مجهز بخزان 1000 لتر وصنابير، يخدم العائلات والمساجد للشرب والوضوء.`
      },
      cost: {
        title: 'تكلفة حفر الآبار',
        content: `بئر سطحي في سريلانكا: $358 USD\n\nبئر عميق في أوغندا (مضخة يدوية): $1040 USD\n\nبئر عميق في إندونيسيا (كهربائي مع محطة وضوء): $1040+ USD\n\nبئر عميق مع محطة مياه: $1755 USD`
      },
      sadaqahJariyah: {
        title: 'الصدقة الجارية: أعظم صدقة هي سقي الماء',
        content: `قال النبي ﷺ: "أفضل الصدقة سقي الماء." (رواه أحمد والنسائي)\n\nالماء هو صدقة جارية. كل قطرة يشربها إنسان تصبح دعاءً ورحمةً وأجراً متجدداً لك ولأهلك.\n\nقال الله ﷻ: "وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ" (الأنبياء: 30)`
      },
      buildLegacy: {
        title: 'ابنِ أثراً يبقى بعدك',
        content: `تبرع بصدقة جارية، في ذكرى أحد أحبائك أو لوجه الله وحده. بئر واحد يمكن أن ينقذ حياة ويغير مصير أجيال كاملة.\n\nاكفل بئراً الآن ودع صدقتك تجري قطرة بقطرة.`
      }
    }
  }

  // Sadaqah Sacrifice Project Content
  const sadaqahSacrificeContent = {
    en: {
      intro: `Thank Allah ﷻ through Sadaqah Sacrifice while feeding families in need. Goat $88, Sheep $95, Waleemah $80.`,
      whatIsSadaqah: {
        title: 'What is Sadaqah Sacrifice?',
        content: `Sadaqah Sacrifice is one of the most heartfelt ways to thank Allah ﷻ for His countless blessings. This sacrifice is voluntary. It is done out of gratitude, whether after a safe journey, recovering from illness, moving into a new home, or simply reflecting on Allah's generosity in your life.\n\nAt Khitat Al-Ihsan Charity Social Association, we arrange your Sadaqah Sacrifice in Bangladesh, Uganda, and Lebanon. Families who rarely have the chance to eat meat will share in your offering, making your gratitude a source of nourishment and joy for those in hardship.`
      },
      whyPerform: {
        title: 'Why do Muslims Perform Sadaqah Sacrifice?',
        content: `\n\nGratitude to Allah ﷻ\n\nAllah ﷻ says:\n"So eat of the lawful and good food which Allah has provided for you, and be grateful for the favours of Allah, if it is Him you worship."\n- Qur'an, al-Nahl 16:114\n\nEvery sacrifice is a way of acknowledging His blessings and turning thankfulness into worship.\n\n\n\nSeeking Healing\n\nThe Prophet ﷺ said: "Treat your sick by means of charity."\n- Abu Dawood\n\nOffering a sacrifice for the sake of Allah ﷻ, with the intention that it serves as charity for the sick, can be a means of comfort, well-being, and ease from suffering.\n\nFeeding the Poor\n\nFor many families living in poverty, meat is a rare meal. Your sacrifice brings not just food, but dignity and happiness. The smiles of children, the relief of mothers, and the duas of elders are the unseen blessings of your giving.`
      },
      whereWePerform: {
        title: 'Where Do We Perform Sadaqah Sacrifices?',
        content: `We facilitate sacrifices in Bangladesh, Uganda, and Lebanon, regions where poverty and food insecurity leave families without reliable access to nutritious meals. By directing your Sadaqah here, you help those most in need - widows, orphans,vulnerable families, and the elderly.`
      },
      cost: {
        title: 'How Much Does Sadaqah Sacrifice Cost?',
        content: `Goat Sacrifice – $88\nAvailable in Uganda & Bangladesh\n\nSheep Sacrifice (small) – $95\nAvailable in Uganda\n\nSheep Sacrifice – Lebanon\nContact the office for a quote (prices in USD, subject to exchange fluctuations).\n\nOptional Add-ons:\n\n25 kg Rice – $39\n\nCommunity Feast (Waleemah) – $80\nIncludes:\n\nCommunity feast preparation - $78\n\n25 kg rice - $39. Required for all Waleemah.\n\nFeeds up to 100 people.\n\nNote: Waleemah can only be arranged together with a Sadaqah Sacrifice.`
      },
      whatIsWaleemah: {
        title: 'What is a Community Feast (Waleemah)?',
        content: `The Waleemah option turns your Sadaqah Sacrifice into a community meal. The meat is prepared with rice and shared in a gathering of up to 100 people, young and old, sitting together in gratitude.\n\nThis reflects the Prophetic spirit of generosity: what begins as your personal act of worship becomes a moment of happiness and unity for an entire community.`
      },
      confirmation: {
        title: 'Confirmation & Updates',
        content: `Processing takes around 7 days.\n\nSacrifices are performed by certified halal butchers under Islamic guidelines.\n\nUpon request, video footage can be sent via WhatsApp so you may witness your offering.`
      },
      impact: {
        title: 'The Impact Of Your Sacrifice',
        content: `\n\nNourishing Families: Your sacrifice provides meat to families who otherwise cannot afford it, especially children and mothers who need nutritious food.\n\nSpiritual Benefit: By offering charity through sacrifice, you earn reward, express gratitude, and revive a Sunnah of the Prophet ﷺ.\n\nCommunity Connection: Your generosity strengthens the bonds of the ummah, reminding those in hardship that they are not forgotten.\n\nFeeding people is a virtuous deed, and Allah ﷻ loves those who do good. Imagine the joy they experience when receiving meat due to your generosity and compassion.\n\nAllah ﷻ says: "And do good; indeed, Allah loves the doers of good."\n- Qur'an, al-Baqarah 2:195\n\n\nNote: Sadaqah Sacrifice is performed purely for charity, and is not intended to be nominated to relatives or oneself. The meat is given to those in need, ensuring your gift reaches the most deserving.`
      },
      callToAction: `Offer Your Sadaqah Sacrifice Today\n\nA single sacrifice can fill empty plates, bring joy to forgotten families, and carry your gratitude to Allah ﷻ into action.\n\nMay Allah ﷻ accept your offering, heal the sick, bless your loved ones, and increase you in goodness and barakah. Ameen.`
    },
    ar: {
      intro: `اشكروا الله ﷻ من خلال ذبيحة الصدقة، وأطعموا بها الأسر المحتاجة. الماعز 88 دولارًا، الخروف 95 دولارًا، الوليمة 80 دولارًا.`,
      whatIsSadaqah: {
        title: 'ما هي ذبيحة الصدقة؟',
        content: `ذبيحة الصدقة من أصدق وسائل شكر الله ﷻ على نعمه التي لا تُحصى. وهي ذبيحة تطوعية، ليست واجبة، يقوم بها المسلم تعبيرًا عن الامتنان؛ بعد سفرٍ آمن، أو شفاءٍ من مرض، أو الانتقال إلى منزل جديد، أو حتى عند التأمل في فضل الله وكرمه.\n\nفي جمعية خطط الإحسان الخيرية الاجتماعية، نقوم بترتيب ذبائح الصدقة في بنغلاديش وأوغندا ولبنان. لتصل لحوم الأضاحي إلى الأسر التي نادرًا ما تتذوق اللحم، فيتحول شكركم إلى غذاءٍ وفرحٍ لمن يعيشون في ضيق.`
      },
      whyPerform: {
        title: 'لماذا يؤدي المسلمون ذبيحة الصدقة؟',
        content: `\n\nشكر الله ﷻ\nقال الله ﷻ:\n﴿فَكُلُوا مِمَّا رَزَقَكُمُ اللَّهُ حَلَالًا طَيِّبًا وَاشْكُرُوا نِعْمَتَ اللَّهِ إِن كُنتُمْ إِيَّاهُ تَعْبُدُونَ﴾\n– سورة النحل، الآية 114\n\nكل ذبيحة هي اعتراف بفضل الله وتحويل الامتنان إلى عبادة.\n\nطلب الشفاء\nقال النبي ﷺ: «داووا مرضاكم بالصدقة» – رواه أبو داود.\n\nفالتضحية بنيّة الصدقة عن المريض قد تكون سببًا للراحة والعافية وتخفيف الألم بإذن الله.\n\nإطعام الفقراء\nكثير من الأسر الفقيرة لا يتاح لها اللحم إلا نادرًا. ذبيحتك تمنحهم طعامًا وكرامةً وسعادة. ابتسامة الأطفال، وارتياح الأمهات، ودعاء الكبار هي البركات الخفية لعطائك.`
      },
      whereWePerform: {
        title: 'أين ننفذ ذبائح الصدقة؟',
        content: `نقوم بتنفيذ الذبائح في بنغلاديش وأوغندا ولبنان، حيث يعاني الناس من الفقر وانعدام الأمن الغذائي. وباختياركم التبرع هنا، فإنكم تساعدون الفئات الأكثر حاجة: الأرامل، والأيتام، والأسر الضعيفة، وكبار السن.`
      },
      cost: {
        title: 'كم تبلغ تكلفة ذبيحة الصدقة؟',
        content: `ذبيحة ماعز – 88 دولارًا\nمتوفرة في أوغندا وبنغلاديش\n\nذبيحة خروف (صغير) – 95 دولارًا\nمتوفرة في أوغندا\n\nذبيحة خروف – لبنان\nيُرجى التواصل مع المكتب للحصول على السعر (بالدولار الأمريكي، حسب تقلبات الصرف).\n\nإضافات اختيارية:\n\n25 كجم أرز – 39 دولارًا\n\nوليمة مجتمعية (وليمة) – 80 دولارًا\nتشمل:\n\nتجهيز الوليمة وطهي الذبيحة – 78 دولارًا\n\n25 كجم أرز – 39 دولارًا\n(مطلوبة لجميع الولائم – تكفي لما يصل إلى 100 شخص).`
      },
      whatIsWaleemah: {
        title: 'ما هي الوليمة؟',
        content: `تحوِّل الوليمة ذبيحة الصدقة إلى وجبة مجتمعية. يُطهى اللحم مع الأرز ويوزَّع في تجمع يضم حتى 100 شخص من مختلف الأعمار يجلسون في جو من الشكر والفرح.\n\nبهذا يتحول عملك الفردي من العبادة إلى لحظة فرحٍ ووحدةٍ مجتمعية، تعكس روح السخاء النبوي.`
      },
      confirmation: {
        title: 'التأكيد والتحديثات',
        content: `تستغرق المعالجة حوالي 7 أيام.\n\nتُنفذ الذبائح على أيدي جزارين معتمدين وفق الضوابط الشرعية.\n\nيمكن، عند الطلب، إرسال مقطع فيديو عبر واتساب لتشهدوا ذبيحتكم.`
      },
      impact: {
        title: 'أثر ذبيحتك',
        content: `\n\nإطعام الأسر: ذبيحتك توفر اللحم للأسر التي لا تستطيع شراءه، وخاصةً للأطفال والأمهات.\n\nالفائدة الروحية: الصدقة بالذبيحة سبب للأجر، وإحياء لسنة نبوية، وشكر لله ﷻ.\n\nترابط المجتمع: عطاؤك يقوي أواصر الأمة ويذكر المحتاجين أنهم غير منسيين.\n\nقال الله ﷻ: ﴿وَأَحْسِنُوا إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ﴾ – سورة البقرة، الآية 195\n\n\nملاحظة حول النية\nذبيحة الصدقة مخصصة للخير فقط، وليست للمُضحّي أو أقاربه المباشرين. ويُوزَّع لحمها على المحتاجين وحدهم لضمان وصول عطائك إلى من يستحقه بالفعل.`
      },
      callToAction: `بادر بذبيحة الصدقة اليوم\n\nذبيحة واحدة كفيلة بأن تملأ الأطباق الفارغة، وتزرع الفرح في قلوب الأسر المنسية، وتجعل شكرك لله ﷻ عملًا ملموسًا.\n\nنسأل الله ﷻ أن يتقبل منكم، ويشفي مرضاكم، ويبارك لكم في أهلكم وأموالكم، ويزيدكم من فضله. آمين.`
    }
  }

  // Aqeeqah Project Content
  const aqeeqahContent = {
    en: {
      intro:
        'At Khitat Al-Ihsan Charity Social Association, we arrange your Aqeeqah and ensure the meat reaches families facing poverty and food insecurity.\n\nCelebrating new life with gratitude, worship, and community care.',
      whatIs: {
        title: 'What Is Aqeeqah?',
        content:
          'Aqeeqah is a beautiful Sunnah Mu’akkadah (confirmed Sunnah) in Islam, performed to celebrate the birth of a child. It involves sacrificing an animal as an act of gratitude to Allah ﷻ, while sharing the blessing with family, neighbours, and those in need.\n\nThe Messenger of Allah ﷺ said:\n“Whoever has a child born to him and wants to offer a sacrifice on his behalf, let him do so…” - Abu Dawood\n\nYour sacrifice provides fresh, nutritious meat to families who rarely have the opportunity to taste it, ensuring your child’s blessing becomes a source of hope and nourishment for others.'
      },
      whyPerform: {
        title: 'What Is The Purpose Of Aqeeqah?',
        content:
          'Gratitude to Allah ﷻ – The birth of a child is among Allah’s greatest blessings. Aqeeqah allows parents to turn gratefulness into worship, deepening their connection with Him.\n\nCharity and community – By sharing meat with families facing hardship, your child’s arrival becomes a relief for others.\n\nIbn al-Qayyim (may Allah have mercy on him) said:\n“Among the benefits of Aqeeqah is that it is a sacrifice offered on behalf of the newborn when he first enters this world. Another benefit is that it releases the newborn, for he is held in pledge for his Aqeeqah so that he may intercede for his parents.”'
      },
      whereWePerform: {
        title: 'Where Do We Perform Aqeeqah Sacrifices?',
        content:
          'Your Aqeeqah is carried out in Bangladesh, Uganda and Lebanon.'
      },
      cost: {
        title: 'How Much Does Aqeeqah Cost?',
        content:
          'Goat Sacrifice – $88\nAvailable in: Uganda & Bangladesh\n\nSheep Sacrifice (small) – $95\nAvailable in: Uganda\n\nSheep Sacrifice – Lebanon\nContact the office for a quote (prices in USD, subject to exchange fluctuations).\n\nOptional Add-ons:\n\n25 kg Rice – $39\n\nCommunity Feast (Waleemah) – $80\nIncludes:\n\nCommunity feast preparation - $78\n\n25 kg rice - $39. Required for all Waleemah.\n\nNote: Waleemah can only be arranged together with an Aqeeqah sacrifice.'
      },
      whatIsWaleemah: {
        title: 'What Is A Community Feast (Waleemah)?',
        content:
          'The Waleemah option turns your Aqeeqah into a nourishing community meal. Rice is prepared with your sacrifice, and up to 100 people share in the blessing. This option beautifully embodies the Prophetic spirit of Aqeeqah: gratitude, sharing, and strengthening the community.'
      },
      confirmation: {
        title: 'Confirmation & Updates',
        content:
          'Processing takes approximately 7 days.\n\nVideo footage can be sent via WhatsApp upon request.'
      },
      callToAction:
        'Offer Your Aqeeqah Today\n\nYour child’s blessing can feed the hungry, bring joy to families, and fulfil a beautiful Sunnah of the Prophet ﷺ.\n\nMay Allah ﷻ bless your newborn with health, guidance, and righteousness, and accept your Aqeeqah as an act of worship and compassion. Ameen.'
    },
    ar: {
      intro:
        'في جمعية خطة الإحسان الخيرية الاجتماعية، نقوم بترتيب ذبح العقيقة والتأكد من وصول اللحوم إلى العائلات الفقيرة والمحتاجة للأمن الغذائي.\nنحتفل بالحياة الجديدة بالشكر والعبادة ورعاية المجتمع.',
      whatIs: {
        title: 'ما هي العقيقة؟',
        content:
          'العقيقة سُنَّة مؤكدة في الإسلام، تُقام احتفالاً بميلاد المولود. وهي تتضمن ذبح شاة أو أكثر شكرًا لله ﷻ على نعمة الولد، ومشاركة هذه النعمة مع الأسرة والجيران والفقراء.\n\nقال رسول الله ﷺ:\n«مَن وُلِدَ له ولدٌ فأحبَّ أن يُنسُك عنه فليَنسُك…» (رواه أبو داود)\n\nتوفِّر العقيقة لحمًا طازجًا ومغذيًا للعائلات التي نادرًا ما تتذوقه، فيتحول بركة مولودك إلى مصدر أمل وغذاء ورحمة للآخرين.'
      },
      whyPerform: {
        title: 'ما هو هدف العقيقة؟',
        content:
          'الشكر لله ﷻ – ميلاد الطفل من أعظم نعم الله. والعقيقة وسيلة للوالدين لتحويل الامتنان إلى عبادة، وتعميق صلتهم بخالقهم.\n\nالصدقة وخدمة المجتمع – من خلال توزيع اللحم على الفقراء والمحتاجين، يصبح قدوم طفلك سببًا في التخفيف عن الآخرين وإدخال السرور عليهم.\n\nوقال ابن القيم رحمه الله:\n«ومن فوائد العقيقة أنها فدية يُفدى بها المولود حين يفد إلى الدنيا. ومنها أنها تفك رهانه، فإنه مرهون بعقيقته حتى يُشفع لوالديه.»'
      },
      whereWePerform: {
        title: 'أين نُقيم ذبائح العقيقة؟',
        content:
          'تُنفَّذ العقيقة في بنغلاديش وأوغندا ولبنان، حيث تصل اللحوم مباشرة إلى العائلات المحتاجة.'
      },
      cost: {
        title: 'كم تكلفة العقيقة؟',
        content:
          'ذبيحة الماعز – 88 دولارًا\nمتوفرة في: أوغندا وبنغلاديش\n\nذبيحة الخروف (صغير) – 95 دولارًا\nمتوفرة في: أوغندا\n\nذبيحة الخروف – لبنان\nيرجى التواصل مع المكتب للحصول على السعر الحالي (بالدولار الأمريكي وقد يتغيّر تبعًا لتقلبات سعر الصرف).\n\nخيارات إضافية:\n\n25 كغ أرز – 39 دولارًا\n\nوليمة (وليمة جماعية) – 80 دولارًا\nتشمل تجهيز وطهي الذبيحة (78 دولارًا) + 25 كغ أرز (39 دولارًا).\n\nملاحظة: الوليمة مرتبطة بالعقيقة ولا يمكن طلبها منفصلة.'
      },
      whatIsWaleemah: {
        title: 'ما هي الوليمة؟',
        content:
          'خيار الوليمة يحوِّل عقيقتك إلى وليمة مجتمعية مفرحة، يجتمع فيها الصغار والكبار، ويُطهى الأرز مع الذبيحة، فيشارك في الطعام نحو 100 شخص. هذا الخيار يجسِّد روح العقيقة النبوية: الشكر، المشاركة، وتقوية الروابط المجتمعية.'
      },
      confirmation: {
        title: 'التأكيد والتحديثات',
        content:
          'تستغرق العملية حوالي 7 أيام.\n\nيمكن إرسال مقطع فيديو عبر واتساب عند الطلب.'
      },
      callToAction:
        'بادر بأداء العقيقة اليوم\n\nبركة مولودك تستطيع أن تُطعم الجائعين، وتُدخل الفرح على الأسر، وتُحيي سُنَّة عظيمة من سنن النبي ﷺ.\n\nنسأل الله ﷻ أن يبارك لمولودك بالصحة والهداية والصلاح، وأن يتقبّل منك العقيقة عملًا صالحًا ورحمة بالناس. آمين.'
    }
  }

  // Determine which content to use based on project slug
  const isGiftOfSight = slug === 'gift-of-sight'
  const isHealthMedical = slug === 'health-medical'
  const isFeedTheNeedy = slug === 'feed-the-needy'
  const isGazaEmergency = slug === 'gaza-emergency'
  const isLCK = slug === 'lck'
  const isWaterWells = slug === 'water-well'
  const isSadaqahSacrifice = slug === 'sadaqah-sacrifice'
  const isAqeeqah = slug === 'aqeeqah'
  const content = isGiftOfSight
    ? isArabic
      ? giftOfSightContent.ar
      : giftOfSightContent.en
    : isHealthMedical
      ? isArabic
        ? healthMedicalContent.ar
        : healthMedicalContent.en
      : isFeedTheNeedy
        ? isArabic
          ? feedTheNeedyContent.ar
          : feedTheNeedyContent.en
        : isGazaEmergency
          ? isArabic
            ? gazaEmergencyContent.ar
            : gazaEmergencyContent.en
          : isLCK
            ? isArabic
              ? lebanonCommunityKitchenContent.ar
              : lebanonCommunityKitchenContent.en
            : isWaterWells
              ? isArabic
                ? waterWellsContent.ar
                : waterWellsContent.en
              : isSadaqahSacrifice
                ? isArabic
                  ? sadaqahSacrificeContent.ar
                  : sadaqahSacrificeContent.en
                : isAqeeqah
                  ? isArabic
                    ? aqeeqahContent.ar
                    : aqeeqahContent.en
                  : isArabic
                    ? zakatContent.ar
                    : zakatContent.en

  return (
    <div className='flex min-h-screen flex-col bg-white dark:bg-gray-900'>
      {/* Hero Image */}
      <section className='relative h-[50vh] min-h-[400px] overflow-hidden'>
        <Image
          src={project.image_url}
          alt={displayTitle}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60'></div>
        <div className='relative mx-auto flex h-full max-w-screen-2xl items-end px-4 md:px-6 lg:px-8'>
          <div className='mb-8 text-white'>
            <h1 className='mb-4 text-4xl font-bold md:text-5xl lg:text-6xl'>
              {displayTitle}
            </h1>
            {!isArabic && project.upsell_text && (
              <p className='text-lg md:text-xl'>{project.upsell_text}</p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className='py-16 pb-24 lg:py-20 lg:pb-16'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8'>
          <div className='grid gap-12 lg:grid-cols-12 lg:gap-16'>
            {/* Left Column - Main Content */}
            <div className='space-y-8 lg:col-span-7'>
              {/* Intro / Heading */}
              <div>
                {(isGiftOfSight ||
                  isHealthMedical ||
                  isFeedTheNeedy ||
                  isGazaEmergency ||
                  isLCK ||
                  isWaterWells ||
                  isSadaqahSacrifice ||
                  isAqeeqah) &&
                'intro' in content ? (
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).intro
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                ) : 'heading' in content ? (
                  <h2 className='mb-6 text-3xl font-bold text-primary-300 md:text-4xl'>
                    {(content as any).heading}
                  </h2>
                ) : null}
              </div>

              {/* What Is / What Are */}
              {'whatIs' in content || 'whatAre' in content ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {
                      ('whatIs' in content
                        ? (content as any).whatIs
                        : (content as any).whatAre
                      )?.title
                    }
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {('whatIs' in content
                      ? (content as any).whatIs
                      : (content as any).whatAre
                    )?.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : null}

              {/* Symptoms (Arabic Gift of Sight only) */}
              {'symptoms' in content && (content as any).symptoms ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).symptoms.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).symptoms.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : null}

              {/* Why Problem / Who Needs */}
              {'whyProblem' in content ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whyProblem.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whyProblem.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : 'whoNeeds' in content && (content as any).whoNeeds ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whoNeeds.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whoNeeds.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : null}

              {/* How Surgery / What Counts */}
              {'howSurgery' in content ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).howSurgery.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).howSurgery.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : 'whatCounts' in content && (content as any).whatCounts ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whatCounts.title}
                  </h3>
                  <ul className='space-y-2 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whatCounts.items.map(
                      (item: string, idx: number) => (
                        <li key={idx} className='flex items-start'>
                          <span className='mr-2 text-primary-300'>•</span>
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : null}

              {/* What Donation */}
              {'whatDonation' in content && (content as any).whatDonation && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whatDonation.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whatDonation.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Why Important (Arabic only) */}
              {'whyImportant' in content && (content as any).whyImportant && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whyImportant.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whyImportant.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* In Islam / Faith Action */}
              {'inIslam' in content && (content as any).inIslam ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).inIslam.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).inIslam.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : 'faithAction' in content && (content as any).faithAction ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).faithAction.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).faithAction.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : null}

              {/* Global Crisis (Health & Medical) */}
              {'globalCrisis' in content && (content as any).globalCrisis && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).globalCrisis.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).globalCrisis.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* How Limits (Health & Medical) */}
              {'howLimits' in content && (content as any).howLimits && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).howLimits.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).howLimits.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Why Matters (Health & Medical) */}
              {'whyMatters' in content && (content as any).whyMatters && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whyMatters.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whyMatters.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Real Impact (Health & Medical) */}
              {'realImpact' in content && (content as any).realImpact && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).realImpact.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).realImpact.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* How Help (Health & Medical) */}
              {'howHelp' in content && (content as any).howHelp && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).howHelp.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).howHelp.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Why Choose (Health & Medical or Zakat) */}
              {'whyChoose' in content && (content as any).whyChoose && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whyChoose.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whyChoose.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Legacy (Health & Medical) */}
              {'legacy' in content && (content as any).legacy && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).legacy.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).legacy.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Why Starving (Feed the Needy) */}
              {'whyStarving' in content && (content as any).whyStarving && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whyStarving.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whyStarving.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Malnutrition (Feed the Needy) */}
              {'malnutrition' in content && (content as any).malnutrition && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).malnutrition.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).malnutrition.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Monthly Giving (Feed the Needy) */}
              {'monthlyGiving' in content && (content as any).monthlyGiving && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).monthlyGiving.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).monthlyGiving.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Be the Reason (Feed the Needy) */}
              {'beTheReason' in content && (content as any).beTheReason && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).beTheReason.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).beTheReason.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* What's Happening (Gaza Emergency) */}
              {'whatsHappening' in content &&
                (content as any).whatsHappening && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).whatsHappening.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).whatsHappening.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* How We Deliver (Gaza Emergency) */}
              {'howWeDeliver' in content && (content as any).howWeDeliver && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).howWeDeliver.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).howWeDeliver.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* What Donation Supports (Gaza Emergency) */}
              {'whatDonationSupports' in content &&
                (content as any).whatDonationSupports && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).whatDonationSupports.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).whatDonationSupports.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Why We Need You (Gaza Emergency) */}
              {'whyWeNeedYou' in content && (content as any).whyWeNeedYou && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whyWeNeedYou.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whyWeNeedYou.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* How You Can Help (Gaza Emergency) */}
              {'howYouCanHelp' in content && (content as any).howYouCanHelp && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).howYouCanHelp.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).howYouCanHelp.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Why Lebanon (Lebanon Community Kitchen) */}
              {'whyLebanon' in content && (content as any).whyLebanon && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whyLebanon.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whyLebanon.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* What Is LCK (Lebanon Community Kitchen) */}
              {'whatIsLCK' in content && (content as any).whatIsLCK && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whatIsLCK.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whatIsLCK.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Who We Serve (Lebanon Community Kitchen) */}
              {'whoWeServe' in content && (content as any).whoWeServe && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whoWeServe.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whoWeServe.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Where We Work (Lebanon Community Kitchen) */}
              {'whereWeWork' in content && (content as any).whereWeWork && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whereWeWork.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whereWeWork.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Our Impact (Lebanon Community Kitchen) */}
              {'ourImpact' in content && (content as any).ourImpact && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).ourImpact.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).ourImpact.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Kitchen Built (Lebanon Community Kitchen) */}
              {'kitchenBuilt' in content && (content as any).kitchenBuilt && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).kitchenBuilt.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).kitchenBuilt.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Why Matters (Lebanon Community Kitchen) */}
              {'whyMatters' in content && (content as any).whyMatters && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whyMatters.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whyMatters.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Give Gift (Lebanon Community Kitchen) */}
              {'giveGift' in content && (content as any).giveGift && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).giveGift.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).giveGift.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Reality / Bitter Reality (Water Wells) */}
              {'reality' in content && (content as any).reality ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).reality.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).reality.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : 'bitterReality' in content &&
                (content as any).bitterReality ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).bitterReality.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).bitterReality.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : null}

              {/* Children Toll / Children Affected (Water Wells) */}
              {'childrenToll' in content && (content as any).childrenToll ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).childrenToll.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).childrenToll.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : 'childrenAffected' in content &&
                (content as any).childrenAffected ? (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).childrenAffected.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).childrenAffected.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              ) : null}

              {/* Where We Build (Water Wells) */}
              {'whereWeBuild' in content && (content as any).whereWeBuild && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whereWeBuild.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whereWeBuild.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Cost (Water Wells) */}
              {'cost' in content && (content as any).cost && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).cost.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).cost.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Sadaqah Jariyah (Water Wells) */}
              {'sadaqahJariyah' in content &&
                (content as any).sadaqahJariyah && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).sadaqahJariyah.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).sadaqahJariyah.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Build Legacy (Water Wells) */}
              {'buildLegacy' in content && (content as any).buildLegacy && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).buildLegacy.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).buildLegacy.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* What Is Sadaqah (Sadaqah Sacrifice) */}
              {'whatIsSadaqah' in content && (content as any).whatIsSadaqah && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whatIsSadaqah.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whatIsSadaqah.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Why Perform (Sadaqah Sacrifice) */}
              {'whyPerform' in content && (content as any).whyPerform && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).whyPerform.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).whyPerform.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Where We Perform (Sadaqah Sacrifice) */}
              {'whereWePerform' in content &&
                (content as any).whereWePerform && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).whereWePerform.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).whereWePerform.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Cost (Sadaqah Sacrifice - already exists above but will render if present) */}

              {/* What Is Waleemah (Sadaqah Sacrifice) */}
              {'whatIsWaleemah' in content &&
                (content as any).whatIsWaleemah && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).whatIsWaleemah.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).whatIsWaleemah.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Confirmation (Sadaqah Sacrifice) */}
              {'confirmation' in content && (content as any).confirmation && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).confirmation.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).confirmation.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Impact (Sadaqah Sacrifice) */}
              {'impact' in content && (content as any).impact && (
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                    {(content as any).impact.title}
                  </h3>
                  <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                    {(content as any).impact.content
                      .split('\n\n')
                      .map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* Call To Action (Sadaqah Sacrifice) */}
              {'callToAction' in content &&
                (content as any).callToAction &&
                !isGiftOfSight && (
                  <div>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).callToAction
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p
                            key={idx}
                            className={
                              para.includes('$') || para.includes('=')
                                ? 'font-semibold'
                                : ''
                            }
                          >
                            {para}
                          </p>
                        ))}
                    </div>
                  </div>
                )}

              {/* When (Zakat only) */}
              {'when' in content &&
                (content as any).when &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).when.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).when.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* How to Calculate (Zakat only) */}
              {'howToCalculate' in content &&
                (content as any).howToCalculate &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).howToCalculate.title}
                    </h3>
                    <ol className='mb-4 space-y-2 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).howToCalculate.steps.map(
                        (step: string, idx: number) => (
                          <li key={idx} className='flex items-start'>
                            <span className='mr-2 font-semibold text-primary-300'>
                              {idx + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        )
                      )}
                    </ol>
                    {(content as any).howToCalculate.note && (
                      <p className='text-base italic leading-7 text-gray-600 dark:text-gray-400'>
                        {(content as any).howToCalculate.note}
                      </p>
                    )}
                  </div>
                )}

              {/* Nisab (Zakat only) */}
              {'nisab' in content &&
                (content as any).nisab &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).nisab.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).nisab.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Where (Zakat only) */}
              {'where' in content &&
                (content as any).where &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).where.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).where.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Why Calculator (Zakat only) */}
              {'whyCalculator' in content &&
                (content as any).whyCalculator &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).whyCalculator.title}
                    </h3>
                    <ul className='space-y-2 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).whyCalculator.items.map(
                        (item: string, idx: number) => (
                          <li key={idx} className='flex items-start'>
                            <span className='mr-2 text-primary-300'>•</span>
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {/* Importance (Zakat only) */}
              {'importance' in content &&
                (content as any).importance &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).importance.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).importance.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Impact (Zakat only) */}
              {'impact' in content &&
                (content as any).impact &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).impact.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).impact.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Mercy (Zakat only) */}
              {'mercy' in content &&
                (content as any).mercy &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).mercy.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).mercy.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Commitment (Zakat only) */}
              {'commitment' in content &&
                (content as any).commitment &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).commitment.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).commitment.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Calculate (Zakat only) */}
              {'calculate' in content &&
                (content as any).calculate &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).calculate.title}
                    </h3>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).calculate.content
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p key={idx}>{para}</p>
                        ))}
                    </div>
                  </div>
                )}

              {/* Changes Lives (Zakat only) */}
              {'changesLives' in content &&
                (content as any).changesLives &&
                !isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
                      {(content as any).changesLives.title}
                    </h3>
                    <p className='text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).changesLives.content}
                    </p>
                  </div>
                )}

              {/* Call to Action (Gift of Sight) */}
              {'callToAction' in content &&
                (content as any).callToAction &&
                isGiftOfSight &&
                !isHealthMedical &&
                !isFeedTheNeedy &&
                !isGazaEmergency &&
                !isLCK &&
                !isWaterWells &&
                !isSadaqahSacrifice && (
                  <div>
                    <div className='space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300'>
                      {(content as any).callToAction
                        .split('\n\n')
                        .map((para: string, idx: number) => (
                          <p
                            key={idx}
                            className={
                              para.includes('$') || para.includes('=')
                                ? 'font-semibold'
                                : ''
                            }
                          >
                            {para}
                          </p>
                        ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Right Column - Prices/Donation Amounts */}
            <DonationSidebar
              project={
                isWaterWells
                  ? {
                      id: project.id,
                      slug: project.slug,
                      title: displayTitle,
                      image_url: project.image_url,
                      brief_description: displayBrief,
                      long_description: project.long_description,
                      upsell_text: project.upsell_text,
                      created_at: project.created_at,
                      updated_at: project.updated_at,
                      prices: [
                        {
                          amount: 358,
                          currency: 'USD',
                          label: isArabic ? 'بئر سطحي' : 'Shallow Well',
                          description: isArabic ? 'سريلانكا' : 'Sri Lanka'
                        },
                        {
                          amount: 1040,
                          currency: 'USD',
                          label: isArabic
                            ? 'بئر عميق بمضخة يدوية'
                            : 'Deep Well (Hand Pump)',
                          description: isArabic ? 'أوغندا' : 'Uganda'
                        },
                        {
                          amount: 1040,
                          currency: 'USD',
                          label: isArabic
                            ? 'بئر كهربائي'
                            : 'Deep Electric Well',
                          description: isArabic ? 'إندونيسيا' : 'Indonesia'
                        },
                        {
                          amount: 1755,
                          currency: 'USD',
                          label: isArabic
                            ? 'بئر مع محطة مياه'
                            : 'Deep Well + Station',
                          description: isArabic
                            ? 'مجهز بمحطة وضوء'
                            : 'With Wudu Station'
                        }
                      ] satisfies Price[]
                    }
                  : isSadaqahSacrifice
                    ? {
                        id: project.id,
                        slug: project.slug,
                        title: displayTitle,
                        image_url: project.image_url,
                        brief_description: displayBrief,
                        long_description: project.long_description,
                        upsell_text: project.upsell_text,
                        created_at: project.created_at,
                        updated_at: project.updated_at,
                        prices: [
                          {
                            amount: 88,
                            currency: 'USD',
                            label: isArabic ? 'ذبيحة ماعز' : 'Goat Sacrifice',
                            description: isArabic
                              ? 'أوغندا وبنغلاديش'
                              : 'Uganda & Bangladesh'
                          },
                          {
                            amount: 95,
                            currency: 'USD',
                            label: isArabic ? 'ذبيحة خروف' : 'Sheep Sacrifice',
                            description: isArabic ? 'أوغندا' : 'Uganda'
                          }
                        ] satisfies Price[]
                      }
                    : isAqeeqah
                      ? {
                          id: project.id,
                          slug: project.slug,
                          title: displayTitle,
                          image_url: project.image_url,
                          brief_description: displayBrief,
                          long_description: project.long_description,
                          upsell_text: project.upsell_text,
                          created_at: project.created_at,
                          updated_at: project.updated_at,
                          prices: [
                            {
                              amount: 88,
                              currency: 'USD',
                              label: isArabic ? 'ذبيحة ماعز' : 'Goat Sacrifice',
                              description: isArabic
                                ? 'أوغندا وبنغلاديش'
                                : 'Uganda & Bangladesh'
                            },
                            {
                              amount: 95,
                              currency: 'USD',
                              label: isArabic
                                ? 'ذبيحة خروف'
                                : 'Sheep Sacrifice',
                              description: isArabic ? 'أوغندا' : 'Uganda'
                            }
                          ] satisfies Price[]
                        }
                      : isGiftOfSight
                        ? {
                            id: project.id,
                            slug: project.slug,
                            title: displayTitle,
                            image_url: project.image_url,
                            brief_description: displayBrief,
                            long_description: project.long_description,
                            upsell_text: project.upsell_text,
                            created_at: project.created_at,
                            updated_at: project.updated_at,
                            prices: [
                              {
                                amount: 75,
                                currency: 'USD',
                                label: isArabic
                                  ? 'عملية واحدة'
                                  : 'One Cataract Surgery',
                                description: isArabic
                                  ? 'إعادة البصر لشخص واحد'
                                  : 'Restore sight for one person'
                              },
                              {
                                amount: 150,
                                currency: 'USD',
                                label: isArabic
                                  ? 'عمليتان'
                                  : 'Two Cataract Surgeries',
                                description: isArabic
                                  ? 'إعادة البصر لشخصين'
                                  : 'Restore sight for two people'
                              },
                              {
                                amount: 225,
                                currency: 'USD',
                                label: isArabic
                                  ? 'ثلاث عمليات'
                                  : 'Three Cataract Surgeries',
                                description: isArabic
                                  ? 'إعادة البصر لثلاثة أشخاص'
                                  : 'Restore sight for three people'
                              },
                              {
                                amount: 300,
                                currency: 'USD',
                                label: isArabic
                                  ? 'أربع عمليات'
                                  : 'Four Cataract Surgeries',
                                description: isArabic
                                  ? 'إعادة البصر لأربعة أشخاص'
                                  : 'Restore sight for four people'
                              }
                            ] satisfies Price[]
                          }
                        : isGazaEmergency
                          ? {
                              id: project.id,
                              slug: project.slug,
                              title: displayTitle,
                              image_url: project.image_url,
                              brief_description: displayBrief,
                              long_description: project.long_description,
                              upsell_text: project.upsell_text,
                              created_at: project.created_at,
                              updated_at: project.updated_at,
                              prices: [
                                {
                                  amount: 20,
                                  currency: 'USD',
                                  label: isArabic
                                    ? '10 أرغفة خبز'
                                    : '10 Loaves of Bread',
                                  description: isArabic
                                    ? 'خبز طازج يُخبز ويُوزع'
                                    : 'Fresh bread baked and delivered'
                                },
                                {
                                  amount: 36,
                                  currency: 'USD',
                                  label: isArabic
                                    ? '5 وجبات ساخنة'
                                    : '5 Hot Meals',
                                  description: isArabic
                                    ? 'من مطابخنا المجتمعية'
                                    : 'From our community kitchens'
                                },
                                {
                                  amount: 250,
                                  currency: 'USD',
                                  label: isArabic
                                    ? 'شاحنة مياه 1000 لتر'
                                    : '1,000L Water Truck',
                                  description: isArabic
                                    ? 'توفير مياه نظيفة'
                                    : 'Supplying clean water'
                                }
                              ] satisfies Price[]
                            }
                          : {
                              id: project.id,
                              slug: project.slug,
                              title: displayTitle,
                              image_url: project.image_url,
                              brief_description: displayBrief,
                              long_description: project.long_description,
                              upsell_text: project.upsell_text,
                              created_at: project.created_at,
                              updated_at: project.updated_at,
                              prices: project.prices
                            }
              }
              isArabic={isArabic}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
