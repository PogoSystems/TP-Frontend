import type {
    ResetPasswordCredentials,
    SignInCredentials,
    SignUpCredentials,
    UpdatePasswordCredentials
} from "../types/auth.types.ts"
import { supabase } from "../../../shared/services/api/supabase-client.ts"

export async function signUp({ email, password }: SignUpCredentials) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
}

export async function signIn({ email, password }: SignInCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}

export async function resetPassword({ email }: ResetPasswordCredentials, redirectTo?: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo || `${window.location.origin}/reset-password`,
    })
    if (error) throw error
    return data
}

export async function updatePassword({ newPassword }: UpdatePasswordCredentials) {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
    })
    if (error) throw error
    return data
}