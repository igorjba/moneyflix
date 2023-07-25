import { useState } from "react";
import { toast } from "react-toastify";
import "./style.css";

const SignInForm = ({ signInForm, setSignInForm }) => {
  const [localForm, setLocalForm] = useState({
    username: signInForm.username,
    email: signInForm.email,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeSignIn = (event) => {
    setLocalForm({
      ...localForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitSignIn = () => {
    if (!localForm.username || !localForm.email) {
      toast.error("Por favor preencha todos os campos");
    } else {
      setSignInForm({
        ...signInForm,
        ...localForm,
      });
    }
  };

  return (
    <div className="sign-in">
      <h1 className="tittle-form">Faça Seu Login</h1>
      <form className="sign-in-form">
        <div className="container-email-sign-in-form container-input">
          <span className="sign-in-form-email span-forms">E-mail</span>
          <input
            className="sign-in-form-input input-forms"
            type="email"
            name="email"
            value={localForm.email}
            onChange={handleChangeSignIn}
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className="container-password-sign-in-form container-input">
          <div className="sign-in-form-spans-password">
            <span className="sign-in-form-password span-forms">Senha</span>
            <span className="sign-in-form-subtitle">
              <a className="sign-in-form-link" href="#">
                Esqueceu a senha?
              </a>{" "}
            </span>
          </div>
          <input
            className="sign-in-form-input input-forms input-password-confirm"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={localForm.confirmPassword}
            onChange={handleChangeSignIn}
            placeholder="Digite sua senha"
          />
        </div>
      </form>
      <div className="container-sign-in-form-button">
        <button className="sign-in-button" onClick={handleSubmitSignIn}>
          Entrar
        </button>
      </div>
      <div className="container-sign-in-form-subtitle">
        <span className="sign-in-form-subtitle">
          Ainda não possui uma conta?{" "}
          <a className="sign-in-form-link" href="#">
            Cadastre-se
          </a>{" "}
        </span>
      </div>
    </div>
  );
};

export default SignInForm;
