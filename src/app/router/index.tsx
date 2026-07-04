import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.tsx";
import AppLayout from "../layouts/AppLayout.tsx";
import DashboardPage from "../../features/dashboard/page/dashboardPage.tsx";
import { CoursesPage } from "../../features/course/page/coursesPage.tsx";
import {CourseDetailPage} from "../../features/course/page/courseDetailPage.tsx";
import { QuizTakingPage } from "../../features/quiz/page/quizTakingPage.tsx";
import { QuizResultsPage } from "../../features/quiz/page/quizResultsPage.tsx";
import {CreateQuizPage} from "../../features/quiz/page/createQuizPage.tsx";
import {LoginPage} from "../../features/auth/page/loginPage.tsx";
import {RegisterPage} from "../../features/auth/page/registerPage.tsx";
import { GeneralProgressPage } from "../../features/metrics/page/generalProgressPage.tsx";
import { ProfileAchievementsPage } from "../../features/profile/page/profileAchievementsPage.tsx";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <LoginPage/> },
            {path: '/register', element: <RegisterPage/>},
        ]
    },
    {
        element: <AppLayout />,
        children: [
            { path: '/', element: <DashboardPage /> },
            { path: '/courses', element: <CoursesPage /> },
            {path: '/courses/:courseId', element: <CourseDetailPage/>},
            { path: '/quizzes', element: <CreateQuizPage /> },
            { path: '/quiz/taking', element: <QuizTakingPage /> },
            { path: '/quiz/results', element: <QuizResultsPage /> },
            { path: '/progress', element: <GeneralProgressPage /> },
            { path: '/profile-achievements', element: <ProfileAchievementsPage /> },
        ]
    }
])