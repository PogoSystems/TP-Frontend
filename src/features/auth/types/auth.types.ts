//interface with what supabase needs for auth
export interface SignUpCredentials{
    email: string;
    password: string;
}

export interface SignInCredentials{
    email: string;
    password: string;
}

//interface for register user credentials in the database
export interface CompleteProfileData {
    name:string,
    last_name: string,
    college: string,
    major: string,
}

export interface ResetPasswordCredentials {
    email: string;
}

export interface UpdatePasswordCredentials {
    newPassword: string;
}