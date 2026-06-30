import { Button } from "../../../shared/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { CardCourse } from "../../../shared/components/ui/cardCourse.tsx";
import * as React from "react";
import { ManageCourseModal } from "../components/ManageCourseModal.tsx";
import { Link } from "react-router-dom";
import { UseCourseList } from "../hook/useCourseList.ts";

export function CoursesPage() {
    const { courses, isLoading, error, addCourse } = UseCourseList()
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    return (
        <div>
            {/* Header */}
            <div className="flex flex-row justify-between items-center ">
                <div className="flex flex-col">
                    <h2 className="font-semibold text-4xl text-text-title">Mis cursos</h2>
                    <p className="text-base">Gestiona tus cursos y material académico</p>
                </div>

                <div className="max-h-11 fl ">
                    <Button text={'Agregar curso'} icon={<Plus />} onClick={() => setIsModalOpen(true)}></Button>
                    <ManageCourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCourseCreated={addCourse} />
                </div>
            </div>

            {isLoading && <p className="pt-10">Cargando cursos...</p>}
            {error && <p className="pt-10 text-red-500">{error}</p>}
            {/* List of courses */}
            {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap pt-10">
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
    )
}