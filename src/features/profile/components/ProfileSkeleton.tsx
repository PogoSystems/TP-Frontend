import { Skeleton } from '../../../shared/components/ui/skeletons.tsx';

export function ProfileSkeleton() {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Carta Perfil (ProfileCard)*/}
            <div className="bg-white border border-[#e5e7eb] rounded-[14px] px-6 pt-6 pb-5 flex flex-col gap-6">
                {/* Tu perfil y Botón Editar perfil */}
                <div className="flex items-start justify-between">
                    <Skeleton className="h-7 w-28" />
                    <Skeleton className="h-10 w-32 rounded-lg shrink-0" />
                </div>

                {/* Avatar */}
                <div className="flex items-start gap-5">
                    {/* Avatar circular*/}
                    <Skeleton className="w-24 h-24 !rounded-full overflow-hidden shrink-0" />

                    {/* Detalles */}
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0 pt-1">
                        {/* Nombre completo */}
                        <Skeleton className="h-8 w-64" />

                        {/* Carrera */}
                        <Skeleton className="h-5 w-44" />

                        {/* Email y Universidad  */}
                        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-2">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-5 w-40" />
                        </div>
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 flex flex-col gap-3 flex-1 min-w-0"
                    >
                        {/* Título de la tarjeta */}
                        <Skeleton className="h-7 w-32" />

                        {/* Icono */}
                        <div className="flex items-end gap-2">
                            <Skeleton className="w-9 h-9 rounded-md shrink-0" />
                            <div className="flex items-end gap-1.5">
                                <Skeleton className="h-10 w-16 rounded-md" />
                                <Skeleton className="h-5 w-8 rounded-md" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Actividad Semanal */}
            <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 flex flex-col gap-4">
                <Skeleton className="h-7 w-44" />

                <div className="flex justify-center gap-3">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            {/* Cuadro size-12 con rounded-[10px] */}
                            <Skeleton className="w-12 h-12 rounded-[10px]" />
                            {/* Label del día (Mon-Sun) */}
                            <Skeleton className="h-4 w-7 rounded-sm" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lista de Logros */}
            <div className="flex flex-col gap-4">
                <Skeleton className="h-7 w-36" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white border border-[#e5e7eb] rounded-xl p-4 flex items-start gap-4 min-h-[96px]"
                        >
                            {/* Ícono */}
                            <Skeleton className="size-12 min-w-12 min-h-12 rounded-xl shrink-0" />

                            {/* Contenido */}
                            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                                {/* Fila del título */}
                                <div className="flex items-center justify-between gap-2">
                                    <Skeleton className="h-4 w-1/2 rounded-md" />
                                </div>

                                {/* Descripción */}
                                <Skeleton className="h-3 w-5/6 rounded-md" />

                                {/* Barra de Progreso */}
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-2.5 w-12" />
                                        <Skeleton className="h-2.5 w-10" />
                                    </div>
                                    <Skeleton className="h-1.5 w-full rounded-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}