import * as React from "react"
import { useState } from "react"
import { InputText } from "../../../shared/components/ui/inputText.tsx"
import { Button } from "../../../shared/components/ui/button.tsx"
import { LoadSpinner } from "../../../shared/components/ui/loadSpinner.tsx"
import { useAuth } from "../hook/useAuth.ts"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { AuthSplitLayout } from "../components/authSplitLayout.tsx"
import { ErrorState } from "../../../shared/components/ui/errorState.tsx"
import { validateLoginData, type LoginFormData } from "../../../shared/utils/loginValidation.ts"
import {useFormValidation} from "../../../shared/utils/useFormValidation.ts";

export function LoginPage() {
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const { values, errors, handleChange, validateAll } = useFormValidation<LoginFormData>(
        {
            email: '',
            password: '',
        },
        validateLoginData
    )

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError('')

        if (!validateAll()) {
            return
        }

        setIsSubmitting(true)

        try {
            await signIn({ email: values.email, password: values.password })
            navigate('/')
        } catch {
            setError('Credenciales inválidas. Verifica tu correo y contraseña')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthSplitLayout
            title="Iniciar sesión"
            description="Bienvenido de nuevo. Por favor, ingresa tus credenciales."
            footer={
                <p className="text-center text-[16px] leading-6 text-text-body">
                    ¿No tienes cuenta? <Link to="/register" className="font-medium text-[#0060AC] hover:underline">Crear cuenta</Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <InputText
                        label="Correo electrónico"
                        name="email"
                        placeholder="nombre@universidad.edu"
                        value={values.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        type="email"
                    />
                    {errors.email && (
                        <span className="text-xs text-red-500 font-medium pl-1">
                            {errors.email}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <InputText
                        label="Contraseña"
                        name="password"
                        placeholder="••••••••"
                        value={values.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        type="password"
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500 font-medium pl-1">
                            {errors.password}
                        </span>
                    )}
                </div>

                <div className="flex">
                    <button type="button" className="text-[14px] font-medium leading-5 text-[#2B6CB0] hover:underline">
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>

                <div className="pt-2">
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        text={
                            isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    Iniciando sesión...
                                    <LoadSpinner width={23} height={23} monochrome />
                                </span>
                            ) : (
                                "Iniciar sesión"
                            )
                        }
                        icon={!isSubmitting ? <ArrowRight size={16} /> : undefined}
                    />
                </div>
            </form>

            {error && (
                <div className="mt-4">
                    <ErrorState
                        variant="compact"
                        title="Error al iniciar sesión"
                        message="Verifica tus credenciales"
                        onRetry={() => setError("")}
                    />
                </div>
            )}
        </AuthSplitLayout>
    )
}