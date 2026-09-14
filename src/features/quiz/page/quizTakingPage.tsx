import { useLocation, Navigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useQuizSession } from '../hook/useQuizSession.ts';
import { QuizAnswerOption } from '../components/quizAnswerOption.tsx';
import { QuizProgressBar } from '../components/quizProgressBar.tsx';
import type { Quiz } from '../types/quiz.types.ts';
import {BloomLevelLabel} from "../../../shared/types/bloomLevel.ts";

function QuizTakingContent({ quiz }: { quiz: Quiz }) {
    const {
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
    } = useQuizSession(quiz);

    // Determine the visual state for each answer option
    function getAnswerState(answerIndex: number): 'idle' | 'selected' | 'correct' | 'incorrect' {
        if (phase === 'answering') {
            return answerIndex === selectedIndex ? 'selected' : 'idle';
        }
        // phase === 'revealed'
        const answer = currentQuestion.answers[answerIndex];
        if (answer.is_correct) return 'correct';
        if (answerIndex === selectedIndex && !answer.is_correct) return 'incorrect';
        return 'idle';
    }

    const bloomLabel = BloomLevelLabel[currentQuestion.bloom_level] ?? currentQuestion.bloom_level;
    const isCorrectAnswer = selectedIndex !== null && currentQuestion.answers[selectedIndex]?.is_correct;

    return (
        <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto py-8">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold text-[#1a3a5a] leading-tight">
                        {quiz.title}
                    </h1>
                    <p className="text-base text-[#4a5565]">
                        Pregunta {currentIndex + 1} de {totalQuestions}
                    </p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl shrink-0 transition-colors ${
                    secondsLeft <= 60 ? 'bg-red-50' : 'bg-[#f3f4f6]'
                }`}>
                    <Clock size={18} className={secondsLeft <= 60 ? 'text-red-500' : 'text-[#1a3a5a]'} />
                    <span className={`text-base font-medium tabular-nums ${
                        secondsLeft <= 60 ? 'text-red-500' : 'text-[#1a3a5a]'
                    }`}>{formattedTime}</span>
                </div>
            </div>

            {/* Progress bar */}
            <QuizProgressBar percentage={progressPercentage} />

            {/* Question card */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8 flex flex-col gap-6">

                {/* Bloom badge + question text */}
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-[#432dd7]">
                        Nivel de Bloom: {bloomLabel}
                    </p>
                    <h2 className="text-xl font-semibold text-[#1a3a5a] leading-snug">
                        {currentQuestion.text}
                    </h2>
                </div>

                {/* Answer options — dynamic, renders N options */}
                <div className="flex flex-col gap-3">
                    {currentQuestion.answers.map((answer, index) => (
                        <QuizAnswerOption
                            key={index}
                            text={answer.text}
                            state={getAnswerState(index)}
                            onClick={() => handleSelectAnswer(index)}
                            disabled={phase === 'revealed'}
                        />
                    ))}
                </div>

                {/* Explanation banner — visible after reveal */}
                {phase === 'revealed' && (
                    <div
                        className={`flex flex-col gap-2 px-4 py-4 rounded-xl border ${
                            isCorrectAnswer
                                ? 'bg-[#f0fdf4] border-[#b9f8cf]'
                                : 'bg-[#fef2f2] border-[#fecaca]'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${isCorrectAnswer ? 'text-[#0d542b]' : 'text-[#82181a]'}`}>
                                {isCorrectAnswer ? '✓ ¡Correcto!' : '✗ Respuesta incorrecta'}
                            </span>
                        </div>
                        <p className={`text-sm ${isCorrectAnswer ? 'text-[#166534]' : 'text-[#991b1b]'}`}>
                            {currentQuestion.explanation}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between">
                <button
                    onClick={handleExit}
                    disabled={isSubmitting}
                    className="text-base text-[#4a5565] hover:text-[#1a3a5a] transition-colors font-medium"
                >
                    Salir del Quiz
                </button>

                <div className="flex gap-3">
                    {phase === 'answering' && (
                        <button
                            onClick={handleConfirm}
                            disabled={selectedIndex === null|| isSubmitting}
                            className={`px-6 py-2.5 rounded-xl font-medium text-base transition-colors ${
                                selectedIndex === null
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#092e5e] text-white hover:bg-[#1a3a5a]'
                            }`}
                        >
                            Confirmar
                        </button>
                    )}
                    {phase === 'revealed' && (
                        <button
                            onClick={handleNext}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-xl font-medium text-base bg-[#092e5e] text-white hover:bg-[#1a3a5a] transition-colors"
                        >
                            {isSubmitting
                                ? "Enviando..."
                                : isLastQuestion
                                    ? "Ver resultados"
                                    : "Siguiente →"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function QuizTakingPage() {
    const location = useLocation();
    const quiz: Quiz | undefined = (location.state as { quiz?: Quiz })?.quiz;

    if (!quiz) {
        return <Navigate to="/quiz/create" replace />;
    }

    return <QuizTakingContent quiz={quiz} />;
}
