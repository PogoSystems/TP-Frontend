import { apiClient } from "../../../shared/services/api/axios-client";
import type { ProfilePageData } from "../types/profile.types";

// ── MOCK ─────────────────────────────────────────────────────────────────
// TODO: Eliminar este bloque cuando el endpoint real esté disponible.
//       Descomentar la llamada a apiClient.get y eliminar MOCK_RESPONSE.
//
// Datos necesarios del backend (endpoint sugerido: GET /profile/me):
//
// user:
//   - name, last_name, email, major, college (directo de tabla user)
//
// stats (calculados en el backend):
//   - current_streak: racha actual en días
//   - best_streak: mejor racha en días
//   - highest_score: puntaje más alto
//   - achievements_unlocked: COUNT(user_achievement WHERE user_id = current)
//   - achievements_total: COUNT(achievement)
//
// weekly_activity (calculado en backend):
//   - boolean[7] indicando actividad Mon–Sun de la semana actual
//
// achievements (JOIN achievement + user_achievement):
//   - id, name, description, img_url (de tabla achievement)
//   - unlocked, unlocked_at (de tabla user_achievement, si existe)
//   - progress_current, progress_target (calculados en backend según tipo de logro)
// ──────────────────────────────────────────────────────────────────────────

const MOCK_RESPONSE: ProfilePageData = {
    user: {
        name: "Lionel",
        last_name: "Rodriguez",
        email: "u20251045@upc.edu.pe",
        major: "Ingeniería de Software",
        college: "Universidad Peruana de Ciencias Aplicadas",
    },
    stats: {
        current_streak: 6,
        best_streak: 18,
        highest_score: 500,
        achievements_unlocked: 12,
        achievements_total: 24,
    },
    weekly_activity: [true, true, true, true, true, true, false],
    achievements: [
        {
            id: 1,
            name: "Primeros Pasos",
            description: "Completa tu primer quiz",
            img_url: "",
            unlocked: true,
            unlocked_at: "2025-06-01T10:00:00Z",
            progress_current: null,
            progress_target: null,
        },
        {
            id: 2,
            name: "Guerrero de la Semana",
            description: "Manten una racha de 7 días",
            img_url: "",
            unlocked: true,
            unlocked_at: "2025-06-10T10:00:00Z",
            progress_current: null,
            progress_target: null,
        },
        {
            id: 3,
            name: "Maestro de los Cuestionarios",
            description: "Completa 25 cuestionarios",
            img_url: "",
            unlocked: false,
            unlocked_at: null,
            progress_current: 18,
            progress_target: 25,
        },
        {
            id: 4,
            name: "Perfeccionista",
            description: "Logra responder el 100% de las preguntas de forma correcta en cualquier quiz",
            img_url: "",
            unlocked: true,
            unlocked_at: "2025-06-15T10:00:00Z",
            progress_current: null,
            progress_target: null,
        },
        {
            id: 5,
            name: "Campeón de la Constancia",
            description: "Manten una racha de 30 días",
            img_url: "",
            unlocked: false,
            unlocked_at: null,
            progress_current: 7,
            progress_target: 30,
        },
        {
            id: 6,
            name: "Erudito Renacentista",
            description: "Completa al menos un cuestionario en 5 cursos diferentes",
            img_url: "",
            unlocked: false,
            unlocked_at: null,
            progress_current: 3,
            progress_target: 5,
        },
        {
            id: 7,
            name: "Excelencia cognitiva",
            description: "Logra un puntaje de 80% en todos los niveles de Bloom",
            img_url: "",
            unlocked: false,
            unlocked_at: null,
            progress_current: 4,
            progress_target: 6,
        },
        {
            id: 8,
            name: "Triunfador",
            description: "Logra una puntuación superior a 90% en 10 cuestionarios",
            img_url: "",
            unlocked: false,
            unlocked_at: null,
            progress_current: 6,
            progress_target: 10,
        },
    ],
};

export async function fetchProfileData(): Promise<ProfilePageData> {
    // TODO: Conectar endpoint real — descomentar la línea siguiente y eliminar el return del mock
    // const { data } = await apiClient.get<ProfilePageData>("/profile/me");
    // return data;

    // ── MOCK — simula latencia de red
    void apiClient; // evita lint de import no usado
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_RESPONSE), 400);
    });
}
