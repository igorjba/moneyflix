import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import useUser from "./useUser";

function useClientUser() {
  const { token } = useUser()
  const [clientRegisters, setClientRegisters] = useState([]);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [idClientDetail, setIdClientDetail] = useState({
    status: false,
    id_client: "",
  });
  const [openModalEditClient, setOpenModalEditClient] = useState(false);

  const [filterNameClient, setFilterNameClient] = useState("");

  const [openNotFoundClient, setOpenNotFoundClient] = useState(true);
  const [arrayFilterClientList, setArrayFilterClientList] = useState([]);

  async function ClientCadaster() {
    try {
      const response = await api.get("cliente", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

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
      toast.error(error.response.data.message, {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={error} alt="" />,
      });
    }
  }

  async function reloadClientList() {
    await ClientCadaster();
    if (filterNameClient) {
      setArrayFilterClientList(
        clientRegisters.filter((client) => client.status === filterNameClient)
      );
    }
  }

  return {
    reloadClientList,
    clientRegisters,
    setClientRegisters,
    openModalRegister,
    setOpenModalRegister,
    idClientDetail,
    setIdClientDetail,
    openModalEditClient,
    setOpenModalEditClient,
    ClientCadaster,
    filterNameClient,
    setFilterNameClient,
    arrayFilterClientList,
    setArrayFilterClientList,
    openNotFoundClient,
    setOpenNotFoundClient
  };
}

export default useClientUser;
