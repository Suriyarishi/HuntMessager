
import React, { useState, useEffect } from 'react';

interface BiometricsSetupScreenProps {
  onBack: () => void;
}

const BiometricsSetupScreen: React.FC<BiometricsSetupScreenProps> = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [settings, setSettings] = useState({
    unlockOnOpen: true,
    requireForPayments: false,
    lockAfterMinutes: '1'
  });

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
  };

  useEffect(() => {
    let interval: any;
    if (isScanning && scanProgress < 100) {
      interval = setInterval(() => {
        setScanProgress(p => {
          const next = p + Math.random() * 15;
          if (next >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setIsComplete(true);
            return 100;
          }
          return next;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isScanning, scanProgress]);

  return (
    <div className="flex flex-col h-full bg-[#F4F7FA] overflow-hidden">
      <header className="p-6 pb-2 flex items-center gap-4 sticky top-0 bg-[#F4F7FA]/80 backdrop-blur-xl z-20">
        <button onClick={onBack} className="w-10 h-10 icon-container text-[#1F2937] active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-[#1F2937]">Biometrics</h1>
      </header>

      <div className="p-8 flex-1 flex flex-col items-center justify-center overflow-y-auto hide-scrollbar">
        <div className="relative mb-12 flex flex-col items-center w-full max-w-sm">
          <div className={`w-48 h-48 rounded-[64px] transition-all duration-500 flex items-center justify-center border-4 border-white shadow-xl ${isComplete ? 'bg-[#F0FFF4] shadow-[#2FED9A]/20' : 'neumorphic-elevated'
            }`}>
            {isComplete ? (
              <div className="w-24 h-24 bg-gradient-to-br from-[#2FED9A] to-[#12C784] rounded-full flex items-center justify-center shadow-lg animate-[bounce_1s_ease-in-out]">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : isScanning ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-4 border-4 border-[#2FED9A]/20 border-t-[#2FED9A] rounded-full animate-spin" />
                <svg className="w-16 h-16 text-[#1F2937] opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20a10.003 10.003 0 006.203-2.126l.054.09A10.003 10.003 0 0112 11c0-3.517 1.009-6.799 2.753-9.571m-3.44 2.04l-.054.09A10.003 10.003 0 0112 3a10.003 10.003 0 016.203 2.126l.054-.09" />
                </svg>
              </div>
            ) : (
              <div className="w-20 h-20 icon-container bg-[#F4F7FA]">
                <svg className="w-10 h-10 text-[#1F2937]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20a10.003 10.003 0 006.203-2.126l.054.09A10.003 10.003 0 0112 11c0-3.517 1.009-6.799 2.753-9.571m-3.44 2.04l-.054.09A10.003 10.003 0 0112 3a10.003 10.003 0 016.203 2.126l.054-.09" />
                </svg>
              </div>
            )}
          </div>

          <div className="mt-10 text-center px-4">
            <h2 className="text-2xl font-black text-[#1F2937]">
              {isComplete ? 'Setup Successful' : isScanning ? 'Scanning...' : 'Secure Access'}
            </h2>
            <p className="text-sm text-[#6B7280] mt-3 font-bold leading-relaxed uppercase tracking-widest opacity-70">
              {isComplete ? 'Biometrics linked to Hunt' : isScanning ? 'Keep steady' : 'Register your fingerprint or face'}
            </p>
          </div>

          {isScanning && (
            <div className="w-full h-2 neumorphic-inset rounded-full mt-10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#2FED9A] to-[#12C784] transition-all duration-300" style={{ width: `${scanProgress}%` }} />
            </div>
          )}
        </div>

        {isComplete && (
          <div className="w-full space-y-4 animate-[fadeIn_0.5s_ease-out]">
            <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-[0.2em] px-4 mb-2">Configuration</p>

            <div className="p-4 neumorphic-elevated flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#1F2937] px-2">Unlock on app launch</span>
              <button
                onClick={() => setSettings(s => ({ ...s, unlockOnOpen: !s.unlockOnOpen }))}
                className={`w-12 h-6 rounded-full relative transition-all ${settings.unlockOnOpen ? 'bg-gradient-to-r from-[#2FED9A] to-[#12C784] shadow-md' : 'neumorphic-inset'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${settings.unlockOnOpen ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="p-4 neumorphic-elevated flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#1F2937] px-2">Require for Payments</span>
              <button
                onClick={() => setSettings(s => ({ ...s, requireForPayments: !s.requireForPayments }))}
                className={`w-12 h-6 rounded-full relative transition-all ${settings.requireForPayments ? 'bg-gradient-to-r from-[#2FED9A] to-[#12C784] shadow-md' : 'neumorphic-inset'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${settings.requireForPayments ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <button
              onClick={onBack}
              className="w-full pill-button pill-button-primary py-5 text-lg shadow-xl shadow-[#2FED9A]/20 mt-8"
            >
              Finish Setup
            </button>
          </div>
        )}

        {!isScanning && !isComplete && (
          <button
            onClick={startScan}
            className="w-full pill-button pill-button-primary py-5 text-lg shadow-xl shadow-[#2FED9A]/20 mt-4"
          >
            Start Scanning
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BiometricsSetupScreen;
