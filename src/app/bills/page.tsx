'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, Loader2, FileText, Camera, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';
import { dummyBill } from '@/lib/dummyData';

export default function BillsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [status, setStatus] = useState<'camera' | 'processing' | 'results'>('camera');
  const [toast, setToast] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === 'camera') {
      const timer = setTimeout(() => setStatus('processing'), 2500);
      return () => clearTimeout(timer);
    } else if (status === 'processing') {
      const timer = setTimeout(() => setStatus('results'), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleConfirm = () => {
    sessionStorage.setItem('hasAddedBill', 'true');
    setToast('Bill save ho gaya! ✓');
    setTimeout(() => {
      setToast(null);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {status === 'camera' && (
          /* Camera Scanning Simulation */
          <motion.div
            key="camera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6"
          >
            <div className="absolute top-[56px] left-[20px] flex items-center gap-2">
              <button onClick={() => router.push('/dashboard')} className="text-white p-2">
                <ChevronLeft size={24} />
              </button>
              <span className="text-white font-medium">Scan Bill</span>
            </div>

            {/* Scan Frame */}
            <div className="relative w-full aspect-[3/4] max-w-[300px] border-2 border-white/30 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center">
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />

              {/* Scanning Line */}
              <motion.div
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-4 right-4 h-[2px] bg-primary shadow-[0_0_15px_rgba(22,163,74,1)] z-10"
              />

              {/* Mock Bill UI */}
              <div className="flex flex-col items-center opacity-30">
                <FileText size={64} className="text-white" />
                <span className="text-white text-[12px] mt-4 font-mono tracking-tighter">READING DATA...</span>
              </div>
            </div>

            <p className="text-white/80 text-[14px] mt-8 text-center px-10">
              Apne bill ko frame ke beech mein rakhein
            </p>

            {/* Flash Effect on Exit */}
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 bg-white z-[100] pointer-events-none"
            />
          </motion.div>
        )}

        {status === 'processing' && (
          /* Processing Animation State */
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background px-[20px]"
          >
            <div className="w-[48px] h-[48px] border-[4px] border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-[15px] text-text-secondary mt-[20px] text-center font-bold">
              Bill scan ho raha hai...
            </p>
            <p className="text-[12px] text-text-muted mt-2">AI details nikaal raha hai</p>
          </motion.div>
        )}

        {status === 'results' && (
          /* Main Layout */
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen px-[20px] pb-[40px]"
          >
            {/* Header / Back Button */}
            <div className="pt-[56px]">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-[40px] h-[40px] flex items-center justify-center -ml-[10px] touch-target"
              >
                <ChevronLeft size={20} className="text-text-primary" />
              </button>
            </div>

            {/* Title Row */}
            <div className="flex items-center justify-center gap-[8px] mt-[4px]">
              <h1 className="text-[17px] font-semibold text-primary">
                {s.scanBill}
              </h1>
              <div className="w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Processing Complete Strip */}
            <div className="mt-[16px] bg-primary-light border border-primary-border rounded-[10px] p-[10px_14px] flex items-center gap-[8px]">
              <Check size={16} className="text-primary" strokeWidth={3} />
              <span className="text-[12px] font-semibold text-primary">
                Bill ka data ready hai!
              </span>
            </div>

            {/* Bill Thumbnail Section */}
            <div className="mt-[16px] flex items-start gap-[12px]">
              <div className="w-[120px] h-[80px] bg-surface border border-border rounded-[10px] relative flex items-center justify-center overflow-hidden">
                <FileText size={28} className="text-text-muted" />
                <div className="absolute bottom-[6px] right-[6px] bg-primary text-white text-[10px] font-semibold rounded-[4px] px-[6px] py-[2px] shadow-sm">
                  Scan ✓
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-[13px] font-bold text-text-primary uppercase leading-tight">
                  {dummyBill.supplier}
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  Inv: {dummyBill.invoiceNo}
                </p>
              </div>
            </div>

            {/* Extracted Data Card */}
            <div className="mt-[16px] bg-white border border-border border-l-4 border-l-primary rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-[16px]">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-[12px] block">
                Yeh details mili hain:
              </span>

              <div className="flex flex-col">
                <DetailRow emoji="🏢" label="Supplier" value={dummyBill.supplier} isEditing={isEditing} />
                <DetailRow emoji="📋" label="GSTIN" value={dummyBill.gstin} isEditing={isEditing} extra={<Check size={14} className="text-primary ml-[6px] inline" />} />
                <DetailRow emoji="🧾" label="Invoice No" value={dummyBill.invoiceNo} isEditing={isEditing} />
                <DetailRow emoji="📅" label="Date" value={dummyBill.date} isEditing={isEditing} />
                <DetailRow emoji="📦" label="Items" value="3 items" isEditing={isEditing} extra={<span className="text-[12px] text-primary font-medium ml-[8px] cursor-pointer">Dekho ▼</span>} />
                <DetailRow emoji="💰" label="Total" value={dummyBill.total} isEditing={isEditing} isBold subValue={`GST: ${dummyBill.gstPaid}`} isLast />
              </div>
            </div>

            {/* ITC Banner */}
            <div className="mt-[12px] bg-primary-light border border-primary-border rounded-[10px] p-[12px_14px]">
              <p className="text-[13px] font-bold text-primary flex items-center gap-1">
                ✓ Aapko {dummyBill.itcAmount} ka ITC milega is bill se
              </p>
              <p className="text-[11px] text-primary/70 mt-1">
                Yeh filing ke waqt aapke tax se katega
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-[24px] flex flex-col gap-[8px] pb-[32px]">
              <button
                onClick={handleConfirm}
                className="w-full h-[52px] bg-primary rounded-[12px] text-white text-[15px] font-semibold active:scale-[0.98] transition-transform"
              >
                {s.confirmBill}
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full h-[48px] bg-white border-1.5 border-border rounded-[12px] text-text-primary text-[14px] font-medium active:scale-[0.98] transition-transform"
              >
                {s.editBill}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-[80px] left-1/2 -translate-x-1/2 bg-text-primary text-white text-[13px] px-[20px] py-[10px] rounded-[10px] z-[100] shadow-lg whitespace-nowrap"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({ emoji, label, value, isEditing, extra, subValue, isBold, isLast }: { emoji: string, label: string, value: string, isEditing: boolean, extra?: React.ReactNode, subValue?: string, isBold?: boolean, isLast?: boolean }) {
  return (
    <div className={`min-h-[44px] flex flex-col justify-center ${!isLast ? 'border-b border-surface' : ''} py-[8px]`}>
      <div className="flex items-center">
        <span className="text-[20px]">{emoji}</span>
        <span className="text-[12px] text-text-muted ml-[10px]">{label}</span>
        <div className="ml-auto flex items-center">
          {isEditing ? (
            <input type="text" defaultValue={value} className="text-right text-[13px] font-medium text-text-primary border-b border-primary outline-none bg-primary-light/30 px-1 w-[120px]" />
          ) : (
            <span className={`text-[13px] ${isBold ? 'font-bold' : 'font-medium'} text-text-primary`}>{value}</span>
          )}
          {extra}
        </div>
      </div>
      {subValue && !isEditing && <span className="text-[11px] text-text-secondary text-right mt-0.5">{subValue}</span>}
    </div>
  );
}
