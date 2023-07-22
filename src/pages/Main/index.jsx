import "./style.css";
import home from "../../assets/Home.svg";
import client from "../../assets/Client.svg";
import charge from "../../assets/Charge.svg";
import setbottom from "../../assets/chevron-down.svg";
import Expired from "../../assets/Expired.svg";
import Paid from "../../assets/Paid.svg";
import Pending from "../../assets/Pending.svg";
import ModalSet from "../../components/ModalSet";
import { useState } from "react";

function Main() {
  const [modalExit, setModalExit] = useState(false);

  return (
    <div className="initial mainBody">
      <nav className="initial navegation">
        <div className="initial atived">
          <img src={home} alt="Inicio" />
        </div>
        <div>
          <img src={client} alt="Cliente" />
        </div>
        <img src={charge} alt="Cobrança" />
      </nav>

      <div className="center">
        <header>
          <h2 className="initial fontStyleMontserrat1">Resumo das cobranças</h2>

          <div className="headerLeft initial">
            <div className="title">
              <h1 className="fontStyleNunito5">LR</h1>
            </div>
            <div className="profile initial">
              {modalExit && <ModalSet />}
              <h1 className="fontStyleNunito5">Lorena</h1>
              <img
                src={setbottom}
                alt="seta"
                onClick={() => setModalExit(!modalExit)}
              />
            </div>
          </div>
        </header>
        <div className="main">
          <div className="contentResume initial">
            <div className="resumeCharge paidCharge initial">
              <img src={Paid} alt="cobranças pagas" />
              <div className="initial">
                <h3 className="fontStyleMontserrat">Cobraças Pagas</h3>
                <h3 className="fontStyleMontserrat value">R$ 30.000</h3>
              </div>
            </div>
            <div className="resumeCharge expiredCharge initial">
              <img src={Expired} alt="Cobranças Vencidas" />
              <div className="initial">
                <h3 className="fontStyleMontserrat">Cobranças Vencidas</h3>
                <h3 className="fontStyleMontserrat value">R$ 7.000</h3>
              </div>
            </div>
            <div className="resumeCharge pendingCharge initial">
              <img src={Pending} alt="Cobranças Vencidas" />
              <div className="initial">
                <h3 className="fontStyleMontserrat">Cobranças Previstas</h3>
                <h3 className="fontStyleMontserrat value">R$ 10.000</h3>
              </div>
            </div>
          </div>
          <div className="contentCads"></div>
        </div>
      </div>
    </div>
  );
}

export default Main;
