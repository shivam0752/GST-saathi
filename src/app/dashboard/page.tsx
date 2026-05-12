'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Home, Receipt, FileCheck, Bell, Mic, X, Check, ArrowRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';
import { dummyBusiness, dummyFiling, dummyTransactions } from '@/lib/dummyData';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceState, setVoiceState] = useState<'listening' | 'finished'>('listening');
  const [showChips, setShowChips] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  
  // Dynamic Activity Logic
  const [hasInvoice, setHasInvoice] = useState(false);
  const [hasBill, setHasBill] = useState(false);

  useEffect(() => {
    setHasInvoice(localStorage.getItem('hasAddedInvoice') === 'true');
    setHasBill(localStorage.getItem('hasAddedBill') === 'true');

    if (searchParams.get('showMicPrompt') === 'true') {
      setShowPrompt(true);
      const timer = setTimeout(() => setShowPrompt(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const filteredTransactions = useMemo(() => {
    return dummyTransactions.filter(tx => {
      if (tx.type === 'sale') return hasInvoice;
      if (tx.type === 'purchase') return hasBill;
      return false;
    });
  }, [hasInvoice, hasBill]);

  const transcripts = {
    hindi: 'Shyam ko 20 kilo cheeni becha, ₹900 cash',
    marathi: 'श्याम ला 20 किलो साखर विकली, ₹900 रोख',
    telugu: 'శ్యామ్కు 20 కిలో చక్కెర అమ్మాను, ₹900 నగదు',
  };

  const currentTranscript = transcripts[language as keyof typeof transcripts] || transcripts.hindi;

  const startVoiceRecording = () => {
    setIsVoiceActive(true);
    setVoiceState('listening');
    setShowChips(false);
    setShowPrompt(false);
    
    setTimeout(() => {
      setVoiceState('finished');
      setTimeout(() => setShowChips(true), 500);
    }, 2500);
  };

  const waveformBars = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    id: i,
    initialHeight: Math.random() * 28 + 8,
    delay: Math.random() * 0.5
  })), []);

  return (
    <div className="flex flex-col min-h-screen bg-background px-[20px] pb-[120px] relative overflow-x-hidden">
      {/* Top Bar */}
      <div className="pt-[56px] flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-text-primary">
            {s.dashboardGreeting}, Sharma ji
          </span>
          <span className="text-[12px] text-text-secondary mt-[2px]">
            Meerut, UP
          </span>
        </div>
        <div className="w-[36px] h-[36px] rounded-full bg-primary-light border-1.5 border-primary flex items-center justify-center">
          <span className="text-[14px] font-semibold text-primary">{dummyBusiness.ownerInitial}</span>
        </div>
      </div>

      {/* Business Health Card (Fills Space) */}
      <div className="mt-[20px] bg-gradient-to-br from-primary to-primary/80 rounded-[16px] p-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-primary-light" />
            <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">Bikri ka graph</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[24px] font-bold">₹1,24,000</span>
              <p className="text-[11px] opacity-70 mt-1">Pichle mahine se 12% jyada</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-[10px] font-bold">
              APRIL 2024
            </div>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-[120px] h-[120px] bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Deadline Card */}
      <button
        onClick={() => router.push('/filing')}
        className="w-full mt-[16px] bg-warning-bg border border-warning-border rounded-[14px] p-[12px_16px] flex items-center gap-[10px] text-left shadow-sm"
      >
        <div className="w-[20px] h-[20px] flex items-center justify-center text-[18px]">📅</div>
        <div className="flex-1 flex flex-col">
          <span className="text-[12px] font-bold text-[#92400E] uppercase tracking-tight">{s.deadlineCard}</span>
          <span className="text-[12px] text-[#92400E]/80 mt-1">11 din baad — 20 May 2024</span>
        </div>
        <div className="bg-primary-light text-primary border border-primary-border rounded-full px-[10px] py-[3px] text-[11px] font-bold">
          94%
        </div>
      </button>

      {/* Nav Grid */}
      <div className="grid grid-cols-2 gap-[12px] mt-[20px]">
        <div className="h-[80px] bg-primary-light border-2 border-primary rounded-[16px] flex flex-col items-center justify-center gap-[6px] shadow-sm">
          <Home size={24} className="text-primary" />
          <span className="text-[12px] font-bold text-primary">{s.homeTab}</span>
        </div>

        <button onClick={() => router.push('/bills')} className="h-[80px] bg-white border border-border rounded-[16px] flex flex-col items-center justify-center gap-[6px] shadow-sm active:bg-surface transition-colors">
          <Receipt size={24} className="text-text-muted" />
          <span className="text-[12px] font-semibold text-text-secondary">{s.billsTab}</span>
        </button>

        <button onClick={() => router.push('/filing')} className="h-[80px] bg-white border border-border rounded-[16px] flex flex-col items-center justify-center gap-[6px] shadow-sm active:bg-surface transition-colors">
          <FileCheck size={24} className="text-text-muted" />
          <span className="text-[12px] font-semibold text-text-secondary">{s.returnsTab}</span>
        </button>

        <button onClick={() => router.push('/alerts')} className="h-[80px] bg-white border border-border rounded-[16px] flex flex-col items-center justify-center gap-[6px] shadow-sm relative active:bg-surface transition-colors">
          <div className="relative">
            <Bell size={24} className="text-text-muted" />
            <div className="absolute top-[-2px] right-[-2px] w-[8px] h-[8px] bg-warning-text rounded-full" />
          </div>
          <span className="text-[12px] font-semibold text-text-secondary">{s.alertsTab}</span>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="mt-[28px] mb-[40px]">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-[15px] font-bold text-text-primary">{s.recentActivity}</h2>
          {filteredTransactions.length > 0 && <span className="text-[13px] text-primary font-bold">{s.viewAll}</span>}
        </div>
        
        <div className="mt-[12px] flex flex-col gap-[10px]">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={tx.id} className="bg-white rounded-[14px] border border-border p-[14px] flex justify-between items-start shadow-sm">
                <div className="flex flex-col">
                  <span className={`w-fit text-[10px] font-bold px-[6px] py-[2px] rounded-[4px] border uppercase ${tx.type === 'sale' ? 'bg-primary-light text-primary border-primary-border' : 'bg-warning-bg text-warning-text border-warning-border'}`}>
                    {tx.type === 'sale' ? 'Sale' : 'Purchase'}
                  </span>
                  <span className="text-[14px] font-bold text-text-primary mt-[6px]">{tx.name}</span>
                  <span className="text-[11px] text-text-muted mt-1">{tx.invoice}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[15px] font-extrabold text-text-primary">{tx.amount}</span>
                  <span className="text-[11px] text-text-muted mt-1">{tx.time}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white/50 border border-dashed border-border rounded-[16px] py-10 px-6 flex flex-col items-center text-center">
              <div className="w-[48px] h-[48px] bg-surface rounded-full flex items-center justify-center text-text-muted mb-3">
                <Receipt size={24} />
              </div>
              <p className="text-[14px] font-semibold text-text-secondary">Koi entry nahi hai</p>
              <p className="text-[12px] text-text-muted mt-1">Nayi invoice jodne ke liye mic button dabayein</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Mic Button */}
      <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center z-[40]">
        <AnimatePresence>
          {showPrompt && (
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }} className="bg-text-primary text-white text-[12px] px-4 py-2 rounded-full mb-4 shadow-xl whitespace-nowrap relative">
              Invoice banane ke liye mic dabayein 🎙️
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button whileTap={{ scale: 0.9 }} onClick={startVoiceRecording} className="w-[68px] h-[68px] bg-primary rounded-full shadow-[0_8px_32px_rgba(22,163,74,0.4)] flex items-center justify-center text-white relative">
          <Mic size={32} fill="currentColor" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-primary rounded-full -z-10" />
        </motion.button>
      </div>

      {/* Voice Recording Overlay */}
      <AnimatePresence>
        {isVoiceActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden rounded-[inherit]">
            <div className="absolute inset-0 bg-black/90" />
            <button onClick={() => setIsVoiceActive(false)} className="absolute top-[56px] right-[20px] w-[40px] h-[40px] flex items-center justify-center text-white z-[110]"><X size={24} /></button>
            <div className="relative z-[110] flex flex-col items-center w-full px-5">
              <div className="mb-[60px] text-center">
                <h2 className="text-[18px] font-medium text-white">{s.speakOrder}</h2>
                <p className="text-[13px] text-white/60 mt-1">Hindi mein bolein, hum samjhenge</p>
              </div>
              <div className="relative flex items-center justify-center mb-8">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="absolute w-[180px] h-[180px] border-2 border-primary/20 rounded-full" />
                <div className="w-[80px] h-[80px] bg-primary rounded-full flex items-center justify-center text-white shadow-xl"><Mic size={32} fill="currentColor" /></div>
              </div>
              <div className="text-white italic text-[14px] flex items-center gap-1 mb-6">{s.listening}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="flex gap-0.5"><span>.</span><span>.</span><span>.</span></motion.span></div>
              <div className="flex items-center gap-1.5 h-[40px]">{waveformBars.map((bar) => (<motion.div key={bar.id} animate={{ height: [bar.initialHeight, bar.initialHeight * 1.5, bar.initialHeight] }} transition={{ duration: 0.6, repeat: Infinity, delay: bar.delay }} className="w-[3px] bg-primary rounded-full" />))}</div>
              <AnimatePresence>
                {voiceState === 'finished' && (
                  <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] p-6 pb-10 shadow-[0_-8px_30px_rgba(0,0,0,0.2)]">
                    <p className="text-[16px] font-semibold text-text-primary leading-relaxed">"{currentTranscript}"</p>
                    <div className="flex flex-wrap gap-2 mt-4">{showChips && (<><div className="bg-primary-light text-primary border border-primary-border px-3 py-1.5 rounded-full text-[12px] font-medium">👤 Shyam</div><div className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-[12px] font-medium">🌾 Cheeni</div><div className="bg-surface text-text-secondary border border-border px-3 py-1.5 rounded-full text-[12px] font-medium">⚖️ 20 kg</div><div className="bg-surface text-text-secondary border border-border px-3 py-1.5 rounded-full text-[12px] font-medium">💰 ₹900</div></>)}</div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setVoiceState('listening')} className="flex-1 h-[50px] rounded-xl border border-border text-[14px] font-semibold">Retry</button>
                      <button onClick={() => router.push('/onboarding/invoice')} className="flex-1 h-[50px] rounded-xl bg-primary text-white text-[14px] font-semibold">Confirm</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
