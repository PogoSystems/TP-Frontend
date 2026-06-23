import type {CourseSummary} from "../types/course.types.ts";

const MOCK_COURSES: CourseSummary[] =[
    {
        id: 'course1',
        iconText: 'ED',
        title: 'Estructura de Datos',
        description: 'Fundamentos para la organización y gestión de datos de forma eficiente',
        lastQuizTime: '2 horas'
    },
    {
        id: 'course2',
        iconText: 'ML',
        title: 'Machine Learning',
        description: 'Introduccion al aprendizaje supervisado y no supervisado',
        lastQuizTime: '4 días'
    },
    {
        id: 'course3',
        iconText: 'BDD',
        title: 'Bases de Datos',
        description: 'Diseño, implementación y gestión de bases de datos relacionales y no relacionales.',
        lastQuizTime: '1 semana'
    },
    {
        id: 'course4',
        iconText: 'DW',
        title: 'Desarrollo Web',
        description: 'Desarrollo sitios web interactivos y responsivos utilizando HTML, CSS y JavaScript.',
        lastQuizTime: '3 días'
    }
]

export function UseCourseList(){
    return {courses: MOCK_COURSES}
}