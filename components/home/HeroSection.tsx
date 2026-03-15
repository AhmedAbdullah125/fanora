import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/GlassComponents';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';

export const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    const heroRef = useRef<HTMLElement>(null!);

    useInView(heroRef, { threshold: 0.05 });

    return (
        <section ref={heroRef} className="bg-hero-bg pt-40 pb-24 px-6 md:px-8 border-b border-border">
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
                <div className="animate-on-scroll anim-fade-up anim-delay-5 flex gap-2  lg:gap-4 justify-center pt-2 ">
                    <Link to="/influencers">
                        <Button className="shadow-lg shadow-primary/20 lg:p-4 p-2">
                            {t('hero.btn_find_influencers')}
                        </Button>
                    </Link>
                    <Link to="/services">
                        <Button variant="outline" className="bg-white lg:p-4 p-2">
                            {t('hero.btn_explore_services')}
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
};
