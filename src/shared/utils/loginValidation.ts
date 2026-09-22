export interface LoginFormData {
    email: string;
    password: string;
}

export type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

export function validateEmail(email: string): string | undefined {
    if (!email || !email.trim()) {
        return "El correo electrónico es obligatorio";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return "Ingresa un correo electrónico válido";
    }
    return undefined;
}

export function validateLoginData(data: LoginFormData): LoginFormErrors {
    const errors: LoginFormErrors = {};

    const emailError = validateEmail(data.email);
    if (emailError) errors.email = emailError;

    if (!data.password) {
        errors.password = "La contraseña es obligatoria";
    } else if (data.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
}

export function validateForgotPasswordData(data: { email: string }) {
    const emailError = validateEmail(data.email);
    return emailError ? { email: emailError } : {};
}