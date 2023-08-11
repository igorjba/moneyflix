import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import toastError from "../assets/toastError.svg";
import { clearAll, getItem } from "../utils/localStorage";

function useUserProvider() {
  const token = getItem("token");
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState(getItem("name"));

  const [title, setTitle] = useState("Resumo de Cobranças");
  const [titleNameSecond, setTitleNameSecond] = useState("");
  const [titleNameThird, setTitleNameThird] = useState("");
  const [openLoading, setOpenLoading] = useState(false);
  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
  const [openModalEditProfileSuccess, setOpenModalEditProfileSuccess] =
    useState(false);

  const [resumeName, setResumeName] = useState("");
  const [imageNavClient, setImageNavClient] = useState(true);
  const [imageNavHome, setImageNavHome] = useState(false);
  const [imageNavCharge, setImageNavCharge] = useState(true);
  const [modalExit, setModalExit] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  async function getUserDetails() {
    try {
      const response = await api.get("/usuario", {
        headers: {
          authorization: token,
        },
      });

      if (response && response.data) {
        setGetProfile({
          nome: response.data.nome_usuario || "",
          email: response.data.email || "",
          cpf: response.data.cpf || "",
          telefone: response.data.telefone || "",
          senhaAtual: "",
          senha: "",
          confirmeSenha: "",
        });
      } else {
        setGetProfile({
          nome: "",
          email: "",
          cpf: "",
          telefone: "",
          senhaAtual: "",
          senha: "",
          confirmeSenha: "",
        });
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "token expirado"
        ) {
          clearAll();
          navigate("/login");
        } else if (
          error.response.status === 400 &&
          error.response.data.message === "Não autorizado"
        ) {
          clearAll();
          navigate("/login");
        }
      }
      toast.error(error.response.data.message, {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={toastError} alt="" />,
      });
    }
  }

  //fazer hook so de client agora

  const [clientDetailPage, setClientDetailPage] = useState(false);

  const [idClientDetail, setIdClientDetail] = useState(null);
  /*const [clientRegisters, setClientRegisters] = useState([]);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [openModalEditClient, setOpenModalEditClient] = useState(false) */

  const [getInformationClientDetail, setGetInformationClientDetail] =
    useState(true); //geazi porém da pra entrelacar todos - posso joga no user de client ?

  const [idListChargesClick, setIdListChargesClick] = useState([]); //detalhes do cliente, pode ser reutilizado outros - posso joga no user de client ?

  const [loggedInUser, setLoggedInUser] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senhaAtual: "",
    senha: "",
    confirmeSenha: "",
  });
  const [getProfile, setGetProfile] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senhaAtual: "",
    senha: "",
    confirmeSenha: "",
  });
  const [listClientByStatus, setListClientByStatus] = useState("");
  return {
    setOpenModalEditProfileSuccess,
    openModalEditProfileSuccess,
    getProfile,
    setGetProfile,
    openModalEditProfile,
    setOpenModalEditProfile,
    title,
    setTitle,
    token,
    nameUser,
    setNameUser,
    loggedInUser,
    setLoggedInUser,
    idListChargesClick,
    setIdListChargesClick,
    idClientDetail,
    setIdClientDetail,
    clientDetailPage,
    setClientDetailPage,
    titleNameSecond,
    setTitleNameSecond,
    openLoading,
    setOpenLoading,
    getInformationClientDetail,
    setGetInformationClientDetail,
    setTitleNameThird,
    titleNameThird,
    resumeName,
    setResumeName,
    imageNavClient,
    setImageNavClient,
    imageNavHome,
    setImageNavHome,
    imageNavCharge,
    setImageNavCharge,
    modalExit,
    setModalExit,
    openModalEdit,
    setOpenModalEdit,
    getUserDetails,
    listClientByStatus,
    setListClientByStatus,
  };
}

export default useUserProvider;
