import { useEffect, useRef, useState } from "react";
import api from "../../../api/api";
import deleteCharge from "../../../assets/DeleteCharge.svg";
import editCharge from "../../../assets/Edit.svg";
import filter from "../../../assets/Filter.svg";
import iconCharge from "../../../assets/IconCharge.svg";
import lupa from "../../../assets/Lupa.svg";
import useCharges from "../../../hooks/useCharges";
import useUser from "../../../hooks/useUser";
import {
  completedName,
  dateDDMMYYYYMask,
  moneyMask,
} from "../../../utils/inputMasks";
import NotFoundCharges from "../NotFoundCharges";
import "./style.css";
import FilterData from "../FilterData";

export default function ChargesListPage() {
  const {
    backgroundSituation,
    ListCharges,
    infoClientCharges,
    setInfoClientCharges,
    setModalDelete,
    setOpenModalEditCharges,
    setOpenModalDetailCharges,
    openModalDetailCharges,
  } = useCharges();
  const { setTitle, token, imageNavClient } = useUser();
  const [countOrder, setCountOrder] = useState(1);
  const [countOrderIdCharges, setcountOrderIdCharges] = useState(1);
  const [corarrowTop, setCorArrowTop] = useState("#3F3F55");
  const [corarrowBottom, setCorArrowBottom] = useState("#3F3F55");
  const [corarrowTopId, setCorArrowTopId] = useState("#3F3F55");
  const [corarrowBottomId, setCorArrowBottomId] = useState("#3F3F55");
  const [searchNameCharges, setSearchNameCharges] = useState("");
  const [checkListClientChargesLength, setCheckListClientChargesLength] =
    useState(false);
  const [openModalFilterData, setOpenModalFilterData] = useState(false);
  const inputSearch = useRef(null);

  function informationDeleteCharges(event) {
    setModalDelete({
      status: true,
      id_charges: event,
    });
  }
  function orderName() {
    setCountOrder(countOrder + 1);
    if (countOrder === 1) {
      const order = infoClientCharges.slice().sort(function (a, b) {
        let x = a.cliente.toUpperCase();
        let y = b.cliente.toUpperCase();

        return x == y ? 0 : x > y ? 1 : -1;
      });
      setCorArrowTop("#3F3F55");
      setCorArrowBottom("#DA0175");
      setInfoClientCharges(order);
    }
    if (countOrder === 2) {
      const order = infoClientCharges.slice().sort(function (a, b) {
        let x = a.cliente.toUpperCase();
        let y = b.cliente.toUpperCase();
        return x == y ? 0 : x < y ? 1 : -1;
      });
      setCorArrowBottom("#3F3F55");
      setCorArrowTop("#DA0175");
      setInfoClientCharges(order);
    }
    if (countOrder === 3) {
      ListCharges();
      setCorArrowBottom("#3F3F55");
      setCorArrowTop("#3F3F55");
      setCountOrder(1);
    }
  }
  function orderIdCharges() {
    setcountOrderIdCharges(countOrderIdCharges + 1);
    if (countOrderIdCharges === 1) {
      const orderId = infoClientCharges.slice().sort(function (a, b) {
        return a.id_cobranca - b.id_cobranca;
      });
      setCorArrowTopId("#3F3F55");
      setCorArrowBottomId("#DA0175");
      setInfoClientCharges(orderId);
    }
    if (countOrderIdCharges === 2) {
      ListCharges();
      setCorArrowBottomId("#3F3F55");
      setCorArrowTopId("#3F3F55");
      setcountOrderIdCharges(1);
    }
  }
  function informationEditCharges(event) {
    setOpenModalEditCharges({
      status: true,
      id_charges: event.id_cobranca,
      nome_user: event.cliente,
      description: event.descricao,
      date: event.vencimento,
      value: event.valor,
      statusPage: event.status,
    });
  }
  async function searchNameChargesList() {
    const validationFunctionSearch = parseFloat(searchNameCharges);
    const resultValidationFunctionSearct = !isNaN(validationFunctionSearch);
    let searchInformationCharges = {};
    resultValidationFunctionSearct
      ? (searchInformationCharges = { id: searchNameCharges })
      : (searchInformationCharges = { cliente: searchNameCharges });
    try {
      const response = await api.get("cobranca", {
        headers: {
          authorization: `${token}`,
        },
        params: {
          ...searchInformationCharges,
        },
      });
      inputSearch.current.value = "";
      setInfoClientCharges(response.data);
      if (response.data.length) {
        return setCheckListClientChargesLength(false);
      } else if (!response.data.length) {
        return setCheckListClientChargesLength(true);
      }
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
  function verifySearchNameChargesList(event) {
    if (inputSearch.current.value === "") {
      ListCharges();
      return setCheckListClientChargesLength(false);
    } else {
      searchNameChargesList(event);
    }
  }

  useEffect(() => {
    setTitle("Cobranças");
  }, [imageNavClient]);

  useEffect(() => {
    if (!openModalFilterData) {
      ListCharges();
      backgroundSituation();
    }
  }, [openModalFilterData]);

  useEffect(() => {
    backgroundSituation();
  }, [infoClientCharges]);
  return (
    <>
      <div className="container-page-charges initial">
        <div className="initial charge-header">
          <img src={iconCharge} alt="Cobrança" />
          <h2>Cobrança</h2>
        </div>
        <div className="initial search-filter-client">
          <button className="button-filter">
            <img
              src={filter}
              alt="Filtrar"
              onClick={() => setOpenModalFilterData(true)}
            />
            </button>
            {openModalFilterData && (
              <FilterData setOpenModalFilterData={setOpenModalFilterData} />
            )}
          <div className="search-container">
            <input
              placeholder="Pesquisa"
              ref={inputSearch}
              type="text"
              name="Filter nome"
              onChange={(e) => setSearchNameCharges(e.target.value)}
            />
            <img
              src={lupa}
              alt="Lupa"
              className="search"
              onClick={(event) => verifySearchNameChargesList(event)}
            />
          </div>
        </div>
      </div>
      {checkListClientChargesLength && <NotFoundCharges />}
      {!checkListClientChargesLength && (
        <div className="tableAll">
          <table>
            <thead className="header-table-client">
              <tr>
                <th
                  className="PageOrderClient mouse-pointer"
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
                          stroke={corarrowBottom}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M12.5 20.25L9.5 23.25L6.5 20.25"
                          stroke={corarrowBottom}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M15.5 13.5L15.5 0.75"
                          stroke={corarrowTop}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M12.5 3.75L15.5 0.75L18.5 3.75"
                          stroke={corarrowTop}
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
                <th
                  className="PageOrderID mouse-pointer"
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
                <th>
                  <h1>Valor</h1>
                </th>
                <th>
                  <h1>Data de venc.</h1>
                </th>
                <th>
                  <h1>Status</h1>
                </th>
                <th className="description-table-header">
                  <h1>Descrição</h1>
                </th>
                <th className="imagem-table-header"></th>
              </tr>
            </thead>
            <tbody>
              {infoClientCharges.map((charges) => {
                return (
                  <tr className="extract-table" key={charges.id_cobranca}>
                    <td
                      className="view-detail-mouse-over-effect"
                      onClick={() =>
                        setOpenModalDetailCharges({
                          ...openModalDetailCharges,
                          status: true,
                          informationDetail: { charges },
                        })
                      }
                    >
                      <h1 className="mouse-pointer nameSelectDetail">
                        {completedName(charges.cliente) === undefined
                          ? ""
                          : completedName(charges.cliente)}
                      </h1>
                    </td>
                    <td>
                      <h1>{charges.id_cobranca}</h1>
                    </td>
                    <td>
                      <h1 className="number-table">
                        {moneyMask(charges.valor)}
                      </h1>
                    </td>
                    <td>
                      <h1>{dateDDMMYYYYMask(charges.vencimento)}</h1>
                    </td>
                    <td>
                      <div className="div-status-charge">
                        <h1 className="status-text">{charges.status}</h1>
                      </div>
                    </td>
                    <td className="description-table-charge">
                      <h1>{charges.descricao}</h1>
                    </td>
                    <td className="imagem-table-charge">
                      <img
                        className="mouse-pointer transform-image-charges"
                        src={editCharge}
                        alt="Editar"
                        onClick={() => informationEditCharges(charges)}
                      />
                      <img
                        className="mouse-pointer transform-image-charges"
                        src={deleteCharge}
                        alt="Deletar"
                        onClick={() =>
                          informationDeleteCharges(charges.id_cobranca)
                        }
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
