import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../api/api.jsx";
import closedEye from "../../../assets/ClosedEye.svg";
import openEye from "../../../assets/OpenEye.svg";
import toastError from "../../../assets/toastError.svg";
import { validatePassword } from "../../../utils/validation";
import "./style.css";

const StepTwoForm = ({ setCurrentStep, signUpForm, setSignUpForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [localForm, setLocalForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChangeStepTwo = (event) => {
    setLocalForm({
      ...localForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitStepTwo = async () => {
    setErrorPassword("");
    setErrorConfirmPassword("");

    if (!localForm.password) {
      setErrorPassword("A senha é obrigatória");
      return;
    } else {
      const validationPassword = validatePassword(localForm.password);
      if (!validationPassword.isValid) {
        if (validationPassword.message.includes("6")) {
          toast.error(validationPassword.message, {
            toastClassName: "customToastify-error",
            icon: ({ theme, type }) => <img src={toastError} alt="" />,
          });
          return;
        }
        setErrorPassword(validationPassword.message);
        return;
      }
    }
    if (localForm.password !== localForm.confirmPassword) {
      setErrorConfirmPassword("As senhas não coincidem");
      return;
    }

    try {
      const response = await axios.post(
        "https://404notfound.cyclic.app/usuario",
        {
          nome: signUpForm.username,
          email: signUpForm.email,
          senha: localForm.password,
        }
      );
      setCurrentStep(2);
    } catch (error) {
      if (
        error.response.data.message.includes("email") ||
        error.response.data.message.includes("E-mail") ||
        error.response.data.message.includes("nome")
      ) {
        setCurrentStep(0);
        toast.error(error.response.data.message, {
          className: "customToastify-error",
          icon: ({ theme, type }) => <img src={error} alt="" />,
        });
      } else {
        toast.error(error.response.data.message, {
          className: "customToastify-error",
          icon: ({ theme, type }) => <img src={error} alt="" />,
        });
      }
    }
  };

  return (
    <div className="sign-up-form-step-two">
      <h1 className="step-two-tittle">Escolha uma senha</h1>
      <form className="step-two-form">
        <div className="container-name-step-two-form container-input">
          <span className="step-two-form-name span-forms">Senha*</span>
          <div className="container-input-password">
            <input
              className={`step-two-form-input input-forms step-two-input-password ${errorPassword ? "errorLine" : ""
                }`}
              type={showPassword ? "text" : "password"}
              name="password"
              value={localForm.password}
              onChange={handleChangeStepTwo}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmitStepTwo(event);
                }
              }}
              placeholder="Digite sua senha"
            />
            <div
              className="step-two-form-toggle-password-visibility"
              onClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
              style={{
                backgroundImage: `url(${showPassword ? openEye : closedEye})`,
              }}
            />
          </div>
          {errorPassword && (
            <span className="error error-step-two">{errorPassword}</span>
          )}
        </div>
        <div className="container-email-step-two-form container-input">
          <span className="step-two-form-email span-forms">
            Repita a senha*
          </span>
          <div className="container-input-password-confirm">
            <input
              className={`step-two-form-input input-forms step-two-input-password-confirm ${errorConfirmPassword ? "errorLine" : ""
                }`}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={localForm.confirmPassword}
              onChange={handleChangeStepTwo}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmitStepTwo(event);
                }
              }}
              placeholder="Confirme sua senha"
            />
            <div
              className="step-two-form-toggle-confirm-password-visibility"
              onClick={() =>
                setShowConfirmPassword((prevShowPassword) => !prevShowPassword)
              }
              style={{
                backgroundImage: `url(${showConfirmPassword ? openEye : closedEye
                  })`,
              }}
            />
          </div>
          {errorConfirmPassword && (
            <span className="error error-step-two">{errorConfirmPassword}</span>
          )}
        </div>
      </form>
      <div className="container-step-two-form-button">
        <button
          className="step-two-next-page-button"
          onClick={handleSubmitStepTwo}
        >
          Finalizar cadastro
        </button>
      </div>
      <div className="container-step-two-form-subtitle">
        <span className="step-two-form-subtitle">
          Já tem uma conta? Faça seu <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default StepTwoForm;
