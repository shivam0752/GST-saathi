'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'hindi' | 'marathi' | 'telugu' | 'english';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('hindi');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLang = sessionStorage.getItem('gst_saathi_lang') as Language;
    if (savedLang && ['hindi', 'marathi', 'telugu'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
    setIsLoading(false);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    sessionStorage.setItem('gst_saathi_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
