import type { BloomLevel } from '../../../shared/types/bloomLevel';

export type MetacognitionBias = 'overconfident' | 'underconfident' | 'calibrated';

export interface CourseMetacognitionSummary {
    course_id: number;
    course_name: string;
    quizzes_evaluated: number;
    calibration_accuracy_percentage: number;
    bias: MetacognitionBias;
}

export interface MetacognitionSummaryResponse {
    calibration_accuracy_percentage: number;
    average_expected: number;
    average_actual: number;
    bias: MetacognitionBias;
    bias_gap: number;
    total_evaluated_quizzes: number;
    course_breakdown: CourseMetacognitionSummary[];
}

export interface QuizAttemptMetacognition {
    quiz_id: number;
    quiz_title: string;
    submitted_at: string;
    total_questions: number;
    expected_correct: number;
    actual_correct: number;
    gap: number;
    calibration_accuracy: number;
}

export interface CourseMetacognitionDetailResponse {
    course_id: number;
    course_name: string;
    calibration_accuracy_percentage: number;
    average_expected: number;
    average_actual: number;
    bias: MetacognitionBias;
    quizzes_evaluated: number;
    recent_attempts: QuizAttemptMetacognition[];
}

export interface BloomMetacognitionResponse {
    bloom_level: BloomLevel;
    questions_attempted: number;
    actual_correct: number;
    expected_correct: number;
    calibration_accuracy: number;
    bias: MetacognitionBias;
}

export interface MetacognitionProgressPoint {
    period: string;
    avg_expected: number;
    avg_actual: number;
    calibration_accuracy: number;
    quizzes_count: number;
}

export interface MetacognitionProgressResponse {
    granularity: 'week' | 'month';
    points: MetacognitionProgressPoint[];
}
