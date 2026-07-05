export interface UpdateProfileRequest {
    name?: string | null;
    last_name?: string | null;
    email?: string | null;
    college?: string | null;
    major?: string | null;
}

/** Respuesta del perfil de usuario desde el backend */
export interface UserProfileResponse {
    name: string;
    last_name: string;
    email: string;
    major: string;       // "Ingeniería de Software"
    college: string;     // "Universidad Peruana de Ciencias Aplicadas"
}

/** KPIs de gamificación — calculados en el backend */
export interface GamificationStatsResponse {
    current_streak: number;       // Racha actual en días
    best_streak: number;          // Mejor racha en días
    highest_score: number;        // Puntaje más alto obtenido
    achievements_unlocked: number; // Logros desbloqueados (COUNT user_achievement)
    achievements_total: number;    // Total de logros (COUNT achievement)
}

/** Un logro individual con su estado de progreso */
export interface AchievementResponse {
    id: number;
    name: string;
    description: string;
    img_url: string;
    unlocked: boolean;            // true si existe en user_achievement
    unlocked_at: string | null;   // fecha ISO o null
    progress_current: number | null; // progreso actual (ej: 18 quizzes completados)
    progress_target: number | null;  // objetivo (ej: 25)
}

/** Tipo que agrupa toda la información de la página de perfil */
export interface ProfilePageData {
    user: UserProfileResponse;
    stats: GamificationStatsResponse;
    weekly_activity: boolean[];   // Array de 7 bools (Mon–Sun)
    achievements: AchievementResponse[];
}
