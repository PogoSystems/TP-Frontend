import {Button} from "../../../shared/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {CardCourse} from "../../../shared/components/ui/cardCourse.tsx";

export function CoursesPage() {
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
                <CardCourse iconText={'ED'} courseTitle={'Estructura de Datos'} courseDescription={'Fundamentos para la organización y gestión de datos de forma eficiente'}/>
                <CardCourse iconText={'ML'} courseTitle={'Machine Learning'} courseDescription={'Introducción al aprendizaje supervisado y no supervisado'}/>
                <CardCourse iconText={'DW'} courseTitle={'Desarrollo Web'} courseDescription={'Construir aplicaciones web modernas y adaptativas'}/>
                <CardCourse iconText={'ED'} courseTitle={'Estructura de Datos'} courseDescription={'Fundamentos para la organización y gestión de datos de forma eficiente'}/>

            </div>
        </div>
        
    )
}