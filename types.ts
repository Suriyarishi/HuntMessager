
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
  UserDetails = 'user-details',
  FingerprintLock = 'fingerprint-lock',
  FaceLock = 'face-lock',
  LastSeenPrivacy = 'last-seen-privacy',
  ProfilePhotoPrivacy = 'profile-photo-privacy',
  AboutPrivacy = 'about-privacy',
  BlockedContacts = 'blocked-contacts',
  ContactSelector = 'contact-selector'
}

export interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  online?: boolean;
  isMuted?: boolean;
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

export interface SecuritySettings {
  isBiometricEnabled: boolean;
  preferredBiometric: 'fingerprint' | 'face';
  timeout: 'immediate' | '1min' | '5min';
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppearanceSettings {
  theme: ThemeMode;
}

export type PrivacyOption = 'everyone' | 'contacts' | 'contacts_except' | 'nobody';

export interface PrivacySettings {
  lastSeen: PrivacyOption;
  online: 'everyone' | 'same_as_last_seen';
  profilePhoto: PrivacyOption;
  about: PrivacyOption;
  readReceipts: boolean;
  blockedContacts: string[]; // List of contact IDs
}
