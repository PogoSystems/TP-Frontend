import {Outlet} from "react-router-dom";

export default function AppLayout (){
    return(
        <div className="h-screen bg-bg-app grid grid-cols-[auto_1fr] ">

            {/* Sidebar */}
            <aside className="sticky h-screen bg-bg-sidebar w-64 z-30">
                sidebar
            </aside>


            {/* Main content */}
            <div className="flex flex-col min-w-0 h-full overflow-y-auto">

                <main className="flex-1 p-6">
                    <Outlet/>
                </main>

            </div>
        </div>
    )
}