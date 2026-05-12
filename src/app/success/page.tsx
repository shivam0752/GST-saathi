'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Star, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';
import { dummyFiling } from '@/lib/dummyData';

export default function SuccessPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/dashboard');
    }
  }, [countdown, router]);

  // Confetti generation
  const confetti = useMemo(() => {
    const colors = ['#16A34A', '#FCD34D', '#6EE7B7', '#BBF7D0', '#FFFFFF'];
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 2,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Confetti Layer */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          initial={{ y: -20, x: `${c.x}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: '100vh', rotate: c.rotation + 360, opacity: 0 }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: Math.random() * 2
          }}
          style={{
            position: 'absolute',
            zIndex: 0,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            borderRadius: c.shape === 'circle' ? '50%' : '2px',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center px-[20px] pt-[80px]">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ duration: 0.5 }}
          className="w-[80px] h-[80px] bg-primary border-4 border-primary-border rounded-full flex items-center justify-center shadow-lg"
        >
          <Check size={36} className="text-white" strokeWidth={4} />
        </motion.div>

        <h1 className="text-[28px] font-bold text-text-primary mt-[16px] text-center">
          {s.congratulations}
        </h1>
        <p className="text-[16px] font-medium text-primary mt-[4px] text-center">
          {s.filedSuccess}
        </p>

        {/* Filing Receipt Card */}
        <div className="mt-[20px] w-full bg-white rounded-[14px] border border-border shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-[16px]">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-[12px] block">
            Filing receipt
          </span>

          <div className="flex flex-col">
            <ReceiptRow
              icon={<div className="w-[16px] h-[16px] bg-primary rounded-full flex items-center justify-center"><Check size={10} className="text-white" /></div>}
              label="GSTR-1 submit ho gayi"
              refId={dummyFiling.gstr1Ref}
              isGreen
            />
            <ReceiptRow
              icon={<div className="w-[16px] h-[16px] bg-primary rounded-full flex items-center justify-center"><Check size={10} className="text-white" /></div>}
              label="GSTR-3B submit ho gayi"
              refId={dummyFiling.gstr3bRef}
              isGreen
            />
            <ReceiptRow
              icon={<span className="text-[16px]">💰</span>}
              label={`${dummyFiling.finalPayable} pay ho gaya`}
              refId={dummyFiling.paidTime}
              isLast
            />
          </div>
        </div>

        {/* Compliance Score Card */}
        <div className="mt-[12px] w-full bg-gradient-to-br from-[#16A34A] to-[#0F766E] rounded-[14px] p-[16px] flex items-center justify-between shadow-lg">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
              Aapka Compliance Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[42px] font-bold text-white leading-none">
                {dummyFiling.complianceScore}
              </span>
              <span className="text-[18px] font-normal text-white">/100</span>
            </div>
            <div className="flex gap-1 mt-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} fill="white" className="text-white" />
              ))}
            </div>
            <span className="text-[12px] text-white/60 mt-1">
              +3 is mahine
            </span>
          </div>

          <button className="border-1.5 border-white rounded-[8px] p-[8px_14px] bg-transparent text-white text-[12px] font-semibold flex items-center gap-2 active:bg-white/10 transition-colors">
            Share karein 📤
          </button>
        </div>

        {/* Countdown + Actions */}
        <div className="mt-[24px] flex flex-col items-center">
          <div className="relative w-[60px] h-[60px] flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r="26"
                stroke="#E2E0D8"
                strokeWidth="4"
                fill="none"
              />
              <motion.circle
                cx="30"
                cy="30"
                r="26"
                stroke="#16A34A"
                strokeWidth="4"
                fill="none"
                strokeDasharray="163"
                initial={{ strokeDashoffset: 163 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 5, ease: 'linear' }}
                strokeLinecap="round"
                className="origin-center -rotate-90"
              />
            </svg>
            <span className="absolute text-[20px] font-bold text-primary">
              {countdown}
            </span>
          </div>
          <p className="text-[11px] text-text-muted mt-2">
            {countdown} {s.goingHome}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-[16px] w-full flex flex-col gap-[8px] pb-[32px]">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full h-[52px] bg-primary rounded-[12px] text-white text-[15px] font-semibold active:scale-[0.98] transition-transform"
          >
            {s.homeScreen}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReceiptRow({ icon, label, refId, isGreen, isLast }: { icon: React.ReactNode, label: string, refId: string, isGreen?: boolean, isLast?: boolean }) {
  return (
    <div className={`h-[40px] flex items-center gap-3 ${!isLast ? 'border-b border-surface' : ''}`}>
      {icon}
      <span className={`text-[13px] flex-1 truncate ${isGreen ? 'font-semibold text-primary' : 'font-medium text-text-primary'}`}>
        {label}
      </span>
      <span className="text-[11px] text-text-muted whitespace-nowrap">
        {refId.length > 12 ? `Ref: ${refId.slice(0, 12)}...` : refId}
      </span>
    </div>
  );
}
