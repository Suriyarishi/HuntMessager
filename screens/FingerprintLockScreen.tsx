
import React, { useState, useEffect } from 'react';

interface FingerprintLockScreenProps {
    onSuccess: () => void;
    onUsePasscode: () => void;
}

type AuthState = 'waiting' | 'success' | 'failed' | 'too-many' | 'not-supported';

const FingerprintLockScreen: React.FC<FingerprintLockScreenProps> = ({ onSuccess, onUsePasscode }) => {
    const [state, setState] = useState<AuthState>('waiting');
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        // Check for biometric support (simulated)
        if (!window.PublicKeyCredential) {
            // setState('not-supported');
            // For demo, we assume it's supported
        }
    }, []);

    const simulateAuth = (isSuccess: boolean) => {
        if (state === 'too-many') return;

        if (isSuccess) {
            setState('success');
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 5) {
                setState('too-many');
            } else {
                setState('failed');
                // Reset to waiting after animation
                setTimeout(() => setState('waiting'), 1500);
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#F4F7FA] animate-fade-in overflow-hidden relative">
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                {/* Header Text */}
                <div className="text-center mb-16">
                    <h1 className="text-2xl font-black text-[#1F2937] mb-3">
                        Unlock with Fingerprint
                    </h1>
                    <p className="text-sm text-[#6B7280] font-medium max-w-xs mx-auto">
                        Use your fingerprint to access your chats securely.
                    </p>
                </div>

                {/* Fingerprint Container */}
                <div className="relative mb-12">
                    {/* Pulsing Glow */}
                    {state === 'waiting' && (
                        <div className="absolute inset-0 bg-[#2FED9A]/20 rounded-full blur-2xl animate-pulse-glow" style={{ transform: 'scale(1.5)' }} />
                    )}

                    <div
                        onClick={() => simulateAuth(Math.random() > 0.3)} // Click to simulate for demo
                        className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer relative z-10
              ${state === 'failed' ? 'animate-shake' : ''}
              ${state === 'success' ? 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] shadow-[#2FED9A]/30 scale-105' : 'bg-[#F4F7FA] shadow-xl border-4 border-white'}
              ${state === 'waiting' ? 'shadow-[-8px_-8px_20px_rgba(255,255,255,0.7),8px_8px_20px_rgba(0,0,0,0.06)]' : ''}
              ${state === 'too-many' ? 'grayscale opacity-70' : ''}
            `}
                        style={{
                            boxShadow: state === 'success'
                                ? '0 20px 40px -10px rgba(47, 237, 154, 0.4)'
                                : undefined
                        }}
                    >
                        <div className={`transition-all duration-500 ${state === 'success' ? 'text-white' : 'text-[#1F2937]'}`}>
                            {state === 'success' ? (
                                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className={`w-20 h-20 ${state === 'waiting' ? 'opacity-80' : 'opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20a10.003 10.003 0 006.203-2.126l.054.09A10.003 10.003 0 0112 11c0-3.517 1.009-6.799 2.753-9.571m-3.44 2.04l-.054.09A10.003 10.003 0 0112 3a10.003 10.003 0 016.203 2.126l.054-.09" />
                                </svg>
                            )}
                        </div>

                        {/* Success Glow */}
                        {state === 'success' && (
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-shimmer" />
                        )}
                    </div>
                </div>

                {/* Status Text */}
                <div className="text-center h-8">
                    {state === 'failed' && (
                        <p className="text-[#FF6B6B] font-bold text-sm animate-fade-in">
                            Fingerprint not recognized. Try again.
                        </p>
                    )}
                    {state === 'too-many' && (
                        <p className="text-[#FF6B6B] font-bold text-sm animate-fade-in">
                            Too many attempts. Use passcode.
                        </p>
                    )}
                    {state === 'not-supported' && (
                        <p className="text-amber-500 font-bold text-sm animate-fade-in">
                            Fingerprint not available on this device.
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
        </div>
    );
};

export default FingerprintLockScreen;
