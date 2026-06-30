// interacción con el backend, llamadas a la API para consumir los endpoints

import type { UserMetricsResponse, UserMetrics } from '../types/metrics.types.ts';
// import { apiClient } from '../../../shared/services/api/axios-client.ts';  // uncomment when connecting

// ──────────────────────────────────────────────────────────
// Data transformer: maps raw API payload → UserMetrics view-model
// ──────────────────────────────────────────────────────────

export function mapResponseToUserMetrics(data: UserMetricsResponse): UserMetrics {
    const { bloom_stats, course_stats } = data;

    // ── Global accuracy ──────────────────────────────────
    const totalCorrect = course_stats.reduce((acc, c) => acc + c.questions_correct, 0);
    const totalAttempted = course_stats.reduce((acc, c) => acc + c.questions_attempted, 0);
    const globalAccuracyPercentage = totalAttempted > 0
        ? Math.round((totalCorrect / totalAttempted) * 100)
        : 0;

    // ── Totals ───────────────────────────────────────────
    const totalQuizzesCompleted = course_stats.reduce((acc, c) => acc + c.quizzes_completed, 0);
    const totalActiveCourses = course_stats.length;

    // ── Course metrics ───────────────────────────────────
    const courseMetrics = course_stats.map((c) => ({
        courseId: c.course_id,
        courseName: c.course_name,
        quizzesCompleted: c.quizzes_completed,
        accuracyPercentage: c.questions_attempted > 0
            ? Math.round((c.questions_correct / c.questions_attempted) * 100)
            : 0,
    }));

    // ── Bloom aggregations (aggregate across all courses) ─
    type BloomAgg = { attempted: number; correct: number };
    const bloomAgg: Partial<Record<string, BloomAgg>> = {};
    for (const stat of bloom_stats) {
        const existing = bloomAgg[stat.bloom_level];
        if (existing) {
            existing.attempted += stat.questions_attempted;
            existing.correct += stat.questions_correct;
        } else {
            bloomAgg[stat.bloom_level] = {
                attempted: stat.questions_attempted,
                correct: stat.questions_correct,
            };
        }
    }

    const bloomMetrics = Object.entries(bloomAgg).map(([level, agg]) => ({
        level: level as import('../types/metrics.types.ts').BloomLevelKey,
        questionsAttempted: agg!.attempted,
        questionsCorrect: agg!.correct,
        accuracyPercentage: agg!.attempted > 0
            ? Math.round((agg!.correct / agg!.attempted) * 100)
            : 0,
    }));

    // ── Dominant & weak levels (by accuracy %) ───────────
    const levelsWithAttempts = bloomMetrics.filter((b) => b.questionsAttempted > 0);

    let dominantLevel: import('../types/index.ts').BloomLevelKey | null = null;
    let dominantLevelPercentage = 0;
    let dominantLevelAnswered = 0;

    let weakLevel: import('../types/index.ts').BloomLevelKey | null = null;
    let weakLevelPercentage = 100;
    let weakLevelAnswered = 0;

    for (const b of levelsWithAttempts) {
        if (b.accuracyPercentage >= dominantLevelPercentage) {
            dominantLevel = b.level;
            dominantLevelPercentage = b.accuracyPercentage;
            dominantLevelAnswered = b.questionsAttempted;
        }
        if (b.accuracyPercentage <= weakLevelPercentage) {
            weakLevel = b.level;
            weakLevelPercentage = b.accuracyPercentage;
            weakLevelAnswered = b.questionsAttempted;
        }
    }

    // ── Most practiced level (by questions attempted) ────
    const mostPracticed = levelsWithAttempts.reduce<typeof levelsWithAttempts[0] | null>(
        (max, b) => (!max || b.questionsAttempted > max.questionsAttempted ? b : max),
        null,
    );
    const mostPracticedLevel = mostPracticed?.level ?? null;
    const mostPracticedLevelPercentage = mostPracticed && totalAttempted > 0
        ? Math.round((mostPracticed.questionsAttempted / totalAttempted) * 100)
        : 0;

    return {
        globalAccuracyPercentage,
        totalQuizzesCompleted,
        totalActiveCourses,
        dominantLevel,
        dominantLevelPercentage,
        dominantLevelAnswered,
        weakLevel,
        weakLevelPercentage,
        weakLevelAnswered,
        mostPracticedLevel,
        mostPracticedLevelPercentage,
        courseMetrics,
        bloomMetrics,
        progressOverTime: [], // TODO: populate from backend when endpoint provides this data
    };
}

