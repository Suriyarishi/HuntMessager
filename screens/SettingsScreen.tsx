import React from 'react';
import { UserProfile, SecuritySettings, AppearanceSettings } from '../types';

import { useTheme } from '../ThemeContext';

interface SettingsScreenProps {
  user: UserProfile | null;
  onBack: () => void;
  onEditProfile: () => void;
  onPrivacy: () => void;
  onNotifications: () => void;
  onLinkedDevices: () => void;
  onLogout: () => void;
  securitySettings: SecuritySettings;
  onUpdateSecurity: (settings: SecuritySettings) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  user, onBack, onEditProfile, onPrivacy, onNotifications, onLinkedDevices, onLogout,
  securitySettings, onUpdateSecurity
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-col h-full bg-[var(--bg-pastel)] transition-colors duration-300">
      <header className="p-6 pb-2 flex items-center gap-4 sticky top-0 bg-[var(--bg-pastel)]/80 backdrop-blur-xl z-20">
        <button onClick={onBack} className="w-10 h-10 icon-container text-[var(--text-primary)] active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-[var(--text-primary)]">Settings</h1>
      </header>

      <div className="p-6 flex-1 overflow-y-auto hide-scrollbar pb-10">
        <div className="flex flex-col items-center mb-10 p-8 neumorphic-elevated rounded-[40px] border-4 border-[var(--surface-white)] transition-all">
          <div className="w-24 h-24 rounded-[32px] overflow-hidden mb-4 border-2 border-[var(--surface-white)] shadow-lg">
            <img
              src={user?.photo || 'https://picsum.photos/seed/user/200'}
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
          <h2 className="text-2xl font-black text-[var(--text-primary)]">{user?.name || 'User'}</h2>
          <p className="text-[var(--text-secondary)] text-sm font-bold mt-1 uppercase tracking-wider">{user?.phoneNumber || '+1 555-0123'}</p>
        </div>

        <div className="space-y-4 mb-10">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-2">Account</p>

          {[
            { label: 'Edit Profile', icon: '👤', onClick: onEditProfile },
            { label: 'Privacy', icon: '🔒', onClick: onPrivacy },
            { label: 'Notifications', icon: '🔔', onClick: onNotifications },
            { label: 'Linked Devices', icon: '💻', onClick: onLinkedDevices },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 neumorphic-elevated group active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 icon-container bg-[var(--bg-pastel)] text-lg">
                  {item.icon}
                </div>
                <span className="font-extrabold text-[var(--text-primary)]">{item.label}</span>
              </div>
              <svg className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[#12C784] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-10">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-2">Security</p>

          <div className="p-4 neumorphic-elevated flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 icon-container bg-[var(--bg-pastel)] text-lg">
                {securitySettings.preferredBiometric === 'fingerprint' ? '☝️' : '👤'}
              </div>
              <span className="font-extrabold text-[var(--text-primary)]">Enable {securitySettings.preferredBiometric === 'fingerprint' ? 'Fingerprint' : 'Face ID'}</span>
            </div>
            <button
              onClick={() => onUpdateSecurity({ ...securitySettings, isBiometricEnabled: !securitySettings.isBiometricEnabled })}
              className={`w-12 h-6 rounded-full relative transition-all ${securitySettings.isBiometricEnabled ? 'bg-gradient-to-r from-[#2FED9A] to-[#12C784] shadow-md' : 'neumorphic-inset'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-[var(--surface-white)] rounded-full transition-all shadow-sm ${securitySettings.isBiometricEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-4 neumorphic-elevated flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 icon-container bg-[var(--bg-pastel)] text-lg">
                ⚙️
              </div>
              <span className="font-extrabold text-[var(--text-primary)]">Preferred Method</span>
            </div>
            <div className="flex gap-2 p-1 neumorphic-inset rounded-2xl">
              {(['fingerprint', 'face'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => onUpdateSecurity({ ...securitySettings, preferredBiometric: method })}
                  className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${securitySettings.preferredBiometric === method ? 'bg-[var(--surface-white)] text-[#12C784] shadow-sm' : 'text-[var(--text-secondary)]'}`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {securitySettings.isBiometricEnabled && (
            <div className="p-4 neumorphic-elevated flex flex-col gap-4 animate-slide-down-fade">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 icon-container bg-[var(--bg-pastel)] text-lg">
                  ⏲️
                </div>
                <span className="font-extrabold text-[var(--text-primary)]">Timeout threshold</span>
              </div>
              <div className="flex gap-2 p-1 neumorphic-inset rounded-2xl">
                {(['immediate', '1min', '5min'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => onUpdateSecurity({ ...securitySettings, timeout: t })}
                    className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${securitySettings.timeout === t ? 'bg-[var(--surface-white)] text-[#12C784] shadow-sm' : 'text-[var(--text-secondary)]'}`}
                  >
                    {t === 'immediate' ? 'Now' : t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 mb-10">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-2">Appearance</p>
          <div className="p-4 neumorphic-elevated flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 icon-container bg-[var(--bg-pastel)] text-lg">
                🌓
              </div>
              <span className="font-extrabold text-[var(--text-primary)]">Theme</span>
            </div>
            <div className="flex gap-2 p-1 neumorphic-inset rounded-2xl">
              {(['light', 'dark', 'system'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTheme(mode)}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${theme === mode ? 'bg-[var(--primary-gradient)] text-white shadow-md' : 'text-[var(--text-secondary)]'}`}
                  style={theme === mode ? { background: 'var(--primary-gradient)' } : {}}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to logout?')) onLogout();
          }}
          className="w-full p-4 flex items-center gap-4 neumorphic-elevated !bg-[#FFF5F5] group active:scale-[0.98] transition-all border-l-4 border-l-[#FF6B6B]"
        >
          <div className="w-10 h-10 icon-container bg-[var(--surface-white)] text-xl">
            🚪
          </div>
          <span className="font-black text-[#FF6B6B]">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;
