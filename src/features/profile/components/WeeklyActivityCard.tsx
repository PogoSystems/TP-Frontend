import { Flame } from 'lucide-react';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface WeeklyActivityCardProps {
    activity: boolean[]; // 7 booleans (Mon–Sun)
}

/**
 * Tarjeta de actividad semanal con 7 cuadros (Mon–Sun).
 * Activos: fondo rojo #db1a1a con shadow. Inactivos: fondo gris #c4c0bd.
 */
export function WeeklyActivityCard({ activity }: WeeklyActivityCardProps) {
    return (
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-[#1a3a5a]">Actividad semanal</h2>

            <div className="flex justify-center gap-3">
                {DAY_LABELS.map((label, i) => {
                    const isActive = activity?.[i] ?? false;
                    return (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <div
                                className={`size-12 rounded-[10px] flex items-center justify-center
                                    ${isActive
                                        ? 'bg-[#db1a1a] shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]'
                                        : 'bg-[#c4c0bd] shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]'
                                    }`}
                            >
                                <Flame size={20} className="text-white" />
                            </div>
                            <span className="text-xs font-medium text-[#1a3a5a]">{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
