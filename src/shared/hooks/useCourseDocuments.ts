import { useCallback, useEffect, useState } from "react"
import type { DocumentResponse } from "../types/document.ts"
import { deleteDocument, fetchDocumentsByCourse } from "../services/documentService.ts"

export function useCourseDocuments(courseId: number) {
    const [documents, setDocuments] = useState<DocumentResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    /**
     * Fetches all documents for the current course from the backend
     * and replaces the local state.
     */
    const fetchDocuments = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await fetchDocumentsByCourse(courseId)
            setDocuments(data)
        } catch {
            setError("Failed to load course documents")
        } finally {
            setIsLoading(false)
        }
    }, [courseId])

    /**
     * Loads documents when the courseId changes.
     */
    useEffect(() => {
        if (!courseId) return
        fetchDocuments()
    }, [courseId])

    /**
     * Optimistically adds a newly created document to local state.
     * This avoids waiting for a full refetch after uploads.
     */
    const addDocument = (document: DocumentResponse) => {
        setDocuments(prev => [document, ...prev])
    }

    /**
     * Deletes a document both from backend and local state.
     * Uses optimistic update and rolls back by refetching if it fails.
     */
    const deleteDocumentById = async (documentId: number) => {
        let previousDocuments: DocumentResponse[] = []

        setDocuments(prev => {
            previousDocuments = prev
            return prev.filter(d => d.id !== documentId)
        })

        try {
            await deleteDocument(documentId)
        } catch (error) {
            setDocuments(previousDocuments)
            throw error
        }
    }

    /**
     * Derived value: returns the syllabus document if it exists
     */
    const syllabus = documents.find(doc => doc.syllabus)

    return {
        documents,
        syllabus,
        isLoading,
        error,
        reload: fetchDocuments,
        addDocument,
        removeDocument: deleteDocumentById
    }
}