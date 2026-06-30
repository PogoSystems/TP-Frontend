import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileDropzone } from "../../../shared/components/ui/fileDropzone.tsx";
import { FileListItem } from "../../../shared/components/ui/fileListItem.tsx";
import { Card } from "../../../shared/components/ui/card.tsx";
import { Button } from "../../../shared/components/ui/button.tsx";
import { InputText } from "../../../shared/components/ui/inputText.tsx";
import { BloomLevelCard } from "../components/bloomLevelCard.tsx";
import { useCreateQuiz } from "../hook/useCreateQuiz.ts";
import { Select } from "../../../shared/components/ui/select.tsx";
import { MultiSelectDropdown } from "../../../shared/components/ui/multiSelectDropdown.tsx";

const MAX_FILES = 3

export function CreateQuizPage() {
    const navigate = useNavigate();
    const [selectedCourseId, setSelectedCourseId] = useState('')
    const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([])
    const [quizTitle, setQuizTitle] = useState('')
    const [questionCount, setQuestionCount] = useState('')
    const [quizSubject, setQuizSubject] = useState('')

    const {
        bloomLevels,
        selectedBloomLevels,
        toggleBloomLevel,
        courses,
        documents: availableDocuments,
        fileEntries,
        addFiles,
        removeFile,
        isLoadingCourses,
        isLoadingDocuments,
        isGenerating,
        isAnyFileUploading,
        error,
        loadDocuments,
        handleGenerateQuiz,
    } = useCreateQuiz()

    const documentOptions = availableDocuments.map((doc) => ({ value: String(doc.id), label: doc.title }))

    function handleCourseChange(courseId: string) {
        setSelectedCourseId(courseId)
        setSelectedDocumentIds([])
        loadDocuments(courseId)
    }

    function handleFilesSelected(newFiles: File[]) {
        addFiles(newFiles)
    }

    async function handleSubmit() {
        try {
            const quiz = await handleGenerateQuiz({
                courseId: selectedCourseId,
                title: quizTitle,
                selectedDocumentIds,
                queryText: quizSubject,
                numQuestions: Number(questionCount),
            })
            navigate('/quiz/taking', { state: { quiz } })
        } catch {
            // error is already set in the hook
        }
    }

    const totalFiles = fileEntries.length
    const canGenerate =
        selectedCourseId &&
        quizTitle.trim() &&
        questionCount &&
        Number(questionCount) > 0 &&
        selectedBloomLevels.length > 0 &&
        (selectedDocumentIds.length > 0 || totalFiles > 0) &&
        !isGenerating &&
        !isAnyFileUploading

    return (
        <>
            <h2 className="font-semibold text-4xl text-text-title">Generar Quiz</h2>
            <p className="text-base">Diseña una evaluación personalizada en base a tu contenido académico</p>

            <Card className="w-full mt-4">
                <Card.Content>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5 pb-4">
                        <Select
                            label={'Selecciona un curso'}
                            required={true}
                            options={courses.map((course) => ({ value: course.id, label: course.title }))}
                            placeholder={isLoadingCourses ? 'Cargando cursos...' : 'Elige un curso'}
                            value={selectedCourseId}
                            onChange={handleCourseChange}
                        />
                        <MultiSelectDropdown
                            label={'Documentos para la generación'}
                            required={true}
                            options={documentOptions}
                            selectedValues={selectedDocumentIds}
                            onChange={setSelectedDocumentIds}
                            placeholder={isLoadingDocuments ? 'Cargando documentos...' : (selectedCourseId ? 'Selecciona uno o varios documentos' : 'Primero elige un curso')}
                        />
                        <InputText
                            label={'Título del cuestionario'}
                            required={true}
                            name={'quizTitle'}
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            placeholder={'Ej: Quiz de repaso - PC1 - Notación Big O'}
                        />
                        <InputText
                            label={'Cantidad de preguntas'}
                            required={true}
                            name={'questionCount'}
                            value={questionCount}
                            onChange={(e) => setQuestionCount(e.target.value)}
                            placeholder={'10'}
                        />
                        <InputText
                            label={'Tema del cuestionario'}
                            required={false}
                            name={'quizSubject'}
                            value={quizSubject}
                            onChange={(e) => setQuizSubject(e.target.value)}
                            placeholder={'Ej: Patrones de diseño, Diagramas UML, Principios SOLID'}
                        />
                    </div>

                    <div className="pb-4">
                        <p className="text-text-title font-medium text-sm">Nivel de bloom</p>
                        <p className="text-sm font-light text-text-subtle pb-3">
                            Deja que el agente genere el tipo de pregunta en base a tu desempeño o selecciona uno o más niveles cognitivos para el cuestionario personalizado
                        </p>
                        <div className="flex flex-row flex-wrap gap-4">
                            {bloomLevels.map((level) => (
                                <BloomLevelCard
                                    key={level.level}
                                    level={level}
                                    isSelected={selectedBloomLevels.includes(level.level)}
                                    onToggle={() => toggleBloomLevel(level.level)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col pb-6">
                        <p className="text-text-title font-medium text-sm">Material de origen</p>
                        <p className="text-sm font-light text-text-subtle pb-3">Sube nuevos documentos para generar cuestionarios apartir de ellos</p>
                        <div className="flex flex-col gap-4">
                            <FileDropzone
                                onFilesSelected={handleFilesSelected}
                                maxFiles={MAX_FILES}
                                currentCount={totalFiles}
                            />
                            {fileEntries.map((entry, index) => (
                                <div key={`${entry.file.name}-${index}`} className="flex flex-col gap-1">
                                    <FileListItem
                                        file={entry.file}
                                        onRemove={() => removeFile(index)}
                                    />
                                    {entry.status === 'uploading' && (
                                        <p className="text-xs text-text-subtle pl-1">Subiendo...</p>
                                    )}
                                    {entry.status === 'done' && (
                                        <p className="text-xs text-green-500 pl-1">Subido correctamente</p>
                                    )}
                                    {entry.status === 'error' && (
                                        <p className="text-xs text-red-500 pl-1">{entry.error ?? 'Error al subir'}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 pb-4">{error}</p>
                    )}

                </Card.Content>

                <div className="border-t-1 border-gray-100 pt-2">
                    <Card.Footer>
                        <div className="w-fit pt-2">
                            <Button
                                text={isGenerating ? 'Generando quiz...' : 'Generar quiz'}
                                onClick={handleSubmit}
                                disabled={!canGenerate}
                            />
                        </div>
                    </Card.Footer>
                </div>

            </Card>
        </>
    )
}