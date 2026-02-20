
import React, { useState } from 'react';

interface OnboardingScreenProps {
    onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    const [currentCard, setCurrentCard] = useState(0);

    const cards = [
        {
            title: "HUNT Messenger",
            tagline: "Secure. Private. Fast.",
            description: "Experience the next level of private communication with military-grade encryption.",
            gradient: "from-[#2FED9A] to-[#12C784]",
            bgColor: "bg-mint-soft", // We'll add this to CSS if needed, or use inline
            illustration: (
                <svg className="w-48 h-48 drop-shadow-2xl" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#2FED9A', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#12C784', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M100 20 L40 50 V110 C40 150 100 180 100 180 C100 180 160 150 160 110 V50 L100 20Z" fill="url(#shieldGrad)" />
                    <rect x="75" y="75" width="50" height="40" rx="10" fill="white" opacity="0.9" />
                    <path d="M90 115 L80 125 V115 Z" fill="white" opacity="0.9" />
                </svg>
            )
        },
        {
            title: "Real-time Sync",
            tagline: "Always Connected.",
            description: "Your messages stay perfectly in sync across all your devices instantly.",
            gradient: "from-[#60A5FA] to-[#3B82F6]",
            bgColor: "bg-blue-soft",
            illustration: (
                <svg className="w-48 h-48 drop-shadow-2xl" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="syncGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <circle cx="70" cy="100" r="40" fill="url(#syncGrad)" />
                    <circle cx="130" cy="100" r="40" fill="white" opacity="0.8" />
                    <path d="M100 80 Q100 100 100 120" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M90 110 L100 120 L110 110" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "Creative AI",
            tagline: "Unlock Creativity.",
            description: "Harness the power of Gemini AI to generate images and enhance your chats.",
            gradient: "from-[#A78BFA] to-[#8B5CF6]",
            bgColor: "bg-lavender-soft",
            illustration: (
                <svg className="w-48 h-48 drop-shadow-2xl" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#A78BFA', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M60 140 L140 60" stroke="url(#aiGrad)" strokeWidth="12" strokeLinecap="round" />
                    <path d="M140 60 L150 40 L130 50 Z" fill="#FBBF24" />
                    <circle cx="80" cy="60" r="5" fill="#FBBF24" className="animate-pulse" />
                    <circle cx="160" cy="100" r="4" fill="#FBBF24" className="animate-ping" />
                </svg>
            )
        }
    ];

    const nextCard = () => {
        if (currentCard < cards.length - 1) {
            setCurrentCard(currentCard + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="absolute inset-0 z-[60] bg-[#F4F7FA] flex items-center justify-center p-6">
            <div className="w-full h-full max-h-[750px] relative flex flex-col items-center">

                {/* Card Container */}
                <div className="w-full flex-1 relative overflow-hidden rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white flex flex-col">

                    {/* Top Section (60%) */}
                    <div className={`relative h-[60%] w-full flex items-center justify-center transition-all duration-700 bg-gradient-to-br ${cards[currentCard].gradient}`}>
                        <div className="transition-all duration-500 transform scale-110">
                            {cards[currentCard].illustration}
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-6 flex gap-2">
                            {cards.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 transition-all duration-300 rounded-full ${i === currentCard ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bottom Section (40%) */}
                    <div className="h-[40%] w-full bg-white p-10 flex flex-col items-center text-center">
                        <h2 className="text-2xl font-black text-[#1F2937] mb-2 transition-all duration-500">{cards[currentCard].title}</h2>
                        <p className="text-sm font-extrabold text-[#12C784] uppercase tracking-widest mb-4">{cards[currentCard].tagline}</p>
                        <p className="text-sm text-[#6B7280] font-medium leading-relaxed max-w-[240px]">
                            {cards[currentCard].description}
                        </p>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="w-full mt-8 flex items-center justify-between px-4">
                    <button
                        onClick={onComplete}
                        className="text-[#6B7280] font-black text-xs uppercase tracking-widest hover:text-[#1F2937] transition-colors"
                    >
                        Skip
                    </button>

                    <button
                        onClick={nextCard}
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2FED9A] to-[#12C784] shadow-[0_8px_20px_rgba(47,237,154,0.3)] flex items-center justify-center text-white active:scale-90 transition-all group"
                    >
                        {currentCard === cards.length - 1 ? (
                            <span className="font-black text-[10px] uppercase tracking-tighter">Start</span>
                        ) : (
                            <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .card-enter {
          animation: slideIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
        </div>
    );
};

export default OnboardingScreen;
