
import React, { useState, useEffect } from 'react';
import { ChatPreview } from '../types';

interface DocumentPreviewScreenProps {
    document: { name: string; size: string; type: string };
    contact: ChatPreview;
    onBack: () => void;
    onSend: (caption: string) => void;
}

const DocumentPreviewScreen: React.FC<DocumentPreviewScreenProps> = ({ document, contact, onBack, onSend }) => {
    const [caption, setCaption] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate document loading
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const getFileIcon = () => {
        switch (document.type) {
            case 'PDF':
                return (
                    <div className="w-16 h-16 rounded-2xl bg-[#FFE5E5] flex items-center justify-center text-[#FF4D4D] neumorphic-elevated shadow-lg">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A1 1 0 0111 2.293l4.707 4.707a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v10h8V8h-3a1 1 0 01-1-1V4H6z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'DOC':
                return (
                    <div className="w-16 h-16 rounded-2xl bg-[#E5F1FF] flex items-center justify-center text-[#4D94FF] neumorphic-elevated shadow-lg">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-16 h-16 rounded-2xl bg-[#F4F7FA] flex items-center justify-center text-[#94A3B8] neumorphic-elevated shadow-lg">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A1 1 0 0111 2.293l4.707 4.707a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v10h8V8h-3a1 1 0 01-1-1V4H6z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                onClick={onBack}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[360px] bg-[#F4F7FA] rounded-[32px] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] border border-white/50 animate-scale-in">

                {/* Top Header Card */}
                <div className="p-8 pb-6 flex flex-col items-center text-center">
                    {getFileIcon()}
                    <h2 className="mt-5 text-lg font-extrabold text-[#1F2937] px-4 truncate w-full">{document.name}</h2>
                    <p className="text-[#6B7280] text-[10px] font-black uppercase tracking-widest mt-1 opacity-60">{document.size} • {document.type} DOCUMENT</p>
                </div>

                {/* Middle Preview View */}
                <div className="px-8 pb-8">
                    <div className="w-full aspect-[4/3] bg-white rounded-3xl neumorphic-inset flex items-center justify-center border border-white overflow-hidden p-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-4 border-[#2FED9A]/20 border-t-[#2FED9A] rounded-full animate-spin" />
                                <span className="text-[#12C784] text-[10px] font-extrabold uppercase tracking-widest animate-pulse">Scanning File...</span>
                            </div>
                        ) : (
                            <div className="text-center">
                                {/* Mock PDF Content Preview */}
                                <div className="space-y-2 opacity-10">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="h-2 bg-slate-200 rounded-full" style={{ width: `${100 - (i * 10)}%` }} />
                                    ))}
                                </div>
                                <div className="mt-4 flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-[#E0F7F1] flex items-center justify-center text-[#12C784] mb-2 shadow-sm">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293l-4.707 4.707a1 1 0 01-1.414 0L7 6.414 2.707 10.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 7.586l4.293-4.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-[11px] font-bold text-[#94A3B8]">Safe & Ready to send</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Actions Area */}
                <div className="px-8 pb-8 space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Add a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full bg-[#F4F7FA] neumorphic-inset rounded-2xl px-6 py-4 text-sm font-medium outline-none border-none text-[#1F2937] placeholder-[#94A3B8]"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="flex-1 py-4 text-xs font-black text-[#6B7280] uppercase tracking-widest hover:text-[#1F2937] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSend(caption)}
                            disabled={isLoading}
                            className="flex-[2] py-4 bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white rounded-2xl font-black text-sm shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 shadow-[#12C784]/30"
                        >
                            SEND DOCUMENT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentPreviewScreen;
