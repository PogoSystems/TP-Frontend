import { Link } from "react-router-dom";
import {Button} from "../../../shared/components/ui/button.tsx";

export function DashboardQuizCard() {
    return(
        <div className="bg-linear-to-r from-bg-dashboard-card-secondary  to-bg-dashboard-card-primary p-10 rounded-lg w-full lg:h-64 relative">

            {/* Text */}
            <div className="flex flex-col gap-2 w-full sm:w-2/3 lg:w-1/2 text-white pb-9">
                <h2 className="text-3xl">¿Listo para evaluar tu progreso?</h2>
                <p className="text-base font-light">Genera un cuestionario personalizado basado en tu lecturas recientes </p>
            </div>

            {/* Button */}
            <div className="w-40 ">
                <Link to={'/quizzes'} className="w-full">
                    <Button text={'Generar quiz'} variant={'secondary'}></Button>
                </Link>

            </div>

            {/* Icon */}
            <div className="absolute top-15 right-0">
                <img src="/src/assets/images/stars.svg" className="opacity-20" alt="Star icon"/>
            </div>

        </div>


    )
}