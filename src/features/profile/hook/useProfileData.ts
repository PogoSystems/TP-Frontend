import { useEffect, useState } from 'react';
import { fetchProfileData } from '../services/profileService';
import type { ProfilePageData } from '../types/profile.types';

export function useProfileData() {
    const [data, setData] = useState<ProfilePageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = () => {
        setIsLoading(true);
        fetchProfileData()
            .then((result) => {
                setData(result);
            })
            .catch(() => {
                setError('Hubo un error al cargar los datos del perfil.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    return { data, isLoading, error, refetch: loadData };
}