// ──────────────────────────────────────────────────────────
// MOCK
// Para conectar con el backend:
//   1. Eliminar MOCK_RESPONSE y la asignación mock de abajo
//   2. Descomentar la línea con apiClient.get(...)
// ──────────────────────────────────────────────────────────

const MOCK_RESPONSE: UserMetricsResponse = {
    bloom_stats: [
        { id: 1, course_id: 1, bloom_level: 'remember', questions_attempted: 30, questions_correct: 27, updated_at: '' },
        { id: 2, course_id: 1, bloom_level: 'understand', questions_attempted: 25, questions_correct: 18, updated_at: '' },
        { id: 3, course_id: 1, bloom_level: 'apply', questions_attempted: 10, questions_correct: 7, updated_at: '' },
        { id: 4, course_id: 1, bloom_level: 'analyze', questions_attempted: 12, questions_correct: 8, updated_at: '' },
        { id: 5, course_id: 1, bloom_level: 'evaluate', questions_attempted: 5, questions_correct: 2, updated_at: '' },
        { id: 6, course_id: 2, bloom_level: 'remember', questions_attempted: 12, questions_correct: 10, updated_at: '' },
        { id: 7, course_id: 2, bloom_level: 'understand', questions_attempted: 33, questions_correct: 25, updated_at: '' },
        { id: 8, course_id: 2, bloom_level: 'apply', questions_attempted: 3, questions_correct: 2, updated_at: '' },
        { id: 9, course_id: 2, bloom_level: 'evaluate', questions_attempted: 30, questions_correct: 12, updated_at: '' },
        { id: 10, course_id: 3, bloom_level: 'remember', questions_attempted: 15, questions_correct: 14, updated_at: '' },
        { id: 11, course_id: 3, bloom_level: 'apply', questions_attempted: 20, questions_correct: 18, updated_at: '' },
        { id: 12, course_id: 3, bloom_level: 'analyze', questions_attempted: 8, questions_correct: 6, updated_at: '' },
        { id: 14, course_id: 4, bloom_level: 'understand', questions_attempted: 10, questions_correct: 6, updated_at: '' },
        { id: 15, course_id: 4, bloom_level: 'analyze', questions_attempted: 7, questions_correct: 4, updated_at: '' },
    ],
    course_stats: [
        { id: 1, course_id: 1, course_name: 'Estructura de Datos', quizzes_completed: 12, questions_attempted: 82, questions_correct: 60, updated_at: '' },
        { id: 2, course_id: 2, course_name: 'Machine Learning', quizzes_completed: 8, questions_attempted: 78, questions_correct: 49, updated_at: '' },
        { id: 3, course_id: 3, course_name: 'Desarrollo Web', quizzes_completed: 15, questions_attempted: 110, questions_correct: 97, updated_at: '' },
        { id: 4, course_id: 4, course_name: 'Base de Datos', quizzes_completed: 5, questions_attempted: 40, questions_correct: 25, updated_at: '' },
    ],
};

const MOCK_PROGRESS_OVER_TIME = [
    { label: 'Sem 1', score: 62 },
    { label: 'Sem 2', score: 68 },
    { label: 'Sem 3', score: 71 },
    { label: 'Sem 4', score: 70 },
    { label: 'Sem 5', score: 74 },
    { label: 'Sem 6', score: 78 },
    { label: 'Sem 7', score: 80 },
    { label: 'Sem 8', score: 79 },
];

export async function fetchUserMetrics(): Promise<UserMetrics> {
    // TODO: Reemplazar con llamada real cuando el endpoint esté disponible:
    // const { data } = await apiClient.get<UserMetricsResponse>('/metrics/user');
    // const metrics = mapResponseToUserMetrics(data);
    // return metrics;

    // ── MOCK (eliminar este bloque al conectar con el backend) ──
    await new Promise((resolve) => setTimeout(resolve, 400)); // simula latencia de red
    const metrics = mapResponseToUserMetrics(MOCK_RESPONSE);
    metrics.progressOverTime = MOCK_PROGRESS_OVER_TIME;
    return metrics;
    // ────────────────────────────────────────────────────────────
}