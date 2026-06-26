import { useEffect, useState } from "react"
import type {CourseDetail} from "../types/course.types.ts"
import {fetchCourseById} from "../services/courseService.ts";
import {toCourseDetail} from "../../../shared/utils/courseDisplay.ts";


export function UseCourseDetail(courseId: number) {
    const [course, setCourse] = useState<CourseDetail   | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        setIsLoading(true)

        fetchCourseById(courseId)
            .then((data) => {
                if (isMounted)  setCourse(toCourseDetail(data))
            })
            .catch(() => {
                if (isMounted) setError("There was an error loading the course details")
            })
            .finally(() => {
                if (isMounted) setIsLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [courseId])

    return { course, isLoading, error }
}