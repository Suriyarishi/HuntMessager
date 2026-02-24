import React, { useState } from 'react';
import { ChatPreview } from '../types';

interface ContactSelectorScreenProps {
    contacts: ChatPreview[];
    onBack: () => void;
    onSelect: (ids: string[]) => void;
    title?: string;
    multiSelect?: boolean;
    initialSelection?: string[];
}

const ContactSelectorScreen: React.FC<ContactSelectorScreenProps> = ({
    contacts, onBack, onSelect, title = "Select Contacts", multiSelect = true, initialSelection = []
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(initialSelection);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleContact = (id: string) => {
        if (multiSelect) {
            setSelectedIds(prev =>
                prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            );
        } else {
            onSelect([id]);
        }
    };

    const handleDone = () => {
        onSelect(selectedIds);
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
                    <h1 className="text-xl font-black text-[var(--text-primary)]">{title}</h1>
                </div>
                {multiSelect && (
                    <button
                        onClick={handleDone}
                        className="px-6 py-2 bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white font-black rounded-full shadow-lg active:scale-95 transition-all text-xs uppercase tracking-widest"
                    >
                        Done
                    </button>
                )}
            </header>

            <div className="px-6 py-4">
                <div className="input-field-neumorphic flex items-center gap-3 !py-3">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-[var(--text-primary)]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto hide-scrollbar pb-24">
                <div className="space-y-3">
                    {filteredContacts.map(contact => (
                        <button
                            key={contact.id}
                            onClick={() => toggleContact(contact.id)}
                            className={`w-full flex items-center gap-4 p-4 neumorphic-elevated transition-all ${selectedIds.includes(contact.id) ? 'bg-[var(--primary-mint)]/5 border-2 border-[var(--primary-mint)]/20 shadow-inner scale-[0.98]' : ''}`}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md border-2 border-[var(--surface-white)]">
                                    <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                                </div>
                                {selectedIds.includes(contact.id) && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#12C784] rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg animate-checkbox-pop">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-start px-2">
                                <span className={`font-extrabold text-sm ${selectedIds.includes(contact.id) ? 'text-[var(--primary-mint-dark)]' : 'text-[var(--text-primary)]'}`}>{contact.name}</span>
                                <span className="text-[10px] text-[var(--text-secondary)] font-bold tracking-tight opacity-70 uppercase">+1 555-0123</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactSelectorScreen;
