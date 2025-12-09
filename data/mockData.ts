
import { Gender, Influencer, InfluencerSize, InfluencerType, Service, SiteImages } from '../types';

export const initialInfluencers: Influencer[] = [
  {
    id: '1',
    name_en: 'Sarah Al-Ahmed',
    name_ar: 'سارة الأحمد',
    bio_en: 'Lifestyle and fashion enthusiast sharing daily trends and beauty tips. I love creating colorful content that inspires positivity.',
    bio_ar: 'عاشقة لأسلوب الحياة والموضة، أشارك أحدث الصيحات ونصائح الجمال يومياً. أحب صناعة محتوى ملون ينشر الإيجابية.',
    gender: Gender.FEMALE,
    size: InfluencerSize.MICRO,
    type: InfluencerType.TRENDY,
    // Realistic Arab/Middle Eastern female fashion portrait
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    album: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1529139574466-a302c27e3844?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600&q=80',
    ],
    socials: [
      { platform: 'instagram', handle: '@sarahstyle', followers: '85K', url: '#' },
      { platform: 'tiktok', handle: '@sarahclips', followers: '120K', url: '#' },
    ],
  },
  {
    id: '2',
    name_en: 'Omar Khalid',
    name_ar: 'عمر خالد',
    bio_en: 'Tech reviewer and gadget geek. Deep dives into the latest smartphones, cameras, and gaming gear.',
    bio_ar: 'مُراجع تقني ومهووس بالأجهزة. أغوص في تفاصيل أحدث الهواتف الذكية، الكاميرات، ومعدات الألعاب.',
    gender: Gender.MALE,
    size: InfluencerSize.MACRO,
    type: InfluencerType.SPECIALIST,
    // Professional male portrait with glasses/tech vibe
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    album: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
    ],
    socials: [
      { platform: 'youtube', handle: 'OmarTech', followers: '450K', url: '#' },
      { platform: 'twitter', handle: '@omark', followers: '90K', url: '#' },
    ],
  },
  {
    id: '3',
    name_en: 'Layla Mahmoud',
    name_ar: 'ليلى محمود',
    bio_en: 'Culinary artist and food vlogger. Bringing traditional recipes to the modern kitchen.',
    bio_ar: 'فنانة طهي ومدونة فيديو للأكل. أجلب الوصفات التقليدية إلى المطبخ العصري.',
    gender: Gender.FEMALE,
    size: InfluencerSize.MEGA,
    type: InfluencerType.DIGITAL_STAR,
    // Warm, inviting female portrait
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    album: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80',
    ],
    socials: [
      { platform: 'instagram', handle: '@cheflayla', followers: '1.2M', url: '#' },
      { platform: 'snapchat', handle: 'laylacooks', followers: '900K', url: '#' },
    ],
  },
  {
    id: '4',
    name_en: 'Fahad Codes',
    name_ar: 'فهد كودز',
    bio_en: 'Coding tutorials and developer lifestyle. Helping new devs break into the industry.',
    bio_ar: 'دروس برمجية وأسلوب حياة المطورين. أساعد المطورين الجدد على دخول المجال.',
    gender: Gender.MALE,
    size: InfluencerSize.NANO,
    type: InfluencerType.TRADITIONAL,
    // Modern developer/creative male portrait
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    album: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80',
    ],
    socials: [
      { platform: 'tiktok', handle: '@fahaddev', followers: '8K', url: '#' },
    ],
  },
  {
    id: '5',
    name_en: 'Noura Beauty',
    name_ar: 'نورة بيوتي',
    bio_en: 'Makeup artist specializing in bridal and cinematic looks.',
    bio_ar: 'خبيرة تجميل متخصصة في إطلالات العرائس والمكياج السينمائي.',
    gender: Gender.FEMALE,
    size: InfluencerSize.MICRO,
    type: InfluencerType.TRENDY,
    // High-fashion beauty portrait
    profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80',
    album: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    ],
    socials: [
      { platform: 'instagram', handle: '@nouraglam', followers: '45K', url: '#' },
      { platform: 'snapchat', handle: 'nourabeauty', followers: '50K', url: '#' },
    ],
  },
];

export const initialServices: Service[] = [
  {
    id: 'marketing',
    title_en: 'Marketing Content',
    title_ar: 'إنتاج المحتوى التسويقي',
    description_en: 'High-quality visuals and copy tailored for your brand.',
    description_ar: 'مرئيات ونصوص عالية الجودة مصممة خصيصًا لعلامتك التجارية.',
    icon: 'pen-tool',
    link: '/services/marketing',
    // Professional flatlay of creative work/laptops
    bgImage: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'studio',
    title_en: 'Photography Studio',
    title_ar: 'استوديو التصوير',
    description_en: 'State-of-the-art studio rental for professionals.',
    description_ar: 'تأجير استوديو حديث ومتطور للمحترفين.',
    icon: 'camera',
    link: '/services/studio',
    // Professional Studio: Photographer holding camera with studio lights in bokeh background
    bgImage: 'https://images.unsplash.com/photo-1452587925148-ce548e973c40?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'influencers',
    title_en: 'Influencer Advertising',
    title_ar: 'إعلانات المؤثرين',
    description_en: 'Connect with top creators to amplify your reach.',
    description_ar: 'تواصل مع أفضل المبدعين لزيادة وصولك.',
    icon: 'users',
    link: '/influencers',
    // Social media / connection vibe
    bgImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80',
  },
];

export const initialSiteImages: SiteImages = {
  global: {
    // Kept the custom logo as requested
    logo: 'https://beaver-wide-22590920.figma.site/_assets/v11/01cbab69a678e684785665e16bf0f1f798a3de7f.png',
    // Neutral placeholder
    placeholderProfile: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=300&q=80',
  },
  home: {
    // Subtle gradient/texture if needed, or left empty for clean style
    heroOverlay: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80', 
  },
  about: {
    // Team meeting / creative agency office vibe
    hero: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
  },
  services: {
    marketingBg: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1200&q=80',
    // Main Studio Background - Wide shot of a clean white cyclorama wall studio
    studioBg: 'https://images.unsplash.com/photo-1576402098679-052601962323?auto=format&fit=crop&w=1600&q=80',
    influencerBg: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    marketingGallery: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
    ],
    // Professional Studio Gallery - Equipment, Lighting, Action
    studioGallery: [
      'https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&w=800&q=80', // Professional Studio Lights Setup
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', // Camera on Tripod
      'https://images.unsplash.com/photo-1588537666275-c9676674a24f?auto=format&fit=crop&w=800&q=80', // Behind the scenes fashion shoot
    ]
  },
  contact: {
    // High quality modern city map vibe
    map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80'
  }
};
