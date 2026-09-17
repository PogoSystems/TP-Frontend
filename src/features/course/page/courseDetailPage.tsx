import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, BarChart2, TrendingUp, Pencil, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useState } from 'react';

import { BloomSummaryCard } from '../../../shared/components/ui/bloomSummaryCard.tsx';
import { Card } from '../../../shared/components/ui/card.tsx';
import { FileDropzone } from '../../../shared/components/ui/fileDropzone.tsx';
import { HorizontalBarChart } from '../../../shared/components/ui/horizontalBarChart.tsx';
import { BloomRadarChart } from '../../../shared/components/ui/bloomRadarChart.tsx';
import { LineChart } from '../../../shared/components/ui/lineChart.tsx';
import { UseCourseDetail } from "../hook/useCourseDetail.ts";
import { useCourseDocuments } from "../../../shared/hooks/useCourseDocuments.ts";
import { useUploadSyllabus } from "../hook/useUploadSyllabus.ts";
import { useCourseQuizzes } from "../hook/useCourseQuizzes.ts";
import { ManageCourseModal } from "../components/ManageCourseModal.tsx";
import { toCourseDetail } from "../../../shared/utils/courseDisplay.ts";
import { deleteCourse } from "../services/courseService.ts";
import { Modal } from '../../../shared/components/ui/modal.tsx';
import { Button } from '../../../shared/components/ui/button.tsx';
import { useCourseAnalytics } from "../hook/useCourseAnalytics.ts";
import { BloomLevel } from "../../../shared/types/bloomLevel.ts";
import { useCourseProgress } from "../hook/useCourseProgress.ts";
import { ProgressGranularity } from "../../../shared/utils/progress.ts";
import {LoadSpinner} from "../../../shared/components/ui/loadSpinner.tsx";
import {CourseDetailSkeleton} from "../components/CourseDetailSkeleton.tsx";

