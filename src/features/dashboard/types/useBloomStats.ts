import type {UserBloomStats} from "../../../shared/types/bloomStats.types.ts";
import {mapBloomStatsToChartData} from "../../../shared/utils/mapBloomStats.ts";

const MOCK_BLOOM_STATS: UserBloomStats ={
    id: 'stats1',
    user_id: 'user1',
    course_id: 'course1',
    correct_questions: 80,
    incorrect_questions: 20,
    max_score: 100,
    remember_percentage: 40,
    understand_percentage: 30,
    apply_percentage: 20,
    analyze_percentage: 10,
    evaluate_percentage: 5,
    updated_at: '2024-06-01T12:00:00Z',
}

export function useBloomStats(){
    const bloomChartData= mapBloomStatsToChartData(MOCK_BLOOM_STATS);
    return {bloomChartData};
}