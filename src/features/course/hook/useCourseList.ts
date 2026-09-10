import { useEffect, useState, useCallback } from "react";
import type { CourseResponse, CourseSummary } from "../types/course.types.ts";
import { fetchCourses } from "../services/courseService.ts";
import { toCourseSummary } from "../../../shared/utils/courseDisplay.ts";

export function UseCourseList() {
    const [courses, setCourses] = useState<CourseSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCourses = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchCourses();
            setCourses(data.map(toCourseSummary));
        } catch (err) {
            setError("No se pudieron cargar los cursos");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        fetchCourses()
            .then((data) => {
                if (isMounted) setCourses(data.map(toCourseSummary));
            })
            .catch(() => {
                if (isMounted) setError("No se pudieron cargar los cursos");
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    function addCourse(course: CourseResponse) {
        setCourses((prev) => [...prev, toCourseSummary(course)]);
    }

    return { courses, isLoading, error, addCourse, refetch: loadCourses };
}