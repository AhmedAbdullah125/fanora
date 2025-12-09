
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Influencer, Service, Booking, ContactMessage, SiteSettings, SiteImages } from '../types';
import { initialInfluencers, initialServices, initialSiteImages } from '../data/mockData';
import { translations as initialTranslations } from '../data/translations';

interface DataContextType {
  influencers: Influencer[];
  services: Service[];
  bookings: Booking[];
  messages: ContactMessage[];
  translations: any;
  settings: SiteSettings;
  siteImages: SiteImages;
  
  isBackendConnected: boolean;

  // Actions
  addInfluencer: (inf: Influencer) => void;
  updateInfluencer: (inf: Influencer) => void;
  deleteInfluencer: (id: string) => void;
  
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  
  addMessage: (msg: ContactMessage) => void;
  markMessageRead: (id: string) => void;
  
  updateTranslations: (newTranslations: any) => void;
  updateSettings: (newSettings: SiteSettings) => void;
  updateSiteImage: (section: keyof SiteImages, key: string, url: string, index?: number) => void;
  replaceSiteImages: (newImages: SiteImages) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // -- State Initialization (Default to Mocks) --
  const [influencers, setInfluencers] = useState<Influencer[]>(initialInfluencers);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [translations, setTranslations] = useState<any>(initialTranslations);
  const [settings, setSettings] = useState<SiteSettings>({
      whatsappNumber: '96555558718',
      contactEmail: 'hello@fanora.com',
      contactPhone: '+965 5555 8718',
      address_en: '123 Creative Tower, Digital City, Dubai, UAE',
      address_ar: '123 برج الإبداع، المدينة الرقمية، دبي، الإمارات',
      logoText: 'Fanora'
  });
  const [siteImages, setSiteImages] = useState<SiteImages>(initialSiteImages);

  // -- Load Data from Backend (or LocalStorage fallback) --
  useEffect(() => {
    const initData = async () => {
      try {
        const res = await fetch('/api/data'); // Assumes proxy or same origin
        if (res.ok) {
          const serverData = await res.json();
          // Check if server returned empty object (first run)
          if (Object.keys(serverData).length > 0) {
            if(serverData.influencers) setInfluencers(serverData.influencers);
            if(serverData.services) setServices(serverData.services);
            if(serverData.bookings) setBookings(serverData.bookings);
            if(serverData.messages) setMessages(serverData.messages);
            if(serverData.translations) setTranslations(serverData.translations);
            if(serverData.settings) setSettings(serverData.settings);
            if(serverData.siteImages) setSiteImages(serverData.siteImages);
          }
          setIsBackendConnected(true);
        } else {
          throw new Error("Backend not reachable");
        }
      } catch (err) {
        console.warn("Backend API not connected. Falling back to LocalStorage.");
        setIsBackendConnected(false);
        // Fallback Logic
        const savedImages = localStorage.getItem('fanora_site_images');
        if (savedImages) setSiteImages(JSON.parse(savedImages));
        const savedInfluencers = localStorage.getItem('fanora_influencers');
        if (savedInfluencers) setInfluencers(JSON.parse(savedInfluencers));
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  // -- Persistence Helper --
  const persistData = async (newData: any) => {
    if (isBackendConnected) {
      try {
        // We construct the full state object to save
        const fullState = {
          influencers: newData.influencers || influencers,
          services: newData.services || services,
          bookings: newData.bookings || bookings,
          messages: newData.messages || messages,
          translations: newData.translations || translations,
          settings: newData.settings || settings,
          siteImages: newData.siteImages || siteImages,
        };
        
        await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullState)
        });
      } catch (e) {
        console.error("Failed to save to server", e);
      }
    } else {
      // Local Storage Fallback
      if(newData.influencers) localStorage.setItem('fanora_influencers', JSON.stringify(newData.influencers));
      if(newData.siteImages) localStorage.setItem('fanora_site_images', JSON.stringify(newData.siteImages));
      // ... etc
    }
  };

  // -- Actions --

  const addInfluencer = (inf: Influencer) => {
    const newState = [...influencers, inf];
    setInfluencers(newState);
    persistData({ influencers: newState });
  };
  
  const updateInfluencer = (updatedInf: Influencer) => {
    const newState = influencers.map(inf => inf.id === updatedInf.id ? updatedInf : inf);
    setInfluencers(newState);
    persistData({ influencers: newState });
  };
  
  const deleteInfluencer = (id: string) => {
    const newState = influencers.filter(inf => inf.id !== id);
    setInfluencers(newState);
    persistData({ influencers: newState });
  };

  const addBooking = (booking: Booking) => {
    const newState = [booking, ...bookings];
    setBookings(newState);
    persistData({ bookings: newState });
  };
  
  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const newState = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(newState);
    persistData({ bookings: newState });
  };

  const addMessage = (msg: ContactMessage) => {
    const newState = [msg, ...messages];
    setMessages(newState);
    persistData({ messages: newState });
  };
  
  const markMessageRead = (id: string) => {
    const newState = messages.map(m => m.id === id ? { ...m, isRead: true } : m);
    setMessages(newState);
    persistData({ messages: newState });
  };

  const updateTranslations = (newTrans: any) => {
    setTranslations(newTrans);
    persistData({ translations: newTrans });
  };
  
  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    persistData({ settings: newSettings });
  };

  // NEW: Pure URL Update Logic (Individual)
  const updateSiteImage = (section: keyof SiteImages, key: string, url: string, index?: number) => {
    let newImagesObj = { ...siteImages };
    
    // Check if the target is an array (for galleries)
    // Cast to any to allow dynamic property access with string keys
    const targetSection = newImagesObj[section] as any;
    const currentValue = targetSection[key];

    if (Array.isArray(currentValue) && index !== undefined) {
       // Update Array Item
       const currentArray = [...currentValue];
       currentArray[index] = url;
       targetSection[key] = currentArray;
    } else {
       // Update String Field
       targetSection[key] = url;
    }

    setSiteImages(newImagesObj);
    persistData({ siteImages: newImagesObj });
  };

  // NEW: Bulk Update Logic
  const replaceSiteImages = (newImages: SiteImages) => {
    setSiteImages(newImages);
    persistData({ siteImages: newImages });
  };

  const resetData = () => {
    if(window.confirm("Are you sure? This will wipe all CMS data and reset to defaults.")) {
      localStorage.clear();
      // Also clear server data if connected
      if(isBackendConnected) {
          persistData({
             influencers: initialInfluencers,
             services: initialServices,
             siteImages: initialSiteImages,
             translations: initialTranslations
          });
      }
      window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{
      influencers, services, bookings, messages, translations, settings, siteImages,
      isBackendConnected,
      addInfluencer, updateInfluencer, deleteInfluencer,
      addBooking, updateBookingStatus,
      addMessage, markMessageRead,
      updateTranslations, updateSettings, updateSiteImage, replaceSiteImages, resetData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
