import {apiClient} from "./api/axios-client.ts";
import type {DocumentResponse} from "../types/document.ts";


export async function uploadDocument(payload: FormData): Promise<DocumentResponse> {
    const { data } = await apiClient.post<DocumentResponse>("/documents", payload)
    return data
}
export async function fetchDocumentsByCourse(courseId: number) {
    const { data } = await apiClient.get<DocumentResponse[]>(`/documents/courses/${courseId}`)
    return data
}

export async function deleteDocument(documentId: number): Promise<void> {
    await apiClient.delete(`/documents/${documentId}`)
}