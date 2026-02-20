
import React, { useState, useEffect, useRef } from 'react';
import { ChatPreview, Message } from '../types';
import * as gemini from '../geminiService';

interface ChatScreenProps {
  chat: ChatPreview;
  messages: Message[];
  onBack: () => void;
  onStartCall: () => void;
  onStartVideoCall: () => void;
  onMediaSelect: (uri: string, type: 'image' | 'video') => void;
  onLocationSelect: () => void;
  onDocumentSelect: (doc: { name: string; size: string; type: string }) => void;
  onSendTextMessage: (text: string) => void;
  onResendMessage?: (id: string) => void;
  onShowUserDetails?: () => void;
  isAILoading?: boolean;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  chat,
  messages,
  onBack,
  onStartCall,
  onStartVideoCall,
  onMediaSelect,
  onLocationSelect,
  onDocumentSelect,
  onSendTextMessage,
  onResendMessage,
  onShowUserDetails,
  isAILoading = false
}) => {
  const [inputText, setInputText] = useState('');
  const [isAttachmentPanelOpen, setIsAttachmentPanelOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendTextMessage(inputText);
    setInputText('');
  };

  const attachmentOptions = [
    {
      label: 'Gallery', icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ), tint: 'bg-[#E0F7F1]', action: () => onMediaSelect('https://picsum.photos/seed/picsum/800/1200', 'image')
    }, // soft mint
    {
      label: 'Video', icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ), tint: 'bg-[#E3F2FD]', action: () => onMediaSelect('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', 'video')
    }, // soft blue
    {
      label: 'Document', icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ), tint: 'bg-[#F3E5F5]'
    }, // soft purple
    {
      label: 'Location', icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), tint: 'bg-[#FFEBEE]', action: () => onLocationSelect()
    }, // soft red
    {
      label: 'Contact', icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ), tint: 'bg-[#E0F2F1]'
    } // soft teal
  ];

  return (
    <div className="flex flex-col h-full bg-[#F4F7FA] relative">
      <header className="px-6 py-4 flex items-center gap-4 bg-[#F4F7FA]/80 backdrop-blur-xl sticky top-0 z-20">
        <button onClick={onBack} className="w-10 h-10 icon-container -ml-2 text-[#1F2937] active:scale-95 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={onShowUserDetails} className="flex-1 flex items-center gap-3 active:opacity-70 transition-opacity text-left">
          <div className="relative">
            <div className="w-10 h-10 rounded-full neumorphic-elevated overflow-hidden border-2 border-white shadow-sm">
              <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
            </div>
            {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#2FED9A] border-4 border-[#F4F7FA] rounded-full shadow-sm" />}
          </div>
          <div>
            <h2 className="font-extrabold text-[#1F2937] leading-tight">{chat.name}</h2>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${chat.online ? 'bg-[#2FED9A]' : 'bg-[#94A3B8]'}`} />
              <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                {chat.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={onStartVideoCall} className="w-10 h-10 icon-container text-[#12C784] hover:text-[#2FED9A] transition-colors active:scale-95">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </button>
          <button onClick={onStartCall} className="w-10 h-10 icon-container text-[#12C784] hover:text-[#2FED9A] transition-colors active:scale-95">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>
          <button className="w-10 h-10 icon-container text-[#6B7280]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-8 space-y-8 hide-scrollbar"
      >
        <div className="text-center">
          <span className="text-[10px] px-3 py-1.5 neumorphic-inset rounded-full text-[#6B7280] font-black uppercase tracking-widest">Today</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-3xl ${msg.sender === 'me'
              ? 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white rounded-tr-none shadow-lg'
              : msg.sender === 'ai'
                ? 'bg-white neumorphic-elevated text-[#1F2937] border-l-4 border-[#2FED9A] rounded-tl-none font-medium'
                : 'bg-white neumorphic-elevated text-[#1F2937] rounded-tl-none font-medium'
              }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>

              {/* Upload/Processing States */}
              {(msg.status === 'uploading' || msg.status === 'processing') && (
                <div className="mt-3 bg-white/20 rounded-2xl p-3 backdrop-blur-sm border border-white/20">
                  {msg.status === 'uploading' ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span>Uploading...</span>
                        <span>{msg.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-300 ease-out animate-shimmer"
                          style={{ width: `${msg.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Sending securely...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Failed State */}
              {msg.status === 'failed' && (
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[#FF6B6B]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Failed</span>
                  </div>
                  <button
                    onClick={() => onResendMessage?.(msg.id)}
                    className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all active:scale-95"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div className={`flex items-center gap-1 mt-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${msg.sender === 'me' ? 'text-white/70' : 'text-[#94A3B8]'}`}>
                  {msg.timestamp}
                </span>
                {msg.sender === 'me' && msg.status !== 'uploading' && msg.status !== 'processing' && msg.status !== 'failed' && (
                  <svg className={`w-3 h-3 ${msg.status === 'seen' ? 'text-white' : 'text-white/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}

        {isAILoading && (
          <div className="flex items-start">
            <div className="chat-bubble-received rounded-tl-none px-6 py-4">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-[#2FED9A] rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-[#2FED9A] rounded-full animate-bounce shadow-sm" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#2FED9A] rounded-full animate-bounce shadow-sm" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pb-8 safe-area-bottom">
        <div className="flex items-end gap-3 p-1.5 input-field-neumorphic !rounded-[32px] !border-white transition-all">
          <button
            onClick={() => setIsAttachmentPanelOpen(true)}
            className="p-3 text-[#6B7280] hover:text-[#12C784] transition-colors active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          <textarea
            rows={1}
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 bg-transparent py-3.5 outline-none text-sm font-medium resize-none hide-scrollbar max-h-32 text-[#1F2937] placeholder-[#9CA3AF]"
          />

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-12 h-12 rounded-full transition-all flex items-center justify-center shadow-lg ${inputText.trim()
              ? 'pill-button-primary bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white'
              : 'neumorphic-inset text-[#94A3B8] opacity-50 scale-90'
              }`}
          >
            <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Attachment Panel Overlay */}
      {isAttachmentPanelOpen && (
        <div className="absolute inset-0 z-30">
          <div
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsAttachmentPanelOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 animate-slide-up">
            <div className="bg-white rounded-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-8">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8 cursor-pointer" onClick={() => setIsAttachmentPanelOpen(false)} />

              <div className="grid grid-cols-3 gap-y-10">
                {attachmentOptions.map((opt, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <button className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 active:scale-[0.96] shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] text-[#1F2937] hover:bg-gradient-to-br hover:from-[#2FED9A] hover:to-[#12C784] hover:text-white hover:shadow-[#2FED9A]/30 ${opt.tint}`}>
                      {opt.icon}
                    </button>
                    <span className="text-[11px] font-bold text-[#1F2937] uppercase tracking-wider">{opt.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
