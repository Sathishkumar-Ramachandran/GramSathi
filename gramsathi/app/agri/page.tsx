'use client';

import { Sprout, AlertTriangle, CloudRain, Droplets } from 'lucide-react';

export default function AgriPage() {
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Fasal Salah</h1>

            {/* CROP 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E0E0E0]">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-2xl border border-amber-100">
                        🌾
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1A1A1A] text-lg">Gehun (Wheat)</h3>
                        <p className="text-xs text-[#5F6368]">Tillering to Jointing Stage</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="bg-[#F1F8E9] rounded-xl p-3 border border-[#C8E6C9] flex gap-3">
                        <Droplets className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#1B5E20]">Critical jointing stage. Ensure soil moisture is maintained. No heavy irrigation on windy days to prevent lodging.</p>
                    </div>

                    <div className="bg-rose-50 rounded-xl p-3 border border-rose-100 flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-rose-800">Watch for aphids. If &gt;15 per tiller, spray Imidacloprid (17.8 SL) @ 100 ml/acre.</p>
                    </div>
                </div>
            </div>

            {/* CROP 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E0E0E0]">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-2xl border border-purple-100">
                        🧅
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1A1A1A] text-lg">Pyaz (Onion)</h3>
                        <p className="text-xs text-[#5F6368]">Bulb Initiation Phase</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="bg-[#FFF8E1] rounded-xl p-3 border border-[#FFE082] flex gap-3">
                        <CloudRain className="w-5 h-5 text-[#FF8F00] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#FF8F00] font-medium">Thrips attack likely in dry weather. Check leaf axils. Spray Fipronil 5 SC @ 30ml/pump.</p>
                    </div>

                    <div className="bg-[#F9FBF7] rounded-xl p-3 border border-[#E0E0E0] flex gap-3 text-sm text-[#5F6368]">
                        <Sprout className="w-5 h-5 text-[#5F6368] flex-shrink-0 mt-0.5" />
                        <p>Apply Multi-K (13-0-45) via drip for better bulb size.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
