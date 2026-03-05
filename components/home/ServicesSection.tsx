import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, PenTool, Camera, Users } from 'lucide-react';
import { GlassCard } from '../ui/GlassComponents';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useInView } from '../../hooks/useInView';

export const ServicesSection: React.FC = () => {
    const { t } = useLanguage();
    const { siteImages } = useData();
    const servicesRef = useRef<HTMLElement>(null!);

    useInView(servicesRef, { threshold: 0.08 });

    return (
        <section ref={servicesRef} className="py-24 px-6 bg-dots relative">
            <div className="container mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="animate-on-scroll anim-fade-up anim-delay-0 inline-flex items-center gap-2 bg-white border border-border px-5 py-2 rounded-full shadow-sm">
                        <Star size={16} className="text-primary fill-primary" />
                        <span className="text-sm font-bold text-primary tracking-wide">{t('services.title')}</span>
                    </div>
                    <h2 className="animate-on-scroll anim-fade-up anim-delay-1 text-4xl md:text-5xl font-extrabold text-text">What We Offer</h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Marketing Card */}
                    <div className="animate-on-scroll anim-scale-in anim-delay-2">
                        <Link to="/services/marketing" className="group block h-full">
                            <GlassCard className="h-full flex flex-col p-0 hoverEffect bg-white" hoverEffect>
                                {/* Top Image - Rounded Top Only */}
                                <div className="aspect-[3/2] w-full overflow-hidden border-b border-border bg-gray-100 relative rounded-t-lg">
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

                    {/* Studio Card */}
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

                    {/* Influencer Card */}
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
        </section>
    );
};
