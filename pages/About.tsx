import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useInView } from '../hooks/useInView';

const SERVICES = ['service_1', 'service_2', 'service_3', 'service_4'] as const;
const ICONS = ['🏆', '📅', '📊', '📋'];

const About: React.FC = () => {
  const { t, lang } = useLanguage();
  const { siteImages } = useData();
  const pageRef = useRef<HTMLDivElement>(null!);

  useInView(pageRef, { threshold: 0.1 });

  return (
    <div className="pt-20 overflow-hidden" ref={pageRef}>

      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-br from-primary/10 via-white to-primary/5 py-24 px-6">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-5">
          <span className="animate-on-scroll anim-fade-up anim-delay-0 inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
            {lang === 'ar' ? 'من نحن' : 'About Us'}
          </span>
          <h1 className="animate-on-scroll anim-fade-up anim-delay-1 text-4xl md:text-6xl font-bold text-primary leading-tight">
            {t('about.title')}
          </h1>
          <p className="animate-on-scroll anim-fade-up anim-delay-2 text-xl md:text-2xl text-gray-600 font-medium">
            {t('about.tagline')}
          </p>
        </div>
      </div>

      {/* ── Hero Image ── */}
      {siteImages?.about?.hero && (
        <div className="container mx-auto px-6 -mt-8 max-w-5xl relative z-20 animate-on-scroll anim-scale-in anim-delay-3">
          <div className="w-full aspect-[16/6] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={siteImages.about.hero}
              alt="KANI"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* ── Platform Description ── */}
      <div className="container mx-auto px-6 py-16 max-w-4xl space-y-6 text-center">
        <p className="animate-on-scroll anim-fade-up anim-delay-0 text-lg text-gray-700 leading-relaxed">
          {t('about.platform_desc')}
        </p>
        <div className="animate-on-scroll anim-fade-up anim-delay-1 inline-flex items-center gap-3 bg-primary text-white rounded-2xl px-8 py-4 text-base font-semibold shadow-lg">
          <span>✦</span>
          <span>{t('about.transform_desc')}</span>
          <span>✦</span>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div className="bg-light-bg py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((key, i) => {
              const delayIndex = Math.min((i % 4) + 1, 6);
              return (
                <div
                  key={key}
                  className={`animate-on-scroll anim-fade-up anim-delay-${delayIndex} flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-primary/10 hover:border-primary/30 hover:shadow-md transition-all group`}
                >
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl group-hover:bg-primary/20 transition-colors">
                    {ICONS[i]}
                  </div>
                  <div>
                    <span className="text-primary font-bold text-sm">{i + 1} —</span>
                    <p className="text-gray-700 font-medium mt-0.5">{t(`about.${key}`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="animate-on-scroll anim-fade-up anim-delay-1 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-xl">🎯</div>
              <h3 className="text-xl font-bold text-primary">{t('about.mission_title')}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">{t('about.mission_desc')}</p>
          </div>
          {/* Vision */}
          <div className="animate-on-scroll anim-fade-up anim-delay-2 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-xl">🔭</div>
              <h3 className="text-xl font-bold text-primary">{t('about.vision_title')}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">{t('about.vision_desc')}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;