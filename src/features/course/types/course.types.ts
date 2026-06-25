export interface CourseSummary{
    id: string,
    iconText: string,
    title: string,
    description: string,
    lastQuizTime: string
}

export interface CourseBloomStats {
    remember: number;
    understand: number;
    apply: number;
    analyze: number;
    evaluate: number;
    create: number;
}

export interface CourseProgressPoint {
    label: string;
    score: number;
}

export interface CourseDetail extends CourseSummary {
    bloomStats: CourseBloomStats;
    dominantLevel: string;
    dominantLevelPercentage: number;
    dominantLevelAnswered: number;
    weakLevel: string;
    weakLevelPercentage: number;
    weakLevelAnswered: number;
    tip: string;
    progressOverTime: CourseProgressPoint[];
    syllabusUploaded: boolean;
}