'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { House, PhoneCall, MessageCircle, BarChart2, Building2 } from 'lucide-react';
import { useCall } from '@/hooks/useCall'; // will be created next

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const { callState } = useCall();

    const tabs = [
        { key: 'home', path: '/', icon: House },
        { key: 'call', path: '/call', icon: PhoneCall },
        { key: 'chat', path: '/chat', icon: MessageCircle },
        { key: 'score', path: '/score', icon: BarChart2 },
        { key: 'schemes', path: '/welfare', icon: Building2 },
    ];

    const isCallActive = callState === 'connected' || callState === 'listening' || callState === 'thinking' || callState === 'speaking';

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E0E0E0] pb-[env(safe-area-inset-bottom)] lg:hidden">
            <div className="flex h-[64px]">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.path;
                    const IconStyle = isActive ? "text-[#2E7D32]" : "text-[#BDBDBD]";
                    const TextStyle = isActive ? "text-[#2E7D32] font-semibold" : "text-[#BDBDBD]";

                    return (
                        <Link key={tab.key} href={tab.path} className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative ${isActive ? 'border-t-2 border-[#2E7D32]' : ''}`}>
                            <div className="relative">
                                <tab.icon className={`w-6 h-6 ${IconStyle}`} />
                                {tab.key === 'call' && isCallActive && (
                                    <div className="absolute top-0 right-0 w-2 h-2 bg-[#D32F2F] rounded-full translate-x-1 -translate-y-1"></div>
                                )}
                            </div>
                            <span className={`text-[10px] ${TextStyle}`}>
                                {t(`nav_${tab.key}`)}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
