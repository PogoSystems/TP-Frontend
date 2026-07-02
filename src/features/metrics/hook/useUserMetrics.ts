//lógica de la feature, hooks personalizados, funciones de negocio, etc. Puro código

import { useEffect, useState } from 'react';
import type { UserMetrics } from '../types/metrics.types.ts';
import { fetchUserMetrics } from '../services/metricsService.ts';

export function useUserMetrics() {
    const [metrics, setMetrics] = useState<UserMetrics | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        fetchUserMetrics()
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