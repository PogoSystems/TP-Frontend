export interface ProfileFormData {
    name: string;
    lastName: string;
    college: string;
    major: string;
}

export interface ProfileFormErrors {
    name?: string;
    lastName?: string;
    college?: string;
    major?: string;
}

export function validateProfileData(data: ProfileFormData): ProfileFormErrors {
    const errors: ProfileFormErrors = {};

    if (!data.name || !data.name.trim()) {
        errors.name = "El nombre es obligatorio";
    } else if (data.name.trim().length > 50) {
        errors.name = "El nombre no debe superar los 50 caracteres";
    }

    if (!data.lastName || !data.lastName.trim()) {
        errors.lastName = "El apellido es obligatorio";
    } else if (data.lastName.trim().length > 50) {
        errors.lastName = "El apellido no debe superar los 50 caracteres";
    }

    if (!data.college || !data.college.trim()) {
        errors.college = "La universidad es obligatoria";
    } else if (data.college.trim().length > 100) {
        errors.college = "La universidad no debe superar los 100 caracteres";
    }

    if (!data.major || !data.major.trim()) {
        errors.major = "La carrera es obligatoria";
    } else if (data.major.trim().length > 100) {
        errors.major = "La carrera no debe superar los 100 caracteres";
    }

    return errors;
}