'use client';

interface WaveformVisualizerProps {
    isActive: boolean;
    speaker: 'ai' | 'user' | 'none';
    className?: string;
}

export default function WaveformVisualizer({ isActive, speaker, className = '' }: WaveformVisualizerProps) {
    // 12 bars
    const bars = Array.from({ length: 12 });

    const getBarColor = () => {
        if (!isActive || speaker === 'none') return 'bg-[#E0E0E0]';
        if (speaker === 'ai') return 'bg-[#4CAF50]';
        return 'bg-[#90A4AE]';
    };

    const getAnimationClass = (index: number) => {
        if (!isActive || speaker === 'none') return '';
        if (index < 4) return 'animate-[wave_0.8s_ease-in-out_infinite_alternate]';
        if (index < 8) return 'animate-[wave_0.9s_ease-in-out_infinite_alternate]';
        return 'animate-[wave_1.1s_ease-in-out_infinite_alternate]';
    };

    const getAnimationDelay = (index: number) => {
        return `${index * 50}ms`;
    };

    return (
        <div className={`flex items-end justify-center gap-[3px] h-10 ${className}`}>
            {bars.map((_, i) => (
                <div
                    key={i}
                    className={`w-[3px] rounded-full min-h-[4px] origin-bottom transition-colors duration-300 ${getBarColor()} ${getAnimationClass(i)}`}
                    style={{ animationDelay: getAnimationDelay(i), height: !isActive ? '4px' : '100%' }}
                />
            ))}
        </div>
    );
}
