import { useState } from "react";
import { getItem } from "../utils/localStorage";

function useUserProvider() {
  const [openModalEditProfile, SetOpenModalEditProfile] = useState(false);
  const [openModalEditProfileSuccess, setOpenModalEditProfileSuccess] =
    useState(false);
  const [title, setTitle] = useState("Resumo de Cobranças");
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [clientRegisters, setClientRegisters] = useState([]);
  const token = getItem("token");
  const [nameUser, setNameUser] = useState(getItem("name"));
  const [idListChargesClick, setIdListChargesClick] = useState([]);
  const [openModalEditClient, setOpenModalEditClient] = useState(false);
  const [clientDetailPage, setClientDetailPage] = useState(false);
  const [idClientDetail, setIdClientDetail] = useState(null);
  const [titleNameSecond, setTitleNameSecond] = useState("");
  const [titleNameTerc, setTitleNameTerc] = useState("");
  const [openLoading, setOpenLoading] = useState(false);
  const [getInformationClientDetail, setGetInformationClientDetail] =
    useState(true);
  const [infoClientCharges, setInfoClientCharges] = useState([]);
  const [openModalDelete, setModalDelete] = useState({
    status: false,
    id_charges: "",
  });
  const [modalExit, setModalExit] = useState(false);
  const [imageNavHome, setimageNavHome] = useState(false);
  const [imageNavClient, setimageNavClient] = useState(true);
  const [imageNavCharge, setimageNavCharge] = useState(true);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [openModalRegisterCharges, setOpenModalRegisterCharges] = useState({
    status: false,
    id_user: "",
    nome_user: "",
  });
  const [loggedInUser, setLoggedInUser] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senhaAtual: "",
    senha: "",
    confirmeSenha: "",
  });
  const [GetProfile, setGetProfile] = useState({
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
    modalExit,
    setModalExit,
    imageNavHome,
    setimageNavHome,
    imageNavClient,
    setimageNavClient,
    imageNavCharge,
    setimageNavCharge,
    openModalEdit,
    setOpenModalEdit,
    resumeName,
    setResumeName,
    setOpenModalEditProfileSuccess,
    openModalEditProfileSuccess,
    GetProfile,
    setGetProfile,
    setOpenModalRegisterCharges,
    openModalRegisterCharges,
    openModalEditProfile,
    SetOpenModalEditProfile,
    title,
    setTitle,
    openModalRegister,
    setOpenModalRegister,
    clientRegisters,
    setClientRegisters,
    token,
    nameUser,
    setNameUser,
    loggedInUser,
    setLoggedInUser,
    idListChargesClick,
    setIdListChargesClick,
    openModalEditClient,
    setOpenModalEditClient,
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
    openModalDelete,
    setModalDelete,
    infoClientCharges,
    setInfoClientCharges,
    setTitleNameTerc,
    titleNameTerc,
    listClientByStatus,
    setListClientByStatus,
  };
}

export default useUserProvider;
