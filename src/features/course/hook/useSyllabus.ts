import {useState} from "react";
import {uploadSyllabus} from "../../../shared/services/documentService.ts";

export function useSyllabus(courseId: number) {
    const [loading, setLoading] = useState(false)

    const upload = async (file: File) => {
        setLoading(true)
        try {
            return await uploadSyllabus(courseId, file)
        } finally {
            setLoading(false)
        }
    }

    return { upload, loading }
}