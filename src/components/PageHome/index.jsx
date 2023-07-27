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
import { toast } from "react-toastify";
import { getItem } from "../../utils/storage";

export default function PageHome() {
  const [totalChargesData, setTotalChargesData] = useState({
    Pagas: "-",
    Vencidas: "-",
    Pendentes: "-",
  });
  const [expiredChargesData, setExpiredChargesData] = useState({});
  const [paidChargesData, setPaidChargesData] = useState({});
  const [pendingChargesData, setPendingChargesData] = useState({});
  const [overdueClientData, setOverdueClientData] = useState({});
  const [inDayClientData, setInDayClientData] = useState({});

  const token = getItem("token").split(" ")[1];

  async function showDataTotalChages() {
    try {
      const response = await api.get("cobranca/total", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const valueInReal = {
        Pagas: response.data.Pagas / 100,
        Vencidas: response.data.Vencidas / 100,
        Pendentes: response.data.Pendentes / 100,
      };

      setTotalChargesData(valueInReal);
    } catch (error) {
      toast.error("Falha ao carregar Valores Totais");
    }
  }

  async function showDataExpiredCharges() {
    try {
      const response = await api.get("cobranca/vencidas", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setExpiredChargesData(response.data);
    } catch (error) {
      toast.error("Falha ao carregar Cobranças Vencidas");
    }
  }

  async function showDataPaidCharges() {
    try {
      const response = await api.get("cobranca/pagas", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setPaidChargesData(response.data);
    } catch (error) {
      toast.error("Falha ao carregar Cobranças Pagas");
    }
  }

  async function showDataPendingCharges() {
    try {
      const response = await api.get("cobranca/pendentes", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setPendingChargesData(response.data);
    } catch (error) {
      toast.error("Falha ao carregar Cobranças Pendentes");
    }
  }

  async function showDataOverdueClient() {
    try {
      const response = await api.get("cobranca/inadimplentes", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setOverdueClientData(response.data);
    } catch (error) {
      toast.error("Falha ao carregar Clientes Inadimplentes");
    }
  }

  async function showDataInDayClient() {
    try {
      const response = await api.get("cobranca/emdia", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setInDayClientData(response.data);
    } catch (error) {
      toast.error("Falha ao carregar Clientes em Dia");
    }
  }

  useEffect(() => {
    showDataTotalChages();
    showDataExpiredCharges();
    showDataPaidCharges();
    showDataPendingCharges();
    showDataOverdueClient();
    showDataInDayClient();
  }, []);

  return (
    <>
      <div className="contentResume initial">
        <CardResume
          IconCard={Paid}
          BackgroundColor="#eef6f6"
          TitleCard="Cobranças Pagas"
          ValueCard={totalChargesData.Pagas?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        />
        <CardResume
          IconCard={Expired}
          BackgroundColor="#ffefef"
          TitleCard="Cobranças Vencidas"
          ValueCard={totalChargesData.Vencidas?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        />
        <CardResume
          IconCard={Pending}
          BackgroundColor="#fcf6dc"
          TitleCard="Cobranças Previstas"
          ValueCard={totalChargesData.Pendentes?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        />
      </div>

      <div className="contentCards">
        <Card
          titleCard="Cobranças Vencidas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-red)",
            color: "var(--font-clr-red-number)",
          }}
          totalClient={expiredChargesData.total}
          chargeListing={expiredChargesData.chargeOverdue}
        />
        <Card
          titleCard="Cobranças Previstas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-yellow)",
            color: "var(--font-clr-yellow-number)",
          }}
          totalClient={pendingChargesData.total}
          chargeListing={pendingChargesData.chargePending}
        />
        <Card
          titleCard="Cobranças Pagas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={paidChargesData.total}
          chargeListing={paidChargesData.chargePaid}
        />

        <Card
          titleCard="Clientes Inadimplentes"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-red)",
            color: "var(--font-clr-red-number)",
          }}
          totalClient={overdueClientData.total}
          chargeListing={overdueClientData.clientDefaulters}
          iconCard={ClienteOverdue}
        />
        <Card
          titleCard="Clientes em dia"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={inDayClientData.total}
          chargeListing={inDayClientData.clientInDay}
          iconCard={ClienteOK}
        />
      </div>
    </>
  );
}
