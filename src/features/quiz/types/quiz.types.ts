import type {BloomLevel} from "../../../shared/types/bloomLevel.ts";

export interface QuizAnswer {
    id: number;
    text: string;
    is_correct: boolean;
}

export interface QuizQuestion {
    id: number;
    text: string;
    bloom_level: BloomLevel;
    score: number;
    explanation: string;
    answers: QuizAnswer[];
}

export interface Quiz {
    id: number;
    title: string;
    questions: QuizQuestion[];
}

// Generate quiz
export interface GenerateQuizRequest {
    course_id: number;
    title: string;
    document_ids: number[];
    query_text: string;
    num_questions: number;
    bloom_levels: BloomLevel[];
}

//submit quiz
export interface SubmitQuizAnswer {
    question_id: number;
    selected_answer_id: number;
}

export interface SubmitQuizRequest {
    started_at: string;
    answers: SubmitQuizAnswer[];
}


//submit quiz response
export interface QuestionAttemptResult {
    question_id: number;
    selected_answer_id: number;
    is_correct: boolean;
    score_obtained: number;
    bloom_level: BloomLevel;
}

export interface BloomBreakdownResult {
    bloom_level: BloomLevel;
    correct: number;
    total_attempted_questions: number;
}

export interface AttemptResultResponse {
    attempt_id: number;
    quiz_id: number;
    total_score: number;
    submitted_at: string;
    question_results: QuestionAttemptResult[];
    bloom_breakdown: BloomBreakdownResult[];
}

export interface QuizSummary {
    id: number;
    title: string;
    created_at: string;
}

export interface QuizzesByCourseResponse {
    quizzes: QuizSummary[];
}