import { Card } from "./card.tsx";
import { Clock } from 'lucide-react';

interface CardCourseProps {
    iconText: string;
    courseTitle: string;
    courseDescription: string;
    lastQuizTime?: string;
}

export function CardCourse({ iconText, courseTitle, courseDescription, lastQuizTime }: CardCourseProps) {
    return (
        <Card className="flex flex-col gap-3 w-full min-w-0 overflow-hidden">
            <div className="flex flex-row gap-3 min-w-0 items-start">
                {/* Icono fijo */}
                <div className="flex bg-bg-icon-pink text-white font-semibold text-lg p-3 rounded-xl h-12 w-12 shrink-0 items-center justify-center">
                    {iconText}
                </div>

                {/* Contenedor del header y content */}
                <div className="text-sm min-w-0 flex-1">
                    <Card.Header title={courseTitle} />

                    <Card.Content className="mt-1">
                        <p className="line-clamp-2 [overflow-wrap:anywhere] text-text-subtle text-xs">
                            {courseDescription}
                        </p>
                    </Card.Content>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-2">
                <Card.Footer className="flex flex-row gap-2 items-center text-text-subtle text-xs min-w-0">
                    <Clock size={15} className="shrink-0" />
                    <p className="truncate">
                        Último cuestionario: Hace {lastQuizTime ?? "Sin actividad"}
                    </p>
                </Card.Footer>
            </div>
        </Card>
    );
}