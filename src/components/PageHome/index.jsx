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
  const [expiredChargesData, setExpiredChargesData] = useState([]);
  const [totalExpiredChargesData, setTotalExpiredChargesData] = useState('');
  const [paidChargesData, setPaidChargesData] = useState([]);
  const [totalPaidChargesData, setTotalPaidChargesData] = useState('');
  const [totalChargesData, setTotalChargesData] = useState([]);
  const [pendingChargesData, setPendingChargesData] = useState([]);
  const [totalpendingChargesData, setTotalPendingChargesData] = useState('');
  let errorValue = 0
  async function showDataTotalChages() {
    try {
      const response = await api.get("/cobranca/total", {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setTotalChargesData(response.data);
    } catch (error) {
      errorValue += 1
    }
  }
  async function showDataExpiredCharges() {
    try {
      const response = await api.get("/cobranca/vencidas", {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setExpiredChargesData(response.data.chargeOverdue);
      setTotalExpiredChargesData(response.data.total)
    } catch (error) {
      errorValue += 1
    }
  }
  async function showDataPaidCharges() {
    try {
      const response = await api.get("/cobranca/pagas", {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setPaidChargesData(response.data.chargePaid)
      setTotalPaidChargesData(response.data.total)
    } catch (error) {
      errorValue += 1
    }
  }
  async function showDataPendingCharges() {
    try {
      const response = await api.get("/cobranca/pendentes", {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setPendingChargesData(response.data.chargePending);
      setTotalPendingChargesData(response.data.total)
    } catch (error) {
      errorValue += 1
    }
  }

  function errorAtived() {
    console.log(errorValue)
    if (errorValue > 1) {
      return (toast.error('Falha ao carregar valores', {
        className: 'customToastify-error',
        icon: ({ theme, type }) => <img src={toastError} alt="" />
      }),
        errorValue = 0
      )
    }
  }
  useEffect(() => {
    showDataExpiredCharges()
    showDataPaidCharges()
    showDataTotalChages()
    showDataPendingCharges()
    errorAtived()
  }, [])
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
          totalClient={totalExpiredChargesData}
          cardL={expiredChargesData}
        />
        <Card
          titleCard="Cobranças Previstas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-yellow)",
            color: "var(--font-clr-yellow-number)",
          }}
          totalClient={totalpendingChargesData}
          cardL={pendingChargesData}
        />
        <Card
          titleCard="Cobranças Pagas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={totalPaidChargesData}
          cardL={paidChargesData}
        />
        <Card
          titleCard="Clientes Inadimplentes"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-red)",
            color: "var(--font-clr-red-number)",
          }}
          totalClient={expiredChargesData.total}
          cardL={[]}
          iconCard={ClienteOverdue}
        />
        <Card
          titleCard="Clientes em dia"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
          totalClient={expiredChargesData.total}
          cardL={[]}
          iconCard={ClienteOK}
        />
      </div>
    </>
  );
}
