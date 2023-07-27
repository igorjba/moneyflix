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
// <<<<<<< feature/devChai
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
// =======
// import { toast } from "react-toastify";
// import { getItem } from "../../utils/storage";

// export default function PageHome() {
//   const [totalChargesData, setTotalChargesData] = useState({
//     Pagas: "-",
//     Vencidas: "-",
//     Pendentes: "-",
//   });
//   const [expiredChargesData, setExpiredChargesData] = useState({});
//   const [paidChargesData, setPaidChargesData] = useState({});
//   const [pendingChargesData, setPendingChargesData] = useState({});
//   const [overdueClientData, setOverdueClientData] = useState({});
//   const [inDayClientData, setInDayClientData] = useState({});

//   const token = getItem("token").split(" ")[1];

//   async function showDataTotalChages() {
//     try {
//       const response = await api.get("cobranca/total", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });

//       const valueInReal = {
//         Pagas: response.data.Pagas / 100,
//         Vencidas: response.data.Vencidas / 100,
//         Pendentes: response.data.Pendentes / 100,
//       };

//       setTotalChargesData(valueInReal);
//     } catch (error) {
//       toast.error("Falha ao carregar Valores Totais");
// >>>>>>> hml
    }
  }
  async function showDataExpiredCharges() {
    try {
// <<<<<<< feature/devChai
      const response = await api.get("/cobranca/vencidas", {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setExpiredChargesData(response.data.chargeOverdue);
      setTotalExpiredChargesData(response.data.total)
    } catch (error) {
      errorValue += 1
// =======
//       const response = await api.get("cobranca/vencidas", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });

//       setExpiredChargesData(response.data);
//     } catch (error) {
//       toast.error("Falha ao carregar Cobranças Vencidas");
// >>>>>>> hml
    }
  }
  async function showDataPaidCharges() {
    try {
// <<<<<<< feature/devChai
      const response = await api.get("/cobranca/pagas", {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setPaidChargesData(response.data.chargePaid)
      setTotalPaidChargesData(response.data.total)
    } catch (error) {
      errorValue += 1
// =======
//       const response = await api.get("cobranca/pagas", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });

//       setPaidChargesData(response.data);
//     } catch (error) {
//       toast.error("Falha ao carregar Cobranças Pagas");
// >>>>>>> hml
    }
  }
  async function showDataPendingCharges() {
    try {
// <<<<<<< feature/devChai
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
// =======
//       const response = await api.get("cobranca/pendentes", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });

//       setPendingChargesData(response.data);
//     } catch (error) {
//       toast.error("Falha ao carregar Cobranças Pendentes");
//     }
//   }

//   async function showDataOverdueClient() {
//     try {
//       const response = await api.get("cobranca/inadimplentes", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });

//       setOverdueClientData(response.data);
//     } catch (error) {
//       toast.error("Falha ao carregar Clientes Inadimplentes");
//     }
//   }

//   async function showDataInDayClient() {
//     try {
//       const response = await api.get("cobranca/emdia", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });

//       setInDayClientData(response.data);
//     } catch (error) {
//       toast.error("Falha ao carregar Clientes em Dia");
//     }
//   }

//   useEffect(() => {
//     showDataTotalChages();
//     showDataExpiredCharges();
//     showDataPaidCharges();
//     showDataPendingCharges();
//     showDataOverdueClient();
//     showDataInDayClient();
//   }, []);

// >>>>>>> hml
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
          totalClient={totalExpiredChargesData}
          cardL={expiredChargesData}
        />
        <Card
          titleCard="Cobranças Previstas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-yellow)",
            color: "var(--font-clr-yellow-number)",
          }}
//<<<<<<< feature/devChai
          totalClient={totalpendingChargesData}
          cardL={pendingChargesData}
//=======
//           totalClient={pendingChargesData.total}
//           chargeListing={pendingChargesData.chargePending}
//>>>>>>> hml
        />
        <Card
          titleCard="Cobranças Pagas"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
//<<<<<<< feature/devChai
          totalClient={totalPaidChargesData}
          cardL={paidChargesData}
//=======
//           totalClient={paidChargesData.total}
//           chargeListing={paidChargesData.chargePaid}
//>>>>>>> hml
        />
        <Card
          titleCard="Clientes Inadimplentes"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-red)",
            color: "var(--font-clr-red-number)",
          }}
//<<<<<<< feature/devChai
          totalClient={expiredChargesData.total}
          cardL={[]}
//=======
//           totalClient={overdueClientData.total}
//           chargeListing={overdueClientData.clientDefaulters}
//>>>>>>> hml
          iconCard={ClienteOverdue}
        />
        <Card
          titleCard="Clientes em dia"
          backgroundColorTotalClient={{
            backgroundColor: "var(--bg-card-gray)",
            color: "var(--font-clr-blue-number)",
          }}
//<<<<<<< feature/devChai
          totalClient={expiredChargesData.total}
          cardL={[]}
//=======
//           totalClient={inDayClientData.total}
//           chargeListing={inDayClientData.clientInDay}
//>>>>>>> hml
          iconCard={ClienteOK}
        />
      </div>
    </>
  );
}
