
import React, { useState } from 'react';

interface NotificationsScreenProps {
  onBack: () => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const [msgTones, setMsgTones] = useState(true);
  const [msgVibrate, setMsgVibrate] = useState(true);
  const [msgPriority, setMsgPriority] = useState(true);
  const [grpTones, setGrpTones] = useState(true);
  const [grpVibrate, setGrpVibrate] = useState(false);
  const [callVibrate, setCallVibrate] = useState(true);

  const ToggleOption = ({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div className="w-full flex items-center justify-between p-4 neumorphic-elevated mb-4 active:scale-[0.98] transition-all">
      <div className="flex flex-col flex-1 pr-4 text-left px-2">
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

  const SelectOption = ({ label, value }: { label: string; value: string }) => (
    <button className="w-full flex items-center justify-between p-4 neumorphic-elevated mb-4 active:scale-[0.98] transition-all">
      <div className="flex flex-col items-start text-left px-2">
        <span className="font-extrabold text-sm text-[var(--text-primary)]">{label}</span>
        <span className="text-[10px] text-[#12C784] font-black uppercase tracking-widest mt-1">{value}</span>
      </div>
      <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-[var(--bg-pastel)] overflow-hidden">
      <header className="p-6 pb-2 flex items-center gap-4 sticky top-0 bg-[var(--bg-pastel)]/80 backdrop-blur-xl z-20">
        <button onClick={onBack} className="w-10 h-10 icon-container text-[var(--text-primary)] active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-[var(--text-primary)]">Notifications</h1>
      </header>

      <div className="p-6 flex-1 overflow-y-auto hide-scrollbar pb-20">
        <section className="mb-10">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-5">Message Notifications</p>
          <ToggleOption
            label="Conversation Tones"
            description="Play sounds for incoming and outgoing messages."
            checked={msgTones}
            onChange={setMsgTones}
          />
          <SelectOption label="Notification Tone" value="Default (Glass)" />
          <ToggleOption
            label="Vibrate"
            description="Vibrate on incoming private messages."
            checked={msgVibrate}
            onChange={setMsgVibrate}
          />
          <ToggleOption
            label="High Priority"
            description="Show previews of notifications at the top of the screen."
            checked={msgPriority}
            onChange={setMsgPriority}
          />
        </section>

        <section className="mb-10">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-5">Group Notifications</p>
          <ToggleOption
            label="Group Tones"
            description="Play sounds for messages in your joined groups."
            checked={grpTones}
            onChange={setGrpTones}
          />
          <ToggleOption
            label="Vibrate"
            description="Vibrate on group messages."
            checked={grpVibrate}
            onChange={setGrpVibrate}
          />
          <SelectOption label="Group Tone" value="Aurora" />
        </section>

        <section className="mb-10">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-5">Calls</p>
          <SelectOption label="Ringtone" value="Classic Hunt" />
          <ToggleOption
            label="Vibrate"
            description="Vibrate for incoming voice and video calls."
            checked={callVibrate}
            onChange={setCallVibrate}
          />
        </section>

        <section className="mb-12">
          <button className="w-full p-4 neumorphic-elevated active:scale-[0.98] transition-all text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            Reset Notification Settings
          </button>
        </section>

        <div className="p-6 neumorphic-elevated !bg-[var(--primary-mint)]/5 border-2 border-[var(--surface-white)] mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 icon-container bg-[var(--surface-white)] text-[#12C784]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-sm text-[var(--text-primary)]">Smart Alerts</h3>
              <p className="text-[10px] text-[var(--text-secondary)] font-bold leading-relaxed mt-2 italic">Hunt uses AI to silence noisy groups while ensuring you never miss important direct mentions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen;
