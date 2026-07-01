import type {UserActivity} from "../types/userActivity.types.ts";

const MOCK_ACTIVITY: UserActivity[]=[
    {
        id:'activity1',
        type:'quiz',
        title:'Cuestionario completado: Quiz 1 - Semana 10 - Calidad',
        description:'Obtuviste 140 puntos',
        time:'Hoy, 22:16'
    },
    {
        id:'activity2',
        type:'achievement',
        title:'Nuevo logro desbloqueado: Primeros Pasos',
        description:'Has completado 1 cuestionario',
        time:'Ayer, 18:16'
    }
]

export function useUserActivity(){
    return{activities:MOCK_ACTIVITY}
}