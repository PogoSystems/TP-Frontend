import { GiMonkey } from "react-icons/gi";
import { IoBookOutline } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
import { AiOutlineRise, AiOutlineClose } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";
import * as React from "react";
import {NavLink} from "react-router-dom";

interface NavItem{
    label: string;
    icon: React.ReactNode;
    path: string;
}

const NAV_ITEMS: NavItem[]=[
    {label: 'Mi Espacio', icon: <GiMonkey size={20}/>, path: '/' },
    {label: 'Curso', icon: <IoBookOutline size={20}/>, path: '/courses' },
    {label: 'Cuestionarios', icon: <LuBrain size={20}/>, path: '/quizzes' },
    {label: 'Progreso', icon: <AiOutlineRise size={20}/>, path: '/progress' },
    {label: 'Perfil y Logros', icon: <LuUserRound size={20}/>, path: '/profile-achievements' }
]

interface SidebarProps{
    onClose: () => void;
}

export default function Sidebar({onClose}: SidebarProps){
    return(
        <nav className="flex flex-col bg-bg-sidebar px-5 h-screen w-64 z-30">

            <div className="flex flex-row justify-between py-8">
                {/* App Name */}
                <span className="font-logo text-accent-text font-bold text-4xl px-3">Pogo.</span>

                {/* Close button (mobile only)*/}
                <button
                onClick={onClose}
                aria-label="Close sidebar"
                className="lg:hidden absolute top-5 right-5 rounded-md p-1 text-text-subtle hover:bg-accent-bg transition-colors">
                <AiOutlineClose size={20}/>
                </button>
            </div>

            {/* Navigation items */}
            {NAV_ITEMS.map(({label, icon, path}) => (
                <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                        `flex flex-row px-3 py-2.5 font-body gap-3 rounded-lg transition-colors duration-150
                         ${isActive
                            ? 'bg-accent-bg text-accent-text font-medium'
                            : 'text-text-body hover:bg-accent-bg/50 hover:text-text-title'
                        }`
                    }
                >
                    {icon}
                    {label}
                </NavLink>
            ))}
        </nav>
    )
}