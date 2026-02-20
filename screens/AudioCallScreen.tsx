
import React, { useState, useEffect } from 'react';
import { ChatPreview } from '../types';

interface AudioCallScreenProps {
    contact: ChatPreview;
    onEndCall: () => void;
    onUpgradeToVideo: () => void;
}

type CallStatus = 'Calling…' | 'Ringing…' | 'Connected' | 'User Busy' | 'Call Failed' | 'Reconnecting' | 'No Internet' | 'Call Ended';

const AudioCallScreen: React.FC<AudioCallScreenProps> = ({ contact, onEndCall, onUpgradeToVideo }) => {
    const [status, setStatus] = useState<CallStatus>('Calling…');
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaker, setIsSpeaker] = useState(false);
    const [callTime, setCallTime] = useState(0);

    useEffect(() => {
        // Simulate call flow
        const timers: NodeJS.Timeout[] = [];

        timers.push(setTimeout(() => setStatus('Ringing…'), 2000));
        timers.push(setTimeout(() => setStatus('Connected'), 4000));

        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === 'Connected') {
            interval = setInterval(() => {
                setCallTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const handleEndCall = () => {
        setStatus('Call Ended');
        setTimeout(onEndCall, 1000);
    };

    const ControlButton = ({ icon, label, active, onClick, colorClass }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, colorClass?: string }) => (
        <div className="flex flex-col items-center gap-2">
            <button
                onClick={onClick}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 active:scale-[0.98] shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] ${active
                    ? 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white shadow-inner shadow-[#2FED9A]/30'
                    : colorClass || 'bg-[#F4F7FA] text-[#6B7280]'
                    }`}
            >
                <span className={active ? 'drop-shadow-sm' : ''}>{icon}</span>
            </button>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{label}</span>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-[#F4F7FA] relative overflow-hidden">
            {/* Background Radial Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(47,237,154,0.05)_0%,transparent_70%)]" />
            </div>

            {/* Top Section - Contact Info */}
            <div className="flex flex-col items-center pt-20 z-10">
                <div className="w-32 h-32 rounded-full p-1 bg-white shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] mb-6">
                    <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-full h-full rounded-full object-cover border-4 border-white"
                    />
                </div>
                <h2 className="text-2xl font-extrabold text-[#1F2937] mb-2">{contact.name}</h2>
                <div className="flex flex-col items-center gap-1">
                    <p className={`text-sm font-bold uppercase tracking-widest ${status === 'Connected' ? 'text-[#12C784]' : 'text-[#6B7280]'}`}>
                        {status}
                    </p>
                    {status === 'Connected' && (
                        <p className="text-xs font-mono font-bold text-[#1F2937]/50">{formatTime(callTime)}</p>
                    )}
                </div>
            </div>

            {/* Center Section - Visualizer/Pulse */}
            <div className="flex-1 flex items-center justify-center z-10">
                <div className="relative">
                    {/* Pulsing rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#2FED9A]/10 animate-ping opacity-20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#2FED9A]/20 animate-pulse opacity-30" />

                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2FED9A] to-[#12C784] shadow-[0_0_30px_rgba(47,237,154,0.4)] flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Bottom Control Panel */}
            <div className="p-10 pb-16 z-10">
                <div className="bg-white/40 backdrop-blur-md rounded-[40px] p-8 shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] border border-white/50 flex flex-wrap justify-between gap-6">
                    <ControlButton
                        label="Mute"
                        active={isMuted}
                        onClick={() => setIsMuted(!isMuted)}
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                {isMuted && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6" />}
                            </svg>
                        }
                    />
                    <ControlButton
                        label="Speaker"
                        active={isSpeaker}
                        onClick={() => setIsSpeaker(!isSpeaker)}
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        }
                    />
                    <ControlButton
                        label="Video"
                        onClick={onUpgradeToVideo}
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        }
                    />
                    <ControlButton
                        label="End"
                        onClick={handleEndCall}
                        colorClass="bg-gradient-to-br from-[#FF6B6B] to-[#EE5253] text-white shadow-[#FF6B6B]/30 shadow-lg"
                        icon={
                            <svg className="w-6 h-6 rotate-[135deg]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default AudioCallScreen;
