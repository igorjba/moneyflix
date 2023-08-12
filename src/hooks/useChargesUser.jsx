import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import toastError from "../assets/toastError.svg";
import { clearAll } from "../utils/localStorage";
import useUser from "./useUser";

function useChargesUser() {
  const { token } = useUser();
  const [openModalEditCharges, setOpenModalEditCharges] = useState({
    status: false,
    id_charges: "",
    nome_user: "",
    description: "",
    date: "",
    value: "",
    statusPage: "",
  });
  const [openModalDelete, setModalDelete] = useState({
    status: false,
    id_charges: "",
  });
  const [openModalCharges, setOpenModalCharges] = useState({
    status: false,
    id_user: "",
    nome_user: "",
  });
  const [openModalDetailCharges, setOpenModalDetailCharges] = useState({
    status: false,
    informationDetail: [],
  });

  const [inputTypeChargesDate, setInputTypeChargeDate] = useState("text");
  const [dateValueIso, setDateValueIso] = useState("");
  const [dateValueBr, setDateValueBr] = useState("");
  const [verifyCheckbox, setVerifyCheckbox] = useState(true);
  const [errorDate, setErrorDate] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [verifyDate, setVerifyDate] = useState(0);
  const [infoClientCharges, setInfoClientCharges] = useState([]);
  const navigate = useNavigate();

  /* const { listClientByStatus, setListClientByStatus } = useUser(""); */
  /* let arrayFilter = [] */

  const [filterName, setFilterName] = useState('')




  async function ListCharges() {

    console.log('chamo o get da api');

    try {
      const response = await api.get("cobranca", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      
      setInfoClientCharges(response.data);

    } catch (error) {
      console.log(error);
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "token expirado"
        ) {
          clearAll();
          navigate("/login");
        } else if (
          error.response.status === 400 &&
          error.response.data.message === "Não autorizado"
        ) {
          clearAll();
          navigate("/login");
        }
      }
      toast.error(error.response.data.message, {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={toastError} alt="" />,
      });
    }
  }
  
  function backgroundSituation() {
    const status = document.querySelectorAll(".status-text");
    status.forEach((element) => {
      if (element.textContent === "Vencida") {
        element.classList.remove("statusPending");
        element.classList.remove("statusPay");
        return element.classList.add("statusDefeated");
      } else if (element.textContent === "Pendente") {
        element.classList.remove("statusPay");
        element.classList.remove("statusDefeated");
        return element.classList.add("statusPending");
      } else if (element.textContent === "Paga") {
        element.classList.remove("statusPending");
        element.classList.remove("statusDefeated");
        return element.classList.add("statusPay");
      }
    });
  }

  return {
    openModalEditCharges,
    setOpenModalEditCharges,
    openModalCharges,
    setOpenModalCharges,
    inputTypeChargesDate,
    setInputTypeChargeDate,
    dateValueIso,
    setDateValueIso,
    dateValueBr,
    setDateValueBr,
    verifyCheckbox,
    setVerifyCheckbox,
    errorDate,
    setErrorDate,
    errorDescription,
    setErrorDescription,
    errorValue,
    setErrorValue,
    infoClientCharges,
    setInfoClientCharges,
    ListCharges,
    backgroundSituation,
    setVerifyDate,
    verifyDate,
    openModalDelete,
    setModalDelete,
/*     listClientByStatus,
    setListClientByStatus, */
    openModalDetailCharges,
    setOpenModalDetailCharges,
/*     setInfoChargesFilterHome,
    infoChargesFilterHome, */
    /* arrayFilter, */
    //infoChargesFilter,
    filterName,
    setFilterName,
  };
}

export default useChargesUser;
