// los modelos de datos que se van a usar y que coinciden con los modelos que se están usando en el back

// ──────────────────────────────────────────────────────────
// Raw API response types (match DB schema exactly)
// ──────────────────────────────────────────────────────────

export type BloomLevelKey =
    | 'remember'
    | 'understand'
    | 'apply'
    | 'analyze'
    | 'evaluate'
    | 'create';

/** Maps to the `bloom_stats` table — one row per (course_id, bloom_level) */
export interface BloomStatsResponse {
    id: number;
    course_id: number;
    bloom_level: BloomLevelKey;
    questions_attempted: number;
    questions_correct: number;
    updated_at: string;
}

/** Maps to the `course_stats` table — one row per course_id */
export interface CourseStatsResponse {
    id: number;
    course_id: number;
    course_name: string;           // joined from `course.name`
    quizzes_completed: number;
    questions_attempted: number;
    questions_correct: number;
    updated_at: string;
}

/** Full payload that the endpoint returns */
export interface UserMetricsResponse {
    bloom_stats: BloomStatsResponse[];
    course_stats: CourseStatsResponse[];
}

// ──────────────────────────────────────────────────────────
// Frontend view-model types (calculated from the raw data)
// ──────────────────────────────────────────────────────────

export interface CourseMetric {
    courseId: number;
    courseName: string;
    quizzesCompleted: number;
    accuracyPercentage: number;   // (correct / attempted) * 100, 0 if no attempts
}

export interface BloomLevelMetric {
    level: BloomLevelKey;
    questionsAttempted: number;
    questionsCorrect: number;
    accuracyPercentage: number;   // (correct / attempted) * 100, 0 if no attempts
}

/** Consolidated view-model consumed by the ProgressPage */
export interface UserMetrics {
    globalAccuracyPercentage: number;   // across all courses/levels
    totalQuizzesCompleted: number;
    totalActiveCourses: number;
    dominantLevel: BloomLevelKey | null;
    dominantLevelPercentage: number;
    dominantLevelAnswered: number;
    weakLevel: BloomLevelKey | null;
    weakLevelPercentage: number;
    weakLevelAnswered: number;
    mostPracticedLevel: BloomLevelKey | null;
    mostPracticedLevelPercentage: number; // share of total questions attempted
    courseMetrics: CourseMetric[];
    bloomMetrics: BloomLevelMetric[];
    progressOverTime: { label: string; score: number }[];   // placeholder until backend provides it
}