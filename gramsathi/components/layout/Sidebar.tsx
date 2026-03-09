'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { useCall } from '@/hooks/useCall';
import { House, PhoneCall, MessageCircle, BarChart2, Building2, Sprout, TrendingUp, Briefcase, Droplets, Landmark } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const { callState } = useCall();

    const navItems = [
        { key: 'home', path: '/', icon: House },
        { key: 'call', path: '/call', icon: PhoneCall },
        { key: 'chat', path: '/chat', icon: MessageCircle },
        { key: 'score', path: '/score', icon: BarChart2 },
        { key: 'schemes', path: '/welfare', icon: Building2 },
        { key: 'farm', path: '/agri', icon: Sprout },
        { key: 'market', path: '/market', icon: TrendingUp },
        { key: 'jobs', path: '/jobs', icon: Briefcase },
        { key: 'water', path: '/water', icon: Droplets },
        { key: 'panchayat', path: '/panchayat', icon: Landmark },
    ];

    const isCallActive = callState === 'connected' || callState === 'listening' || callState === 'thinking' || callState === 'speaking';

    return (
        <aside className="fixed left-0 top-0 h-full w-[240px] z-40 bg-white border-r border-[#E0E0E0] hidden lg:flex flex-col">
            <div className="p-6 border-b border-[#E0E0E0] flex-shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-[32px]">🌾</span>
                    <span className="text-[20px] font-bold text-[#1B5E20]">GramSathi</span>
                </div>
                <p className="text-xs text-[#5F6368] mt-1">{t('tagline')}</p>
            </div>

            <nav className="flex-1 py-4 overflow-y-auto w-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.key} href={item.path} className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-colors duration-150 ${isActive ? 'bg-[#F1F8E9] text-[#2E7D32]' : 'text-[#5F6368] hover:bg-[#F9FBF7]'}`}>
                            <item.icon className="w-5 h-5" />
                            <span className="flex-1">{t(`nav_${item.key}`)}</span>
                            {item.key === 'call' && isCallActive && (
                                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">LIVE</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[#E0E0E0]">
                <LanguageSwitcher fullWidth />
                <div className="bg-[#232F3E] rounded-xl px-3 py-2 mt-3">
                    <div className="text-[#FF9900] text-xs font-bold leading-tight flex items-center gap-1">
                        <span>☁️</span> Powered by AWS
                    </div>
                    <div className="text-gray-400 text-[10px] mt-0.5 leading-tight">
                        Bedrock Claude 3.5 · Lambda
                    </div>
                </div>
            </div>
        </aside>
    );
}
