import {uploadDocument} from "../../../shared/services/documentService.ts";
import type {DocumentResponse} from "../../../shared/types/document.ts";

export function useUploadSyllabus(courseId: number) {

    const uploadSyllabus = async (file: File): Promise<DocumentResponse> => {
        const formData = new FormData()

        formData.append("file", file)
        formData.append("course_id", String(courseId))
        formData.append("syllabus", "true")

        return uploadDocument(formData)
    }

    return {
        uploadSyllabus
    }
}