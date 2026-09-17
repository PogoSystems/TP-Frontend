import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import { Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../../../shared/components/ui/card.tsx';
import { QuizBloomResultBar } from '../components/quizBloomResultBar.tsx';
import { BloomSummaryCard } from '../../../shared/components/ui/bloomSummaryCard.tsx';
import type {AttemptResultResponse} from "../types/quiz.types.ts";
import {BloomLevelLabel} from "../../../shared/types/bloomLevel.ts";
import {Button} from "../../../shared/components/ui/button.tsx";

type ResultState = {
    result: AttemptResultResponse;
};

export function QuizResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as ResultState | undefined;
    if (!state) {
        return <Navigate to="/quiz/create" replace />;
    }
    const { result } = state;

    const totalScore = result.total_score;

    // calculate correct and incorrect counts
    const correctCount = result.question_results.filter((q) => q.is_correct).length;
    const incorrectCount = result.question_results.length - correctCount;

    // Calculate dominant and weak cognitive performance levels from bloomBreakdown
    const bloomStats = result.bloom_breakdown.map((item) => ({
        bloomLevel: item.bloom_level,
        label: BloomLevelLabel[item.bloom_level],
        correct: item.correct,
        total: item.total_attempted_questions,
        percentage:
            item.total_attempted_questions > 0
                ? Math.round(
                    (item.correct /
                        item.total_attempted_questions) *
                    100
                )
                : 0,
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

    let weak: typeof sortedByFailure[number] | null =
        sortedByFailure[0] ?? null;
    if (dominant && weak && dominant.bloomLevel === weak.bloomLevel) {
        weak = sortedByFailure.length > 1
                ? sortedByFailure[1]
                : null;
    }

    return (
        <div className="flex flex-col gap-6 w-full lg:max-w-[90%] mx-auto lg:mx-0 px-4 sm:px-6 py-6 sm:py-8">

            {/* Page title */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold text-[#1a3a5a]">Resultados del Quiz</h1>
                <p className="text-base text-[#4a5565]">
                    Análisis detallado de tu dominio cognitivo del tema basado en la Taxonomía de Bloom.
                </p>
            </div>

            {/* Top row: score card + bloom breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 items-start ">

                <div className="flex flex-col gap-3">
                    {/* Score card */}
                    <Card className="flex flex-col items-center gap-4 !p-8  min-w-[350px]">
                        <h2 className="text-xl font-semibold text-[#1a3a5a] w-full text-center">
                            Puntaje Total
                        </h2>

                        <div className="flex flex-col items-center gap-1">
                            <p className="text-8xl font-semibold text-[#031632] leading-none tracking-tight">
                                {totalScore}
                            </p>
                            <p className="text-xl font-medium text-[#44474d]">puntos</p>
                        </div>

                        <div className="flex gap-6 pt-2">
                            {/* Correct */}
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={22} className="text-[#0d542b]" />
                                    <p className="text-2xl font-bold text-[#0d542b]">{correctCount}</p>
                                </div>
                                <p className="text-sm font-semibold text-[#4a5565] leading-tight">
                                    Preguntas<br />Correctas
                                </p>
                            </div>
                            {/* Incorrect */}
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex items-center gap-2">
                                    <XCircle size={22} className="text-[#82181a]" />
                                    <p className="text-2xl font-bold text-[#82181a]">{incorrectCount}</p>
                                </div>
                                <p className="text-sm font-semibold text-[#4a5565] leading-tight">
                                    Preguntas<br />Incorrectas
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Tip banner */}
                    <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 max-w-[350px]">
                        <Lightbulb size={18} className="text-blue-700 shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800">
                            <span className="font-semibold">Tip: </span>
                            Intenta repasar definiciones, conceptos clave y terminología antes de volver a evaluar este tema.
                        </p>
                    </div>
                </div>



                <div className="flex flex-col gap-4">
                    {/* Bloom breakdown */}
                    <Card className="flex flex-col gap-5 !p-6 min-h-[380px]">
                        <h2 className="text-xl font-semibold text-[#1a3a5a]">
                            Desempeño por Taxonomía de Bloom
                        </h2>
                        <div className="flex flex-col gap-5">
                            {bloomStats.length > 0 ? (
                                bloomStats.map((item) => (
                                    <QuizBloomResultBar
                                        key={item.bloomLevel}
                                        label={item.label}
                                        correct={item.correct}
                                        total={item.total}
                                    />
                                ))
                            ) : (
                                <p className="text-sm text-[#4a5565]">
                                    No hay datos disponibles.
                                </p>
                            )}
                        </div>
                    </Card>


                    {/* Bottom section: cognitive performance & CTA */}
                    <div className="flex flex-col lg:flex-row items-stretch gap-4">
                        {/* Rendimiento cognitivo card */}
                        <Card className="flex-1 flex flex-col gap-5 !p-6">
                            <h2 className="text-xl font-semibold text-[#1a3a5a]">Rendimiento cognitivo</h2>
                            {dominant ? (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <BloomSummaryCard
                                        variant="dominant"
                                        level={dominant.bloomLevel}
                                        percentage={dominant.percentage}
                                        answeredCount={dominant.total}
                                    />
                                    {weak && (
                                        <BloomSummaryCard
                                            variant="weak"
                                            level={weak.bloomLevel}
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
                    </div>
                    {/* CTA */}
                    <div className="flex items-center justify-evenly shrink-0">
                        <div className="max-w-2/4">
                            <Button onClick={() => navigate('/courses')} text={'Volver a mis cursos'} variant={'secondary'}/>
                        </div>

                        <div>
                            <Button onClick={() => navigate('/quizzes')} text={'Generar nuevo quiz'} variant={'primary'}/>
                        </div>

                    </div>


                </div>
                </div>

        </div>
    );
}
