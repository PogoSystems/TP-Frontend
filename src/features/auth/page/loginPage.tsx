import { useState } from "react"
import * as React from "react"
import { InputText } from "../../../shared/components/ui/inputText.tsx"
import { Button } from "../../../shared/components/ui/button.tsx"
import { useAuth } from "../hook/useAuth.ts"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { AuthSplitLayout } from "../components/authSplitLayout.tsx"

export function LoginPage() {
    //to store the email and password input values
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')


    const [error, setError] = useState('')

    // to prevent the user to click the login button multiple times while the request is being processed
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {signIn} = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault() // to stop the page from refreshing when the form is submitted
        setError('')
        setIsSubmitting(true)

        try{
            //if the email and password are correct, create the session and redirect to the homepage
            await signIn({email, password})
            navigate('/')
        }catch{
            setError('Invalid email or password')
        }finally{
            setIsSubmitting(false)
        }
    }

    return (
        <AuthSplitLayout title="Iniciar sesión" description="Bienvenido de nuevo. Por favor, ingresa tus credenciales."
            footer={
                <p className="text-center text-[16px] leading-6 text-text-body">
                    ¿No tienes cuenta? <Link to="/register" className="font-medium text-[#0060AC] hover:underline">Crear cuenta</Link>
                </p>
            }>
                
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <InputText
                    label="Correo electrónico"
                    name="email"
                    placeholder="tu@universidad.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="bg-[#F9F9FF] border-[#C5C6CE] rounded-[8px] px-[17px] py-[15px] text-[16px] text-text-title placeholder:text-[#6B7280]"
                />
                <InputText
                    label="Contraseña"
                    name="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="bg-[#F9F9FF] border-[#C5C6CE] rounded-[8px] px-[17px] py-[15px] text-[16px] text-text-title placeholder:text-[#6B7280]"
                />

                <div className="flex">
                    <button type="button" className="text-[14px] font-medium leading-5 text-[#2B6CB0] hover:underline">
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>

                <div className="pt-2">
                    <Button text={isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"} type="submit" icon={<ArrowRight size={16} />} />
                </div>
            </form>

            {error && <p className="mt-4 text-sm text-accent-text">{error}</p>}
        </AuthSplitLayout>
    )
}