import type { SignInCredentials, SignUpCredentials } from "../types/auth.types.ts"
import { supabase } from "../../../shared/services/api/supabase-client.ts"

export async function signUp({ email, password }: SignUpCredentials) {
    console.log("SIGNUP CALLED", new Date().toISOString(), email)
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