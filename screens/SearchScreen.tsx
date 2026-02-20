
import React, { useState } from 'react';
import { ChatPreview } from '../types';

interface SearchScreenProps {
  onBack: () => void;
  onChatSelect: (chat: ChatPreview) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onChatSelect }) => {
  const [query, setQuery] = useState('');

  const results: ChatPreview[] = [
    { id: '4', name: 'John Doe', avatar: 'https://picsum.photos/seed/john/200', lastMessage: 'Available', time: '', unreadCount: 0 },
    { id: '5', name: 'Alice Smith', avatar: 'https://picsum.photos/seed/alice/200', lastMessage: 'Hey there!', time: '', unreadCount: 0 }
  ].filter(u => u.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-[#F4F7FA]">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onBack} className="w-10 h-10 icon-container text-[#1F2937] active:scale-95 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 input-field-neumorphic flex items-center gap-3 !py-3">
            <svg className="w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search name or number"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm font-medium text-[#1F2937] placeholder-[#9CA3AF]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-[0.2em] px-4">Contacts</p>
          {results.length > 0 ? (
            results.map(user => (
              <button
                key={user.id}
                onClick={() => onChatSelect(user)}
                className="w-full flex items-center gap-4 p-4 neumorphic-elevated active:scale-[0.98] transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-md">
                  <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-[#1F2937]">{user.name}</h3>
                  <p className="text-xs text-[#6B7280] font-medium mt-0.5">{user.lastMessage}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-20 opacity-30">
              <p className="text-sm font-bold text-[#1F2937]">No results found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
