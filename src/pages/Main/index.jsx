
import Card from "../../components/Card";
import CardResume from "../../components/CardResume";
import Expired from "../../assets/Expired.svg";
import Paid from "../../assets/Paid.svg";
import Pending from "../../assets/Pending.svg";
import ClienteOK from "../../assets/ClienteOK.svg";
import ClienteOverdue from "../../assets/ClienteOverdue.svg";

import { useEffect, useState } from 'react';
import chargePink from '../../assets/Charge-Pìnk.svg';
import charge from '../../assets/Charge.svg';
import clientePink from '../../assets/Client-Pink.svg';
import client from '../../assets/Client.svg';
import homePink from '../../assets/Home-Pink.svg';
import home from '../../assets/Home.svg';
import setbottom from '../../assets/chevron-down.svg';
import ModalRegister from '../../components/ModalRegister';
import ModalSet from '../../components/ModalSet';
import PageClient from '../../components/PageClient';
import './style.css';

function Main() {
  const [modalExit, setModalExit] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false)
  const [imageNavHome, setimageNavHome] = useState(false)
  const [imageNavClient, setimageNavClient] = useState(true)
  const [imageNavCharge, setimageNavCharge] = useState(true)
  const [title, setTitle] = useState('Resumo de Cobranças')

  function onClickNavLeft(event) {
    const divs = document.querySelectorAll('div')
    divs.forEach(element => {
      element.classList.remove('atived')
    });
    event.currentTarget.classList.add('atived')
  }

  function titleAtived() {
    if (!imageNavHome) {
      setTitle('Resumo de Cobranças')
    }
    if (!imageNavClient) {
      setTitle('Clientes')
    }
    if (!imageNavCharge) {
      setTitle('Cobranças')
    }
  }

  useEffect(() => {
    titleAtived()
  })


  return (

    <>
          <div className='initial mainBody'>
      <nav className='initial navegation' >
        <div className='initial nav-icons atived' onClick={((event) => { onClickNavLeft(event), setimageNavClient(true), setimageNavHome(false), setimageNavCharge(true) })}>
          <img src={imageNavHome ? home : homePink} alt="Inicio" />
        </div>
        <div className='initial nav-icons' onClick={((event) => { onClickNavLeft(event), setimageNavClient(false), setimageNavHome(true), setimageNavCharge(true) })}>
          <img src={imageNavClient ? client : clientePink} alt="Cliente" />
        </div>

// <div className="center">
//         <div className="main">
//           <div className="contentResume initial">

        <div className='initial nav-icons' onClick={((event) => { onClickNavLeft(event), setimageNavClient(true), setimageNavHome(true), setimageNavCharge(false) })}>
          <img src={imageNavCharge ? charge : chargePink} alt="Cliente" />
        </div>
      </nav >
      <div className='center'>
        {openModalRegister && <div className='backgroundModal'></div>}
        <header>
          <h2 className={`initial ${title == 'Resumo de Cobranças' ? '' : 'titleSecond'}`}>
            {title}
          </h2>
          <div className='initial'>
            <div className='title'>
              <h1>LR</h1>
            </div>
            <div className="profile initial">
              {modalExit && <ModalSet />}

              <h1>Lorena</h1>
              <img src={setbottom} alt="seta" onClick={() => setModalExit(!modalExit)} />
            </div>
          </div>
        </header>
        <div className='main'>
          {!imageNavClient && <PageClient
            setOpenModalRegister={setOpenModalRegister}
            openModalRegister={openModalRegister}
            setTitle={setTitle}
          />}
        </div>
      </div>
      
      
      {openModalRegister &&
        <ModalRegister
          setOpenModalRegister={setOpenModalRegister}
          openModalRegister={openModalRegister}
        />}
        
        
       {!imageNavHome && <div className="contentResume initial">

            <CardResume IconCard={Paid} backgroundColor="#eef6f6" />
            <CardResume IconCard={Expired} backgroundColor="#ffefef" />
            <CardResume IconCard={Pending} backgroundColor="#fcf6dc" />
          </div>

          <div className="contentCards">
            <Card />
            <Card />
            <Card />

            <Card iconCard={ClienteOverdue} />
            <Card iconCard={ClienteOK} />
          </div>
        </div>
      </div>
    </>
  );
}



export default Main;
