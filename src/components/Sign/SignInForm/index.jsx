import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/api.jsx";
import closedEye from "../../../assets/ClosedEye.svg";
import openEye from "../../../assets/OpenEye.svg";
import success from "../../../assets/Success-Toast.svg";
import toastError from "../../../assets/toastError.svg";
import useUser from "../../../hooks/useUser";
import { validateEmail } from "../../../utils/validation";
import "./style.css";

const SignInForm = ({ signInForm, setSignInForm }) => {
  const { setNameUser, setLoggedInUser, setOpenLoading } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();
  const [localForm, setLocalForm] = useState({
    email: signInForm.email,
    password: signInForm.password,
  });
  const specialCharacters = [
    "!",
    "#",
    "$",
    "%",
    "&",
    "*",
    "(",
    ")",
    "+",
    "=",
    "{",
    "}",
    "[",
    "]",
    ";",
    ":",
    "<",
    ">",
    "?",
    "/",
    "|",
    "~",
    "^",
    "`",
  ];

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

      if (response && response.data.id_usuario) {
        localStorage.setItem("token", `${response.data.token}`);
        localStorage.setItem("id", response.data.id_usuario);
        localStorage.setItem("name", response.data.nome_usuario);

        setNameUser(response.data.nome_usuario);
        setLoggedInUser({
          nome: response.data.nome_usuario,
          email: response.data.email,
          cpf: response.data.cpf,
          telefone: response.data.telefone,
        });

        toast.success("Login bem sucedido", {
          className: "customToastify-success",
          icon: ({ theme, type }) => <img src={success} alt="" />,
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
    setOpenLoading(true)
    setErrorEmail("");
    setErrorPassword("");

    const validationEmail = validateEmail(localForm.email);
    if (!validationEmail.isValid) {
      setErrorEmail(validationEmail.message);
      return;
    }
    const emailArray = localForm.email.split("");
    const containsSpecialCharacter = emailArray.some((character) =>
      specialCharacters.includes(character)
    );

    if (containsSpecialCharacter) {
      return setErrorEmail("Email não pode conter caracteres especiais");
    }

    if (!localForm.password) {
      setErrorPassword("Senha não informada");
      return;
    }

    if (!localForm.password || !localForm.email) {
      return toast.error("Por favor preencha todos os campos", {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={toastError} alt="" />,
      });
    }

    setSignInForm({
      ...signInForm,
      ...localForm,
    });

    setTimeout(() => {
      login();
      setOpenLoading(false)
    }, 2000)

  };


  function teste(e) {

    handleSubmitSignIn(e)
  }


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
            className={`${errorEmail ? "errorLine" : ""
              } sign-in-form-input input-forms`}
            type="email"
            name="email"
            value={localForm.email}
            onChange={handleChangeSignIn}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmitSignIn(event);
              }
            }}
            placeholder="Digite seu e-mail"
          />
          {errorEmail && (
            <span className="error error-step-one">{errorEmail}</span>
          )}
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
            className={`${errorPassword ? "errorLine" : ""
              } sign-in-form-input input-forms input-password`}
            type={showPassword ? "text" : "password"}
            name="password"
            value={localForm.password}
            onChange={handleChangeSignIn}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmitSignIn(event);
              }
            }}
            placeholder="Digite sua senha"
          />
          {errorPassword && (
            <span className="error error-step-one">{errorPassword}</span>
          )}
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
        <button className="sign-in-button" onClick={(e) => teste(e)}>
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
