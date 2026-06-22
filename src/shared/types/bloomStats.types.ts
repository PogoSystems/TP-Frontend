export interface UserBloomStats{
    id: string,
    user_id:string,
    course_id:string,
    correct_questions: number,
    incorrect_questions: number,
    max_score:number,
    remember_percentage:number,
    understand_percentage:number,
    apply_percentage:number,
    analyze_percentage:number,
    evaluate_percentage:number
    updated_at: string,
}