import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/api.jsx";
import clientSFont from "../../../assets/Client(2).svg";
import deleteCharge from "../../../assets/DeleteCharge.svg";
import EditGreen from "../../../assets/Edit-green.svg";
import editCharge from "../../../assets/Edit.svg";
import toastError from "../../../assets/toastError.svg";
import useUser from "../../../hooks/useUser";
import { cepMask, cpfMask, dateDDMMYYYYMask, moneyMask, phoneAndCelMask2 } from "../../../utils/inputMasks";
import { clearAll } from "../../../utils/localStorage";
import "./style.css";

export default function ClientDetail() {
  const {
    setTitle,
    token,
    idListChargesClick,
    setOpenModalEditClient,
    idClientDetail,
    setOpenModalRegisterCharges,
    setIdListChargesClick,
    setTitleNameSecond,
    getInformationClientDetail,
    setModalDelete,
    setTitleNameTerc
  } = useUser();

  const [detailsData, setDetailsData] = useState({});
  const [countOrderDueDate, setcountOrderDueDate] = useState(1);
  const [infoClientCharges, setInfoClientCharges] = useState([]);
  const [countOrderIdCharges, setcountOrderIdCharges] = useState(1);
  const [corarrowTopId, setCorArrowTopId] = useState("#3F3F55");
  const [corarrowBottomId, setCorArrowBottomId] = useState("#3F3F55");
  const [corarrowTopDue, setCorArrowTopDue] = useState("#3F3F55");
  const [corarrowBottomDue, setCorArrowBottomDue] = useState("#3F3F55");
  const space = '  '
  const navigate = useNavigate();

  async function DetailCustomerData() {
    try {

      const response = await api.get(`cliente/${idClientDetail}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setIdListChargesClick(response.data);
      setInfoClientCharges(response.data.billing);

      const fullName =
        response.data.client.length > 0
          ? response.data.client[0].nome_cliente
          : "";
      const partsName = fullName.split(" ");
      const nameClientCapitalized = partsName
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

      const replaceNullWithDefault = (obj, defaultValue = "--") => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value ?? defaultValue,
          ])
        );
      };

      const formattedData = replaceNullWithDefault(response.data.client[0]);

      setDetailsData({
        ...formattedData,
        nome_cliente: nameClientCapitalized,
      });
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
        icon: ({ theme, type }) => <img src={toastError} alt="" />,
      });
    }
  }

  function backgroundSituation() {
    const status = document.querySelectorAll(".status-text");
    status.forEach((element) => {
      if (element.textContent === "Vencida") {
        return element.classList.add("statusDefeated");
      } else if (element.textContent === "Pendente") {
        return element.classList.add("statusPending");
      } else if (element.textContent === "Paga") {
        return element.classList.add("statusPay");
      }
    });
  }

  function orderIdCharges() {
    setcountOrderIdCharges(countOrderIdCharges + 1);
    if (countOrderIdCharges === 1) {
      const orderId = infoClientCharges.slice().sort(function (a, b) {
        return b.id_cobranca - a.id_cobranca;
      });
      setCorArrowTopId("#DA0175");
      setCorArrowBottomId("#3F3F55");
      setInfoClientCharges(orderId);
    }
    if (countOrderIdCharges === 2) {
      ListCharges();
      setCorArrowBottomId("#3F3F55");
      setCorArrowTopId("#3F3F55");
      setcountOrderIdCharges(1);
    }
  }

  function orderDueDate() {
    setcountOrderDueDate(countOrderDueDate + 1);
    if (countOrderDueDate === 1) {
      const orderDue = infoClientCharges.slice().sort(function (a, b) {
        return b.id_cobranca - a.id_cobranca;
      });
      setCorArrowTopDue("#DA0175");
      setCorArrowBottomDue("#3F3F55");
      setInfoClientCharges(orderDue);
    }
    if (countOrderDueDate === 2) {
      ListCharges();
      setCorArrowBottomDue("#3F3F55");
      setCorArrowTopDue("#3F3F55");
      setcountOrderDueDate(1);
    }
  }

  async function informationDeleteChargesClientDetail(event) {
    setModalDelete({
      status: true,
      id_charges: event
    })

    /* try {
      const response = await api.get(`cliente/${idClientDetail}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(idListChargesClick);
      return setIdListChargesClick(response.data);
    } catch (error) {
      console.log(error);
    } */
  }

  useEffect(() => {
    setTitle(`Clientes`);
    setTitleNameSecond(`>`);
    setTitleNameTerc('Detalhes do cliente')
    DetailCustomerData();
  }, []);

  useEffect(() => {
    backgroundSituation();
  }, [infoClientCharges])

  useEffect(() => {
    DetailCustomerData();
  }, [getInformationClientDetail])

  return (
    <>
      <div className="initial header">
        <div className="initial client-header">
          <img src={clientSFont} alt="Client" />
          <h2>{detailsData.nome_cliente}</h2>
        </div>
      </div>
      <div className="tables">
        <div className="table-client-data tableAll">
          <table>
            <thead>
              <tr className="table-first-title">
                <th className="table-title">Dados do Cliente</th>
                <th>
                  <button
                    className="button-edit-client"
                    onClick={() =>
                      setOpenModalEditClient(true)
                    }
                  >
                    <img src={EditGreen} alt="editar cliente" />
                    <h4>Editar Cliente</h4>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="header-table-client subtitle-top">
                <td>
                  <h1>E-mail</h1>
                </td>
                <td>
                  <h1>Telefone</h1>
                </td>
                <td>
                  <h1>CPF</h1>
                </td>
              </tr>
              <tr className="extract-table">
                <td className='detail-text-line-detail-client'>
                  <h1>{detailsData.email}</h1>
                </td>
                <td>
                  <h1>{detailsData.telefone === null || detailsData.telefone === undefined ? '' : phoneAndCelMask2(detailsData.telefone)}</h1>
                </td>
                <td>
                  <h1>{detailsData.cpf === undefined ? '' : cpfMask(detailsData.cpf)}</h1>
                </td>
              </tr>
              <tr className="header-table-client subtitle-bottom">
                <td>
                  <h1>Endereço</h1>
                </td>
                <td>
                  <h1>Bairro</h1>
                </td>
                <td>
                  <h1>Complemento</h1>
                </td>
                <td>
                  <h1>CEP</h1>
                </td>
                <td>
                  <h1>Cidade</h1>
                </td>
                <td className="td-uf">
                  <h1>UF</h1>
                </td>
              </tr>
              <tr className="extract-table">
                <td className='detail-text-line-detail-client'>
                  <h1>{detailsData.endereco}</h1>
                </td>
                <td className='detail-text-line-detail-client'>
                  <h1>{detailsData.bairro}</h1>
                </td>
                <td>
                  <h1>{detailsData.complemento}</h1>
                </td>
                <td>
                  <h1>{detailsData.cep === undefined ? '' : cepMask(detailsData.cep)}</h1>
                </td>
                <td>
                  <h1>{detailsData.cidade}</h1>
                </td>
                <td className="td-uf">
                  <h1>{detailsData.estado}</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-charge-data tableAll ">
          <table>
            <thead>
              <tr className="table-first-title">
                <th className="table-title">Cobranças do Cliente</th>
                <th>
                  <button className="addClient" onClick={() =>
                    setOpenModalRegisterCharges({
                      status: true,
                      id_user: idListChargesClick.client[0].id_cliente,
                      nome_user: idListChargesClick.client[0].nome_cliente,
                    })
                  }
                  >
                    {" "}
                    + Nova cobrança{" "}
                    {/* <h1
                      onClick={() =>
                        setOpenModalRegisterCharges({
                          status: true,
                          id_user: idListChargesClick.client[0].id_cliente,
                          nome_user: idListChargesClick.client[0].nome_cliente,
                        })
                      }
                    >
                      {" "}
                      + Nova cobrança{" "}
                    </h1>{" "} */}
                  </button>{" "}
                </th>
              </tr>
            </thead>
            <thead className="header-table-client">
              <tr>
                <th
                  className="PageOrderID mousePointer"
                  onClick={() => orderIdCharges()}
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
                          stroke={corarrowBottomId}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M12.5 20.25L9.5 23.25L6.5 20.25"
                          stroke={corarrowBottomId}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M15.5 13.5L15.5 0.75"
                          stroke={corarrowTopId}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M12.5 3.75L15.5 0.75L18.5 3.75"
                          stroke={corarrowTopId}
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
                  <h1>ID Cob.</h1>
                </th>
                <th
                  className="PageOrderDate mousePointer"
                  onClick={() => orderDueDate()}
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
                          stroke={corarrowBottomDue}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M12.5 20.25L9.5 23.25L6.5 20.25"
                          stroke={corarrowBottomDue}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M15.5 13.5L15.5 0.75"
                          stroke={corarrowTopDue}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M12.5 3.75L15.5 0.75L18.5 3.75"
                          stroke={corarrowTopDue}
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
                  <h1>Data de venc.</h1>
                </th>
                <th>
                  <h1>Valor</h1>
                </th>
                <th>
                  <h1>Status</h1>
                </th>
                <th className="description-table-header">
                  <h1>Descrição</h1>
                </th>
                <th className="imagem-table-header"></th>{" "}
              </tr>
            </thead>
            <tbody>
              {infoClientCharges.map((charges) => {
                return (
                  <tr className="extract-table" key={charges.id_cobranca}>
                    <td>
                      <h1>{charges.id_cobranca}</h1>
                    </td>
                    <td>
                      <h1>{dateDDMMYYYYMask(charges.vencimento)}</h1>
                    </td>
                    <td>
                      <h1>{moneyMask(charges.valor)}</h1>
                    </td>
                    <td>
                      <div className="div-status-charge">
                        <h1 className="status-text">{charges.status}</h1>
                      </div>
                    </td>
                    <td className="description-table description-table-charge">
                      <h1>{charges.descricao}</h1>
                    </td>
                    <td className="imagem-table-charge">
                      <img src={editCharge} alt="Editar" />
                      <img className='mousePointer' src={deleteCharge} alt="Deletar" onClick={() => informationDeleteChargesClientDetail(charges.id_cobranca)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
