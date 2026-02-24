
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface EditProfileScreenProps {
  user: UserProfile | null;
  onBack: () => void;
  onSave: (profile: UserProfile) => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user, onBack, onSave }) => {
  const [name, setName] = useState(user?.name || '');
  const [about, setAbout] = useState(user?.about || '');
  const [photo, setPhoto] = useState<string | null>(user?.photo || null);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const charLimit = 150;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    setError('');

    // Simulate network saving
    setTimeout(() => {
      onSave({
        name,
        photo: photo || undefined,
        phoneNumber: user?.phoneNumber || '',
        about: about.trim() || undefined
      });
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-pastel)] overflow-hidden relative">
      <header className="p-6 pb-2 flex items-center gap-4 sticky top-0 bg-[var(--bg-pastel)]/80 backdrop-blur-xl z-20">
        <button onClick={onBack} className="w-10 h-10 icon-container text-[var(--text-primary)] active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-[var(--text-primary)]">Edit Profile</h1>
      </header>

      <div className="p-8 flex-1 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col items-center mb-12">
          <label className="relative group cursor-pointer lg:hover:scale-105 active:scale-95 transition-transform duration-300">
            <div className="w-40 h-40 rounded-[48px] neumorphic-elevated flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
              {photo ? (
                <img src={photo} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#EAEEF3] flex items-center justify-center">
                  <svg className="w-16 h-16 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#2FED9A] to-[#12C784] rounded-2xl p-3 border-4 border-[var(--bg-pastel)] shadow-xl shadow-[#2FED9A]/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </label>
          <p className="mt-8 text-[10px] font-black text-[#12C784] uppercase tracking-[0.2em] opacity-80">Tap to change photo</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4">Full Name</label>
            <div className={`input-field-neumorphic w-full ${error ? 'input-field-error' : ''}`}>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className="w-full bg-transparent outline-none text-xl font-medium text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-4">
              <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">About</label>
              <span className={`text-[9px] font-black tracking-widest ${about.length >= charLimit ? 'text-[var(--error-soft)]' : 'text-[var(--text-secondary)]'}`}>
                {about.length}/{charLimit}
              </span>
            </div>
            <div className="relative group">
              <textarea
                placeholder="Write something about yourself..."
                value={about}
                maxLength={charLimit}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full h-32 bg-[var(--bg-pastel)] neumorphic-inset rounded-[18px] p-5 outline-none text-base font-medium text-[var(--text-primary)] placeholder-[var(--text-secondary)] resize-none transition-all focus:ring-4 focus:ring-[#2FED9A]/10"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] px-4">Phone Number</label>
            <input
              type="text"
              value={user?.phoneNumber || ''}
              disabled
              className="w-full input-field-neumorphic opacity-70 cursor-not-allowed text-xl font-medium text-[var(--text-primary)]"
            />
            <p className="text-[10px] text-[var(--text-secondary)] px-4 font-bold italic opacity-60">Phone number cannot be changed for security.</p>
          </div>

          {error && <p className="text-[var(--error-soft)] text-xs font-black uppercase tracking-widest text-center opacity-80">{error}</p>}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full pill-button pill-button-primary py-5 text-lg shadow-xl shadow-[#2FED9A]/20 mt-6 relative overflow-hidden transition-all ${isSaving ? 'opacity-80' : ''}`}
          >
            {isSaving ? (
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving...</span>
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>

      {/* Success Toast */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#1F2937] text-white rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-500 z-50 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="w-6 h-6 rounded-full bg-[#12C784] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-xs font-black uppercase tracking-widest">Profile Saved</span>
      </div>
    </div>
  );
};

export default EditProfileScreen;
