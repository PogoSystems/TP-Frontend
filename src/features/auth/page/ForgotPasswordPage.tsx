import * as React from "react"
import { useState } from "react"
import { InputText } from "../../../shared/components/ui/inputText.tsx"
import { Button } from "../../../shared/components/ui/button.tsx"
import { LoadSpinner } from "../../../shared/components/ui/loadSpinner.tsx"
import { useAuth } from "../hook/useAuth.ts"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { AuthSplitLayout } from "../components/authSplitLayout.tsx"
import { ErrorState } from "../../../shared/components/ui/errorState.tsx"
import { useFormValidation } from "../../../shared/utils/useFormValidation.ts"
import { validateForgotPasswordData } from "../../../shared/utils/loginValidation.ts"
import {SuccessState} from "../../../shared/components/ui/successState.tsx";

export function ForgotPasswordPage() {
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { resetPassword } = useAuth()
    const { values, errors, handleChange, validateAll } = useFormValidation(
        { email: "" },
        validateForgotPasswordData
    )

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError("")

        if (!validateAll()) {
            return
        }

        setIsSubmitting(true)

        try {
            await resetPassword({ email: values.email })
            setIsSuccess(true)
        } catch {
            setError("Ocurrió un error al enviar el enlace. Inténtalo de nuevo más tarde.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthSplitLayout
            title="Recuperar contraseña"
            description="Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu acceso."
            footer={
                <p className="text-center text-[16px] leading-6 text-text-body">
                    <Link to="/login" className="font-medium text-[#0060AC] hover:underline">
                        Volver al inicio de sesión
                    </Link>
                </p>
            }
        >
            {isSuccess ? (
                <SuccessState
                    variant="compact"
                    title="Correo enviado"
                    message="Hemos enviado las instrucciones a tu correo electrónico. Revisa tu bandeja de entrada!"
                />
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <InputText
                            label="Correo electrónico"
                            name="email"
                            placeholder="ejemplo@universidad.edu"
                            value={values.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            type="email"
                        />
                        {errors.email && (
                            <span className="text-xs text-red-500 font-medium pl-1">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="pt-2">
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            text={
                                isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        Enviando enlace...
                                        <LoadSpinner width={23} height={23} monochrome />
                                    </span>
                                ) : (
                                    "Enviar enlace"
                                )
                            }
                            icon={!isSubmitting ? <ArrowRight size={16} /> : undefined}
                        />
                    </div>
                </form>
            )}

            {error && (
                <div className="mt-4">
                    <ErrorState
                        variant="compact"
                        title="Error"
                        message={error}
                        onRetry={() => setError("")}
                    />
                </div>
            )}
        </AuthSplitLayout>
    )
}