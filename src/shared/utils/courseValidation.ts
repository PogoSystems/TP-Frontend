export interface CourseFormData {
    name: string;
    description: string;
}

export type CourseFormErrors = Partial<Record<keyof CourseFormData, string>>;

export function validateCourseData(data: CourseFormData, existingCourseNames: string[] = [], id: number | undefined, initialDataName?: string): CourseFormErrors {
    const errors: CourseFormErrors = {};
    const trimmedName = data.name ? data.name.trim() : "";

    if (!trimmedName) {
        errors.name = "El nombre del curso es obligatorio";
    } else if (trimmedName.length > 50) {
        errors.name = "El nombre no debe superar los 50 caracteres";
    } else {
        const isDuplicate = existingCourseNames.some(
            (existingName) =>
                existingName.trim().toLowerCase() === trimmedName.toLowerCase() &&
                existingName.trim().toLowerCase() !== (initialDataName?.trim().toLowerCase() ?? "")
        );

        if (isDuplicate) {
            errors.name = "Ya tienes un curso registrado con este nombre";
        }
    }

    if (!data.description || !data.description.trim()) {
        errors.description = "La descripción es obligatoria";
    } else if (data.description.trim().length > 100) {
        errors.description = "La descripción no debe superar los 100 caracteres";
    }

    return errors;
}