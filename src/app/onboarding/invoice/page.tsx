'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';
import { dummyInvoice, dummyBusiness } from '@/lib/dummyData';

export default function InvoicePreviewPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (message: string) => {
    sessionStorage.setItem('hasAddedInvoice', 'true');
    setToast(message);
    setTimeout(() => {
      setToast(null);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background px-[20px] pb-[40px]">
      {/* Header / Back Button */}
      <div className="pt-[56px]">
        <button
          onClick={() => router.push('/onboarding/voice')}
          className="w-[40px] h-[40px] flex items-center justify-center -ml-[10px] touch-target"
        >
          <ChevronLeft size={20} className="text-text-primary" />
        </button>
      </div>

      {/* Title Row */}
      <div className="flex items-center justify-center gap-[8px] mt-[8px]">
        <h1 className="text-[17px] font-semibold text-primary">
          {s.invoiceReady}
        </h1>
        <div className="w-[20px] h-[20px] bg-primary rounded-full flex items-center justify-center">
          <Check size={12} className="text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Invoice Card */}
      <div className="mt-[20px] bg-white rounded-[14px] shadow-[0_4px_16px_rgba(0,0,0,0.10)] border border-border overflow-hidden">
        {/* Card Header Section */}
        <div className="bg-primary p-[14px_16px]">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-white uppercase tracking-tight flex-1">
              {dummyBusiness.name}
            </span>
            <span className="text-[10px] font-medium text-white border border-white/50 rounded-[4px] px-[6px] py-[2px] uppercase">
              Tax Invoice
            </span>
          </div>
          <p className="text-[11px] text-white/80 mt-1">
            GSTIN: {dummyBusiness.gstin}
          </p>
          <p className="text-[11px] text-white/70">
            {dummyBusiness.address}
          </p>
          
          <div className="h-[1px] bg-white/20 my-[10px]" />
          
          <div className="flex justify-between items-center text-[11px] text-white/80">
            <span>Invoice No: {dummyInvoice.number}</span>
            <span>Date: {dummyInvoice.date}</span>
          </div>
        </div>

        {/* Card Body Section */}
        <div className="p-[14px_16px]">
          <p className="text-[12px] text-text-secondary mb-[10px]">
            Customer: <span className="font-semibold text-text-primary">{dummyInvoice.customer}</span>
          </p>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface">
                <th className="text-[10px] uppercase text-text-muted font-medium text-left p-[8px_6px]">Item</th>
                <th className="text-[10px] uppercase text-text-muted font-medium text-center p-[8px_6px]">HSN</th>
                <th className="text-[10px] uppercase text-text-muted font-medium text-center p-[8px_6px]">Qty</th>
                <th className="text-[10px] uppercase text-text-muted font-medium text-center p-[8px_6px]">Rate</th>
                <th className="text-[10px] uppercase text-text-muted font-medium text-center p-[8px_6px]">GST%</th>
                <th className="text-[10px] uppercase text-text-muted font-medium text-right p-[8px_6px]">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-surface">
                <td className="text-[13px] text-text-primary p-[10px_6px] font-medium">{dummyInvoice.item}</td>
                <td className="text-[13px] text-text-primary p-[10px_6px] text-center">{dummyInvoice.hsn}</td>
                <td className="text-[13px] text-text-primary p-[10px_6px] text-center whitespace-nowrap">{dummyInvoice.qty}</td>
                <td className="text-[13px] text-text-primary p-[10px_6px] text-center">{dummyInvoice.rate}</td>
                <td className="text-[13px] text-text-primary p-[10px_6px] text-center">{dummyInvoice.gstPercent}</td>
                <td className="text-[13px] text-text-primary p-[10px_6px] text-right font-semibold">{dummyInvoice.total}</td>
              </tr>
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="mt-[12px] flex flex-col items-end gap-1">
            <div className="flex justify-end gap-8 items-center h-[28px]">
              <span className="text-[13px] text-text-secondary">Subtotal</span>
              <span className="text-[13px] text-text-primary font-medium w-20 text-right">{dummyInvoice.subtotal}</span>
            </div>
            <div className="flex justify-end gap-8 items-center h-[28px]">
              <span className="text-[13px] text-text-secondary">GST ({dummyInvoice.gstPercent})</span>
              <span className="text-[13px] text-text-primary font-medium w-20 text-right">{dummyInvoice.gst}</span>
            </div>
            <div className="w-40 h-[1px] bg-border my-1" />
            <div className="flex justify-end gap-8 items-center h-[28px]">
              <span className="text-[14px] text-text-primary font-semibold">Kul Total</span>
              <span className="text-[15px] text-text-primary font-bold w-20 text-right">{dummyInvoice.total}</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-surface p-[10px_16px]">
          <p className="text-[10px] text-text-muted text-center italic">
            GST Saathi se banaya
          </p>
        </div>
      </div>

      {/* UPI Strip */}
      <div className="mt-[10px] bg-primary-light border border-primary-border rounded-[10px] p-[12px_16px]">
        <p className="text-[12px] font-semibold text-primary flex items-center gap-1">
          💸 UPI payment link jod diya gaya
        </p>
        <p className="text-[11px] text-primary/70 mt-0.5">
          Shyam seedha pay kar sakta hai
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-[16px] flex flex-col gap-[8px]">
        <button
          onClick={() => handleAction('WhatsApp pe bheja gaya! ✓')}
          className="w-full h-[52px] bg-[#25D366] rounded-[12px] text-white text-[15px] font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
        >
          {s.sendWhatsapp}
        </button>
        <button
          onClick={() => handleAction('Invoice save ho gayi! ✓')}
          className="w-full h-[48px] bg-white border-1.5 border-border rounded-[12px] text-text-primary text-[14px] font-medium active:scale-[0.98] transition-transform"
        >
          {s.saveInvoice}
        </button>
      </div>

      <p className="text-[11px] text-text-muted mt-3 text-center">
        Dono case mein invoice save ho jayega
      </p>

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
