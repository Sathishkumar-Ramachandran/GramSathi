'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const LANGUAGES = [
    { code: 'hi', name: 'हिन्दी', nameEn: 'Hindi', emoji: '🇮🇳', short: 'हिं' },
    { code: 'ta', name: 'தமிழ்', nameEn: 'Tamil', emoji: '🇮🇳', short: 'தமி' },
    { code: 'te', name: 'తెలుగు', nameEn: 'Telugu', emoji: '🇮🇳', short: 'తెలు' },
    { code: 'mr', name: 'मराठी', nameEn: 'Marathi', emoji: '🇮🇳', short: 'मरा' },
    { code: 'bn', name: 'বাংলা', nameEn: 'Bengali', emoji: '🇮🇳', short: 'বাং' },
];

export default function LanguageSwitcher({ fullWidth = false }: { fullWidth?: boolean }) {
    const { lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={
                    fullWidth
                        ? 'w-full flex items-center justify-between bg-[#F1F8E9] border border-[#C8E6C9] rounded-xl px-4 py-3'
                        : 'flex items-center gap-1 bg-[#F1F8E9] border border-[#C8E6C9] rounded-full px-3 py-1 text-sm font-medium text-[#1B5E20]'
                }
            >
                <span className="flex items-center gap-2">
                    <span>{currentLang.emoji}</span>
                    <span>{fullWidth ? currentLang.name : currentLang.short}</span>
                </span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-60 bg-black/40 flex items-end sm:items-center sm:justify-center" onClick={() => setIsOpen(false)}>
                    <div
                        className="w-full sm:w-80 bg-white rounded-t-3xl sm:rounded-2xl pb-[env(safe-area-inset-bottom)] shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-4 sm:hidden" />
                        <h3 className="text-center font-semibold text-lg text-[#1A1A1A] mb-2 sm:mt-4">
                            Bhasha Chunein / Choose Language
                        </h3>
                        <div className="max-h-[60vh] overflow-y-auto">
                            {LANGUAGES.map((l, idx) => (
                                <button
                                    key={l.code}
                                    onClick={() => {
                                        setLang(l.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between py-4 px-6 ${idx !== LANGUAGES.length - 1 ? 'border-b border-[#F0F0F0]' : ''
                                        } hover:bg-[#F9FBF7] transition-colors`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold text-[#1A1A1A]">{l.name}</span>
                                        <span className="text-sm text-[#5F6368] ml-2">{l.nameEn}</span>
                                    </div>
                                    {lang === l.code && <span className="text-[#2E7D32] text-xl">✓</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
