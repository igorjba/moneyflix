import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import openEye from "../../assets/OpenEye.svg";
import closedEye from "../../assets/ClosedEye.svg";
import "./style.css";

const StepTwoForm = ({ setCurrentStep, signUpForm, setSignUpForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localForm, setLocalForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function handleSignInRedirect() {
    navigate('/login')
  }


  const handleChangeStepTwo = (event) => {
    setLocalForm({
      ...localForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitStepOne = async () => {
    if (!localForm.password || !localForm.confirmPassword) {
      toast.error("Por favor preencha todos os campos");
    } else if (localForm.password !== localForm.confirmPassword) {
      toast.error("As senhas não coincidem");
    } else {
      setSignUpForm({
        ...signUpForm,
        password: localForm.password,
      });
      setCurrentStep(2);

      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify(signUpForm),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message);
        } else {
          setCurrentStep(2);
        }
      } catch (error) {
        toast.error("Erro ao tentar se inscrever");
      }
    }
  };

  return (
    <div className="sign-up-form">
      <h1 className="step-two-tittle">Adicione seus dados</h1>
      <form className="step-two-form">
        <div className="container-name-step-two-form container-input">
          <span className="step-two-form-name span-forms">Senha*</span>
          <div className="container-input-password">
            <input
              className="step-two-form-input input-forms step-two-input-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={localForm.password}
              onChange={handleChangeStepTwo}
            />
            <div
              className="step-two-form-toggle-password-visibility"
              onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
              style={{ backgroundImage: `url(${showPassword ? openEye : closedEye})` }}
            />
          </div>
        </div>
        <div className="container-email-step-two-form container-input">
          <span className="step-two-form-email span-forms">
            Repita a senha*
          </span>
          <div className="container-input-password-confirm">
            <input
              className="step-two-form-input input-forms step-two-input-password-confirm"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={localForm.confirmPassword}
              onChange={handleChangeStepTwo}
            />
            <div
              className="step-two-form-toggle-confirm-password-visibility"
              onClick={() => setShowConfirmPassword((prevShowPassword) => !prevShowPassword)}
              style={{ backgroundImage: `url(${showConfirmPassword ? openEye : closedEye})` }}
            />
          </div>
        </div>
      </form >
      <div className="container-step-two-form-button">
        <button
          className="step-two-next-page-button"
          onClick={handleSubmitStepOne}
        >
          Finalizar cadastro
        </button>
      </div>
      <div className="container-step-two-form-subtitle">
        <span className="step-two-form-subtitle">
          Já tem uma conta? Faça seu <a href="#" onClick={handleSignInRedirect}>Login</a>{" "}
        </span>
      </div>
    </div>
  );
};

export default StepTwoForm;
