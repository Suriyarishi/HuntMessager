
import React, { useState, useEffect } from 'react';
import { ChatPreview } from '../types';

interface MediaPreviewScreenProps {
    media: { uri: string; type: 'image' | 'video' };
    contact: ChatPreview;
    onBack: () => void;
    onSend: (caption: string) => void;
}

const MediaPreviewScreen: React.FC<MediaPreviewScreenProps> = ({ media, contact, onBack, onSend }) => {
    const [caption, setCaption] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isReselecting, setIsReselecting] = useState(false);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleSend = () => {
        onSend(caption);
    };

    return (
        <div className="flex flex-col h-full bg-[var(--bg-pastel)] relative animate-fade-in overflow-hidden">
            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-[var(--bg-pastel)]/80 backdrop-blur-xl z-0"
            />

            {/* Top Bar */}
            <header className="px-6 py-6 flex items-center justify-between relative z-10 safe-area-top">
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-[var(--surface-white)] flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition-transform border border-[var(--surface-white)]/20 shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[var(--text-primary)] font-bold text-sm tracking-tight">{media.type === 'image' ? 'Image Preview' : 'Video Preview'}</span>
                    <span className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest mt-0.5">{contact.name}</span>
                </div>
                <button className="w-10 h-10 rounded-full bg-[var(--surface-white)] flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition-transform border border-[var(--surface-white)]/20 shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </header>

            {/* Media Area */}
            <div className="flex-1 flex items-center justify-center p-6 relative z-10 overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-[#2FED9A]/30 border-t-[#2FED9A] rounded-full animate-spin" />
                        <span className="text-white/50 text-[10px] font-black uppercase tracking-widest animate-pulse">Loading High-Res...</span>
                    </div>
                ) : (
                    <div className="relative w-full max-h-full flex items-center justify-center group">
                        {media.type === 'image' ? (
                            <img
                                src={media.uri}
                                alt="Preview"
                                className="max-w-full max-h-full rounded-2xl shadow-2xl transition-transform duration-300 cursor-zoom-in active:scale-110"
                            />
                        ) : (
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-800 shadow-2xl border border-white/10">
                                {/* Mock Video Content */}
                                <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-20 h-20 rounded-full bg-[#2FED9A]/90 backdrop-blur-md flex items-center justify-center text-white shadow-lg active:scale-90 transition-all group-hover:scale-110"
                                    >
                                        {isPlaying ? (
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-8 h-8 translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7L8 5z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Video Scrubber */}
                                <div className="absolute bottom-4 left-4 right-4 h-1 bg-[var(--surface-white)]/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#2FED9A] to-[#12C784] w-1/3 shadow-[0_0_8px_#2FED9A]" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Section */}
            <div className="p-6 pb-12 relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsReselecting(true)}
                        className="w-12 h-12 rounded-full bg-[var(--surface-white)] flex items-center justify-center text-[var(--text-primary)] border border-[var(--surface-white)]/20 active:scale-90 transition-all shrink-0 neumorphic-elevated shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Add a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full bg-[var(--surface-white)] border border-[var(--surface-white)]/20 rounded-full px-6 py-3.5 text-[var(--text-primary)] text-sm outline-none placeholder-[#9CA3AF] focus:bg-[var(--surface-white)]/90 transition-all shadow-inner"
                        />
                    </div>
                    <button
                        onClick={handleSend}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2FED9A] to-[#12C784] flex items-center justify-center text-white shadow-lg active:scale-95 transition-all scale-110"
                    >
                        <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MediaPreviewScreen;
