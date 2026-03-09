'use client';

interface MittiGaugeProps {
    score: number;
    band: 'A' | 'B' | 'C' | 'D';
}

export default function MittiGauge({ score, band }: MittiGaugeProps) {
    // Score is 0-850. Create an arc or gauge visual.
    // For simplicity, we use an SVG semi-circle gauge.

    const max = 850;
    const percentage = Math.min(Math.max(score / max, 0), 1);

    // Angle extends from -180 (left) to 0 (right)
    const rotationOffset = -180 + (percentage * 180);

    const getDialColor = () => {
        switch (band) {
            case 'A': return 'text-[#4CAF50]';
            case 'B': return 'text-[#8BC34A]';
            case 'C': return 'text-[#FF9800]';
            case 'D': return 'text-[#F44336]';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="relative w-48 h-24 mx-auto overflow-hidden flex flex-col items-center justify-end">
            {/* Background track */}
            <div className="absolute top-0 left-0 w-48 h-48 border-[16px] border-gray-200 rounded-full box-border" />

            {/* Foreground track */}
            <div
                className="absolute top-0 left-0 w-48 h-48 border-[16px] border-currentColor rounded-full box-border origin-center transition-transform duration-1000 ease-out"
                style={{
                    borderBottomColor: 'transparent',
                    borderRightColor: 'transparent',
                    transform: `rotate(${rotationOffset + 45}deg)`, // +45 to align the border stroke correctly
                }}
            />

            {/* Value overlay */}
            <div className={`z-10 bg-white rounded-full w-36 h-36 flex flex-col items-center justify-center translate-y-12 shadow-inner border border-gray-100`}>
                <span className={`text-4xl font-black ${getDialColor()}`}>{score}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">/ 850</span>
            </div>

            {/* Markers */}
            <div className="absolute w-full flex justify-between px-1 bottom-0 z-0 text-[10px] text-gray-400 font-medium">
                <span>0</span>
                <span>850</span>
            </div>
        </div>
    );
}
