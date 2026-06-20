import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.tsx";
import AppLayout from "../layouts/AppLayout.tsx";
import DashboardPage from "../../features/dashboard/page/dashboardPage.tsx";
import {CoursesPage} from "../../features/course/page/coursesPage.tsx";

export const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        children: [
            { path: '/login', element: <div>Login</div> },
            {path: '/register', element: <div>Register</div>},
        ]
    },
    {
        element: <AppLayout/>,
        children: [
            {path: '/', element: <DashboardPage/>},
            {path: '/courses', element:<CoursesPage/>},
            {path: '/quizzes', element: <div>Cuestionarios</div>},
            {path: '/progress', element: <div>Progreso</div>},
            {path: '/profile-achievements', element: <div>Perfil y Logros</div>},
        ]
    }
])