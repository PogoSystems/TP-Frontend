import { useEffect, useState } from "react"
import type { BloomLevel } from "../../../shared/types/bloomLevel.ts"
import { fetchCourses } from "../../course/services/courseService.ts"
import { fetchDocumentsByCourse } from "../../../shared/services/documentService.ts"
import type { DocumentResponse } from "../../../shared/types/document.ts"
import { generateQuiz } from "../services/quizService.ts"
import type { Quiz } from "../types/quiz.types.ts"
import { uploadDocument } from "../../../shared/services/documentService.ts"

const BLOOM_LEVELS: { level: BloomLevel; title: string; description: string }[] = [
    { level: 'remember', title: 'Recordar', description: 'Hechos y conceptos básicos' },
    { level: 'understand', title: 'Comprender', description: 'Explicar ideas o conceptos.' },
    { level: 'apply', title: 'Aplicar', description: 'Usar la información en situaciones nuevas.' },
    { level: 'analyze', title: 'Analizar', description: 'Conexión entre ideas y partes.' },
    { level: 'evaluate', title: 'Evaluar', description: 'Justificar una decisión o curso de acción.' },
]

export type FileUploadStatus = 'pending' | 'uploading' | 'done' | 'error'

export interface FileUploadEntry {
    file: File
    status: FileUploadStatus
    documentId?: number
    error?: string
}

export function useCreateQuiz() {
    const [courses, setCourses] = useState<{ id: string; title: string }[]>([])
    const [documents, setDocuments] = useState<DocumentResponse[]>([])
    const [selectedBloomLevels, setSelectedBloomLevels] = useState<BloomLevel[]>([])
    const [fileEntries, setFileEntries] = useState<FileUploadEntry[]>([])
    const [isLoadingCourses, setIsLoadingCourses] = useState(true)
    const [isLoadingDocuments, setIsLoadingDocuments] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Load available courses on mount
    useEffect(() => {
        let isMounted = true

        fetchCourses()
            .then((data) => {
                if (isMounted) {
                    setCourses(data.map((c) => ({
                        id: String(c.id),
                        title: c.name
                    })))
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError("Error al cargar los cursos")
                    console.error(err)
                }
            })
            .finally(() => {
                if (isMounted) setIsLoadingCourses(false)
            })

        return () => {
            isMounted = false
        }
    }, [])

    // Load documents for a specific course (triggered by user action)
    const loadDocuments = async (courseId: string) => {
        if (!courseId) {
            setDocuments([])
            return
        }

        setIsLoadingDocuments(true)
        try {
            const data = await fetchDocumentsByCourse(Number(courseId))
            setDocuments(data)
        } catch (err) {
            console.error("Error al cargar documentos del curso:", err)
        } finally {
            setIsLoadingDocuments(false)
        }
    }

    // Toggle a bloom level selection
    const toggleBloomLevel = (level: BloomLevel) => {
        setSelectedBloomLevels((prev) =>
            prev.includes(level)
                ? prev.filter((l) => l !== level)
                : [...prev, level]
        )
    }

    // Add files to the upload queue
    const addFiles = (newFiles: File[]) => {
        const entries: FileUploadEntry[] = newFiles.map((file) => ({
            file,
            status: 'pending',
        }))
        setFileEntries((prev) => [...prev, ...entries])
    }

    // Remove a file entry by index (only if not uploading)
    const removeFile = (index: number) => {
        setFileEntries((prev) => prev.filter((_, i) => i !== index))
    }

    // Upload a single file and track its status in state
    const uploadFile = async (courseId: string, index: number): Promise<number | null> => {
        const entry = fileEntries[index]
        if (!entry || entry.status === 'done') return entry?.documentId ?? null

        setFileEntries((prev) =>
            prev.map((e, i) => i === index ? { ...e, status: 'uploading' } : e)
        )

        try {
            const formData = new FormData()
            formData.append("file", entry.file)
            formData.append("course_id", courseId)
            formData.append("syllabus", "false")

            const doc = await uploadDocument(formData)

            setFileEntries((prev) =>
                prev.map((e, i) => i === index ? { ...e, status: 'done', documentId: doc.id } : e)
            )
            return doc.id
        } catch (err) {
            console.error("Error al subir archivo:", err)
            setFileEntries((prev) =>
                prev.map((e, i) => i === index ? { ...e, status: 'error', error: 'Error al subir el archivo' } : e)
            )
            return null
        }
    }

    // Upload all pending files and return their document IDs
    const uploadAllFiles = async (courseId: string): Promise<number[]> => {
        const pendingIndices = fileEntries
            .map((e, i) => ({ e, i }))
            .filter(({ e }) => e.status === 'pending' || e.status === 'error')
            .map(({ i }) => i)

        const uploadedIds: number[] = []

        for (const index of pendingIndices) {
            const id = await uploadFile(courseId, index)
            if (id !== null) uploadedIds.push(id)
        }

        // Also include already-uploaded files
        const alreadyDone = fileEntries
            .filter((e) => e.status === 'done' && e.documentId !== undefined)
            .map((e) => e.documentId!)

        return [...alreadyDone, ...uploadedIds]
    }

    // Generate quiz: upload pending files first, then call the generate endpoint
    const handleGenerateQuiz = async (params: {
        courseId: string
        title: string
        selectedDocumentIds: string[]
        queryText: string
        numQuestions: number
    }): Promise<Quiz> => {
        setError(null)
        setIsGenerating(true)
        try {
            // Upload any pending files, get all document IDs
            const uploadedIds = await uploadAllFiles(params.courseId)

            // Combine existing selected document IDs with newly uploaded ones
            const allDocumentIds = [
                ...params.selectedDocumentIds.map(Number),
                ...uploadedIds,
            ]

            const quiz = await generateQuiz({
                course_id: Number(params.courseId),
                title: params.title,
                document_ids: allDocumentIds,
                query_text: params.queryText,
                num_questions: params.numQuestions,
                bloom_levels: selectedBloomLevels,
            })

            return quiz
        } catch (err) {
            console.error("Error al generar el quiz:", err)
            setError("Error al generar el quiz. Inténtalo de nuevo.")
            throw err
        } finally {
            setIsGenerating(false)
        }
    }

    const isAnyFileUploading = fileEntries.some((e) => e.status === 'uploading')

    return {
        bloomLevels: BLOOM_LEVELS,
        selectedBloomLevels,
        toggleBloomLevel,
        courses,
        documents,
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
    }
}