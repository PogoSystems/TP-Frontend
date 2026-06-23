import {Modal} from "../../../shared/components/ui/modal.tsx";
import {InputText} from "../../../shared/components/ui/inputText.tsx";
import {Button} from "../../../shared/components/ui/button.tsx";
import { Plus } from 'lucide-react';
import {TextArea} from "../../../shared/components/ui/textArea.tsx";

interface CreateCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateCourseModal({isOpen, onClose}: CreateCourseModalProps) {
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* Header */ }
            <h2 className="text-text-title text-lg font-semibold mb-8"> Crear nuevo curso</h2>

            {/* Form */ }
            <div className="grid grid-rows-1 gap-4 mb-8">
               <InputText label={'Nombre del curso'} required={true} name={'courseName'} placeholder={'Algoritmo y estructura de datos'}></InputText>
                <TextArea label={'Descripción'} required={true} name={'courseDescription'} placeholder={'Escribe una breve descripción del contenido del curso'} ></TextArea>
            </div>

            {/* Footer */ }
            <div className="flex flex-row justify-end gap-4">
                <div>
                    <Button text={'Cancelar'} variant={'secondary'} onClick={onClose}/>
                </div>

                <div>
                    <Button text={'Crear curso'} icon={<Plus/>} onClick={onClose}/>
                </div>
               {/* <Link to={`/course/${course.id}`} className="w-full">
                    <Button text={'Crear curso'} icon={<Plus/>} />
                </Link>*/}

            </div>
        </Modal>
    )
}