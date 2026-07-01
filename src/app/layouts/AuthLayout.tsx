import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return(
        <div className="min-h-screen bg-bg-auth flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
            <Outlet/>
        </div>
    )
}