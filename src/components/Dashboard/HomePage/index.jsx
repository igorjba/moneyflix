import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/api.jsx";
import ClienteOK from "../../../assets/ClienteOK.svg";
import ClienteOverdue from "../../../assets/ClienteOverdue.svg";
import Expired from "../../../assets/Expired.svg";
import Paid from "../../../assets/Paid.svg";
import Pending from "../../../assets/Pending.svg";
import toastError from "../../../assets/toastError.svg";
import useUser from "../../../hooks/useUser.jsx";
import { moneyMask } from "../../../utils/inputMasks.jsx";
import SummaryCardsList from "../../Dashboard/SummaryCardsList";
import SummaryValueCards from "../../Dashboard/SummaryValueCards";
import "./style.css";
import useCharges from "../../../hooks/useCharges.jsx";

export default function HomePage() {
  const {
    setTitle,
    token,
    setTitleNameSecond,
    setTitleNameThird,
    setImageNavClient,
    setImageNavHome,
    setImageNavCharge,
  } = useUser();
  const { setListClientByStatus } = useCharges();
  const [data, setData] = useState({});
  const [errorValue, setErrorValue] = useState(0);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const response = await api.get("/usuario/painel", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setData(response.data);
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
      toast.error("Falha ao carregar valores", {
        errorValue: 1,
      });
    }
  }

  function onClickNavLeft(event) {
    const divs = document.querySelectorAll("div");
    divs.forEach((element) => {
      element.classList.remove("atived");
    });
    event.currentTarget.classList.add("atived");
  }

  useEffect(() => {
    fetchData();
    setTitle("Resumo de Cobranças");
  }, []);

  return (
    <>
      <div className="contentResume initial">
        <SummaryValueCards
          IconCard={Paid}
          BackgroundColor="#eef6f6"
          TitleCard="Cobranças Pagas"
          ValueCard={
            data.totalValorPagas?.[0]?.sum === "" ||
            data.totalValorPagas?.[0]?.sum === undefined
              ? ""
              : moneyMask(data.totalValorPagas?.[0]?.sum)
          }
        />
        <SummaryValueCards
          IconCard={Expired}
          BackgroundColor="#ffefef"
          TitleCard="Cobranças Vencidas"
          ValueCard={
            data.totalValorVencidas?.[0]?.sum === "" ||
            data.totalValorVencidas?.[0]?.sum === undefined
              ? ""
              : moneyMask(data.totalValorVencidas?.[0]?.sum)
          }
        />
        <SummaryValueCards
          IconCard={Pending}
          BackgroundColor="#fcf6dc"
          TitleCard="Cobranças Previstas"
          ValueCard={
            data.totalValorPendentes?.[0]?.sum === "" ||
            data.totalValorPendentes?.[0]?.sum === undefined
              ? ""
              : moneyMask(data.totalValorPendentes?.[0]?.sum)
          }
        />
      </div>
      <div className="contentCards">
        <SummaryCardsList
          titleCard="Cobranças Vencidas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-red)",
            color: "var(--font-clr-red-number)",
          }}
          totalClient={data.qtdRegistroVencidas?.[0]?.count}
          cardL={data.Vencidas}
          seeAll={(event) => {
            setListClientByStatus("Vencida"),
              setImageNavClient(true),
              setImageNavHome(true),
              setImageNavCharge(false),
              setTitleNameSecond(""),
              setTitleNameThird("");
          }}
        />
        <SummaryCardsList
          titleCard="Cobranças Previstas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-yellow)",
            color: "var(--font-clr-yellow-number)",
          }}
          totalClient={data.qtdRegistroPendentes?.[0]?.count}
          cardL={data.Pendentes}
          seeAll={(event) => {
            setListClientByStatus("Pendente"),
              setImageNavClient(true),
              setImageNavHome(true),
              setImageNavCharge(false),
              setTitleNameSecond(""),
              setTitleNameThird("");
          }}
        />
        <SummaryCardsList
          titleCard="Cobranças Pagas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={data.qtdRegistroPagas?.[0]?.count}
          cardL={data.Pagas}
          seeAll={(event) => {
            setListClientByStatus("Paga"),
              setImageNavClient(true),
              setImageNavHome(true),
              setImageNavCharge(false),
              setTitleNameSecond(""),
              setTitleNameThird("");
          }}
        />
        <SummaryCardsList
          titleCard="Clientes Inadimplentes"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-red)",
            color: "var(--font-clr-red-number)",
          }}
          totalClient={data.totalInadimplentes?.total}
          cardL={data.totalInadimplentes?.clientDefaulters}
          iconCard={ClienteOverdue}
          isClientData={true}
          isLastCard={true}
          seeAll={(event) => {
            setListClientByStatus("Inadimplente"),
              setImageNavClient(false),
              setImageNavHome(true),
              setImageNavCharge(true),
              setTitleNameSecond(""),
              setTitleNameThird("");
          }}
        />
        <SummaryCardsList
          titleCard="Clientes em dia"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={data.totalEmdias?.total}
          cardL={data.totalEmdias?.clientInDay}
          iconCard={ClienteOK}
          isClientData={true}
          isLastCard={true}
          seeAll={(event) => {
            setListClientByStatus("Em dia"),
              setImageNavClient(false),
              setImageNavHome(true),
              setImageNavCharge(true),
              setTitleNameSecond(""),
              setTitleNameThird("");
          }}
        />
      </div>
    </>
  );
}
