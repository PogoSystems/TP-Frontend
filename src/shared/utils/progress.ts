export const ProgressGranularity = {
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
} as const;

export type ProgressGranularityValue =
    typeof ProgressGranularity[keyof typeof ProgressGranularity];