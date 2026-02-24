
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileSetupScreenProps {
  onSave: (profile: UserProfile) => void;
}

const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState('');

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
      setError('Please enter your name');
      return;
    }
    onSave({ name, photo: photo || undefined, phoneNumber: '' });
  };

  return (
    <div className="flex flex-col h-full p-8 pt-20 bg-[var(--bg-pastel)]">
      <h2 className="text-3xl font-extrabold mb-2 text-[var(--text-primary)]">Profile Info</h2>
      <p className="text-[var(--text-secondary)] mb-12 font-medium">Please provide your name and an optional profile photo.</p>

      <div className="flex flex-col items-center mb-10">
        <label className="relative group cursor-pointer">
          <div className="w-32 h-32 rounded-full neumorphic-elevated overflow-hidden flex items-center justify-center border-4 border-[var(--surface-white)] transition-transform active:scale-95">
            {photo ? (
              <img src={photo} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#EAEEF3] flex items-center justify-center">
                <svg className="w-12 h-12 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            )}
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
          <div className="absolute bottom-1 right-1 bg-gradient-to-br from-[#2FED9A] to-[#12C784] rounded-full p-2.5 border-4 border-[#F4F7FA] shadow-lg">
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </label>
      </div>

      <div className="space-y-8">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className={`w-full input-field-neumorphic text-xl font-medium text-[var(--text-primary)] ${error ? 'input-field-error' : ''}`}
          />
        </div>

        {error && <p className="text-[var(--error-soft)] text-xs font-black uppercase tracking-widest text-center opacity-80">{error}</p>}

        <button
          onClick={handleSave}
          className="w-full pill-button pill-button-primary py-5 text-lg shadow-xl"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
};

export default ProfileSetupScreen;
