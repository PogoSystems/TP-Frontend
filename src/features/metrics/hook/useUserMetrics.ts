import { useEffect, useState } from 'react';
import {fetchUserDashboard} from "../services/metricsService.ts";
import type {UserDashboardResponse} from "../types/metrics.types.ts";

export function useUserMetrics() {
    const [metrics, setMetrics] = useState<UserDashboardResponse  | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetchUserDashboard()
            .then((data) => {
                if (isMounted) setMetrics(data);
            })
            .catch(() => {
                if (isMounted) setError('Hubo un error al cargar las métricas de progreso.');
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return { metrics, isLoading, error };
}