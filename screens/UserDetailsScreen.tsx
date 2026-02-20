import React, { useState } from 'react';
import { ChatPreview } from '../types';

interface UserDetailsScreenProps {
    contact: ChatPreview;
    onBack: () => void;
    onMessage: () => void;
    onAudioCall: () => void;
    onVideoCall: () => void;
}

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({
    contact,
    onBack,
    onMessage,
    onAudioCall,
    onVideoCall
}) => {
    const [isMuted, setIsMuted] = useState(false);

    return (
        <div className="flex flex-col h-full bg-[#F4F7FA] overflow-y-auto hide-scrollbar">
            {/* Header Sticky Background Panel */}
            <div className="relative h-72 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2FED9A]/20 to-[#12C784]/20 blur-3xl opacity-50" />

                {/* Navigation Buttons */}
                <div className="absolute top-6 left-6 right-6 flex justify-between z-20">
                    <button onClick={onBack} className="w-12 h-12 icon-container text-[#1F2937] active:scale-95 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="w-12 h-12 icon-container text-[#1F2937] active:scale-95 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>

                {/* Profile Header */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                    <div className="w-32 h-32 rounded-full neumorphic-elevated p-1.5 bg-white shadow-xl mb-4">
                        <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <h1 className="text-2xl font-black text-[#1F2937] mb-1">{contact.name}</h1>
                    <p className={`text-xs font-black uppercase tracking-widest ${contact.online ? 'text-[#12C784]' : 'text-[#94A3B8]'}`}>
                        {contact.online ? 'Online' : 'Last seen 2h ago'}
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 flex justify-center gap-8 -mt-6 relative z-10 mb-8">
                {[
                    {
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        ), label: 'Chat', action: onMessage
                    },
                    {
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        ), label: 'Audio', action: onAudioCall
                    },
                    {
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        ), label: 'Video', action: onVideoCall
                    }
                ].map((btn, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <button
                            onClick={btn.action}
                            className="w-14 h-14 bg-gradient-to-br from-[#2FED9A] to-[#12C784] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#2FED9A]/30 active:scale-95 transition-all"
                        >
                            {btn.icon}
                        </button>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">{btn.label}</span>
                    </div>
                ))}
            </div>

            {/* Info Section */}
            <div className="px-6 space-y-4 mb-8">
                <div className="neumorphic-elevated p-6 bg-white space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F0FFF4] flex items-center justify-center text-[#12C784]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-0.5">Phone Number</p>
                            <p className="text-sm font-bold text-[#1F2937]">+1 555-098-7654</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F0F9FF] flex items-center justify-center text-[#0EA5E9]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-0.5">Username</p>
                            <p className="text-sm font-bold text-[#1F2937]">@james_bond</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] flex items-center justify-center text-[#F97316]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-0.5">About</p>
                            <p className="text-sm font-bold text-[#1F2937] leading-relaxed">License to serve, shaken not stirred. 🍸</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Media & Files Section */}
            <div className="px-6 mb-8">
                <div className="neumorphic-elevated p-6 bg-white overflow-hidden">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#1F2937]">Media & Files</h3>
                        <button className="text-[10px] font-black uppercase tracking-widest text-[#12C784]">View All</button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="shrink-0 w-20 h-20 rounded-xl bg-slate-100 overflow-hidden border border-slate-100">
                                <img src={`https://picsum.photos/seed/${i + 10}/200`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Privacy & Control */}
            <div className="px-6 mb-12">
                <div className="neumorphic-elevated p-6 bg-white space-y-1">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold text-[#1F2937]">Mute Notifications</span>
                        </div>
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`w-11 h-6 rounded-full transition-colors relative ${isMuted ? 'bg-[#12C784]' : 'bg-[#E2E8F0]'}`}
                        >
                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isMuted ? 'translate-x-5' : ''}`} />
                        </button>
                    </div>

                    <button className="w-full flex items-center gap-4 py-3 active:opacity-60 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#EF4444]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                        <span className="text-sm font-bold text-[#EF4444]">Block User</span>
                    </button>

                    <button className="w-full flex items-center gap-4 py-3 active:opacity-60 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#EF4444]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <span className="text-sm font-bold text-[#EF4444]">Clear Chat</span>
                    </button>

                    <button className="w-full flex items-center gap-4 py-3 active:opacity-60 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#EF4444]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <span className="text-sm font-bold text-[#EF4444]">Report User</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsScreen;
