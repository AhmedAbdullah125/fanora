
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Star, PenTool, Camera, Users, Sparkles } from 'lucide-react';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

/* ─── Tiny hook: fires .animated on elements when they enter viewport ─── */
function useInView(ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) {
    useEffect(() => {
        if (!ref.current) return;
        const root = ref.current;
        const targets = root.querySelectorAll<HTMLElement>('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, ...options });
        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ref, options]);
}

const Home: React.FC = () => {
    const { t, dir } = useLanguage();
    const { siteImages } = useData();
    const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

    const heroRef = useRef<HTMLElement>(null!);
    const servicesRef = useRef<HTMLElement>(null!);

    useInView(heroRef, { threshold: 0.05 });
    useInView(servicesRef, { threshold: 0.08 });

    return (
        <div className=" flex flex-col font-sans">

            {/* Hero Section */}
            <section ref={heroRef} className="bg-hexro-bg pt-40 pb-24 px-6 md:px-8 border-b border-border">
                <div className="max-w-4xl mx-auto text-center space-y-8">

                    {/* Tagline badge */}
                    <div className="animate-on-scroll anim-fade-up anim-delay-0 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border shadow-sm">
                        <Sparkles size={14} className="text-primary fill-primary" />
                        <span className="text-sm font-semibold text-primary uppercase tracking-wide">{t('about.tagline')}</span>
                    </div>

                    {/* Title */}
                    <h1 className="animate-on-scroll anim-fade-up anim-delay-1 text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
                        {t('about.title')}
                    </h1>

                    {/* Platform description */}
                    <p className="animate-on-scroll anim-fade-up anim-delay-2 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {t('about.platform_desc')}
                    </p>

                    {/* Transform highlight */}
                    <div className="animate-on-scroll anim-scale-in anim-delay-3 inline-flex items-center gap-3 bg-primary text-white rounded-2xl px-6 py-3 text-sm font-semibold shadow-lg mx-auto">
                        <span>✦</span>
                        <span>{t('about.transform_desc')}</span>
                        <span>✦</span>
                    </div>

                    {/* 4 Services pills */}
                    <div className="animate-on-scroll anim-fade-up anim-delay-4 flex flex-wrap justify-center gap-3 pt-2">
                        {(['service_1', 'service_2', 'service_3', 'service_4'] as const).map((key, i) => (
                            <span key={key} className="flex items-center gap-2 bg-white border border-primary/20 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                                <span className="text-primary font-bold">{i + 1}</span>
                                {t(`about.${key}`)}
                            </span>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="animate-on-scroll anim-fade-up anim-delay-5 flex flex-col sm:flex-row gap-4 justify-center pt-2">
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
            {/* <section ref={servicesRef} className="py-24 px-6 bg-dots relative">
                <div className="container mx-auto relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <div className="animate-on-scroll anim-fade-up anim-delay-0 inline-flex items-center gap-2 bg-white border border-border px-5 py-2 rounded-full shadow-sm">
                            <Star size={16} className="text-primary fill-primary" />
                            <span className="text-sm font-bold text-primary tracking-wide">{t('services.title')}</span>
                        </div>
                        <h2 className="animate-on-scroll anim-fade-up anim-delay-1 text-4xl md:text-5xl font-extrabold text-text">What We Offer</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <div className="animate-on-scroll anim-scale-in anim-delay-2">
                            <Link to="/services/marketing" className="group block h-full">
                                <GlassCard className="h-full flex flex-col p-0 hoverEffect bg-white" hoverEffect>
                                    <div className="aspect-[3/2] w-full overflow-hidden border-b border-border bg-gray-100 relative rounded-t-lg">
                                        <img src={siteImages.services.marketingBg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Marketing" />

                                        <div className="absolute top-4 left-4 bg-white p-2.5 rounded-2xl border border-border shadow-sm text-primary">
                                            <PenTool size={20} />
                                        </div>
                                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1.5 rounded-2xl text-xs font-bold shadow-md">
                                            Popular
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">{t('services.content_creation.title')}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{t('services.content_creation.desc')}</p>

                                        <div className="mt-auto flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Strategy</span>
                                            <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Social</span>
                                            <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Visuals</span>
                                        </div>
                                    </div>
                                </GlassCard>
                            </Link>
                        </div>

                        <div className="animate-on-scroll anim-scale-in anim-delay-3">
                            <Link to="/services/studio" className="group block h-full">
                                <GlassCard className="h-full flex flex-col p-0 hoverEffect bg-white" hoverEffect>
                                    <div className="aspect-[3/2] w-full overflow-hidden border-b border-border bg-gray-100 relative rounded-t-lg">
                                        <img src={siteImages.services.studioBg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Studio" />
                                        <div className="absolute top-4 left-4 bg-white p-2.5 rounded-2xl border border-border shadow-sm text-primary">
                                            <Camera size={20} />
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">{t('services.studio.title')}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{t('services.studio.desc')}</p>

                                        <div className="mt-auto flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Equipment</span>
                                            <span className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">Space</span>
                                        </div>
                                    </div>
                                </GlassCard>
                            </Link>
                        </div>

                        <div className="animate-on-scroll anim-scale-in anim-delay-4">
                            <Link to="/influencers" className="group block h-full">
                                <GlassCard className="h-full flex flex-col p-0 hoverEffect bg-white" hoverEffect>
                                    <div className="aspect-[3/2] w-full overflow-hidden border-b border-border bg-gray-100 relative rounded-t-lg">
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
                                        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{t('services.influencer_ads.desc')}</p>

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
                </div>
            </section> */}

        </div>
    );
};

export default Home;