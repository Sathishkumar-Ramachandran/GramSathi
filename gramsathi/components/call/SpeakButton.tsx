'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Mic, MicOff, Loader2, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type CallState = 'idle' | 'ringing' | 'connected' | 'listening' | 'thinking' | 'speaking' | 'ended';

interface SpeakButtonProps {
    callState: CallState;
    onPress: () => void;
    onRelease: () => void;
}

export default function SpeakButton({ callState, onPress, onRelease }: SpeakButtonProps) {
    const { t } = useLanguage();
    const [isMobile, setIsMobile] = useState(false);


    const handleClick = () => {
        if (callState === 'connected') {
            onPress();
        } else if (callState === 'listening') {
            onRelease();
        }
    };

    const getButtonConfig = () => {
        switch (callState) {
            case 'listening':
                return {
                    bg: 'bg-[#D32F2F]',
                    ring: 'ring-4 ring-[#D32F2F]/40 animate-ping absolute inset-0 rounded-full',
                    icon: <MicOff className="w-8 h-8 text-white relative z-10" />,
                    label: t('call_listening'),
                    disabled: false,
                };
            case 'thinking':
                return {
                    bg: 'bg-white/20',
                    ring: '',
                    icon: <Loader2 className="w-8 h-8 text-white animate-spin" />,
                    label: t('call_thinking'),
                    disabled: true,
                };
            case 'speaking':
                return {
                    bg: 'bg-[#2E7D32]/60',
                    ring: '',
                    icon: <Volume2 className="w-8 h-8 text-white" />,
                    label: t('call_speaking'),
                    disabled: true,
                };
            case 'connected':
            default:
                return {
                    bg: 'bg-white/20 hover:bg-white/30',
                    ring: '',
                    icon: <Mic className="w-8 h-8 text-white" />,
                    label: t('call_tap_to_speak'),
                    disabled: false,
                };
        }
    };

    const config = getButtonConfig();

    return (
        <div className="flex flex-col items-center gap-3">
            <button
                type="button"
                disabled={config.disabled}
                onClick={handleClick}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-150 ${config.bg} ${!config.disabled ? 'active:scale-95' : ''}`}
            >
                {config.ring && <div className={config.ring} />}
                {config.icon}
            </button>
            <span className="text-[11px] text-white/70 font-medium">
                {config.label}
            </span>
        </div>
    );
}
