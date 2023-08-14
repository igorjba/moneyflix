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
import FilterData from "../FilterData";
import NotFoundCharges from "../NotFoundCharges";
import "./style.css";

export default function ChargesListPage() {
  const { ListCharges, infoClientCharges, setInfoClientCharges, setModalDelete, setOpenModalEditCharges, setOpenModalDetailCharges,
    openModalDetailCharges, filterName, arrayFilterChargesList, setArrayFilterChargesList } = useCharges();

  const { setTitle, token, imageNavCharge } = useUser();

  const [countOrder, setCountOrder] = useState(1);
  const [countOrderIdCharges, setCountOrderIdCharges] = useState(1);

  const [colorArrowTop, setColorArrowTop] = useState("#3F3F55");
  const [colorArrowBottom, setColorArrowBottom] = useState("#3F3F55");
  const [colorArrowTopId, setColorArrowTopId] = useState("#3F3F55");
  const [colorArrowBottomId, setColorArrowBottomId] = useState("#3F3F55");

  const [searchNameCharges, setSearchNameCharges] = useState("");
  const [checkListClientChargesLength, setCheckListClientChargesLength] = useState(false);

  const [openModalFilterData, setOpenModalFilterData] = useState(false);
  const inputSearch = useRef(null);

  let informationTableVier = filterName ? arrayFilterChargesList : infoClientCharges;


  function informationDeleteCharges(event) {
    setModalDelete({
      status: true,
      id_charges: event,
    });
  }
  function orderName() {
    setCountOrder(countOrder + 1);
    if (countOrder === 1) {
      const order = (filterName ? arrayFilterChargesList : infoClientCharges).slice().sort(function (a, b) {
        let x = a.cliente.toUpperCase();
        let y = b.cliente.toUpperCase();

        return x == y ? 0 : x > y ? 1 : -1;
      });
      setColorArrowTop("#3F3F55");
      setColorArrowBottom("#DA0175");
      filterName ? setArrayFilterChargesList(order) : setInfoClientCharges(order);
    }
    if (countOrder === 2) {
      const order = (filterName ? arrayFilterChargesList : infoClientCharges).slice().sort(function (a, b) {
        let x = a.cliente.toUpperCase();
        let y = b.cliente.toUpperCase();
        return x == y ? 0 : x < y ? 1 : -1;
      });
      setColorArrowBottom("#3F3F55");
      setColorArrowTop("#DA0175");
      filterName ? setArrayFilterChargesList(order) : setInfoClientCharges(order);
    }
    if (countOrder === 3) {
      setColorArrowBottom("#3F3F55");
      setColorArrowTop("#3F3F55");
      setCountOrder(1);
      if (filterName) {
        return setArrayFilterChargesList(infoClientCharges.filter((charges) => charges.status === filterName))
      } else {
        return ListCharges();
      }
    }
  }
  function orderIdCharges() {
    setCountOrderIdCharges(countOrderIdCharges + 1);
    if (countOrderIdCharges === 1) {
      const orderId = (filterName ? arrayFilterChargesList : infoClientCharges).slice().sort(function (a, b) {
        return a.id_cobranca - b.id_cobranca;
      });
      setColorArrowTopId("#3F3F55");
      setColorArrowBottomId("#DA0175");
      filterName ? setArrayFilterChargesList(orderId) : setInfoClientCharges(orderId);
    }
    if (countOrderIdCharges === 2) {
      setColorArrowBottomId("#3F3F55");
      setColorArrowTopId("#3F3F55");
      setCountOrderIdCharges(1);

      if (filterName) {
        return setArrayFilterChargesList(infoClientCharges.filter((charges) => charges.status === filterName))
      } else {
        return ListCharges();
      }
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
  const handleOkCharges = (event) => {
    if (event.key === 'Enter') {
      searchNameChargesList();
    }
  }
  async function searchNameChargesList() {
    const validationFunctionSearch = parseFloat(searchNameCharges);
    const resultValidationFunctionSearch = !isNaN(validationFunctionSearch);
    let searchInformationCharges = {};
    resultValidationFunctionSearch
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
      setSearchNameCharges("");
      await setInfoClientCharges(response.data);
      setCheckListClientChargesLength(false);

      if (filterName) {
        await setArrayFilterChargesList(response.data.filter((charges) => charges.status === filterName))
        if (!(response.data.filter((charges) => charges.status === filterName)).length) {
          setCheckListClientChargesLength(true)
        }
      }
    } catch (error) {
      setCheckListClientChargesLength(true);
      inputSearch.current.value = "";
      setSearchNameCharges("")
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

  useEffect(() => {
    setTitle("Cobranças");
    setCheckListClientChargesLength(false)
  }, [imageNavCharge]);

  useEffect(() => {
    if (filterName) {
      setArrayFilterChargesList(infoClientCharges.filter((charges) => charges.status === filterName))
    } else {
      ListCharges();
    }
  }, [])

  useEffect(() => {
    setArrayFilterChargesList(infoClientCharges.filter((charges) => charges.status === filterName))
  }, [filterName])

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
            <FilterData
              setOpenModalFilterData={setOpenModalFilterData} />
          )}
          <div className="search-container">
            <input
              placeholder="Pesquisa"
              ref={inputSearch}
              type="text"
              name="Filter nome"
              onChange={(e) => setSearchNameCharges(e.target.value)}
              onKeyDown={handleOkCharges}
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
                          stroke={colorArrowBottomId}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M12.5 20.25L9.5 23.25L6.5 20.25"
                          stroke={colorArrowBottomId}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M15.5 13.5L15.5 0.75"
                          stroke={colorArrowTopId}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M12.5 3.75L15.5 0.75L18.5 3.75"
                          stroke={colorArrowTopId}
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
            <tbody className="extract-table">
              {informationTableVier.map((charges) => {
                const statusClass = charges.status === "Vencida" ? "statusDefeated" :
                  charges.status === "Pendente" ? "statusPending" :
                    charges.status === "Paga" ? "statusPay" : ""
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
                        <h1 className={`status-text ${statusClass}`}>{charges.status}</h1>
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
