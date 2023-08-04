import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../../components/Loading';
import SignInForm from "../../components/Sign/SignInForm";
import useUser from "../../hooks/useUser";
import "./style.css";

export default function SignIn() {
  const {openLoading} = useUser()

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  return (
    <>
    {openLoading && <Loading />}
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
    </>
  );
}
