import { useState } from "react";
import { getItem } from "../utils/localStorage";

function useUserProvider() {
  const token = getItem("token");
  const [nameUser, setNameUser] = useState(getItem("name"));

  const [title, setTitle] = useState("Resumo de Cobranças");
  const [titleNameSecond, setTitleNameSecond] = useState('')
  const [titleNameThird, setTitleNameThird] = useState('');
  const [openLoading, setOpenLoading] = useState(false)
  const [openModalEditProfile, SetOpenModalEditProfile] = useState(false);
  const [openModalEditProfileSuccess, setOpenModalEditProfileSuccess] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [imageNavClient, setImageNavClient] = useState(true);
  const [imageNavHome, setImageNavHome] = useState(false);
  const [imageNavCharge, setImageNavCharge] = useState(true);
  const [modalExit, setModalExit] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  //fazer hook so de client agora
  const [openModalEditClient, setOpenModalEditClient] = useState(false)
  const [clientDetailPage, setClientDetailPage] = useState(false)
  const [idClientDetail, setIdClientDetail] = useState(null);
  const [clientRegisters, setClientRegisters] = useState([]);






  const [getInformationClientDetail, setGetInformationClientDetail] = useState(true)

  const [idListChargesClick, setIdListChargesClick] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senhaAtual: '',
    senha: '',
    confirmeSenha: ''
  });
  const [getProfile, setGetProfile] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senhaAtual: '',
    senha: '',
    confirmeSenha: ''
  });

  return (
    {
      setOpenModalEditProfileSuccess,
      openModalEditProfileSuccess,
      getProfile,
      setGetProfile,
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
    }
  )

}

export default useUserProvider;
