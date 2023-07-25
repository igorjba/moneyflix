import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/usuario" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;