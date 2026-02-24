
import React, { useState } from 'react';

interface Device {
  id: string;
  name: string;
  type: 'desktop' | 'laptop' | 'browser';
  location: string;
  lastActive: string;
  isCurrent?: boolean;
}

interface LinkedDevicesScreenProps {
  onBack: () => void;
}

const LinkedDevicesScreen: React.FC<LinkedDevicesScreenProps> = ({ onBack }) => {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'MacBook Pro 16"', type: 'laptop', location: 'San Francisco, USA', lastActive: 'Active Now', isCurrent: true },
    { id: '2', name: 'Windows PC - Chrome', type: 'browser', location: 'London, UK', lastActive: '2 hours ago' },
    { id: '3', name: 'iPad Pro', type: 'laptop', location: 'Paris, France', lastActive: 'Yesterday at 9:12 PM' }
  ]);

  const [isLinking, setIsLinking] = useState(false);

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'laptop':
      case 'desktop': return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
      case 'browser': return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    }
  };

  const removeDevice = (id: string) => {
    if (confirm('Logout from this device?')) {
      setDevices(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-pastel)] overflow-hidden relative">
      <header className="p-6 pb-2 flex items-center gap-4 sticky top-0 bg-[var(--bg-pastel)]/80 backdrop-blur-xl z-20">
        <button onClick={onBack} className="w-10 h-10 icon-container text-[var(--text-primary)] active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-[var(--text-primary)]">Linked Devices</h1>
      </header>

      <div className="p-6 flex-1 overflow-y-auto hide-scrollbar pb-24">
        <div className="p-8 bg-[var(--text-primary)] rounded-[40px] mb-10 text-white flex flex-col items-center text-center shadow-2xl relative overflow-hidden border-4 border-white/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2FED9A]/10 to-transparent rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="w-20 h-20 bg-[var(--surface-white)]/5 rounded-3xl flex items-center justify-center mb-6 border border-[var(--surface-white)]/10 shadow-inner">
            <svg className="w-10 h-10 text-[#2FED9A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black mb-2">Link a Device</h2>
          <p className="text-sm font-bold text-white/40 mb-8 max-w-[240px] uppercase tracking-wider">Use Hunt on other devices</p>
          <button
            onClick={() => setIsLinking(true)}
            className="w-full py-4 bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white font-black rounded-2xl active:scale-95 transition-all shadow-xl shadow-[#2FED9A]/20"
          >
            Link New Device
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4 mb-2">Your Devices</p>

          {devices.map(device => (
            <div
              key={device.id}
              className={`p-5 neumorphic-elevated flex items-center gap-5 transition-all ${device.isCurrent ? 'border-2 border-[#2FED9A]/20' : ''}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${device.isCurrent ? 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white shadow-lg' : 'neumorphic-inset text-[var(--text-secondary)]'}`}>
                {getDeviceIcon(device.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-extrabold text-sm text-[var(--text-primary)] truncate">{device.name}</h3>
                  {device.isCurrent && (
                    <span className="text-[8px] font-black bg-[#F4FFF9] text-[#12C784] px-2 py-0.5 rounded-full uppercase tracking-widest border border-[#12C784]/20 shadow-sm">Current</span>
                  )}
                </div>
                <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-tight opacity-70">{device.location}</p>
                <p className={`text-[10px] font-black uppercase mt-1.5 tracking-widest ${device.lastActive === 'Active Now' ? 'text-[#12C784]' : 'text-[var(--text-secondary)]'}`}>
                  {device.lastActive}
                </p>
              </div>
              {!device.isCurrent && (
                <button
                  onClick={() => removeDevice(device.id)}
                  className="w-10 h-10 icon-container !bg-[#FFF5F5] text-[#FF6B6B] active:scale-95 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013-3v1" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="mt-12 text-[10px] text-[var(--text-secondary)] text-center px-8 leading-relaxed font-black uppercase tracking-[0.1em] opacity-60">
          Logged in devices can access your history. Logout from any device you don't recognize.
        </p>
      </div>

      {isLinking && (
        <div className="absolute inset-0 bg-[var(--bg-pastel)]/98 backdrop-blur-xl z-50 flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-72 h-72 mb-12 neumorphic-elevated p-6 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-10 h-10 border-t-8 border-l-8 border-[#2FED9A] rounded-tl-[32px] -ml-1 -mt-1" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-8 border-r-8 border-[#2FED9A] rounded-tr-[32px] -mr-1 -mt-1" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-8 border-l-8 border-[#2FED9A] rounded-bl-[32px] -ml-1 -mb-1" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-8 border-r-8 border-[#2FED9A] rounded-br-[32px] -mr-1 -mb-1" />

            <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#2FED9A] to-transparent shadow-[0_0_20px_rgba(47,237,154,0.8)] animate-[scan_2s_infinite_linear] z-10" />

            <div className="w-full h-full bg-[#EAEEF3] opacity-50 flex items-center justify-center rounded-[24px]">
              <svg className="w-32 h-32 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-black mb-3 text-[var(--text-primary)]">Scan QR Code</h2>
          <p className="text-sm text-[var(--text-secondary)] text-center px-12 mb-12 font-bold uppercase tracking-wider opacity-80">
            Visit <span className="text-[#12C784] underline">hunt.chat</span> on your computer
          </p>

          <button
            onClick={() => setIsLinking(false)}
            className="px-10 py-4 bg-[var(--text-primary)] text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all text-sm uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LinkedDevicesScreen;
