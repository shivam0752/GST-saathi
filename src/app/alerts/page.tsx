'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Bell, AlertTriangle, Calendar, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';
import { dummyAlerts } from '@/lib/dummyData';

export default function AlertsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [toast, setToast] = useState<string | null>(null);

  const handleWhatsAppReminder = () => {
    setToast('Reminder bheja gaya! ✓');
    setTimeout(() => setToast(null), 2000);
  };

  const itcRiskTexts = {
    hindi: 'Aapke supplier ne abhi tak return nahi bhara. Aapka ITC block ho sakta hai.',
    marathi: 'तुमच्या supplier ने अजून return भरले नाही. तुमचा ITC block होऊ शकतो.',
    telugu: 'మీ supplier ఇంకా return వేయలేదు. మీ ITC block అవుతుంది.',
  };

  const deadlineTexts = {
    hindi: `GSTR-1 ka deadline ${dummyAlerts[1].deadline} hai. Aapka ${dummyAlerts[1].readiness}% data ready hai.`,
    marathi: `GSTR-1 ची deadline ${dummyAlerts[1].deadline} आहे. तुमचा ${dummyAlerts[1].readiness}% data ready आहे.`,
    telugu: `GSTR-1 గడువు ${dummyAlerts[1].deadline}. మీ ${dummyAlerts[1].readiness}% data ready గా ఉంది.`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background px-[20px] pb-[40px]">
      {/* Header / Back Button */}
      <div className="pt-[56px] flex items-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="w-[40px] h-[40px] flex items-center justify-center -ml-[10px] touch-target"
        >
          <ChevronLeft size={20} className="text-text-primary" />
        </button>
      </div>

      {/* Title Row */}
      <div className="flex items-center justify-between mt-[4px]">
        <h1 className="text-[20px] font-semibold text-text-primary">
          {s.alertsTitle}
        </h1>
        <div className="relative">
          <Bell size={24} className="text-text-muted" />
          <div className="absolute top-0 right-0 w-[8px] h-[8px] bg-warning-text rounded-full" />
        </div>
      </div>

      <p className="text-[13px] text-text-secondary mt-[24px]">
        2 alert hain aapke liye
      </p>

      {/* ALERT CARD 1 — ITC Risk */}
      <div className="mt-[12px] bg-warning-bg border-1.5 border-warning-border rounded-[14px] p-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <AlertTriangle size={22} className="text-warning-text" />
            <span className="text-[13px] font-bold text-warning-text uppercase tracking-tight">
              ITC Risk Alert
            </span>
          </div>
          <span className="text-[11px] text-text-muted">12 May</span>
        </div>

        <p className="text-[13px] text-[#92400E] mt-[8px] font-medium leading-[1.5]">
          {itcRiskTexts[language as keyof typeof itcRiskTexts] || itcRiskTexts.hindi}
        </p>

        {/* Inner Detail Card */}
        <div className="mt-[10px] bg-white border border-border rounded-[10px] p-[12px]">
          <div className="flex justify-between items-start">
            <span className="text-[14px] font-bold text-text-primary">
              {dummyAlerts[0].supplier}
            </span>
            <span className="text-[11px] text-text-muted">
              {dummyAlerts[0].gstin}
            </span>
          </div>

          <div className="flex justify-between items-center mt-[6px]">
            <span className="text-[12px] text-text-secondary">ITC at risk:</span>
            <span className="text-[18px] font-bold text-warning-text">
              {dummyAlerts[0].amount}
            </span>
          </div>

          <p className="text-[11px] text-text-muted mt-[6px]">
            Invoice: {dummyAlerts[0].invoiceDate} | Deadline: {dummyAlerts[0].deadline}
          </p>

          {/* Progress Bar */}
          <div className="mt-[10px]">
            <div className="w-full h-[6px] bg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dummyAlerts[0].progressPercent}%` }}
                className="h-full bg-warning-text"
              />
            </div>
            <p className="text-[11px] text-warning-text text-right mt-1 font-medium">
              {dummyAlerts[0].daysLeft} din bacha hai
            </p>
          </div>
        </div>

        <button
          onClick={handleWhatsAppReminder}
          className="w-full h-[44px] bg-warning-text rounded-[10px] text-white text-[13px] font-semibold flex items-center justify-center gap-2 mt-[12px] active:scale-[0.98] transition-transform shadow-sm"
        >
          📱 Supplier ko WhatsApp reminder bhejo
        </button>
      </div>

      {/* ALERT CARD 2 — Filing Deadline */}
      <div className="mt-[12px] bg-primary-light border-1.5 border-primary-border rounded-[14px] p-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <Calendar size={22} className="text-primary" />
            <span className="text-[13px] font-bold text-primary uppercase tracking-tight">
              Filing Deadline
            </span>
          </div>
          <span className="text-[11px] text-text-muted">
            {dummyAlerts[1].daysLeft} din baad
          </span>
        </div>

        <p className="text-[13px] text-[#166534] mt-[8px] font-medium leading-[1.5]">
          {deadlineTexts[language as keyof typeof deadlineTexts] || deadlineTexts.hindi}
        </p>

        {/* Readiness Bar */}
        <div className="mt-[10px]">
          <div className="w-full h-[6px] bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${dummyAlerts[1].readiness}%` }}
              className="h-full bg-primary"
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-[11px] text-primary font-bold">
              {dummyAlerts[1].readiness}% ready
            </span>
            <span className="text-[11px] text-text-muted">6% pending</span>
          </div>
        </div>

        <button
          onClick={() => router.push('/filing')}
          className="w-full h-[44px] bg-primary rounded-[10px] text-white text-[13px] font-semibold mt-[12px] active:scale-[0.98] transition-transform shadow-sm"
        >
          {s.fileNow}
        </button>
      </div>

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
