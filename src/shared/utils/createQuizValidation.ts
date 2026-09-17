export interface CreateQuizFormData {
    selectedCourseId: string;
    quizTitle: string;
    questionCount: string;
    quizSubject: string;
    expectedCorrectAnswers: string;
    selectedDocumentIds: string[];
    totalFiles: number;
}

export type CreateQuizFormErrors = Partial<Record<keyof CreateQuizFormData, string>>;

export function validateCreateQuizData(data: CreateQuizFormData): CreateQuizFormErrors {
    const errors: CreateQuizFormErrors = {};

    if (!data.selectedCourseId) {
        errors.selectedCourseId = "Debes seleccionar un curso";
    }

    if (!data.quizTitle || !data.quizTitle.trim()) {
        errors.quizTitle = "El título del cuestionario es obligatorio";
    } else if (data.quizTitle.trim().length > 100) {
        errors.quizTitle = "El título no debe superar los 100 caracteres";
    }

    if (data.quizSubject && data.quizSubject.trim().length > 150) {
        errors.quizSubject = "El tema no debe superar los 150 caracteres";
    }

    if (!data.questionCount) {
        errors.questionCount = "La cantidad de preguntas es obligatoria";
    } else if (!/^\d+$/.test(data.questionCount)) {
        errors.questionCount = "Solo se permiten números";
    } else if (Number(data.questionCount) < 5) {
        errors.questionCount = "El número mínimo de preguntas debe ser 5";
    }

    if (data.expectedCorrectAnswers === "") {
        errors.expectedCorrectAnswers = "Las respuestas estimadas son obligatorias";
    } else if (!/^\d+$/.test(data.expectedCorrectAnswers)) {
        errors.expectedCorrectAnswers = "Solo se permiten números";
    } else if (Number(data.expectedCorrectAnswers) < 0) {
        errors.expectedCorrectAnswers = "Debe ser un número mayor o igual a 0";
    }

    return errors;
}