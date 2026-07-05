import {DashboardQuizCard} from "../components/dashboardQuizCard.tsx";
import {DashboardStat} from "../components/dashboardStat.tsx";
import {Card} from "../../../shared/components/ui/card.tsx";
import {CardCourse} from "../../../shared/components/ui/cardCourse.tsx";
import {Button} from "../../../shared/components/ui/button.tsx";
import {HorizontalBarChart} from "../../../shared/components/ui/horizontalBarChart.tsx";
import {Link} from "react-router-dom";
import {useCourseSummaries} from "../hook/useCourseSummaries.ts";
import {useUserActivity} from "../hook/useUserActivity.ts";

import { BadgeCheck , Trophy, Flame, FileQuestionMark, BookMarked, ArrowRight } from 'lucide-react';
import type {ActivityType} from "../types/userActivity.types.ts";
import type { LucideIcon } from 'lucide-react'
import {useBloomStats} from "../types/useBloomStats.ts";

const USER_ACTIVITY_STYLE: Record<ActivityType, {icon: LucideIcon; color:string}> ={
    quiz:{icon:BadgeCheck , color: 'text-accent-text'},
    achievement:{icon:Trophy, color:'text-icon-blue'}
}

export default function DashboardPage(){
    const {courses, totalCourses} = useCourseSummaries()
    const {activities, totalQuizzes, currentStreak} = useUserActivity()
    const {bloomChartData}=useBloomStats()

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex flex-col gap-1 ">
                <h2 className="font-semibold text-4xl text-text-title">Hola, Usuario</h2>
                <ul className="flex flex-row gap-5">
                    <DashboardStat title={`Racha actual ${currentStreak} días`} icon={ <Flame className="text-accent-text" size={20}/>}/>
                    <div className="border-l border-vertical-divider" aria-hidden="true" />

                    <DashboardStat title={`${totalQuizzes} Cuestionarios completados`} icon={<FileQuestionMark   className="text-icon-green" size={20}/>}/>

                    <div className="border-l border-vertical-divider" aria-hidden="true" />
                    <DashboardStat title={`${totalCourses} cursos activos`} icon={<BookMarked  className="text-icon-purple" size={20}/>}/>
                </ul>
            </div>

            {/* Banner */}
            <div className="w-full pt-10">
                <DashboardQuizCard/>
            </div>

            {/* Content */}
            <div className="flex flex-row justify-between pt-10 gap-10">
                <div className="flex flex-col gap-5  flex-1">

                    {/* My Courses */}
                        <div className="flex flex-row justify-between">
                            <h2 className="font-semibold text-lg text-text-title pb-3.5">Mis cursos</h2>
                            <Link to={'/courses'} className="self-center">
                                <Button text={'Ver todos'} variant={'ghost'} icon={<ArrowRight  />} />
                            </Link>

                        </div>

                        <div className='flex flex-row gap-5'>
                            {courses.map((course) =>
                                <Link to={`/courses/${course.id}`} className="block flex-1 " key={course.id}>
                                    <CardCourse iconText={`${course.iconText}`} courseTitle={`${course.title}`} courseDescription={`${course.description}`} lastQuizTime={`${course.lastQuizTime}`}/>
                                </Link>
                            )}
                        </div>

                    {/* Recent activities */}
                    <div>
                        <h2 className="font-semibold text-lg text-text-title pb-3.5">Actividad reciente</h2>
                        <div className="flex flex-col gap-2">
                            {activities.map((activity) =>{
                                const style =USER_ACTIVITY_STYLE[activity.type]
                                const Icon = style.icon
                                return(
                                    <Card key={activity.id}>
                                        <div className="flex flex-row items-center content-center gap-5">
                                            <div>
                                                <Icon size={30} className={style.color}></Icon>
                                            </div>
                                            <div className="flex flex-col">
                                                <Card.Header title={`${activity.title}`}></Card.Header>
                                                <Card.Content className=" flex flex-col gap-5">
                                                    <div>
                                                        <p className="text-sm text-text-subtle">{activity.description}</p>
                                                        <p className="text-xs font-light text-text-subtle">{activity.time}</p>
                                                    </div>
                                                </Card.Content>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>

                {/* Cognitive Summary */}
                <div className=" w-1/3">
                    <Card className="flex flex-col gap-3 w-full">
                        <Card.Header title={'Resumen cognitivo'}/>
                        <Card.Content className="flex flex-col gap-3">
                            {bloomChartData.map((stat) =>
                                <HorizontalBarChart percentage={stat.percentage} bloomLevel={stat.bloomLevel} key={stat.bloomLevel}/>
                            )}
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>

    )
}