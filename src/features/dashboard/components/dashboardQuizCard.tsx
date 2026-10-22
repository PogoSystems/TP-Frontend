import { Link } from "react-router-dom";
import {Button} from "../../../shared/components/ui/button.tsx";

export function DashboardQuizCard() {
    return(
        <div className="bg-linear-to-r from-bg-dashboard-card-secondary to-bg-dashboard-card-primary p-6 sm:p-10 rounded-2xl w-full min-h-[200px] lg:h-64 relative overflow-hidden flex flex-col justify-between">

            {/* Text */}
            <div className="flex flex-col gap-2 w-full sm:w-2/3 lg:w-1/2 text-white pb-6 sm:pb-9 z-10">
                <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">¿Listo para evaluar tu progreso?</h2>
                <p className="text-sm sm:text-base font-light text-white/90">Genera un cuestionario personalizado basado en tu lecturas recientes</p>
            </div>

            {/* Button */}
            <div className="w-full sm:w-40 z-10">
                <Link to={'/quizzes'} className="w-full block">
                    <Button text={'Generar quiz'} variant={'secondary'}></Button>
                </Link>
            </div>

            {/* Icon */}
            <div className="absolute top-4 sm:top-15 right-0 pointer-events-none opacity-20 sm:opacity-25">
                <img src="/stars.svg" className="w-36 sm:w-auto" alt="Star icon"/>
            </div>

        </div>


    )
}