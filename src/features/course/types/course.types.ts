import type {BloomLevel} from "../../../shared/types/bloomLevel.ts";

export interface CourseSummary{
    id: number,
    iconText: string,
    title: string,
    description: string,
    lastQuizTime: string
}

export interface CreateCourseRequest {
    name: string;
    description: string;
}

export interface UpdateCourseRequest {
    name?: string;
    description?: string;
    max_score?: number;
}

export interface CourseResponse {
    id: number
    name: string
    description: string | null
    user_id: number
    max_score: number | null
    created_at: string
}

export interface CourseBloomStats {
    remember: number;
    understand: number;
    apply: number;
    analyze: number;
    evaluate: number;
    create: number;
}

export interface CourseProgressPoint {
    label: string;
    score: number;
}

export interface CourseDetail extends CourseSummary {
    bloomStats: CourseBloomStats;
    dominantLevel: string;
    dominantLevelPercentage: number;
    dominantLevelAnswered: number;
    weakLevel: string;
    weakLevelPercentage: number;
    weakLevelAnswered: number;
    tip: string;
    progressOverTime: CourseProgressPoint[];
    syllabusUploaded: boolean;
}

export interface CourseAnalyticsResponse {
    course_id: number;
    dominant_level: BloomLevel | null;
    dominant_percentage: number;
    dominant_correct: number;
    weak_level: BloomLevel | null;
    weak_percentage: number;
    weak_correct: number;
    progress_over_time?: CourseProgressPoint[]
    bloom_breakdown: {
        bloom_level: BloomLevel;
        questions_attempted: number;
        questions_correct: number;
        percentage: number;
    }[];
}