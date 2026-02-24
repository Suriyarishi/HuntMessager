import React, { useState, useEffect } from 'react';

interface MuteDurationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (duration: string) => void;
    isMuted: boolean;
}

const MuteDurationModal: React.FC<MuteDurationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isMuted,
}) => {
    const [selectedOption, setSelectedOption] = useState<string>('8 Hours');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const options = [
        { id: '8 Hours', label: '8 Hours', icon: '🕒' },
        { id: '1 Week', label: '1 Week', icon: '📅' },
        { id: 'Always', label: 'Always', icon: '♾️' },
    ];

    if (isMuted) {
        options.push({ id: 'Unmute', label: 'Unmute Notifications', icon: '🔔' });
    }

    return (
        <div className={`fixed inset-0 z-[100] flex items-end justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className={`w-full max-w-[430px] bg-[var(--surface-white)] rounded-t-[28px] p-6 shadow-2xl relative z-10 transform transition-all duration-300 ease-out border-t border-[var(--divider)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* Handle bar */}
                <div className="w-12 h-1.5 bg-[var(--divider)] rounded-full mx-auto mb-6" />

                <h2 className="text-xl font-black text-[var(--text-primary)] mb-1">Mute Notifications</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-8 font-bold">Choose how long you'd like to mute this chat.</p>

                <div className="space-y-3 mb-8">
                    {options.map((option) => {
                        const isSelected = selectedOption === option.id;
                        return (
                            <button
                                key={option.id}
                                onClick={() => setSelectedOption(option.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${isSelected
                                    ? 'bg-[var(--primary-mint)]/5 border-2 border-[var(--primary-mint)]/20 scale-[1.01]'
                                    : 'bg-[var(--bg-pastel)] border-2 border-transparent hover:bg-[var(--divider)]'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 
                                        ${isSelected ? 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] border-transparent shadow-md shadow-[#2FED9A]/30' : 'border-[var(--text-secondary)]/30'}`}>
                                        {isSelected && (
                                            <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                                        )}
                                    </div>
                                    <span className={`text-sm font-black transition-colors ${isSelected ? 'text-[var(--primary-mint-dark)]' : 'text-[var(--text-secondary)]'}`}>
                                        {option.label}
                                    </span>
                                </div>
                                <span className="text-lg opacity-60">{option.icon}</span>
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => {
                        onConfirm(selectedOption);
                        onClose();
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-[#2FED9A]/20 active:scale-[0.98] transition-all"
                >
                    Confirm
                </button>

                {/* Safe area spacer */}
                <div className="h-4" />
            </div>
        </div>
    );
};

export default MuteDurationModal;
