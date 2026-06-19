import {Card} from "./card.tsx";
import {FaRegClock} from "react-icons/fa6";


interface CardCourseProps{
    iconText: string,
    courseTitle: string,
    courseDescription: string,
    lastQuizTime: string
}

export function CardCourse({iconText, courseTitle, courseDescription, lastQuizTime}: CardCourseProps){
    return(
        <Card className="flex flex-col gap-3 w-full">
            <div className=" flex flex-row gap-3">
                <div className="flex bg-bg-icon-pink text-white font-semibold text-lg p-3 rounded-xl h-12 min-w-12 items-center justify-center">
                    {iconText}
                </div>

                <div className="text-sm">
                    <Card.Header title={`${courseTitle}`}/>
                    <Card.Content>
                        <p className="line-clamp-2">
                            {courseDescription}
                        </p>
                    </Card.Content>
                </div>
            </div>

            <div className="border-t-1 border-gray-100">
                <Card.Footer className="flex flex-row gap-2 items-center text-text-subtle pt-2 text-xs">
                    <FaRegClock />
                    <p>Último cuestionario: Hace {lastQuizTime}</p>
                </Card.Footer>
            </div>

        </Card>
    )
}