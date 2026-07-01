import { useLocation, useNavigate } from 'react-router-dom';
import { Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../../../shared/components/ui/card.tsx';
import { QuizBloomResultBar } from '../components/quizBloomResultBar.tsx';
import { BloomSummaryCard } from '../../../shared/components/ui/bloomSummaryCard.tsx';
import type { QuizResult } from '../types/quiz.types.ts';

// Fallback mock result for direct URL access during development
const FALLBACK_RESULT: QuizResult = {
    quiz: { title: 'Cuestionario de ejemplo', questions: [] },
    records: [],
    totalScore: 0,
    maxTotalScore: 0,
    correctCount: 0,
    incorrectCount: 0,
    bloomBreakdown: [],
};

export function QuizResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const result: QuizResult = (location.state as { result?: QuizResult })?.result ?? FALLBACK_RESULT;

    const scorePercent =
        result.maxTotalScore > 0
            ? Math.round((result.totalScore / result.maxTotalScore) * 100)
            : 0;

    // Calculate dominant and weak cognitive performance levels from bloomBreakdown
    const bloomStats = result.bloomBreakdown.map((item) => ({
        ...item,
        percentage: item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0,
    }));

    // Sort by success percentage (descending) to find the dominant level
    const sortedBySuccess = [...bloomStats].sort((a, b) => {
        if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
        }
        return b.total - a.total; // tie-breaker: prefer the level with more questions
    });

    const dominant = sortedBySuccess[0] || null;

    // Sort by success percentage (ascending) to find the weak level (needs reinforcement)
    const sortedByFailure = [...bloomStats].sort((a, b) => {
        if (a.percentage !== b.percentage) {
            return a.percentage - b.percentage;
        }
        return b.total - a.total; // tie-breaker: prefer the level with more questions
    });

    let weak = sortedByFailure[0] || null;
    if (dominant && weak && dominant.bloomLevel === weak.bloomLevel) {
        if (sortedByFailure.length > 1) {
            weak = sortedByFailure[1];
        } else {
            weak = null; // single level evaluated, so no alternative weak level exists
        }
    }

    return (
        <div className="flex flex-col gap-6 w-full py-8">

            {/* Page title */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold text-[#1a3a5a]">Resultados del Quiz</h1>
                <p className="text-base text-[#4a5565]">{result.quiz.title}</p>
            </div>

            {/* Top row: score card + bloom breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 items-start">

                {/* Score card */}
                <Card className="flex flex-col items-center gap-4 !p-8 min-w-[240px]">
                    <h2 className="text-xl font-semibold text-[#1a3a5a] w-full text-center">
                        Puntaje Total
                    </h2>

                    <div className="flex flex-col items-center gap-1">
                        <p className="text-8xl font-semibold text-[#031632] leading-none tracking-tight">
                            {scorePercent}
                        </p>
                        <p className="text-xl font-medium text-[#44474d]">puntos</p>
                    </div>

                    <div className="flex gap-6 pt-2">
                        {/* Correct */}
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={22} className="text-[#0d542b]" />
                                <p className="text-2xl font-bold text-[#0d542b]">{result.correctCount}</p>
                            </div>
                            <p className="text-sm font-semibold text-[#4a5565] leading-tight">
                                Preguntas<br />Correctas
                            </p>
                        </div>
                        {/* Incorrect */}
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                                <XCircle size={22} className="text-[#82181a]" />
                                <p className="text-2xl font-bold text-[#82181a]">{result.incorrectCount}</p>
                            </div>
                            <p className="text-sm font-semibold text-[#4a5565] leading-tight">
                                Preguntas<br />Incorrectas
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Bloom breakdown */}
                <Card className="flex flex-col gap-5 !p-6">
                    <h2 className="text-xl font-semibold text-[#1a3a5a]">
                        Desempeño por Taxonomía de Bloom
                    </h2>
                    <div className="flex flex-col gap-5">
                        {result.bloomBreakdown.length > 0 ? (
                            result.bloomBreakdown.map((item) => (
                                <QuizBloomResultBar
                                    key={item.bloomLevel}
                                    label={item.label}
                                    correct={item.correct}
                                    total={item.total}
                                />
                            ))
                        ) : (
                            <p className="text-sm text-[#4a5565]">No hay datos disponibles.</p>
                        )}
                    </div>
                </Card>
            </div>

            {/* Tip banner */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
                <Lightbulb size={18} className="text-blue-700 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                    <span className="font-semibold">Tip: </span>
                    Intenta repasar definiciones, conceptos clave y terminología fundamental antes de volver a evaluar este tema.
                </p>
            </div>

            {/* Bottom section: cognitive performance & CTA */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4">
                {/* Rendimiento cognitivo card */}
                <Card className="flex-1 flex flex-col gap-5 !p-6">
                    <h2 className="text-xl font-semibold text-[#1a3a5a]">Rendimiento cognitivo</h2>
                    {dominant ? (
                        <div className="flex flex-col sm:flex-row gap-4">
                            <BloomSummaryCard
                                variant="dominant"
                                level={dominant.label}
                                percentage={dominant.percentage}
                                answeredCount={dominant.total}
                            />
                            {weak && (
                                <BloomSummaryCard
                                    variant="weak"
                                    level={weak.label}
                                    percentage={weak.percentage}
                                    answeredCount={weak.total}
                                />
                            )}
                        </div>
                    ) : (
                        <p className="text-sm text-[#4a5565] py-4 text-center">
                            No hay datos de rendimiento cognitivo disponibles.
                        </p>
                    )}
                </Card>

                {/* CTA */}
                <div className="flex items-end justify-end shrink-0">
                    <button
                        onClick={() => navigate('/courses')}
                        className="px-6 py-3 bg-[#092e5e] text-white rounded-xl font-medium text-base hover:bg-[#1a3a5a] transition-colors"
                    >
                        Volver a mis cursos
                    </button>
                </div>
            </div>
        </div>
    );
}
