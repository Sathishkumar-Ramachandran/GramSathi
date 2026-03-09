'use client';

import { useLanguage } from '@/hooks/useLanguage';
import SpeakButton from './SpeakButton';
import WaveformVisualizer from './WaveformVisualizer';
import CallTranscript from './CallTranscript';
import { PhoneOff, Mic, MicOff } from 'lucide-react';

interface CallMessage {
    role: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

interface ActiveCallViewProps {
    callState: 'ringing' | 'connected' | 'listening' | 'thinking' | 'speaking';
    messages: CallMessage[];
    durationSeconds: number;
    isMuted: boolean;
    onPressSpeak: () => void;
    onReleaseSpeak: () => void;
    onHangUp: () => void;
    onToggleMute: () => void;
}

export default function ActiveCallView({
    callState,
    messages,
    durationSeconds,
    isMuted,
    onPressSpeak,
    onReleaseSpeak,
    onHangUp,
    onToggleMute,
}: ActiveCallViewProps) {
    const { t } = useLanguage();

    const formatDuration = (secs: number) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const getStatusText = () => {
        switch (callState) {
            case 'ringing': return { text: 'Connecting...', color: 'text-amber-400', dot: 'bg-amber-400' };
            case 'connected': return { text: 'Connected', color: 'text-green-400', dot: 'bg-green-400' };
            case 'listening': return { text: 'Listening...', color: 'text-blue-300', dot: 'bg-blue-300' };
            case 'thinking': return { text: 'Thinking...', color: 'text-amber-300', dot: 'bg-amber-300' };
            case 'speaking': return { text: 'Speaking...', color: 'text-green-400', dot: 'bg-green-400' };
            default: return { text: '', color: '', dot: '' };
        }
    };

    const status = getStatusText();

    return (
        <div className="fixed inset-0 z-[100] bg-[#0A1628] flex flex-col text-white">
            {/* TOP AREA */}
            <div className="pt-12 px-6 text-center flex-shrink-0">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${status.dot}`} />
                    <span className={`text-sm font-medium ${status.color}`}>{status.text}</span>
                </div>
                <h2 className="text-xl font-mono font-bold text-white mb-2">1800-GRAMSATHI</h2>
                <div className="text-5xl font-mono font-bold text-white/90 tracking-tight flex items-center justify-center h-14">
                    {callState === 'ringing' ? (
                        <span className="inline-block animate-[ring_0.3s_ease-in-out_3_alternate]">📞</span>
                    ) : (
                        formatDuration(durationSeconds)
                    )}
                </div>
            </div>

            {/* MIDDLE AREA */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-hidden relative w-full">
                <div className="w-20 h-20 bg-[#2E7D32] rounded-full flex items-center justify-center text-4xl shadow-lg flex-shrink-0">
                    🤖
                </div>

                <WaveformVisualizer
                    isActive={callState === 'speaking' || callState === 'listening'}
                    speaker={callState === 'speaking' ? 'ai' : callState === 'listening' ? 'user' : 'none'}
                    className="w-[240px] my-2"
                />

                <div className="w-full max-w-[90%] md:max-w-md px-2 flex-1 max-h-[250px] flex flex-col justify-end mb-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-3 h-full overflow-hidden shadow-2xl">
                        <CallTranscript messages={messages} isThinking={callState === 'thinking'} />
                    </div>
                </div>
            </div>

            {/* BOTTOM AREA */}
            <div className="pb-12 px-6 flex-shrink-0">
                <div className="flex justify-center mb-6">
                    <SpeakButton
                        callState={callState}
                        onPress={onPressSpeak}
                        onRelease={onReleaseSpeak}
                    />
                </div>

                <div className="flex justify-between items-center max-w-[280px] mx-auto">
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={onToggleMute}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-white text-[#0A1628]' : 'bg-white/10 text-white'}`}
                        >
                            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                        <span className="text-[10px] text-white/60">{t('mute')}</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={onHangUp}
                            className="w-16 h-16 bg-[#D32F2F] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                        >
                            <PhoneOff className="w-7 h-7 text-white" />
                        </button>
                        <span className="text-[10px] text-white/60">{t('hang_up')}</span>
                    </div>

                    <div className="w-12" /> {/* Spacer for centering */}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes ring {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
      `}} />
        </div>
    );
}
