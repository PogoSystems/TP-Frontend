import * as React from "react";
import { Card } from "./card.tsx";

// Skeleton base
export function Skeleton({
                             className = "",
                             ...props
                         }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`animate-pulse rounded-md bg-zinc-200/80 ${className}`}
            {...props}
        />
    );
}

// CardCourse
export function CourseCardSkeleton({ className = "" }: { className?: string }) {
    return (
        <Card className={`p-5 rounded-2xl bg-white border border-border-divider/60 ${className}`}>
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

// Resumen Cognitivo
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
// Actividad
export function ActivitySkeleton() {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-4">
                <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-4 w-1/3 rounded-md" />
                    <Skeleton className="h-3 w-2/3 rounded-md" />
                </div>
            </div>
        </Card>
    );
}

// Métricas generales
export function StatKpiSkeleton() {
    return (
        <Card className="!p-5 flex flex-col gap-3 flex-1">
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <Skeleton className="h-8 w-1/3 rounded-md" />
            <Skeleton className="h-2 w-full rounded-full" />
        </Card>
    );
}

// Fila de Progreso por Curso
export function CourseProgressRowSkeleton() {
    return (
        <div className="flex items-center justify-between gap-4 py-1">
            <div className="flex flex-col gap-1.5 w-full">
                <Skeleton className="h-4 w-2/5 rounded-md" />
                <Skeleton className="h-3 w-1/4 rounded-md" />
            </div>
            <Skeleton className="h-6 w-12 rounded-md shrink-0" />
        </div>
    );
}

// Fila de Cobertura de Bloom
export function BloomCoverageRowSkeleton() {
    return (
        <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-3.5 w-24 rounded-md" />
            <Skeleton className="h-2.5 flex-1 rounded-full" />
            <Skeleton className="h-3.5 w-12 rounded-md shrink-0" />
        </div>
    );
}

export function ChartCardSkeleton({ className = "" }: { className?: string }) {
    return (
        <Card className={`!p-6 flex flex-col gap-4 h-72 w-full ${className}`}>
            <Skeleton className="h-6 w-1/3 rounded-md" />
            <Skeleton className="flex-1 w-full rounded-xl" />
        </Card>
    );
}