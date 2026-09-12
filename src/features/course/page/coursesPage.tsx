import * as React from "react";
import { Link } from "react-router-dom";
import {BookOpenIcon, Plus} from "lucide-react";
import { Button } from "../../../shared/components/ui/button.tsx";
import { CardCourse } from "../../../shared/components/ui/cardCourse.tsx";
import { EmptyState } from "../../../shared/components/ui/emptyState.tsx";
import { ErrorState } from "../../../shared/components/ui/errorState.tsx";
import { ManageCourseModal } from "../components/ManageCourseModal.tsx";
import { UseCourseList } from "../hook/useCourseList.ts";
import {CourseCardSkeleton} from "../../../shared/components/ui/skeletons.tsx";
export function CoursesPage() {
    const { courses, isLoading, error, addCourse, refetch } = UseCourseList();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <div className="flex flex-col min-h-full">
            {/* Header */}
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-4xl text-text-title">Mis cursos</h2>
                    <p className="text-base text-text-subtle">
                        Gestiona tus cursos y material académico
                    </p>
                </div>

                <div className="max-h-11">
                    <Button
                        text="Agregar curso"
                        icon={<Plus size={18} />}
                        onClick={() => setIsModalOpen(true)}
                    />
                    <ManageCourseModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onCourseCreated={addCourse}
                    />
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="pt-10 flex-1">
                {/* Loading */}
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <CourseCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {/*Error */}
                {!isLoading && error && (
                    <ErrorState
                        title="Oops, ha ocurrido un problema"
                        subtitle="Comprueba tu conexión a internet o intenta recargar la página"
                        message={error}
                        onRetry={refetch}
                    />
                )}

                {/*Lista Vacía */}
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

                {/* Lista de Cursos */}
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
        </div>
    );
}