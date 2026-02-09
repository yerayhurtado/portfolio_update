'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronDown, LuCheck } from 'react-icons/lu';

// Usaremos SVGs públicos de alta calidad para asegurar que se vean
const LANGUAGES = [
  { 
    code: 'en', 
    label: 'English', 
    flag: 'https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg' 
  },
  { 
    code: 'es', 
    label: 'Español', 
    flag: 'https://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg' 
  },
];

export const SelectLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = useLocale();

  const activeLanguage = LANGUAGES.find(l => l.code === currentLocale) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    const segments = pathName.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botón Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/3 border border-white/10 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/8 transition-all backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          {/* Bandera con imagen para asegurar visualización */}
          <img 
            src={activeLanguage.flag} 
            alt={activeLanguage.label}
            className="w-4 h-3 object-cover rounded-xs shadow-sm"
          />
          <span className="uppercase tracking-widest font-mono">{currentLocale}</span>
        </div>
        
        <LuChevronDown 
          size={14}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Menú Desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-44 origin-top-right rounded-2xl border border-white/10 bg-[#161616] p-2 shadow-2xl z-50 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all ${
                    currentLocale === lang.code 
                      ? 'bg-[#00D4FF]/10 text-[#00D4FF]' 
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <img 
                    src={lang.flag} 
                    alt={lang.label}
                    className="w-5 h-3.5 object-cover rounded-xs"
                  />
                  <span className="flex-1 text-left font-medium">{lang.label}</span>
                  
                  {currentLocale === lang.code && (
                    <LuCheck size={14} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};