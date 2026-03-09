'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import * as api from '@/lib/api';
import LoadingDots from '@/components/shared/LoadingDots';

interface ChatMessage {
    role: 'user' | 'ai';
    text: string;
}

export default function ChatPage() {
    const { lang, t } = useLanguage();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            const res = await api.chatMessage(userMsg, lang);
            setMessages((prev) => [...prev, { role: 'ai', text: res.response }]);
        } catch (err) {
            setMessages((prev) => [...prev, { role: 'ai', text: 'Kshama karein, network error aaya hai.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-56px)]">
            {/* CHAT HISTORY */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-[#5F6368]">
                        <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#2E7D32] mb-3">
                            <Bot className="w-8 h-8" />
                        </div>
                        <h2 className="text-lg font-bold text-[#1A1A1A]">GramSathi AI</h2>
                        <p className="text-sm">{t('type_message')}</p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-[15px] leading-relaxed ${msg.role === 'user'
                                    ? 'bg-[#E8F5E9] text-[#1B5E20] rounded-br-sm'
                                    : 'bg-white border border-[#E0E0E0] text-[#1A1A1A] rounded-bl-sm'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-[#E0E0E0] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                            <LoadingDots />
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* INPUT BAR */}
            <div className="p-3 bg-white border-t border-[#E0E0E0]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex items-end gap-2"
                >
                    <div className="flex-1 bg-[#F9FBF7] border border-[#C8E6C9] rounded-2xl overflow-hidden focus-within:border-[#4CAF50] transition-colors shadow-inner">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('type_message')}
                            rows={1}
                            className="w-full bg-transparent px-4 py-3 outline-none resize-none max-h-32 text-[#1A1A1A]"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="w-12 h-12 bg-[#2E7D32] text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50 transition-opacity"
                    >
                        <Send className="w-5 h-5 ml-1" />
                    </button>
                </form>
            </div>
        </div>
    );
}
