import type {BloomLevel} from "../types/bloomLevel.ts";
import type {UserBloomStats} from "../types/bloomStats.types.ts";

// represents the data structure of the component chart data
interface BloomLevelData{
    percentage: number;
    bloomLevel: BloomLevel;
}

// to use the info from the api and map it to the data structure of the component chart data
export function mapBloomStatsToChartData(stats: UserBloomStats): BloomLevelData[]{
    return[
        { bloomLevel: 'remember', percentage: stats.remember_percentage},
        { bloomLevel: 'understand', percentage: stats.understand_percentage},
        { bloomLevel: 'apply', percentage: stats.apply_percentage},
        { bloomLevel: 'analyze', percentage: stats.analyze_percentage},
        { bloomLevel: 'evaluate', percentage: stats.evaluate_percentage},
    ]
}