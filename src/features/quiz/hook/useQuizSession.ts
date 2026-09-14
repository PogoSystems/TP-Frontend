import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type {AttemptResultResponse, Quiz, SubmitQuizAnswer, SubmitQuizRequest} from '../types/quiz.types.ts';
import {submitQuiz} from "../services/quizService.ts";

type Phase = 'answering' | 'revealed';

export function useQuizSession(quiz: Quiz, expectedCorrectAnswers: number = 0) {
    const navigate = useNavigate();

    const startedAt = useRef(new Date().toISOString());

    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState<Phase>('answering');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const [answers, setAnswers] = useState<SubmitQuizAnswer[]>([]);
    const answersRef = useRef<SubmitQuizAnswer[]>([]);
    answersRef.current = answers;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [secondsLeft, setSecondsLeft] = useState(() => {
        const totalMinutes = quiz.questions.length / 2;
        return Math.round(totalMinutes * 60);
    });

    const totalQuestions = quiz.questions.length;
    const currentQuestion = quiz.questions[currentIndex];
    const isLastQuestion = currentIndex === totalQuestions - 1;

    // Countdown timer — runs only when answering (paused while reading explanation)
    useEffect(() => {
        if (phase === 'revealed') return; // pause during reveal
        if (secondsLeft <= 0) {
            void finishQuiz();
            return;
        }
        const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [secondsLeft, phase]);

    // Format seconds -> "M:SS"
    const formattedTime = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`;

    function handleSelectAnswer(index: number) {
        if (phase === 'revealed') return; // lock after reveal
        setSelectedIndex(index);
    }

    function handleConfirm() {
        if (selectedIndex === null) return;
        const selectedAnswer = currentQuestion.answers[selectedIndex];

        setAnswers((prev) => [
            ...prev,
            {
                question_id: currentQuestion.id,
                selected_answer_id: selectedAnswer.id,
            },
        ]);
        setPhase('revealed');
    }

    async function finishQuiz() {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const payload: SubmitQuizRequest = {
            started_at: startedAt.current,
            expected_correct_answers: expectedCorrectAnswers,
            answers: answersRef.current,
        };

        try {
            const result: AttemptResultResponse =
                await submitQuiz(quiz.id, payload);
            navigate("/quiz/results", {
                state: {
                    result,
                    quiz,
                },
            });

        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleNext() {
        if (isLastQuestion) {
            await finishQuiz();
            return;
        } else {
            setCurrentIndex((prev) => prev + 1);
            setSelectedIndex(null);
            setPhase('answering');
        }
    }

    function handleExit() {
        navigate('/quizzes');
    }

    const progressPercentage = ((currentIndex + 1)/ totalQuestions) * 100;

    return {
        quiz,
        currentQuestion,
        currentIndex,
        totalQuestions,
        phase,
        selectedIndex,
        isLastQuestion,
        progressPercentage,
        formattedTime,
        secondsLeft,
        isSubmitting,
        handleSelectAnswer,
        handleConfirm,
        handleNext,
        handleExit,
    };
}
