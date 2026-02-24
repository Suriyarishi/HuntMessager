
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onComplete, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-pastel)] transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 neumorphic-elevated rounded-[28px]" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-[#2FED9A] to-[#12C784] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">HUNT</h1>
      <p className="text-[var(--text-secondary)] text-xs mt-3 font-semibold tracking-[0.3em] uppercase opacity-80">Messenger 2026</p>
    </div>
  );
};

export default SplashScreen;
