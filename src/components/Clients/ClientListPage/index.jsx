import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api/api.jsx";
import clientSFont from "../../../assets/Client(2).svg";
import filter from "../../../assets/Filter.svg";
import lupa from "../../../assets/Lupa.svg";
import defaulter from "../../../assets/defaulter.svg";
import useCharges from "../../../hooks/useCharges.jsx";
import useClient from "../../../hooks/useClient.jsx";
import useUser from "../../../hooks/useUser.jsx";
import {
  completedName,
  cpfMask,
  phoneAndCelMask2,
} from "../../../utils/inputMasks.jsx";
import NotFoundCharges from "../../Charges/NotFoundCharges/index.jsx";
import FilterDataClient from "../FilterDataClient/index.jsx";
import "./style.css";

export default function ClientListPage() {
  const { setTitle, token, imageNavClient, setListClientByStatus } = useUser();
  const { setOpenModalCharges } = useCharges();
  const {
    setOpenModalRegister,
    setClientRegisters,
    clientRegisters,
    setIdClientDetail,
    ClientCadaster,
    filterNameClient,
    arrayFilterClientList,
    setArrayFilterClientList
  } = useClient();

  const [countOrder, setCountOrder] = useState(1);
  const [colorArrowTop, setColorArrowTop] = useState("#3F3F55");
  const [colorArrowBottom, setColorArrowBottom] = useState("#3F3F55");
  const [searchNameClient, setSearchNameClient] = useState("");
  const [openNotFoundClient, setOpenNotFoundClient] = useState(true);
  const [openModalFilterDataClient, setOpenModalFilterDataClient] = useState(false);
  const inputSearch = useRef(null);

  /* const [arrayFilterClientList, setArrayFilterClientList] = useState([]) */
  let informationTableViewClient = filterNameClient ? arrayFilterClientList : clientRegisters


  function orderName() {
    setCountOrder(countOrder + 1);
    if (countOrder === 1) {
      const order = (filterNameClient ? arrayFilterClientList : clientRegisters).slice().sort(function (a, b) {
        let x = a.nome_cliente.toUpperCase();
        let y = b.nome_cliente.toUpperCase();
        return x == y ? 0 : x > y ? 1 : -1;
      });
      setColorArrowTop("#3F3F55");
      setColorArrowBottom("#DA0175");
      filterNameClient ? setArrayFilterClientList(order) : setClientRegisters(order);
    }
    if (countOrder === 2) {
      const order = (filterNameClient ? arrayFilterClientList : clientRegisters).slice().sort(function (a, b) {
        let x = a.nome_cliente.toUpperCase();
        let y = b.nome_cliente.toUpperCase();
        return x == y ? 0 : x < y ? 1 : -1;
      });
      setColorArrowBottom("#3F3F55");
      setColorArrowTop("#DA0175");
      filterNameClient ? setArrayFilterClientList(order) : setClientRegisters(order);
    }
    if (countOrder === 3) {
      setColorArrowBottom("#3F3F55");
      setColorArrowTop("#3F3F55");
      setCountOrder(1);
      if(filterNameClient){
        return setArrayFilterClientList(clientRegisters.filter((client) => client.status === filterNameClient))
      }else {
        return ClientCadaster()
      }
    }
  }
  function sendInformationRegisterCharges(event) {
    setOpenModalCharges({
      status: true,
      id_user: event.id_cliente,
      nome_user: event.nome_cliente,
    });
  }
  const handleOk = (event) => {
    if (event.key === 'Enter') {
      searchNameChargesList()
    }
  }
  async function searchNameChargesList() {
    try {
      const response = await api.get("cliente", {
        headers: {
          authorization: `${token}`,
        },
        params: {
          search: searchNameClient,
        },
      });
      inputSearch.current.value = "";
      setSearchNameClient("");
      await setClientRegisters(response.data);
      setOpenNotFoundClient(true);

      if(filterNameClient){
        await setArrayFilterClientList(response.data.filter((client) => client.status === filterNameClient))

        if(!(response.data.filter((client) => client.status === filterNameClient)).length){
          setOpenNotFoundClient(false);
        }
        }
        




    } catch (error) {
      setOpenNotFoundClient(false);
      setSearchNameClient("");
      inputSearch.current.value = "";
    }
    
}


  useEffect(() => {
    setTitle("Clientes");
    setOpenNotFoundClient(true);
    setListClientByStatus("");
  }, [imageNavClient]);

  useEffect(() => {
    if (!openModalFilterDataClient) {
      ClientCadaster();
    }
  }, [openModalFilterDataClient]);

  useEffect(() => {
    setArrayFilterClientList(clientRegisters.filter((client) => client.status === filterNameClient))
  }, [filterNameClient])

  useEffect(() => {
    if(filterNameClient){
      setArrayFilterClientList(clientRegisters.filter((client) => client.status === filterNameClient))
    }else {
      ClientCadaster();
    } 
  }, [])

/*   useEffect(() => {
    setArrayFilterClientList(clientRegisters.filter((client) => client.status === filterNameClient))
  }, [!setOpenModalRegister]) */


  return (
    <>
      <div className="initial header">
        <div className="initial client-header">
          <img src={clientSFont} alt="Client" />
          <h2>Clientes</h2>
        </div>
        <div className="initial search-filter-client">
          <button className="addClient" onClick={() => setOpenModalRegister(true)}> + Adicionar Cliente </button>
          <button className="button-filter">
            <img
              src={filter}
              alt="Filtrar"
              onClick={() => setOpenModalFilterDataClient(true)}
            />
          </button>
          {openModalFilterDataClient && (
            <FilterDataClient
              setOpenModalFilterDataClient={setOpenModalFilterDataClient}
            />
          )}
          <div className="search-container">
            <input
              placeholder="Pesquisa"
              ref={inputSearch}
              type="text"
              name="Filter nome"
              onChange={(e) => setSearchNameClient(e.target.value)}
              onKeyDown={handleOk}
            />
            <img
              src={lupa}
              alt="Lupa"
              className="search"
              onClick={(event) => searchNameChargesList(event)}
            />
          </div>
        </div>
      </div>
      {!openNotFoundClient && <NotFoundCharges />}
      {openNotFoundClient && (
        <div className="tableAll">
          <table>
            <thead className="header-table-client">
              <tr>
                <th
                  className="ClientOrder mouse-pointer"
                  onClick={() => orderName()}
                >
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Frame" clipPath="url(#clip0_84440_3278)">
                      <g id="Group">
                        <path
                          id="Vector"
                          d="M9.5 10.5L9.5 23.25"
                          stroke={colorArrowBottom}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M12.5 20.25L9.5 23.25L6.5 20.25"
                          stroke={colorArrowBottom}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M15.5 13.5L15.5 0.75"
                          stroke={colorArrowTop}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M12.5 3.75L15.5 0.75L18.5 3.75"
                          stroke={colorArrowTop}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_84440_3278">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(24.5) rotate(90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <h1>Cliente</h1>
                </th>
                <th>
                  <h1>CPF</h1>
                </th>
                <th>
                  <h1>E-mail</h1>
                </th>
                <th>
                  <h1>Telefone</h1>
                </th>
                <th>
                  <h1>Status</h1>
                </th>
                <th>
                  <h1>Criar Cobrança</h1>
                </th>
              </tr>
            </thead>
            <tbody className="extract-table">
              {informationTableViewClient.map((client) => {
                const statusClassClient = client.status === "Inadimplente" ? "situationDefaulter" :
                client.status === "Em dia" ? "situationOk" : ""
                return (
                  <tr key={client.id_cliente}>
                    <td className="view-detail-mouse-over-effect">
                      <h1
                        className="mouse-pointer nameSelectDetail"
                        onClick={() => setIdClientDetail({ status: true, id_client: client.id_cliente })}>
                        {client.nome_cliente && completedName(client.nome_cliente)}</h1>
                    </td>
                    <td>
                      <h1>{cpfMask(client.cpf)}</h1>
                    </td>
                    <td>
                      <h1>{client.email}</h1>
                    </td>
                    <td>
                      <h1>{phoneAndCelMask2(client.telefone)}</h1>
                    </td>
                    <td>
                      <div className="div-status">
                        <h1 className={`situation ${statusClassClient} `}>{client.status}</h1>
                      </div>
                    </td>
                    <td>
                      <img
                        className="mouse-pointer image-Charges-Modal"
                        src={defaulter}
                        alt="cobrança"
                        onClick={() => sendInformationRegisterCharges(client)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
