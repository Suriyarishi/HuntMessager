
import React, { useState } from 'react';

interface PhoneNumberScreenProps {
  onSubmit: (phone: string) => void;
}

const PhoneNumberScreen: React.FC<PhoneNumberScreenProps> = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 7) {
      onSubmit(`${countryCode}${phoneNumber}`);
    }
  };

  return (
    <div className="flex flex-col h-full p-8 pt-20 bg-[#F4F7FA]">
      <h2 className="text-3xl font-extrabold mb-2 text-[#1F2937]">Your Number</h2>
      <p className="text-[#6B7280] mb-10 font-medium">Please confirm your country code and enter your phone number.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex gap-4">
          <div className="w-24">
            <input
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full input-field-neumorphic text-xl font-medium text-[#1F2937] text-center"
            />
          </div>
          <div className="flex-1">
            <input
              type="tel"
              placeholder="000 000 0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              className="w-full input-field-neumorphic text-xl font-medium tracking-wider text-[#1F2937]"
              autoFocus
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={phoneNumber.length < 7}
          className="w-full pill-button pill-button-primary py-5 text-lg shadow-xl disabled:opacity-50"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PhoneNumberScreen;
