import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, BarChart2, TrendingUp, Pencil } from 'lucide-react';
import { useState } from 'react';

import { BloomSummaryCard } from '../../../shared/components/ui/bloomSummaryCard.tsx';
import { Card } from '../../../shared/components/ui/card.tsx';
import { FileDropzone } from '../../../shared/components/ui/fileDropzone.tsx';
import { HorizontalBarChart } from '../../../shared/components/ui/horizontalBarChart.tsx';
import { BloomRadarChart } from '../../../shared/components/ui/bloomRadarChart.tsx';
import { LineChart } from '../../../shared/components/ui/lineChart.tsx';

import type { BloomLevel } from '../../../shared/types/bloomLevel.ts';
import { UseCourseDetail } from "../hook/useCourseDetail.ts";
import { useCourseDocuments } from "../../../shared/hooks/useCourseDocuments.ts";
import { useUploadSyllabus } from "../hook/useUploadSyllabus.ts";
import { ManageCourseModal } from "../components/ManageCourseModal.tsx";
import { toCourseDetail } from "../../../shared/utils/courseDisplay.ts";
import { deleteCourse } from "../services/courseService.ts";
import { Modal } from '../../../shared/components/ui/modal.tsx';
import { Button } from '../../../shared/components/ui/button.tsx';

const BLOOM_LEVELS: {
    key: keyof import('../types/course.types.ts').CourseBloomStats;
    bloomLevel: BloomLevel;
}[] = [
        { key: 'remember', bloomLevel: 'remember' },
        { key: 'understand', bloomLevel: 'understand' },
        { key: 'apply', bloomLevel: 'apply' },
        { key: 'analyze', bloomLevel: 'analyze' },
        { key: 'evaluate', bloomLevel: 'evaluate' },
    ];

export function CourseDetailPage() {
    const { courseId } = useParams<{ courseId: string }>();
    const numericCourseId = Number(courseId);

    const { course, isLoading, setCourse } = UseCourseDetail(numericCourseId);
    const { uploadSyllabus } = useUploadSyllabus(numericCourseId);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

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
    const {
        syllabus,
        addDocument,
        removeDocument,
    } = useCourseDocuments(numericCourseId);

    if (isLoading) {
        return <div>Cargando curso...</div>;
    }

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
        { level: 'Recordar', value: course.bloomStats.remember },
        { level: 'Entender', value: course.bloomStats.understand },
        { level: 'Aplicar', value: course.bloomStats.apply },
        { level: 'Analizar', value: course.bloomStats.analyze },
        { level: 'Evaluar', value: course.bloomStats.evaluate },
        { level: 'Crear', value: course.bloomStats.create },
    ];

    return (
        <div className="flex flex-col gap-6 w-full">

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

                {!syllabus ? (
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
                    <div className="flex items-center justify-between border rounded p-3">
                        <span className="text-sm text-text-body">
                            {syllabus.title}
                        </span>

                        <button
                            onClick={() => removeDocument(syllabus.id)}
                            className="text-red-600 text-sm hover:underline"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </Card>

            <Card className="flex flex-col gap-5 !p-6">
                <h2 className="text-xl font-semibold text-text-title">
                    Rendimiento cognitivo
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    <BloomSummaryCard
                        variant="dominant"
                        level={course.dominantLevel}
                        percentage={course.dominantLevelPercentage}
                        answeredCount={course.dominantLevelAnswered}
                    />
                    <BloomSummaryCard
                        variant="weak"
                        level={course.weakLevel}
                        percentage={course.weakLevelPercentage}
                        answeredCount={course.weakLevelAnswered}
                    />
                </div>

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
                    <div className="flex items-center gap-2">
                        <TrendingUp size={20} className="text-text-subtle" />
                        <h3 className="text-lg font-semibold text-text-title">
                            Progreso en el tiempo
                        </h3>
                    </div>

                    <LineChart data={course.progressOverTime} />
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
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${isDeleting ? 'bg-red-400 cursor-not-allowed text-white' : 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'}`}
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}