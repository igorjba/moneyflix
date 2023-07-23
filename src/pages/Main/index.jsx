import "./style.css";
import home from "../../assets/Home.svg";
import client from "../../assets/Client.svg";
import charge from "../../assets/Charge.svg";
import setbottom from "../../assets/chevron-down.svg";
import ModalSet from "../../components/ModalSet";
import Card from "../../components/Card";
import CardResume from "../../components/CardResume";
import Expired from "../../assets/Expired.svg";
import Paid from "../../assets/Paid.svg";
import Pending from "../../assets/Pending.svg";
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
            <CardResume IconCard={Paid} backgroundColor="#eef6f6" />
            <CardResume IconCard={Expired} backgroundColor="#ffefef" />
            <CardResume IconCard={Pending} backgroundColor="#fcf6dc" />
          </div>
          <div className="contentCads">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
