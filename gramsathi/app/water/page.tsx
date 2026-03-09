'use client';

import { useQuery } from '@tanstack/react-query';
import { Droplets, ThermometerSun, AlertCircle } from 'lucide-react';

export default function WaterPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['water'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/api/water');
            return res.json();
        }
    });

    if (isLoading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Water Status...</div>;

    return (
        <div className="p-4">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#1A1A1A]">Paani Ka Star</h1>
                <p className="text-sm text-[#5F6368] mt-1">{data?.village}</p>

                <div className="mt-4 w-32 h-32 mx-auto bg-blue-50 rounded-full flex flex-col items-center justify-center border-4 border-blue-100 shadow-inner">
                    <Droplets className="w-8 h-8 text-blue-500 mb-1" />
                    <span className="text-sm font-bold text-blue-800">{data?.overall}</span>
                </div>
            </div>

            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">Water Sources</h2>
            <div className="space-y-4 mb-6">
                {data?.sources?.map((source: any, i: number) => {
                    const isLow = source.level_pct < 50;
                    return (
                        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E0E0E0]">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h3 className="font-semibold text-[#1A1A1A] text-sm">{source.name}</h3>
                                    <p className="text-[10px] text-[#5F6368] mt-0.5">Updated: {source.last_reported}</p>
                                </div>
                                <div className={`text-xl font-bold ${isLow ? 'text-amber-600' : 'text-blue-600'}`}>
                                    {source.level_pct}%
                                </div>
                            </div>

                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-3">
                                <div
                                    className={`h-full rounded-full ${isLow ? 'bg-amber-500' : 'bg-blue-500'}`}
                                    style={{ width: `${source.level_pct}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-[#FFF8E1] rounded-2xl p-4 border border-[#FFE082]">
                <h3 className="font-bold text-[#FF8F00] flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5" /> Irrigation Advisory
                </h3>
                <p className="text-sm text-[#5F6368] mb-2 font-medium">Wheat (Jointing Stage):</p>
                <p className="text-xs text-[#5F6368]">Flood irrigation recommended. 5-7 cm required. Avoid water stress.</p>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#FFE082]/50 text-xs text-[#5F6368]">
                    <ThermometerSun className="w-4 h-4 text-[#FF8F00]" />
                    Evaporation high today. Irrigate in early morning or evening.
                </div>
            </div>
        </div>
    );
}
