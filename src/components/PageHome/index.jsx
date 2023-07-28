import ClienteOK from "../../assets/ClienteOK.svg";
import ClienteOverdue from "../../assets/ClienteOverdue.svg";
import Expired from "../../assets/Expired.svg";
import Paid from "../../assets/Paid.svg";
import Pending from "../../assets/Pending.svg";
import Card from "../Card/index";
import CardResume from "../CardResume/index";
import "./style.css";
import api from "../../api/api.jsx";
import { useState, useEffect } from "react";
import { getItem } from '../../utils/storage'
import toastError from '../../assets/toastError.svg';
import { toast } from 'react-toastify';

export default function PageHome() {
  const token = getItem('token');
  const [data, setData] = useState({});

  async function fetchData() {
    try {
      const response = await api.get("/usuario/painel", {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setData(response.data);
    } catch (error) {
      toast.error('Falha ao carregar valores', {
        className: 'customToastify-error',
        icon: ({ theme, type }) => <img src={toastError} alt="" />
      })
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="contentResume initial">
        <CardResume
          IconCard={Paid}
          BackgroundColor="#eef6f6"
          TitleCard="Cobranças Pagas"
          ValueCard={data.totalValorPagas?.[0]?.sum}
        />
        <CardResume
          IconCard={Expired}
          BackgroundColor="#ffefef"
          TitleCard="Cobranças Vencidas"
          ValueCard={data.totalValorVencidas?.[0]?.sum}
        />
        <CardResume
          IconCard={Pending}
          BackgroundColor="#fcf6dc"
          TitleCard="Cobranças Previstas"
          ValueCard={data.totalValorPendentes?.[0]?.sum}
        />
      </div>
      <div className="contentCards">
        <Card
          titleCard="Cobranças Vencidas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-red)",
            color: "var(--font-clr-red-number)",
          }}
          totalClient={data.qtdRegistroVencidas?.[0]?.count}
          cardL={data.Vencidas}
        />
        <Card
          titleCard="Cobranças Previstas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-yellow)",
            color: "var(--font-clr-yellow-number)",
          }}
          totalClient={data.qtdRegistroPendentes?.[0]?.count}
          cardL={data.Pendentes}
        />
        <Card
          titleCard="Cobranças Pagas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={data.qtdRegistroPagas?.[0]?.count}
          cardL={data.Pagas}
        />
        <Card
          titleCard="Clientes Inadimplentes"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-red)",
            color: "var(--font-clr-red-number)",
          }}
          totalClient={data.totalInadimplentes?.total}
          cardL={data.totalInadimplentes?.clientDefaulters}
          iconCard={ClienteOverdue}
          isClientData={true}
        />
        <Card
          titleCard="Clientes em dia"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={data.totalEmdias?.total}
          cardL={data.totalEmdias?.clientInDay}
          iconCard={ClienteOK}
          isClientData={true}
        />
      </div>
    </>
  );
}