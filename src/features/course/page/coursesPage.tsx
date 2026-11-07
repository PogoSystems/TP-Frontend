import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpenIcon, Plus } from "lucide-react";
import { Button } from "../../../shared/components/ui/button.tsx";
import { CardCourse } from "../../../shared/components/ui/cardCourse.tsx";
import { EmptyState } from "../../../shared/components/ui/emptyState.tsx";
import { ErrorState } from "../../../shared/components/ui/errorState.tsx";
import { Toast, type ToastType } from "../../../shared/components/ui/toast.tsx";
import { ManageCourseModal } from "../components/ManageCourseModal.tsx";
import { UseCourseList } from "../hook/useCourseList.ts";
import { CourseCardSkeleton } from "../../../shared/components/ui/skeletons.tsx";

export function CoursesPage() {
    const { courses, isLoading, error, addCourse, refetch } = UseCourseList();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: ToastType }>({
        isOpen: false,
        message: "",
        type: "success"
    });

    const triggerToast = (message: string, type: ToastType = "success") => {
        setToast({ isOpen: true, message, type });
    };

    useEffect(() => {
        if (location.state?.toastMessage) {
            triggerToast(
                location.state.toastMessage,
                location.state.toastType || "success"
            );

            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <div className="flex flex-col min-h-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-3xl sm:text-4xl text-text-title">Mis cursos</h2>
                    <p className="text-sm sm:text-base text-text-subtle">
                        Gestiona tus cursos y material académico
                    </p>
                </div>

                <div className="w-full sm:w-auto shrink-0">
                    <Button
                        text="Agregar curso"
                        icon={<Plus size={18} />}
                        onClick={() => setIsModalOpen(true)}
                    />
                    <ManageCourseModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        mode="create"
                        onCourseCreated={(course) => {
                            addCourse(course);
                            triggerToast("Curso creado exitosamente", "success");
                        }}
                        onError={(msg) => triggerToast(msg, "error")}
                        existingCourses={courses.map(c => ({ name: c.title }))}
                    />
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="pt-10 flex-1">
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <CourseCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {!isLoading && error && (
                    <ErrorState
                        title="Oops, ha ocurrido un problema"
                        subtitle="Comprueba tu conexión a internet o intenta recargar la página"
                        message={error}
                        onRetry={refetch}
                    />
                )}

                {!isLoading && !error && courses.length === 0 && (
                    <EmptyState
                        icon={BookOpenIcon}
                        variant="card"
                        title="No tienes cursos creados"
                        description="Comienza creando tu primer curso para agregar material y generar evaluaciones."
                        actionText="Agregar curso"
                        onActionClick={() => setIsModalOpen(true)}
                    />
                )}

                {!isLoading && !error && courses.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses.map((course) => (
                            <Link key={course.id} to={`/courses/${course.id}`} className="block">
                                <CardCourse
                                    iconText={course.iconText}
                                    courseTitle={course.title}
                                    courseDescription={course.description}
                                    lastQuizTime={course.lastQuizTime}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
}