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
import { LoadSpinner } from "../../../shared/components/ui/loadSpinner.tsx";

const MAX_FILES = 3;

export function CreateQuizPage() {
    const navigate = useNavigate();

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
        error,
        values,
        errors,
        handleChange,
        handleCourseChange,
        handleGenerateQuiz,
        canGenerate,
    } = useCreateQuiz();

    const documentOptions = availableDocuments.map((doc) => ({ value: String(doc.id), label: doc.title }));

    async function handleSubmit() {
        try {
            const quiz = await handleGenerateQuiz();
            if (quiz) {
                navigate('/quiz/taking', {
                    state: {
                        quiz,
                        expectedCorrectAnswers: Number(values.expectedCorrectAnswers),
                    },
                });
            }
        } catch {

        }
    }

    return (
        <>
            <h2 className="font-semibold text-4xl text-text-title">Generar Quiz</h2>
            <p className="text-base">Diseña una evaluación personalizada en base a tu contenido académico</p>

            <Card className="w-full mt-4">
                <Card.Content>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5 pb-4">
                        <div className="flex flex-col gap-1">
                            <Select
                                label={'Selecciona un curso'}
                                required={true}
                                options={courses.map((course) => ({ value: course.id, label: course.title }))}
                                placeholder={'Elige un curso'}
                                value={values.selectedCourseId}
                                onChange={handleCourseChange}
                                isLoading={isLoadingCourses}
                            />
                            {errors.selectedCourseId && (
                                <span className="text-xs text-red-500 font-medium pl-1">
                                    {errors.selectedCourseId}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <MultiSelectDropdown
                                label={'Documentos para la generación'}
                                required={true}
                                options={documentOptions}
                                selectedValues={values.selectedDocumentIds}
                                onChange={(selected) => handleChange('selectedDocumentIds', selected)}
                                placeholder={values.selectedCourseId ? 'Selecciona uno o varios documentos' : 'Primero elige un curso'}
                                isLoading={isLoadingDocuments}
                                disabled={!values.selectedCourseId}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <InputText
                                label={'Título del cuestionario'}
                                required={true}
                                name={'quizTitle'}
                                value={values.quizTitle}
                                onChange={(e) => handleChange('quizTitle', e.target.value)}
                                placeholder={'Ej: Quiz de repaso - PC1 - Notación Big O'}
                            />
                            {errors.quizTitle && (
                                <span className="text-xs text-red-500 font-medium pl-1">
                                    {errors.quizTitle}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <InputText
                                label={'Cantidad de preguntas (mínimo 5)'}
                                required={true}
                                name={'questionCount'}
                                value={values.questionCount}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/\D/g, '');
                                    handleChange('questionCount', onlyNums);
                                }}
                                placeholder={'10'}
                            />
                            {errors.questionCount && (
                                <span className="text-xs text-red-500 font-medium pl-1">
                                    {errors.questionCount}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <InputText
                                label={'Tema del cuestionario'}
                                required={false}
                                name={'quizSubject'}
                                value={values.quizSubject}
                                onChange={(e) => handleChange('quizSubject', e.target.value)}
                                placeholder={'Ej: Patrones de diseño, Diagramas UML, Principios SOLID'}
                            />
                            {errors.quizSubject && (
                                <span className="text-xs text-red-500 font-medium pl-1">
                                    {errors.quizSubject}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <InputText
                                label={'Respuestas correctas estimadas'}
                                required={true}
                                name={'expectedCorrectAnswers'}
                                value={values.expectedCorrectAnswers}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/\D/g, '');
                                    handleChange('expectedCorrectAnswers', onlyNums);
                                }}
                                placeholder={'Ej: 8'}
                            />
                            {errors.expectedCorrectAnswers && (
                                <span className="text-xs text-red-500 font-medium pl-1">
                                    {errors.expectedCorrectAnswers}
                                </span>
                            )}
                        </div>
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
                        <p className="text-sm font-light text-text-subtle pb-3">Sube nuevos documentos para generar cuestionarios a partir de ellos</p>
                        <div className="flex flex-col gap-4">
                            <FileDropzone
                                onFilesSelected={addFiles}
                                maxFiles={MAX_FILES}
                                currentCount={fileEntries.length}
                            />
                            {fileEntries.map((entry, index) => (
                                <div key={`${entry.file.name}-${index}`} className="flex flex-col gap-1">
                                    <FileListItem
                                        file={entry.file}
                                        onRemove={() => removeFile(index)}
                                    />
                                    {entry.status === 'uploading' && (
                                        <div className="flex items-center gap-2 text-xs text-text-subtle pl-1">
                                            <LoadSpinner width={16} height={16} />
                                            <span>Subiendo...</span>
                                        </div>
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
                                text={
                                    isGenerating ? (
                                        <span className="flex items-center gap-2">
                                            <LoadSpinner width={18} height={18} monochrome />
                                            Generando quiz...
                                        </span>
                                    ) : (
                                        'Generar quiz'
                                    )
                                }
                                onClick={handleSubmit}
                                disabled={!canGenerate}
                            />
                        </div>
                    </Card.Footer>
                </div>
            </Card>
        </>
    );
}