import { Card } from '../../../shared/components/ui/card.tsx';
import {Skeleton, BloomStatSkeleton, ChartCardSkeleton} from '../../../shared/components/ui/skeletons.tsx';

export function CourseDetailSkeleton() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto min-w-0 pb-10">
            {/* Volver a cursos Título del curso */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Sección Syllabus */}
            <Card className="!p-6 flex flex-col gap-4">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-20 w-full rounded-xl" />
            </Card>

            {/* Botón Reintentar cuestionarios */}
            <Skeleton className="h-14 w-full rounded-xl" />

            {/* Card Rendimiento Cognitivo */}
            <Card className="!p-6 flex flex-col gap-5">
                <Skeleton className="h-6 w-48" />
                <div className="flex flex-col sm:flex-row gap-4">
                    <Skeleton className="h-24 flex-1 rounded-xl" />
                    <Skeleton className="h-24 flex-1 rounded-xl" />
                </div>
                <div className="flex flex-col gap-3 px-2 pt-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <BloomStatSkeleton key={i} />
                    ))}
                </div>
            </Card>

            {/* Tip visual */}
            <Skeleton className="h-14 w-full rounded-xl" />

            {/* Gráficos Radar y Progreso */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCardSkeleton />
                <ChartCardSkeleton />
            </div>
        </div>
    );
}