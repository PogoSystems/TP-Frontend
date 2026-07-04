import { Mail, MapPin } from 'lucide-react';
import type { UserProfileResponse } from '../types/profile.types';

interface ProfileCardProps {
    user: UserProfileResponse;
}

/**
 * Tarjeta de perfil del usuario con avatar de iniciales, datos personales
 * y botón "Editar perfil" (placeholder sin acción por ahora).
 */
export function ProfileCard({ user }: ProfileCardProps) {
    const initials = `${user.name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
    const fullName = `${user.name} ${user.last_name}`;

    return (
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] px-6 pt-6 pb-5 flex flex-col gap-6">
            {/* Header row */}
            <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-[#1a3a5a]">Tu perfil</h2>
                <button
                    type="button"
                    className="bg-[#1a3a5a] text-white text-base font-medium px-4 py-2 rounded-lg
                               hover:bg-[#153050] transition-colors cursor-default"
                    disabled
                    title="Próximamente"
                >
                    Editar perfil
                </button>
            </div>

            {/* Profile info */}
            <div className="flex items-start gap-5">
                {/* Avatar */}
                <div
                    className="flex items-center justify-center rounded-full size-24 shrink-0
                               bg-[#155dfc] border-4 border-[#e0e7ff] text-white text-3xl font-bold"
                >
                    {initials}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-2xl font-semibold text-[#1a3a5a] leading-8">{fullName}</h3>
                    <p className="text-base text-[#4a5565]">{user.major}</p>

                    <div className="flex flex-wrap gap-x-8 gap-y-1 mt-2">
                        <span className="flex items-center gap-2 text-sm text-[#4a5565]">
                            <Mail size={16} className="text-[#4a5565] shrink-0" />
                            {user.email}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-[#4a5565]">
                            <MapPin size={16} className="text-[#4a5565] shrink-0" />
                            {user.college}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
