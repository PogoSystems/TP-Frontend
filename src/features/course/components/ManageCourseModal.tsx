import { Modal } from "../../../shared/components/ui/modal.tsx";
import { InputText } from "../../../shared/components/ui/inputText.tsx";
import { Button } from "../../../shared/components/ui/button.tsx";
import { Plus, Pencil } from 'lucide-react';
import { TextArea } from "../../../shared/components/ui/textArea.tsx";
import type { CourseResponse } from "../types/course.types.ts";
import { useState, useEffect } from "react";
import { createCourse, updateCourse } from "../services/courseService.ts";

interface ManageCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCourseCreated?: (course: CourseResponse) => void;
    onCourseUpdated?: (course: CourseResponse) => void;
    initialData?: { id: number, name: string, description: string };
    mode?: 'create' | 'edit';
}

export function ManageCourseModal({ isOpen, onClose, onCourseCreated, onCourseUpdated, initialData, mode = 'create' }: ManageCourseModalProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (isOpen && mode === 'edit' && initialData) {
            setName(initialData.name)
            setDescription(initialData.description)
        } else if (isOpen && mode === 'create') {
            setName("")
            setDescription("")
        }
        setError("")
    }, [isOpen, mode, initialData])

    async function handleSave() {
        setError("")

        if (!name.trim() || !description.trim()) {
            setError("Todos los campos son requeridos.")
            return
        }

        setIsSubmitting(true)
        try {
            if (mode === 'edit' && initialData) {
                const updated = await updateCourse(initialData.id, { name, description, max_score: 0 })
                onCourseUpdated?.(updated)
            } else {
                const course = await createCourse({ name, description })
                onCourseCreated?.(course)
            }
            onClose()
        } catch {
            setError(mode === 'edit' ? "Hubo un error al actualizar el curso. Inténtalo de nuevo." : "Hubo un error al crear el curso. Inténtalo de nuevo.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* Header */}
            <h2 className="text-text-title text-lg font-semibold mb-8">
                {mode === 'edit' ? 'Editar curso' : 'Crear nuevo curso'}
            </h2>

            {/* Form */}
            <div className="grid grid-rows-1 gap-4 mb-8">
                <InputText label={'Nombre del curso'} value={name} required={true} name={'courseName'} placeholder={'Algoritmo y estructura de datos'} onChange={(e) => setName(e.target.value)}></InputText>
                <TextArea label={'Descripción'} value={description} required={true} name={'courseDescription'} placeholder={'Escribe una breve descripción del contenido del curso'} onChange={(e) => setDescription(e.target.value)}></TextArea>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Footer */}
            <div className="flex flex-row justify-end gap-4">
                <div>
                    <Button text={'Cancelar'} variant={'secondary'} onClick={onClose} />
                </div>

                <div>
                    <Button text={isSubmitting ? (mode === 'edit' ? "Guardando..." : "Creando...") : (mode === 'edit' ? "Guardar cambios" : "Crear curso")} icon={mode === 'edit' ? <Pencil size={18} /> : <Plus size={18} />} onClick={handleSave} />
                </div>
            </div>
        </Modal>
    )
}