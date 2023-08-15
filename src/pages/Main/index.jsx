import { useEffect, useState } from "react";
import chargePink from "../../assets/Charge-Pink.svg";
import charge from "../../assets/Charge.svg";
import clientePink from "../../assets/Client-Pink.svg";
import client from "../../assets/Client.svg";
import homePink from "../../assets/Home-Pink.svg";
import home from "../../assets/Home.svg";
import setBottom from "../../assets/chevron-down.svg";
import BottomNav from "../../components/BottomNav";
import ChargesListPage from "../../components/Charges/ChargesListPage";
import ChargesModal from "../../components/Charges/ChargesModalDetails";
import DeleteCharge from "../../components/Charges/DeleteCharge";
import EditChargesModal from "../../components/Charges/EditChargesModal";
import RegisterChargesModal from "../../components/Charges/RegisterChargesModal";
import ClientDetail from "../../components/Clients/ClientDetail";
import ClientListPage from "../../components/Clients/ClientListPage";
import EditClientModal from "../../components/Clients/EditClientModal";
import RegisterClientModal from "../../components/Clients/RegisterClientModal";
import HomePage from "../../components/Dashboard/HomePage";
import LogoutEditUserModal from "../../components/Dashboard/LogoutEditUserModal";
import EditUserModal from "../../components/Users/EditUserModal";
import SuccessEditUserModal from "../../components/Users/SuccessEditUserModal";
import "../../global/styleModal.css";
import useCharges from "../../hooks/useCharges";
import useClient from "../../hooks/useClient";
import useUser from "../../hooks/useUser";
import "./style.css";
import EditLogoutMobileModal from "../../components/EditLogoutMobileModal";

