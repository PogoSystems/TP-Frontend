interface CourseProgressRowProps {
    courseName: string;
    quizzesCompleted: number;
    accuracyPercentage: number;
}

/** Color coding for the progress bar and percentage text based on accuracy */
function getAccuracyColor(percentage: number): string {
    if (percentage >= 80) return '#db1a1a';  // red-ish (design uses red for high scores)
    if (percentage >= 60) return '#e95858';
    return '#8997a5';                         // muted gray for lower scores
}

/**
 * Fila de un curso dentro de la sección "Rendimiento por curso".
 * Muestra nombre del curso, cantidad de quizzes, porcentaje de acierto y barra de progreso.
 */
export function CourseProgressRow({ courseName, quizzesCompleted, accuracyPercentage }: CourseProgressRowProps) {
    const color = getAccuracyColor(accuracyPercentage);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5 min-w-0 px-0.5">
                    <p className="text-[#1a3a5a] text-base font-medium leading-6 truncate title={course.name}">{courseName}</p>
                    <p className="text-[#6a7282] text-xs font-normal">{quizzesCompleted} quizzes</p>
                </div>
                <p className="text-lg font-bold" style={{ color }}>{Math.round(accuracyPercentage)}%</p>
            </div>

            {/* Progress bar */}
            <div className="bg-[#e5e7eb] rounded-full h-3 w-full overflow-hidden">
                <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ width: `${accuracyPercentage}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}
