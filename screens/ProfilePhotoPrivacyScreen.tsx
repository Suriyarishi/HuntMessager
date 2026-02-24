import React from 'react';
import { PrivacySettings, PrivacyOption } from '../types';

interface ProfilePhotoPrivacyScreenProps {
    settings: PrivacySettings;
    onUpdate: (update: Partial<PrivacySettings>) => void;
    onBack: () => void;
    onSelectExcept: () => void;
}

const ProfilePhotoPrivacyScreen: React.FC<ProfilePhotoPrivacyScreenProps> = ({
    settings, onUpdate, onBack, onSelectExcept
}) => {
    const options: { label: string; value: PrivacyOption }[] = [
        { label: 'Everyone', value: 'everyone' },
        { label: 'My Contacts', value: 'contacts' },
        { label: 'My Contacts Except...', value: 'contacts_except' },
        { label: 'Nobody', value: 'nobody' }
    ];

    const handleSelection = (value: PrivacyOption) => {
        onUpdate({ profilePhoto: value });
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
                <h1 className="text-xl font-black text-[var(--text-primary)]">Profile Photo</h1>
            </header>

            <div className="p-6 flex-1 overflow-y-auto hide-scrollbar pb-20 flex flex-col items-center">
                {/* Profile Preview */}
                <div className="mt-4 mb-8 relative">
                    <div className="w-32 h-32 rounded-full neumorphic-elevated p-2 border-2 border-[var(--surface-white)] shadow-xl overflow-hidden">
                        <img
                            src="https://picsum.photos/seed/sarah/400"
                            alt="Profile Preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <div className="absolute bottom-1 right-1 w-8 h-8 bg-gradient-to-br from-[#2FED9A] to-[#12C784] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-[var(--surface-white)]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                    </div>
                </div>

                <p className="text-[11px] font-bold text-[var(--text-secondary)] leading-relaxed mb-8 px-4 text-center">
                    Choose who can see your profile picture.
                </p>

                <section className="w-full">
                    <div className="space-y-3">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleSelection(opt.value)}
                                className={`w-full flex items-center justify-between p-4 neumorphic-elevated transition-all ${settings.profilePhoto === opt.value ? 'bg-[var(--primary-mint)]/5 border-2 border-[var(--primary-mint)]/20' : ''}`}
                            >
                                <span className={`font-extrabold text-sm ${settings.profilePhoto === opt.value ? 'text-[var(--primary-mint-dark)]' : 'text-[var(--text-primary)]'}`}>
                                    {opt.label}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${settings.profilePhoto === opt.value ? 'border-[var(--primary-mint-dark)] bg-[var(--primary-mint-dark)]' : 'border-[var(--text-secondary)]/30'}`}>
                                    {settings.profilePhoto === opt.value && (
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

export default ProfilePhotoPrivacyScreen;
