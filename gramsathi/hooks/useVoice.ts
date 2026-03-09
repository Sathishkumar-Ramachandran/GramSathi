'use client';

import { useState, useEffect, useRef } from 'react';

const LANG_CODES: Record<string, string> = {
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    mr: 'mr-IN',
    bn: 'bn-IN',
};

export const useVoice = () => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(true);

    const recognitionRef = useRef<any>(null); // any because SpeechRecognition is not standard TS

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const synth = window.speechSynthesis;
            if (!SpeechRecognition || !synth) {
                setIsSupported(false);
            }
        }
    }, []);

    const startListening = (
        lang: string,
        onResult: (transcript: string) => void,
        onError: (err: any) => void,
        onEnd: () => void
    ) => {
        if (!isSupported || typeof window === 'undefined') return;

        try {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognitionRef.current = recognition;

            recognition.lang = LANG_CODES[lang] || 'hi-IN';
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => setIsListening(true);

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                onResult(transcript);
            };

            recognition.onerror = (event: any) => {
                if (event.error !== 'aborted') {
                    console.error("Speech Recognition Error:", event.error);
                    onError(event.error);
                }
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
                onEnd();
            };

            recognition.start();
        } catch (err) {
            onError(err);
            setIsListening(false);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) { }
            // We don't set isListening to false here so that onresult can still fire
        }
    };

    const speak = (text: string, lang: string, onEnd?: () => void) => {
        if (!isSupported || typeof window === 'undefined') return;

        window.speechSynthesis.cancel(); // Stop current speech

        setIsSpeaking(true);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = LANG_CODES[lang] || 'hi-IN';
        utterance.rate = 0.88;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const indian = voices.find(v => v.lang === utterance.lang)
            ?? voices.find(v => v.lang.startsWith(lang))
            ?? voices.find(v => v.lang.includes('IN'));

        if (indian) {
            utterance.voice = indian;
        }

        utterance.onend = () => {
            setIsSpeaking(false);
            if (onEnd) onEnd();
        };

        utterance.onerror = () => {
            setIsSpeaking(false);
            if (onEnd) onEnd();
        };

        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        if (!isSupported || typeof window === 'undefined') return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return {
        isListening,
        isSpeaking,
        isSupported,
        startListening,
        stopListening,
        speak,
        stopSpeaking,
    };
};
