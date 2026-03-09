'use client';

import { CheckCircle2, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function SchemeCard({ scheme }: { scheme: any }) {
    const { t } = useLanguage();

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E0E0E0] mb-4">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#1A1A1A] text-lg leading-tight">{scheme.name}</h3>
                {scheme.eligible_for_demo && (
                    <div className="bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-[#C8E6C9]">
                        <CheckCircle2 className="w-3 h-3" /> {t('eligible')}
                    </div>
                )}
            </div>

            <p className="text-xs text-[#5F6368] mb-3">{scheme.full_name}</p>

            <div className="bg-[#F9FBF7] rounded-xl p-3 border border-[#F0F0F0] mb-4">
                <div className="text-[#1B5E20] text-sm font-semibold">{scheme.benefit}</div>
            </div>

            <div className="space-y-3">
                <div>
                    <h4 className="text-xs font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wide">Patrata (Eligibility)</h4>
                    <ul className="list-disc pl-4 text-xs text-[#5F6368] space-y-1">
                        {scheme.eligibility.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wide">Docz</h4>
                    <p className="text-xs text-[#5F6368]">{scheme.documents.join(', ')}</p>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#F0F0F0] flex gap-2">
                <button className="flex-1 bg-[#2E7D32] text-white py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#1B5E20] transition-colors">
                    {t('apply_now')}
                </button>
                <button className="w-10 flex items-center justify-center rounded-xl border border-[#E0E0E0] text-[#5F6368]">
                    <Info className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
