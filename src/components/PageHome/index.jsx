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

export default function PageHome() {
  const [totalChargesData, setTotalChargesData] = useState({});
  const [expiredChargesData, setExpiredChargesData] = useState({});
  const [paidChargesData, setPaidChargesData] = useState({});
  const [pendingChargesData, setPendingChargesData] = useState({});

  async function showDataTotalChages() {
    try {
      const response = await api.get("/cobranca/total", {});

      setTotalChargesData(response.data);
    } catch (error) {
      toast.error("Falha ao carregar valores");
    }
  }

  async function showDataExpiredCharges() {
    try {
      const response = await api.get("/cobranca/vencidas", {});

      setExpiredChargesData(response.data);
    } catch (error) {
      toast.error("Falha ao carregar valores");
    }
  }

  async function showDataPaidCharges() {
    try {
      const response = await api.get("/cobranca/pagas", {});

      setPaidChargesData(response.data);
    } catch (error) {
      toast.error("Falha ao carregar valores");
    }
  }

  async function showDataPendingCharges() {
    try {
      const response = await api.get("/cobranca/pendentes", {});

      setPendingChargesData(response.data);
    } catch (error) {
      toast.error("Falha ao carregar valores");
    }
  }

  /*  useEffect(() => {
     showDataTotalChages();
     showDataExpiredCharges();
     showDataPaidCharges();
     showDataPendingCharges();
   }, []); */

  return (
    <>
      <div className="contentResume initial">
        <CardResume
          IconCard={Paid}
          BackgroundColor="#eef6f6"
          TitleCard="Cobranças Pagas"
          ValueCard={totalChargesData.Pagas}
        />
        <CardResume
          IconCard={Expired}
          BackgroundColor="#ffefef"
          TitleCard="Cobranças Vencidas"
          ValueCard={totalChargesData.Pendentes}
        />
        <CardResume
          IconCard={Pending}
          BackgroundColor="#fcf6dc"
          TitleCard="Cobranças Previstas"
          ValueCard={totalChargesData.Vencidas}
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
          totalClient={expiredChargesData.total}
          chargeListing={pendingChargesData.chargePending}
        />
        <Card
          titleCard="Cobranças Pagas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={expiredChargesData.total}
          chargeListing={paidChargesData.chargePaid}
        />

        <Card
          titleCard="Clientes Inadimplentes"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-red)",
            color: "var(--font-clr-red-number)",
          }}
          totalClient={expiredChargesData.total}
          chargeListing=""
          iconCard={ClienteOverdue}
        />
        <Card
          titleCard="Clientes em dia"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={expiredChargesData.total}
          chargeListing=""
          iconCard={ClienteOK}
        />
      </div>
    </>
  );
}
