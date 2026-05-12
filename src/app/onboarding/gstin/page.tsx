'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, Loader2, MapPin, ClipboardList, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';
import { dummyBusiness } from '@/lib/dummyData';

export default function GstinEntryPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [gstin, setGstin] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'valid'>('idle');
  const [showSheet, setShowSheet] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (gstin.length === 15) {
      setStatus('loading');
      const timer = setTimeout(() => {
        setStatus('valid');
        const sheetTimer = setTimeout(() => {
          setShowSheet(true);
        }, 800);
        return () => clearTimeout(sheetTimer);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setStatus('idle');
    }
  }, [gstin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15);
    setGstin(val);
  };

  const handleReject = () => {
    setShowSheet(false);
    setGstin('');
    setStatus('idle');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background px-[20px]">
      {/* Header Section */}
      <div className="pt-[56px] flex flex-col items-center relative">
        <button
          onClick={() => router.push('/auth')}
          className="absolute left-[-10px] top-[56px] w-[40px] h-[40px] flex items-center justify-center touch-target"
        >
          <ChevronLeft size={20} className="text-text-primary" />
        </button>

        {/* Progress Dots */}
        <div className="flex gap-[6px] mt-[8px]">
          <div className="w-[8px] h-[8px] rounded-full bg-primary" />
          <div className="w-[8px] h-[8px] rounded-full border border-border" />
          <div className="w-[8px] h-[8px] rounded-full border border-border" />
        </div>
      </div>

      <h1 className="text-[20px] font-semibold text-text-primary mt-[24px] text-center">
        {s.enterGstin}
      </h1>
      <p className="text-[13px] text-text-secondary mt-[6px] text-center max-w-[280px] mx-auto">
        {s.gstinSubtext}
      </p>

      {/* GSTIN Input */}
      <div 
        className={`
          flex h-[52px] rounded-[10px] bg-white mt-[32px] px-[14px] items-center relative transition-all duration-200 border-1.5
          ${status === 'valid' || isFocused ? 'border-primary ring-1 ring-primary/20' : 'border-border'}
        `}
      >
        <input
          type="text"
          value={gstin}
          onChange={handleInputChange}
          placeholder="Ex: 27AABCS1234A1ZK"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-text-primary placeholder:text-text-muted tracking-[0.08em] uppercase"
        />
        
        <div className="absolute right-[14px] flex items-center">
          {status === 'loading' && (
            <Loader2 size={16} className="text-primary animate-spin" />
          )}
          {status === 'valid' && (
            <div className="w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center">
              <Check size={12} className="text-white" strokeWidth={3} />
            </div>
          )}
        </div>
      </div>

      <button className="text-[12px] text-primary font-medium mt-[12px] text-center w-full">
        📷 GSTIN QR code se scan karein
      </button>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {showSheet && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSheet(false)}
              className="fixed inset-0 bg-black/40 z-[40]"
            />
            {/* Sheet */}
            <motion.div
              initial={{ translateY: '100%' }}
              animate={{ translateY: '0%' }}
              exit={{ translateY: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white rounded-t-[20px] shadow-[0_-4px_24px_rgba(0,0,0,0.12)] z-[50] pb-[32px] px-[20px]"
            >
              {/* Drag Handle */}
              <div className="w-[40px] h-[4px] bg-border rounded-[2px] mx-auto mt-[12px] mb-[16px]" />

              {/* Success Row */}
              <div className="flex items-center justify-center gap-[8px]">
                <div className="w-[28px] h-[28px] bg-primary rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-[15px] font-semibold text-primary">
                  {s.businessFound}
                </span>
              </div>

              <h2 className="text-[20px] font-bold text-text-primary mt-[4px] text-center">
                {dummyBusiness.name}
              </h2>

              {/* Detail Rows */}
              <div className="mt-[16px] border-t border-border/50">
                <DetailRow icon={<MapPin size={20} />} label="Pata" value={dummyBusiness.address} />
                <DetailRow icon={<ClipboardList size={20} />} label="Prakar" value={dummyBusiness.type} />
                <DetailRow icon={<Calendar size={20} />} label="Filing" value={dummyBusiness.filing} />
                
                <div className="h-[44px] flex items-center px-[4px] border-b border-border/50">
                  <div className="text-text-muted">●</div>
                  <span className="text-[12px] text-text-muted ml-[10px]">Status</span>
                  <div className="ml-auto bg-primary-light border border-primary-border rounded-full px-[10px] py-[4px] text-[11px] font-medium text-primary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {dummyBusiness.status}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-[8px] mt-[20px]">
                <button
                  onClick={() => router.push('/onboarding/category')}
                  className="w-full h-[52px] bg-primary rounded-[12px] text-white text-[15px] font-semibold"
                >
                  {s.confirmBusiness}
                </button>
                <button
                  onClick={handleReject}
                  className="w-full h-[48px] bg-white border-1.5 border-border rounded-[12px] text-text-primary text-[14px] font-medium"
                >
                  {s.rejectBusiness}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="h-[44px] flex items-center px-[4px] border-b border-border/50">
      <div className="text-text-muted">{icon}</div>
      <span className="text-[12px] text-text-muted ml-[10px]">{label}</span>
      <span className="ml-auto text-[13px] font-medium text-text-primary truncate max-w-[180px]">
        {value}
      </span>
    </div>
  );
}
