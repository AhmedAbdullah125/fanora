
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { MessageCircle, ArrowLeft, ArrowRight, Instagram, Twitter, Youtube, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { InfluencerSize, InfluencerType } from '../types';

const InfluencerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { influencers } = useData();
  const influencer = influencers.find(i => i.id === id);
  const { t, language, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  if (!influencer) {
    return <div className="pt-40 text-center text-primary font-bold">Influencer not found</div>;
  }

  const name = language === 'ar' ? influencer.name_ar : influencer.name_en;
  const bio = language === 'ar' ? influencer.bio_ar : influencer.bio_en;

  const handleRequest = () => {
    const profileUrl = window.location.href;
    const msgTemplate = t('influencers_page.whatsapp_req_msg');
    const message = encodeURIComponent(msgTemplate.replace('{NAME}', name).replace('{URL}', profileUrl));
    window.open(`https://wa.me/96555558718?text=${message}`, '_blank');
  };

  const socialIconMap: Record<string, any> = {
    instagram: Instagram,
    tiktok: Video,
    youtube: Youtube,
    snapchat: Twitter,
    twitter: Twitter
  };

  const getSizeLabel = (size: InfluencerSize) => {
    switch (size) {
      case InfluencerSize.NANO: return t('influencers_page.sizes.nano');
      case InfluencerSize.MICRO: return t('influencers_page.sizes.micro');
      case InfluencerSize.MACRO: return t('influencers_page.sizes.macro');
      case InfluencerSize.MEGA: return t('influencers_page.sizes.mega');
      default: return size;
    }
  };

  const getTypeLabel = (type: InfluencerType) => {
    switch (type) {
      case InfluencerType.TRENDY: return t('influencers_page.types.trendy');
      case InfluencerType.TRADITIONAL: return t('influencers_page.types.traditional');
      case InfluencerType.SPECIALIST: return t('influencers_page.types.specialist');
      case InfluencerType.DIGITAL_STAR: return t('influencers_page.types.digital_star');
      default: return type;
    }
  };


  return (
    <div className="pt-20 bg-light-bg min-h-screen">
      
      <div className="bg-white border-b border-border">
          <div className="max-w-[1100px] mx-auto px-6 py-6">
            <Link to="/influencers" className="inline-flex items-center text-secondary text-sm hover:text-primary transition-colors">
                <Arrow size={16} className="me-2" /> {t('influencers_page.back_to_dir')}
            </Link>
          </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <GlassCard className="p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Image Side */}
            <div className="w-full md:w-1/3 bg-gray-100 h-96 md:h-auto">
                <img 
                  src={influencer.profileImage} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
            </div>

            {/* Info Side */}
            <div className="w-full md:w-2/3 p-8 md:p-12 space-y-8">
              <div>
                <div className="flex gap-2 mb-4">
                     <span className="px-3 py-1 bg-gray-100 text-secondary text-xs font-semibold rounded">{getSizeLabel(influencer.size).split('(')[0]}</span>
                     <span className="px-3 py-1 bg-gray-100 text-secondary text-xs font-semibold rounded">{getTypeLabel(influencer.type)}</span>
                </div>
                <h1 className="text-4xl font-semibold text-primary mb-4">{name}</h1>
                <p className="text-lg text-secondary leading-relaxed">{bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-border">
                {influencer.socials.map((social, idx) => {
                  const Icon = socialIconMap[social.platform];
                  return (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-center gap-2 text-secondary mb-1">
                          {Icon && <Icon size={16} />}
                          <span className="text-xs uppercase font-semibold">{social.platform}</span>
                      </div>
                      <span className="font-bold text-xl text-primary">{social.followers}</span>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleRequest} className="bg-[#25D366] hover:bg-[#1ebc57] text-white border-none shadow-none">
                    <MessageCircle className="me-2" /> {t('influencers_page.request_influencer')}
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Album */}
        <div className="mt-16">
            <h3 className="text-2xl font-semibold text-primary mb-8">{t('influencers_page.recent_content')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {influencer.album.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-gray-200">
                  <img src={img} alt="Content" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerProfile;
