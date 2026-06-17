import {Outlet} from "react-router-dom";
import Sidebar from "../../shared/components/ui/sidebar.tsx";
import { IoIosMenu } from "react-icons/io";
import {useState} from "react";

export default function AppLayout (){
    const [sidebarOpen, setSidebarOpen] =useState(false);

    return(
        <div className="h-screen bg-bg-app grid lg:grid-cols-[auto_1fr] ">

            {/* Sidebar */}
            <aside className={`fixed h-screen z-30 lg:static transition-transform duration-300 ease-in-out
                '            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </aside>

            {/* Background mobile */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`lg:hidden fixed inset-0 bg-black/50 z-20 transition-opacity  
                ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Main content */}
            <div className="flex flex-col min-w-0 h-full">

                {/* Header mobile */}
                <header className='w-full flex flex-row gap-3 lg:hidden p-6 bg-bg-sidebar '>
                    <button onClick={() => setSidebarOpen(true)} className='hover:bg-accent-bg rounded-lg p-2 transition-colors'>
                        <IoIosMenu size={30} className="fill-text-body" />
                    </button>
                    <span className="font-logo text-accent-text font-bold text-4xl px-3 ">Pogo.</span>
                </header>

                <main className="flex-1 p-6">
                    <Outlet/>
                </main>

            </div>
        </div>
    )
}