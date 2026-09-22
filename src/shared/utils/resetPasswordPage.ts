export interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export function validateResetPasswordData(data: ResetPasswordFormData) {
    const errors: Partial<Record<keyof ResetPasswordFormData, string>> = {};

    if (!data.password) {
        errors.password = "La contraseña es obligatoria";
    } else if (data.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = "Debes confirmar la contraseña";
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
}