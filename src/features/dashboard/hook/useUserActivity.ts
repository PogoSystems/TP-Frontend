import { useState, useEffect } from 'react';
import type { UserActivity } from "../types/userActivity.types.ts";
import { getRecentQuiz, getRecentAchievement } from "../services/dashboardService.ts";

export function useUserActivity() {
    const [activities, setActivities] = useState<UserActivity[]>([]);
    const [totalQuizzes, setTotalQuizzes] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const [quizData, achievementData] = await Promise.all([
                    getRecentQuiz(),
                    getRecentAchievement()
                ]);

                const newActivities: UserActivity[] = [];

                if (quizData) {
                    setTotalQuizzes(quizData.total_quizzes_completed);
                    if (quizData.id) {
                        newActivities.push({
                            id: `quiz-${quizData.id}`,
                            type: 'quiz',
                            title: `Cuestionario completado: ${quizData.quiz_title || 'Quiz'}`,
                            description: `Obtuviste ${quizData.total_score} puntos`,
                            time: quizData.submitted_at ? new Date(quizData.submitted_at).toLocaleDateString() : 'Recientemente'
                        });
                    }
                }

                if (achievementData) {
                    setCurrentStreak(achievementData.current_streak);
                    if (achievementData.achievement) {
                        const { achievement } = achievementData;
                        newActivities.push({
                            id: `achiev-${achievement.id}`,
                            type: 'achievement',
                            title: `Nuevo logro desbloqueado: ${achievement.name}`,
                            description: achievement.description,
                            time: achievement.unlocked_at ? new Date(achievement.unlocked_at).toLocaleDateString() : 'Recientemente'
                        });
                    }
                }

                setActivities(newActivities);
            } catch (error) {
                console.error("Failed to fetch user activity", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    return { activities, totalQuizzes, currentStreak, loading };
}