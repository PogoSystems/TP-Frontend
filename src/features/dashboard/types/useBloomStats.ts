import { useState, useEffect } from 'react';
import type { BloomLevel } from "../../../shared/types/bloomLevel.ts";
import { getBloomSummary } from "../services/dashboardService.ts";

export function useBloomStats() {
    const [bloomChartData, setBloomChartData] = useState<{percentage: number, bloomLevel: BloomLevel}[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBloomStats = async () => {
            try {
                const data = await getBloomSummary();
                const allLevels: BloomLevel[] = ['remember', 'understand', 'apply', 'analyze', 'evaluate'];
                
                const mappedData = allLevels.map(level => {
                    const found = data.find(d => d.bloom_level === level);
                    return {
                        bloomLevel: level,
                        percentage: found ? found.percentage : 0
                    };
                });
                setBloomChartData(mappedData);
            } catch (error) {
                console.error("Failed to fetch bloom stats", error);
                const allLevels: BloomLevel[] = ['remember', 'understand', 'apply', 'analyze', 'evaluate'];
                setBloomChartData(allLevels.map(l => ({ bloomLevel: l, percentage: 0 })));
            } finally {
                setLoading(false);
            }
        };

        fetchBloomStats();
    }, []);

    return { bloomChartData, loading };
}