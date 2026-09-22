import type {
    SignInCredentials,
    SignUpCredentials,
    CompleteProfileData,
    ResetPasswordCredentials,
    UpdatePasswordCredentials
} from "../types/auth.types.ts"
import * as authService from "../services/authService.ts"
import { completeProfile } from "../services/profileService.ts"


async function handleSignUp(credentials: SignUpCredentials, profile: CompleteProfileData) {
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

async function handleSignIn(credentials: SignInCredentials) {
    return await authService.signIn(credentials)
}

async function handleSignOut() {
    return await authService.signOut()
}

async function handleResetPassword(credentials: ResetPasswordCredentials, redirectTo?: string) {
    return await authService.resetPassword(credentials, redirectTo)
}

async function handleUpdatePassword(credentials: UpdatePasswordCredentials) {
    return await authService.updatePassword(credentials)
}

export function useAuth() {
    return {
        signUp: handleSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
        resetPassword: handleResetPassword,
        updatePassword: handleUpdatePassword
    }
}