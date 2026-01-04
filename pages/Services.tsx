
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import * as Icons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Star } from 'lucide-react';

const Services: React.FC = () => {
  const { services, siteImages } = useData();
  const { t, language } = useLanguage();

  const getServiceBg = (id: string) => {
    switch (id) {
      case 'marketing': return siteImages.services.marketingBg;
      case 'studio': return siteImages.services.studioBg;
      case 'influencers': return siteImages.services.influencerBg;
      default: return '';
    }
  };

  const getTags = (id: string) => {
    if (id === 'marketing') return ['Strategy', 'Visuals', 'Copywriting'];
    if (id === 'studio') return ['Photography', 'Videography', 'Equipment'];
    if (id === 'influencers') return ['Reach', 'Engagement', 'Creators'];
    return ['Service'];
  }

  return (
    <div className="pt-32 min-h-screen bg-dots">

      <div className="text-center mb-16 space-y-4 px-6">
        <div className="inline-flex items-center gap-2 bg-white border border-border px-5 py-2 rounded-full shadow-sm">
          <Star size={16} className="text-primary fill-primary" />
          <span className="text-sm font-bold text-primary tracking-wide">Our Expertise</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text">{t('services.title')}</h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">{t('services.subtitle')}</p>
      </div>

      <div className="container  mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = (Icons as any)[service.icon.charAt(0).toUpperCase() + service.icon.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())] || Icons.Star;
            const title = language === 'ar' ? service.title_ar : service.title_en;
            const desc = language === 'ar' ? service.description_ar : service.description_en;

            return (
              <GlassCard key={service.id} className="h-full flex flex-col p-0 hoverEffect bg-white" hoverEffect>
                {/* Image Area */}
                <div className="aspect-[3/2] w-full overflow-hidden border-b border-border bg-gray-100 relative rounded-t-lg">
                  <img
                    src={getServiceBg(service.id)}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white p-2.5 rounded-2xl border border-border shadow-sm text-primary">
                    <IconComponent size={20} />
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-text mb-3">{title}</h3>
                  <p className="text-text-secondary mb-8 flex-grow leading-relaxed">{desc}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {getTags(service.id).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-tag-bg text-tag-text text-xs font-semibold rounded-2xl">{tag}</span>
                    ))}
                  </div>

                  <Link to={service.link}>
                    <Button fullWidth variant="outline">{t('services.view_details')}</Button>
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;