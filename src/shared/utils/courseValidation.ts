export interface CourseFormData {
    name: string;
    description: string;
}

export type CourseFormErrors = Partial<Record<keyof CourseFormData, string>>;

export function validateCourseData(data: CourseFormData): CourseFormErrors {
    const errors: CourseFormErrors = {};

    if (!data.name || !data.name.trim()) {
        errors.name = "El nombre del curso es obligatorio";
    } else if (data.name.trim().length > 50) {
        errors.name = "El nombre no debe superar los 50 caracteres";
    }

    if (!data.description || !data.description.trim()) {
        errors.description = "La descripción es obligatoria";
    } else if (data.description.trim().length > 100) {
        errors.description = "La descripción no debe superar los 100 caracteres";
    }

    return errors;
}