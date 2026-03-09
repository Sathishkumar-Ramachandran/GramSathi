'use client';

import { useState, useEffect, useRef } from 'react';
import { useVoice } from './useVoice';
import * as api from '@/lib/api';
import { useLanguage } from './useLanguage';

type CallState = 'idle' | 'ringing' | 'connected' | 'listening' | 'thinking' | 'speaking' | 'ended';

interface CallMessage {
    role: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

export const useCall = () => {
    const { lang, t } = useLanguage();
    const voice = useVoice();

    const [callState, setCallState] = useState<CallState>('idle');
    const [messages, setMessages] = useState<CallMessage[]>([]);
    const [durationSeconds, setDurationSeconds] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (callState === 'connected' || callState === 'listening' || callState === 'thinking' || callState === 'speaking') {
            interval = setInterval(() => {
                setDurationSeconds((s) => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [callState]);

    const startCall = () => {
        setCallState('ringing');
        setMessages([]);
        setDurationSeconds(0);
        setIsMuted(false);

        setTimeout(() => {
            setCallState('connected');

            const greeting = t('call_greeting_' + lang) || t('call_greeting_hi');

            setMessages([{ role: 'ai', text: greeting, timestamp: new Date() }]);
            setCallState('speaking');

            voice.speak(greeting, lang, () => {
                setCallState('connected');
            });
        }, 1500);
    };

    const startSpeaking = () => {
        if (callState !== 'connected' || isMuted) return;

        setCallState('listening');

        voice.startListening(
            lang,
            async (transcript) => {
                // onResult
                setCallState('thinking');
                setMessages((prev) => [...prev, { role: 'user', text: transcript, timestamp: new Date() }]);

                try {
                    const res = await api.callChat(transcript, lang);
                    const responseText = res.response;

                    setMessages((prev) => [...prev, { role: 'ai', text: responseText, timestamp: new Date() }]);
                    setCallState('speaking');

                    voice.speak(responseText, lang, () => {
                        setCallState('connected');
                    });
                } catch (error) {
                    console.error(error);
                    setCallState('connected');
                }
            },
            (err) => {
                // onError
                if (err !== 'aborted' && err !== 'no-speech') {
                    console.error("Speech Recognition Error:", err);
                }
                setCallState('connected');
            },
            () => {
                // onEnd
                setCallState((current) => {
                    if (current === 'listening') return 'connected';
                    return current;
                });
            }
        );
    };

    const stopSpeaking = () => {
        if (callState === 'listening') {
            voice.stopListening();
            setCallState('connected');
        }
    };

    const endCall = () => {
        voice.stopListening();
        voice.stopSpeaking();
        setCallState('ended');
    };

    const toggleMute = () => {
        setIsMuted((muted) => {
            const newMuted = !muted;
            if (newMuted && callState === 'listening') {
                stopSpeaking();
            }
            return newMuted;
        });
    };

    const resetCall = () => {
        setCallState('idle');
        setMessages([]);
        setDurationSeconds(0);
    };

    return {
        callState,
        messages,
        durationSeconds,
        isMuted,
        isSupported: voice.isSupported,
        startCall,
        startSpeaking,
        stopSpeaking,
        endCall,
        toggleMute,
        resetCall,
    };
};
