import { useState } from "react";
import { uploadDocument } from "../../../shared/services/documentService.ts";
import type { DocumentResponse } from "../../../shared/types/document.ts";

export function useUploadSyllabus(courseId: number) {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const uploadSyllabus = async (file: File): Promise<DocumentResponse> => {
        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("course_id", String(courseId));
            formData.append("syllabus", "true");

            const response = await uploadDocument(formData);
            return response;
        } catch (err) {
            const uploadError = err instanceof Error ? err : new Error("Error al subir el syllabus");
            setError(uploadError);
            throw uploadError;
        } finally {
            setIsUploading(false);
        }
    };

    return {
        uploadSyllabus,
        isUploading,
        error
    };
}