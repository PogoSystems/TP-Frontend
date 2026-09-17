import type { BloomMetacognitionResponse } from '../types/metacognition.types';
import { BloomLevelLabel } from '../../../shared/types/bloomLevel';

interface MetacognitionBloomRowProps {
    data: BloomMetacognitionResponse;
    maxAttempted: number;
}

const BLOOM_COLORS: Record<string, string> = {
    remember: '#4e79a7',
    understand: '#dc4b4b',
    apply: '#f28e2b',
    analyze: '#59a14f',
    evaluate: '#b07aa1',
};

export function MetacognitionBloomRow({ data, maxAttempted }: MetacognitionBloomRowProps) {
    const widthPercent = maxAttempted > 0 ? Math.round((data.questions_attempted / maxAttempted) * 100) : 0;
    const color = BLOOM_COLORS[data.bloom_level] || '#2e6f95';

    let biasBadge = { label: 'Calibrado', className: 'text-[#59A14F] rounded-lg border' };
    if (data.bias === 'overconfident') {
        biasBadge = { label: 'Sobreest.', className: 'text-[#F28E2B] rounded-lg border' };
    } else if (data.bias === 'underconfident') {
        biasBadge = { label: 'Subest.', className: 'text-[#4E79A7] rounded-lg border' };
    }

    return (
        <div className="flex items-center gap-3 w-full">
            <p className="text-[#1a3a5a] text-sm font-medium w-24 shrink-0">
                {BloomLevelLabel[data.bloom_level] ?? data.bloom_level}
            </p>

            <div className="bg-[#e5e7eb] rounded-full h-2.5 flex-1 overflow-hidden">
                <div
                    className="h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${widthPercent}%`, backgroundColor: color }}
                />
            </div>

            <p className="text-[#64748b] text-xs font-medium w-28 text-right shrink-0">
                {data.actual_correct} real / {data.expected_correct} esp
            </p>

            <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${biasBadge.className}`}
            >
                {biasBadge.label}
            </span>
        </div>
    );
}
