import { useState } from "react";
import "./style.css";
import SignInForm from "../../components/SignInForm";

export default function SignIn() {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="container-sign-in initial">
      <div className="sign-in-img">
        <h2 className="sentence-img">
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </h2>
      </div>
      <div className="container-sign-in-form">
        <SignInForm signInForm={signInForm} setSignInForm={setSignInForm} />
      </div>
    </div>
  );
}
