'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { PhoneCall } from 'lucide-react';

interface PreCallViewProps {
    callState: 'idle' | 'ended';
    isSupported: boolean;
    durationSeconds: number;
    onStartCall: () => void;
    onReset: () => void;
}

export default function PreCallView({ callState, isSupported, durationSeconds, onStartCall, onReset }: PreCallViewProps) {
    const { lang, setLang, t } = useLanguage();

    const formatDuration = (secs: number) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[70vh] gap-6 px-8 bg-[#F9FBF7]">
            <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-[#1B5E20] rounded-full flex items-center justify-center text-5xl mb-4 shadow-md">
                    🤖
                </div>
                {callState === 'idle' ? (
                    <>
                        <h2 className="text-[22px] font-bold text-[#1A1A1A]">GramSathi AI Helpline</h2>
                        <p className="text-sm font-mono text-[#5F6368] mt-1">1800-GRAMSATHI</p>
                    </>
                ) : (
                    <>
                        <h2 className="text-[22px] font-bold text-[#1A1A1A]">Call Ended</h2>
                        <p className="text-sm font-mono text-[#5F6368] mt-1">Duration: {formatDuration(durationSeconds)}</p>
                    </>
                )}
            </div>

            <div className="relative flex items-center justify-center w-[120px] h-[120px] mt-4 mb-4">
                {isSupported && callState === 'idle' && (
                    <>
                        <div className="absolute w-[160px] h-[160px] rounded-full border-4 border-[#4CAF50]/50 animate-ping [animation-duration:2000ms] pointer-events-none" />
                        <div className="absolute w-[200px] h-[200px] rounded-full border-4 border-[#4CAF50]/30 animate-ping [animation-duration:2000ms] [animation-delay:300ms] pointer-events-none" />
                    </>
                )}
                <button
                    onClick={callState === 'idle' ? onStartCall : onReset}
                    className="relative z-10 w-[120px] h-[120px] bg-[#2E7D32] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform active:scale-95"
                >
                    <PhoneCall className="w-12 h-12 text-white" />
                </button>
            </div>

            <div className="flex flex-col items-center text-center">
                {callState === 'idle' ? (
                    <>
                        <h3 className="text-base font-bold text-[#1A1A1A]">{t('call_cta_title')}</h3>
                        <p className="text-[13px] text-[#5F6368] mt-1">{t('call_cta_sub')}</p>
                    </>
                ) : (
                    <button onClick={onReset} className="text-[#2E7D32] text-sm font-semibold mt-2 hover:underline">
                        Call Again
                    </button>
                )}
            </div>

            {callState === 'idle' && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {[
                        { c: 'hi', n: 'हिं' },
                        { c: 'ta', n: 'தமி' },
                        { c: 'te', n: 'తెలు' },
                        { c: 'mr', n: 'मरा' },
                        { c: 'bn', n: 'বাং' },
                    ].map((l) => (
                        <button
                            key={l.c}
                            onClick={() => setLang(l.c)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${lang === l.c
                                    ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                                    : 'bg-white border-[#C8E6C9] text-[#2E7D32]'
                                }`}
                        >
                            {l.n}
                        </button>
                    ))}
                </div>
            )}

            {!isSupported && (
                <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-3 rounded-xl text-center max-w-sm">
                    ⚠️ Voice needs Chrome browser. Text chat works everywhere.
                </div>
            )}

            {callState === 'ended' && (
                <a href="#transcript" className="mt-4 text-[#5F6368] text-sm flex items-center gap-1 hover:text-[#2E7D32]">
                    📋 See Full Transcript
                </a>
            )}
        </div>
    );
}
