import * as React from "react";

interface DashboardStatProps{
    title:string;
    icon: React.ReactNode;
}

export function DashboardStat({title, icon} : DashboardStatProps){
    return(
        <li className="flex flex-row items-center gap-1 text-base">
            {icon}
            {title}
        </li>
    )
}