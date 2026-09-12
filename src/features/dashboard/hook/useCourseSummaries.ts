import { useState, useEffect } from 'react';
import type { CourseSummary } from "../../course/types/course.types.ts";
import { getTopCourses } from "../services/dashboardService.ts";

export function useCourseSummaries() {
    const [courses, setCourses] = useState<CourseSummary[]>([]);
    const [totalCourses, setTotalCourses] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchCourses = async () => {
            try {
                const data = await getTopCourses();
                if (!isMounted) return;
                setTotalCourses(data.total_courses);

                const mappedCourses: CourseSummary[] = data.courses.map(c => ({
                    id: c.id,
                    iconText: c.name.substring(0, 2).toUpperCase(),
                    title: c.name,
                    description: c.description || 'Sin descripción',
                    lastQuizTime: new Date(c.created_at).toLocaleDateString()
                }));

                setCourses(mappedCourses);
            } catch (error) {
                if (isMounted) console.error("Failed to fetch top courses", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchCourses();
        return () => {
            isMounted = false;
        };
    }, []);

    return { courses, totalCourses, isLoading };
}