import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./pages/Main/index";
import "./index.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Main /> */}
    {/* <SignUp /> */}
    <SignIn />
  </React.StrictMode>
);
