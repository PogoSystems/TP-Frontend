import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.tsx";
import AppLayout from "../layouts/AppLayout.tsx";
import OnboardingPage from "../../features/onboarding/page/onboardingPage.tsx";

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
            {path: '/', element: <OnboardingPage/>},
            {path: '/courses', element: <div>Cursos</div>},
            {path: '/quizzes', element: <div>Cuestionarios</div>},
            {path: '/progress', element: <div>Progreso</div>},
            {path: '/profile-achievements', element: <div>Perfil y Logros</div>},
        ]
    }
])