export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      influencers: 'Influencers',
      contact: 'Contact',
    },
    hero: {
      welcome: '✨ Welcome to the future of digital content',
      title_start: 'Amplify Your',
      title_highlight: 'Digital Presence',
      subtitle: 'Fanora is your gateway to premium influencer marketing, high-end photography, and creative content production.',
      btn_find_influencers: 'Find Influencers',
      btn_explore_services: 'Explore Services',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Expert solutions for your creative needs',
      view_details: 'View Details',
      content_creation: {
        title: ' Matter',
        desc: `Developing ideas for each project (advertisement, campaign, photoshoot, video editing) specifically for social media.`,
        cta: 'Learn more'
      },
      studio: {
        title: ' Visual ',
        desc: `Planning and execution of photoshoots and advertisements (video and photos), designing visual identity for clients (colors, lighting, mood board).`,
        cta: 'Book Now'
      },
      influencer_ads: {
        title: ' Luster ',
        desc: `Selecting the best and most suitable celebrities for each campaign.

Designing collaboration strategies between the brand and the celebrity.`,
        cta: 'Browse Directory'
      }
    },
    marketing: {
      title: 'Marketing Content Production',
      desc: 'Elevate your brand with our premium content production services. We create visually stunning and strategically effective content designed to engage your audience and drive conversions.',
      what_we_offer: 'What We Offer',
      offer_1: 'Social Media Strategy & Assets',
      offer_2: 'Promotional Videos & Reels',
      offer_3: 'Copywriting & Blog Posts',
      offer_4: 'Brand Identity Design',
      whatsapp_btn: 'Order via WhatsApp',
      whatsapp_msg: "Hello, I’m interested in the Marketing Content Production service."
    },
    studio_page: {
      title: 'Photography Studio',
      subtitle: 'Professional space for professional results',
      features_title: 'Studio Features',
      features_desc: 'Fully equipped with professional lighting, backdrops, dressing room, and high-speed makeup station.',
      book_title: 'Book a Session',
      success_title: 'Booking Request Sent!',
      success_desc: 'We have received your request and will contact you shortly to confirm.',
      book_another: 'Book Another',
      label_name: 'Full Name',
      label_email: 'Email Address',
      label_date: 'Date & Time',
      label_duration: 'Duration (Hrs)',
      placeholder_name: 'Your Name',
      placeholder_email: 'you@example.com',
      min_notice: '* Min 48h in advance',
      btn_submit: 'Confirm Booking',
      required: 'Required',
      invalid_email: 'Valid email required',
      durations: {
        two_hours: '2 Hours',
        four_hours: '4 Hours',
        full_day: 'Full Day'
      }
    },
    influencers_page: {
      filters: 'Filters',
      reset: 'Reset',
      category_size: 'Category Size',
      type: 'Type',
      gender: 'Gender',
      filter_btn: 'Filter Influencers',
      view_profile: 'View Profile',
      no_results: 'No influencers found matching filters.',
      clear_filters: 'Clear Filters',
      back_to_dir: 'Back to Directory',
      request_influencer: 'Request this Influencer',
      recent_content: 'Recent Content',
      whatsapp_req_msg: "Hello, I’d like to collaborate with the influencer: {NAME}. Profile link: {URL}",
      types: {
        trendy: 'Trendy Blogger',
        traditional: 'Traditional Nano Creator',
        specialist: 'Specialist',
        digital_star: 'Digital Star'
      },
      genders: {
        male: 'Male',
        female: 'Female'
      },
      sizes: {
        nano: 'Nano (1K-10K)',
        micro: 'Micro (10K-100K)',
        macro: 'Macro (100K-1M)',
        mega: 'Mega (1M+)'
      }
    },
    about: {
      title: 'About Fanora',
      who_we_are: 'Who We Are',
      desc: 'Fanora is a forward-thinking creative agency and influencer hub designed to bridge the gap between brands and the digital generation. We believe in the power of storytelling, whether it\'s through a camera lens, a strategic marketing campaign, or the authentic voice of a creator.',
      mission_title: 'Our Mission',
      mission_desc: 'To empower brands and creators with the tools, spaces, and connections they need to thrive in a digital-first world.',
      vision_title: 'Our Vision',
      vision_desc: 'To be the leading ecosystem for creative production and influencer marketing in the region.'
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'We\'d love to hear from you',
      visit_us: 'Visit Us',
      address: '123 Creative Tower, Digital City, Dubai, UAE',
      email_us: 'Email Us',
      call_us: 'Call Us',
      open_maps: 'Open in Google Maps',
      send_msg_title: 'Send a Message',
      placeholder_name: 'Name',
      placeholder_email: 'Email',
      placeholder_subject: 'Subject',
      placeholder_msg: 'Your Message',
      btn_send: 'Send Message'
    },
    footer: {
      desc: 'Bringing vibrant creativity to the digital world. We connect brands with stars and create content that shines.',
      quick_links: 'Quick Links',
      connect: 'Connect',
      rights: '© 2024 Fanora Agency. All rights reserved.'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      influencers: 'المؤثرين',
      contact: 'اتصل بنا',
    },
    hero: {
      welcome: '✨ مرحبًا بك في مستقبل المحتوى الرقمي',
      title_start: 'ضاعف من',
      title_highlight: 'حضورك الرقمي',
      subtitle: 'فانورا هي بوابتك لتسويق المؤثرين المتميز، التصوير الفوتوغرافي الراقي، وإنتاج المحتوى الإبداعي.',
      btn_find_influencers: 'ابحث عن مؤثرين',
      btn_explore_services: 'استكشف خدماتنا',
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'حلول احترافية لاحتياجاتك الإبداعية',
      view_details: 'عرض التفاصيل',
      content_creation: {
        title: 'صناعة المحتوى',
        desc: 'تطوير الأفكار لكل مشروع ( إعلان – حملة – جلسة تصوير – مونتاج  ) مختصه للسوشال ميديا.',
        cta: 'اعرف المزيد'
      },
      studio: {
        title: 'التصوير',
        desc: "التخطيط والتنفيذ لجلسات التصوير والإعلانات ( فيديو وصور ) ، تصميم الهوية البصرية للعملاء ( ألوان، إضاءة، Moodboard ).",
        cta: 'احجز الآن'
      },
      influencer_ads: {
        title: 'المشاهير',
        desc: `
اختيار أفضل المشاهير والأنسب لكل حملة.
تصميم استراتيجيات التعاون
 (Collab Strategy) بين العلامة التجاريه والمشهور.`,
        cta: 'تصفح الدليل'
      }
    },
    marketing: {
      title: 'إنتاج المحتوى التسويقي',
      desc: 'ارفع من مستوى علامتك التجارية مع خدمات إنتاج المحتوى المتميزة لدينا. نقوم بإنشاء محتوى جذاب بصريًا وفعال استراتيجيًا مصمم لجذب جمهورك وزيادة التحويلات.',
      what_we_offer: 'ماذا نقدم',
      offer_1: 'استراتيجية وأصول وسائل التواصل الاجتماعي',
      offer_2: 'فيديوهات ترويجية وريلز',
      offer_3: 'كتابة النصوص والمقالات',
      offer_4: 'تصميم هوية العلامة التجارية',
      whatsapp_btn: 'اطلب عبر واتساب',
      whatsapp_msg: "مرحبًا، أنا مهتم بخدمة إنتاج المحتوى التسويقي."
    },
    studio_page: {
      title: 'استوديو التصوير',
      subtitle: 'مساحة احترافية لنتائج احترافية',
      features_title: 'ميزات الاستوديو',
      features_desc: 'مجهز بالكامل بإضاءة احترافية، خلفيات، غرفة تبديل ملابس، ومحطة مكياج عالية السرعة.',
      book_title: 'حجز جلسة',
      success_title: 'تم إرسال طلب الحجز!',
      success_desc: 'لقد استلمنا طلبك وسنتصل بك قريبًا للتأكيد.',
      book_another: 'حجز آخر',
      label_name: 'الاسم الكامل',
      label_email: 'البريد الإلكتروني',
      label_date: 'التاريخ والوقت',
      label_duration: 'المدة (ساعات)',
      placeholder_name: 'اسمك',
      placeholder_email: 'you@example.com',
      min_notice: '* قبل 48 ساعة على الأقل',
      btn_submit: 'تأكيد الحجز',
      required: 'مطلوب',
      invalid_email: 'بريد إلكتروني صالح مطلوب',
      durations: {
        two_hours: 'ساعتين',
        four_hours: '4 ساعات',
        full_day: 'يوم كامل'
      }
    },
    influencers_page: {
      filters: 'تصفية النتائج',
      reset: 'إعادة تعيين',
      category_size: 'حجم الفئة',
      type: 'النوع',
      gender: 'الجنس',
      filter_btn: 'تصفية المؤثرين',
      view_profile: 'عرض الملف الشخصي',
      no_results: 'لم يتم العثور على مؤثرين مطابقين للتصفية.',
      clear_filters: 'مسح التصفية',
      back_to_dir: 'العودة للدليل',
      request_influencer: 'طلب هذا المؤثر',
      recent_content: 'أحدث المحتوى',
      whatsapp_req_msg: "مرحبًا، أود التعاون مع المؤثر: {NAME}. رابط الملف الشخصي: {URL}",
      types: {
        trendy: 'مدون عصري',
        traditional: 'صانع محتوى تقليدي',
        specialist: 'متخصص',
        digital_star: 'نجم رقمي'
      },
      genders: {
        male: 'ذكر',
        female: 'أنثى'
      },
      sizes: {
        nano: 'نانو (1K-10K)',
        micro: 'مايكرو (10K-100K)',
        macro: 'ماكرو (100K-1M)',
        mega: 'ميجا (1M+)'
      }
    },
    about: {
      title: 'عن FANORA',
      who_we_are: 'من نحن',
      desc: `
مستوحاة من كلمة “فنر”، مصدر الضوء الكويتي التقليدي ، تأسست FANORA لتكون منارة للإبداع والتأثير في عالم التسويق والإعلان ، نؤمن أن الضوء الحقيقي يبدأ من فكرة قوية (Matter)، تكتمل بـ صورة مبهرة (Visual)، وتُختَتم بـ بريق لا يُنسى (Luster).

احنا مو بس شركة إعلان ، بل راح نكون شريك استراتيجي يربط العلامات التجارية بجمهورها من خلال ثلاث مفاتيح : صناعة المحتوى ، التصوير ، والتسويق عبر المشاهير.
`,

      mission_title: 'رسالتنا',
      mission_desc: "نُبدع في تقديم حلول تسويقية مبتكرة ، تمزج بين الفكرة الأصيلة ، والرؤية البصرية الجذابة ، والتأثير الإعلامي الواسع ، لنصنع مع عملائنا قصص نجاح تُروى.",
      vision_title: 'رؤيتنا',
      vision_desc: 'أن نكون المرجع الإبداعي الأول في الكويت والخليج لصناعة الإعلانات المتكاملة ، راح نور كل الطرق للعلامات التجارية بأسلوب فريد ، أصيل ، ومعاصر.'
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نود أن نسمع منك',
      visit_us: 'زرنا',
      address: '123 برج الإبداع، المدينة الرقمية، دبي، الإمارات',
      email_us: 'راسلنا',
      call_us: 'اتصل بنا',
      open_maps: 'فتح في خرائط جوجل',
      send_msg_title: 'أرسل رسالة',
      placeholder_name: 'الاسم',
      placeholder_email: 'البريد الإلكتروني',
      placeholder_subject: 'الموضوع',
      placeholder_msg: 'رسالتك',
      btn_send: 'إرسال الرسالة'
    },
    footer: {
      desc: 'نجلب الإبداع النابض بالحياة إلى العالم الرقمي. نربط العلامات التجارية بالنجوم وننشئ محتوى يتألق.',
      quick_links: 'روابط سريعة',
      connect: 'تواصل معنا',
      rights: '© 2024 وكالة فانورا. جميع الحقوق محفوظة.'
    }
  }
};
