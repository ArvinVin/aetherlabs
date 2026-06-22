import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(nextLang);
  };

  const isId = i18n.language === 'id';

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center w-14 h-7 p-0.5 rounded-full bg-surface-elevated border border-white/[0.06] cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent/50 overflow-hidden transition-colors"
      aria-label="Toggle language"
    >
      <div
        className={`absolute h-6 w-6 bg-accent/20 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isId ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
      <div className="relative z-10 flex w-full justify-between px-1.5 text-[10px] font-mono font-medium tracking-wider">
        <span className={`transition-colors duration-300 ${!isId ? 'text-accent' : 'text-text-secondary'}`}>EN</span>
        <span className={`transition-colors duration-300 ${isId ? 'text-accent' : 'text-text-secondary'}`}>ID</span>
      </div>
    </button>
  );
}
