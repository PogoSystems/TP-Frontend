import {DashboardQuizCard} from "../components/dashboardQuizCard.tsx";
import { AiOutlineFire } from "react-icons/ai";
import { BsQuestionSquare } from "react-icons/bs";
import { MdOutlineBook } from "react-icons/md";
import {DashboardStat} from "../components/dashboardStat.tsx";
import {Card} from "../../../shared/components/ui/card.tsx";
import {CardCourse} from "../../../shared/components/ui/cardCourse.tsx";
import {Button} from "../../../shared/components/ui/button.tsx";
import { FaArrowRightLong, FaRegCircleCheck } from "react-icons/fa6";
import {HorizontalBarChart} from "../../../shared/components/ui/horizontalBarChart.tsx";
import { HiOutlineTrophy } from "react-icons/hi2";
import {Link} from "react-router-dom";
export default function DashboardPage(){
    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex flex-col gap-1 ">
                <h2 className="font-semibold text-4xl text-text-title">Hola, Usuario</h2>
                <ul className="flex flex-row gap-5">
                    <DashboardStat title={'Racha actual 7 días'} icon={ <AiOutlineFire className="text-accent-text" size={20}/>}/>
                    <div className="border-l border-vertical-divider" aria-hidden="true" />

                    <DashboardStat title={'48 Cuestionarios completados'} icon={<BsQuestionSquare  className="text-icon-green" size={20}/>}/>

                    <div className="border-l border-vertical-divider" aria-hidden="true" />
                    <DashboardStat title={'5 cursos activos'} icon={<MdOutlineBook className="text-icon-purple" size={20}/>}/>
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
                                <Button text={'Ver todos'} variant={'ghost'} icon={<FaArrowRightLong/>} />
                            </Link>

                        </div>

                        <div className='flex flex-row gap-5'>
                            <Link to={'/courses'} className="block flex-1 ">
                                <CardCourse iconText={'ED'} courseTitle={'Estructura de Datos'} courseDescription={'Fundamentos para la organización y gestión de datos de forma eficiente'} lastQuizTime={'2 horas'}/>
                            </Link>

                            <Link to={'/courses'} className="flex-1 block">
                                <CardCourse iconText={'ML'} courseTitle={'Machine Learning'} courseDescription={'Introduccion al aprendizaje supervisado y no supervisado'} lastQuizTime={'4 días'}/>
                            </Link>

                        </div>

                    {/* Recent activities */}
                    <div>
                        <h2 className="font-semibold text-lg text-text-title pb-3.5">Actividad reciente</h2>
                        <div className="flex flex-col gap-2">
                            <Card>
                                <div className="flex flex-row items-center content-center gap-5">
                                    <div>
                                        <FaRegCircleCheck size={30} className="text-accent-text"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <Card.Header title={'Cuestionario completado: Quiz 1 - Semana 10 - Calidad'}></Card.Header>
                                        <Card.Content className=" flex flex-col gap-5">
                                            <div>
                                                <p className="text-sm text-text-subtle">Obtuviste 140 puntos</p>
                                                <p className="text-xs font-light text-text-subtle">Hoy, 22:16</p>
                                            </div>
                                        </Card.Content>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className="flex flex-row items-center content-center gap-5">
                                    <div>
                                        <HiOutlineTrophy size={30} className="text-icon-blue"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <Card.Header title={'Nuevo logro desbloqueado: Primeros Pasos'}></Card.Header>
                                        <Card.Content className=" flex flex-col gap-5">
                                            <div>
                                                <p className="text-sm text-text-subtle">Has completado 1 cuestionario</p>
                                                <p className="text-xs font-light text-text-subtle">Ayer, 18:16</p>
                                            </div>
                                        </Card.Content>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Cognitive Summary */}
                <div className=" w-1/3">
                    <Card className="flex flex-col gap-3 w-full">
                        <Card.Header title={'Resumen cognitivo'}/>
                        <Card.Content className="flex flex-col gap-3">
                            <HorizontalBarChart percentage={70} bloomLevel={'remember'}/>
                            <HorizontalBarChart percentage={24} bloomLevel={'apply'}/>
                            <HorizontalBarChart percentage={100} bloomLevel={'understand'}/>
                            <HorizontalBarChart percentage={42} bloomLevel={'analyze'}/>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>

    )
}