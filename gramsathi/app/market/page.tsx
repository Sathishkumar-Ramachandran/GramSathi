'use client';

import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MarketPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['prices'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/api/agri/prices');
            return res.json();
        }
    });

    if (isLoading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Market Prices...</div>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">Mandi Bhav</h1>
                    <p className="text-sm text-[#5F6368] mt-1">{data?.district} APMC • Aaj Ka Bhav</p>
                </div>
                <div className="text-[10px] text-[#5F6368] bg-gray-100 px-2 py-1 rounded">Live Data</div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.entries(data?.prices || {}).map(([key, item]: [string, any]) => (
                    <div key={key} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E0E0E0]">
                        <div className="text-3xl mb-2">{item.emoji}</div>
                        <h3 className="font-bold text-[#1A1A1A]">{item.name_en}</h3>
                        <p className="text-[10px] text-[#5F6368] mb-2">{item.unit}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-[#2E7D32]">₹{item.price}</span>
                            <span className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${item.trend === 'rising' ? 'bg-green-100 text-green-700' :
                                    item.trend === 'falling' ? 'bg-rose-100 text-rose-700' :
                                        'bg-gray-100 text-gray-600'
                                }`}>
                                {item.trend === 'rising' ? <TrendingUp className="w-3 h-3 mr-0.5" /> :
                                    item.trend === 'falling' ? <TrendingDown className="w-3 h-3 mr-0.5" /> :
                                        <Minus className="w-3 h-3 mr-0.5" />}
                                {Math.abs(item.change_pct)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">Nearby Mandis</h2>
            <div className="space-y-3">
                {data?.mandis?.map((mandi: any, i: number) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-[#E0E0E0] flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold text-[#1A1A1A] text-sm">{mandi.name}</h4>
                            <p className="text-[10px] text-[#5F6368]">{mandi.specialty}</p>
                        </div>
                        <div className="bg-[#F1F8E9] text-[#1B5E20] text-xs font-bold px-2 py-1 rounded-lg">
                            {mandi.distance_km} km
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
