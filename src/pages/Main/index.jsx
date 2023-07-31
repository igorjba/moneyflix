import { useEffect, useState } from "react";
import chargePink from "../../assets/Charge-Pink.svg";
import charge from "../../assets/Charge.svg";
import clientePink from "../../assets/Client-Pink.svg";
import client from "../../assets/Client.svg";
import homePink from "../../assets/Home-Pink.svg";
import home from "../../assets/Home.svg";
import setBottom from "../../assets/chevron-down.svg";
import ChargesListPage from "../../components/Charges/ChargesListPage";
import ClientListPage from "../../components/Clients/ClientListPage";
import RegisterClientModal from "../../components/Clients/RegisterClientModal";
import HomePage from "../../components/Dashboard/HomePage";
import LogoutEditUserModal from "../../components/Dashboard/LogoutEditUserModal";
import EditUserModal from "../../components/Users/EditUserModal";
import "../../global/styleModal.css";
import useUser from '../../hooks/useUser';
import "./style.css";

function Main() {
  const [modalExit, setModalExit] = useState(false);
  const [imageNavHome, setimageNavHome] = useState(false);
  const [imageNavClient, setimageNavClient] = useState(true);
  const [imageNavCharge, setimageNavCharge] = useState(true);
  /* const [userName, setUserName] = useState(""); */
  const [resumeName, setResumeName] = useState("");
  const [openModalEdit, SetOpenModalEdit] = useState(false);
  /*   const [userPerfil, setUserPerfil] = useState({}); */
  const { openModalRegister, openModalEditPerfil, title, setTitle, token, nameUser, setNameUser } = useUser();


  function onClickNavLeft(event) {
    const divs = document.querySelectorAll("div");
    divs.forEach((element) => {
      element.classList.remove("atived");
    });
    event.currentTarget.classList.add("atived");
  }

  async function fetchUserPerfil() {
    /* try { */
    /* const response = await api.get("usuario/painel", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }); */
    /* console.log(response.data); */
    /* const userNameWords = response.data.nome_usuario.split(" "); */
    //const userNameWords = nameUser.split(" ");
    const userNameWords = nameUser
    //setNameUser(userNameWords[0].charAt(0).toUpperCase() + userNameWords[0].slice(1)); //deixar assim ou fazer aparecer nome completo ????
    /* let resumeName; */
    if (userNameWords.length === 1) {
      return setResumeName(userNameWords[0].substring(0, 2).toUpperCase());
    } else {
      const lastWord = userNameWords[userNameWords.length - 1];
      return setResumeName(userNameWords[0].charAt(0).toUpperCase() +
        lastWord.charAt(0).toUpperCase());
    }
    /* setUserName(capitalizedUserName); */
    /* setResumeName(resumeName); */
    /* }  *//* catch (error) {
      console.log(error)
      toast.error("Falha ao nome e apelido", {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={toastError} alt="" />,
      }); */
  }
  /* } */

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

  useEffect(() => {
    fetchUserPerfil();
  }, [nameUser])

  return (
    <div className="initial mainBody">
      <nav className="initial navegation">
        <div
          className="initial nav-icons atived"
          onClick={(event) => {
            onClickNavLeft(event),
              setimageNavClient(true),
              setimageNavHome(false),
              setimageNavCharge(true);
          }}
        >
          <img src={imageNavHome ? home : homePink} alt="Inicio" />
        </div>
        <div
          className="initial nav-icons"
          onClick={(event) => {
            onClickNavLeft(event),
              setimageNavClient(false),
              setimageNavHome(true),
              setimageNavCharge(true);
          }}
        >
          <img src={imageNavClient ? client : clientePink} alt="Cliente" />
        </div>
        <div
          className="initial nav-icons"
          onClick={(event) => {
            onClickNavLeft(event),
              setimageNavClient(true),
              setimageNavHome(true),
              setimageNavCharge(false);
          }}
        >
          <img src={imageNavCharge ? charge : chargePink} alt="Cobranças" />
        </div>
      </nav>
      <div className="center">
        {openModalRegister && <div className="backgroundModal"></div>}
        {openModalEdit && <div className="backgroundModal"></div>}
        <header>
          <h2 className={`initial ${title == "Resumo de Cobranças" ? "" : "titleSecond"}`} >
            {title}
          </h2>
          <div className="initial header-perfil">
            <div className="title circle-perfil">
              <h1>{resumeName}</h1>
            </div>
            <div className="profile initial">
              <h1>{nameUser}</h1>
              <img
                src={setBottom}
                alt="seta"
                onClick={() => setModalExit(!modalExit)}
              />
            </div>
          </div>
          {modalExit && (
            <LogoutEditUserModal
              setModalExit={setModalExit}
              SetOpenModalEdit={SetOpenModalEdit}
            />
          )}
        </header>
        <div className="main">
          {!imageNavClient && (<ClientListPage />)}
          {!imageNavHome && <HomePage />}
          {!imageNavCharge && <ChargesListPage />}
        </div>
      </div>
      {openModalRegister && (
        <RegisterClientModal
        />
      )}
      {openModalEditPerfil && (
        <EditUserModal
          SetOpenModalEdit={SetOpenModalEdit}
        />
      )}
    </div>
  );
}
export default Main;
