import { CircleCheckBig, Lock } from 'lucide-react';
import type { AchievementResponse } from '../types/profile.types';

interface AchievementCardProps {
    achievement: AchievementResponse;
}

/**
 * * Tarjeta de logro con dos variantes visuales:
 *   - Completado (unlocked): fondo blanco, borde azul, ícono con bg azul oscuro, badge verde
 *  - En progreso (locked): fondo gris, borde gris, ícono gris, barra de progreso
 */
export function AchievementCard({ achievement }: AchievementCardProps) {
    const { name, description, unlocked, progress_current, progress_target } = achievement;

    const isInProgress = !unlocked && progress_current != null && progress_target != null;
    const progressPercent = isInProgress ? Math.round((progress_current! / progress_target!) * 100) : 0;

    return (
        <div
            className={`rounded-xl border-1 py-2 px-4  flex items-center gap-4 transition-all
                ${unlocked
                ? 'bg-white border-[#c6d2ff] shadow-sm'
                : 'bg-[#f4f4f4] border-[#e5e7eb]'
            }`}
        >
            {/* Icon */}
            <div
                className={`size-12 rounded-xl flex items-center justify-center shrink-0
                    ${unlocked
                    ? 'bg-[#1c398e] shadow-sm'
                    : 'bg-[#d1d5dc]'
                }`}
            >
                {unlocked
                    ? <CircleCheckBig size={24} className="text-white" />
                    : <Lock size={24} className="text-white" />
                }
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
                {/* Title row */}
                <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-base font-semibold leading-tight truncate ${unlocked ? 'text-[#1a3a5a]' : 'text-[#6a7282]'}`}>
                        {name}
                    </h3>
                    {unlocked && (
                        <span className="flex items-center gap-1 shrink-0">
                            <CircleCheckBig size={14} className="text-[#00a63e]" />
                            <span className="text-xs font-semibold text-[#00a63e]">Completado</span>
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed line-clamp-2 ${unlocked ? 'text-[#4a5565]' : 'text-[#889dc1]'}`}>
                    {description}
                </p>

                {/* Progress Bar */}
                {isInProgress && (
                    <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-[#4a5565]">Progreso</span>
                            <span className="text-[11px] text-[#6a7282]">
                                {progress_current} / {progress_target}
                            </span>
                        </div>
                        <div className="bg-[#e5e7eb] rounded-full h-1.5 w-full overflow-hidden">
                            <div
                                className="bg-[#db1a1a] h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}