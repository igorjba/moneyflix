import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Authenticated from "../components/Authenticated";
import { UserProvider } from "../contexts/UserContext";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { UserCharges } from "../contexts/UserChargesContext";
import { UserClientProvider } from "../contexts/UserClientContext";

const AppRoutes = () => {
    return (
        <Router>
            <UserProvider>
            <UserClientProvider>
            <UserCharges>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/home" element={<Authenticated />}>
                    <Route index element={<Main />} />
                </Route>
                <Route path="/cadastro" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            </UserCharges>
            </UserClientProvider>
            </UserProvider>
        </Router>
    );
};

export default AppRoutes;