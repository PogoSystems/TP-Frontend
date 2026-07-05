import { apiClient } from "../../../shared/services/api/axios-client";
import type {UserDashboardResponse, CourseAnalyticsResponse, ProgressResponse,} from "../types/metrics.types";
import  {ProgressGranularity, type ProgressGranularityValue} from "../../../shared/utils/progress.ts";

export async function fetchUserDashboard(): Promise<UserDashboardResponse> {
    const { data } = await apiClient.get<UserDashboardResponse>("/analytics/me");
    return data;
}

export async function fetchCourseAnalytics(courseId: number,): Promise<CourseAnalyticsResponse> {
    const { data } = await apiClient.get<CourseAnalyticsResponse>(
        `/analytics/course/${courseId}`,
    );
    return data;
}


export async function fetchUserProgress(granularity: ProgressGranularityValue = ProgressGranularity.WEEK , courseId?: number): Promise<ProgressResponse> {
    const { data } = await apiClient.get<ProgressResponse>("/analytics/progress",
        {
            params: {
                granularity,
                ...(courseId !== undefined && { course_id: courseId }),
            },
        }
    );
    return data;
}