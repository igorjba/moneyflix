import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import useUser from "./useUser";

function useClientUser(){
    const {token, listClientByStatus} = useUser()
    const [clientRegisters, setClientRegisters] = useState([]);
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [idClientDetail, setIdClientDetail] = useState({
      status: false,
      id_client: ''
    });
    const [openModalEditClient, setOpenModalEditClient] = useState(false)
  function filterStatus(data, condition) {
    return data.filter((client) => client.status === condition);
  }

  async function ClientCadaster() {
    try {
      const response = await api.get("cliente", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (listClientByStatus) {
        return setClientRegisters(
          filterStatus(response.data, listClientByStatus)
        );
      }
      setClientRegisters(response.data);
    } catch (error) {
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
      console.log(error);
      toast.error(error.response.data.message, {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={error} alt="" />,
      });
    }
  }

  return {
    clientRegisters,
    setClientRegisters,
    openModalRegister,
    setOpenModalRegister,
    idClientDetail,
    setIdClientDetail,
    openModalEditClient,
    setOpenModalEditClient,
    ClientCadaster,
  };
}

export default useClientUser;
