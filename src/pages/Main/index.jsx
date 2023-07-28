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
  const [resumeName, setResumeName] = useState('');
  const token = getItem('token');
  const [name, setName] = useState('')
  const [clientRegisters, setClientRegisters] = useState([])
  function onClickNavLeft(event) {
    const divs = document.querySelectorAll("div");
    divs.forEach((element) => {
      element.classList.remove("atived");
    });
    event.currentTarget.classList.add("atived");
  }
  function nickName() {
    if (name.length > name.indexOf(" ")) {
      return setResumeName((name.slice(0, 1).concat(name.slice(((name.indexOf(" ")) + 1), ((name.indexOf(" ")) + 2)))).toUpperCase())
    } else {
      return setResumeName((name.slice(0, 1)).toUpperCase())
    }
  }
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
            <div className='title'>
              <h1>{resumeName}</h1>
            </div>
            <div className="profile initial">
              <h1>{name}</h1>
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
            setClientRegisters={setClientRegisters}
            clientRegisters={clientRegisters}
            setTitle={setTitle}
          />}
          {!imageNavHome && <PageHome
            setTitle={setTitle}
          />}
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
        setClientRegisters={setClientRegisters}
        clientRegisters={clientRegisters}
      />}

      {openModalEditPerfil && <ModalEdit
        openModalEditPerfil={openModalEditPerfil}
        SetOpenModalEditPerfil={SetOpenModalEditPerfil}
        SetOpenModalEdit={SetOpenModalEdit}
      />}

    </div>
  );
}
export default Main;
