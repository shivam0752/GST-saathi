'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Fingerprint, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';
import { dummyFiling } from '@/lib/dummyData';

export default function FilingPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [activeCard, setActiveCard] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const cardTitles = [
    { title: '📈 Bikri — April', sub: 'Sales details' },
    { title: '📦 Khareedari — April', sub: 'Purchase details' },
    { title: '🧾 ITC Details', sub: 'Input tax credit' }
  ];

  const handleFile = () => {
    setShowModal(true);
  };

  const handleConfirmFile = () => {
    setShowModal(false);
    router.push('/success');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background px-[20px] pb-[120px]">
      {/* Header / Back Button */}
      <div className="pt-[56px] flex items-center justify-between">
        <button
          onClick={() => router.push('/dashboard')}
          className="w-[40px] h-[40px] flex items-center justify-center -ml-[10px] touch-target"
        >
          <ChevronLeft size={20} className="text-text-primary" />
        </button>
        <div className="bg-primary-light border border-primary-border rounded-full px-[10px] py-[3px] text-[11px] font-medium text-primary">
          AI ne banaya
        </div>
      </div>

      <h1 className="text-[17px] font-semibold text-text-primary mt-[4px]">
        {s.filingTitle}
      </h1>

      {/* Hero Summary Card */}
      <div className="mt-[20px] bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.10)] border border-border p-[20px]">
        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
          Is mahine:
        </span>
        <h2 className="text-[18px] font-bold text-text-primary mt-[4px]">
          {dummyFiling.totalSales} ki bikri ki
        </h2>

        <div className="h-[1px] bg-surface my-[14px]" />

        <div className="flex flex-col gap-1">
          <div className="h-[44px] flex items-center">
            <span className="text-[20px]">🏪</span>
            <span className="text-[13px] text-text-secondary flex-1 ml-3">Aapka GST banta hai</span>
            <span className="text-[14px] font-medium text-text-primary">{dummyFiling.gstDue}</span>
          </div>
          <div className="h-[44px] flex items-center">
            <span className="text-[20px]">✂️</span>
            <span className="text-[13px] text-text-secondary flex-1 ml-3">ITC se katega</span>
            <span className="text-[14px] font-medium text-primary">− {dummyFiling.itcCredit}</span>
          </div>

          <div className="mt-2 bg-primary-light border border-primary-border rounded-[10px] p-[10px_12px] flex items-center">
            <span className="text-[20px]">💰</span>
            <span className="text-[13px] font-bold text-text-primary flex-1 ml-3">
              {s.youMustPay}
            </span>
            <span className="text-[22px] font-bold text-primary">
              {dummyFiling.finalPayable}
            </span>
          </div>
        </div>
      </div>

      {/* Review Cards Section */}
      <div className="mt-[24px]">
        <div className="flex justify-between items-center">
          <span className="text-[13px] font-medium text-text-primary">Check karo:</span>
          <span className="text-[12px] text-text-muted">{activeCard + 1} of 3</span>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-[8px] mt-[8px]">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveCard(i)}
              className={`rounded-full transition-all duration-300 ${activeCard === i ? 'w-[10px] h-[10px] bg-primary' : 'w-[8px] h-[8px] border border-border'}`}
            />
          ))}
        </div>

        {/* Cards Carousel */}
        <div className="mt-[12px] relative h-[280px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCard}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="absolute inset-0 bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden"
            >
              <div className="p-[16px] flex-1">
                <h3 className="text-[15px] font-bold text-text-primary">
                  {cardTitles[activeCard].title}
                </h3>
                <p className="text-[12px] text-text-secondary mt-0.5">
                  {cardTitles[activeCard].sub}
                </p>

                <div className="mt-[12px] flex flex-col">
                  {activeCard === 0 && <BikriRows />}
                  {activeCard === 1 && <KhareedariRows />}
                  {activeCard === 2 && <ItcRows />}
                </div>
              </div>

              <div className="bg-surface p-[12px_16px] flex justify-between items-center">
                <span className="text-[12px] font-medium text-text-primary">
                  {activeCard === 0 ? `Kul: ${dummyFiling.totalSales} | GST: ${dummyFiling.gstDue}` : 
                   activeCard === 1 ? `Kul: ₹67,500 | ITC: ${dummyFiling.itcCredit}` :
                   `Confirmed ITC: ${dummyFiling.itcCredit} | Pending: ₹0`}
                </span>
                <span className="text-[12px] font-semibold text-error-text cursor-pointer">
                  Kuch galat?
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Peeking edges */}
          <div className="absolute top-0 bottom-0 -left-[14px] w-[12px] bg-white rounded-[16px] opacity-40 shadow-lg pointer-events-none" />
          <div className="absolute top-0 bottom-0 -right-[14px] w-[12px] bg-white rounded-[16px] opacity-40 shadow-lg pointer-events-none" />
        </div>
      </div>

      <p className="text-[11px] text-text-muted mt-[16px] text-center italic">
        ← Swipe karein →
      </p>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto px-[20px] pb-[32px] pt-[20px] bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <button
          onClick={handleFile}
          className="pointer-events-auto w-full h-[52px] bg-primary rounded-[12px] text-white text-[15px] font-semibold active:scale-[0.98] transition-transform"
        >
          {s.fileNow}
        </button>
        <p className="text-[11px] text-text-muted mt-3 text-center">
          Aapke naam se GST portal pe submit hoga
        </p>
      </div>

      {/* Biometric Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 z-[40]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-40px)] max-w-[350px] bg-white rounded-[16px] p-[24px] z-[50] shadow-2xl flex flex-col items-center"
            >
              <div className="w-[80px] h-[80px] bg-primary-light rounded-full flex items-center justify-center text-primary mb-2">
                <Fingerprint size={48} />
              </div>
              <h2 className="text-[16px] font-bold text-text-primary text-center mt-3">
                Ek baar confirm karein
              </h2>
              <p className="text-[13px] text-text-secondary text-center mt-1">
                Aapke naam se GST file hogi
              </p>
              
              <div className="mt-[14px] bg-surface border border-border rounded-full px-[16px] py-[8px] text-[13px] font-semibold text-text-primary">
                {dummyFiling.finalPayable} — {dummyFiling.bankAccount}
              </div>

              <div className="flex flex-col w-full gap-[8px] mt-[24px]">
                <button
                  onClick={handleConfirmFile}
                  className="w-full h-[52px] bg-primary rounded-[12px] text-white text-[15px] font-semibold active:scale-[0.95] transition-transform"
                >
                  Confirm karke File karo ✓
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[13px] font-medium text-text-muted py-2 hover:text-text-secondary"
                >
                  Rokein
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function BikriRows() {
  return (
    <div className="flex flex-col">
      <Row name="Shyam Kumar" date="20 Apr" amount="₹900" gst="₹43" />
      <Row name="Ram Lal" date="18 Apr" amount="₹2,400" gst="₹114" />
      <Row name="Walk-in" date="15 Apr" amount="₹5,600" gst="₹267" isLast />
      <div className="flex justify-between items-center mt-3">
        <span className="text-[11px] text-text-muted italic">...aur 44 entries</span>
        <span className="text-[11px] font-bold text-primary cursor-pointer">Sab dekho</span>
      </div>
    </div>
  );
}

function KhareedariRows() {
  return (
    <div className="flex flex-col">
      <Row name="Gupta Dist" date="8 May" amount="₹7,800" gst="ITC ₹200" />
      <Row name="Verma Traders" date="3 May" amount="₹4,500" gst="ITC ₹112" />
      <Row name="Ram Wholesale" date="15 May" amount="₹12,300" gst="ITC ₹308" isLast />
    </div>
  );
}

function ItcRows() {
  return (
    <div className="flex flex-col">
      <Row name="Confirmed ITC" date="Gupta Dist" amount="₹200" gst="Ready" />
      <Row name="Confirmed ITC" date="Verma Traders" amount="₹112" gst="Ready" />
      <Row name="Confirmed ITC" date="Ram Wholesale" amount="₹308" gst="Ready" isLast />
    </div>
  );
}

function Row({ name, date, amount, gst, isLast }: { name: string, date: string, amount: string, gst: string, isLast?: boolean }) {
  return (
    <div className={`h-[44px] flex items-center justify-between ${!isLast ? 'border-b border-surface' : ''}`}>
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-text-primary">{name}</span>
        <span className="text-[11px] text-text-muted">{date}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[13px] font-bold text-text-primary">{amount}</span>
        <span className={`text-[11px] font-medium ${gst.startsWith('ITC') || gst === 'Ready' ? 'text-primary' : 'text-primary'}`}>
          {gst.startsWith('ITC') || gst === 'Ready' ? gst : `GST: ${gst}`}
        </span>
      </div>
    </div>
  );
}
