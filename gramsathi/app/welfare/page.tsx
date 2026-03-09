'use client';

import { useQuery } from '@tanstack/react-query';
import SchemeCard from '@/components/features/SchemeCard';
import { useState } from 'react';

export default function WelfarePage() {
    const [filter, setFilter] = useState('all');

    const { data, isLoading } = useQuery({
        queryKey: ['schemes', filter],
        queryFn: async () => {
            const res = await fetch(`http://localhost:8000/api/welfare/schemes?category=${filter}`);
            return res.json();
        }
    });

    const filters = [
        { id: 'all', label: 'Sabhi' },
        { id: 'agriculture', label: 'Kheti' },
        { id: 'finance', label: 'Paisa' },
        { id: 'health', label: 'Swasthya' },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-4">Sarkaari Yojnayen</h1>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
                {filters.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap font-medium border transition-colors ${filter === f.id
                                ? 'bg-[#1B5E20] text-white border-[#1B5E20]'
                                : 'bg-white text-[#5F6368] border-[#E0E0E0]'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />)}
                </div>
            ) : (
                <div>
                    {data?.schemes.map((scheme: any) => (
                        <SchemeCard key={scheme.id} scheme={scheme} />
                    ))}
                    {data?.schemes.length === 0 && (
                        <div className="text-center p-8 text-gray-500">Koi yojna nahi mili.</div>
                    )}
                </div>
            )}
        </div>
    );
}
