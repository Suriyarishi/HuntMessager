import React, { useState, useEffect } from 'react';

interface ReportUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReport: (reason: string, details: string) => void;
    userName: string;
}

const ReportUserModal: React.FC<ReportUserModalProps> = ({
    isOpen,
    onClose,
    onReport,
    userName,
}) => {
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                setSelectedReason('');
                setDetails('');
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const reasons = [
        "Spam or scam",
        "Harassment or bullying",
        "Inappropriate content",
        "Fake profile",
        "Other"
    ];

    const handleSubmit = () => {
        if (!selectedReason) return;
        setIsSubmitting(true);
        // Simulate API delay
        setTimeout(() => {
            onReport(selectedReason, details);
            setIsSubmitting(false);
            onClose();
        }, 1200);
    };

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className={`w-full max-w-sm bg-[var(--surface-white)] rounded-[24px] p-8 shadow-2xl relative z-10 transform transition-all duration-300 ease-out border border-[var(--divider)] ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <div className="mb-6">
                    <h2 className="text-xl font-black text-[var(--text-primary)] mb-1">Report User</h2>
                    <p className="text-sm text-[var(--text-secondary)] font-bold leading-relaxed">
                        Help us keep Hunt safe. Select a reason describing <span className="text-[var(--text-primary)] font-black">{userName}</span> below.
                    </p>
                </div>

                <div className="space-y-2 mb-6">
                    {reasons.map((reason) => {
                        const isSelected = selectedReason === reason;
                        return (
                            <button
                                key={reason}
                                onClick={() => setSelectedReason(reason)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isSelected ? 'bg-[var(--primary-mint)]/5 border border-[var(--primary-mint)]/20' : 'hover:bg-[var(--bg-pastel)]'}`}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-[#12C784] bg-[#12C784] shadow-md shadow-[#12C784]/30' : 'border-[var(--text-secondary)]/30'}`}>
                                    {isSelected && (
                                        <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                                    )}
                                </div>
                                <span className={`text-sm font-extrabold transition-colors ${isSelected ? 'text-[var(--primary-mint-dark)]' : 'text-[var(--text-secondary)]'}`}>
                                    {reason}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="relative mb-8">
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value.slice(0, 250))}
                        placeholder="Add more information (optional)"
                        className="w-full bg-[var(--surface-white)] input-field-neumorphic h-24 resize-none text-sm p-4 font-bold"
                    />
                    <div className="absolute bottom-3 right-3 text-[10px] font-black text-[var(--text-secondary)] opacity-50">
                        {details.length}/250
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 text-xs font-black text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedReason || isSubmitting}
                        className={`flex-1 py-3 rounded-xl font-black text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:grayscale text-xs uppercase tracking-widest ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8787] shadow-red-500/20'
                            }`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2 text-xs">
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Reporting...
                            </div>
                        ) : 'Report'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportUserModal;
