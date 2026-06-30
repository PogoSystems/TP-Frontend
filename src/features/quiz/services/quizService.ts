import { apiClient } from "../../../shared/services/api/axios-client.ts"
import type { Quiz } from "../types/quiz.types.ts"
import type { BloomLevel } from "../../../shared/types/bloomLevel.ts"

export interface GenerateQuizPayload {
    course_id: number
    title: string
    document_ids: number[]
    query_text: string
    num_questions: number
    bloom_levels: BloomLevel[]
}

export async function generateQuiz(payload: GenerateQuizPayload): Promise<Quiz> {
    const { data } = await apiClient.post<Quiz>("/quizzes", payload)
    return data
}
