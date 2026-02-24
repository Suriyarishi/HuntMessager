import React from 'react';
import { PrivacySettings, PrivacyOption } from '../types';

interface LastSeenPrivacyScreenProps {
    settings: PrivacySettings;
    onUpdate: (update: Partial<PrivacySettings>) => void;
    onBack: () => void;
    onSelectExcept: () => void;
}

const LastSeenPrivacyScreen: React.FC<LastSeenPrivacyScreenProps> = ({
    settings, onUpdate, onBack, onSelectExcept
}) => {
    const options: { label: string; value: PrivacyOption }[] = [
        { label: 'Everyone', value: 'everyone' },
        { label: 'My Contacts', value: 'contacts' },
        { label: 'My Contacts Except...', value: 'contacts_except' },
        { label: 'Nobody', value: 'nobody' }
    ];

    const handleSelection = (value: PrivacyOption) => {
        onUpdate({ lastSeen: value });
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
                <h1 className="text-xl font-black text-[var(--text-primary)]">Last Seen & Online</h1>
            </header>

            <div className="p-6 flex-1 overflow-y-auto hide-scrollbar pb-20">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] leading-relaxed mb-8 px-2">
                    Control who can see your last seen time and when you're online.
                </p>

                <section className="mb-10">
                    <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-4">Who can see my Last Seen</p>
                    <div className="space-y-3">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleSelection(opt.value)}
                                className={`w-full flex items-center justify-between p-4 neumorphic-elevated transition-all ${settings.lastSeen === opt.value ? 'bg-[var(--primary-mint)]/5 border-2 border-[var(--primary-mint)]/20' : ''}`}
                            >
                                <span className={`font-extrabold text-sm ${settings.lastSeen === opt.value ? 'text-[var(--primary-mint-dark)]' : 'text-[var(--text-primary)]'}`}>
                                    {opt.label}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${settings.lastSeen === opt.value ? 'border-[var(--primary-mint-dark)] bg-[var(--primary-mint-dark)]' : 'border-[var(--text-secondary)]/30'}`}>
                                    {settings.lastSeen === opt.value && (
                                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="mb-10">
                    <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-2">Who can see when I’m Online</p>
                    <div className="p-4 neumorphic-elevated !bg-amber-50/50 dark:!bg-amber-900/10 border-l-4 border-amber-400 mb-6 mx-2">
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold leading-relaxed">
                            If you don’t share your last seen, you won’t be able to see others’ last seen.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            { label: 'Everyone', value: 'everyone' as const },
                            { label: 'Same as Last Seen', value: 'same_as_last_seen' as const }
                        ].map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => onUpdate({ online: opt.value })}
                                className={`w-full flex items-center justify-between p-4 neumorphic-elevated transition-all ${settings.online === opt.value ? 'bg-[var(--primary-mint)]/5 border-2 border-[var(--primary-mint)]/20' : ''}`}
                            >
                                <span className={`font-extrabold text-sm ${settings.online === opt.value ? 'text-[var(--primary-mint-dark)]' : 'text-[var(--text-primary)]'}`}>
                                    {opt.label}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${settings.online === opt.value ? 'border-[var(--primary-mint-dark)] bg-[var(--primary-mint-dark)]' : 'border-[var(--text-secondary)]/30'}`}>
                                    {settings.online === opt.value && (
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

export default LastSeenPrivacyScreen;
