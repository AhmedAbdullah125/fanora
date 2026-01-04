export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Our Services",
      influencers: "Influencers",
      contact: "Contact Us",
    },

    hero: {
      welcome: "✨ Welcome to the future of digital content",
      title_start: "Amplify Your",
      title_highlight: "Digital Presence",
      subtitle:
        "Fanora is your gateway to premium influencer marketing, high-end photography, and creative content production.",
      btn_find_influencers: "Find Influencers",
      btn_explore_services: "Explore Our Services",
    },

    services: {
      title: "Our Services – Fanora",
      subtitle:
        "At Fanora, we provide fully integrated solutions for managing and marketing influencers and content creators, delivered with a professional approach that ensures real impact and measurable results.",
      view_details: "View Details",

      content_creation: {
        title: "Content Creation",
        desc:
          "Developing creative ideas for every project (advertisements, campaigns, photoshoots, and video editing), specifically tailored for social media platforms.",
        cta: "Learn More",
      },

      studio: {
        title: "Photography",
        desc:
          "Planning and executing professional photoshoots and advertisements (video and photography), as well as designing visual identities for clients including colors, lighting, and mood boards.",
        cta: "Book Now",
      },

      influencer_ads: {
        title: "Influencers",
        desc:
          "Selecting the most suitable influencers for each campaign and designing effective collaboration strategies between brands and influencers.",
        cta: "Browse Directory",
      },
    },

    marketing: {
      title: "Marketing Content Production",
      desc:
        "Elevate your brand with our premium content production services. We create visually compelling and strategically driven content designed to engage your audience and deliver real results.",
      what_we_offer: "What We Offer",
      offer_1: "Social Media Strategy & Assets",
      offer_2: "Promotional Videos & Reels",
      offer_3: "Copywriting & Blog Content",
      offer_4: "Brand Identity Design",
      whatsapp_btn: "Order via WhatsApp",
      whatsapp_msg:
        "Hello, I’m interested in the Marketing Content Production service.",
    },

    studio_page: {
      title: "Photography Studio",
      subtitle: "A Professional Space for Professional Results",
      features_title: "Studio Features",
      features_desc:
        "Fully equipped with professional lighting, backdrops, dressing rooms, and a high-speed makeup station.",
      book_title: "Book a Session",
      success_title: "Booking Request Sent!",
      success_desc:
        "We have received your request and will contact you shortly to confirm.",
      book_another: "Book Another Session",
      label_name: "Full Name",
      label_email: "Email Address",
      label_date: "Date & Time",
      label_duration: "Duration (Hours)",
      placeholder_name: "Your Name",
      placeholder_email: "you@example.com",
      min_notice: "* Minimum 48 hours notice",
      btn_submit: "Confirm Booking",
      required: "Required",
      invalid_email: "A valid email is required",
      durations: {
        two_hours: "2 Hours",
        four_hours: "4 Hours",
        full_day: "Full Day",
      },
    },

    influencers_page: {
      filters: "Filters",
      reset: "Reset",
      category_size: "Category Size",
      type: "Type",
      gender: "Gender",
      filter_btn: "Filter Influencers",
      view_profile: "View Profile",
      no_results: "No influencers found matching your filters.",
      clear_filters: "Clear Filters",
      back_to_dir: "Back to Directory",
      request_influencer: "Request This Influencer",
      recent_content: "Recent Content",
      whatsapp_req_msg:
        "Hello, I would like to collaborate with the influencer: {NAME}. Profile link: {URL}",

      types: {
        trendy: "Trendy Blogger",
        traditional: "Traditional Content Creator",
        specialist: "Specialist",
        digital_star: "Digital Star",
      },

      genders: {
        male: "Male",
        female: "Female",
      },

      sizes: {
        nano: "Nano (1K–10K)",
        micro: "Micro (10K–100K)",
        macro: "Macro (100K–1M)",
        mega: "Mega (1M+)",
      },
    },

    about: {
      title: "About Fanora",
      who_we_are: "Who We Are",
      desc:
        "Inspired by the traditional Kuwaiti lantern 'Fanar'—a symbol of light—Fanora was founded to become a beacon of creativity and influence in the world of marketing and advertising.\n\nWe believe that true impact begins with a powerful idea (Matter), is brought to life through stunning visuals (Visual), and is completed with an unforgettable shine (Luster).\n\nWe are not just an advertising agency; we are a strategic partner that connects brands with their audiences through three core pillars: content creation, photography, and influencer marketing.",

      mission_title: "Our Mission",
      mission_desc:
        "At Fanora, our mission is to empower influencers and content creators while connecting them with brands through professional management, creative content, and smart marketing solutions that ensure impact, credibility, and long-term success—while preserving each influencer’s unique identity and artistic value.",

      vision_title: "Our Vision",
      vision_desc:
        "To become the leading platform for influencer content creation and marketing in the Arab world by delivering authentic, impactful, and value-driven advertising experiences that connect brands with their audiences in a genuine and professional way.",
    },

    contact: {
      title: "Contact Us",
      subtitle: "We’d love to hear from you",
      visit_us: "Visit Us",
      address: "123 Creative Tower, Digital City, Dubai, UAE",
      email_us: "Email Us",
      call_us: "Call Us",
      open_maps: "Open in Google Maps",
      send_msg_title: "Send a Message",
      placeholder_name: "Name",
      placeholder_email: "Email",
      placeholder_subject: "Subject",
      placeholder_msg: "Your Message",
      btn_send: "Send Message",
    },

    footer: {
      desc: "Connecting influence with success",
      quick_links: "Quick Links",
      connect: "Connect With Us",
      rights: "© 2024 Fanora Agency. All rights reserved.",
    },
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
      title: 'خدماتنا – Fanora',
      subtitle: "في Fanora نقدّم حلولًا متكاملة لإدارة وتسويق المشاهير وصنّاع المحتوى، بأسلوب احترافي يضمن التأثير الحقيقي والنتائج الملموسة.",
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

      mission_title: 'رسالة FANORA ',
      mission_desc: "في FANORA نعمل على تمكين المشاهير وصناع المحتوى، وربطهم بالعلامات التجارية من خلال إدارة احترافية، محتوى إبداعي، وحلول تسويقية ذكية تضمن التأثير، المصداقية، والنتائج المستدامة، مع الحفاظ على هوية كل مشهور وقيمته الفنية.",
      vision_title: 'رؤية FANORA',
      vision_desc: "أن تكون FANORA المنصة الرائدة في صناعة وتسويق محتوى المشاهير في العالم العربي ، عبر تقديم تجارب إعلانية إنسانية ، مؤثرة ، وذات قيمة حقيقية تربط العلامات التجارية بجمهورها بصدق واحترافية."
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نود أن نسمع منك',
      visit_us: 'زرنا',
      address: '123 برج الإبداع، المدينة الرقمية، دبي، الإمارات',
      email_us: 'تواصل معانا',
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
      desc: "نربط التأثير بالنجاح",
      quick_links: 'روابط سريعة',
      connect: 'تواصل معنا',
      rights: '© 2024 وكالة فانورا. جميع الحقوق محفوظة.'
    }
  }
};
