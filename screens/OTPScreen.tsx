
import React, { useState, useEffect } from 'react';

interface OTPScreenProps {
  onSuccess: (isNewUser: boolean) => void;
  onBack: () => void;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ onSuccess, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      const fullOtp = otp.join('');
      if (fullOtp === '123456') {
        onSuccess(true);
      } else {
        setError('Invalid OTP. Try 123456');
      }
    }
  }, [otp, onSuccess]);

  return (
    <div className="flex flex-col h-full p-8 pt-20 bg-[var(--bg-pastel)]">
      <button onClick={onBack} className="w-12 h-12 mb-8 icon-container text-[var(--text-primary)] active:scale-95 transition-transform">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h2 className="text-3xl font-extrabold mb-2 text-[var(--text-primary)]">Verify Code</h2>
      <p className="text-[var(--text-secondary)] mb-10 font-medium">We sent a 6-digit code to your phone number.</p>

      <div className="flex justify-between gap-3 mb-8">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="number"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            className={`w-full h-16 input-field-neumorphic text-center text-2xl font-medium text-[var(--text-primary)] ${error ? 'input-field-error' : ''}`}
          />
        ))}
      </div>

      {error && <p className="text-[var(--error-soft)] text-xs mb-6 font-black uppercase tracking-widest text-center opacity-80">{error}</p>}

      <p className="text-center text-[var(--text-secondary)] text-sm font-medium">
        Didn't receive code? <button className="text-[var(--primary-mint-dark)] font-bold ml-1 hover:underline">Resend</button>
      </p>
    </div>
  );
};

export default OTPScreen;
