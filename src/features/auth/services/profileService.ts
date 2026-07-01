import type { CompleteProfileData } from "../types/auth.types.ts"
import {apiClient} from "../../../shared/services/api/axios-client.ts";

export async function completeProfile(profile: CompleteProfileData) {
    const { data } = await apiClient.post("/auth/complete-profile", profile)
    return data
}