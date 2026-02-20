
export enum Screen {
  Splash = 'splash',
  Onboarding = 'onboarding',
  PhoneNumber = 'phone-number',
  OTP = 'otp',
  ProfileSetup = 'profile-setup',
  ChatList = 'chat-list',
  Search = 'search',
  Chat = 'chat',
  Settings = 'settings',
  AITools = 'ai-tools',
  EditProfile = 'edit-profile',
  Privacy = 'privacy',
  BiometricsSetup = 'biometrics-setup',
  Notifications = 'notifications',
  LinkedDevices = 'linked-devices',
  AudioCall = 'audio-call',
  VideoCall = 'video-call',
  MediaPreview = 'media-preview',
  LocationPicker = 'location-picker',
  DocumentPreview = 'document-preview',
  UserDetails = 'user-details'
}

export interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  online?: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other' | 'ai';
  timestamp: string;
  status?: 'sent' | 'seen' | 'uploading' | 'processing' | 'failed';
  progress?: number;
  error?: string;
  image?: string;
  isThinking?: boolean;
}

export interface UserProfile {
  name: string;
  photo?: string;
  phoneNumber: string;
  about?: string;
}

export interface CallLog {
  id: string;
  name: string;
  avatar: string;
  type: 'audio' | 'video';
  status: 'incoming' | 'outgoing' | 'missed';
  time: string;
}
