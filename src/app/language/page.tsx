'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';

type LanguageKey = 'hindi' | 'marathi' | 'telugu';

interface LanguageOption {
  key: LanguageKey | string;
  native: string;
  english: string;
  comingSoon?: boolean;
}

const languages: LanguageOption[] = [
  { key: 'hindi', native: 'हिंदी', english: 'Hindi' },
  { key: 'marathi', native: 'मराठी', english: 'Marathi' },
  { key: 'telugu', native: 'తెలుగు', english: 'Telugu' },
  { key: 'tamil', native: 'தமிழ்', english: 'Tamil', comingSoon: true },
  { key: 'kannada', native: 'ಕನ್ನಡ', english: 'Kannada', comingSoon: true },
  { key: 'bengali', native: 'বাংলা', english: 'Bengali', comingSoon: true },
];

export default function LanguageSelection() {
  const router = useRouter();
  const { setLanguage } = useLanguage();
  const [selected, setSelected] = useState<LanguageKey | null>(null);

  const handleContinue = () => {
    if (selected) {
      setLanguage(selected);
      router.push('/auth');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background px-[20px] pt-[64px]">
      {/* Top Section */}
      <div className="flex flex-col items-center">
        {/* Small App Icon */}
        <div className="w-[36px] h-[36px] bg-primary rounded-[10px] flex items-center justify-center shadow-sm">
          <svg
            width="20"
            height="20"
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
            <path
              d="M16 16C16 16 17.5 17.5 19 17.5C20.5 17.5 22 16.5 22 15C22 13.5 20.5 12 19 12C17.5 12 16 13.5 16 13.5V16Z"
              fill="white"
            />
          </svg>
        </div>

        <h1 className="text-[18px] font-semibold text-text-primary mt-[10px]">
          GST Saathi
        </h1>
        <p className="text-[13px] text-text-secondary mt-[6px]">
          Apni bhasha chunein
        </p>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-2 gap-[12px] mt-[32px] mb-[120px]">
        {languages.map((lang) => {
          const isSelected = selected === lang.key;
          const isComingSoon = lang.comingSoon;

          return (
            <button
              key={lang.key}
              disabled={isComingSoon}
              onClick={() => !isComingSoon && setSelected(lang.key as LanguageKey)}
              className={`
                relative h-[90px] w-full flex flex-col items-center justify-center rounded-[14px] transition-all duration-200
                ${isComingSoon 
                  ? 'opacity-40 cursor-not-allowed bg-white border border-border' 
                  : isSelected 
                    ? 'bg-primary-light border-2 border-primary' 
                    : 'bg-white border border-border shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                }
              `}
            >
              <span className="text-[20px] font-bold text-text-primary">
                {lang.native}
              </span>
              <span className="text-[12px] font-normal text-text-secondary mt-[4px]">
                {lang.english}
              </span>
              
              {isComingSoon && (
                <span className="text-[10px] text-text-muted mt-[2px]">
                  Coming soon
                </span>
              )}

              {isSelected && (
                <div className="absolute top-[8px] right-[8px]">
                  <Check size={14} className="text-primary font-bold" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto px-[20px] pb-[32px] pt-[40px] bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <button
          disabled={!selected}
          onClick={handleContinue}
          className={`
            pointer-events-auto w-full h-[52px] rounded-[12px] text-white text-[15px] font-semibold transition-all
            ${selected 
              ? 'bg-primary cursor-pointer' 
              : 'bg-text-muted opacity-50 cursor-not-allowed'
            }
          `}
        >
          {selected ? strings[selected].continueBtn : 'Aage badhein →'}
        </button>
      </div>
    </div>
  );
}
