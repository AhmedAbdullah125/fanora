
import React, { useState } from 'react';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { addMessage, siteImages } = useData();
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    addMessage({
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      isRead: false,
      createdAt: new Date().toISOString()
    });
    
    setIsSent(true);
    form.reset();
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="pt-20">
      
      <div className="bg-light-bg py-20 px-6 text-center">
         <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-4">{t('contact.title')}</h1>
         <p className="text-xl text-secondary">{t('contact.subtitle')}</p>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
          
          <div className="space-y-8">
             <div className="space-y-6">
                <div className="flex gap-6">
                   <div className="w-12 h-12 bg-light-bg rounded-lg flex items-center justify-center text-primary flex-shrink-0"><MapPin size={20} /></div>
                   <div>
                      <h4 className="font-semibold text-primary text-lg mb-1">{t('contact.visit_us')}</h4>
                      <p className="text-secondary leading-relaxed">{t('contact.address')}</p>
                   </div>
                </div>
                <div className="flex gap-6">
                   <div className="w-12 h-12 bg-light-bg rounded-lg flex items-center justify-center text-primary flex-shrink-0"><Mail size={20} /></div>
                   <div>
                      <h4 className="font-semibold text-primary text-lg mb-1">{t('contact.email_us')}</h4>
                      <p className="text-secondary">hello@fanora.com</p>
                   </div>
                </div>
                <div className="flex gap-6">
                   <div className="w-12 h-12 bg-light-bg rounded-lg flex items-center justify-center text-primary flex-shrink-0"><Phone size={20} /></div>
                   <div>
                      <h4 className="font-semibold text-primary text-lg mb-1">{t('contact.call_us')}</h4>
                      <p className="text-secondary">+965 5555 8718</p>
                   </div>
                </div>
             </div>

             <div className="h-64 rounded-xl overflow-hidden bg-gray-200 relative">
               <img src={siteImages.contact.map} className="w-full h-full object-cover" alt="Map" />
               <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                 <Button variant="secondary" className="bg-white shadow-md text-primary">{t('contact.open_maps')}</Button>
               </div>
             </div>
          </div>

          <GlassCard className="h-fit">
            <h3 className="text-2xl font-semibold text-primary mb-6">{t('contact.send_msg_title')}</h3>
            {isSent ? (
               <div className="p-6 bg-green-50 text-green-800 rounded-lg text-center font-medium border border-green-200">
                 Message Sent Successfully! We will contact you soon.
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required name="name" type="text" placeholder={t('contact.placeholder_name')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                  <input required name="email" type="email" placeholder={t('contact.placeholder_email')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <input required name="subject" type="text" placeholder={t('contact.placeholder_subject')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" />
                <textarea required name="message" rows={5} placeholder={t('contact.placeholder_msg')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
                <Button fullWidth type="submit" className="mt-2">{t('contact.btn_send')}</Button>
              </form>
            )}
          </GlassCard>

      </div>
    </div>
  );
};

export default Contact;
