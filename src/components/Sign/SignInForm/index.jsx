import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
<<<<<<< HEAD
import openEye from "../../assets/OpenEye.svg";
import closedEye from "../../assets/ClosedEye.svg";
import api from "../../../api/api.jsx";
import toastError from "../../assets/toastError.svg";
import success from '../../assets/Success-Toast.svg';
=======
import openEye from "../../../assets/OpenEye.svg";
import closedEye from "../../../assets/ClosedEye.svg";
import api from "../../../api/api.jsx";
import toastError from "../../../assets/toastError.svg";
import success from '../../../assets/Success-Toast.svg';
import useUser from '../../../hooks/useUser'
>>>>>>> d0043d54050eb124ad8505073768d0d00d310c8d
import "./style.css";

const SignInForm = ({ signInForm, setSignInForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [localForm, setLocalForm] = useState({
    email: signInForm.email,
    password: signInForm.password,
  });

  const handleChangeSignIn = (event) => {
    setLocalForm({
      ...localForm,
      [event.target.name]: event.target.value,
    });
  };

  async function login() {
    try {
      const response = await api.post("/login", {
        email: localForm.email,
        senha: localForm.password,
      });
      if (response && response.data.user) {
        localStorage.setItem("token", `${response.data.token}`);
        localStorage.setItem("id", response.data.user.id_usuario);

        toast.success('Login bem sucedido', {
          className: 'customToastify-success',
          icon: ({ theme, type }) => <img src={success} alt="" />
        });
        navigate("/home");
      }

    } catch (error) {
      toast.error(error.response.data.message, {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={toastError} alt="" />,
      });
    }
  }

  const handleSubmitSignIn = (event) => {
    event.preventDefault();

    if (!localForm.password || !localForm.email) {
      return toast.error("Por favor preencha todos os campos", {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={toastError} alt="" />,
      });
    } else {
      setSignInForm({
        ...signInForm,
        ...localForm,
      });
    }

    login();
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

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
              <Link className="sign-in-form-link" to="/esqueci-senha">
                Esqueceu a senha?
              </Link>
            </span>
          </div>

          <input
            className="sign-in-form-input input-forms input-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={localForm.password}
            onChange={handleChangeSignIn}
            placeholder="Digite sua senha"
          />
          <div
            className="sign-in-form-toggle-password-visibility"
            onClick={() =>
              setShowPassword((prevShowPassword) => !prevShowPassword)
            }
            style={{
              backgroundImage: `url(${showPassword ? openEye : closedEye})`,
            }}
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
          <Link className="sign-in-form-link" to="/cadastro">
            Cadastre-se
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignInForm;
