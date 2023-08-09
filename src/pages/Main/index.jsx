import { useEffect } from "react";
import chargePink from "../../assets/Charge-Pink.svg";
import charge from "../../assets/Charge.svg";
import clientePink from "../../assets/Client-Pink.svg";
import client from "../../assets/Client.svg";
import homePink from "../../assets/Home-Pink.svg";
import home from "../../assets/Home.svg";
import setBottom from "../../assets/chevron-down.svg";
import BottomNav from "../../components/BottomNav";
import ChargesListPage from "../../components/Charges/ChargesListPage";
import DeleteCharge from "../../components/Charges/DeleteCharge";
import RegisterChargesModal from "../../components/Charges/RegisterChargesModal";
import ClientDetail from "../../components/Clients/ClientDetail";
import ClientListPage from "../../components/Clients/ClientListPage";
import EditClientModal from "../../components/Clients/EditClientModal";
import RegisterClientModal from "../../components/Clients/RegisterClientModal";
import HomePage from "../../components/Dashboard/HomePage";
import LogoutEditUserModal from "../../components/Dashboard/LogoutEditUserModal";
import EditUserModal from "../../components/Users/EditUserModal";
import SuccessEditUserModal from "../../components/Users/SuccessEditUserModal";
import useCharges from "../../hooks/useCharges";
import "../../global/styleModal.css";
import useUser from "../../hooks/useUser";
import "./style.css";
import EditChargesModal from "../../components/Charges/EditChargesModal";
import { UserCharges } from "../../contexts/UserChargesContext";
import ChargesModal from "../../components/Charges/ChargesModalDetails";

function Main() {
  const {
    openModalCharges,
    openModalEditCharges,
    openModalDelete,
    openModalDetailCharges,
  } = useCharges();
  /* const [modalExit, setModalExit] = useState(false);
  const [imageNavHome, setImageNavHome] = useState(false);
  const [imageNavClient, setImageNavClient] = useState(true);
  const [imageNavCharge, setImageNavCharge] = useState(true);
  const [resumeName, setResumeName] = useState("");
  const [openModalEdit, setOpenModalEdit] = useState(false); */

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
    openModalRegister,
    openModalEditProfile,
    openModalEditProfileSuccess,
    setOpenModalEditProfileSuccess,
    title,
    setTitle,
    nameUser,
    openModalEditClient,
    idClientDetail,
    setIdClientDetail,
    setTitleNameSecond,
    setClientDetailPage,
    titleNameSecond,
    titleNameThird,
    setTitleNameThird,
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

  async function verifyTextHeader(e) {
    if (title === "Clientes") {
      setTitleNameSecond(" "), setTitleNameThird(" ");
      setImageNavClient(false),
        setClientDetailPage(false),
        setIdClientDetail(false);
    }
  }

  useEffect(() => {
    titleAtived();
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

  return (
    <div className="initial mainBody">
      <nav className="initial navegation">
        <div
          className={`initial nav-icons mouse-pointer ${
            !imageNavHome && "atived"
          }`}
          onClick={(event) => {
            setImageNavClient(true),
              setImageNavHome(false),
              setImageNavCharge(true),
              setTitleNameSecond(""),
              setTitleNameThird("");
          }}
        >
          <img
            src={imageNavHome ? home : homePink}
            className="imageNavAnimation"
            alt="Inicio"
          />
        </div>
        <div
          className={`initial nav-icons mouse-pointer ${
            !imageNavClient && "atived"
          }`}
          onClick={(event) => {
            setImageNavClient(false),
              setImageNavHome(true),
              setImageNavCharge(true);
            setTitleNameSecond("");
            setIdClientDetail(false);
            setTitleNameThird("");
          }}
        >
          <img
            src={imageNavClient ? client : clientePink}
            className="imageNavAnimation"
            alt="Cliente"
          />
        </div>
        <div
          className={`initial nav-icons mouse-pointer ${
            !imageNavCharge && "atived"
          }`}
          onClick={(event) => {
            setImageNavClient(true),
              setImageNavHome(true),
              setImageNavCharge(false),
              setTitleNameSecond(""),
              setTitleNameThird("");
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
        {openModalEditClient && <div className="background-modal initial">
          {openModalEditClient && (<EditClientModal />)}
        </div>}
        {openModalRegister && <div className="background-modal initial">
          {openModalRegister && (<RegisterClientModal />)}
        </div>}
        {/* Mudei esse aqui para hook separado de cobrança */}
        {openModalCharges.status && (
          <div className="background-modal initial">
            {openModalCharges.status && <RegisterChargesModal />}
          </div>
        )}
        {/* Mudei esse aqui para hook separado de cobrança */}
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
        {/* Mudei esse aqui para hook separado de cobrança */}
        {openModalDelete.status && (
          <div className="background-modal initial">
            {openModalDelete.status && <DeleteCharge />}
          </div>
        )}
        {/* Mudei esse aqui para hook separado de cobrança */}

        {openModalDetailCharges.status && <div className="background-modal initial">
          {openModalDetailCharges.status && <ChargesModal />}
        </div>}
        <header>
          <div className="text-header-perfil">
            <h2
              onClick={(e) => verifyTextHeader(e)}
              className={`initial ${
                title == "Resumo de Cobranças" ? "resume" : "titleSecond"
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
                src={setBottom}
                alt="seta"
                onClick={() => setModalExit(!modalExit)}
              />
              {modalExit && (
                <LogoutEditUserModal
                  setModalExit={setModalExit}
                  setOpenModalEdit={setOpenModalEdit}
                />
              )}
            </div>
          </div>
        </header>
        <div className={`main ${!imageNavHome ? "dashboard" : "table"}`}>
          {!imageNavClient && !idClientDetail && <ClientListPage />}
          {!imageNavClient && idClientDetail && <ClientDetail />}
          {!imageNavHome && <HomePage />}
          {!imageNavCharge && <ChargesListPage />}
        </div>
      </div>
    </div>
  );
}
export default Main;
