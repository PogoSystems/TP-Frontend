import { useState } from 'react';

export type ValidatorFunction<T> = (data: T) => Partial<Record<keyof T, string>>;

export function useFormValidation<T extends Record<string, any>>(initialValues: T, validateFn: ValidatorFunction<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    // update a specific field and validate it
    const handleChange = (field: keyof T, value: any) => {
        setValues((prev) => {
            const nextValues = { ...prev, [field]: value };

            const validationErrors = validateFn(nextValues);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: validationErrors[field],
            }));

            return nextValues;
        });
    };

    const setFields = (fieldsToUpdate: Partial<T>) => {
        setValues((prev) => {
            const nextValues = { ...prev, ...fieldsToUpdate };
            const validationErrors = validateFn(nextValues);

            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                (Object.keys(fieldsToUpdate) as Array<keyof T>).forEach((field) => {
                    updatedErrors[field] = validationErrors[field];
                });
                return updatedErrors;
            });

            return nextValues;
        });
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
        setFields,
        validateAll,
        resetForm,
        setValues,
    };
}