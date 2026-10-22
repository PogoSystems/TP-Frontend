import {Navigate, Outlet} from "react-router-dom";
import {Sidebar} from "../../shared/components/ui/sidebar.tsx";
import { IoIosMenu } from "react-icons/io";
import {useState} from "react";
import {useSession} from "../../features/auth/hook/useSession.ts";

export interface AppLayoutContext {
    setIsQuizActive: (active: boolean) => void;
}

export default function AppLayout() {
    const { session, isCheckingSession } = useSession();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isQuizActive, setIsQuizActive] = useState(false);

    // While checking the session, show a loading screen 
    if (isCheckingSession) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-3 bg-bg-app">
                <img src="/pogo.svg" alt="Cargando..." className="w-8 h-8 animate-spin" />
                <span className="text-sm text-text-subtle font-medium">Cargando sesión...</span>
            </div>
        );
    }

    // If there is no session, redirect to the login page
    if(!session){
        return <Navigate to={'/login'} replace/>
    }

    return (
        <div className="h-screen bg-bg-app grid lg:grid-cols-[auto_1fr] overflow-hidden">

            {/* Sidebar */}
            <aside className={`fixed h-screen z-30 lg:static transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
                ${isQuizActive ? 'pointer-events-none opacity-40 select-none' : ''}`}>
                <Sidebar onClose={() => setSidebarOpen(false)} isDisabled={isQuizActive} />
            </aside>

            {/* Background mobile */}
            <div
                onClick={() => !isQuizActive && setSidebarOpen(false)}
                className={`lg:hidden fixed inset-0 bg-black/50 z-20 transition-opacity  
                ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Main content */}
            <div className="flex flex-col min-w-0 h-full overflow-y-auto">

                {/* Header mobile */}
                <header className='w-full flex flex-row items-center gap-3 lg:hidden px-4 py-3.5 bg-bg-sidebar border-b border-gray-100'>
                    <button 
                        onClick={() => setSidebarOpen(true)} 
                        aria-label="Abrir menú"
                        className='hover:bg-accent-bg rounded-lg p-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center'
                    >
                        <IoIosMenu size={28} className="fill-text-body" />
                    </button>
                    <span className="font-logo text-accent-text font-bold text-3xl px-1">Pogo.</span>
                </header>

                <main className="flex-1 px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 pb-12 max-w-7xl mx-auto w-full">
                    {/* Pasamos setIsQuizActive a las páginas internas */}
                    <Outlet context={{ setIsQuizActive } satisfies AppLayoutContext} />
                </main>

            </div>
        </div>
    );
}
