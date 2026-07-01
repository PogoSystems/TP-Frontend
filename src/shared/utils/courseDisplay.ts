import type {CourseDetail, CourseResponse, CourseSummary} from "../../features/course/types/course.types.ts";

export function deriveIconText(title: string): string {
    return title
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("")
}

export function toCourseSummary(course: CourseResponse): CourseSummary {
    return {
        id: course.id,
        iconText: deriveIconText(course.name),
        title: course.name,
        description: course.description ?? "Sin descripción",
        lastQuizTime: "Sin actividad",
    }
}

export function toCourseDetail(course: CourseResponse): CourseDetail {
    return {
        ...toCourseSummary(course),
        syllabusUploaded: false,
        bloomStats: {
            remember: 0,
            understand: 0,
            apply: 0,
            analyze: 0,
            evaluate: 0,
            create: 0,
        },
        dominantLevel: "—",
        dominantLevelPercentage: 0,
        dominantLevelAnswered: 0,
        weakLevel: "—",
        weakLevelPercentage: 0,
        weakLevelAnswered: 0,
        tip: "Genera tu primer cuestionario para ver estadísticas",
        progressOverTime: [],
    }
}