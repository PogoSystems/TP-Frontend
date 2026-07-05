import type { ReactNode } from 'react';

interface GamificationKpiCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon: ReactNode;
    color: string; // color for the value and unit text
}

/**
 * Tarjeta KPI de gamificación (Racha actual, Mejor racha, Puntaje más alto, Logros).
 * Muestra un título, un ícono grande, y el valor con su unidad en un color destacado.
 */
export function GamificationKpiCard({ title, value, unit, icon, color }: GamificationKpiCardProps) {
    return (
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 flex flex-col gap-3 flex-1 min-w-0">
            <p className="text-lg font-semibold text-[#1a3a5a]">{title}</p>

            <div className="flex items-end gap-2">
                {/* Icon */}
                <span className="text-3xl shrink-0" style={{ color }}>
                    {icon}
                </span>

                {/* Value + Unit */}
                <div className="flex items-end gap-0.5">
                    <span className="text-5xl font-bold leading-10" style={{ color }}>
                        {value}
                    </span>
                    {unit && (
                        <span className="text-lg font-normal leading-7" style={{ color }}>
                            {unit}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
