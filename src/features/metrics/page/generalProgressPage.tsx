import { Link } from 'react-router-dom';
import { TrendingUp, BarChart2, ChevronRight } from 'lucide-react';

import { useUserMetrics } from '../hook/useUserMetrics.ts';

import { Card } from '../../../shared/components/ui/card.tsx';
import { BloomSummaryCard } from '../../../shared/components/ui/bloomSummaryCard.tsx';
import { LineChart } from '../../../shared/components/ui/lineChart.tsx';

import { StatKpiCard } from '../components/StatKpiCard.tsx';
import { CourseProgressRow } from '../components/CourseProgressRow.tsx';
import { BloomCoverageRow } from '../components/BloomCoverageRow.tsx';
import { BloomBarChart } from '../components/BloomBarChart.tsx';
import {BloomLevelLabel} from "../../../shared/types/bloomLevel.ts";
import {ProgressGranularity} from "../../../shared/utils/progress.ts";
import {useUserProgress} from "../hook/useUserProgress.ts";

export function GeneralProgressPage() {
    const { metrics, isLoading, error } = useUserMetrics();
    const {progress, granularity, setGranularity} = useUserProgress();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64 text-text-subtle">
                Cargando métricas...
            </div>
        );
    }

    if (error || !metrics) {
        return (
            <div className="flex items-center justify-center h-64 text-red-500">
                {error ?? 'No se pudieron cargar las métricas.'}
            </div>
        );
    }

    const totalActiveCourses = metrics.course_performance.length;
    const maxAttempted = metrics.bloom_breakdown.reduce(
        (max, b) => Math.max(max, b.questions_attempted),
        0,
    );

    const progressData =
        progress?.points.map((point) => ({
            label: point.label,
            score: point.accuracy,
        })) ?? [];

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* ── Header ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold text-[#1a3a5a]">Progreso General</h1>
                <p className="text-base text-[#4a5565]">Analiza tu rendimiento y progreso cognitivo</p>
            </div>

            {/* ── KPI Row ────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-6">

                {/* Rendimiento general */}
                <StatKpiCard title="Rendimiento general" value={`${metrics.overall_accuracy}%`} isMain>
                    <div className="bg-[#e5e7eb] rounded-full h-[7px] w-full overflow-hidden">
                        <div
                            className="bg-[#db1a1a] h-[7px] rounded-full transition-all duration-500"
                            style={{ width: `${metrics.overall_accuracy}%` }}
                        />
                    </div>
                </StatKpiCard>

                {/* Cuestionarios realizados */}
                <StatKpiCard title="Cuestionarios realizados" value={metrics.quizzes_completed}>
                    <div className="flex gap-2 mt-1">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[7px] rounded-full flex-1"
                                style={{
                                    backgroundColor: i < Math.min(Math.ceil(metrics.quizzes_completed / 15), 4)
                                        ? '#1a3a5a'
                                        : '#e5e7eb',
                                }}
                            />
                        ))}
                    </div>
                </StatKpiCard>

                {/* Cursos activos */}
                <StatKpiCard title="Cursos activos" value={totalActiveCourses}>
                    <div className="flex gap-1 mt-1 flex-wrap">
                        {metrics.course_performance.slice(0, 3).map((c) => {
                            const initials = c.course_name
                                .split(' ')
                                .filter(Boolean)
                                .slice(0, 2)
                                .map((w) => w[0].toUpperCase())
                                .join('');
                            const colors = ['#f05a5a', '#2e6f95', '#f28f3b', '#1a3a5a'];
                            const colorIdx = c.course_id % colors.length;
                            return (
                                <div
                                    key={c.course_id}
                                    className="flex items-center justify-center rounded-[5px] text-white text-[8px] font-semibold border border-white"
                                    style={{ width: 20, height: 21, backgroundColor: colors[colorIdx] }}
                                    title={c.course_name}
                                >
                                    {initials}
                                </div>
                            );
                        })}
                        {totalActiveCourses  > 3 && (
                            <div className="flex items-center justify-center rounded-[5px] bg-[#1a3a5a] text-[#e5e7eb] text-[8px] font-semibold border border-white"
                                style={{ width: 20, height: 21 }}
                            >
                                +{totalActiveCourses  - 3}
                            </div>
                        )}
                    </div>
                </StatKpiCard>
            </div>

            {/* ── Main Grid ──────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-6">

                    {/* Rendimiento por curso */}
                    <Card className="flex flex-col gap-6 !p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-[#1a3a5a]">Rendimiento por curso</h2>
                            <Link
                                to="/courses"
                                className="flex items-center gap-1 text-[#8997a5] text-sm font-medium hover:text-[#1a3a5a] transition-colors"
                            >
                                Ver todos
                                <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            {metrics.course_performance.map((course) => (
                                <CourseProgressRow
                                    key={course.course_id}
                                    courseName={course.course_name}
                                    quizzesCompleted={course.quizzes_completed}
                                    accuracyPercentage={course.accuracy_percentage}
                                />
                            ))}
                        </div>
                    </Card>

                    {/* Rendimiento por nivel de Bloom */}
                    <Card className="flex flex-col gap-4 !p-6">
                        <div className="flex items-center gap-2">
                            <BarChart2 size={20} className="text-text-subtle" />
                            <h2 className="text-lg font-semibold text-[#1a3a5a]">
                                Rendimiento por nivel de Bloom
                            </h2>
                        </div>

                        <BloomBarChart data={metrics.bloom_breakdown} />

                        <div className="flex items-center gap-2 text-sm text-[#2e6f95]">
                            <span className="inline-block w-3 h-3 rounded-full bg-[#2e6f95] opacity-80" />
                            Score (%)
                        </div>
                    </Card>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-6">

                    {/* Rendimiento cognitivo */}
                    <Card className="flex flex-col gap-4 !p-6">
                        <h2 className="text-lg font-semibold text-[#1a3a5a]">Rendimiento cognitivo</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <BloomSummaryCard
                                variant="dominant"
                                level={metrics.dominant_level}
                                percentage={metrics.dominant_percentage}
                                answeredCount={metrics.dominant_correct}
                            />
                            <BloomSummaryCard
                                variant="weak"
                                level={metrics.weak_level}
                                percentage={metrics.weak_percentage}
                                answeredCount={metrics.weak_correct}
                            />
                        </div>
                    </Card>

                    {/* Cobertura cognitiva por nivel */}
                    <Card className="flex flex-col gap-4 !p-6">
                        <h2 className="text-lg font-semibold text-[#1a3a5a]">Cobertura cognitiva por nivel</h2>
                        <div className="flex flex-col gap-3">
                            {metrics.bloom_breakdown
                                .slice()
                                .sort((a, b) => b.questions_attempted - a.questions_attempted)
                                .map((b) => (
                                    <BloomCoverageRow
                                        key={b.bloom_level}
                                        level={b.bloom_level}
                                        questionsAttempted={b.questions_attempted}
                                        maxAttempted={maxAttempted}
                                    />
                                ))}
                        </div>
                    </Card>

                    {/* Nivel más practicado */}
                    <Card className="flex flex-col gap-2 !p-6">
                        <p className="text-sm font-semibold text-[#4a5565]">Nivel más practicado</p>
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                            <p className="text-3xl font-bold text-[#1a3a5a] uppercase tracking-wide">
                                {metrics.most_practiced_level ? BloomLevelLabel[metrics.most_practiced_level] : '—'}
                            </p>
                            <p className="text-sm text-[#4a5565] shrink-0">
                                {metrics.most_practiced_attempted}% de las preguntas
                            </p>
                        </div>
                    </Card>
                </div>
            </div>

            {/* ── Progreso en el tiempo (full width) ─────────────── */}
            <Card className="flex flex-col gap-5 !p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={20} className="text-text-subtle"/>
                        <h2 className="text-lg font-semibold text-[#1a3a5a]">
                            Progreso en el tiempo
                        </h2>
                    </div>

                    <select value={granularity}
                        onChange={(e) =>
                            setGranularity(e.target.value as typeof granularity)
                        }
                        className=" rounded-lg px-3py-2 text-smbg-whiteborder-gray-300">

                        <option value={ProgressGranularity.WEEK}>
                            Semanas
                        </option>
                        <option value={ProgressGranularity.MONTH}>
                            Meses
                        </option>
                        <option value={ProgressGranularity.YEAR}>
                            Años
                        </option>
                    </select>
                </div>
                <LineChart data={progressData}/>
            </Card>

        </div>
    );
}
