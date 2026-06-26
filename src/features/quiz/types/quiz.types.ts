export interface QuizAnswer {
    text: string;
    is_correct: boolean;
}

export interface QuizQuestion {
    text: string;
    bloom_level: string;
    score: number;
    explanation: string;
    answers: QuizAnswer[];
}

export interface Quiz {
    title: string;
    questions: QuizQuestion[];
}

// Runtime state per answered question
export interface QuizAnswerRecord {
    questionIndex: number;
    selectedAnswerIndex: number;
    isCorrect: boolean;
    bloomLevel: string;
    scoreEarned: number;
    maxScore: number;
}

// Final computed result passed to results page
export interface QuizResult {
    quiz: Quiz;
    records: QuizAnswerRecord[];
    totalScore: number;
    maxTotalScore: number;
    correctCount: number;
    incorrectCount: number;
    bloomBreakdown: BloomBreakdown[];
}

export interface BloomBreakdown {
    bloomLevel: string;
    label: string;
    correct: number;
    total: number;
}
