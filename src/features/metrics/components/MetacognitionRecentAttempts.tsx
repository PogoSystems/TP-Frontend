import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { QuizAttemptMetacognition } from '../types/metacognition.types';

interface MetacognitionRecentAttemptsProps {
    attempts: QuizAttemptMetacognition[];
}

function formatDate(dateStr: string): string {
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return dateStr;
    }
}

export function MetacognitionRecentAttempts({ attempts }: MetacognitionRecentAttemptsProps) {
    if (!attempts || attempts.length === 0) {
        return (
            <div className="p-6 text-center text-sm text-[#64748b] bg-[#f8fafc] rounded-xl border border-dashed border-gray-200">
                Aún no hay cuestionarios evaluados con predicción en este curso.
            </div>
        );
    }

    // Limit to the most recent 2 attempts as requested
    const visibleAttempts = attempts.slice(0, 2);

    return (
        <div className="flex flex-col gap-3">
            {visibleAttempts.map((att) => {
                const isOverconfident = att.expected_correct > att.actual_correct;
                const isCalibrated = att.expected_correct === att.actual_correct;

                return (
                    <div
                        key={att.quiz_id}
                        className="p-3.5 bg-[#f8fafc] rounded-xl border border-gray-200/80 flex flex-col gap-2 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-col gap-0.5 min-w-0">
                                <p className="text-sm font-semibold text-[#1a3a5a] truncate" title={att.quiz_title}>
                                    {att.quiz_title}
                                </p>
                                <p className="text-xs text-[#64748b]">
                                    {formatDate(att.submitted_at)} • {att.total_questions} preguntas
                                </p>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
                                {isCalibrated ? (
                                    <CheckCircle2 size={14} className="text-[#059669]" />
                                ) : (
                                    <AlertCircle size={14} className={isOverconfident ? 'text-[#ea580c]' : 'text-[#2563eb]'} />
                                )}
                                <span className="text-xs font-bold text-[#1a3a5a]">
                                    {Math.round(att.calibration_accuracy)}%
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-[#4a5565] pt-1 border-t border-gray-200/60">
                            <div>
                                Esperadas: <span className="font-semibold text-[#1a3a5a]">{att.expected_correct}</span> / Reales:{' '}
                                <span className="font-semibold text-[#1a3a5a]">{att.actual_correct}</span>
                            </div>

                            <div className="text-[11px] font-medium">
                                Brecha:{' '}
                                <span
                                    className={`font-semibold ${
                                        att.gap > 0
                                            ? 'text-[#ea580c]'
                                            : att.gap < 0
                                            ? 'text-[#2563eb]'
                                            : 'text-[#059669]'
                                    }`}
                                >
                                    {att.gap > 0 ? `+${att.gap}` : att.gap} pts
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
