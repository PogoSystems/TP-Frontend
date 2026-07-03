import { apiClient } from "../../../shared/services/api/axios-client";
import type {UserDashboardResponse, CourseAnalyticsResponse,} from "../types/metrics.types";

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