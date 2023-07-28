import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import api from '../../api/api';
import chargePink from "../../assets/Charge-Pink.svg";
import charge from "../../assets/Charge.svg";
import clientePink from "../../assets/Client-Pink.svg";
import client from "../../assets/Client.svg";
import homePink from "../../assets/Home-Pink.svg";
import home from "../../assets/Home.svg";
import setBottom from "../../assets/chevron-down.svg";
import toastError from '../../assets/toastError.svg';
import ModalEdit from "../../components/ModalEdit";
import ModalRegister from "../../components/ModalRegister";
import ModalSet from "../../components/ModalSet";
import PageClient from "../../components/PageClient";
import PageHome from "../../components/PageHome";
import { getItem } from '../../utils/storage';
import "./style.css";

function Main() {
  const [modalExit, setModalExit] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [imageNavHome, setimageNavHome] = useState(false);
  const [imageNavClient, setimageNavClient] = useState(true);
  const [imageNavCharge, setimageNavCharge] = useState(true);
  const [title, setTitle] = useState("Resumo de Cobranças");
  const [openModalEditPerfil, SetOpenModalEditPerfil] = useState(false);
  const [openModalEdit, SetOpenModalEdit] = useState(false);
  const [userPerfil, setUserPerfil] = useState({});
  const [userName, setUserName] = useState('');
  const [resumeName, setResumeName] = useState('');

  const [formUser, setFormUser] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
  });
  const token = getItem('token');

  function onClickNavLeft(event) {
    const divs = document.querySelectorAll("div");
    divs.forEach((element) => {
      element.classList.remove("atived");
    });
    event.currentTarget.classList.add("atived");
  }

  async function fetchUserPerfil() {
    try {
      const response = await api.get("/usuario/painel", {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setUserPerfil(response.data); // atualize o estado aqui
      const userNameWords = response.data.nome_usuario.split(' ');
      const capitalizedUserName = userNameWords[0].charAt(0).toUpperCase() + userNameWords[0].slice(1);

      let resumeName;
      if (userNameWords.length === 1) {
        // Se o nome consiste em uma única palavra, pegue as duas primeiras letras
        resumeName = userNameWords[0].substring(0, 2).toUpperCase();
      } else {
        // Se o nome consiste em mais de uma palavra, pegue a primeira letra da primeira e última palavras
        const lastWord = userNameWords[userNameWords.length - 1];
        resumeName = userNameWords[0].charAt(0).toUpperCase() + lastWord.charAt(0).toUpperCase();
      }

      setUserName(capitalizedUserName);
      setResumeName(resumeName);
    } catch (error) {
      toast.error('Falha ao carregar valores', {
        className: 'customToastify-error',
        icon: ({ theme, type }) => <img src={toastError} alt="" />
      })
    }
  }

  function titleAtived() {
    if (!imageNavHome) {
      setTitle("Resumo de Cobranças");
    }
    if (!imageNavClient) {
      setTitle("Clientes");
    }
    if (!imageNavCharge) {
      setTitle("Cobranças");
    }
  }

  useEffect(() => {
    titleAtived();
    fetchUserPerfil();
  }, []);

  return (
    <div className='initial mainBody'>
      <nav className='initial navegation' >
        <div className='initial nav-icons atived' onClick={((event) => { onClickNavLeft(event), setimageNavClient(true), setimageNavHome(false), setimageNavCharge(true) })}>
          <img src={imageNavHome ? home : homePink} alt="Inicio" />
        </div>
        <div className='initial nav-icons' onClick={((event) => { onClickNavLeft(event), setimageNavClient(false), setimageNavHome(true), setimageNavCharge(true) })}>
          <img src={imageNavClient ? client : clientePink} alt="Cliente" />
        </div>
        <div className='initial nav-icons' onClick={((event) => { onClickNavLeft(event), setimageNavClient(true), setimageNavHome(true), setimageNavCharge(false) })}>
          <img src={imageNavCharge ? charge : chargePink} alt="Cobranças" />
        </div>
      </nav >
      <div className='center'>
        {openModalRegister && <div className='backgroundModal'></div>}
        {openModalEdit && <div className='backgroundModal'></div>}
        <header>
          <h2 className={`initial ${title == 'Resumo de Cobranças' ? '' : 'titleSecond'}`}>
            {title}
          </h2>
          <div className='initial'>
            <div className='title header-circle'>
              <h1>{resumeName}</h1>
            </div>
            <div className="profile initial">
              <h1>{userName}</h1>
              <img src={setBottom} alt="seta" onClick={() => setModalExit(!modalExit)} />
            </div>
          </div>
          {modalExit && (
            <ModalSet
              SetOpenModalEditPerfil={SetOpenModalEditPerfil}
              openModalEditPerfil={openModalEditPerfil}
              setModalExit={setModalExit}
              modalExit={modalExit}
            />
          )}
        </header>
        <div className='main'>
          {!imageNavClient && <PageClient
            setOpenModalRegister={setOpenModalRegister}
            openModalRegister={openModalRegister}
            setTitle={setTitle}
          />}
          {!imageNavHome && <PageHome />}
        </div>
      </div>
      {modalExit && <ModalSet
        SetOpenModalEditPerfil={SetOpenModalEditPerfil}
        openModalEditPerfil={openModalEditPerfil}
        setModalExit={setModalExit}
        modalExit={modalExit}
        SetOpenModalEdit={SetOpenModalEdit}
      />}

      {openModalRegister && <ModalRegister
        setOpenModalRegister={setOpenModalRegister}
        openModalRegister={openModalRegister}
      />}

      {openModalEditPerfil && <ModalEdit
        openModalEditPerfil={openModalEditPerfil}
        SetOpenModalEditPerfil={SetOpenModalEditPerfil}
        SetOpenModalEdit={SetOpenModalEdit}
        formUser={formUser}
      />}

    </div>
  );
}
export default Main;
