import React, { useState } from 'react';
import { Modal } from '../../../shared/components/ui/modal';
import { Button } from '../../../shared/components/ui/button';
import { InputText } from '../../../shared/components/ui/inputText';
import { updateProfile } from '../services/profileService';
import type { UserProfileResponse } from '../types/profile.types';
import { LoadSpinner } from "../../../shared/components/ui/loadSpinner.tsx";
import { validateProfileData, type ProfileFormData } from '../../../shared/utils/profileValidation';
import { useFormValidation } from "../../../shared/utils/useFormValidation.ts";
import { type ToastType } from "../../../shared/components/ui/toast.tsx";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfileResponse;
    onSuccess: () => void;
    triggerToast?: (message: string, type: ToastType) => void;
}

export function EditProfileModal({ isOpen, onClose, user, onSuccess, triggerToast }: EditProfileModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { values, errors, handleChange, validateAll } = useFormValidation<ProfileFormData>(
        {
            name: user.name,
            lastName: user.last_name,
            college: user.college,
            major: user.major,
        },
        validateProfileData
    );

    const hasActiveErrors = Boolean(errors.name) || Boolean(errors.lastName) || Boolean(errors.college) || Boolean(errors.major);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateAll()) {
            return;
        }

        setIsLoading(true);

        try {
            await updateProfile({
                name: values.name !== user.name ? values.name : null,
                last_name: values.lastName !== user.last_name ? values.lastName : null,
                college: values.college !== user.college ? values.college : null,
                major: values.major !== user.major ? values.major : null,
            });

            triggerToast?.("Perfil actualizado exitosamente", "success");
            onSuccess();
            onClose();
        } catch (err: any) {
            const errorMsg = err.response?.data?.detail || 'Ocurrió un error al actualizar el perfil.';
            setError(errorMsg);
            triggerToast?.(errorMsg, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1a3a5a]">Editar Perfil</h2>
                    <p className="text-sm text-gray-500 mt-1">Actualiza tu información personal.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <InputText
                            label="Nombre"
                            name="name"
                            value={values.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Ej: Ana"
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
                            name="last_name"
                            value={values.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            placeholder="Ej: García"
                            required
                        />
                        {errors.lastName && (
                            <span className="text-xs text-red-500 font-medium pl-1">
                                {errors.lastName}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <InputText
                            label="Universidad"
                            name="college"
                            value={values.college}
                            onChange={(e) => handleChange('college', e.target.value)}
                            placeholder="Ej: Universidad Peruana de Ciencias Aplicadas"
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
                            value={values.major}
                            onChange={(e) => handleChange('major', e.target.value)}
                            placeholder="Ej: Ingeniería de Software"
                            required
                        />
                        {errors.major && (
                            <span className="text-xs text-red-500 font-medium pl-1">
                                {errors.major}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading} text="Cancelar" />
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isLoading || hasActiveErrors}
                            text={
                                isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <LoadSpinner width={20} height={20} monochrome />
                                        Guardando...
                                    </span>
                                ) : (
                                    "Guardar Cambios"
                                )
                            }
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}