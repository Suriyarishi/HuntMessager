import React from 'react';
import { PrivacySettings, PrivacyOption } from '../types';

interface AboutPrivacyScreenProps {
    settings: PrivacySettings;
    onUpdate: (update: Partial<PrivacySettings>) => void;
    onBack: () => void;
    onSelectExcept: () => void;
    userBio?: string;
}

const AboutPrivacyScreen: React.FC<AboutPrivacyScreenProps> = ({
    settings, onUpdate, onBack, onSelectExcept, userBio = "The future is not set. There is no fate but what we make for ourselves."
}) => {
    const options: { label: string; value: PrivacyOption }[] = [
        { label: 'Everyone', value: 'everyone' },
        { label: 'My Contacts', value: 'contacts' },
        { label: 'My Contacts Except...', value: 'contacts_except' },
        { label: 'Nobody', value: 'nobody' }
    ];

    const handleSelection = (value: PrivacyOption) => {
        onUpdate({ about: value });
        if (value === 'contacts_except') {
            onSelectExcept();
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--bg-pastel)] overflow-hidden">
            <header className="p-6 pb-2 flex items-center gap-4 sticky top-0 bg-[var(--bg-pastel)]/80 backdrop-blur-xl z-20">
                <button onClick={onBack} className="w-10 h-10 icon-container text-[var(--text-primary)] active:scale-95 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-black text-[var(--text-primary)]">About</h1>
            </header>

            <div className="p-6 flex-1 overflow-y-auto hide-scrollbar pb-20">
                {/* Bio Preview Card */}
                <div className="mb-10 p-5 neumorphic-inset rounded-3xl border border-[var(--surface-white)]/50">
                    <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-2 opacity-60">Your current Bio</p>
                    <p className="text-sm font-bold text-[var(--text-primary)] leading-relaxed italic">
                        "{userBio}"
                    </p>
                </div>

                <p className="text-[11px] font-bold text-[var(--text-secondary)] leading-relaxed mb-8 px-2">
                    Control who can see your About information.
                </p>

                <section className="w-full">
                    <div className="space-y-3">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleSelection(opt.value)}
                                className={`w-full flex items-center justify-between p-4 neumorphic-elevated transition-all ${settings.about === opt.value ? 'bg-[var(--primary-mint)]/5 border-2 border-[var(--primary-mint)]/20' : ''}`}
                            >
                                <span className={`font-extrabold text-sm ${settings.about === opt.value ? 'text-[var(--primary-mint-dark)]' : 'text-[var(--text-primary)]'}`}>
                                    {opt.label}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${settings.about === opt.value ? 'border-[var(--primary-mint-dark)] bg-[var(--primary-mint-dark)]' : 'border-[var(--text-secondary)]/30'}`}>
                                    {settings.about === opt.value && (
                                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutPrivacyScreen;
