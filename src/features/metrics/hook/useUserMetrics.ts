import { useEffect, useState, useCallback } from 'react';
import { fetchUserDashboard } from "../services/metricsService.ts";
import type { UserDashboardResponse } from "../types/metrics.types.ts";

export function useUserMetrics() {
    const [metrics, setMetrics] = useState<UserDashboardResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadMetrics = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchUserDashboard();
            const sortedCoursePerformance = [...data.course_performance].sort((a, b) => {
                if (b.quizzes_completed !== a.quizzes_completed) {
                    return b.quizzes_completed - a.quizzes_completed;
                }
                return a.course_name.localeCompare(b.course_name, undefined, { sensitivity: 'base' });
            });
            setMetrics({
                ...data,
                course_performance: sortedCoursePerformance,
            });
        } catch {
            setError('Hubo un error al cargar las métricas de progreso.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMetrics();
    }, [loadMetrics]);

    return { metrics, isLoading, error, refetch: loadMetrics };
}