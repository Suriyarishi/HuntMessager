
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
            <div className="flex flex-col h-full bg-[#F4F7FA] items-center justify-center p-8 text-center animate-fade-in">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 neumorphic-elevated shadow-lg">
                    <svg className="w-12 h-12 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-extrabold text-[#1F2937] mb-3">Location Disabled</h2>
                <p className="text-[#6B7280] text-sm mb-8 leading-relaxed font-medium">We need your GPS permission to show your current location and nearby places.</p>
                <button className="w-full py-4 bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                    Enable Location
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#F4F7FA] relative animate-fade-in">
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2FED9A] to-[#12C784] shadow-2xl flex items-center justify-center border-4 border-white relative z-10 animate-bounce-short">
                            <div className="w-4 h-4 bg-white rounded-full animate-pulse-glow" />
                        </div>
                        {/* Pin Tail */}
                        <div className="w-1 h-3 bg-white -mt-1 shadow-sm" />
                        <div className="w-6 h-2 bg-black/10 rounded-[100%] blur-[2px] -mt-0.5 animate-shadow-pulse" />
                    </div>
                </div>
            </div>

            {/* Top Search Section */}
            <div className="relative z-20 p-6 pt-10">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="w-12 h-12 rounded-2xl neumorphic-elevated bg-[#F4F7FA] flex items-center justify-center text-[#1F2937] active:scale-90 transition-all border border-white">
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
                            className="w-full bg-[#F4F7FA] neumorphic-inset rounded-2xl px-6 py-3.5 text-sm font-medium outline-none border-none text-[#1F2937] placeholder-[#94A3B8]"
                        />
                    </div>
                </div>
            </div>

            {/* Loading State Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-30 bg-[#F4F7FA]/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-[#2FED9A]/20 border-t-[#2FED9A] rounded-full animate-spin" />
                        <span className="text-[#12C784] text-[10px] font-black uppercase tracking-widest animate-pulse">Fetching Location...</span>
                    </div>
                </div>
            )}

            {/* Bottom Panel */}
            {!isLoading && (
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transition-all duration-500 transform translate-y-0 animate-slide-up">
                    <div className="bg-white rounded-[32px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] p-8 border-t border-white/50">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-[#E0F7F1] flex items-center justify-center text-[#12C784] neumorphic-elevated shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-extrabold text-[#1F2937] leading-tight">{selectedLocation.name}</h2>
                                <p className="text-[#6B7280] text-xs font-medium mt-1 leading-relaxed">{selectedLocation.address}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 py-4 neumorphic-elevated rounded-2xl text-[#1F2937] font-bold text-sm active:scale-95 transition-all border border-white">
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
