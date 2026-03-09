'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Landmark, Megaphone, FileText, SendHorizontal, CheckCircle2 } from 'lucide-react';
import * as api from '@/lib/api';

export default function PanchayatPage() {
    const [activeTab, setActiveTab] = useState<'notices' | 'grievance'>('notices');
    const [formData, setFormData] = useState({ category: 'Water', title: '', desc: '' });
    const [submitted, setSubmitted] = useState(false);

    const { data: noticesData } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/api/panchayat/announcements');
            return res.json();
        }
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/panchayat/grievance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category: formData.category, title: formData.title, description: formData.desc, panchayat_id: 'DINDORI-NASHIK' })
        });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ category: 'Water', title: '', desc: '' });
            setActiveTab('notices');
        }, 3000);
    };

    return (
        <div className="p-4 h-full flex flex-col">
            <div className="bg-[#1B5E20] text-white rounded-3xl p-6 shadow-md mb-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold mb-1">Dindori Panchayat</h1>
                    <p className="text-emerald-100 text-sm">Nashik District</p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium">
                        <Landmark className="w-4 h-4" /> Sarpanch: Mohan Shinde
                    </div>
                </div>
                <div className="absolute -bottom-6 -right-6 text-8xl opacity-10">🏛️</div>
            </div>

            <div className="flex bg-[#F1F8E9] p-1 rounded-xl mb-4">
                <button
                    onClick={() => setActiveTab('notices')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'notices' ? 'bg-white text-[#2E7D32] shadow-sm' : 'text-[#5F6368]'}`}
                >
                    Notices
                </button>
                <button
                    onClick={() => setActiveTab('grievance')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'grievance' ? 'bg-white text-[#2E7D32] shadow-sm' : 'text-[#5F6368]'}`}
                >
                    File Greivance
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-8">
                {activeTab === 'notices' ? (
                    <div className="space-y-3">
                        {noticesData?.announcements?.map((msg: any) => (
                            <div key={msg.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E0E0E0]">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5">
                                        <Megaphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-[#1A1A1A] text-sm leading-tight">{msg.title}</h3>
                                            <span className="text-[10px] text-[#5F6368] font-medium whitespace-nowrap ml-2">{msg.date}</span>
                                        </div>
                                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium mb-2 inline-block">
                                            {msg.category}
                                        </span>
                                        <p className="text-xs text-[#5F6368] leading-relaxed">{msg.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E0E0E0]">
                        {submitted ? (
                            <div className="text-center py-8">
                                <CheckCircle2 className="w-16 h-16 text-[#4CAF50] mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-[#1A1A1A]">Shikayat Darj!</h3>
                                <p className="text-sm text-[#5F6368] mt-2">Panchayat will respond within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#5F6368] uppercase mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-[#F9FBF7] border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4CAF50]"
                                    >
                                        {['Water', 'Roads', 'Electricity', 'Health', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#5F6368] uppercase mb-1">Issue Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Broken Pipe near school"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-[#F9FBF7] border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4CAF50]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#5F6368] uppercase mb-1">Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Provide details..."
                                        value={formData.desc}
                                        onChange={e => setFormData({ ...formData, desc: e.target.value })}
                                        className="w-full bg-[#F9FBF7] border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4CAF50] resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#2E7D32] text-white rounded-xl py-3.5 font-bold text-sm shadow-sm hover:bg-[#1B5E20] transition-colors flex items-center justify-center gap-2"
                                >
                                    <SendHorizontal className="w-5 h-5" /> Submit to Panchayat
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
