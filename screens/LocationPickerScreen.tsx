
import React, { useState, useEffect } from 'react';
import { ChatPreview } from '../types';

interface LocationPickerScreenProps {
    contact: ChatPreview;
    onBack: () => void;
    onSend: (location: any) => void;
}

const LocationPickerScreen: React.FC<LocationPickerScreenProps> = ({ contact, onBack, onSend }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [selectedLocation, setSelectedLocation] = useState({
        name: 'San Francisco, CA',
        address: 'Market St, Financial District, CA 94103'
    });

    useEffect(() => {
        // Simulate location loading and permission check
        const timer = setTimeout(() => {
            setHasPermission(true);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleSend = () => {
        onSend(selectedLocation);
    };

    if (hasPermission === false) {
        return (
            <div className="flex flex-col h-full bg-[var(--bg-pastel)] items-center justify-center p-8 text-center animate-fade-in">
                <div className="w-24 h-24 rounded-full bg-[var(--surface-white)] flex items-center justify-center mb-6 neumorphic-elevated shadow-lg">
                    <svg className="w-12 h-12 text-[var(--error-soft)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-3">Location Disabled</h2>
                <p className="text-[var(--text-secondary)] text-sm mb-8 leading-relaxed font-medium">We need your GPS permission to show your current location and nearby places.</p>
                <button className="w-full py-4 bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                    Enable Location
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[var(--bg-pastel)] relative animate-fade-in">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center overflow-hidden">
                {/* Abstract Map Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(#12C784 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Draggable Pin Container */}
                <div className="relative z-0">
                    <div className={`flex flex-col items-center transition-transform hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2FED9A] to-[#12C784] shadow-2xl flex items-center justify-center border-4 border-[var(--surface-white)] relative z-10 animate-bounce-short">
                            <div className="w-4 h-4 bg-[var(--surface-white)] rounded-full animate-pulse-glow" />
                        </div>
                        {/* Pin Tail */}
                        <div className="w-1 h-3 bg-[var(--surface-white)] -mt-1 shadow-sm" />
                        <div className="w-6 h-2 bg-black/10 rounded-[100%] blur-[2px] -mt-0.5 animate-shadow-pulse" />
                    </div>
                </div>
            </div>

            {/* Top Search Section */}
            <div className="relative z-20 p-6 pt-10">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="w-12 h-12 rounded-2xl neumorphic-elevated bg-[var(--bg-pastel)] flex items-center justify-center text-[var(--text-primary)] active:scale-90 transition-all border border-[var(--surface-white)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[var(--bg-pastel)] neumorphic-inset rounded-2xl px-6 py-3.5 text-sm font-medium outline-none border-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
                        />
                    </div>
                </div>
            </div>

            {/* Loading State Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-30 bg-[var(--bg-pastel)]/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-[#2FED9A]/20 border-t-[#2FED9A] rounded-full animate-spin" />
                        <span className="text-[#12C784] text-[10px] font-black uppercase tracking-widest animate-pulse">Fetching Location...</span>
                    </div>
                </div>
            )}

            {/* Bottom Panel */}
            {!isLoading && (
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transition-all duration-500 transform translate-y-0 animate-slide-up">
                    <div className="bg-[var(--surface-white)] rounded-[32px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] p-8 border-t border-[var(--surface-white)]/50">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-[#E0F7F1] flex items-center justify-center text-[#12C784] neumorphic-elevated shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-extrabold text-[var(--text-primary)] leading-tight">{selectedLocation.name}</h2>
                                <p className="text-[var(--text-secondary)] text-xs font-medium mt-1 leading-relaxed">{selectedLocation.address}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 py-4 neumorphic-elevated rounded-2xl text-[var(--text-primary)] font-bold text-sm active:scale-95 transition-all border border-[var(--surface-white)]">
                                Nearby Places
                            </button>
                            <button
                                onClick={handleSend}
                                className="flex-[1.5] py-4 bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white rounded-2xl font-black text-sm shadow-lg active:scale-95 transition-all shadow-[#12C784]/30"
                            >
                                SEND LOCATION
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationPickerScreen;
