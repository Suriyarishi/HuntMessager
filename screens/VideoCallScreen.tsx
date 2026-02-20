
import React, { useState, useEffect } from 'react';
import { ChatPreview } from '../types';

interface VideoCallScreenProps {
    contact: ChatPreview;
    onEndCall: () => void;
}

type CallState = 'Calling' | 'Connected' | 'Reconnecting' | 'Weak Connection' | 'Call Ended' | 'Permission Required';

const VideoCallScreen: React.FC<VideoCallScreenProps> = ({ contact, onEndCall }) => {
    const [callState, setCallState] = useState<CallState>('Calling');
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [callDuration, setCallDuration] = useState(0);
    const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

    useEffect(() => {
        // Simulate permission check
        const permTimer = setTimeout(() => {
            setHasPermissions(true);
            setCallState('Calling');
        }, 1000);

        // Simulate call connection
        const connectTimer = setTimeout(() => {
            if (hasPermissions !== false) setCallState('Connected');
        }, 4000);

        return () => {
            clearTimeout(permTimer);
            clearTimeout(connectTimer);
        };
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (callState === 'Connected' || callState === 'Weak Connection') {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [callState]);

    const formatDuration = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const handleEndCall = () => {
        setCallState('Call Ended');
        setTimeout(onEndCall, 1000);
    };

    if (hasPermissions === false) {
        return (
            <div className="flex flex-col h-full bg-[#F4F7FA] items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 neumorphic-elevated">
                    <svg className="w-10 h-10 text-[#12C784]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-[#1F2937] mb-2">Camera Permission Required</h2>
                <p className="text-[#6B7280] text-sm mb-8 font-medium">Please enable camera and microphone access to start video calls.</p>
                <button className="px-8 py-3 bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white rounded-full font-bold shadow-lg active:scale-95 transition-all">
                    Open Settings
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#F4F7FA] relative overflow-hidden p-4">
            {/* Remote Video Frame */}
            <div className="flex-1 relative rounded-[32px] overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] bg-slate-200">
                {/* Mock Remote Video Content */}
                <div className="absolute inset-0 bg-[#F4F7FA] flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center neumorphic-elevated">
                        <img src={contact.avatar} alt={contact.name} className="w-36 h-36 rounded-full object-cover border-4 border-white" />
                    </div>
                </div>

                {/* Transition Overlay */}
                <div className={`absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-1000 ${callState === 'Calling' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2FED9A] to-[#12C784] animate-pulse flex items-center justify-center shadow-lg mb-4">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-[#12C784] font-black uppercase tracking-widest text-xs">Calling {contact.name.split(' ')[0]}...</p>
                    </div>
                </div>

                {/* Weak Connection Banner */}
                {callState === 'Weak Connection' && (
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-[#FF6B6B]/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-30">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Weak Connection</span>
                    </div>
                )}

                {/* Self Preview (Draggable Mock) */}
                <div className="absolute top-6 right-6 w-32 h-44 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl overflow-hidden z-20 active:scale-95 transition-transform cursor-move">
                    {isCameraOn ? (
                        <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/40 animate-pulse" />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Top Info Section */}
                <div className="absolute top-0 left-0 right-0 p-8 pt-10 flex flex-col items-center">
                    <h2 className="text-xl font-extrabold text-[#1F2937] drop-shadow-sm">{contact.name}</h2>
                    <div className="mt-1 flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#12C784]">
                            {callState === 'Connected' ? formatDuration(callDuration) : callState}
                        </span>
                        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#2FED9A] to-transparent mt-1 rounded-full opacity-50" />
                    </div>
                </div>

                {/* Control Panel */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] z-20">
                    <div className="bg-white/30 backdrop-blur-2xl rounded-[32px] p-5 flex items-center justify-between shadow-[20px_20px_40px_rgba(0,0,0,0.1),-5px_-5px_20px_rgba(255,255,255,0.8)] border border-white/40">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${isMuted ? 'bg-[#F4F7FA] text-[#6B7280] shadow-inner' : 'bg-[#F4F7FA] text-[#1F2937] shadow-lg'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                {isMuted && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6" />}
                            </svg>
                        </button>

                        <button
                            onClick={() => setIsCameraOn(!isCameraOn)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${!isCameraOn ? 'bg-slate-700 text-white shadow-inner' : 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white shadow-lg'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                {!isCameraOn && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6" />}
                            </svg>
                        </button>

                        <button
                            className="w-12 h-12 rounded-full bg-[#F4F7FA] text-[#1F2937] flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>

                        <button
                            onClick={handleEndCall}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#EE5253] text-white flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90"
                        >
                            <svg className="w-5 h-5 rotate-[135deg]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCallScreen;
