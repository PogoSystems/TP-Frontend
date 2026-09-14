import type { BloomLevel } from "../../../shared/types/bloomLevel";

export type BloomLevelKey = BloomLevel | 'create';

/** Maps to the `bloom_stats` table — one row per (course_id, bloom_level) */
export interface BloomStatsResponse {
    bloom_level: BloomLevel ;
    questions_attempted: number;
    questions_correct: number;
    percentage: number;
}
export interface CoursePerformanceResponse {
    course_id: number;
    course_name: string;
    quizzes_completed: number;
    accuracy_percentage: number;
}
export interface ProgressPoint {
    label: string;
    accuracy: number;
}

export interface ProgressResponse{
    granularity:string;
    points: ProgressPoint[];
}

export interface UserDashboardResponse {
    quizzes_completed: number;
    questions_attempted: number;
    questions_correct: number;
    overall_accuracy: number;
    dominant_level: BloomLevel | null;
    dominant_percentage: number;
    dominant_correct: number;
    weak_level: BloomLevel | null;
    weak_percentage: number;
    weak_correct: number;
    most_practiced_level: BloomLevel | null;
    most_practiced_attempted: number;
    bloom_breakdown: BloomStatsResponse[];
    course_performance: CoursePerformanceResponse[];
    progress_over_time?: ProgressPoint[];
}

export interface CourseAnalyticsResponse {
    course_id: number;
    dominant_level: BloomLevel | null;
    dominant_percentage: number;
    dominant_correct: number;
    weak_level: BloomLevel | null;
    weak_percentage: number;
    weak_correct: number;
    bloom_breakdown: BloomStatsResponse[];
}
