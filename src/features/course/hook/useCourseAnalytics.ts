import { useEffect, useState } from "react";
import type { CourseAnalyticsResponse } from "../types/course.types.ts";
import {fetchCourseAnalytics} from "../../metrics/services/metricsService.ts";


export function useCourseAnalytics(courseId: number) {
    const [analytics, setAnalytics] = useState<CourseAnalyticsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        fetchCourseAnalytics(courseId)
            .then((data) => {
                if (active) setAnalytics(data);
            })
            .catch(() => {
                if (active) setError("Error cargando estadísticas del curso");
            })
            .finally(() => {
                if (active) setIsLoading(false);
            });

        return () => {
            active = false;
        };
    }, [courseId]);

    return { analytics, isLoading, error };
}