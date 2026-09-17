import { Card } from '../../../shared/components/ui/card.tsx';
import { Skeleton, ChartCardSkeleton, BloomStatSkeleton } from '../../../shared/components/ui/skeletons.tsx';

export function MetacognitionSkeleton() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold text-[#1a3a5a]">Progreso Metacognitivo</h2>
                    <p className="text-sm text-[#4a5565]">
                        Analiza tu autoevaluación, precisión de calibración y sesgo de juicio predictivo
                    </p>
                </div>
            </div>
            <div className="animate-pulse">
                {/* ── KPI Row Skeleton ────────────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-5">
                    <Skeleton className="h-28 rounded-xl" />
                    <Skeleton className="h-28 rounded-xl" />
                    <Skeleton className="h-28 rounded-xl" />
                </div>

                {/* Main Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">
                        <Card className="flex flex-col gap-5 !p-6">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="flex flex-col gap-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-14 w-full rounded-lg" />
                                ))}
                            </div>
                        </Card>
                        <ChartCardSkeleton />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6">
                        <Card className="flex flex-col gap-4 !p-6">
                            <Skeleton className="h-6 w-44" />
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Skeleton className="h-24 flex-1 rounded-xl" />
                                <Skeleton className="h-24 flex-1 rounded-xl" />
                            </div>
                        </Card>

                        <Card className="flex flex-col gap-4 !p-6 ">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-6 w-52" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex flex-col gap-3 pt-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <BloomStatSkeleton key={i} />
                                ))}
                            </div>
                        </Card>

                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                </div>

                {/* Full Width Chart Skeleton */}
                <ChartCardSkeleton className="mt-4" />
            </div>
            </div>

    );
}

export function MetacognitionRecentAttemptsSkeleton() {
    return (
        <div className="flex flex-col gap-3 animate-pulse">
            {[0].map((i) => (
                <div key={i} className="p-5 bg-[#f8fafc] rounded-xl border border-gray-200/80 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                            <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                            <div className="h-3 bg-gray-200 rounded-md w-1/2" />
                        </div>

                        <div className="h-6 w-16 bg-gray-200 rounded-lg shrink-0" />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/60">
                        <div className="h-3.5 bg-gray-200 rounded-md w-2/5" />
                        <div className="h-3.5 bg-gray-200 rounded-md w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}