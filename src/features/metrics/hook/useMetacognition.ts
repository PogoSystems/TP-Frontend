import { useState, useEffect, useCallback } from 'react';
import {
    fetchMetacognitionSummary,
    fetchCourseMetacognition,
    fetchBloomMetacognition,
    fetchMetacognitionProgress,
} from '../services/metacognitionService';
import type {
    MetacognitionSummaryResponse,
    CourseMetacognitionDetailResponse,
    BloomMetacognitionResponse,
    MetacognitionProgressResponse,
} from '../types/metacognition.types';

export function useMetacognition() {
    const [summary, setSummary] = useState<MetacognitionSummaryResponse | null>(null);
    const [courseDetail, setCourseDetail] = useState<CourseMetacognitionDetailResponse | null>(null);
    const [bloomBreakdown, setBloomBreakdown] = useState<BloomMetacognitionResponse[]>([]);
    const [progress, setProgress] = useState<MetacognitionProgressResponse | null>(null);

    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [granularity, setGranularity] = useState<'week' | 'month'>('week');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const summaryPromise = fetchMetacognitionSummary();
            const bloomPromise = fetchBloomMetacognition(selectedCourseId ?? undefined);
            const progressPromise = fetchMetacognitionProgress(granularity, selectedCourseId ?? undefined);
            const courseDetailPromise = selectedCourseId
                ? fetchCourseMetacognition(selectedCourseId)
                : Promise.resolve(null);

            const [sumRes, bloomRes, progRes, detailRes] = await Promise.all([
                summaryPromise,
                bloomPromise,
                progressPromise,
                courseDetailPromise,
            ]);

            setSummary(sumRes);
            setBloomBreakdown(bloomRes);
            setProgress(progRes);
            setCourseDetail(detailRes);
        } catch (err: unknown) {
            console.error('Error fetching metacognition analytics:', err);
            const message = err instanceof Error ? err.message : 'Error al obtener datos de metacognición.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [selectedCourseId, granularity]);

    useEffect(() => {
        let isMounted = true;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void (async () => {
            try {
                const summaryPromise = fetchMetacognitionSummary();
                const bloomPromise = fetchBloomMetacognition(selectedCourseId ?? undefined);
                const progressPromise = fetchMetacognitionProgress(granularity, selectedCourseId ?? undefined);
                const courseDetailPromise = selectedCourseId
                    ? fetchCourseMetacognition(selectedCourseId)
                    : Promise.resolve(null);

                const [sumRes, bloomRes, progRes, detailRes] = await Promise.all([
                    summaryPromise,
                    bloomPromise,
                    progressPromise,
                    courseDetailPromise,
                ]);

                if (isMounted) {
                    setSummary(sumRes);
                    setBloomBreakdown(bloomRes);
                    setProgress(progRes);
                    setCourseDetail(detailRes);
                    setError(null);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    const message = err instanceof Error ? err.message : 'Error al obtener datos de metacognición.';
                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [selectedCourseId, granularity]);

    return {
        summary,
        courseDetail,
        bloomBreakdown,
        progress,
        selectedCourseId,
        setSelectedCourseId,
        granularity,
        setGranularity,
        isLoading,
        error,
        refetch: loadData,
    };
}
