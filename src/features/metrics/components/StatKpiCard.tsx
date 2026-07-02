import type { ReactNode } from 'react';

interface StatKpiCardProps {
    title: string;
    value: string | number;
    children?: ReactNode;       // sub-element: progress bar, badges, etc.
    isMain?: boolean;           // larger styling for the "Rendimiento general" card
}

/**
 * Tarjeta de KPI superior del dashboard de métricas.
 * Muestra un título, un valor grande y un sub-elemento opcional (barra de progreso, badges, etc.)
 */
export function StatKpiCard({ title, value, children, isMain = false }: StatKpiCardProps) {
    return (
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 flex flex-col gap-2 flex-1 min-w-0">
            <p className={`font-semibold ${isMain ? 'text-[#1a3a5a] text-base' : 'text-[#4a5565] text-sm'}`}>
                {title}
            </p>
            <p className="text-[#1a3a5a] text-3xl font-bold leading-tight">{value}</p>
            {children}
        </div>
    );
}
