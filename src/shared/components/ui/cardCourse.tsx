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
        <Card className="flex flex-col gap-3">
            <div className=" flex flex-row gap-3">
                <div className="flex bg-accent-button text-white font-semibold text-lg p-3 rounded-xl h-14 w-14 items-center justify-center">
                    {iconText}
                </div>

                <div>
                    <Card.Header title={`${courseTitle}`}/>
                    <Card.Content>
                        <p>
                            {courseDescription}
                        </p>
                    </Card.Content>

                </div>
            </div>

            <div className="border-t-1 border-gray-100">
                <Card.Footer className="flex flex-row gap-2 items-center text-text-subtle pt-2">
                    <FaRegClock />
                    <p>Último cuestionario: {lastQuizTime}</p>
                </Card.Footer>
            </div>

        </Card>
    )
}