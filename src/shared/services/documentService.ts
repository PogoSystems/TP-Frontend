import {apiClient} from "./api/axios-client.ts";
import type {DocumentResponse} from "../types/document.ts";


export async function uploadSyllabus(courseId: number, file: File): Promise<DocumentResponse> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("course_id", String(courseId))
    formData.append("syllabus", "true")

    const { data } = await apiClient.post<DocumentResponse>("/documents", formData)
    return data
}