import { useState, useEffect } from 'react';
import type { CourseSummary } from "../../course/types/course.types.ts";
import { getTopCourses } from "../services/dashboardService.ts";

export function useCourseSummaries() {
    const [courses, setCourses] = useState<CourseSummary[]>([]);
    const [totalCourses, setTotalCourses] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getTopCourses();
                setTotalCourses(data.total_courses);
                
                const mappedCourses: CourseSummary[] = data.courses.map(c => ({
                    id: c.id,
                    iconText: c.name.substring(0, 2).toUpperCase(),
                    title: c.name,
                    description: c.description || 'Sin descripción',
                    lastQuizTime: new Date(c.created_at).toLocaleDateString() // Using created date as a placeholder
                }));
                
                setCourses(mappedCourses);
            } catch (error) {
                console.error("Failed to fetch top courses", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return { courses, totalCourses, loading };
}