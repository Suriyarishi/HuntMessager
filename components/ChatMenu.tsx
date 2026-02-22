import React, { useEffect, useRef } from 'react';

interface ChatMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onViewProfile: () => void;
    onSearch: () => void;
    onMuteSettings: () => void;
    isMuted: boolean;
    onClearChat: () => void;
    onBlockUser: () => void;
    onReportUser: () => void;
}

const ChatMenu: React.FC<ChatMenuProps> = ({
    isOpen,
    onClose,
    onViewProfile,
    onSearch,
    onMuteSettings,
    isMuted,
    onClearChat,
    onBlockUser,
    onReportUser,
}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const menuItems = [
        {
            label: 'View Profile',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            action: onViewProfile,
        },
        {
            label: 'Search in Chat',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            action: onSearch,
        },
        {
            label: isMuted ? 'Mute Settings' : 'Mute Notifications',
            icon: isMuted ? (
                <svg className="w-5 h-5 text-[#12C784]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            ),
            action: onMuteSettings,
            isToggle: true,
        },
        {
            label: 'Clear Chat',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
            action: onClearChat,
        },
    ];

    const dangerItems = [
        {
            label: 'Block User',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
            ),
            action: onBlockUser,
        },
        {
            label: 'Report User',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2h-2m2-4h.01M17 16h6m-6-4h6m-6 4v6m6-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> {/* Replaced with generic flag/warning icon path for simplicity or ensure check against a library if using one. Using a generic flag path here. */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            action: onReportUser,
        },
    ];

    return (
        <div
            ref={menuRef}
            className="absolute top-12 right-0 w-64 bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-2 z-50 animate-slide-down-fade origin-top-right border border-gray-100/50"
            style={{ animationDuration: '200ms' }}
        >
            <div className="py-1">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            item.action();
                            onClose(); // Optional: close menu on action
                        }}
                        className="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors group"
                    >
                        <div className={`text-gray-500 group-hover:text-[#12C784] transition-colors ${item.isToggle && isMuted ? 'text-[#12C784]' : ''}`}>
                            {item.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {item.label}
                        </span>
                        {item.isToggle && isMuted && (
                            <div className="ml-auto w-2 h-2 rounded-full bg-[#2FED9A] shadow-[0_0_8px_#2FED9A]" />
                        )}
                    </button>
                ))}
            </div>

            <div className="h-px bg-gray-100 mx-4 my-1" />

            <div className="py-1">
                {dangerItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            item.action();
                            onClose();
                        }}
                        className="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-red-50/50 transition-colors group"
                    >
                        <div className="text-[#FF6B6B] group-hover:scale-110 transition-transform duration-200">
                            {item.icon}
                        </div>
                        <span className="text-sm font-medium text-[#FF6B6B]">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatMenu;
