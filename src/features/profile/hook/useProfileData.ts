import { useEffect, useState } from 'react';
import { fetchProfileData } from '../services/profileService';
import type { ProfilePageData } from '../types/profile.types';

export function useProfileData() {
    const [data, setData] = useState<ProfilePageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetchProfileData()
            .then((result) => {
                if (isMounted) setData(result);
            })
            .catch(() => {
                if (isMounted) setError('Hubo un error al cargar los datos del perfil.');
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return { data, isLoading, error };
}
