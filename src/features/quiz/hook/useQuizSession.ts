import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Quiz, QuizAnswerRecord, QuizResult, BloomBreakdown } from '../types/quiz.types.ts';

// Mock quiz data matching the JSON structure provided
export const MOCK_QUIZ: Quiz = {
    title: 'Cuestionario sobre User Stories y Criterios de Aceptación',
    questions: [
        {
            text: '¿Cuál es el formato estándar de una User Story?',
            bloom_level: 'remember',
            score: 1,
            explanation:
                "El material de referencia establece claramente el formato estándar de una User Story como 'As a (type of user), I want to (perform some action) so that I (can achieve some goal/result/value).'",
            answers: [
                { text: '"As a (type of user), I want to (perform some action) so that I (can achieve some goal/result/value)."', is_correct: true },
                { text: '"Dado que (un contexto), Cuando (un evento ocurre), Entonces (un resultado)."', is_correct: false },
                { text: '"El sistema deberá (realizar una acción) cuando (se cumpla una condición)."', is_correct: false },
                { text: '"Necesito (una característica) porque (una razón)."', is_correct: false },
            ],
        },
        {
            text: 'Para los equipos ágiles, ¿cuál es el método principal para identificar las necesidades de los usuarios?',
            bloom_level: 'remember',
            score: 1,
            explanation:
                "El documento indica que 'Para los equipos ágiles, User Stories son el primer método para identificar necesidades de los usuarios.'",
            answers: [
                { text: 'User Stories', is_correct: true },
                { text: 'Casos de Uso', is_correct: false },
                { text: 'Diagramas de Flujo', is_correct: false },
                { text: 'Entrevistas directas', is_correct: false },
            ],
        },
        {
            text: '¿Qué elemento asegura que las User Stories se han completado correctamente y conforme a las demandas de los clientes?',
            bloom_level: 'remember',
            score: 1,
            explanation:
                "El texto responde: 'Acceptance criteria'.",
            answers: [
                { text: 'Criterios de aceptación (Acceptance criteria)', is_correct: true },
                { text: 'Pruebas unitarias', is_correct: false },
                { text: 'Revisiones de código', is_correct: false },
                { text: 'Documentación técnica', is_correct: false },
            ],
        },
        {
            text: '¿Qué concepto prioriza el proceso de desarrollo conocido como Behavior-Driven Development (BDD)?',
            bloom_level: 'understand',
            score: 2,
            explanation:
                "El material define BDD como 'un proceso de desarrollo de software que coloca en primer lugar al comportamiento.'",
            answers: [
                { text: 'El comportamiento', is_correct: true },
                { text: 'La interfaz de usuario', is_correct: false },
                { text: 'La base de datos', is_correct: false },
                { text: 'La eficiencia del código', is_correct: false },
            ],
        },
        {
            text: 'En los títulos de escenarios de BDD, ¿se deben evitar palabras como "verify", "assert" o "should"?',
            bloom_level: 'remember',
            score: 1,
            explanation:
                "El material indica explícitamente 'Evita palabras \"verify\", \"assert\" o \"should\" en títulos de escenarios.'",
            answers: [
                { text: 'Verdadero', is_correct: true },
                { text: 'Falso', is_correct: false },
            ],
        },
    ],
};

// Labels for Bloom levels
const BLOOM_LABELS: Record<string, string> = {
    remember: 'Recordar',
    understand: 'Comprender',
    apply: 'Aplicar',
    analyze: 'Analizar',
    evaluate: 'Evaluar',
    create: 'Crear',
};

type Phase = 'answering' | 'revealed';

function computeResult(quiz: Quiz, records: QuizAnswerRecord[]): QuizResult {
    const totalScore = records.reduce((sum, r) => sum + r.scoreEarned, 0);
    const maxTotalScore = records.reduce((sum, r) => sum + r.maxScore, 0);
    const correctCount = records.filter((r) => r.isCorrect).length;
    const incorrectCount = records.filter((r) => !r.isCorrect).length;

    // Group by bloom level
    const bloomMap: Record<string, { correct: number; total: number }> = {};
    for (const record of records) {
        const lvl = record.bloomLevel;
        if (!bloomMap[lvl]) bloomMap[lvl] = { correct: 0, total: 0 };
        bloomMap[lvl].total += 1;
        if (record.isCorrect) bloomMap[lvl].correct += 1;
    }

    const bloomBreakdown: BloomBreakdown[] = Object.entries(bloomMap).map(([bloomLevel, data]) => ({
        bloomLevel,
        label: BLOOM_LABELS[bloomLevel] ?? bloomLevel,
        correct: data.correct,
        total: data.total,
    }));

    return { quiz, records, totalScore, maxTotalScore, correctCount, incorrectCount, bloomBreakdown };
}

export function useQuizSession(quiz: Quiz) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState<Phase>('answering');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [records, setRecords] = useState<QuizAnswerRecord[]>([]);
    const [secondsLeft, setSecondsLeft] = useState(() => {
        const totalMinutes = quiz.questions.length / 2;
        return Math.round(totalMinutes * 60);
    });

    // Keep a ref to always have the latest records inside the timer callback
    const recordsRef = useRef(records);
    recordsRef.current = records;

    const totalQuestions = quiz.questions.length;
    const currentQuestion = quiz.questions[currentIndex];
    const isLastQuestion = currentIndex === totalQuestions - 1;

    // Countdown timer — runs only when answering (paused while reading explanation)
    useEffect(() => {
        if (phase === 'revealed') return; // pause during reveal
        if (secondsLeft <= 0) {
            // Time's up: navigate to results with whatever records we have
            const result = computeResult(quiz, recordsRef.current);
            navigate('/quiz/results', { state: { result } });
            return;
        }
        const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [secondsLeft, phase, quiz, navigate]);

    // Format seconds → "M:SS"
    const formattedTime = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`;

    function handleSelectAnswer(index: number) {
        if (phase === 'revealed') return; // lock after reveal
        setSelectedIndex(index);
    }

    function handleConfirm() {
        if (selectedIndex === null) return;
        const answer = currentQuestion.answers[selectedIndex];
        const isCorrect = answer.is_correct;

        const record: QuizAnswerRecord = {
            questionIndex: currentIndex,
            selectedAnswerIndex: selectedIndex,
            isCorrect,
            bloomLevel: currentQuestion.bloom_level,
            scoreEarned: isCorrect ? currentQuestion.score : 0,
            maxScore: currentQuestion.score,
        };

        setRecords((prev) => [...prev, record]);
        setPhase('revealed');
    }

    function handleNext() {
        if (isLastQuestion) {
            // Build final result and navigate
            const finalRecords = [...records]; // records already has the last entry from handleConfirm
            const result = computeResult(quiz, finalRecords);
            navigate('/quiz/results', { state: { result } });
        } else {
            setCurrentIndex((prev) => prev + 1);
            setPhase('answering');
            setSelectedIndex(null);
        }
    }

    function handleExit() {
        navigate('/quizzes');
    }

    const progressPercentage = (currentIndex / totalQuestions) * 100;

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
        handleSelectAnswer,
        handleConfirm,
        handleNext,
        handleExit,
    };
}
