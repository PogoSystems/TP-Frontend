import {Modal} from "../../../shared/components/ui/modal.tsx";
import {InputText} from "../../../shared/components/ui/inputText.tsx";
import {Button} from "../../../shared/components/ui/button.tsx";
import { Plus } from 'lucide-react';
import {TextArea} from "../../../shared/components/ui/textArea.tsx";
import type {CourseResponse} from "../types/course.types.ts";
import {useState} from "react";
import {createCourse} from "../services/courseService.ts";

interface CreateCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCourseCreated: (course: CourseResponse) => void
}

export function CreateCourseModal({isOpen, onClose, onCourseCreated }: CreateCourseModalProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleCreate() {
        setError("")

        if (!name.trim() || !description.trim()) {
            setError("All fields are required.")
            return
        }

        setIsSubmitting(true)
        try {
            const course = await createCourse({ name, description })
            onCourseCreated(course)
            setName("")
            setDescription("")
            onClose()
        } catch {
            setError("There was an error creating the course. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* Header */ }
            <h2 className="text-text-title text-lg font-semibold mb-8"> Crear nuevo curso</h2>

            {/* Form */ }
            <div className="grid grid-rows-1 gap-4 mb-8">
               <InputText label={'Nombre del curso'} value={name} required={true} name={'courseName'} placeholder={'Algoritmo y estructura de datos'}  onChange={(e) => setName(e.target.value)}></InputText>
                <TextArea label={'Descripción'} value={description} required={true} name={'courseDescription'} placeholder={'Escribe una breve descripción del contenido del curso'} onChange={(e) => setDescription(e.target.value)}></TextArea>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Footer */ }
            <div className="flex flex-row justify-end gap-4">
                <div>
                    <Button text={'Cancelar'} variant={'secondary'} onClick={onClose}/>
                </div>

                <div>
                    <Button text={isSubmitting ? "Creando..." : "Crear curso"} icon={<Plus/>} onClick={handleCreate}/>
                </div>
            </div>
        </Modal>
    )
}