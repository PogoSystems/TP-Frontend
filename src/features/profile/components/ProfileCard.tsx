import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import type { UserProfileResponse } from '../types/profile.types';
import { EditProfileModal } from './EditProfileModal';

interface ProfileCardProps {
    user: UserProfileResponse;
    onEditSuccess?: () => void;
}

/**
 * Tarjeta de perfil del usuario con avatar de iniciales, datos personales
 * y botón "Editar perfil".
 */
export function ProfileCard({ user, onEditSuccess }: ProfileCardProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const initials = `${user.name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
    const fullName = `${user.name} ${user.last_name}`;

    return (
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-5 sm:p-6 flex flex-col gap-6 min-w-0">
            {/* Header row */}
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-[#1a3a5a]">Tu perfil</h2>
                <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="bg-[#1a3a5a] text-white text-sm sm:text-base font-medium px-3.5 sm:px-4 py-2 rounded-lg
                               hover:bg-[#153050] transition-colors min-h-[40px] cursor-pointer shrink-0"
                >
                    Editar perfil
                </button>
            </div>

            {/* Profile info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left min-w-0">
                {/* Avatar */}
                <div
                    className="flex items-center justify-center rounded-full size-20 sm:size-24 shrink-0
                               bg-[#155dfc] border-4 border-[#e0e7ff] text-white text-2xl sm:text-3xl font-bold"
                >
                    {initials}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1a3a5a] leading-tight break-words">{fullName}</h3>
                    <p className="text-sm sm:text-base text-[#4a5565] break-words">{user.major}</p>

                    <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-1.5 mt-2 min-w-0">
                        <span className="flex items-center gap-2 text-xs sm:text-sm text-[#4a5565] break-all">
                            <Mail size={16} className="text-[#4a5565] shrink-0" />
                            {user.email}
                        </span>
                        <span className="flex items-center gap-2 text-xs sm:text-sm text-[#4a5565] break-words">
                            <MapPin size={16} className="text-[#4a5565] shrink-0" />
                            {user.college}
                        </span>
                    </div>
                </div>
            </div>
            
            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                user={user} 
                onSuccess={() => {
                    if (onEditSuccess) onEditSuccess();
                }} 
            />
        </div>
    );
}
