'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';

const categories = [
  { id: 1, emoji: '🛒', hindi: 'Kirana / Grocery', marathi: 'किराणा / Grocery', telugu: 'కిరాణా / Grocery' },
  { id: 2, emoji: '👔', hindi: 'Kapda / Textile', marathi: 'कापड / Textile', telugu: 'వస్త్రాలు / Textile' },
  { id: 3, emoji: '📱', hindi: 'Electronics', marathi: 'Electronics', telugu: 'Electronics' },
  { id: 4, emoji: '🔧', hindi: 'Hardware / Auzaar', marathi: 'हार्डवेअर / Auzaar', telugu: 'హార్డ్వేర్ / Auzaar' },
  { id: 5, emoji: '🍽️', hindi: 'Khana / Food & Bev', marathi: 'खाणे / Food & Bev', telugu: 'ఆహారం / Food & Bev' },
  { id: 6, emoji: '📦', hindi: 'Kuch aur / Other', marathi: 'इतर / Other', telugu: 'ఇతరత్రా / Other' },
];

export default function CategorySelectionPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleCategory = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background px-[20px] pb-[120px]">
      {/* Header */}
      <div className="pt-[56px] flex flex-col items-center relative">
        <button
          onClick={() => router.push('/onboarding/gstin')}
          className="absolute left-[-10px] top-[56px] w-[40px] h-[40px] flex items-center justify-center touch-target"
        >
          <ChevronLeft size={20} className="text-text-primary" />
        </button>

        {/* Progress Dots */}
        <div className="flex gap-[6px] mt-[8px]">
          <div className="w-[8px] h-[8px] rounded-full bg-primary" />
          <div className="w-[8px] h-[8px] rounded-full bg-primary" />
          <div className="w-[8px] h-[8px] rounded-full border border-border" />
        </div>
      </div>

      <span className="text-[11px] font-medium text-primary mt-[16px] text-center uppercase tracking-wider">
        Aakhri step!
      </span>

      <h1 className="text-[20px] font-semibold text-text-primary mt-[6px] text-center">
        {s.whatDoYouSell}
      </h1>
      
      <p className="text-[13px] text-text-secondary mt-[6px] text-center">
        {s.categorySubtext}
      </p>
      
      <p className="text-[11px] text-text-muted mt-[4px] text-center">
        Ek se zyada chun sakte hain
      </p>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-[12px] mt-[24px]">
        {categories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id);
          const name = cat[language as keyof typeof cat] as string;

          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`
                relative h-[100px] flex flex-col items-center justify-center rounded-[14px] transition-all duration-150 shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                ${isSelected 
                  ? 'bg-primary-light border-2 border-primary' 
                  : 'bg-white border border-border'
                }
              `}
            >
              <span className="text-[28px]">{cat.emoji}</span>
              <span className="text-[14px] font-semibold text-text-primary mt-[6px] text-center px-[8px] leading-tight">
                {name}
              </span>
              
              {isSelected && (
                <div className="absolute top-[8px] right-[8px]">
                  <Check size={16} className="text-primary" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto px-[20px] pb-[32px] pt-[40px] bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <button
          disabled={selectedIds.length === 0}
          onClick={() => router.push('/dashboard?showMicPrompt=true')}
          className={`
            pointer-events-auto w-full h-[52px] rounded-[12px] text-white text-[15px] font-semibold transition-all
            ${selectedIds.length > 0 
              ? 'bg-primary cursor-pointer active:scale-[0.98]' 
              : 'bg-text-muted opacity-50 cursor-not-allowed'
            }
          `}
        >
          {s.letsStart}
        </button>
      </div>
    </div>
  );
}
