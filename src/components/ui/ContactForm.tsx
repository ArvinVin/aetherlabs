import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, Check, ChevronDown } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  details: z.string().min(10, 'Please provide more details (min 10 characters)'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const selectedService = watch('service');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const serviceOptions = [
    { value: 'web', label: t('contact.form.service_options.web') },
    { value: 'mobile', label: t('contact.form.service_options.mobile') },
    { value: 'fivem', label: t('contact.form.service_options.fivem') },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-caption">{t('contact.form.name')}</label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="input-luxury"
          autoComplete="name"
        />
        {errors.name && <span className="text-xs text-red-400 font-mono">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-caption">{t('contact.form.email')}</label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="input-luxury"
          autoComplete="email"
        />
        {errors.email && <span className="text-xs text-red-400 font-mono">{errors.email.message}</span>}
      </div>

      {/* Custom Service Dropdown */}
      <div className="flex flex-col gap-1.5" ref={dropdownRef}>
        <label className="text-caption">{t('contact.form.service')}</label>
        
        {/* Hidden input to hook into react-hook-form */}
        <input type="hidden" {...register('service')} />
        
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`input-luxury w-full text-left flex items-center justify-between ${!selectedService ? 'text-zinc-500' : 'text-white'}`}
          >
            {selectedService 
              ? serviceOptions.find(o => o.value === selectedService)?.label 
              : '—'}
            <ChevronDown size={16} className={`text-zinc-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div 
              className="absolute top-[calc(100%+8px)] left-0 right-0 p-1.5 bg-[#111113] border border-white/[0.08] rounded-xl shadow-2xl z-50 animate-fade-in-up backdrop-blur-xl" 
              style={{ animationDuration: '0.2s' }}
            >
              {serviceOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setValue('service', opt.value, { shouldValidate: true });
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                    selectedService === opt.value 
                      ? 'bg-accent/10 text-accent font-medium' 
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.service && <span className="text-xs text-red-400 font-mono">{errors.service.message}</span>}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="details" className="text-caption">{t('contact.form.details')}</label>
        <textarea
          {...register('details')}
          id="details"
          rows={4}
          className="input-luxury resize-none"
        />
        {errors.details && <span className="text-xs text-red-400 font-mono">{errors.details.message}</span>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-medium text-sm rounded-lg hover:bg-zinc-200 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSuccess ? (
          <>
            <Check size={16} />
            {t('contact.form.sent')}
          </>
        ) : isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            {t('contact.form.sending')}
          </>
        ) : (
          <>
            <Send size={14} />
            {t('contact.form.send')}
          </>
        )}
      </button>
    </form>
  );
}
