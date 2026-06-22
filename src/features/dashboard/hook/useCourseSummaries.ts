import type {CourseSummary} from "../../course/types/course.types.ts";

const MOCK_COURSES: CourseSummary[] = [
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
    }
]

export function useCourseSummaries(){
    return{courses: MOCK_COURSES}
}