function Main() {
  const [maxWidthTextHeader, setMaxWidthTextHeader] = useState('113.8rem');
  const { openModalRegister, openModalEditClient, idClientDetail, setIdClientDetail, setFilterNameClient, ClientCadaster, setOpenNotFoundClient } = useClient()
  const {
    openModalCharges,
    openModalEditCharges,
    openModalDelete,
    openModalDetailCharges,
    setFilterName,
    ListCharges,
    setCheckListClientChargesLength
  } = useCharges();

  const {
    modalExit,
    setModalExit,
    imageNavHome,
    setImageNavHome,
    imageNavClient,
    setImageNavClient,
    imageNavCharge,
    setImageNavCharge,
    openModalEdit,
    setOpenModalEdit,
    resumeName,
    setResumeName,
    openModalEditProfile,
    openModalEditProfileSuccess,
    setOpenModalEditProfileSuccess,
    title,
    setTitle,
    nameUser,
    setTitleNameSecond,
    setClientDetailPage,
    titleNameSecond,
    titleNameThird,
    setTitleNameThird,
    openEditLogoutMobileModal,
  } = useUser();

  function toTitleCase(name) {
    return name == null
      ? ""
      : name.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }

  async function fetchUserPerfil() {
    const userNameWords = nameUser.split(" ");
    if (userNameWords.length === 1) {
      return setResumeName(userNameWords[0].charAt(0).toUpperCase());
    } else {
      const lastWord = userNameWords[userNameWords.length - 1];
      return setResumeName(
        userNameWords[0].charAt(0).toUpperCase() +
        lastWord.charAt(0).toUpperCase()
      );
    }
  }

  function titleActive() {
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

  async function verifyTextHeader(e) {
    if (title === "Clientes") {
      setTitleNameSecond(" "), setTitleNameThird(" ");
      setImageNavClient(false),
        setClientDetailPage(false),
        setIdClientDetail({ ...idClientDetail, status: false });
    }
  }

  useEffect(() => {
    titleActive();
  }, []);

  useEffect(() => {
    fetchUserPerfil();
  }, [nameUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalExit &&
        !document.getElementById("modalExit").contains(event.target)
      ) {
        setModalExit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalExit]);

  useEffect(() => {
    if (!imageNavHome) {
      setMaxWidthTextHeader('113.8rem');
    } else if (!imageNavCharge || (!imageNavClient && !idClientDetail.status) || (!imageNavClient && idClientDetail.status)) {
      setMaxWidthTextHeader('223.4rem');
    }
  }, [imageNavHome, imageNavCharge, imageNavClient, idClientDetail]);

  return (
    <div className="initial mainBody">
      <nav className="initial navegation">
        <div
          className={`initial nav-icons mouse-pointer ${!imageNavHome && "active"
            }`}
          onClick={() => {
            setImageNavClient(true),
              setImageNavHome(false),
              setImageNavCharge(true),
              setTitleNameSecond(""),
              setTitleNameThird("");
            setFilterNameClient("")
            setFilterName("")
            setIdClientDetail({ ...idClientDetail, status: false });
          }}
        >
          <img
            src={imageNavHome ? home : homePink}
            className="imageNavAnimation"
            alt="Inicio"
          />
        </div>
        <div
          className={`initial nav-icons mouse-pointer ${!imageNavClient && "active"
            }`}
          onClick={(event) => {
            setImageNavClient(false),
              setImageNavHome(true),
              setImageNavCharge(true);
            setTitleNameSecond("");
            setIdClientDetail({ ...idClientDetail, status: false });
            setTitleNameThird("");
            setFilterNameClient("")
            ClientCadaster()
            setOpenNotFoundClient(true)
          }}
        >
          <img
            src={imageNavClient ? client : clientePink}
            className="imageNavAnimation"
            alt="Cliente"
          />
        </div>
        <div
          className={`initial nav-icons mouse-pointer ${!imageNavCharge && "active"
            }`}
          onClick={(event) => {
            setImageNavClient(true),
              setImageNavHome(true),
              setImageNavCharge(false),
              setTitleNameSecond(""),
              setTitleNameThird(""),
              setFilterName(""),
              setIdClientDetail({ ...idClientDetail, status: false }),
              ListCharges(),
              setCheckListClientChargesLength(false);
          }}
        >
          <img
            src={imageNavCharge ? charge : chargePink}
            className="imageNavAnimation"
            alt="Cobranças"
          />
        </div>
      </nav>
      <BottomNav
        imageNavHome={imageNavHome}
        imageNavClient={imageNavClient}
        imageNavCharge={imageNavCharge}
        onClick={(type) => {
          if (type === "home") {
            setImageNavClient(true);
            setImageNavHome(false);
            setImageNavCharge(true);
          } else if (type === "client") {
            setImageNavClient(false);
            setImageNavHome(true);
            setImageNavCharge(true);
          } else if (type === "charge") {
            setImageNavClient(true);
            setImageNavHome(true);
            setImageNavCharge(false);
          }
        }}
      />
      <div className="center">
        {openEditLogoutMobileModal && (
          <div className="background-modal initial">
            <EditLogoutMobileModal />
          </div>
        )}
        {openModalEditClient && (
          <div className="background-modal initial">
            {openModalEditClient && <EditClientModal />}
          </div>
        )}
        {openModalRegister && (
          <div className="background-modal initial">
            {openModalRegister && <RegisterClientModal />}
          </div>
        )}
        {openModalCharges.status && (
          <div className="background-modal initial">
            {openModalCharges.status && <RegisterChargesModal />}
          </div>
        )}
        {openModalEditCharges.status && (
          <div className="background-modal initial">
            {openModalEditCharges.status && <EditChargesModal />}
          </div>
        )}
        {openModalEdit && (
          <div className="background-modal initial">
            {openModalEditProfile && (
              <EditUserModal setOpenModalEdit={setOpenModalEdit} />
            )}
          </div>
        )}
        {openModalEditProfileSuccess && (
          <div className="background-modal initial">
            <SuccessEditUserModal
              setOpenModalEditProfileSuccess={setOpenModalEditProfileSuccess}
            />
          </div>
        )}
        {openModalDelete.status && (
          <div className="background-modal initial">
            {openModalDelete.status && <DeleteCharge />}
          </div>
        )}

        {openModalDetailCharges.status && (
          <div className="background-modal initial">
            {openModalDetailCharges.status && <ChargesModal />}
          </div>
        )}
        <header>
          <div className="texts-header-container" style={{ maxWidth: maxWidthTextHeader }}>
            <div className="text-header-perfil">
              <h2
                onClick={(e) => verifyTextHeader(e)}
                className={`initial ${title == "Resumo de Cobranças" ? "resume" : "titleSecond"
                  } ${!imageNavClient && idClientDetail ? "mouse-pointer" : ""}`}
              >
                {title}
              </h2>
              <h3 className="detail-client-set">{titleNameSecond}</h3>
              <h3 className="detail-cliente-title-second">{titleNameThird}</h3>

            </div>
            <div className="initial header-perfil">
              <div className="title circle-perfil">
                <h1>{resumeName}</h1>
              </div>
              <div className="profile initial">
                <h1>{toTitleCase(nameUser)}</h1>
              </div>
              <div className="arrow">
                <img
                  className="mouse-pointer"
                  src={setBottom}
                  alt="seta"
                  onClick={() => setModalExit(!modalExit)}
                />
                {modalExit && (<LogoutEditUserModal />)}
              </div>
            </div>
          </div>
        </header>
        <div className={`main ${!imageNavHome ? "dashboard" : "table"}`}>
          {!imageNavClient && !idClientDetail.status && <ClientListPage />}
          {!imageNavClient && idClientDetail.status && <ClientDetail />}
          {!imageNavHome && <HomePage />}
          {!imageNavCharge && <ChargesListPage />}
        </div>
      </div>
    </div>
  );
}
export default Main;
