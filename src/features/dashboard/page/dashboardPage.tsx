import { DashboardQuizCard } from "../components/dashboardQuizCard.tsx";
import { DashboardStat } from "../components/dashboardStat.tsx";
import { Card } from "../../../shared/components/ui/card.tsx";
import { CardCourse } from "../../../shared/components/ui/cardCourse.tsx";
import { Button } from "../../../shared/components/ui/button.tsx";
import { HorizontalBarChart } from "../../../shared/components/ui/horizontalBarChart.tsx";
import { Link } from "react-router-dom";
import { useCourseSummaries } from "../hook/useCourseSummaries.ts";
import { useUserActivity } from "../hook/useUserActivity.ts";
import { useBloomStats } from "../types/useBloomStats.ts";
import { EmptyState } from "../../../shared/components/ui/emptyState.tsx";
import {CourseCardSkeleton, ActivitySkeleton, BloomStatSkeleton,} from "../components/dashboardSkeletons.tsx";
import {BadgeCheck, Trophy, Flame, FileQuestionMark, BookMarked, ArrowRight, BookOpenIcon, Activity,} from "lucide-react";
import type { ActivityType } from "../types/userActivity.types.ts";
import type { LucideIcon } from "lucide-react";

const USER_ACTIVITY_STYLE: Record<ActivityType, { icon: LucideIcon; color: string }> = {
    quiz: { icon: BadgeCheck, color: "text-accent-text" },
    achievement: { icon: Trophy, color: "text-icon-blue" },
};

export default function DashboardPage() {
    const { courses, totalCourses, isLoading: isLoadingCourses } = useCourseSummaries();
    const { activities, totalQuizzes, currentStreak, loading: isLoadingActivities } = useUserActivity();
    const { bloomChartData, loading: isLoadingBloom } = useBloomStats();

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-4xl text-text-title">Hola, Usuario</h2>
                <ul className="flex flex-row gap-5">
                    <DashboardStat
                        title={`Racha actual ${currentStreak} días`}
                        icon={<Flame className="text-accent-text" size={20} />}
                    />
                    <div className="border-l border-vertical-divider" aria-hidden="true" />

                    <DashboardStat
                        title={`${totalQuizzes} Cuestionarios completados`}
                        icon={<FileQuestionMark className="text-icon-green" size={20} />}
                    />

                    <div className="border-l border-vertical-divider" aria-hidden="true" />
                    <DashboardStat
                        title={`${totalCourses} cursos activos`}
                        icon={<BookMarked className="text-icon-purple" size={20} />}
                    />
                </ul>
            </div>

            {/* Banner */}
            <div className="w-full pt-10">
                <DashboardQuizCard />
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row justify-between pt-8 sm:pt-10 gap-8 lg:gap-10 min-w-0">
                <div className="flex flex-col gap-5 flex-1">

                    {/* My Courses */}
                    <div>
                        <div className="flex flex-row justify-between pb-3.5">
                            <h2 className="font-semibold text-lg text-text-title">Mis cursos</h2>
                            <Link to={"/courses"} className="self-center">
                                <Button text={"Ver todos"} variant={"ghost"} icon={<ArrowRight />} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 min-w-0 w-full">
                            {isLoadingCourses ? (
                                <>
                                    <CourseCardSkeleton />
                                    <CourseCardSkeleton />
                                </>
                            ) : courses.length === 0 ? (
                                <EmptyState
                                    variant="card"
                                    icon={BookOpenIcon}
                                    title="No tienes cursos registrados"
                                    description="Sube material académico para comenzar a generar cuestionarios adaptativos."
                                    actionText="Crear mi primer curso"
                                    actionLink="/courses/new"
                                />
                            ) : (
                                courses.map((course) => (
                                    <Link
                                        to={`/courses/${course.id}`}
                                        className="block flex-1"
                                        key={course.id}
                                    >
                                        <CardCourse
                                            iconText={`${course.iconText}`}
                                            courseTitle={`${course.title}`}
                                            courseDescription={`${course.description}`}
                                            lastQuizTime={`${course.lastQuizTime}`}
                                        />
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Recent activities */}
                    <div>
                        <h2 className="font-semibold text-lg text-text-title pb-3.5">
                            Actividad reciente
                        </h2>
                        <div className="flex flex-col gap-2">
                            {isLoadingActivities ? (
                                <>
                                    <ActivitySkeleton />
                                    <ActivitySkeleton />
                                </>
                            ) : activities.length === 0 ? (
                                <EmptyState
                                    variant="compact"
                                    icon={Activity}
                                    description="Aún no registras actividad. Completa tu primer cuestionario para ver tu historial aquí."
                                />
                            ) : (
                                activities.map((activity) => {
                                    const style = USER_ACTIVITY_STYLE[activity.type];
                                    const Icon = style.icon;
                                    return (
                                        <Card key={activity.id}>
                                            <div className="flex flex-row items-center gap-5 ">
                                                <div>
                                                    <Icon size={30} className={style.color} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <Card.Header title={`${activity.title}`} />
                                                    <Card.Content className="flex flex-col gap-5">
                                                        <div>
                                                            <p className="text-sm text-text-subtle">
                                                                {activity.description}
                                                            </p>
                                                            <p className="text-xs font-light text-text-subtle">
                                                                {activity.time}
                                                            </p>
                                                        </div>
                                                    </Card.Content>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* Cognitive Summary */}
                <div className="w-full lg:w-1/3">
                    <Card className="flex flex-col gap-3 w-full">
                        <Card.Header title={"Resumen cognitivo"} />
                        <Card.Content className="flex flex-col gap-4">
                            {isLoadingBloom ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <BloomStatSkeleton key={i} />
                                ))
                            ) : (
                                bloomChartData.map((stat) => (
                                    <HorizontalBarChart
                                        percentage={stat.percentage}
                                        bloomLevel={stat.bloomLevel}
                                        key={stat.bloomLevel}
                                    />
                                ))
                            )}
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    );
}