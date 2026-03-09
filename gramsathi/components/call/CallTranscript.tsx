'use client';

import { useEffect, useRef } from 'react';
import LoadingDots from '@/components/shared/LoadingDots';

interface CallMessage {
    role: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

export default function CallTranscript({ messages, isThinking }: { messages: CallMessage[], isThinking: boolean }) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isThinking]);

    return (
        <div className="w-full max-h-[200px] overflow-y-auto space-y-3 px-3 py-2 scrollbar-hide">
            {messages.map((msg, i) => {
                const timeStr = msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                if (msg.role === 'user') {
                    return (
                        <div key={i} className="flex flex-col items-end">
                            <div className="bg-white/20 text-white text-sm px-3 py-2 rounded-2xl rounded-tr-sm max-w-[85%]">
                                {msg.text}
                            </div>
                            <div className="text-[10px] text-white/40 mt-1 mr-1 text-right">
                                {timeStr}
                            </div>
                        </div>
                    );
                }

                return (
                    <div key={i} className="flex flex-col items-start mt-4">
                        <div className="bg-[#2E7D32]/80 text-white text-sm px-3 py-2 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed shadow-sm">
                            {msg.text}
                        </div>
                        <div className="text-[10px] text-white/40 mt-1 ml-1">
                            GramSathi AI • {timeStr}
                        </div>
                    </div>
                );
            })}

            {isThinking && (
                <div className="flex justify-start mt-2">
                    <div className="bg-[#2E7D32]/80 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                        <LoadingDots />
                    </div>
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    );
}
