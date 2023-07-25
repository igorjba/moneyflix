import { useState } from "react";
import { toast } from "react-toastify";
import "./style.css";

const StepTwoForm = ({ setCurrentStep, signUpForm, setSignUpForm }) => {
  const [localForm, setLocalForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
          <input
            className="step-two-form-input input-forms input-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={localForm.password}
            onChange={handleChangeStepTwo}
          />
        </div>
        <div className="container-email-step-two-form container-input">
          <span className="step-two-form-email span-forms">
            Repita a senha*
          </span>
          <input
            className="step-two-form-input input-forms input-password-confirm"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={localForm.confirmPassword}
            onChange={handleChangeStepTwo}
          />
          <div
            onClick={() =>
              setShowPassword((prevShowPassword) => !prevShowPassword)
            }
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </div>
        </div>
      </form>
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
          Já tem uma conta? Faça seu <a href="#">Login</a>{" "}
        </span>
      </div>
    </div>
  );
};

export default StepTwoForm;
