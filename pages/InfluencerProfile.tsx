import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../context/DataContext';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { MessageCircle, ArrowLeft, ArrowRight, Instagram, Twitter, Youtube, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '@/lib/apiConfig';
import FancyboxWrapper from '@/components/ui/FancyboxWrapper';

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
  content: Array<{
    id: number;
    image: string;
  }>;
  total_followers: number;
  created_at: string;
  updated_at: string;
}

const InfluencerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { siteImages } = useData();
  const [influencer, setInfluencer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  // Helper function to format follower counts
  const formatFollowers = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE_URL}/influencers/${id}`);

        if (response.data.status && response.data.items) {
          const inf: ApiInfluencer = response.data.items;

          // Transform API data to component structure
          const transformedData = {
            id: inf.id,
            name: inf.name,
            bio: inf.bio,
            avatar: inf.avatar,
            size: inf.category_size.name,
            sizeRange: inf.category_size.range,
            type: inf.content_type.name,
            gender: inf.sex,
            socials: inf.social_media_accounts.map(account => ({
              platform: account.platform.name.toLowerCase(),
              followers: formatFollowers(account.follower_count),
              icon: account.platform.icon
            })),
            content: inf.content.map(item => item.image),
            totalFollowers: formatFollowers(inf.total_followers),
            phone: inf.phone,
            email: inf.email
          };

          setInfluencer(transformedData);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching influencer:', err);
        setError('Failed to load influencer profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInfluencer();
    }
  }, [id]);

  const handleRequest = () => {
    if (!influencer) return;
    const profileUrl = window.location.href;
    const msgTemplate = t('influencers_page.whatsapp_req_msg');
    const message = encodeURIComponent(msgTemplate.replace('{NAME}', influencer.name).replace('{URL}', profileUrl));
    window.open(`https://wa.me/96555558718?text=${message}`, '_blank');
  };

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
          <p className="text-secondary">Loading influencer profile...</p>
        </div>
      </div>
    );
  }

  if (error || !influencer) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Influencer not found'}</p>
          <Link to="/influencers">
            <Button>Back to Influencers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-light-bg min-h-screen">

      <div className="bg-white border-b border-border">
        <div className="container  mx-auto px-6 py-6">
          <Link to="/influencers" className="inline-flex items-center text-secondary text-sm hover:text-primary transition-colors">
            <Arrow size={16} className="me-2" /> {t('influencers_page.back_to_dir')}
          </Link>
        </div>
      </div>

      <div className="container  mx-auto px-6 py-12">
        <GlassCard className="p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Image Side */}
            {/* Image Side */}
            <div className="w-full md:w-1/3 bg-gray-100 h-96 md:h-auto relative group cursor-pointer">
              <FancyboxWrapper>
                <a
                  data-fancybox="influencer-profile"
                  href={influencer.avatar}
                  data-thumb={influencer.avatar}
                >
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    onError={(e) => {
                      if (siteImages?.global?.placeholderProfile) {
                        (e.target as HTMLImageElement).src = siteImages.global.placeholderProfile;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </FancyboxWrapper>
            </div>

            {/* Info Side */}
            <div className="w-full md:w-2/3 p-8 md:p-12 space-y-8">
              <div>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-secondary text-xs font-semibold rounded">
                    {influencer.size} ({influencer.sizeRange})
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-secondary text-xs font-semibold rounded">
                    {influencer.type}
                  </span>
                </div>
                <h1 className="text-4xl font-semibold text-primary mb-4">{influencer.name}</h1>
                <p className="text-lg text-secondary leading-relaxed">{influencer.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-border">
                {influencer.socials.map((social: any, idx: number) => {
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
        {influencer.content && influencer.content.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-primary mb-8">{t('influencers_page.recent_content')}</h3>
            <FancyboxWrapper>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {influencer.content.map((img: string, idx: number) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-gray-200 relative group cursor-pointer">
                    <a
                      data-fancybox="influencer-gallery"
                      href={img}
                      data-thumb={img}
                    >
                      <img
                        src={img}
                        alt={`Content ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </FancyboxWrapper>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerProfile;