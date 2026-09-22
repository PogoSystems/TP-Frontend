import * as React from "react"
import { useState } from "react"
import { InputText } from "../../../shared/components/ui/inputText.tsx"
import { Button } from "../../../shared/components/ui/button.tsx"
import { LoadSpinner } from "../../../shared/components/ui/loadSpinner.tsx"
import { useAuth } from "../hook/useAuth.ts"
import { Link, useNavigate } from "react-router-dom"
import {ArrowLeft, ArrowRight} from "lucide-react"
import { AuthSplitLayout } from "../components/authSplitLayout.tsx"
import { ErrorState } from "../../../shared/components/ui/errorState.tsx"
import { useFormValidation } from "../../../shared/utils/useFormValidation.ts"
import {type ResetPasswordFormData, validateResetPasswordData} from "../../../shared/utils/resetPasswordPage.ts";

export function ResetPasswordPage() {
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { updatePassword } = useAuth()
    const navigate = useNavigate()

    const { values, errors, handleChange, validateAll } = useFormValidation<ResetPasswordFormData>(
        {
            password: "",
            confirmPassword: "",
        },
        validateResetPasswordData
    )

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError("")

        if (!validateAll()) {
            return
        }

        setIsSubmitting(true)

        try {
            await updatePassword({ newPassword: values.password })
            navigate("/login")
        } catch (err: any) {
            const errorCode = err?.code || err?.error_code || '';
            const errorMessage = err?.message?.toLowerCase() || '';

            if (errorCode === 'same_password' || errorMessage.includes('same_password') || errorMessage.includes('different from the old password')) {
                setError("La nueva contraseña debe ser diferente a la anterior")
            } else {
                setError("No se pudo actualizar la contraseña. El enlace puede haber expirado")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthSplitLayout
            title="Restablecer contraseña"
            description="Crea una nueva contraseña segura para tu cuenta académica de Pogo."
            footer={
                <p className="text-center text-[16px] leading-6 text-text-body">
                    <Link to="/login" className="font-medium text-[#0060AC] hover:underline flex items-center justify-center gap-1">
                        <ArrowLeft size={16} /> Volver al inicio de sesión
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <InputText
                        label="Nueva contraseña"
                        name="password"
                        placeholder="••••••••"
                        value={values.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        type="password"
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500 font-medium pl-1">
                            {errors.password}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <InputText
                        label="Confirmar contraseña"
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={values.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        type="password"
                    />
                    {errors.confirmPassword && (
                        <span className="text-xs text-red-500 font-medium pl-1">
                            {errors.confirmPassword}
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
                                    Guardando...
                                    <LoadSpinner width={23} height={23} monochrome />
                                </span>
                            ) : (
                                "Guardar contraseña"
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
                        title="Error al restablecer"
                        message={error}
                        onRetry={() => setError("")}
                    />
                </div>
            )}
        </AuthSplitLayout>
    )
}