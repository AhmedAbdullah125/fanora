
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Star, PenTool, Camera, Users, Sparkles } from 'lucide-react';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { t, dir } = useLanguage();
  const { siteImages } = useData();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Hero Section */}
      <section className="bg-hero-bg pt-40 pb-24 px-6 md:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border shadow-sm mb-4">
               <Sparkles size={14} className="text-primary fill-primary" />
               <span className="text-sm font-semibold text-primary uppercase tracking-wide">Influencer & Content Hub</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-text tracking-tight leading-[1.1]">
            {t('hero.title_start')} <br className="hidden md:block"/>
            <span className="text-primary relative inline-block">
                {t('hero.title_highlight')}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-light -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
            </span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-2xl mx-auto font-normal leading-relaxed">
            {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link to="/influencers">
                <Button size="lg" className="shadow-lg shadow-primary/20">
                {t('hero.btn_find_influencers')}
                </Button>
            </Link>
            <Link to="/services">
                <Button variant="outline" size="lg" className="bg-white">
                {t('hero.btn_explore_services')}
                </Button>
            </Link>
            </div>
        </div>
      </section>

      {/* Services Section with Dotted Grid */}
      <section className="py-24 px-6 bg-dots relative">
        <div className="container  mx-auto relative z-10">
            
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 bg-white border border-border px-5 py-2 rounded-full shadow-sm">
                    <Star size={16} className="text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary tracking-wide">{t('services.title')}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-text">What We Offer</h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Marketing Card */}
                <Link to="/services/marketing" className="group block">
                    <GlassCard className="h-full flex flex-col p-0 hoverEffect bg-white" hoverEffect>
                         {/* Top Image - Rounded Top Only */}
                         <div className="h-[240px] w-full overflow-hidden border-b border-border bg-gray-100 relative">
                             <img src={siteImages.services.marketingBg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Marketing" />
                             
                             {/* Floating Badges */}
                             <div className="absolute top-4 left-4 bg-white p-2.5 rounded-2xl border border-border shadow-sm text-primary">
                                 <PenTool size={20} />
                             </div>
                             <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1.5 rounded-2xl text-xs font-bold shadow-md">
                                 Popular
                             </div>
                         </div>
                         
                         <div className="p-8 flex flex-col flex-1">
                             <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">{t('services.content_creation.title')}</h3>
                             <p className="text-text-secondary leading-relaxed mb-6 line-clamp-3">{t('services.content_creation.desc')}</p>
                             
                             <div className="mt-auto flex flex-wrap gap-2">
                                 <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Strategy</span>
                                 <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Social</span>
                                 <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Visuals</span>
                             </div>
                         </div>
                    </GlassCard>
                </Link>

                {/* Studio Card */}
                <Link to="/services/studio" className="group block">
                    <GlassCard className="h-full flex flex-col p-0 hoverEffect bg-white" hoverEffect>
                         <div className="h-[240px] w-full overflow-hidden border-b border-border bg-gray-100 relative">
                             <img src={siteImages.services.studioBg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Studio" />
                             <div className="absolute top-4 left-4 bg-white p-2.5 rounded-2xl border border-border shadow-sm text-primary">
                                 <Camera size={20} />
                             </div>
                         </div>
                         
                         <div className="p-8 flex flex-col flex-1">
                             <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">{t('services.studio.title')}</h3>
                             <p className="text-text-secondary leading-relaxed mb-6 line-clamp-3">{t('services.studio.desc')}</p>
                             
                             <div className="mt-auto flex flex-wrap gap-2">
                                 <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Equipment</span>
                                 <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Space</span>
                             </div>
                         </div>
                    </GlassCard>
                </Link>

                {/* Influencer Card */}
                <Link to="/influencers" className="group block">
                    <GlassCard className="h-full flex flex-col p-0 hoverEffect bg-white" hoverEffect>
                         <div className="h-[240px] w-full overflow-hidden border-b border-border bg-gray-100 relative">
                             <img src={siteImages.services.influencerBg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Influencers" />
                             <div className="absolute top-4 left-4 bg-white p-2.5 rounded-2xl border border-border shadow-sm text-primary">
                                 <Users size={20} />
                             </div>
                             <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1.5 rounded-2xl text-xs font-bold shadow-md">
                                 Trending
                             </div>
                         </div>
                         
                         <div className="p-8 flex flex-col flex-1">
                             <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">{t('services.influencer_ads.title')}</h3>
                             <p className="text-text-secondary leading-relaxed mb-6 line-clamp-3">{t('services.influencer_ads.desc')}</p>
                             
                             <div className="mt-auto flex flex-wrap gap-2">
                                 <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Nano</span>
                                 <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Macro</span>
                                 <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Growth</span>
                             </div>
                         </div>
                    </GlassCard>
                </Link>

            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;