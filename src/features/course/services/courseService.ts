
import type {CourseResponse, CreateCourseRequest, UpdateCourseRequest} from "../types/course.types.ts"
import {apiClient} from "../../../shared/services/api/axios-client.ts";

export async function createCourse(payload: CreateCourseRequest): Promise<CourseResponse> {
    const { data } = await apiClient.post<CourseResponse>("/courses", payload)
    return data
}

export async function fetchCourses(page = 1, pageSize = 20): Promise<CourseResponse[]> {
    const { data } = await apiClient.get<CourseResponse[]>("/courses", {
        params: { page, page_size: pageSize },
    })
    return data
}

export async function fetchCourseById(courseId: number): Promise<CourseResponse> {
    const { data } = await apiClient.get<CourseResponse>(`/courses/${courseId}`)
    return data
}

export async function updateCourse(courseId: number, payload: UpdateCourseRequest): Promise<CourseResponse> {
    const { data } = await apiClient.patch<CourseResponse>(`/courses/${courseId}`, payload)
    return data
}

export async function deleteCourse(courseId: number): Promise<void> {
    await apiClient.delete(`/courses/${courseId}`)
}