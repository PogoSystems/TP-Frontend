import { useState } from 'react';

export type ValidatorFunction<T> = (data: T) => Partial<Record<keyof T, string>>;

export function useFormValidation<T extends Record<string, any>>(initialValues: T, validateFn: ValidatorFunction<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    // update a specific field and validate it
    const handleChange = (field: keyof T, value: any) => {
        const nextValues = { ...values, [field]: value };
        setValues(nextValues);

        const validationErrors = validateFn(nextValues);
        setErrors((prev) => ({
            ...prev,
            [field]: validationErrors[field],
        }));
    };

    // validate all fields and return true if there are no errors
    const validateAll = (): boolean => {
        const validationErrors = validateFn(values);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // reset the form to initial values or new values
    const resetForm = (newValues?: T) => {
        setValues(newValues || initialValues);
        setErrors({});
    };

    return {
        values,
        errors,
        handleChange,
        validateAll,
        resetForm,
        setValues,
    };
}