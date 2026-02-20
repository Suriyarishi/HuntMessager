
import React, { useState } from 'react';
import { ChatPreview, CallLog } from '../types';

interface ChatListScreenProps {
  chats: ChatPreview[];
  callLogs: CallLog[];
  onChatSelect: (chat: ChatPreview) => void;
  onSettings: () => void;
  onSearch: () => void;
  onAITools: () => void;
  onCallBack: (log: CallLog) => void;
}

const ChatListScreen: React.FC<ChatListScreenProps> = ({
  chats,
  callLogs,
  onChatSelect,
  onSettings,
  onSearch,
  onAITools,
  onCallBack
}) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'calls'>('chats');
  const [callFilter, setCallFilter] = useState<'all' | 'missed' | 'video' | 'audio'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getStatusColor = (status: CallLog['status']) => {
    switch (status) {
      case 'missed': return 'text-[#FF6B6B]';
      case 'outgoing': return 'text-[#12C784] opacity-80';
      default: return 'text-[#6B7280]';
    }
  };

  const getStatusBg = (status: CallLog['status']) => {
    switch (status) {
      case 'missed': return 'bg-[#FFF5F5]';
      case 'outgoing': return 'bg-[#F0FFF4]';
      default: return 'bg-[#F8FAFC]';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F7FA]">
      <header className="p-6 pb-4 flex items-center justify-between sticky top-0 bg-[#F4F7FA]/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 icon-container bg-gradient-to-br from-[#2FED9A] to-[#12C784]">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1F2937]">Hunt</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onAITools} className="w-11 h-11 icon-container active:scale-95 transition-transform">
            <svg className="w-6 h-6 text-[#12C784]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
          <button onClick={onSettings} className="w-11 h-11 rounded-full neumorphic-elevated overflow-hidden border-2 border-white active:scale-95 transition-transform">
            <img src="https://picsum.photos/seed/user/200" alt="Me" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Search Bar Section */}
      <div className="px-6 mb-6">
        <div className={`relative flex items-center h-14 bg-[#F8FAFC] neumorphic-inset rounded-3xl px-5 transition-all duration-300 ${isSearchFocused ? 'ring-4 ring-[#2FED9A]/10 scale-[1.01]' : ''}`}>
          <svg className={`w-5 h-5 transition-colors duration-300 ${isSearchFocused ? 'text-[#12C784]' : 'text-[#94A3B8]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search chats or messages..."
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none px-4 text-sm font-bold text-[#1F2937] placeholder-[#94A3B8]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="w-8 h-8 rounded-full bg-[#E2E8F0]/50 flex items-center justify-center text-[#64748B] hover:bg-[#E2E8F0] active:scale-90 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Segmented Control */}
      <div className="px-6 mb-2">
        <div className="p-1.5 bg-[#E2E8F0]/30 neumorphic-inset rounded-2xl flex relative h-14 overflow-hidden">
          {/* Slider */}
          <div
            className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-[#2FED9A] to-[#12C784] rounded-xl shadow-lg transition-transform duration-300 ease-out z-0"
            style={{ transform: activeTab === 'calls' ? 'translateX(100%)' : 'translateX(0)' }}
          />
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex-1 relative z-10 text-xs font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === 'chats' ? 'text-white' : 'text-[#64748B]'}`}
          >
            Chats
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`flex-1 relative z-10 text-xs font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === 'calls' ? 'text-white' : 'text-[#64748B]'}`}
          >
            Calls
          </button>
        </div>
      </div>

      {/* Filter Pills - Only show for Calls tab */}
      {activeTab === 'calls' && (
        <div className="px-6 mb-4 flex gap-2 overflow-x-auto hide-scrollbar py-1">
          {['all', 'missed', 'video', 'audio'].map((filter) => (
            <button
              key={filter}
              onClick={() => setCallFilter(filter as any)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all active:scale-95 ${callFilter === filter
                ? 'bg-gradient-to-r from-[#2FED9A] to-[#12C784] text-white shadow-md shadow-[#2FED9A]/20'
                : 'bg-white text-[#64748B] neumorphic-elevated'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 pb-24 hide-scrollbar">
        {activeTab === 'chats' ? (
          (() => {
            const filteredChats = chats.filter(chat =>
              chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredChats.length === 0) {
              return (
                <div className="h-full flex flex-col items-center justify-center -mt-10">
                  <div className="w-24 h-24 rounded-[32px] bg-[#E2E8F0]/30 flex items-center justify-center mb-6 neumorphic-elevated opacity-60">
                    <svg className="w-10 h-10 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-[#1F2937]">No conversations found</p>
                  <p className="text-sm text-[#94A3B8] font-medium mt-1">Try searching by name or message text</p>
                </div>
              );
            }

            return (
              <div className="space-y-4">
                {filteredChats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => onChatSelect(chat)}
                    className="w-full flex items-center gap-4 p-4 neumorphic-elevated group active:scale-[0.98] transition-all"
                  >
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                        <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                      </div>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2FED9A] border-4 border-[#F4F7FA] rounded-full shadow-sm" />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-extrabold text-[#1F2937] truncate">{chat.name}</h3>
                        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{chat.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-[#6B7280] font-medium line-clamp-1 flex-1 pr-2">{chat.lastMessage}</p>
                        {chat.unreadCount > 0 && (
                          <span className="shrink-0 bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-[#2FED9A]/20">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            );
          })()
        ) : (
          /* Call History Tab */
          (() => {
            const filteredCalls = callLogs.filter(log => {
              const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesFilter =
                callFilter === 'all' ||
                (callFilter === 'missed' && log.status === 'missed') ||
                (callFilter === 'video' && log.type === 'video') ||
                (callFilter === 'audio' && log.type === 'audio');
              return matchesSearch && matchesFilter;
            });

            if (filteredCalls.length === 0) {
              return (
                <div className="h-full flex flex-col items-center justify-center -mt-10">
                  <div className="w-24 h-24 rounded-[32px] bg-[#E2E8F0]/30 flex items-center justify-center mb-6 neumorphic-elevated opacity-60">
                    <svg className="w-10 h-10 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-[#1F2937]">No calls found</p>
                  <p className="text-sm text-[#94A3B8] font-medium mt-1">Try searching by name or number</p>
                </div>
              );
            }

            return (
              <div className="space-y-4">
                {filteredCalls.map(log => (
                  <div
                    key={log.id}
                    className="w-full flex items-center gap-4 p-4 neumorphic-elevated group bg-white"
                  >
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md neumorphic-elevated">
                        <img src={log.avatar} alt={log.name} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-extrabold text-[#1F2937] truncate">{log.name}</h3>
                        {log.type === 'video' ? (
                          <svg className="w-3 h-3 text-[#12C784]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-[#12C784]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.87 4.87l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusBg(log.status)} ${getStatusColor(log.status)}`}>
                          {log.status}
                        </div>
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{log.time}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onCallBack(log)}
                      className="w-10 h-10 bg-gradient-to-br from-[#2FED9A] to-[#12C784] rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            );
          })()
        )}
      </div>

      <button
        onClick={onSearch}
        className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#2FED9A] to-[#12C784] rounded-[24px] flex items-center justify-center shadow-2xl shadow-[#2FED9A]/30 hover:scale-105 active:scale-95 transition-all z-30"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default ChatListScreen;
