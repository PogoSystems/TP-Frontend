import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FileDropzone} from "../../../shared/components/ui/fileDropzone.tsx";
import {FileListItem} from "../../../shared/components/ui/fileListItem.tsx";
import {Card} from "../../../shared/components/ui/card.tsx";
import {Button} from "../../../shared/components/ui/button.tsx";
import {InputText} from "../../../shared/components/ui/inputText.tsx";
import {BloomLevelCard} from "../components/bloomLevelCard.tsx";
import {useCreateQuiz} from "../hook/useCreateQuiz.ts";
import {Select} from "../../../shared/components/ui/select.tsx";
import {MultiSelectDropdown} from "../../../shared/components/ui/multiSelectDropdown.tsx";
import {MOCK_QUIZ} from "../hook/useQuizSession.ts";

const MAX_FILES=3

export function CreateQuizPage() {
    const navigate = useNavigate();
    const [files, setFiles] = useState<File[]>([]); //to save the files that are dropped or selected by the user
    const [selectedCourseId, setSelectedCourseId] = useState('')
    const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([])
    const { bloomLevels, courses, getDocumentsByCourseId } = useCreateQuiz()

    // check if a course is selected and get the documents for that course
    const availableDocuments = selectedCourseId ? getDocumentsByCourseId(selectedCourseId) : []
    const documentOptions = availableDocuments.map((doc) => ({ value: doc.id, label: doc.name }))

    function handleCourseChange(courseId: string) {
        setSelectedCourseId(courseId)
        setSelectedDocumentIds([]) // if the course change, reset the selected documents
    }
    // to save the files that are dropped or selected by the user
    function handleFilesSelected(newFiles: File[]) {
        setFiles((prevFiles) =>[
            ...prevFiles,
            ...newFiles
        ])
    }

    function handleRemoveFile(indexToRemove:number){
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove))
    }

    // TODO: Replace MOCK_QUIZ with the actual API response once backend is connected
    function handleGenerateQuiz() {
        navigate('/quiz/taking', { state: { quiz: MOCK_QUIZ } })
    }

    return(
        <>
            <h2 className="font-semibold text-4xl text-text-title">Generar Quiz</h2>
            <p className="text-base">Diseña una evaluación personalizada en base a tu contenido académico</p>

            <Card className="w-full mt-4">
                <Card.Content>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5 pb-4">
                        <Select label={'Selecciona un curso'} required={true} options={courses.map((course) => ({ value: course.id, label: course.title }))} placeholder={'Elige un curso'} value={selectedCourseId} onChange={handleCourseChange}/>
                        <MultiSelectDropdown label={'Documentos para la generación'} required={true} options={documentOptions} selectedValues={selectedDocumentIds} onChange={setSelectedDocumentIds} placeholder={selectedCourseId ? 'Selecciona uno o varios documentos' : 'Primero elige un curso'}/>
                        <InputText label={'Título del cuestionario'} required={true} name={'quizTitle'} placeholder={'Ej: Quiz de repaso - PC1 - Notación Big O'}/>
                        <InputText label={'Cantidad de preguntas'} required={true} name={'questionCount'} placeholder={'10'}/>
                        <InputText label={'Tema del cuestionario'} required={true} name={'questionCount'} placeholder={'Ej: Patrones de diseño, Diagramas UML, Principios SOLID'}/>
                    </div>

                    <div className="pb-4">
                        <p className="text-text-title font-medium text-sm">Nivel de bloom</p>
                        <p className="text-sm font-light text-text-subtle pb-3">Deja que el agente genere el tipo de pregunta en base a tu desempeño o selecciona uno o más niveles cognitivos para el cuestionario personalizado </p>
                        <div className="flex flex-row flex-wrap gap-4">
                            {bloomLevels.map((level) => (
                                <BloomLevelCard  key={level.level} level={level} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col  pb-6">
                        <p className="text-text-title font-medium text-sm">Material de origen</p>
                        <p className="text-sm font-light text-text-subtle pb-3">Sube nuevos documentos para generar cuestionarios apartir de ellos </p>
                        <div className="flex flex-col gap-4">
                            <FileDropzone onFilesSelected={handleFilesSelected} maxFiles={MAX_FILES} currentCount={files.length}/>
                            {files.map((file, index) =>(
                                <FileListItem  key={`${file.name}-${index}`} file={file} onRemove={() => handleRemoveFile(index)} />
                            ))}

                        </div>
                    </div>

                </Card.Content>

                <div className="border-t-1 border-gray-100 pt-2">
                    <Card.Footer>
                        <div className="w-fit pt-2">
                            <Button text={'Generar quiz'} onClick={handleGenerateQuiz}></Button>
                        </div>

                    </Card.Footer>
                </div>

            </Card>


        </>

    )
}