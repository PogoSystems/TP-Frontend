import { apiClient } from '../../../shared/services/api/axios-client';
import type {
    MetacognitionSummaryResponse,
    CourseMetacognitionDetailResponse,
    BloomMetacognitionResponse,
    MetacognitionProgressResponse,
} from '../types/metacognition.types';

export async function fetchMetacognitionSummary(): Promise<MetacognitionSummaryResponse> {
    const { data } = await apiClient.get<MetacognitionSummaryResponse>('/analytics/metacognition/summary');
    return data;
}

export async function fetchCourseMetacognition(courseId: number): Promise<CourseMetacognitionDetailResponse> {
    const { data } = await apiClient.get<CourseMetacognitionDetailResponse>(
        `/analytics/metacognition/course/${courseId}`
    );
    return data;
}

export async function fetchBloomMetacognition(courseId?: number): Promise<BloomMetacognitionResponse[]> {
    const { data } = await apiClient.get<BloomMetacognitionResponse[]>('/analytics/metacognition/bloom', {
        params: {
            ...(courseId !== undefined && { course_id: courseId }),
        },
    });
    return data;
}

export async function fetchMetacognitionProgress(
    granularity: 'week' | 'month' = 'week',
    courseId?: number
): Promise<MetacognitionProgressResponse> {
    const { data } = await apiClient.get<MetacognitionProgressResponse>('/analytics/metacognition/progress', {
        params: {
            granularity,
            ...(courseId !== undefined && { course_id: courseId }),
        },
    });
    return data;
}
