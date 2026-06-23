import type {BloomLevelOption} from "../types/bloomLevelOption.ts";

const BLOOM_LEVELS: BloomLevelOption[] = [
    {level: 'remember' ,title: 'Recordar', description: 'Hechos y conceptos básicos'},
    {level:'understand', title: 'Comprender', description: 'Explicar ideas o conceptos.'},
    {level:'apply', title: 'Aplicar', description: 'Usar la información en situaciones nuevas.'},
    {level:'analyze', title: 'Analizar', description: 'Conexión entre ideas y partes.'},
    {level:'evaluate', title: 'Evaluar', description: 'Justificar una decisión o curso de acción.'},
]

const MOCK_COURSES =[
    {
        id: 'course-1',
        title: 'Algoritmos y Estructura de Datos',
        documents: [
            { id: 'doc-1', name: 'Semana 1 - Introducción.pdf' },
            { id: 'doc-2', name: 'Semana 2 - Listas y Pilas.pdf' },
            { id: 'doc-3', name: 'Semana 3 - Árboles.docx' },
        ],
    },
    {
        id: 'course-2',
        title: 'Machine Learning',
        documents: [
            { id: 'doc-4', name: 'Introducción a ML.pdf' },
            { id: 'doc-5', name: 'Regresión Lineal.pdf' },
        ],
    },
]

export function useCreateQuiz(){
    const courses = MOCK_COURSES.map((course) => ({
        id: course.id,
        title: course.title,
    }))

    function getDocumentsByCourseId(courseId: string) {
        const course = MOCK_COURSES.find((c) => c.id === courseId)
        return course?.documents ?? []
    }
    return{bloomLevels: BLOOM_LEVELS, courses, getDocumentsByCourseId}
}