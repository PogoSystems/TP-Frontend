import { Modal } from "../../../shared/components/ui/modal.tsx";
import { InputText } from "../../../shared/components/ui/inputText.tsx";
import { Button } from "../../../shared/components/ui/button.tsx";
import { LoadSpinner } from "../../../shared/components/ui/loadSpinner.tsx";
import { Plus, Pencil, AlertCircle } from 'lucide-react';
import { TextArea } from "../../../shared/components/ui/textArea.tsx";
import type { CourseResponse } from "../types/course.types.ts";
import { useState, useEffect } from "react";
import { createCourse, updateCourse } from "../services/courseService.ts";
import { validateCourseData, type CourseFormData } from "../../../shared/utils/courseValidation.ts";
import {useFormValidation} from "../../../shared/utils/useFormValidation.ts";

interface ManageCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCourseCreated?: (course: CourseResponse) => void;
    onCourseUpdated?: (course: CourseResponse) => void;
    initialData?: { id: number; name: string; description: string };
    mode?: 'create' | 'edit';
}

export function ManageCourseModal({ isOpen, onClose, onCourseCreated, onCourseUpdated, initialData, mode = 'create' }: ManageCourseModalProps) {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { values, errors, handleChange, validateAll, resetForm } = useFormValidation<CourseFormData>(
        {
            name: "",
            description: "",
        },
        validateCourseData
    );

    useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && initialData) {
                resetForm({
                    name: initialData.name,
                    description: initialData.description,
                });
            } else {
                resetForm({
                    name: "",
                    description: "",
                });
            }
            setError("");
        }
    }, [isOpen, mode, initialData]);

    async function handleSave() {
        setError("");

        if (!validateAll()) {
            return;
        }

        setIsSubmitting(true);
        try {
            if (mode === 'edit' && initialData) {
                const updated = await updateCourse(initialData.id, {
                    name: values.name,
                    description: values.description,
                    max_score: 0
                });
                onCourseUpdated?.(updated);
            } else {
                const course = await createCourse({
                    name: values.name,
                    description: values.description
                });
                onCourseCreated?.(course);
            }
            onClose();
        } catch {
            setError(mode === 'edit' ? "Hubo un error al actualizar el curso. Inténtalo de nuevo." : "Hubo un error al crear el curso. Inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* Header */}
            <h2 className="text-text-title text-lg font-semibold mb-8">
                {mode === 'edit' ? 'Editar curso' : 'Crear nuevo curso'}
            </h2>

            {/* Form */}
            <div className="grid grid-rows-1 gap-4 mb-3">
                <div className="flex flex-col gap-1">
                    <InputText
                        label={'Nombre del curso'}
                        value={values.name}
                        required={true}
                        name={'courseName'}
                        placeholder={'Ej. Algoritmo y estructura de datos'}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    {errors.name && (
                        <span className="text-xs text-red-500 font-medium pl-1">
                            {errors.name}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <TextArea
                        label={'Descripción'}
                        value={values.description}
                        required={true}
                        name={'courseDescription'}
                        placeholder={'Escribe una breve descripción del contenido del curso'}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                    {errors.description && (
                        <span className="text-xs text-red-500 font-medium pl-1">
                            {errors.description}
                        </span>
                    )}
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex flex-row justify-end gap-4 mt-6">
                <div>
                    <Button
                        text={'Cancelar'}
                        variant={'secondary'}
                        onClick={onClose}
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <Button
                        text={isSubmitting ? (mode === 'edit' ? "Guardando..." : "Creando...") : (mode === 'edit' ? "Guardar cambios" : "Crear curso")}
                        icon={
                            isSubmitting ? (
                                <LoadSpinner width={23} height={23} monochrome={true} />
                            ) : mode === 'edit' ? (
                                <Pencil size={18} />
                            ) : (
                                <Plus size={18} />
                            )
                        }
                        onClick={handleSave}
                        disabled={isSubmitting}
                    />
                </div>
            </div>
        </Modal>
    );
}