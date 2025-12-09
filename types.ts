export enum InfluencerSize {
  NANO = 'Nano (1K-10K)',
  MICRO = 'Micro (10K-100K)',
  MACRO = 'Macro (100K-1M)',
  MEGA = 'Mega (1M+)',
}

export enum InfluencerType {
  TRENDY = 'Trendy Blogger',
  TRADITIONAL = 'Traditional Nano Creator',
  SPECIALIST = 'Specialist',
  DIGITAL_STAR = 'Digital Star',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export interface SocialMedia {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'snapchat' | 'twitter';
  handle: string;
  followers: string;
  url: string;
}

export interface Influencer {
  id: string;
  name_en: string;
  name_ar: string;
  bio_en: string;
  bio_ar: string;
  gender: Gender;
  size: InfluencerSize;
  type: InfluencerType;
  profileImage: string;
  album: string[];
  socials: SocialMedia[];
}

export interface Service {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  icon: string;
  link: string;
  bgImage: string;
}

export type BookingStatus = 'new' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  customerName: string;
  email: string;
  date: string;
  duration?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SiteSettings {
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  address_en: string;
  address_ar: string;
  logoText: string;
}

export interface SiteImages {
  global: {
    logo: string;
    placeholderProfile: string;
  };
  home: {
    heroOverlay: string; // Optional image overlay for hero
  };
  about: {
    hero: string;
  };
  services: {
    marketingBg: string;
    studioBg: string;
    influencerBg: string;
    marketingGallery: string[];
    studioGallery: string[];
  };
  contact: {
    map: string;
  };
}