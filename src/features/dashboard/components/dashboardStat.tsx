import * as React from "react";

interface DashboardStatProps{
    title:string;
    icon: React.ReactNode;
}

export function DashboardStat({title, icon} : DashboardStatProps){
    return(
        <li className="flex flex-row items-center gap-1.5 text-xs sm:text-base shrink-0 whitespace-nowrap">
            {icon}
            <span>{title}</span>
        </li>
    )
}