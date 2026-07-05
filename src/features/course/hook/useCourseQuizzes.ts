import { useState } from 'react';
import { getQuizzesByCourseId, getQuizById } from '../../quiz/services/quizService.ts';
import type { QuizSummary } from '../../quiz/types/quiz.types.ts';
import { useNavigate } from 'react-router-dom';

export function useCourseQuizzes(courseId: number) {
    const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isQuizzesExpanded, setIsQuizzesExpanded] = useState(false);
    const [isLoadingQuiz, setIsLoadingQuiz] = useState<number | null>(null);
    const [hasFetched, setHasFetched] = useState(false);
    const navigate = useNavigate();

    const toggleQuizzes = async () => {
        setIsQuizzesExpanded((prev) => !prev);
        if (!hasFetched && !isQuizzesExpanded) {
            setIsLoading(true);
            try {
                const response = await getQuizzesByCourseId(courseId);
                setQuizzes(response.quizzes || []);
                setHasFetched(true);
            } catch (error) {
                console.error("Failed to fetch quizzes", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleRetryQuiz = async (quizId: number) => {
        setIsLoadingQuiz(quizId);
        try {
            const quiz = await getQuizById(quizId);
            navigate('/quiz/taking', { state: { quiz } });
        } catch (error) {
            console.error("Failed to fetch quiz details", error);
        } finally {
            setIsLoadingQuiz(null);
        }
    };

    return {
        quizzes,
        isLoading,
        isQuizzesExpanded,
        isLoadingQuiz,
        toggleQuizzes,
        handleRetryQuiz
    };
}
