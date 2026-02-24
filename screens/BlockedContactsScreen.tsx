import React, { useState } from 'react';
import { ChatPreview } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';

interface BlockedContactsScreenProps {
    blockedIds: string[];
    contacts: ChatPreview[];
    onUnblock: (id: string) => void;
    onAdd: () => void;
    onBack: () => void;
}

const BlockedContactsScreen: React.FC<BlockedContactsScreenProps> = ({
    blockedIds, contacts, onUnblock, onAdd, onBack
}) => {
    const [selectedContact, setSelectedContact] = useState<ChatPreview | null>(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);

    const blockedContacts = contacts.filter(c => blockedIds.includes(c.id));

    const handleContactTap = (contact: ChatPreview) => {
        setSelectedContact(contact);
        setIsBottomSheetOpen(true);
    };

    const handleUnblockRequest = () => {
        setIsBottomSheetOpen(false);
        setIsUnblockModalOpen(true);
    };

    const handleConfirmUnblock = () => {
        if (selectedContact) {
            onUnblock(selectedContact.id);
        }
        setIsUnblockModalOpen(false);
        setSelectedContact(null);
    };

    return (
        <div className="flex flex-col h-full bg-[var(--bg-pastel)] overflow-hidden relative">
            <header className="p-6 pb-2 flex items-center justify-between sticky top-0 bg-[var(--bg-pastel)]/80 backdrop-blur-xl z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="w-10 h-10 icon-container text-[var(--text-primary)] active:scale-95 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-black text-[var(--text-primary)]">Blocked Contacts</h1>
                </div>
                <button
                    onClick={onAdd}
                    className="w-10 h-10 icon-container bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white shadow-lg active:scale-95 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </header>

            <div className="p-6 flex-1 overflow-y-auto hide-scrollbar pb-20">
                <p className="text-[11px] font-bold text-[var(--text-secondary)] leading-relaxed mb-8 px-2">
                    Blocked contacts will no longer be able to call or message you.
                </p>

                {blockedContacts.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 animate-fade-in">
                        <div className="w-32 h-32 neumorphic-elevated rounded-[40px] flex items-center justify-center mb-8 text-[var(--text-secondary)] opacity-40">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728A9 9 0 115.636 5.636" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-black text-[var(--text-primary)]">No Blocked Contacts</h3>
                        <p className="text-[10px] font-black text-[var(--text-secondary)] mt-2 uppercase tracking-widest opacity-60">You haven’t blocked anyone yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {blockedContacts.map(contact => (
                            <button
                                key={contact.id}
                                onClick={() => handleContactTap(contact)}
                                className="w-full flex items-center gap-4 p-4 neumorphic-elevated group active:scale-[0.98] transition-all"
                            >
                                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md">
                                    <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col items-start px-2">
                                    <span className="font-extrabold text-sm text-[var(--text-primary)]">{contact.name}</span>
                                    <span className="text-[10px] text-[var(--text-secondary)] font-bold tracking-tight opacity-70 uppercase">+1 555-0123</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Sheet for Contacts */}
            {isBottomSheetOpen && selectedContact && (
                <div className="absolute inset-0 z-40">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsBottomSheetOpen(false)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 animate-slide-up">
                        <div className="bg-[var(--surface-white)] rounded-[40px] shadow-2xl overflow-hidden p-6 pb-12">
                            <div className="w-12 h-1.5 bg-[var(--divider)] rounded-full mx-auto mb-8" />
                            <div className="flex flex-col items-center mb-10">
                                <div className="w-20 h-20 rounded-[32px] overflow-hidden mb-4 shadow-xl">
                                    <img src={selectedContact.avatar} alt={selectedContact.name} className="w-full h-full object-cover" />
                                </div>
                                <h2 className="text-xl font-black text-[var(--text-primary)]">{selectedContact.name}</h2>
                            </div>
                            <button
                                onClick={handleUnblockRequest}
                                className="w-full p-5 neumorphic-elevated !bg-gradient-to-br !from-[#2FED9A] !to-[#12C784] text-white font-black rounded-[24px] shadow-lg active:scale-95 transition-all text-sm uppercase tracking-widest"
                            >
                                Unblock
                            </button>
                            <button
                                onClick={() => setIsBottomSheetOpen(false)}
                                className="w-full p-5 mt-4 text-[var(--text-secondary)] font-black uppercase tracking-widest text-xs"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Unblock Confirmation Dialog */}
            <ConfirmationModal
                isOpen={isUnblockModalOpen}
                onClose={() => setIsUnblockModalOpen(false)}
                onConfirm={handleConfirmUnblock}
                title="Unblock Contact?"
                message={`${selectedContact?.name} will be able to message and call you again.`}
                confirmLabel="Unblock"
                isDanger={false}
            />
        </div>
    );
};

export default BlockedContactsScreen;
