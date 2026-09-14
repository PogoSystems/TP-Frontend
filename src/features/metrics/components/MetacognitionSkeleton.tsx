import { Card } from '../../../shared/components/ui/card.tsx';
import { Skeleton, ChartCardSkeleton, BloomStatSkeleton } from '../../../shared/components/ui/skeletons.tsx';

export function MetacognitionSkeleton() {
    return (
        <div className="flex flex-col gap-6 w-full animate-pulse">
            {/* KPI Row Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
            </div>

            {/* Main Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <Card className="flex flex-col gap-4 !p-6">
                        <Skeleton className="h-6 w-48" />
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full rounded-lg" />
                            ))}
                        </div>
                    </Card>
                    <ChartCardSkeleton />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <Card className="flex flex-col gap-4 !p-6">
                        <Skeleton className="h-6 w-48" />
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Skeleton className="h-24 flex-1 rounded-xl" />
                            <Skeleton className="h-24 flex-1 rounded-xl" />
                        </div>
                    </Card>

                    <Card className="flex flex-col gap-4 !p-6">
                        <Skeleton className="h-6 w-56" />
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
            <ChartCardSkeleton />
        </div>
    );
}
