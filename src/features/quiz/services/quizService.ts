import { apiClient } from "../../../shared/services/api/axios-client.ts"
import type {AttemptResultResponse, GenerateQuizRequest, Quiz, SubmitQuizRequest, QuizzesByCourseResponse} from "../types/quiz.types.ts"

export async function generateQuiz(payload: GenerateQuizRequest): Promise<Quiz> {
    const { data } = await apiClient.post<Quiz>("/quizzes", payload)
    return data
}

export async function submitQuiz(quizId: number, payload: SubmitQuizRequest): Promise<AttemptResultResponse> {
    const { data } = await apiClient.post<AttemptResultResponse>(`/quizzes/${quizId}/submit`, payload);
    return data;
}

export async function getQuizzesByCourseId(courseId: number): Promise<QuizzesByCourseResponse> {
    const { data } = await apiClient.get<QuizzesByCourseResponse>("/quizzes", {
        params: { course_id: courseId }
    });
    return data;
}

export async function getQuizById(quizId: number): Promise<Quiz> {
    const { data } = await apiClient.get<Quiz>(`/quizzes/${quizId}`);
    return data;
}
