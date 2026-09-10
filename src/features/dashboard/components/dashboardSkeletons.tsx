import { Card } from "../../../shared/components/ui/card.tsx";
import { Skeleton } from "../../../shared/components/ui/skeletons.tsx";

//"Mis Cursos"
export function CourseCardSkeleton() {
    return (
        <Card className="flex-1 p-5 rounded-2xl bg-white border border-border-divider/60">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-start gap-3">
                    <Skeleton className="w-11 h-11 rounded-xl shrink-0 bg-zinc-200/80" />

                    <div className="flex flex-col gap-2 w-full pt-0.5">
                        <Skeleton className="h-4 w-4/5 rounded-md" />
                        <Skeleton className="h-3 w-full rounded-md" />
                        <Skeleton className="h-3 w-3/4 rounded-md" />
                    </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center gap-2">
                    <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
                    <Skeleton className="h-3 w-1/2 rounded-md" />
                </div>
            </div>
        </Card>
    );
}

// "Actividad Reciente"
export function ActivitySkeleton() {
    return (
        <Card className="p-4 rounded-2xl bg-white border border-border-divider/60">
            <div className="flex flex-row items-center gap-4">
                <Skeleton className="w-9 h-9 rounded-full shrink-0" />

                <div className="flex flex-col gap-1.5 w-full">
                    <Skeleton className="h-4 w-3/5 rounded-md" />
                    <Skeleton className="h-3 w-2/5 rounded-md" />
                    <Skeleton className="h-2.5 w-16 rounded-md mt-0.5" />
                </div>
            </div>
        </Card>
    );
}

// "Resumen Cognitivo"
export function BloomStatSkeleton() {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
                <Skeleton className="h-3.5 w-20 rounded-md" />
                <Skeleton className="h-3.5 w-8 rounded-md" />
            </div>
            <Skeleton className="h-3 w-full rounded-full bg-zinc-200/70" />
        </div>
    );
}