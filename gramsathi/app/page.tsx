'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Cloud, Droplets, MapPin, Sprout, TrendingUp, Building2, Briefcase, Landmark } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/lib/api';

export default function HomePage() {
  const { t } = useLanguage();

  // Example fetching mock weather
  const { data: weather } = useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/api/agri/weather', { cache: 'no-store' });
      return res.json();
    }
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* HEADER / LOCATION */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Namaskar, Ramesh!</h1>
          <div className="flex items-center gap-1 text-[#5F6368] text-sm mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nashik, Maharashtra</span>
          </div>
        </div>
        <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#2E7D32] font-semibold ring-2 ring-[#C8E6C9] ring-offset-2">
          RP
        </div>
      </div>

      {/* WEATHER WIDGET */}
      <div className="bg-gradient-to-br from-[#E1F5FE] to-[#B3E5FC] rounded-2xl p-4 shadow-sm border border-[#81D4FA]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 text-5xl opacity-80">{weather?.current?.emoji || '🌤️'}</div>
        <h3 className="text-[#0277BD] text-xs font-bold uppercase tracking-wider mb-1">Mausam / Weather</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#01579B]">{weather?.current?.temp_c || 28}°C</span>
          <span className="text-sm text-[#0288D1]">{weather?.current?.condition || 'Partly Cloudy'}</span>
        </div>
        <p className="text-xs text-[#0277BD] mt-2 line-clamp-1">{weather?.farm_advisory || 'Good conditions for Rabi crops.'}</p>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div className="grid grid-cols-4 gap-2 mt-2">
        {[
          { icon: Building2, label: 'Schemes', color: 'text-purple-600', bg: 'bg-purple-100', path: '/welfare' },
          { icon: TrendingUp, label: 'Prices', color: 'text-amber-600', bg: 'bg-amber-100', path: '/market' },
          { icon: Droplets, label: 'Water', color: 'text-blue-600', bg: 'bg-blue-100', path: '/water' },
          { icon: Briefcase, label: 'Jobs', color: 'text-emerald-600', bg: 'bg-emerald-100', path: '/jobs' },
        ].map((item, i) => (
          <Link key={i} href={item.path} className="flex flex-col items-center gap-1.5 focus:outline-none">
            <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} shadow-sm active:scale-95 transition-transform`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-medium text-[#1A1A1A]">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* CALL TO ACTION CARD */}
      <div className="bg-[#2E7D32] rounded-2xl p-5 text-white shadow-lg mt-2 relative overflow-hidden group active:scale-[0.98] transition-transform">
        <div className="absolute rounded-full w-32 h-32 bg-white/10 -top-10 -right-10 group-hover:bg-white/20 transition-colors" />
        <h3 className="text-lg font-bold mb-1">{t('call_cta_title')}</h3>
        <p className="text-white/80 text-sm mb-4 max-w-[80%]">{t('type_message')}</p>
        <Link href="/call" className="inline-flex items-center justify-center bg-white text-[#2E7D32] px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#F1F8E9] transition-colors">
          ☎️ {t('nav_call')}
        </Link>
      </div>

      {/* MODULE CARDS LIST */}
      <h2 className="text-base font-bold text-[#1A1A1A] mt-4 mb-1">Sevayen / Services</h2>
      <div className="flex flex-col gap-3">
        <Link href="/score" className="bg-white border border-[#E0E0E0] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
            📊
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#1A1A1A]">Mitti Credit Score</h4>
            <p className="text-xs text-[#5F6368] mt-0.5">Check your farm credit worthiness</p>
          </div>
          <div className="text-[#2E7D32] font-bold">724</div>
        </Link>
        <Link href="/agri" className="bg-white border border-[#E0E0E0] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#1A1A1A]">Fasal Salah (Crop Advisory)</h4>
            <p className="text-xs text-[#5F6368] mt-0.5">Disease & fertilizer alerts for Onion</p>
          </div>
        </Link>
        <Link href="/panchayat" className="bg-white border border-[#E0E0E0] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow mb-6">
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600">
            <Landmark className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#1A1A1A]">Gram Panchayat</h4>
            <p className="text-xs text-[#5F6368] mt-0.5">Notices & Grievances for Dindori</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
