import { useEffect, useState } from "react";
import type {ProgressResponse} from "../../metrics/types/metrics.types.ts";
import {fetchUserProgress} from "../../metrics/services/metricsService.ts";
import  {ProgressGranularity, type ProgressGranularityValue} from "../../../shared/utils/progress.ts";

export function useCourseProgress(courseId: number) {
    const [progress, setProgress] = useState<ProgressResponse | null>(null);
    const [granularity, setGranularity] =
        useState<ProgressGranularityValue>(ProgressGranularity.WEEK);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetchUserProgress(granularity, courseId)
            .then((data) => {
                if (!isMounted) return;

                setProgress(data);
                setError(null);
            })
            .catch(() => {
                if (!isMounted) return;

                setError("There was an error loading the progress of the course");
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [courseId, granularity]);

    return {
        progress,
        granularity,
        setGranularity,
        isLoading,
        error,
    };
}