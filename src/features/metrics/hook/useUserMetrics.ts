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
            setMetrics(data);
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