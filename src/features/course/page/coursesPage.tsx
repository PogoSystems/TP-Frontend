import {Button} from "../../../shared/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {CardCourse} from "../../../shared/components/ui/cardCourse.tsx";
import {UseCourseList} from "../hook/useCourseList.ts";

export function CoursesPage() {
    const {courses} = UseCourseList()
    return(
        <div>
            {/* Header */ }
            <div className="flex flex-row justify-between items-center ">
                <div className="flex flex-col">
                    <h2 className="font-semibold text-4xl text-text-title">Mis cursos</h2>
                    <p className="text-base">Gestiona tus cursos y material académico</p>
                </div>
                <div className="max-h-11 fl ">
                    <Button text={'Agregar curso'} icon={<Plus />}></Button>
                </div>
            </div>

            {/* List of courses */ }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap pt-10">
                {courses.map((course) =>{
                    return(
                        <CardCourse iconText={course.iconText} courseTitle={course.title} courseDescription={course.description} lastQuizTime={course.lastQuizTime}/>
                    )
                })}
            </div>
        </div>
        
    )
}