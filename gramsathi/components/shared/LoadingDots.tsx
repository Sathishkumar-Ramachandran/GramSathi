'use client';

export default function LoadingDots() {
    return (
        <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
        </div>
    );
}
