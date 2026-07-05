import { useEffect, useState } from "react";
import { fetchUserProgress } from "../services/metricsService";
import type { ProgressResponse } from "../types/metrics.types";
import  {ProgressGranularity, type ProgressGranularityValue} from "../../../shared/utils/progress.ts";

export function useUserProgress() {
    const [progress, setProgress] = useState<ProgressResponse | null>(null);
    const [granularity, setGranularity] = useState<ProgressGranularityValue>(ProgressGranularity.WEEK);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoading(true);
        setError(null);

        fetchUserProgress(granularity)
            .then((data) => {
                if (isMounted) {
                    setProgress(data);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setError("There was an error loading the progress");
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [granularity]);

    return {
        progress,granularity, setGranularity, isLoading, error
    };
}