import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { Calendar, Clock, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface BookingForm {
  name: string;
  email: string;
  date: string;
  time: string;
}

const ServiceStudio: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingForm>();
  const [submitted, setSubmitted] = useState(false);
  const { t, dir } = useLanguage();
  const { addBooking, siteImages } = useData();

  const getMinDateTime = () => {
    const date = new Date();
    date.setHours(date.getHours() + 48);
    return date.toISOString().slice(0, 16);
  };

  const onSubmit = (data: BookingForm) => {
    addBooking({
      id: Date.now().toString(),
      customerName: data.name,
      email: data.email,
      date: data.date,
      serviceId: 'studio',
      status: 'new',
      createdAt: new Date().toISOString()
    });
    setSubmitted(true);
    reset();
  };

  return (
    <div className="pt-20">
      
      <div className="bg-light-bg py-20 px-6 text-center">
         <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-4">{t('studio_page.title')}</h1>
         <p className="text-xl text-secondary">{t('studio_page.subtitle')}</p>
      </div>

      <div className="container  mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
          
          <div className="space-y-12">
             <div className="grid grid-cols-2 gap-4">
               <div className="col-span-2 h-64 rounded-xl overflow-hidden bg-gray-100">
                  <img src={siteImages.services.studioGallery[0]} className="w-full h-full object-cover" alt="Studio" />
               </div>
               {siteImages.services.studioGallery.slice(1,3).map((img, i) => (
                  <div key={i} className="h-40 rounded-xl overflow-hidden bg-gray-100">
                     <img src={img} className="w-full h-full object-cover" alt="Studio" />
                  </div>
               ))}
             </div>

             <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">{t('studio_page.features_title')}</h3>
                <p className="text-secondary leading-relaxed">{t('studio_page.features_desc')}</p>
             </div>
          </div>

          <GlassCard className="h-fit">
            <h2 className="text-2xl font-semibold text-primary mb-8 border-b border-border pb-4">
              {t('studio_page.book_title')}
            </h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <Check size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{t('studio_page.success_title')}</h3>
                <p className="text-secondary mb-6">{t('studio_page.success_desc')}</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="text-sm">{t('studio_page.book_another')}</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">{t('studio_page.label_name')}</label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder={t('studio_page.placeholder_name')}
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1 block">{t('studio_page.required')}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">{t('studio_page.label_email')}</label>
                  <input
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder={t('studio_page.placeholder_email')}
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1 block">{t('studio_page.invalid_email')}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">{t('studio_page.label_date')}</label>
                    <input
                        type="datetime-local"
                        min={getMinDateTime()}
                        {...register("date", { required: true })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-primary"
                      />
                    {errors.date && <span className="text-red-500 text-xs mt-1 block">{t('studio_page.required')}</span>}
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-primary mb-2">{t('studio_page.label_duration')}</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-primary">
                        <option>{t('studio_page.durations.two_hours')}</option>
                        <option>{t('studio_page.durations.four_hours')}</option>
                        <option>{t('studio_page.durations.full_day')}</option>
                    </select>
                   </div>
                </div>

                <Button type="submit" fullWidth className="mt-4">
                  {t('studio_page.btn_submit')}
                </Button>
              </form>
            )}
          </GlassCard>
      </div>
    </div>
  );
};

export default ServiceStudio;