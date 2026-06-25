import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, BarChart2, TrendingUp } from 'lucide-react';
import { useCourseDetail } from '../hook/useCourseDetail.ts';
import { CourseBloomSummaryCard } from '../components/courseBloomSummaryCard.tsx';
import { Card } from '../../../shared/components/ui/card.tsx';
import { FileDropzone } from '../../../shared/components/ui/fileDropzone.tsx';
import { HorizontalBarChart } from '../../../shared/components/ui/horizontalBarChart.tsx';
import { BloomRadarChart } from '../../../shared/components/ui/bloomRadarChart.tsx';
import { LineChart } from '../../../shared/components/ui/lineChart.tsx';
import type { BloomLevel } from '../../../shared/types/bloomLevel.ts';
import * as React from 'react';

const BLOOM_LEVELS: { key: keyof import('../types/course.types.ts').CourseBloomStats; bloomLevel: BloomLevel }[] = [
    { key: 'remember',   bloomLevel: 'remember' },
    { key: 'understand', bloomLevel: 'understand' },
    { key: 'apply',      bloomLevel: 'apply' },
    { key: 'analyze',    bloomLevel: 'analyze' },
    { key: 'evaluate',   bloomLevel: 'evaluate' },
];

export function CourseDetailPage() {
    const { courseId } = useParams<{ courseId: string }>();
    const { course } = useCourseDetail(courseId ?? '');

    const [syllabusFiles, setSyllabusFiles] = React.useState<File[]>([]);

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-text-subtle">
                <p className="text-lg font-semibold">Curso no encontrado.</p>
                <Link to="/courses" className="text-sm text-accent-button hover:underline flex items-center gap-1">
                    <ArrowLeft size={16} /> Regresar a Cursos
                </Link>
            </div>
        );
    }

    const radarData = [
        { level: 'Recordar',   value: course.bloomStats.remember },
        { level: 'Entender',   value: course.bloomStats.understand },
        { level: 'Aplicar',    value: course.bloomStats.apply },
        { level: 'Analizar',   value: course.bloomStats.analyze },
        { level: 'Evaluar',    value: course.bloomStats.evaluate },
        { level: 'Crear',      value: course.bloomStats.create },
    ];

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* Back button */}
            <Link
                to="/courses"
                className="flex items-center gap-2 text-text-subtle text-sm font-medium hover:text-text-title transition-colors w-fit"
            >
                <ArrowLeft size={18} />
                Regresar a Cursos
            </Link>

            {/* Course heading */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold text-text-title">{course.title}</h1>
                <p className="text-base text-text-subtle">{course.description}</p>
            </div>

            {/* Syllabus card */}
            <Card className="flex flex-col gap-4 !p-6">
                <h2 className="text-xl font-semibold text-text-title">Syllabus</h2>
                <FileDropzone
                    onFilesSelected={(files) => setSyllabusFiles((prev) => [...prev, ...files])}
                    maxFiles={1}
                    currentCount={syllabusFiles.length}
                />
                {syllabusFiles.length > 0 && (
                    <ul className="flex flex-col gap-1 text-sm text-text-body">
                        {syllabusFiles.map((f) => (
                            <li key={f.name} className="flex items-center gap-2">
                                <span className="text-accent-button">✓</span> {f.name}
                            </li>
                        ))}
                    </ul>
                )}
            </Card>

            {/* Rendimiento cognitivo card */}
            <Card className="flex flex-col gap-5 !p-6">
                <h2 className="text-xl font-semibold text-text-title">Rendimiento cognitivo</h2>

                {/* Dominant / Weak level summary */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <CourseBloomSummaryCard
                        variant="dominant"
                        level={course.dominantLevel}
                        percentage={course.dominantLevelPercentage}
                        answeredCount={course.dominantLevelAnswered}
                    />
                    <CourseBloomSummaryCard
                        variant="weak"
                        level={course.weakLevel}
                        percentage={course.weakLevelPercentage}
                        answeredCount={course.weakLevelAnswered}
                    />
                </div>

                {/* Bloom horizontal bar chart */}
                <div className="flex flex-col gap-3 px-2">
                    {BLOOM_LEVELS.map(({ key, bloomLevel }) => (
                        <HorizontalBarChart
                            key={bloomLevel}
                            bloomLevel={bloomLevel}
                            percentage={course.bloomStats[key]}
                        />
                    ))}
                </div>
            </Card>

            {/* Tip banner */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-4">
                <Lightbulb size={18} className="text-blue-700 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                    <span className="font-semibold">Tip: </span>
                    {course.tip}
                </p>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Bloom radar chart */}
                <Card className="flex flex-col gap-4 !p-6">
                    <div className="flex items-center gap-2">
                        <BarChart2 size={20} className="text-text-subtle" />
                        <h3 className="text-lg font-semibold text-text-title">
                            Rendimiento por Taxonomía de Bloom
                        </h3>
                    </div>
                    <BloomRadarChart data={radarData} />
                    <div className="flex items-center gap-2 text-sm text-[#dc4b4b]">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#dc4b4b] opacity-60" />
                        Puntuación (%)
                    </div>
                </Card>

                {/* Progress over time line chart */}
                <Card className="flex flex-col gap-4 !p-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={20} className="text-text-subtle" />
                        <h3 className="text-lg font-semibold text-text-title">
                            Progreso en el tiempo
                        </h3>
                    </div>
                    <LineChart data={course.progressOverTime} />
                </Card>

            </div>
        </div>
    );
}
