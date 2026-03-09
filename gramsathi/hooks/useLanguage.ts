'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations } from '@/lib/i18n';
import { useEffect } from 'react';

interface LanguageState {
    lang: string;
    setLang: (lang: string) => void;
}

const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            lang: 'hi',
            setLang: (lang) => set({ lang }),
        }),
        {
            name: 'gramsathi-lang',
        }
    )
);

export const useLanguage = () => {
    const { lang, setLang } = useLanguageStore();

    const t = (key: string) => {
        return translations[lang]?.[key] ?? translations['hi']?.[key] ?? key;
    };

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = lang;
        }
    }, [lang]);

    return { lang, setLang, t };
};