export function CourseDetailPage() {
    const { courseId } = useParams<{ courseId: string }>();
    const numericCourseId = Number(courseId);

    const { course, isLoading, setCourse } = UseCourseDetail(numericCourseId);
    const { analytics, isLoading: loadingAnalytics } = useCourseAnalytics(numericCourseId);
    const { uploadSyllabus, isUploading: isUploadingSyllabus } = useUploadSyllabus(numericCourseId);
    const {
        quizzes,
        isLoading: loadingQuizzes,
        isQuizzesExpanded,
        isLoadingQuiz,
        toggleQuizzes,
        handleRetryQuiz
    } = useCourseQuizzes(numericCourseId);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const BLOOM_LEVELS: BloomLevel[] = Object.values(BloomLevel);
    const { progress, granularity, setGranularity } = useCourseProgress(numericCourseId);

    const progressData = progress?.points.map((point) => ({
        label: point.label,
        score: point.accuracy,
    })) ?? [];

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteCourse(numericCourseId);
            navigate('/courses');
        } catch (error) {
            console.error("Failed to delete course", error);
            setIsDeleting(false);
        }
    };
    const { syllabus, addDocument, removeDocument } = useCourseDocuments(numericCourseId);

    // Carga inicial
    if (isLoading || loadingAnalytics) {
        return <CourseDetailSkeleton />;
    }

    if (!course || !analytics) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-text-subtle py-12">
                <p className="text-lg font-semibold">Curso no encontrado.</p>
                <Link to="/courses" className="text-sm text-accent-button hover:underline flex items-center gap-1">
                    <ArrowLeft size={16} /> Regresar a Cursos
                </Link>
            </div>
        );
    }

    const bloomMap = Object.fromEntries(analytics.bloom_breakdown.map(b => [b.bloom_level, b.percentage])
    ) as Record<string, number>;

    const radarData = analytics.bloom_breakdown.map((b) => ({
        level: b.bloom_level,
        value: Math.round(b.percentage),
    }));

    return (
        <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto min-w-0 pb-10">

            <Link
                to="/courses"
                className="flex items-center gap-2 text-text-subtle text-sm font-medium hover:text-text-title transition-colors w-fit"
            >
                <ArrowLeft size={18} />
                Regresar a Cursos
            </Link>

            <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-semibold text-text-title">{course.title}</h1>
                    <p className="text-base text-text-subtle">{course.description}</p>
                </div>
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="text-text-subtle hover:text-text-title transition-colors mt-2 mr-2 cursor-pointer"
                >
                    <Pencil size={20} />
                </button>
            </div>

            <ManageCourseModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                mode="edit"
                initialData={{ id: numericCourseId, name: course.title, description: course.description }}
                onCourseUpdated={(updated) => {
                    setCourse(toCourseDetail(updated));
                }}
            />

            <Card className="flex flex-col gap-4 !p-6">
                <h2 className="text-xl font-semibold text-text-title">Syllabus</h2>

                {isUploadingSyllabus ? (
                    <div className="flex flex-row items-center justify-center gap-2 py-8 border border-dashed rounded-lg border-gray-300">
                        <LoadSpinner width={32} height={32} />
                        <span className="text-sm text-text-subtle font-medium">Subiendo syllabus...</span>
                    </div>
                ) : !syllabus ? (
                    <FileDropzone
                        onFilesSelected={async (files) => {
                            const file = files[0];
                            if (!file) return;

                            const created = await uploadSyllabus(file);
                            addDocument(created);
                        }}
                        maxFiles={1}
                        currentCount={0}
                    />
                ) : (
                    <div className="flex items-center justify-between border border-border-card rounded p-3">
            <span className="text-sm text-text-body">
                {syllabus.title}
            </span>

                        <button
                            onClick={() => removeDocument(syllabus.id)}
                            className="text-red-600 text-sm hover:underline cursor-pointer"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </Card>

            {/* Reintentar Cuestionarios Section */}
            <div className="flex flex-col gap-3">
                <button
                    onClick={toggleQuizzes}
                    className="w-full flex items-center justify-between p-4 bg-white border border-[#e5e7eb] rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2  text-blue-600 rounded-lg">
                            <RotateCcw size={20} />
                        </div>
                        <span className="font-medium text-text-title">Reintentar cuestionarios pasados</span>
                    </div>
                    {isQuizzesExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                </button>

                {isQuizzesExpanded && (
                    <Card className="flex flex-col gap-3 !p-4 border border-gray-200">
                        {loadingQuizzes ? (
                            <div className="flex justify-center items-center gap-1 py-6">
                                <LoadSpinner width={32} height={32} />
                                <p>Cargando lista de cuestionarios...</p>
                            </div>
                        ) : quizzes.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No hay cuestionarios previos para este curso.</p>
                        ) : (
                            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2">
                                {quizzes.map((q) => (
                                    <button
                                        key={q.id}
                                        onClick={() => handleRetryQuiz(q.id)}
                                        disabled={isLoadingQuiz !== null}
                                        className={`flex items-center justify-between p-3 border rounded-lg transition-colors text-left
                                            ${isLoadingQuiz === q.id ? 'bg-gray-50 border-blue-200' : 'bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30'}
                                            ${isLoadingQuiz !== null && isLoadingQuiz !== q.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                        `}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-text-title text-sm">{q.title}</span>
                                            <span className="text-xs text-text-subtle">
                                                {new Date(q.created_at).toLocaleString('es-ES', {
                                                    day: '2-digit', month: '2-digit', year: 'numeric',
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                        {isLoadingQuiz === q.id && (
                                            <LoadSpinner width={20} height={20} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </Card>
                )}
            </div>

            <Card className="flex flex-col gap-5 !p-6">
                <h2 className="text-xl font-semibold text-text-title">
                    Rendimiento cognitivo
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    <BloomSummaryCard
                        variant="dominant"
                        level={analytics.dominant_level}
                        percentage={analytics.dominant_percentage}
                        answeredCount={analytics.dominant_correct}
                    />
                    <BloomSummaryCard
                        variant="weak"
                        level={analytics.weak_level}
                        percentage={analytics.weak_percentage}
                        answeredCount={analytics.weak_correct}
                    />
                </div>

                <div className="flex flex-col gap-3 px-2">
                    {BLOOM_LEVELS.map((level) => (
                        <HorizontalBarChart
                            key={level}
                            bloomLevel={level}
                            percentage={bloomMap[level] ?? 0}
                        />
                    ))}
                </div>
            </Card>

            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-4">
                <Lightbulb size={18} className="text-blue-700 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                    <span className="font-semibold">Tip: </span>
                    {course.tip}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

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

                <Card className="flex flex-col gap-4 !p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={20} className="text-text-subtle" />
                            <h3 className="text-lg font-semibold text-text-title">
                                Progreso en el tiempo
                            </h3>
                        </div>

                        <select value={granularity}
                                onChange={(e) =>
                                    setGranularity(e.target.value as typeof granularity)
                                }
                                className="rounded-lg px-3 py-2 text-sm bg-white border border-gray-300">

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

                    <LineChart data={progressData} />
                </Card>

            </div>

            <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="w-full mt-4 py-3 border border-red-200 text-gray-400 font-medium rounded-xl transition-colors hover:bg-red-500 hover:text-white cursor-pointer hover:border-red-500"
            >
                Eliminar curso
            </button>

            <Modal isOpen={isDeleteModalOpen} onClose={() => !isDeleting && setIsDeleteModalOpen(false)}>
                <h2 className="text-text-title text-lg font-semibold mb-4">Eliminar curso</h2>
                <p className="text-text-subtle mb-8">
                    ¿Estás seguro de que quieres eliminar este curso? Esta acción no se puede revertir y se perderá toda la información y documentos asociados.
                </p>
                <div className="flex flex-row justify-end gap-4">
                    <div>
                        <Button text="Cancelar" variant="secondary" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting} />
                    </div>
                    <div>
                        <button
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                                isDeleting ? 'bg-red-400 cursor-not-allowed text-white' : 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
                            }`}
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <LoadSpinner width={18} height={18} monochrome />
                                    <span>Eliminando...</span>
                                </>
                            ) : (
                                "Sí, eliminar"
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}