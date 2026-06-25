import type { CourseDetail } from '../types/course.types.ts';

const MOCK_COURSE_DETAILS: Record<string, CourseDetail> = {
    course1: {
        id: 'course1',
        iconText: 'ED',
        title: 'Estructura de Datos',
        description: 'Fundamentos para la organización y gestión de datos de forma eficiente',
        lastQuizTime: '2 horas',
        syllabusUploaded: false,
        bloomStats: {
            remember: 92,
            understand: 78,
            apply: 65,
            analyze: 55,
            evaluate: 46,
            create: 32,
        },
        dominantLevel: 'Recordar',
        dominantLevelPercentage: 92,
        dominantLevelAnswered: 15,
        weakLevel: 'Evaluar',
        weakLevelPercentage: 46,
        weakLevelAnswered: 4,
        tip: 'Intenta practicar ejercicios donde debas justificar decisiones y comparar distintas soluciones',
        progressOverTime: [
            { label: 'Semana 1', score: 40 },
            { label: 'Semana 2', score: 55 },
            { label: 'Semana 3', score: 62 },
            { label: 'Semana 4', score: 75 },
            { label: 'Semana 5', score: 70 },
            { label: 'Semana 6', score: 82 },
        ],
    },
    course2: {
        id: 'course2',
        iconText: 'ML',
        title: 'Machine Learning',
        description: 'Introduccion al aprendizaje supervisado y no supervisado',
        lastQuizTime: '4 días',
        syllabusUploaded: true,
        bloomStats: {
            remember: 80,
            understand: 70,
            apply: 60,
            analyze: 50,
            evaluate: 40,
            create: 30,
        },
        dominantLevel: 'Recordar',
        dominantLevelPercentage: 80,
        dominantLevelAnswered: 12,
        weakLevel: 'Crear',
        weakLevelPercentage: 30,
        weakLevelAnswered: 3,
        tip: 'Practica implementando modelos desde cero para afianzar los conceptos teóricos',
        progressOverTime: [
            { label: 'Semana 1', score: 30 },
            { label: 'Semana 2', score: 45 },
            { label: 'Semana 3', score: 58 },
            { label: 'Semana 4', score: 65 },
        ],
    },
};

export function useCourseDetail(courseId: string) {
    const course = MOCK_COURSE_DETAILS[courseId] ?? null;
    return { course };
}
