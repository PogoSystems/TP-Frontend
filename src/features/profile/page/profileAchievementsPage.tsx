import { Flame, Star, Trophy } from 'lucide-react';

import { useProfileData } from '../hook/useProfileData';
import { ProfileCard } from '../components/ProfileCard';
import { GamificationKpiCard } from '../components/GamificationKpiCard';
import { WeeklyActivityCard } from '../components/WeeklyActivityCard';
import { AchievementCard } from '../components/AchievementCard';
import { ProfileSkeleton } from '../components/ProfileSkeleton';
import { ErrorState } from '../../../shared/components/ui/errorState';

export function ProfileAchievementsPage() {
    const { data, isLoading, error, refetch } = useProfileData();

    return (
        <div className="flex flex-col gap-6 w-full min-h-full">

            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold text-[#1a3a5a]">Perfil y Logros</h1>
                <p className="text-sm font-medium text-[#44474d] tracking-[0.14px]">
                    Gestiona tu perfil y tus hitos alcanzados en Pogo
                </p>
            </div>

            <div className="flex-1">
                {/* State: Loading */}
                {isLoading && <ProfileSkeleton />}

                {/* State: Error */}
                {!isLoading && (error || !data) && (
                    <ErrorState
                        title="Oops, ha ocurrido un problema"
                        subtitle="No pudimos cargar la información de tu perfil."
                        message={typeof error === 'string' ? error : undefined}
                        onRetry={refetch}
                    />
                )}

                {/* State: Success Data */}
                {!isLoading && !error && data && (
                    <div className="flex flex-col gap-6 w-full">
                        {/* Profile Card */}
                        <ProfileCard user={data.user} onEditSuccess={refetch} />

                        {/* KPI Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <GamificationKpiCard
                                title="Racha actual"
                                value={data.stats.current_streak}
                                unit="días"
                                icon={<Flame size={36} />}
                                color="#db1a1a"
                            />
                            <GamificationKpiCard
                                title="Mejor racha"
                                value={data.stats.best_streak}
                                unit="días"
                                icon={<Star size={36} />}
                                color="#00a63e"
                            />
                            <GamificationKpiCard
                                title="Puntaje más alto"
                                value={data.stats.highest_score}
                                unit="puntos"
                                icon={<Star size={36} />}
                                color="#615fff"
                            />
                            <GamificationKpiCard
                                title="Logros"
                                value={`${data.stats.achievements_unlocked}/${data.stats.achievements_total}`}
                                icon={<Trophy size={36} />}
                                color="#155dfc"
                            />
                        </div>

                        {/* Weekly Activity */}
                        <WeeklyActivityCard activity={data.weekly_activity} />

                        {/* Achievements List */}
                        <div className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold text-[#1a3a5a]">Lista de logros</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {data.achievements.map((achievement) => (
                                    <AchievementCard key={achievement.id} achievement={achievement} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}