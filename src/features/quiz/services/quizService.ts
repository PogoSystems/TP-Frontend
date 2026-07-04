import { apiClient } from "../../../shared/services/api/axios-client.ts"
import type {AttemptResultResponse, GenerateQuizRequest, Quiz, SubmitQuizRequest} from "../types/quiz.types.ts"

export async function generateQuiz(payload: GenerateQuizRequest): Promise<Quiz> {
    const { data } = await apiClient.post<Quiz>("/quizzes", payload)
    return data
}

export async function submitQuiz(quizId: number, payload: SubmitQuizRequest): Promise<AttemptResultResponse> {
    const { data } = await apiClient.post<AttemptResultResponse>(`/quizzes/${quizId}/submit`, payload);
    return data;
}
