import React, { useState } from 'react';
import { Modal } from '../../../shared/components/ui/modal';
import { Button } from '../../../shared/components/ui/button';
import { InputText } from '../../../shared/components/ui/inputText';
import { updateProfile } from '../services/profileService';
import type { UserProfileResponse } from '../types/profile.types';
import {LoadSpinner} from "../../../shared/components/ui/loadSpinner.tsx";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfileResponse;
    onSuccess: () => void;
}

export function EditProfileModal({ isOpen, onClose, user, onSuccess }: EditProfileModalProps) {
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.last_name);
    const [college, setCollege] = useState(user.college);
    const [major, setMajor] = useState(user.major);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await updateProfile({
                name: name !== user.name ? name : null,
                last_name: lastName !== user.last_name ? lastName : null,
                college: college !== user.college ? college : null,
                major: major !== user.major ? major : null,
            });
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Ocurrió un error al actualizar el perfil.');
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
                    <InputText
                        label="Nombre"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        required
                    />

                    <InputText
                        label="Apellido"
                        name="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Tu apellido"
                        required
                    />

                    <InputText
                        label="Universidad"
                        name="college"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="Tu universidad"
                        required
                    />

                    <InputText
                        label="Carrera"
                        name="major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        placeholder="Tu carrera"
                        required
                    />

                    <div className="flex justify-end gap-3 mt-4">
                        <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading} text="Cancelar" />
                        <Button type="submit" variant="primary" disabled={isLoading} text={
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
