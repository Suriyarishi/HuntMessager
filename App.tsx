import React, { useState, useEffect, useRef } from 'react';
import { Screen, UserProfile, ChatPreview, Message, CallLog, SecuritySettings } from './types';
import UserDetailsScreen from './screens/UserDetailsScreen';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import PhoneNumberScreen from './screens/PhoneNumberScreen';
import OTPScreen from './screens/OTPScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import AIToolsScreen from './screens/AIToolsScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import BiometricsSetupScreen from './screens/BiometricsSetupScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import LinkedDevicesScreen from './screens/LinkedDevicesScreen';
import AudioCallScreen from './screens/AudioCallScreen';
import VideoCallScreen from './screens/VideoCallScreen';
import MediaPreviewScreen from './screens/MediaPreviewScreen';
import LocationPickerScreen from './screens/LocationPickerScreen';
import DocumentPreviewScreen from './screens/DocumentPreviewScreen';
import FingerprintLockScreen from './screens/FingerprintLockScreen';
import FaceIDLockScreen from './screens/FaceIDLockScreen';

// Mock Gemini AI service
const gemini = {
  getFastResponse: async (query: string): Promise<string> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`AI response to "${query}"`);
      }, 1500);
    });
  }
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Splash);
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Sarah Connor',
    photo: 'https://picsum.photos/seed/sarah/200',
    phoneNumber: '+1 555-0123',
    about: 'The future is not set. There is no fate but what we make for ourselves.'
  });
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    isBiometricEnabled: false,
    preferredBiometric: 'fingerprint',
    timeout: 'immediate'
  });
  const [isLocked, setIsLocked] = useState(false);
  const lastActiveRef = useRef<number>(Date.now());
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{ uri: string, type: 'image' | 'video' } | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<{ name: string; size: string; type: string } | null>(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [callLogs, setCallLogs] = useState<CallLog[]>([
    { id: '1', name: 'James Bond', avatar: 'https://picsum.photos/seed/james/200', type: 'audio', status: 'outgoing', time: '10:30 AM' },
    { id: '2', name: 'Sarah Connor', avatar: 'https://picsum.photos/seed/sarah/200', type: 'video', status: 'missed', time: 'Yesterday' },
    { id: '3', name: 'Unknown Number', avatar: 'https://picsum.photos/seed/unknown/200', type: 'audio', status: 'incoming', time: 'Monday' }
  ]);
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>({
    '1': [
      { id: '1', text: 'Hey! Are you coming to the event tomorrow?', sender: 'other', timestamp: '12:45 PM', status: 'seen' },
      { id: '2', text: 'Yes, looking forward to it!', sender: 'me', timestamp: '12:46 PM', status: 'seen' }
    ],
    '2': [
      { id: '3', text: 'The name is Bond, James Bond.', sender: 'other', timestamp: '11:15 AM', status: 'seen' },
      { id: '4', text: 'Shaken, not stirred.', sender: 'me', timestamp: '11:20 AM', status: 'seen' }
    ],
    '3': [
      { id: '5', text: 'Hello! How can I assist you today?', sender: 'ai', timestamp: 'Yesterday', status: 'seen' }
    ]
  });

  const [chats, setChats] = useState<ChatPreview[]>([
    {
      id: '1',
      name: 'Sarah Connor',
      avatar: 'https://picsum.photos/seed/sarah/200',
      lastMessage: 'The future is not set.',
      time: '12:45 PM',
      unreadCount: 2,
      online: true
    },
    {
      id: '2',
      name: 'James Bond',
      avatar: 'https://picsum.photos/seed/james/200',
      lastMessage: 'Shaken, not stirred.',
      time: '11:20 AM',
      unreadCount: 0,
      online: false
    },
    {
      id: '3',
      name: 'Gemini AI',
      avatar: 'https://picsum.photos/seed/gemini/200',
      lastMessage: 'How can I help you today?',
      time: 'Yesterday',
      unreadCount: 0,
      online: true
    }
  ]);

  useEffect(() => {
    // Check if we should lock on launch
    if (securitySettings.isBiometricEnabled) {
      setIsLocked(true);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lastActiveRef.current = Date.now();
      } else {
        if (securitySettings.isBiometricEnabled) {
          const now = Date.now();
          const inactiveTime = now - lastActiveRef.current;
          let timeoutMs = 0;
          if (securitySettings.timeout === '1min') timeoutMs = 60000;
          if (securitySettings.timeout === '5min') timeoutMs = 300000;

          if (inactiveTime >= timeoutMs) {
            setIsLocked(true);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [securitySettings]);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const addMessage = (chatId: string, message: Message) => {
    setChatMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message]
    }));
  };

  const updateMessage = (chatId: string, messageId: string, updates: Partial<Message>) => {
    setChatMessages(prev => ({
      ...prev,
      [chatId]: (prev[chatId] || []).map(m => m.id === messageId ? { ...m, ...updates } : m)
    }));
  };

  const handlePhoneSubmit = (phone: string) => {
    navigate(Screen.OTP);
  };

  const handleOTPSuccess = (isNewUser: boolean) => {
    if (isNewUser) {
      navigate(Screen.ProfileSetup);
    } else {
      navigate(Screen.ChatList);
    }
  };

  const handleProfileSave = (profile: UserProfile) => {
    setUser(profile);
    navigate(Screen.ChatList);
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setUser(profile);
    navigate(Screen.Settings);
  };

  const openChat = (chat: ChatPreview) => {
    setSelectedChat(chat);
    navigate(Screen.Chat);
  };

  const startCall = (chat: ChatPreview) => {
    setSelectedChat(chat);
    navigate(Screen.AudioCall);
  };

  const startVideoCall = (chat: ChatPreview) => {
    setSelectedChat(chat);
    navigate(Screen.VideoCall);
  };

  const handleMediaSelect = (uri: string, type: 'image' | 'video') => {
    setSelectedMedia({ uri, type });
    navigate(Screen.MediaPreview);
  };

  const startLocationPicker = () => {
    navigate(Screen.LocationPicker);
  };

  const handleDocumentSelect = (doc: { name: string; size: string; type: string }) => {
    setSelectedDocument(doc);
    navigate(Screen.DocumentPreview);
  };

  const handleSendTextMessage = async (text: string) => {
    if (!selectedChat) return;
    const chatId = selectedChat.id;
    const msgId = Date.now().toString();

    addMessage(chatId, {
      id: msgId,
      text,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    });

    if (text.startsWith('/ai') || chatId === '3') {
      setIsAILoading(true);
      const query = text.replace('/ai', '').trim();
      try {
        let aiText = await gemini.getFastResponse(query);
        addMessage(chatId, {
          id: (Date.now() + 1).toString(),
          text: aiText,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      } catch (err) { console.error(err); }
      finally { setIsAILoading(false); }
    }
  };

  const simulateUpload = (chatId: string, msgId: string, text: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;

      // Randomly fail at ~70% progress for testing
      if (progress > 70 && Math.random() < 0.1) {
        clearInterval(interval);
        updateMessage(chatId, msgId, { status: 'failed', error: 'Connection lost' });
        return;
      }

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        updateMessage(chatId, msgId, { progress, status: 'processing' });

        setTimeout(() => {
          updateMessage(chatId, msgId, { status: 'sent' });
        }, 1500);
      } else {
        updateMessage(chatId, msgId, { progress });
      }
    }, 400);
  };

  const handleSendMedia = (caption: string) => {
    if (!selectedChat || !selectedMedia) return;
    const chatId = selectedChat.id;
    const msgId = 'media-' + Date.now();

    addMessage(chatId, {
      id: msgId,
      text: caption || `Shared a ${selectedMedia.type}`,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'uploading',
      progress: 0
    });

    navigate(Screen.Chat);
    simulateUpload(chatId, msgId, caption);
  };

  const handleSendDocument = (caption: string) => {
    if (!selectedChat || !selectedDocument) return;
    const chatId = selectedChat.id;
    const msgId = 'doc-' + Date.now();

    addMessage(chatId, {
      id: msgId,
      text: caption || `Shared ${selectedDocument.name}`,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'uploading',
      progress: 0
    });

    navigate(Screen.Chat);
    simulateUpload(chatId, msgId, caption);
  };

  const handleResendMessage = (id: string) => {
    if (!selectedChat) return;
    updateMessage(selectedChat.id, id, { status: 'uploading', progress: 0, error: undefined });
    simulateUpload(selectedChat.id, id, '');
  };

  const handleCallBack = (log: CallLog) => {
    setSelectedChat({
      id: log.id,
      name: log.name,
      avatar: log.avatar,
      lastMessage: '',
      time: log.time,
      unreadCount: 0
    });
    navigate(log.type === 'video' ? Screen.VideoCall : Screen.AudioCall);
  };

  const handleSendLocation = (location: any) => {
    if (!selectedChat) return;
    addMessage(selectedChat.id, {
      id: Date.now().toString(),
      text: `Location: ${location.name}\n${location.address}`,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    });
    navigate(Screen.Chat);
  };

  const handleUpdateMuteStatus = (chatId: string, isMuted: boolean, duration?: string) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, isMuted } : chat
    ));

    // Update selected chat if it's the one being muted
    if (selectedChat?.id === chatId) {
      setSelectedChat({ ...selectedChat, isMuted });
    }

    const message = isMuted
      ? `Notifications muted for ${duration || 'specified time'}.`
      : 'Notifications unmuted.';

    setToast({ message, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const handleReportUser = (chatId: string, reason: string, details: string) => {
    // API call to report user would go here
    console.log(`User reported in chat ${chatId}. Reason: ${reason}, Details: ${details}`);

    setToast({
      message: 'Report submitted. Thank you for helping keep Hunt safe.',
      visible: true
    });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  const handleDeleteChats = (ids: string[]) => {
    setChats(prev => prev.filter(chat => !ids.includes(chat.id)));
    // Also clear associated messages for cleanup
    setChatMessages(prev => {
      const newMessages = { ...prev };
      ids.forEach(id => delete newMessages[id]);
      return newMessages;
    });
  };

  return (
    <div className="relative h-screen w-full max-w-[430px] mx-auto bg-[#F4F7FA] overflow-hidden shadow-2xl flex flex-col border-x border-white/20">
      <div className="flex-1 relative overflow-hidden">
        {currentScreen === Screen.Splash && (
          <SplashScreen onComplete={() => navigate(Screen.Onboarding)} />
        )}

        {currentScreen === Screen.Onboarding && (
          <OnboardingScreen onComplete={() => navigate(Screen.PhoneNumber)} />
        )}

        {currentScreen === Screen.PhoneNumber && (
          <PhoneNumberScreen onSubmit={handlePhoneSubmit} />
        )}

        {currentScreen === Screen.OTP && (
          <OTPScreen onSuccess={handleOTPSuccess} onBack={() => navigate(Screen.PhoneNumber)} />
        )}

        {currentScreen === Screen.ProfileSetup && (
          <ProfileSetupScreen onSave={handleProfileSave} />
        )}

        {currentScreen === Screen.ChatList && (
          <ChatListScreen
            chats={chats}
            callLogs={callLogs}
            onChatSelect={openChat}
            onSettings={() => navigate(Screen.Settings)}
            onSearch={() => navigate(Screen.Search)}
            onAITools={() => navigate(Screen.AITools)}
            onCallBack={handleCallBack}
            onDeleteChats={handleDeleteChats}
          />
        )}

        {currentScreen === Screen.Search && (
          <SearchScreen
            onBack={() => navigate(Screen.ChatList)}
            onChatSelect={openChat}
          />
        )}

        {currentScreen === Screen.Chat && selectedChat && (
          <ChatScreen
            chat={selectedChat}
            messages={chatMessages[selectedChat.id] || []}
            isAILoading={isAILoading}
            onBack={() => navigate(Screen.ChatList)}
            onStartCall={() => startCall(selectedChat)}
            onStartVideoCall={() => startVideoCall(selectedChat)}
            onMediaSelect={handleMediaSelect}
            onLocationSelect={startLocationPicker}
            onDocumentSelect={handleDocumentSelect}
            onSendTextMessage={handleSendTextMessage}
            onResendMessage={handleResendMessage}
            onShowUserDetails={() => navigate(Screen.UserDetails)}
            onUpdateMuteStatus={handleUpdateMuteStatus}
            onReportUser={handleReportUser}
          />
        )}

        {currentScreen === Screen.AudioCall && selectedChat && (
          <AudioCallScreen
            contact={selectedChat}
            onEndCall={() => navigate(Screen.Chat)}
            onUpgradeToVideo={() => startVideoCall(selectedChat)}
          />
        )}

        {currentScreen === Screen.VideoCall && selectedChat && (
          <VideoCallScreen
            contact={selectedChat}
            onEndCall={() => navigate(Screen.Chat)}
          />
        )}

        {currentScreen === Screen.MediaPreview && selectedMedia && selectedChat && (
          <MediaPreviewScreen
            media={selectedMedia}
            contact={selectedChat}
            onBack={() => navigate(Screen.Chat)}
            onSend={handleSendMedia}
          />
        )}

        {currentScreen === Screen.LocationPicker && selectedChat && (
          <LocationPickerScreen
            contact={selectedChat}
            onBack={() => navigate(Screen.Chat)}
            onSelect={handleSendLocation}
          />
        )}

        {currentScreen === Screen.UserDetails && selectedChat && (
          <UserDetailsScreen
            contact={selectedChat}
            onBack={() => navigate(Screen.Chat)}
            onMessage={() => navigate(Screen.Chat)}
            onAudioCall={() => startCall(selectedChat)}
            onVideoCall={() => startVideoCall(selectedChat)}
          />
        )}

        {currentScreen === Screen.DocumentPreview && selectedDocument && selectedChat && (
          <DocumentPreviewScreen
            document={selectedDocument}
            contact={selectedChat}
            onBack={() => navigate(Screen.Chat)}
            onSend={handleSendDocument}
          />
        )}

        {currentScreen === Screen.Settings && (
          <SettingsScreen
            user={user}
            securitySettings={securitySettings}
            onUpdateSecurity={setSecuritySettings}
            onBack={() => navigate(Screen.ChatList)}
            onEditProfile={() => navigate(Screen.EditProfile)}
            onPrivacy={() => navigate(Screen.Privacy)}
            onNotifications={() => navigate(Screen.Notifications)}
            onLinkedDevices={() => navigate(Screen.LinkedDevices)}
            onLogout={() => {
              setUser(null);
              navigate(Screen.PhoneNumber);
            }}
          />
        )}

        {currentScreen === Screen.AITools && (
          <AIToolsScreen
            onBack={() => navigate(Screen.ChatList)}
          />
        )}

        {currentScreen === Screen.EditProfile && (
          <EditProfileScreen
            user={user}
            onBack={() => navigate(Screen.Settings)}
            onSave={handleProfileUpdate}
          />
        )}

        {currentScreen === Screen.Privacy && (
          <PrivacyScreen
            onBack={() => navigate(Screen.Settings)}
            onSetupBiometrics={() => navigate(Screen.BiometricsSetup)}
          />
        )}

        {currentScreen === Screen.BiometricsSetup && (
          <BiometricsSetupScreen onBack={() => navigate(Screen.Privacy)} />
        )}

        {currentScreen === Screen.Notifications && (
          <NotificationsScreen onBack={() => navigate(Screen.Settings)} />
        )}

        {currentScreen === Screen.LinkedDevices && (
          <LinkedDevicesScreen onBack={() => navigate(Screen.Settings)} />
        )}

        {isLocked && (
          <div className="absolute inset-0 z-[100]">
            {securitySettings.preferredBiometric === 'fingerprint' ? (
              <FingerprintLockScreen
                onSuccess={() => setIsLocked(false)}
                onUsePasscode={() => {
                  alert('Passcode feature coming soon!');
                }}
              />
            ) : (
              <FaceIDLockScreen
                onSuccess={() => setIsLocked(false)}
                onUsePasscode={() => {
                  alert('Passcode feature coming soon!');
                }}
              />
            )}
          </div>
        )}
      </div>

      <div className="h-1.5 w-32 bg-slate-900/10 rounded-full mx-auto mb-2 mt-auto" />

      {/* Toast Notification */}
      {toast.visible && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[200] animate-slide-down-fade">
          <div className="bg-[#1F2937] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-xl">
            <div className="w-6 h-6 rounded-full bg-[#2FED9A] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
