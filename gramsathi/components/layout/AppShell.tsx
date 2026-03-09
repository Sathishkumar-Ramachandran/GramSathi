'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Later we can set page titles here or pass null to omit TopBar title 
    // and handle it within the page components. For now, we'll leave it simple.

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Sidebar />
            <div className="lg:ml-[240px]">
                <TopBar showBack={!isHome} />
                <main className="pt-[56px] pb-20 lg:pb-8 max-w-lg mx-auto w-full">
                    {children}
                </main>
                <BottomNav />
            </div>
        </div>
    );
}
