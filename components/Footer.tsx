
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { siteImages } = useData();

  return (
    <footer className="bg-white border-t border-border mt-auto pt-16 pb-8">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          
          <div className="max-w-xs space-y-4">
            <Link to="/" className="inline-block flex items-center gap-2">
               <img 
                 src={siteImages.global.logo} 
                 alt="Fanora" 
                 className="h-8 w-auto object-contain" 
               />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>
          
          <div className="flex gap-12 md:gap-24">
              <div>
                <h4 className="font-bold text-text mb-6 text-sm uppercase tracking-wider">{t('footer.quick_links')}</h4>
                <ul className="space-y-3 text-sm text-text-secondary font-medium">
                  <li><Link to="/about" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
                  <li><Link to="/services" className="hover:text-primary transition-colors">{t('nav.services')}</Link></li>
                  <li><Link to="/influencers" className="hover:text-primary transition-colors">{t('nav.influencers')}</Link></li>
                  <li><Link to="/contact" className="hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-text mb-6 text-sm uppercase tracking-wider">{t('footer.connect')}</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-tag-bg flex items-center justify-center text-text hover:bg-primary hover:text-white transition-all"><Instagram size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-tag-bg flex items-center justify-center text-text hover:bg-primary hover:text-white transition-all"><Twitter size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-tag-bg flex items-center justify-center text-text hover:bg-primary hover:text-white transition-all"><Linkedin size={18} /></a>
                </div>
              </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-gray-400 font-medium">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;