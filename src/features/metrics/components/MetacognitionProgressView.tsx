import { useState } from 'react';
import {TrendingUp, BarChart2, ArrowLeft, Brain, BookOpenIcon} from 'lucide-react';
import { useMetacognition } from '../hook/useMetacognition';
import { Card } from '../../../shared/components/ui/card';
import { ErrorState } from '../../../shared/components/ui/errorState';
import { StatKpiCard } from './StatKpiCard';
import { MetacognitionCourseRow } from './MetacognitionCourseRow';
import { MetacognitionBloomChart } from './MetacognitionBloomChart';
import { MetacognitionBloomRow } from './MetacognitionBloomRow';
import { MetacognitionRecentAttempts } from './MetacognitionRecentAttempts';
import { MetacognitionSummaryCard } from './MetacognitionSummaryCard';
import { MetacognitionLineChart } from './MetacognitionLineChart';
import { MetacognitionSkeleton } from './MetacognitionSkeleton';
import type { MetacognitionBias } from '../types/metacognition.types';
import {EmptyState} from "../../../shared/components/ui/emptyState.tsx";

export function MetacognitionProgressView() {
    const {
        summary,
        courseDetail,
        bloomBreakdown,
        progress,
        selectedCourseId,
        setSelectedCourseId,
        granularity,
        setGranularity,
        isLoading,
        error,
        refetch,
    } = useMetacognition();

    const [maxVisibleCourses] = useState(4);

    if (isLoading) {
        return <MetacognitionSkeleton />;
    }

    if (error || (!summary && !courseDetail)) {
        return (
            <ErrorState
                title="Oops, no se pudieron cargar los datos"
                subtitle="Ocurrió un error al obtener tus métricas de autoevaluación"
                message={typeof error === 'string' ? error : undefined}
                onRetry={refetch}
            />
        );
    }

    // Active KPIs depending on whether a course is selected
    const activeAccuracy = courseDetail
        ? courseDetail.calibration_accuracy_percentage
        : summary?.calibration_accuracy_percentage ?? 0;

    const activeExpected = courseDetail
        ? courseDetail.average_expected
        : summary?.average_expected ?? 0;

    const activeActual = courseDetail
        ? courseDetail.average_actual
        : summary?.average_actual ?? 0;

    const activeBias: MetacognitionBias = courseDetail
        ? courseDetail.bias
        : summary?.bias ?? 'calibrated';

    const activeQuizzes = courseDetail
        ? courseDetail.quizzes_evaluated
        : summary?.total_evaluated_quizzes ?? 0;

    const activeGap = courseDetail
        ? Math.round((courseDetail.average_expected - courseDetail.average_actual) * 10) / 10
        : summary?.bias_gap ?? 0;

    // Highest/lowest calibrated Bloom levels
    const sortedBloom = [...bloomBreakdown].sort(
        (a, b) => b.calibration_accuracy - a.calibration_accuracy
    );
    const mostCalibrated = sortedBloom[0] ?? null;
    const mostBiased = sortedBloom.length > 1 ? sortedBloom[sortedBloom.length - 1] : null;

    const maxAttempted = bloomBreakdown.reduce(
        (max, b) => Math.max(max, b.questions_attempted),
        0
    );

    const activeCourseName =
        courseDetail?.course_name ??
        summary?.course_breakdown.find((c) => c.course_id === selectedCourseId)?.course_name;

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header / Course contextual banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold text-[#1a3a5a]">Progreso Metacognitivo</h2>
                    <p className="text-sm text-[#4a5565]">
                        Analiza tu autoevaluación, precisión de calibración y sesgo de juicio predictivo
                    </p>
                </div>
            </div>

            {/* Empty State when no prediction quizzes exist */}
            {summary?.total_evaluated_quizzes === 0 && (
                <EmptyState
                    variant="card"
                    icon={Brain}
                    title="Aún no hay predicciones registradas"
                    description="Para ver tu analítica metacognitiva, ingresa tu estimación de respuestas antes de rendir un cuestionario"
                    actionText="Realizar cuestionario"
                    actionLink="/quizzes"
                />
            )}

            {summary && summary.total_evaluated_quizzes > 0 && (
                <>
                    {/* ── KPI Row ────────────────────────────────────────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* KPI 1: Calibración */}
                        <StatKpiCard
                            title={selectedCourseId ? `Calibración en ${activeCourseName}` : 'Calibración general'}
                            value={`${Math.round(activeAccuracy * 10) / 10}%`}
                            isMain
                        >
                            <div className="bg-[#e5e7eb] rounded-full h-[7px] w-full overflow-hidden">
                                <div
                                    className="bg-[#2e6f95] h-[7px] rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(Math.max(activeAccuracy, 0), 100)}%` }}
                                />
                            </div>
                            <span className="text-[11px] text-[#64748b]">
                                {activeAccuracy >= 75
                                    ? 'Alta concordancia con tus resultados'
                                    : 'Brecha detectable entre expectativa y realidad'}
                            </span>
                        </StatKpiCard>

                        {/* KPI 2: Sesgo de Juicio */}
                        <StatKpiCard title="Sesgo de juicio" value={activeBias === 'overconfident' ? 'Sobreestima' : activeBias === 'underconfident' ? 'Subestima' : 'Calibrado'}>
                            <div className="flex items-center justify-between gap-2 pt-0.5">
                                <div className="flex items-center gap-1.5 text-xs text-[#4a5565]">
                                    <span>Esp: <strong>{activeExpected}</strong></span>
                                    <span>|</span>
                                    <span>Real: <strong>{activeActual}</strong></span>
                                </div>
                                <span
                                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeGap > 0
                                        ? 'bg-[#fff7ed] text-[#ea580c]'
                                        : activeGap < 0
                                            ? 'bg-[#eff6ff] text-[#2563eb]'
                                            : 'bg-[#ecfdf5] text-[#059669]'
                                        }`}
                                >
                                    {activeGap > 0 ? `+${activeGap}` : activeGap} pts
                                </span>
                            </div>
                        </StatKpiCard>

                        {/* KPI 3: Cuestionarios Evaluados */}
                        <StatKpiCard title="Quizzes evaluados" value={activeQuizzes}>
                            <div className="flex gap-2 mt-1">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-[7px] rounded-full flex-1"
                                        style={{
                                            backgroundColor:
                                                i < Math.min(Math.ceil(activeQuizzes / 5), 4)
                                                    ? '#1a3a5a'
                                                    : '#e5e7eb',
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="text-[11px] text-[#64748b]">Con autoevaluación predictiva</span>
                        </StatKpiCard>
                    </div>

                    {/* ── Main Grid ──────────────────────────────────────── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* LEFT COLUMN */}
                        <div className="flex flex-col gap-6">
                            {/* Card A: Calibración por Curso O Intentos Recientes si hay curso seleccionado */}
                            {selectedCourseId ? (
                                <Card className="flex flex-col gap-4 !p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-0.5">
                                            <h3 className="text-lg font-semibold text-[#1a3a5a]">
                                                Intentos recientes
                                            </h3>
                                            <p className="text-xs text-[#64748b]">
                                                {activeCourseName} (últimos 2 exámenes)
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setSelectedCourseId(null)}
                                            className="flex items-center gap-2 text-sm font-medium text-[#2e6f95] hover:text-[#1a3a5a] hover:underline transition-colors cursor-pointer shrink-0"
                                        >
                                            <ArrowLeft size={18} />
                                            Volver a vista general
                                        </button>
                                    </div>

                                    <MetacognitionRecentAttempts
                                        attempts={courseDetail?.recent_attempts ?? []}
                                    />
                                </Card>
                            ) : (
                                <Card className="flex flex-col gap-5 !p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-[#1a3a5a]">
                                            Calibración por curso
                                        </h3>
                                        <span className="text-xs text-[#64748b]">
                                            Selecciona para filtrar
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1">
                                        {summary.course_breakdown.map((course) => (
                                            <MetacognitionCourseRow
                                                key={course.course_id}
                                                courseId={course.course_id}
                                                courseName={course.course_name}
                                                quizzesEvaluated={course.quizzes_evaluated}
                                                calibrationPercentage={course.calibration_accuracy_percentage}
                                                bias={course.bias}
                                                isSelected={selectedCourseId === course.course_id}
                                                onSelect={(id) => setSelectedCourseId(id)}
                                            />
                                        ))}

                                        {summary.course_breakdown.length === 0 && (
                                            <p className="text-xs text-center text-[#8997a5] py-4">
                                                No hay cursos con autoevaluación aún.
                                            </p>
                                        )}
                                    </div>

                                    {summary.course_breakdown.length > maxVisibleCourses && (
                                        <p className="text-xs text-center text-[#8997a5] pt-1">
                                            Mostrando {summary.course_breakdown.length} cursos evaluados.
                                        </p>
                                    )}
                                </Card>
                            )}

                            {/* Card B: Calibración por nivel de Bloom */}
                            <Card className="flex flex-col gap-4 !p-6">
                                <div className="flex items-center gap-2">
                                    <BarChart2 size={20} className="text-[#2e6f95]" />
                                    <h3 className="text-lg font-semibold text-[#1a3a5a]">
                                        Precisión de calibración por nivel de Bloom
                                    </h3>
                                </div>

                                <MetacognitionBloomChart data={bloomBreakdown} />

                                <div className="flex items-center justify-between text-xs text-[#4a5565] pt-2 border-t border-gray-100 flex-wrap gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#2e6f95]" />
                                        <span>Calibrado (≥75%)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
                                        <span>Descalibración media</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#e95858]" />
                                        <span>Alta sobreestimación (&lt;50%)</span>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex flex-col gap-6">
                            {/* Card C: Diagnóstico Metacognitivo */}
                            <Card className="flex flex-col gap-4 !p-6">
                                <h3 className="text-lg font-semibold text-[#1a3a5a]">
                                    Diagnóstico cognitivo
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <MetacognitionSummaryCard
                                        variant="calibrated"
                                        level={mostCalibrated ? mostCalibrated.bloom_level : null}
                                        percentage={mostCalibrated ? mostCalibrated.calibration_accuracy : 0}
                                        subtitle={
                                            mostCalibrated
                                                ? `${mostCalibrated.questions_attempted} preguntas evaluadas`
                                                : undefined
                                        }
                                    />
                                    <MetacognitionSummaryCard
                                        variant="biased"
                                        level={mostBiased ? mostBiased.bloom_level : null}
                                        percentage={mostBiased ? mostBiased.calibration_accuracy : 0}
                                        subtitle={
                                            mostBiased
                                                ? `${mostBiased.questions_attempted} preguntas evaluadas`
                                                : undefined
                                        }
                                    />
                                </div>
                            </Card>

                            {/* Card D: Comparativa esperada vs real por nivel */}
                            <Card className="flex flex-col gap-4 !p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-[#1a3a5a]">
                                        Comparativa esperada vs real
                                    </h3>
                                    <span className="text-xs text-[#64748b]">Por taxonomía</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {bloomBreakdown.map((b) => (
                                        <MetacognitionBloomRow
                                            key={b.bloom_level}
                                            data={b}
                                            maxAttempted={maxAttempted}
                                        />
                                    ))}
                                    {bloomBreakdown.length === 0 && (
                                        <p className="text-xs text-center text-[#8997a5] py-4">
                                            Sin datos disponibles por nivel de Bloom.
                                        </p>
                                    )}
                                </div>
                            </Card>

                            {/* Card E: Tendencia de juicio */}
                            <Card className="flex flex-col gap-2 !p-6">
                                <p className="text-sm font-semibold text-[#4a5565]">
                                    Tendencia de juicio predominante
                                </p>
                                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                                    <p className="text-3xl font-bold text-[#1a3a5a] uppercase tracking-wide">
                                        {activeBias === 'overconfident'
                                            ? 'SOBREESTIMACIÓN'
                                            : activeBias === 'underconfident'
                                                ? 'SUBESTIMACIÓN'
                                                : 'CALIBRACIÓN ÓPTIMA'}
                                    </p>
                                    <p className="text-sm text-[#4a5565] shrink-0">
                                        {activeGap !== 0
                                            ? `Brecha de ${Math.abs(activeGap)} pts vs realidad`
                                            : 'Proyección alineada a tu resultado'}
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* ── Progreso en el tiempo (full width) ─────────────── */}
                    <Card className="flex flex-col gap-5 !p-6">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={20} className="text-[#2e6f95]" />
                                <h3 className="text-lg font-semibold text-[#1a3a5a]">
                                    Evolución de la calibración en el tiempo
                                </h3>
                                {selectedCourseId && (
                                    <span className="text-xs bg-gray-100 text-[#1a3a5a] font-medium px-2.5 py-0.5 rounded-full">
                                        {activeCourseName}
                                    </span>
                                )}
                            </div>

                            <select
                                value={granularity}
                                onChange={(e) => setGranularity(e.target.value as 'week' | 'month')}
                                className="rounded-lg px-3 py-2 text-sm bg-white border border-gray-300 cursor-pointer"
                            >
                                <option value="week">Semanas</option>
                                <option value="month">Meses</option>
                            </select>
                        </div>

                        <MetacognitionLineChart points={progress?.points ?? []} />
                    </Card>
                </>
            )}
        </div>
    );
}
