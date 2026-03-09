'use client';

import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function TopBar({ title, subtitle, showBack = false }: { title?: string, subtitle?: string, showBack?: boolean }) {
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <header className="fixed top-0 left-0 right-0 lg:left-[240px] z-40 bg-white/95 backdrop-blur-sm border-b border-[#E0E0E0] h-[56px] flex items-center px-4 justify-between">
            <div className="flex items-center gap-3 min-w-0">
                {showBack && !isHome ? (
                    <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-[#F1F8E9] transition-colors">
                        <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
                    </button>
                ) : (
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-2xl">🌾</span>
                        <span className="text-lg font-bold text-[#1B5E20]">GramSathi</span>
                    </div>
                )}
                {(title || subtitle) && (
                    <div className="flex flex-col truncate">
                        {title && <h1 className="text-base font-semibold text-[#1A1A1A] truncate">{title}</h1>}
                        {subtitle && <span className="text-xs text-[#5F6368] truncate">{subtitle}</span>}
                    </div>
                )}
            </div>

            <div className="flex items-center flex-shrink-0">
                <LanguageSwitcher />
            </div>
        </header>
    );
}
