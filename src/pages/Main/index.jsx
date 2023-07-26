import { useEffect, useState } from "react";
import chargePink from "../../assets/Charge-Pink.svg";
import charge from "../../assets/Charge.svg";
import clientePink from "../../assets/Client-Pink.svg";
import client from "../../assets/Client.svg";
import homePink from "../../assets/Home-Pink.svg";
import home from "../../assets/Home.svg";
import setBottom from "../../assets/chevron-down.svg";
import ModalRegister from "../../components/ModalRegister";
import ModalSet from "../../components/ModalSet";
import PageClient from "../../components/PageClient";
import PageHome from "../../components/PageHome";
import ModalEdit from "../../components/ModalEdit";
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

  function onClickNavLeft(event) {
    const divs = document.querySelectorAll("div");
    divs.forEach((element) => {
      element.classList.remove("atived");
    });
    event.currentTarget.classList.add("atived");
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
  });

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
              <h1>LR</h1>
            </div>
            <div className="profile initial">
              <h1>Lorena</h1>
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
      />}

    </div>
  );
}
export default Main;
