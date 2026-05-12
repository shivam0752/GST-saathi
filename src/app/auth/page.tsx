'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { strings } from '@/lib/strings';

export default function AuthPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const s = strings[language] || strings.hindi;

  const [stage, setStage] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, countdown]);

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setStage(2);
      setIsTimerActive(true);
      setCountdown(30);
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(30);
      setIsTimerActive(true);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  const handleVerify = () => {
    if (isOtpComplete) {
      router.push('/onboarding/gstin');
    }
  };

  const formattedPhone = phoneNumber.slice(0, 2) + 'XXXXXX' + phoneNumber.slice(-2);

  return (
    <div className="flex flex-col min-h-screen bg-background px-[20px]">
      {/* Back Button */}
      <div className="pt-[56px]">
        <button
          onClick={() => (stage === 2 ? setStage(1) : router.push('/language'))}
          className="w-[40px] h-[40px] flex items-center justify-center -ml-[10px] touch-target"
        >
          <ChevronLeft size={20} className="text-text-primary" />
        </button>
      </div>

      {/* Heading & Subtext */}
      <h1 className="text-[20px] font-semibold text-text-primary mt-[40px]">
        {s.enterPhone}
      </h1>
      <p className="text-[13px] text-text-secondary mt-[6px]">
        {s.phoneSubtext}
      </p>

      {/* Phone Input Container */}
      <div 
        className={`
          flex h-[52px] rounded-[10px] bg-white mt-[32px] overflow-hidden transition-all duration-200 border-1.5
          ${isFocused ? 'border-primary ring-1 ring-primary/20' : 'border-border'}
          ${stage === 2 ? 'opacity-60' : ''}
        `}
      >
        <div className="w-[56px] bg-surface flex items-center justify-center border-r-1.5 border-border">
          <span className="text-[14px] text-text-secondary font-medium">+91</span>
        </div>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder="98XXXXXXXX"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={stage === 2}
          className="flex-1 bg-transparent border-none outline-none px-[14px] text-[14px] text-text-primary placeholder:text-text-muted font-medium"
        />
      </div>
      
      <p className="text-[11px] text-text-muted mt-[8px] text-center">
        Aapka number sirf GST filing ke liye use hoga 🔒
      </p>

      {/* OTP Section */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-[24px]">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-medium text-text-primary">
                  OTP darj karein
                </span>
                <span className="text-[12px] text-text-secondary">
                  {formattedPhone} pe bheja gaya{' '}
                  <button onClick={() => setStage(1)} className="text-primary underline font-medium">Badlo</button>
                </span>
              </div>

              {/* OTP Boxes Row */}
              <div className="flex gap-[8px] mt-[12px]">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`
                      w-[calc((100%-40px)/6)] h-[52px] rounded-[10px] text-[20px] font-bold text-center outline-none transition-all border-1.5
                      ${digit 
                        ? 'border-primary bg-primary-light text-text-primary' 
                        : 'border-border bg-white text-text-primary focus:border-primary'
                      }
                    `}
                  />
                ))}
              </div>

              {/* Resend Row */}
              <div className="flex justify-between items-center mt-[12px]">
                <span className="text-[12px] text-text-muted">OTP nahi mila?</span>
                <button 
                  disabled={countdown > 0}
                  onClick={handleResend}
                  className={`text-[12px] font-medium ${countdown > 0 ? 'text-text-muted' : 'text-primary'}`}
                >
                  {countdown > 0 ? `Dubara bhejo (${countdown}s)` : 'Dubara bhejo'}
                </button>
              </div>

              <p className="text-[11px] text-text-muted mt-[4px] text-center">
                Android pe OTP apne aap bhar jayega
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto px-[20px] pb-[32px] pt-[20px] bg-gradient-to-t from-background via-background to-transparent">
        <button
          disabled={stage === 1 ? phoneNumber.length < 10 : !isOtpComplete}
          onClick={stage === 1 ? handleSendOtp : handleVerify}
          className={`
            w-full h-[52px] rounded-[12px] text-white text-[15px] font-semibold transition-all
            ${(stage === 1 && phoneNumber.length === 10) || (stage === 2 && isOtpComplete)
              ? 'bg-primary cursor-pointer active:scale-[0.98]' 
              : 'bg-text-muted opacity-50 cursor-not-allowed'
            }
          `}
        >
          {stage === 1 ? s.sendOtp : s.verifyOtp}
        </button>
      </div>
    </div>
  );
}
