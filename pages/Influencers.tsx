import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { Filter, Instagram, Twitter, Youtube, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '@/lib/apiConfig';

interface ApiInfluencer {
  id: number;
  name: string;
  bio: string;
  phone: string;
  email: string;
  sex: string;
  avatar: string;
  category_size: {
    id: number;
    name: string;
    range: string;
  };
  content_type: {
    id: number;
    name: string;
  };
  social_media_accounts: Array<{
    id: number;
    follower_count: number;
    platform: {
      id: number;
      name: string;
      icon: string;
    };
  }>;
  total_followers: number;
}

interface LookupData {
  sategory_sizes: Array<{ id: number; name: string; range: string }>;
  content_types: Array<{ id: number; name: string }>;
  sexs: Array<{ id: string; name: string }>;
}

const Influencers: React.FC = () => {
  const { siteImages } = useData(); 
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [lookupData, setLookupData] = useState<LookupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t, language } = useLanguage();

  // Fetch lookups once on mount
  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const lookupsRes = await axios.get(`${API_BASE_URL}/lookups`);
        if (lookupsRes.data.status && lookupsRes.data.items) {
          setLookupData(lookupsRes.data.items);
        }
      } catch (err) {
        console.error('Error fetching lookups:', err);
      }
    };
    
    fetchLookups();
  }, []);

  // Helper function to format follower counts
  const formatFollowers = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  // Fetch influencers when filters change
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        
        // Prepare form data with filters
        const formData = new FormData();
        formData.append('page_size', '10');
        formData.append('page_number', '1');
        
        if (selectedType) {
          formData.append('content_type_id', selectedType);
        }
        if (selectedSize) {
          formData.append('category_size_id', selectedSize);
        }
        if (selectedGender) {
          formData.append('sex', selectedGender);
        }
        
        const influencersRes = await axios.post(`${API_BASE_URL}/influencers`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // Process influencers data
        if (influencersRes.data.status && influencersRes.data.items.influencers) {
          const transformedData = influencersRes.data.items.influencers.map((inf: ApiInfluencer) => ({
            id: inf.id,
            name_en: inf.name,
            name_ar: inf.name,
            profileImage: inf.avatar,
            size: inf.category_size.name,
            sizeId: inf.category_size.id,
            type: inf.content_type.name,
            typeId: inf.content_type.id,
            gender: inf.sex,
            socials: inf.social_media_accounts.map(account => ({
              platform: account.platform.name.toLowerCase(),
              followers: formatFollowers(account.follower_count),
              icon: account.platform.icon
            })),
            totalFollowers: inf.total_followers
          }));
          setInfluencers(transformedData);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching influencers:', err);
        setError('Failed to load influencers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, [selectedSize, selectedType, selectedGender]);

  const socialIconMap: Record<string, any> = {
    instagram: Instagram,
    tiktok: Video, 
    youtube: Youtube,
    snapchat: Twitter,
    twitter: Twitter
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-secondary">Loading influencers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="bg-light-bg py-16 px-6 border-b border-border">
         <div className="container  mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="text-3xl font-semibold text-primary">{t('nav.influencers')}</h1>
            <div className="md:hidden w-full">
                <Button onClick={() => setIsFilterOpen(!isFilterOpen)} variant="secondary" fullWidth className="flex justify-between">
                    <span>{t('influencers_page.filter_btn')}</span> <Filter size={18} />
                </Button>
            </div>
         </div>
      </div>

      <div className="container  mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        
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
              {/* Category Size Filter */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-3">
                  {t('influencers_page.category_size')}
                </label>
                <div className="space-y-2">
                  {lookupData?.sategory_sizes.map((size) => (
                    <label key={size.id} className="flex items-center gap-3 text-sm text-secondary cursor-pointer hover:text-primary">
                      <input 
                        type="radio" 
                        name="size" 
                        checked={selectedSize === size.id.toString()}
                        onChange={() => setSelectedSize(size.id.toString())}
                        className="accent-accent w-4 h-4"
                      />
                      {size.name} ({size.range})
                    </label>
                  ))}
                </div>
              </div>

              {/* Content Type Filter */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-3">
                  {t('influencers_page.type')}
                </label>
                <div className="space-y-2">
                  {lookupData?.content_types.map((type) => (
                    <label key={type.id} className="flex items-center gap-3 text-sm text-secondary cursor-pointer hover:text-primary">
                      <input 
                        type="radio" 
                        name="type" 
                        checked={selectedType === type.id.toString()}
                        onChange={() => setSelectedType(type.id.toString())}
                        className="accent-accent w-4 h-4"
                      />
                      {type.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-3">
                  {t('influencers_page.gender')}
                </label>
                <div className="space-y-2">
                  {lookupData?.sexs.map((sex) => (
                    <label key={sex.id} className="flex items-center gap-3 text-sm text-secondary cursor-pointer hover:text-primary">
                      <input 
                        type="radio" 
                        name="gender" 
                        checked={selectedGender === sex.id}
                        onChange={() => setSelectedGender(sex.id)}
                        className="accent-accent w-4 h-4"
                      />
                      {sex.name || sex.male}
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
            {influencers.length > 0 ? (
              influencers.map((influencer) => {
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
                          {influencer.size}
                        </span>
                        
                        <div className="flex justify-center gap-4 mb-6">
                          {influencer.socials.map((social: any, idx: number) => {
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