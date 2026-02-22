
import React, { useState, useEffect } from 'react';

interface FaceIDLockScreenProps {
    onSuccess: () => void;
    onUsePasscode: () => void;
}

type AuthState = 'scanning' | 'success' | 'failed' | 'denied' | 'not-supported';

const FaceIDLockScreen: React.FC<FaceIDLockScreenProps> = ({ onSuccess, onUsePasscode }) => {
    const [state, setState] = useState<AuthState>('scanning');
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        // Initial scan simulation
        const timer = setTimeout(() => {
            simulateScan();
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const simulateScan = () => {
        if (state === 'denied' || state === 'not-supported') return;

        setState('scanning');

        // Simulate biometric result
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; // 70% success for demo

            if (isSuccess) {
                setState('success');
                setTimeout(onSuccess, 1000);
            } else {
                setState('failed');
                setErrorCount(prev => prev + 1);

                // Reset to scanning after a delay if error count is not too high
                if (errorCount < 3) {
                    setTimeout(() => setState('scanning'), 2000);
                }
            }
        }, 2000);
    };

    return (
        <div className="flex flex-col h-full bg-[#F4F7FA] animate-fade-in overflow-hidden relative">
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                {/* Header Text */}
                <div className="text-center mb-16">
                    <h1 className="text-2xl font-black text-[#1F2937] mb-3">
                        Unlock with Face ID
                    </h1>
                    <p className="text-sm text-[#6B7280] font-medium max-w-xs mx-auto">
                        Confirm your identity to continue securely.
                    </p>
                </div>

                {/* Face ID Scanner Visual */}
                <div className="relative mb-12">
                    {/* Animated Glow Outline */}
                    <div className={`absolute inset-[-12px] rounded-[48px] border-4 border-transparent transition-all duration-700
            ${state === 'scanning' ? 'border-primary-mint/30 animate-spin-slow' : ''}
            ${state === 'success' ? 'border-[#2FED9A] shadow-[0_0_30px_rgba(47,237,154,0.4)]' : ''}
            ${state === 'failed' ? 'border-red-400 opacity-50' : ''}
          `} />

                    <div
                        onClick={simulateScan} // Allow retry on click
                        className={`w-40 h-40 rounded-[40px] flex items-center justify-center transition-all duration-500 cursor-pointer relative z-10
              ${state === 'failed' ? 'animate-vibrate' : ''}
              ${state === 'success' ? 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] shadow-[#2FED9A]/30 scale-105' : 'bg-white shadow-xl'}
              ${state === 'scanning' ? 'neumorphic-elevated' : ''}
            `}
                    >
                        <div className={`transition-all duration-500 ${state === 'success' ? 'text-white' : 'text-[#1F2937]'}`}>
                            {state === 'success' ? (
                                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <div className="relative">
                                    {/* Face Frame Icon */}
                                    <svg className={`w-20 h-20 ${state === 'scanning' ? 'opacity-80' : 'opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m10-6h4a2 2 0 012 2v4M3 15v4a2 2 0 002 2h4m10 0h4a2 2 0 012-2v-4" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM15 11c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM9 16.5c1.5 1.5 4.5 1.5 6 0" />
                                    </svg>
                                    {/* Scanning Line overlay */}
                                    {state === 'scanning' && (
                                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#2FED9A] to-transparent animate-scan-line" />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status Text Area */}
                <div className="text-center h-12">
                    {state === 'scanning' && (
                        <p className="text-[#6B7280] font-black text-xs uppercase tracking-[0.2em] animate-pulse">
                            Verifying...
                        </p>
                    )}
                    {state === 'failed' && (
                        <p className="text-[#FF6B6B] font-bold text-sm animate-fade-in">
                            Face not recognized. Please try again.
                        </p>
                    )}
                    {state === 'denied' && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-amber-600 font-bold text-sm underline cursor-pointer" onClick={() => alert('Opening App Settings...')}>
                                Enable camera permission for Face ID.
                            </p>
                        </div>
                    )}
                    {state === 'not-supported' && (
                        <p className="text-gray-400 font-bold text-sm">
                            Face ID not available on this device.
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom Option */}
            <div className="p-8 pb-12 text-center">
                <button
                    onClick={onUsePasscode}
                    className="text-[#12C784] font-black text-sm uppercase tracking-widest hover:opacity-80 transition-opacity active:scale-95"
                >
                    Use Passcode Instead
                </button>
            </div>

            <style>{`
        @keyframes scan-line {
          0% { top: 10%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
        }
        @keyframes vibrate {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-vibrate {
          animation: vibrate 0.5s linear both;
        }
      `}</style>
        </div>
    );
};

export default FaceIDLockScreen;
