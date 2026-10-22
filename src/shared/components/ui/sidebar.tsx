import { GiMonkey } from "react-icons/gi";
import {BookOpen, Brain, Bug, LogOut, TrendingUp, UserRound, X} from 'lucide-react';
import * as React from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../../features/auth/hook/useAuth.ts";
import {Button} from "./button.tsx";
import {RestigiaWidget} from "./restigiaWidget.tsx";

interface NavItem{
    label: string;
    icon: React.ReactNode;
    path: string;
}

const NAV_ITEMS: NavItem[]=[
    {label: 'Mi Espacio', icon: <GiMonkey size={20}/>, path: '/' },
    {label: 'Curso', icon: <BookOpen size={20}/>, path: '/courses' },
    {label: 'Cuestionarios', icon: <Brain  size={20}/>, path: '/quizzes' },
    {label: 'Progreso', icon: <TrendingUp  size={20}/>, path: '/progress' },
    {label: 'Perfil y Logros', icon: <UserRound size={20}/>, path: '/profile-achievements' }
]

interface SidebarProps{
    onClose: () => void;
    isDisabled?: boolean;
}

export function Sidebar({onClose, isDisabled = false}: SidebarProps){
    const { signOut } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        if (isDisabled) return;
        try {
            await signOut();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    }


    return (
        <nav className="flex flex-col bg-bg-sidebar px-5 h-full w-64 z-30 overflow-y-auto overscroll-contain">

            <div className="flex flex-row justify-between py-6 shrink-0">
                {/* App Name */}
                <Link to={'/'} onClick={() => onClose()}>
                    <span className="font-logo text-accent-text font-bold text-4xl px-3">Pogo.</span>
                </Link>


                {/* Close button (mobile only)*/}
                <button
                    onClick={onClose}
                    aria-label="Cerrar menú"
                    className="lg:hidden absolute top-5 right-4 rounded-md p-2 text-text-subtle hover:bg-accent-bg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                    <X size={20}/>
                </button>
            </div>

            {/* Navigation items */}
            <div className="flex flex-col gap-1">
                {NAV_ITEMS.map(({label, icon, path}) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === '/'}
                        onClick={(e) => {
                            if (isDisabled) {
                                e.preventDefault();
                                return;
                            }
                            onClose();
                        }}
                        tabIndex={isDisabled ? -1 : 0}
                        className={({ isActive }) =>
                            `flex flex-row items-center px-3 py-2.5 font-body gap-3 rounded-lg transition-colors duration-150 min-h-[44px]
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

                {/* External report link */}
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScpDKaaeQoOr_jRmSh8IOcpNLd2wJWBZqM5AZ-YjWde5U1rcQ/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        if (isDisabled) {
                            e.preventDefault();
                            return;
                        }
                        onClose();
                    }}
                    tabIndex={isDisabled ? -1 : 0}
                    className="flex flex-row items-center px-3 py-2.5 font-body gap-3 rounded-lg transition-colors duration-150 text-text-body hover:bg-accent-bg/50 hover:text-text-title min-h-[44px]"
                >
                    <Bug size={20} />
                    Reportar errores
                </a>
            </div>

            <div className="flex flex-col mt-6 lg:mt-auto gap-3 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))] shrink-0 border-t border-gray-100/80 lg:border-t-0">
                <RestigiaWidget />
                <Button text="Cerrar sesión" icon={<LogOut size={18} />} variant="ghost" onClick={handleLogout}/>
            </div>
        </nav>
    )
}