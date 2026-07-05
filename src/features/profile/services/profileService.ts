import { apiClient } from "../../../shared/services/api/axios-client";
import type { ProfilePageData, UpdateProfileRequest, UserProfileResponse } from "../types/profile.types";

export async function fetchProfileData(): Promise<ProfilePageData> {
    const [gamificationRes, userRes] = await Promise.all([
        apiClient.get<any>("/gamification/me"),
        apiClient.get<UserProfileResponse>("/auth/profile")
    ]);

    return {
        ...gamificationRes.data,
        user: userRes.data
    };
}

export async function updateProfile(data: UpdateProfileRequest): Promise<UserProfileResponse> {
    const response = await apiClient.put<UserProfileResponse>("/auth/profile", data);
    return response.data;
}
