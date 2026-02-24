import React, { useEffect, useState } from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isDanger?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    isDanger = false,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300); // Wait for animation
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className={`bg-[var(--surface-white)] rounded-[32px] p-8 w-full max-w-sm relative z-10 shadow-2xl transform transition-all duration-300 border border-[var(--divider)] ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
            >
                <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center neumorphic-inset ${isDanger ? 'text-[#FF6B6B]' : 'text-[#2FED9A]'}`}>
                    {isDanger ? (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ) : (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>

                <h3 className="text-xl font-black text-center text-[var(--text-primary)] mb-2">
                    {title}
                </h3>

                <p className="text-center text-[var(--text-secondary)] mb-8 leading-relaxed font-bold text-sm">
                    {message}
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl font-black text-[var(--text-secondary)] hover:bg-[var(--bg-pastel)] transition-colors active:scale-95 text-xs uppercase tracking-widest"
                    >
                        {cancelLabel}
                    </button>

                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 py-3 px-4 rounded-xl font-black text-white shadow-lg active:scale-95 active:shadow-sm transition-all text-xs uppercase tracking-widest ${isDanger
                            ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8787] shadow-red-500/20'
                            : 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] shadow-teal-500/20'
                            }`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
