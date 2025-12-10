import React from 'react';
import { GlassCard } from '../components/ui/GlassComponents';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const { siteImages } = useData();

  return (
    <div className="pt-20">
      
      {/* Hero */}
      <div className="bg-light-bg py-20 px-6">
         <div className="container  mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-6">{t('about.title')}</h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">{t('about.desc')}</p>
         </div>
      </div>

      <div className="container  mx-auto px-6 py-20 space-y-16">
        
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <img 
              src={siteImages.about.hero} 
              alt="About Fanora" 
              className="w-full h-full object-cover"
            />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">{t('about.mission_title')}</h3>
                <p className="text-secondary leading-relaxed">{t('about.mission_desc')}</p>
            </div>
            <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">{t('about.vision_title')}</h3>
                <p className="text-secondary leading-relaxed">{t('about.vision_desc')}</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;