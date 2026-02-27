export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Our Services",
      influencers: "Influencers",
      contact: "Contact Us",
      login: "Influencer Login",
      profile: "Profile",
    },

    hero: {
      welcome: "✨ Welcome to the future of digital content",
      title_start: "Amplify Your",
      title_highlight: "Digital Presence",
      subtitle:
        "Kani is your gateway to premium influencer marketing, high-end photography, and creative content production.",
      btn_find_influencers: "Find Influencers",
      btn_explore_services: "Explore Our Services",
    },

    services: {
      title: "Our Services – Kani",
      subtitle:
        "At Kani, we provide fully integrated solutions for managing and marketing influencers and content creators, delivered with a professional approach that ensures real impact and measurable results.",
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
      title: "About Kani",
      who_we_are: "Who We Are",
      desc:
        "Inspired by the traditional Kuwaiti lantern 'Fanar'—a symbol of light—Kani was founded to become a beacon of creativity and influence in the world of marketing and advertising.\n\nWe believe that true impact begins with a powerful idea (Matter), is brought to life through stunning visuals (Visual), and is completed with an unforgettable shine (Luster).\n\nWe are not just an advertising agency; we are a strategic partner that connects brands with their audiences through three core pillars: content creation, photography, and influencer marketing.",

      mission_title: "Our Mission",
      mission_desc:
        "At Kani, our mission is to empower influencers and content creators while connecting them with brands through professional management, creative content, and smart marketing solutions that ensure impact, credibility, and long-term success—while preserving each influencer’s unique identity and artistic value.",

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
      rights: "© 2024 Kani Agency. All rights reserved.",
    },
    login_page: {
      title: "Login",
      subtitle: "Enter your details to access Fanora dashboard.",
      email_label: "Email Address",
      password_label: "Password",
      btn_login: "Login",
      btn_logging_in: "Logging in...",
      no_account: "Don't have an influencer account?",
      create_account: "Create Account",
      clear_session: "Clear Session (Testing)",
      error_title: "Login Failed",
    },
    register_page: {
      title: "Influencer Registration",
      subtitle: "Please fill in all required fields — your request will be reviewed by administration.",
      avatar_click: "Click to change",
      avatar_hint: "Click to choose image — Max 5MB",
      section_account: "Account Details",
      name_label: "Full Name",
      phone_label: "Phone Number",
      email_label: "Email Address",
      password_label: "Password",
      section_profile: "Profile Information",
      name_ar_label: "Display Name (Arabic)",
      name_en_label: "Display Name (English)",
      bio_ar_label: "Bio (Arabic)",
      bio_en_label: "Bio (English)",
      section_personal: "Personal Data",
      sex_label: "Gender",
      male: "Male",
      female: "Female",
      dob_label: "Date of Birth",
      dob_placeholder: "Pick a date",
      country_label: "Country",
      country_placeholder: "Select Country",
      national_id_label: "National / Civil ID",
      national_id_hint: "Won't be displayed publicly — for administrative use only.",
      is_verified_label: "Is your account verified?",
      verified_yes: "Verified ✓",
      verified_no: "Not Verified",
      section_content: "Content Type & Audience",
      content_type_label: "Content Type",
      category_size_label: "Audience Size",
      section_social: "Social Media Links (Optional)",
      btn_have_account: "I already have an account",
      btn_submit: "Submit Request for Review",
      btn_submitting: "Submitting...",
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      snapchat: "Snapchat",
      select_placeholder: "Select",
      avatar_alt: "Profile Image",
    },
    profile_page: {
      title: "Profile",
      subtitle: "Edit your details then click 'Save Changes'.",
      btn_save: "Save Changes",
      btn_saving: "Saving...",
      btn_back: "Back",
      stats_join_date: "Join Date",
      stats_followers: "Total Followers",
      stats_audience: "Audience Size",
      remove_image: "Remove Image",
      national_id_desc: "Won't be displayed publicly.",
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      snapchat: "Snapchat",
      select_placeholder: "Select",
      avatar_alt: "Profile Image",
      btn_logout: "Logout",
      logout_confirm_title: "Are you sure?",
      logout_confirm_desc: "You will be logged out of your account.",
      logout_confirm_ok: "Yes, Logout",
      logout_confirm_cancel: "Cancel",
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      influencers: 'المؤثرين',
      contact: 'اتصل بنا',
      login: 'تسجيل المؤثرين',
      profile: 'الملف الشخصي',
    },
    hero: {
      welcome: '✨ مرحبًا بك في مستقبل المحتوى الرقمي',
      title_start: 'ضاعف من',
      title_highlight: 'حضورك الرقمي',
      subtitle: 'كاني هي بوابتك لتسويق المؤثرين المتميز، التصوير الفوتوغرافي الراقي، وإنتاج المحتوى الإبداعي.',
      btn_find_influencers: 'ابحث عن مؤثرين',
      btn_explore_services: 'استكشف خدماتنا',
    },
    services: {
      title: 'خدماتنا – Kani',
      subtitle: "في Kani نقدّم حلولًا متكاملة لإدارة وتسويق المشاهير وصنّاع المحتوى، بأسلوب احترافي يضمن التأثير الحقيقي والنتائج الملموسة.",
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
      title: 'عن Kani',
      who_we_are: 'من نحن',
      desc: `
مستوحاة من كلمة “فنر”، مصدر الضوء الكويتي التقليدي ، تأسست Kani لتكون منارة للإبداع والتأثير في عالم التسويق والإعلان ، نؤمن أن الضوء الحقيقي يبدأ من فكرة قوية (Matter)، تكتمل بـ صورة مبهرة (Visual)، وتُختَتم بـ بريق لا يُنسى (Luster).

احنا مو بس شركة إعلان ، بل راح نكون شريك استراتيجي يربط العلامات التجارية بجمهورها من خلال ثلاث مفاتيح : صناعة المحتوى ، التصوير ، والتسويق عبر المشاهير.
`,

      mission_title: 'رسالة Kani ',
      mission_desc: "في Kani نعمل على تمكين المشاهير وصناع المحتوى، وربطهم بالعلامات التجارية من خلال إدارة احترافية، محتوى إبداعي، وحلول تسويقية ذكية تضمن التأثير، المصداقية، والنتائج المستدامة، مع الحفاظ على هوية كل مشهور وقيمته الفنية.",
      vision_title: 'رؤية Kani',
      vision_desc: "أن تكون Kani المنصة الرائدة في صناعة وتسويق محتوى المشاهير في العالم العربي ، عبر تقديم تجارب إعلانية إنسانية ، مؤثرة ، وذات قيمة حقيقية تربط العلامات التجارية بجمهورها بصدق واحترافية."
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
      rights: '© 2024 وكالة كاني. جميع الحقوق محفوظة.'
    },
    login_page: {
      title: "تسجيل الدخول",
      subtitle: "ادخل بياناتك للوصول إلى لوحة كاني.",
      email_label: "البريد الإلكتروني",
      password_label: "كلمة المرور",
      btn_login: "تسجيل الدخول",
      btn_logging_in: "جاري تسجيل الدخول...",
      no_account: "ليس لديك حساب مشهور؟",
      create_account: "إنشاء حساب",
      clear_session: "مسح الجلسة (للتجربة)",
      error_title: "تعذر تسجيل الدخول",
    },
    register_page: {
      title: "تسجيل المشاهير في كاني",
      subtitle: "يُرجى تعبئة جميع الحقول المطلوبة — سيتم مراجعة طلبك من الإدارة.",
      avatar_click: "اضغط للتغيير",
      avatar_hint: "انقر لاختيار صورة — حد أقصى 5MB",
      section_account: "بيانات الحساب",
      name_label: "الاسم الكامل",
      phone_label: "رقم الهاتف",
      email_label: "البريد الإلكتروني",
      password_label: "كلمة المرور",
      section_profile: "معلومات الملف الشخصي",
      name_ar_label: "الاسم الفني (عربي)",
      name_en_label: "الاسم الفني (إنجليزي)",
      bio_ar_label: "النبذة (عربي)",
      bio_en_label: "النبذة (إنجليزي)",
      section_personal: "البيانات الشخصية",
      sex_label: "الجنس",
      male: "ذكر",
      female: "أنثى",
      dob_label: "تاريخ الميلاد",
      dob_placeholder: "اختر تاريخاً",
      country_label: "الدولة",
      country_placeholder: "اختر الدولة",
      national_id_label: "الرقم المدني / الوطني",
      national_id_hint: "لن يُعرض للعامة — للاستخدام الإداري فقط.",
      is_verified_label: "هل حسابك موثّق؟",
      verified_yes: "موثّق ✓",
      verified_no: "غير موثّق",
      section_content: "نوع المحتوى والجمهور",
      content_type_label: "نوع المحتوى",
      category_size_label: "حجم الجمهور",
      section_social: "روابط التواصل الاجتماعي (اختياري)",
      btn_have_account: "لدي حساب بالفعل",
      btn_submit: "إرسال الطلب للمراجعة",
      btn_submitting: "جاري الإرسال...",
      instagram: "إنستقرام",
      tiktok: "تيك توك",
      youtube: "يوتيوب",
      snapchat: "سناب شات",
      select_placeholder: "اختر",
      avatar_alt: "الصورة الشخصية",
    },
    profile_page: {
      title: "الملف الشخصي",
      subtitle: "عدّل بياناتك ثم اضغط على 'حفظ التغييرات'.",
      btn_save: "حفظ التغييرات",
      btn_saving: "جاري الحفظ...",
      btn_back: "رجوع",
      stats_join_date: "تاريخ الانضمام",
      stats_followers: "إجمالي المتابعين",
      stats_audience: "حجم الجمهور",
      remove_image: "إزالة الصورة",
      national_id_desc: "لن يُعرض للعامة.",
      instagram: "إنستقرام",
      tiktok: "تيك توك",
      youtube: "يوتيوب",
      snapchat: "سناب شات",
      select_placeholder: "اختر",
      avatar_alt: "الصورة الشخصية",
      btn_logout: "تسجيل الخروج",
      logout_confirm_title: "هل أنت متأكد؟",
      logout_confirm_desc: "سيتم تسجيل خروجك من حسابك.",
      logout_confirm_ok: "نعم، تسجيل الخروج",
      logout_confirm_cancel: "إلغاء",
    },
  }
};
