export interface LoginFormData {
    email: string;
    password: string;
}

export type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

export function validateLoginData(data: LoginFormData): LoginFormErrors {
    const errors: LoginFormErrors = {};

    if (!data.email || !data.email.trim()) {
        errors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        errors.email = "Ingresa un correo electrónico válido";
    }

    if (!data.password) {
        errors.password = "La contraseña es obligatoria";
    } else if (data.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
}