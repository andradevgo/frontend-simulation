
import { FC } from "react";
import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import { Enrollments } from "../pages/Enrollments";
import { Students } from "../pages/Students";
import { Subjects } from "../pages/Subjects";
import { MainLayout } from "../components/layouts/MainLayout";

export const AppRouter: FC = () => {
    return (
        <MainLayout>
            <Routes>

                <Route path="/enrollments" element={<Enrollments />} />
                <Route path="/students" element={<Students />}/>
                <Route path="/subjects" element={<Subjects />}/>
                <Route path="/*" element={<Navigate to="/students" />}/>
            

            </Routes >
        </MainLayout>
    )
}
