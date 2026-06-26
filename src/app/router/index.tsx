import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.tsx";
import AppLayout from "../layouts/AppLayout.tsx";
import DashboardPage from "../../features/dashboard/page/dashboardPage.tsx";
import {CoursesPage} from "../../features/course/page/coursesPage.tsx";
import {CreateQuizPage} from "../../features/quiz/page/createQuizPage.tsx";
import {LoginPage} from "../../features/auth/page/loginPage.tsx";
import {RegisterPage} from "../../features/auth/page/registerPage.tsx";

export const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        children: [
            { path: '/login', element: <LoginPage/> },
            {path: '/register', element: <RegisterPage/>},
        ]
    },
    {
        element: <AppLayout/>,
        children: [
            {path: '/', element: <DashboardPage/>},
            {path: '/courses', element:<CoursesPage/>},
            {path: '/quizzes', element: <CreateQuizPage/>},
            {path: '/progress', element: <div>Progreso</div>},
            {path: '/profile-achievements', element: <div>Perfil y Logros</div>},
        ]
    }
])