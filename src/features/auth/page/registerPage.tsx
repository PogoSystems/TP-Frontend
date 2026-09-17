import { useState } from "react"
import { useAuth } from "../hook/useAuth.ts"
import { useNavigate, Link } from "react-router-dom"
import { InputText } from "../../../shared/components/ui/inputText.tsx"
import * as React from "react"
import { Button } from "../../../shared/components/ui/button.tsx"
import { LoadSpinner } from "../../../shared/components/ui/loadSpinner.tsx"
import { ErrorState } from "../../../shared/components/ui/errorState.tsx"
import { ArrowRight } from "lucide-react"
import { AuthSplitLayout } from "../components/authSplitLayout.tsx"
import { validateRegisterData, type RegisterFormData } from "../../../shared/utils/registerValidation.ts"
import {useFormValidation} from "../../../shared/utils/useFormValidation.ts";

export function RegisterPage() {
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { signUp } = useAuth()
    const navigate = useNavigate()

    const { values, errors, handleChange, validateAll } = useFormValidation<RegisterFormData>(
        {
            name: "",
            lastName: "",
            college: "",
            major: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validateRegisterData
    )

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError("")

        if (!validateAll()) {
            return
        }

        setIsSubmitting(true)

        try {
            await signUp(
                { email: values.email, password: values.password },
                {
                    name: values.name,
                    last_name: values.lastName,
                    college: values.college,
                    major: values.major,
                }
            )
            navigate("/login")
        } catch (err) {
            setError("Cannot register user. Please check your credentials and try again.")
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
            contentMaxWidth=""
            footer={
                <p className="text-center text-[16px] leading-6 text-text-body">
                    ¿Ya tienes una cuenta? <Link to="/login" className="font-medium text-[#0060AC] hover:underline">Inicia sesión</Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <InputText
                            label="Nombre"
                            name="name"
                            placeholder="Ej. Ana"
                            value={values.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                        />
                        {errors.name && (
                            <span className="text-xs text-red-500 font-medium pl-1">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <InputText
                            label="Apellido"
                            name="lastName"
                            placeholder="Ej. García"
                            value={values.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            required
                        />
                        {errors.lastName && (
                            <span className="text-xs text-red-500 font-medium pl-1">
                                {errors.lastName}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <InputText
                            label="Universidad"
                            name="college"
                            placeholder="Ej. Universidad Peruana de Ciencias Aplicadas"
                            value={values.college}
                            onChange={(e) => handleChange("college", e.target.value)}
                            required
                        />
                        {errors.college && (
                            <span className="text-xs text-red-500 font-medium pl-1">
                                {errors.college}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <InputText
                            label="Carrera"
                            name="major"
                            placeholder="Ej. Ingeniería de Software"
                            value={values.major}
                            onChange={(e) => handleChange("major", e.target.value)}
                            required
                        />
                        {errors.major && (
                            <span className="text-xs text-red-500 font-medium pl-1">
                                {errors.major}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <InputText
                        label="Correo electrónico"
                        name="email"
                        placeholder="nombre@universidad.edu"
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        type="email"
                        required
                    />
                    {errors.email && (
                        <span className="text-xs text-red-500 font-medium pl-1">
                            {errors.email}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <InputText
                            label="Contraseña"
                            name="password"
                            placeholder="••••••••"
                            value={values.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            type="password"
                            required
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
                            required
                        />
                        {errors.confirmPassword && (
                            <span className="text-xs text-red-500 font-medium pl-1">
                                {errors.confirmPassword}
                            </span>
                        )}
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        text={
                            isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    Creando cuenta...
                                    <LoadSpinner width={23} height={23} monochrome />
                                </span>
                            ) : (
                                "Crear cuenta"
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
                        title="Error al registrar"
                        message={error}
                        onRetry={() => setError("")}
                    />
                </div>
            )}
        </AuthSplitLayout>
    )
}