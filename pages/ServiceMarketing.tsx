
import React from 'react';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { MessageCircle, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

const ServiceMarketing: React.FC = () => {
  const { t } = useLanguage();
  const { siteImages } = useData();

  const handleWhatsApp = () => {
    const message = encodeURIComponent(t('marketing.whatsapp_msg'));
    window.open(`https://wa.me/96555558718?text=${message}`, '_blank');
  };

  return (
    <div className="pt-20">
      
      <div className="bg-light-bg py-20 px-6">
        <div className="container  mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-6">{t('marketing.title')}</h1>
                <p className="text-xl text-secondary leading-relaxed mb-8">
                {t('marketing.desc')}
                </p>
                 <Button onClick={handleWhatsApp} className="px-8 py-4 bg-[#25D366] hover:bg-[#1ebc57] border-transparent text-white">
                    <MessageCircle className="me-2" /> {t('marketing.whatsapp_btn')}
                </Button>
            </div>
             <div className="rounded-2xl overflow-hidden h-[400px]">
                <img src={siteImages.services.marketingBg} alt="Marketing" className="w-full h-full object-cover" />
             </div>
        </div>
      </div>

      <div className="container  mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-primary border-b border-border pb-4">{t('marketing.what_we_offer')}</h3>
            <ul className="space-y-4">
              {[
                t('marketing.offer_1'),
                t('marketing.offer_2'),
                t('marketing.offer_3'),
                t('marketing.offer_4')
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-secondary">
                  <div className="p-1 bg-accent/10 rounded text-accent mt-0.5"><Check size={16} /></div>
                  <span className="font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <h3 className="text-2xl font-semibold text-primary border-b border-border pb-4">Our Work</h3>
             <div className="grid grid-cols-2 gap-4">
                {siteImages.services.marketingGallery.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden h-48 bg-gray-100">
                    <img src={img} alt="Portfolio" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceMarketing;
