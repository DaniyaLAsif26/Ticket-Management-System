import { Routes, Route } from "react-router-dom";

import HomePage from "../Pages/HomePage";
// import DashboardPage from "../Pages/DashboardPage";
// import LoginPage from "../Pages/LoginPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
    );
}