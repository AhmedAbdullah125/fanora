
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, MessageCircle, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { authStore } from '../lib/authStore';
import { useProfile } from '../lib/useProfile';
import logo from '@/public/newLogo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, language, toggleLanguage } = useLanguage();
  const { siteImages } = useData();
  const { data: profile } = useProfile();
  const tokens = authStore.get();
  const isLoggedIn = !!tokens;

  const userAvatar = profile?.influencer?.avatar;

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.influencers'), path: '/influencers' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4">
      <nav className="max-w-6xl mx-auto bg-white border border-border rounded-[48px] shadow-soft py-2 px-2 md:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 pl-2">
          <img
            src={logo}
            alt="Kani"
            className="h-8 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-5 py-2.5 rounded-[48px] text-sm font-medium transition-all duration-300 ${isActive(link.path)
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Login/Profile Link (Desktop) */}
          {isLoggedIn ? (
            <Link
              to="/profile"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[48px] text-sm font-medium transition-all duration-300 ${isActive('/profile')
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
            >
              {userAvatar ? (
                <img src={userAvatar} alt="Profile" className="h-7 w-7 rounded-full object-cover border border-primary/20" />
              ) : (
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={14} className="text-primary" />
                </div>
              )}
              <span className="pr-1">{t('nav.profile')}</span>
            </Link>
          ) : (
            <Link
              to="/register"
              className={`px-5 py-2.5 rounded-[48px] text-sm font-medium transition-all duration-300 ${isActive('/register')
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
            >
              {t('nav.login')}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 pr-2">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-accent-light hover:text-primary transition-colors"
            title="Switch Language"
          >
            <span className="font-bold text-sm text-primary">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {/* Chat Button (Desktop) */}
          <a href="https://wa.me/96555558718" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-[48px] text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm">
            <MessageCircle size={16} />
            <span>Chat Now</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-primary bg-gray-50 rounded-full"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white border border-border rounded-3xl shadow-lg mx-auto max-w-6xl p-2 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${isActive(link.path)
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-border my-2"></div>

            {/* Login/Profile (Mobile) */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${isActive('/profile')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {userAvatar ? (
                  <img src={userAvatar} alt="Profile" className="h-8 w-8 rounded-full object-cover border border-white/20" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={16} className={isActive('/profile') ? 'text-white' : 'text-primary'} />
                  </div>
                )}
                <span>{t('nav.profile')}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${isActive('/login')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {t('nav.login')}
              </Link>
            )}

            <div className="h-px bg-border my-2"></div>
            <a href="https://wa.me/96555558718" className="px-4 py-3 rounded-2xl text-sm font-medium text-center bg-accent-light text-primary">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
