import { useState } from "react"
import { useAuth } from "../hook/useAuth.ts"
import { useNavigate } from "react-router-dom"
import { InputText } from "../../../shared/components/ui/inputText.tsx"
import * as React from "react"
import { Button } from "../../../shared/components/ui/button.tsx"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { AuthSplitLayout } from "../components/authSplitLayout.tsx"

export function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [last_name, setLastName] = useState("")
    const [college, setCollege] = useState("")
    const [major, setMajor] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { signUp } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.")
            return
        }

        setIsSubmitting(true)

        try {
            await signUp(
                { email, password },
                { name, last_name, college, major }
            )
            navigate("/login")
        } catch (err) {
            setError( "Cannot register user. Please check your credentials and try again.")
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthSplitLayout
            title="Crear cuenta"
            description="Únete a la comunidad académica de Pogo hoy mismo."
            brandPlacement="bottom"
            contentMaxWidth="lg:max-w-[336px]"
            footer={
                <p className="text-center text-[16px] leading-6 text-text-body">
                    ¿Ya tienes una cuenta? <Link to="/login" className="font-medium text-[#0060AC] hover:underline">Inicia sesión</Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InputText label="Nombre" name="name" placeholder="Ej. Ana" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#F9F9FF] border-[#C5C6CE] rounded-[8px] px-[17px] py-[15px] text-[16px] text-text-title placeholder:text-[#6B7280]" />
                    <InputText label="Apellido" name="last_name" placeholder="Ej. García" value={last_name} onChange={(e) => setLastName(e.target.value)} className="bg-[#F9F9FF] border-[#C5C6CE] rounded-[8px] px-[17px] py-[15px] text-[16px] text-text-title placeholder:text-[#6B7280]" />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InputText label="Universidad" name="college" placeholder="Ej. UPC" value={college} onChange={(e) => setCollege(e.target.value)} className="bg-[#F9F9FF] border-[#C5C6CE] rounded-[8px] px-[17px] py-[15px] text-[16px] text-text-title placeholder:text-[#6B7280]" />
                    <InputText label="Carrera" name="major" placeholder="Ej. Software" value={major} onChange={(e) => setMajor(e.target.value)} className="bg-[#F9F9FF] border-[#C5C6CE] rounded-[8px] px-[17px] py-[15px] text-[16px] text-text-title placeholder:text-[#6B7280]" />
                </div>

                <InputText label="Correo electrónico" name="email" placeholder="nombre@universidad.edu" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="bg-[#F9F9FF] border-[#C5C6CE] rounded-[8px] px-[17px] py-[15px] text-[16px] text-text-title placeholder:text-[#6B7280]" />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InputText label="Contraseña" name="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="bg-[#F9F9FF] border-[#C5C6CE] rounded-[8px] px-[17px] py-[15px] text-[16px] text-text-title placeholder:text-[#6B7280]" />
                    <InputText label="Confirmar contraseña" name="confirmPassword" placeholder="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="bg-[#F9F9FF] border-[#C5C6CE] rounded-[8px] px-[17px] py-[15px] text-[16px] text-text-title placeholder:text-[#6B7280]" />
                </div>

                <div className="pt-2">
                    <Button text={isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'} type="submit" icon={<ArrowRight size={16} />} />
                </div>
            </form>
            {error && <p className="mt-4 text-sm text-accent-text">{error}</p>}
        </AuthSplitLayout>
    )
}