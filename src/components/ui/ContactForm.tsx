import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, ChevronDown, Mail, ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  details: z.string().min(10, 'Please provide more details (min 10 characters)'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const { t } = useTranslation();
  const [validatedData, setValidatedData] = useState<FormData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    // Show email provider selection instead of simulated submit
    setValidatedData(data);
  };

  const serviceOptions = [
    { value: 'web', label: t('contact.form.service_options.web') },
    { value: 'mobile', label: t('contact.form.service_options.mobile') },
    { value: 'fivem', label: t('contact.form.service_options.fivem') },
  ];

  if (validatedData) {
    const subject = encodeURIComponent('New Project Inquiry — AetherLabs');
    const serviceLabel = serviceOptions.find(o => o.value === validatedData.service)?.label || validatedData.service;
    const bodyText = `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nService: ${serviceLabel}\n\nDetails:\n${validatedData.details}`;
    const body = encodeURIComponent(bodyText);
    const to = 'arvinindrawan@gmail.com';

    return (
      <div className="flex flex-col gap-6 w-full animate-fade-in-up bg-white/[0.02] border border-white/[0.04] p-8 rounded-2xl">
        <div className="flex flex-col gap-2 mb-2">
          <h3 className="text-xl font-medium text-white">Send via...</h3>
          <p className="text-sm text-text-secondary">Select your preferred email service to securely send this message to us.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { reset(); setValidatedData(null); }}
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#EA4335]/10 text-[#EA4335] hover:bg-[#EA4335]/20 border border-[#EA4335]/20 transition-all font-medium"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
            </svg>
            Gmail
          </a>
          <a
            href={`https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { reset(); setValidatedData(null); }}
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#0078D4]/10 text-[#0078D4] hover:bg-[#0078D4]/20 border border-[#0078D4]/20 transition-all font-medium"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M7.88 12.04q0-1.07.4-1.66.41-.59 1.13-.59.73 0 1.12.59.39.59.39 1.66 0 1.05-.39 1.63-.39.58-1.12.58-.72 0-1.13-.58-.4-.58-.4-1.63zm-1.08 0q0 1.58.74 2.45.74.88 2.01.88 1.25 0 1.99-.88.75-.87.75-2.45 0-1.57-.75-2.43-.74-.87-1.99-.87-1.27 0-2.01.87-.74.86-.74 2.43zm11.23-2.31h1.16v4.61h.04l1.3-4.61h1.22l-1.58 4.62 1.68 4.63h-1.26l-1.39-4.63h-.04v4.63h-1.13V9.73zM0 6.64l10.3-1.6v13.91L0 17.36V6.64zM24 4.5v15c0 .28-.22.5-.5.5H11.4v-16H23.5c.28 0 .5.22.5.5z"/>
            </svg>
            Outlook
          </a>
          <a
            href={`https://compose.mail.yahoo.com/?to=${to}&subject=${subject}&body=${body}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { reset(); setValidatedData(null); }}
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#6001D2]/10 text-[#a066ff] hover:bg-[#6001D2]/30 border border-[#6001D2]/30 transition-all font-medium"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M22.51 1.705L12.54 14.542 9.073 1.705H5.875l4.898 16.591v4.02h3.454v-4.004l8.835-16.607h-3.552z" />
            </svg>
            Yahoo
          </a>
          <a
            href={`mailto:${to}?subject=${subject}&body=${body}`}
            onClick={() => { reset(); setValidatedData(null); }}
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 text-white hover:bg-white/10 border border-white/10 transition-all font-medium"
          >
            <Mail size={16} />
            Default Mail App
          </a>
        </div>

        <button
          onClick={() => setValidatedData(null)}
          className="mt-4 flex items-center justify-center gap-2 text-sm text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to edit
        </button>
      </div>
    );
  }

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
        className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-medium text-sm rounded-lg hover:bg-zinc-200 transition-all duration-300"
      >
        <Send size={14} />
        {t('contact.form.send')}
      </button>
    </form>
  );
}
