import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorage";

const Authenticated = () => {
    const token = getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    return token ? <Outlet /> : null;
};

export default Authenticated;