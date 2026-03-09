'use client';

import { useQuery } from '@tanstack/react-query';
import { Briefcase, MapPin, Phone, Users } from 'lucide-react';

export default function JobsPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/api/jobs');
            return res.json();
        }
    });

    return (
        <div className="p-4">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-5 text-white mb-6 shadow-md relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="w-5 h-5 text-emerald-200" />
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-100">MGNREGA</h2>
                    </div>
                    <h1 className="text-2xl font-bold mb-1">Rs. 252 / Day</h1>
                    <p className="text-sm text-emerald-50 mb-4 opacity-90">Dindori Panchayat: Road Repair active. 100 days work guaranteed.</p>
                    <button className="bg-white text-emerald-700 text-sm font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-emerald-50 transition-colors">
                        Demand Work
                    </button>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-20 text-9xl">⛏️</div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#1A1A1A]">Local Jobs (Dihaadi)</h2>
                <span className="text-xs text-[#5F6368] font-medium">{data?.jobs?.length || 0} Openings</span>
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-2xl" />)}
                </div>
            ) : (
                <div className="space-y-3">
                    {data?.jobs?.map((job: any) => (
                        <div key={job.job_id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E0E0E0]">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-[#1A1A1A] text-base">{job.title}</h3>
                                <div className="bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                    {job.category}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1 text-sm font-bold text-[#1B5E20]">
                                    <Briefcase className="w-4 h-4" /> {job.wage}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-[#5F6368]">
                                    ⏱️ {job.duration}
                                </div>
                            </div>

                            <div className="bg-[#F9FBF7] rounded-xl p-3 border border-[#F0F0F0] flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-[#E0E0E0]">
                                        <MapPin className="w-4 h-4 text-[#5F6368]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#1A1A1A]">{job.employer}</p>
                                        <p className="text-[10px] text-[#5F6368]">Local</p>
                                    </div>
                                </div>
                                <a href={`tel:${job.phone}`} className="w-10 h-10 bg-[#2E7D32] text-white rounded-full flex items-center justify-center shadow-sm">
                                    <Phone className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
