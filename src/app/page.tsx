'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';

export default function SplashScreen() {
  const router = useRouter();
  const { language, isLoading } = useLanguage();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      const savedLang = localStorage.getItem('gst_saathi_lang');
      if (savedLang) {
        router.push('/dashboard');
      } else {
        router.push('/language');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [router, isLoading, language]);

  // Default to Hindi tagline on first load if language not yet determined
  const currentStrings = strings[language] || strings.hindi;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-[20px]">
      {/* Top 40% empty space */}
      <div className="flex-[4]" />

      {/* Centre cluster */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center flex-[4]"
      >
        {/* App Icon */}
        <div className="w-[60px] h-[60px] bg-primary rounded-[16px] flex items-center justify-center relative shadow-sm">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M6 4H18M6 9H18M6 14H9M9 14C15.667 14 15.667 4 9 4M6 14L14.5 22"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Small leaf shape at bottom-right of the rupee */}
            <path
              d="M16 16C16 16 17.5 17.5 19 17.5C20.5 17.5 22 16.5 22 15C22 13.5 20.5 12 19 12C17.5 12 16 13.5 16 13.5V16Z"
              fill="white"
            />
          </svg>
        </div>

        <h1 className="text-[26px] font-bold text-text-primary mt-[16px] text-center">
          GST Saathi
        </h1>
        <p className="text-[14px] font-normal text-text-secondary mt-[8px] text-center leading-tight">
          {currentStrings.tagline}
        </p>
      </motion.div>

      {/* Bottom 20% */}
      <div className="flex-[2] flex flex-col items-center justify-center w-full">
        <div className="flex gap-[8px] mb-[12px]">
          <div className="w-[8px] h-[8px] rounded-full animate-dot-1" />
          <div className="w-[8px] h-[8px] rounded-full animate-dot-2" />
          <div className="w-[8px] h-[8px] rounded-full animate-dot-3" />
        </div>
        <span className="text-[11px] text-text-muted uppercase tracking-wider">
          {currentStrings.loading}
        </span>
      </div>
    </div>
  );
}
