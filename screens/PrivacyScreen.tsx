
import React, { useState } from 'react';

import { PrivacySettings } from '../types';

interface PrivacyScreenProps {
  onBack: () => void;
  onSetupBiometrics: () => void;
  onLastSeen: () => void;
  onProfilePhoto: () => void;
  onAbout: () => void;
  onBlockedContacts: () => void;
  privacySettings: PrivacySettings;
  onUpdatePrivacy: (settings: PrivacySettings) => void;
}

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({
  onBack, onSetupBiometrics, onLastSeen, onProfilePhoto, onAbout, onBlockedContacts,
  privacySettings, onUpdatePrivacy
}) => {
  const [screenLock, setScreenLock] = useState(false);

  const formatVisibility = (v: string) => {
    if (v === 'contacts') return 'My Contacts';
    if (v === 'contacts_except') return 'Contacts Except...';
    if (v === 'everyone') return 'Everyone';
    if (v === 'nobody') return 'Nobody';
    return v;
  };

  const VisibilityOption = ({ label, value, onClick }: { label: string; value: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 neumorphic-elevated active:scale-[0.98] transition-all mb-4"
    >
      <div className="flex flex-col items-start px-2">
        <span className="font-extrabold text-sm text-[var(--text-primary)]">{label}</span>
        <span className="text-[10px] text-[#12C784] font-black tracking-widest uppercase mt-0.5">{value}</span>
      </div>
      <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  const ToggleOption = ({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div className="w-full flex items-center justify-between p-4 neumorphic-elevated mb-4">
      <div className="flex flex-col flex-1 pr-6 px-2">
        <span className="font-extrabold text-sm text-[var(--text-primary)]">{label}</span>
        <span className="text-[10px] text-[var(--text-secondary)] leading-tight mt-1 font-black opacity-70 uppercase tracking-tighter">{description}</span>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-14 h-7 rounded-full transition-all relative shrink-0 ${checked ? 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] shadow-lg shadow-[#2FED9A]/30' : 'neumorphic-inset'}`}
      >
        <div className={`absolute top-1 w-5 h-5 bg-[var(--surface-white)] rounded-full transition-all shadow-md ${checked ? 'left-8' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[var(--bg-pastel)] overflow-hidden">
      <header className="p-6 pb-2 flex items-center gap-4 sticky top-0 bg-[var(--bg-pastel)]/80 backdrop-blur-xl z-20">
        <button onClick={onBack} className="w-10 h-10 icon-container text-[var(--text-primary)] active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-[var(--text-primary)]">Privacy</h1>
      </header>

      <div className="p-6 flex-1 overflow-y-auto hide-scrollbar pb-20">
        <section className="mb-10">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-5">Who can see my info</p>
          <VisibilityOption label="Last Seen & Online" value={formatVisibility(privacySettings.lastSeen)} onClick={onLastSeen} />
          <VisibilityOption label="Profile Photo" value={formatVisibility(privacySettings.profilePhoto)} onClick={onProfilePhoto} />
          <VisibilityOption label="About" value={formatVisibility(privacySettings.about)} onClick={onAbout} />
          <VisibilityOption label="Status" value="My Contacts" onClick={() => { }} />
        </section>

        <section className="mb-10">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-5">Messaging</p>
          <ToggleOption
            label="Read Receipts"
            description="If turned off, you won't send or receive Read Receipts. Read receipts are always sent for group chats."
            checked={privacySettings.readReceipts}
            onChange={(v) => onUpdatePrivacy({ ...privacySettings, readReceipts: v })}
          />
          <button
            onClick={onBlockedContacts}
            className="w-full flex items-center justify-between p-4 neumorphic-elevated active:scale-[0.98] transition-all mb-4"
          >
            <div className="flex flex-col items-start px-2">
              <span className="font-extrabold text-sm text-[var(--text-primary)]">Blocked Contacts</span>
              <span className="text-[10px] text-[var(--text-secondary)] font-black opacity-70 uppercase mt-0.5">{privacySettings.blockedContacts.length} contacts</span>
            </div>
            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </section>

        <section className="mb-10">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-5">Security</p>
          <button
            onClick={onSetupBiometrics}
            className="w-full flex items-center justify-between p-4 neumorphic-elevated mb-4 active:scale-[0.98] transition-all"
          >
            <div className="flex flex-col items-start text-left px-2">
              <span className="font-extrabold text-sm text-[var(--text-primary)]">Biometrics & FaceID</span>
              <span className="text-[10px] text-[var(--text-secondary)] leading-tight mt-1 font-black opacity-70 uppercase tracking-tighter">Configure secure access using your biometrics.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-md">New</span>
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <ToggleOption
            label="App Lock"
            description="Require FaceID or passcode to unlock Hunt Messenger."
            checked={screenLock}
            onChange={setScreenLock}
          />
        </section>

        <div className="p-6 neumorphic-elevated !bg-[var(--primary-mint)]/5 border-2 border-[var(--surface-white)] mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 icon-container bg-[var(--surface-white)] text-[#12C784]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-sm text-[var(--text-primary)]">End-to-end encrypted</h3>
              <p className="text-[10px] text-[var(--text-secondary)] font-bold leading-relaxed mt-2 italic">Your personal messages and calls are secured with end-to-end encryption. Only you and the person you're communicating with can read or listen to them.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyScreen;
