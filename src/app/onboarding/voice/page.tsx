'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';

export default function VoiceOrderPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [state, setState] = useState<'listening' | 'finished'>('listening');
  const [showChips, setShowChips] = useState(false);

  const transcripts = {
    hindi: 'Shyam ko 20 kilo cheeni becha, ₹900 cash',
    marathi: 'श्याम ला 20 किलो साखर विकली, ₹900 रोख',
    telugu: 'శ్యామ్కు 20 కిలో చక్కెర అమ్మాను, ₹900 నగదు',
  };

  const currentTranscript = transcripts[language as keyof typeof transcripts] || transcripts.hindi;

  const startSimulation = () => {
    setState('listening');
    setShowChips(false);
    
    const timer = setTimeout(() => {
      setState('finished');
      const chipsTimer = setTimeout(() => {
        setShowChips(true);
      }, 500);
      return () => clearTimeout(chipsTimer);
    }, 2500);
    
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    startSimulation();
  }, []);

  const handleRetry = () => {
    startSimulation();
  };

  const waveformBars = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    id: i,
    initialHeight: Math.random() * 28 + 8,
    delay: Math.random() * 0.5
  })), []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Overlay Layer */}
      <div className="fixed inset-0 bg-black/80 z-[30]" />

      {/* Close Button */}
      <button
        onClick={() => router.push('/dashboard')}
        className="fixed top-[56px] right-[20px] w-[40px] h-[40px] flex items-center justify-center text-white z-[50]"
      >
        <X size={24} />
      </button>

      {/* Top Instruction */}
      <div className="absolute top-[100px] left-0 right-0 flex flex-col items-center z-[40] px-[20px]">
        <h2 className="text-[18px] font-medium text-white text-center">
          {s.speakOrder}
        </h2>
        <p className="text-[13px] text-white/60 mt-[6px] text-center">
          Hindi mein bolein, hum samjhenge
        </p>
      </div>

      {/* Mic Button Cluster */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-[40]">
        {/* Pulsing Rings */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[156px] h-[156px] border-2 border-primary/10 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="absolute w-[124px] h-[124px] border-2 border-primary/25 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute w-[96px] h-[96px] border-2 border-primary/50 rounded-full"
          />
          
          <div className="relative w-[72px] h-[72px] bg-primary rounded-full flex items-center justify-center shadow-lg z-10">
            <Mic size={28} className="text-white" />
          </div>
        </div>

        <div className="mt-[16px] text-center">
          <span className="text-[13px] text-white italic font-light flex items-center gap-1">
            {s.listening}
            <span className="flex">
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }}>.</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>.</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>.</motion.span>
            </span>
          </span>
        </div>

        {/* Waveform */}
        <div className="flex items-center justify-center gap-[5px] mt-[12px] h-[40px]">
          {waveformBars.map((bar) => (
            <motion.div
              key={bar.id}
              initial={{ height: bar.initialHeight }}
              animate={{ height: [bar.initialHeight, bar.initialHeight * 0.4, bar.initialHeight * 1.2, bar.initialHeight] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: bar.delay,
                ease: 'easeInOut'
              }}
              className="w-[3px] bg-primary rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Transcript Card */}
      <AnimatePresence>
        {state === 'finished' && (
          <motion.div
            initial={{ translateY: '100%' }}
            animate={{ translateY: '0%' }}
            exit={{ translateY: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white rounded-t-[20px] p-[20px] pb-[32px] z-[50]"
          >
            {/* Drag Handle */}
            <div className="w-[40px] h-[4px] bg-border rounded-[2px] mx-auto mb-[16px]" />

            <p className="text-[16px] font-medium text-text-primary leading-[1.5]">
              "{currentTranscript}"
            </p>
            
            {!showChips && (
              <p className="text-[11px] text-text-muted mt-[4px]">
                AI samajh raha hai...
              </p>
            )}

            {/* Chips Row */}
            <div className="flex flex-wrap gap-[8px] mt-[12px]">
              {showChips && (
                <>
                  <Chip text="👤 Shyam" color="green" index={0} />
                  <Chip text="🌾 Cheeni — HSN 1701" color="blue" index={1} />
                  <Chip text="⚖️ 20 kg" color="grey" index={2} />
                  <Chip text="💰 ₹900 cash" color="grey" index={3} />
                </>
              )}
            </div>

            <div className="h-[1px] bg-surface mt-[14px]" />

            {/* Action Buttons */}
            <div className="flex gap-[10px] mt-[12px]">
              <button
                onClick={handleRetry}
                className="flex-1 h-[48px] bg-white border-1.5 border-border rounded-[12px] text-text-primary text-[14px] font-medium"
              >
                {s.retryOrder}
              </button>
              <button
                onClick={() => router.push('/onboarding/invoice')}
                className="flex-1 h-[48px] bg-primary rounded-[12px] text-white text-[15px] font-semibold"
              >
                {s.confirmOrder}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ text, color, index }: { text: string, color: 'green' | 'blue' | 'grey', index: number }) {
  const styles = {
    green: 'bg-primary-light border-primary-border text-primary',
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    grey: 'bg-surface border-border text-text-secondary',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`h-[28px] px-[10px] rounded-[20px] border flex items-center text-[12px] font-medium whitespace-nowrap ${styles[color]}`}
    >
      {text}
    </motion.div>
  );
}
