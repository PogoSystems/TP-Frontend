import type { SignInCredentials, SignUpCredentials, CompleteProfileData } from "../types/auth.types.ts"
import * as authService from "../services/authService.ts"
import { completeProfile } from "../services/profileService.ts"

export function useAuth() {

    async function signUp(credentials: SignUpCredentials, profile: CompleteProfileData) {
        console.log("SIGNUP ATTEMPT", Date.now())
        const data = await authService.signUp(credentials)
        try {
            await completeProfile(profile)
        } catch (err) {
            throw new Error("Failed to complete profile: " + (err as Error).message, { cause: err })
        }
        console.log(credentials.email, typeof credentials.email, credentials.email.length)
        return data
    }

    async function signIn(credentials: SignInCredentials) {
        return await authService.signIn(credentials)
    }

    async function signOut() {
        return await authService.signOut()
    }

    return { signUp, signIn, signOut }
}