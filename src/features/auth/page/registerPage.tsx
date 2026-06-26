import { useState } from "react"
import { useAuth } from "../hook/useAuth.ts"
import { useNavigate } from "react-router-dom"
import { InputText } from "../../../shared/components/ui/inputText.tsx"
import * as React from "react"
import { Button } from "../../../shared/components/ui/button.tsx"

export function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <InputText label="Email" name="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputText label="Password" name="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                <InputText label="Nombre" name="name" placeholder="Juan" value={name} onChange={(e) => setName(e.target.value)} />
                <InputText label="Apellido" name="last_name" placeholder="Pérez" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                <InputText label="Universidad" name="college" placeholder="UPC" value={college} onChange={(e) => setCollege(e.target.value)} />
                <InputText label="Carrera" name="major" placeholder="Software" value={major} onChange={(e) => setMajor(e.target.value)} />

                <Button text={isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'} type="submit" />
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <p>
                Already have an account? <a href="/login" className="text-accent-button">Login</a>
            </p>
        </div>
    )
}