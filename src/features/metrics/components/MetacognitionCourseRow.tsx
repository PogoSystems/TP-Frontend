import type { MetacognitionBias } from '../types/metacognition.types';

interface MetacognitionCourseRowProps {
    courseId: number;
    courseName: string;
    quizzesEvaluated: number;
    calibrationPercentage: number;
    bias: MetacognitionBias;
    isSelected?: boolean;
    onSelect?: (courseId: number) => void;
}

function getBiasBadge(bias: MetacognitionBias) {
    switch (bias) {
        case 'calibrated':
            return {
                label: 'Calibrado',
                className: 'bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]',
                barColor: '#059669',
            };
        case 'overconfident':
            return {
                label: 'Sobreestima',
                className: 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]',
                barColor: '#f97316',
            };
        case 'underconfident':
            return {
                label: 'Subestima',
                className: 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]',
                barColor: '#3b82f6',
            };
        default:
            return {
                label: '—',
                className: 'bg-[#f3f4f6] text-[#4b5563] border-[#e5e7eb]',
                barColor: '#9ca3af',
            };
    }
}

export function MetacognitionCourseRow({
    courseId,
    courseName,
    quizzesEvaluated,
    calibrationPercentage,
    bias,
    isSelected = false,
    onSelect,
}: MetacognitionCourseRowProps) {
    const badge = getBiasBadge(bias);

    return (
        <div
            onClick={() => onSelect?.(courseId)}
            className={`flex flex-col gap-2 p-2.5 rounded-xl transition-all cursor-pointer border ${
                isSelected
                    ? 'border-[#1a3a5a] bg-[#f8fafc] shadow-xs'
                    : 'border-transparent hover:border-gray-200 hover:bg-gray-50/70'
            }`}
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="text-[#1a3a5a] text-sm font-semibold truncate" title={courseName}>
                        {courseName}
                    </p>
                    <p className="text-[#6a7282] text-xs font-normal">
                        {quizzesEvaluated} {quizzesEvaluated === 1 ? 'quiz evaluado' : 'quizzes evaluados'}
                    </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.className}`}
                    >
                        {badge.label}
                    </span>
                    <p className="text-sm font-bold text-[#1a3a5a]">
                        {Math.round(calibrationPercentage)}%
                    </p>
                </div>
            </div>

            {/* Calibration Progress Bar */}
            <div className="bg-[#e5e7eb] rounded-full h-2 w-full overflow-hidden">
                <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                        width: `${Math.min(Math.max(calibrationPercentage, 0), 100)}%`,
                        backgroundColor: badge.barColor,
                    }}
                />
            </div>
        </div>
    );
}
