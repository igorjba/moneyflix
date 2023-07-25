import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/home" element={<Main />} />
                <Route path="/cadastro" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;