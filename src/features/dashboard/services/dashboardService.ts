import { apiClient } from '../../../shared/services/api/axios-client';
import type { CourseResponse } from '../../course/types/course.types.ts';

export interface TopCoursesResponse {
    courses: CourseResponse[];
    total_courses: number;
}

export interface RecentQuizAttemptResponse {
    id: number | null;
    quiz_id: number | null;
    quiz_title: string | null;
    total_score: number | null;
    submitted_at: string | null;
    total_quizzes_completed: number;
}

export interface AchievementResponse {
    id: number;
    name: string;
    description: string;
    img_url: string;
    unlocked: boolean;
    unlocked_at: string | null;
    progress_current: number | null;
    progress_target: number | null;
}

export interface RecentAchievementResponse {
    achievement: AchievementResponse | null;
    current_streak: number;
}

export const getTopCourses = async (): Promise<TopCoursesResponse> => {
    const { data } = await apiClient.get<TopCoursesResponse>('/courses/summary');
    return data;
};

export const getRecentQuiz = async (): Promise<RecentQuizAttemptResponse | null> => {
    const { data } = await apiClient.get<RecentQuizAttemptResponse | null>('/quizzes/recent');
    return data;
};

export const getRecentAchievement = async (): Promise<RecentAchievementResponse> => {
    const { data } = await apiClient.get<RecentAchievementResponse>('/gamification/achievements/recent');
    return data;
};

export interface BloomSummaryResponse {
    bloom_level: string;
    questions_attempted: number;
    questions_correct: number;
    percentage: number;
}

export const getBloomSummary = async (): Promise<BloomSummaryResponse[]> => {
    const { data } = await apiClient.get<BloomSummaryResponse[]>('/analytics/summary/bloom');
    return data;
};

