'use client';

import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/useLanguage';
import MittiGauge from '@/components/features/MittiGauge';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function ScorePage() {
    const { lang } = useLanguage();

    const { data, isLoading } = useQuery({
        queryKey: ['mitti_score'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/api/score/demo');
            return res.json();
        }
    });

    if (isLoading || !data) {
        return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Mitti Score...</div>;
    }

    return (
        <div className="p-4 flex flex-col gap-5">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-[#1A1A1A]">Mitti Credit Score</h1>
                <p className="text-sm text-[#5F6368] mt-1">{data.farmer_name} • {data.district}</p>
            </div>

            {/* MAIN GAUGE CARD */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E0E0E0]">
                <MittiGauge score={data.mitti_score} band={data.risk_band} />

                <div className="mt-8 text-center space-y-2">
                    <div className="px-4 py-1.5 bg-[#F1F8E9] text-[#2E7D32] rounded-full inline-block text-sm font-bold border border-[#C8E6C9]">
                        Band {data.risk_band}: {data.risk_band_label}
                    </div>
                    <p className="text-[#5F6368] text-sm px-4">
                        Aap <strong>₹{data.recommended_credit_inr.toLocaleString('en-IN')}</strong> tak ke loan ke liye patr hain.
                    </p>
                </div>
            </div>

            {/* BREAKDOWN */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E0E0E0]">
                <h3 className="font-bold text-[#1A1A1A] mb-4">Score Breakdown</h3>

                <div className="space-y-4">
                    <BreakdownRow label="Zameen & Fasal (Land)" value={data.components.land_crop} max={150} />
                    <BreakdownRow label="Sarkaari Yojna (Compliance)" value={data.components.scheme_compliance} max={75} />
                    <BreakdownRow label="Sathikaar (Engagement)" value={data.components.engagement} max={80} />
                    <BreakdownRow label="Mausam Salaamati" value={data.components.weather_resilience} max={75} />
                </div>
            </div>

            {/* TIPS */}
            <div className="bg-[#FFF8E1] rounded-2xl p-4 border border-[#FFE082]">
                <h3 className="font-bold text-[#FF8F00] flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5" /> Score Kaise Badhayen?
                </h3>
                <ul className="space-y-3">
                    {data.improvement_tips.map((tip: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#5F6368]">
                            <CheckCircle2 className="w-4 h-4 text-[#FFB300] mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function BreakdownRow({ label, value, max }: { label: string, value: number, max: number }) {
    const pct = (value / max) * 100;
    return (
        <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-[#5F6368]">{label}</span>
                <span className="text-[#1A1A1A]">{value}/{max} pts</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#4CAF50] rounded-full" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
