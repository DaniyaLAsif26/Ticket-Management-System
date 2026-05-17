import { Routes, Route } from "react-router-dom";

import HomePage from "../Pages/HomePage";
import AllTicketsPage from "../Pages/AllTicketsPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/all-tickets" element={<AllTicketsPage />} />

        </Routes>
    );
}