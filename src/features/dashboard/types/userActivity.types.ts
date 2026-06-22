export interface UserActivity{
    id: string;
    type:ActivityType,
    title:string,
    description:string,
    time:string
}

export type ActivityType = 'quiz' | 'achievement';