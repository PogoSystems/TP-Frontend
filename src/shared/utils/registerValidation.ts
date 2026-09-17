import { validateProfileData, type ProfileFormData, type ProfileFormErrors } from "./profileValidation";

export interface RegisterFormData extends ProfileFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export type RegisterFormErrors = ProfileFormErrors & {
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export function validateRegisterData(data: RegisterFormData): RegisterFormErrors {
    const errors: RegisterFormErrors = validateProfileData(data);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !data.email.trim()) {
        errors.email = "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(data.email)) {
        errors.email = "Ingresa un correo electrónico válido";
    }

    if (!data.password) {
        errors.password = "La contraseña es obligatoria";
    } else if (data.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = "Debes confirmar la contraseña";
    } else if (data.password && data.confirmPassword !== data.password) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
}