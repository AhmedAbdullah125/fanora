import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { InfluencerSize, InfluencerType, Gender } from '../types';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { Filter, Instagram, Twitter, Youtube, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Influencers: React.FC = () => {
  const { influencers, siteImages } = useData(); 
  const [selectedSize, setSelectedSize] = useState<InfluencerSize | ''>('');
  const [selectedType, setSelectedType] = useState<InfluencerType | ''>('');
  const [selectedGender, setSelectedGender] = useState<Gender | ''>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t, language } = useLanguage();

  const filteredInfluencers = useMemo(() => {
    return influencers.filter((inf) => {
      const matchSize = selectedSize ? inf.size === selectedSize : true;
      const matchType = selectedType ? inf.type === selectedType : true;
      const matchGender = selectedGender ? inf.gender === selectedGender : true;
      return matchSize && matchType && matchGender;
    });
  }, [selectedSize, selectedType, selectedGender, influencers]);

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

  const getGenderLabel = (g: Gender) => {
    return g === Gender.MALE ? t('influencers_page.genders.male') : t('influencers_page.genders.female');
  };

  return (
    <div className="pt-20">
      
      <div className="bg-light-bg py-16 px-6 border-b border-border">
         <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="text-3xl font-semibold text-primary">{t('nav.influencers')}</h1>
            <div className="md:hidden w-full">
                <Button onClick={() => setIsFilterOpen(!isFilterOpen)} variant="secondary" fullWidth className="flex justify-between">
                    <span>{t('influencers_page.filter_btn')}</span> <Filter size={18} />
                </Button>
            </div>
         </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        
        {/* Filters Sidebar */}
        <aside className={`md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-32 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="font-semibold text-primary">{t('influencers_page.filters')}</h3>
              {(selectedSize || selectedType || selectedGender) && (
                <button 
                  onClick={() => { setSelectedSize(''); setSelectedType(''); setSelectedGender(''); }}
                  className="text-xs font-medium text-accent hover:underline"
                >
                  {t('influencers_page.reset')}
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-3">{t('influencers_page.category_size')}</label>
                <div className="space-y-2">
                  {Object.values(InfluencerSize).map((size) => (
                    <label key={size} className="flex items-center gap-3 text-sm text-secondary cursor-pointer hover:text-primary">
                      <input 
                        type="radio" 
                        name="size" 
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(size)}
                        className="accent-accent w-4 h-4"
                      />
                      {getSizeLabel(size)}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-3">{t('influencers_page.type')}</label>
                <div className="space-y-2">
                  {Object.values(InfluencerType).map((type) => (
                    <label key={type} className="flex items-center gap-3 text-sm text-secondary cursor-pointer hover:text-primary">
                      <input 
                        type="radio" 
                        name="type" 
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                         className="accent-accent w-4 h-4"
                      />
                      {getTypeLabel(type)}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-3">{t('influencers_page.gender')}</label>
                <div className="space-y-2">
                   {Object.values(Gender).map((g) => (
                     <label key={g} className="flex items-center gap-3 text-sm text-secondary cursor-pointer hover:text-primary">
                       <input 
                         type="radio" 
                         name="gender" 
                         checked={selectedGender === g}
                         onChange={() => setSelectedGender(g)}
                          className="accent-accent w-4 h-4"
                       />
                       {getGenderLabel(g)}
                     </label>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfluencers.length > 0 ? (
              filteredInfluencers.map((influencer) => {
                const name = language === 'ar' ? influencer.name_ar : influencer.name_en;
                const imgUrl = influencer.profileImage || siteImages.global.placeholderProfile;
                
                return (
                  <GlassCard key={influencer.id} className="flex flex-col items-center p-0 overflow-hidden hoverEffect">
                    <div className="w-full h-48 bg-gray-100 relative">
                        <img 
                            src={imgUrl} 
                            alt={name} 
                            onError={(e) => { (e.target as HTMLImageElement).src = siteImages.global.placeholderProfile; }}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="p-6 text-center w-full">
                        <h3 className="text-lg font-bold text-primary mb-1">{name}</h3>
                        <span className="text-xs font-medium text-accent bg-blue-50 px-2 py-1 rounded mb-4 inline-block">
                        {getSizeLabel(influencer.size).split('(')[0].trim()}
                        </span>
                        
                        <div className="flex justify-center gap-4 mb-6">
                        {influencer.socials.map((social, idx) => {
                            const Icon = socialIconMap[social.platform];
                            return (
                            <div key={idx} className="flex items-center gap-1 text-secondary">
                                {Icon && <Icon size={14} />}
                                <span className="text-xs font-semibold">{social.followers}</span>
                            </div>
                            );
                        })}
                        </div>

                        <Link to={`/influencers/${influencer.id}`} className="block w-full">
                        <Button variant="outline" fullWidth className="text-sm py-2 h-10">
                            {t('influencers_page.view_profile')}
                        </Button>
                        </Link>
                    </div>
                  </GlassCard>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-secondary mb-2">{t('influencers_page.no_results')}</h3>
                <button 
                  className="text-accent hover:underline text-sm font-medium"
                  onClick={() => { setSelectedSize(''); setSelectedType(''); setSelectedGender(''); }}
                >
                  {t('influencers_page.clear_filters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Influencers;