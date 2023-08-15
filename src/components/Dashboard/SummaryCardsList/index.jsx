import useCharges from "../../../hooks/useCharges";
import useClientUser from "../../../hooks/useClient";
import useUser from "../../../hooks/useUser";
import { completedName, moneyMask } from "../../../utils/inputMasks";
import "./style.css";

export default function SummaryCardsList({
  iconCard,
  titleCard,
  totalClient,
  cardL,
  backgroundColorTotalClient,
  isClientData,
  isLastCard,
  search,
  navClient,
  navCharge,
}) {
  const {
    ListCharges,
    setFilterName,
    infoClientCharges,
    setOpenModalDetailCharges,
  } = useCharges();
  const {
    setImageNavClient,
    setImageNavHome,
    setImageNavCharge,
    setTitleNameSecond,
    setTitleNameThird,
  } = useUser();
  const {
    setFilterNameClient,
    clientRegisters,
    ClientCadaster,
    setIdClientDetail,
  } = useClientUser();

  function maskCPF(e) {
    const inputNumberCPF = e.replace(/\D/g, "");
    let formattedValue = e;
    if (e.length > 3) {
      formattedValue = `${e.slice(0, 3)}.${e.slice(3)}`;
    }
    if (e.length > 6) {
      formattedValue = `${formattedValue.slice(0, 7)}.${formattedValue.slice(
        7
      )}`;
    }
    if (inputNumberCPF.length > 9) {
      formattedValue = `${formattedValue.slice(0, 11)}-${formattedValue.slice(
        11,
        13
      )}`;
    }
    return formattedValue;
  }

  async function filterActiveInformationHome() {
    if (infoClientCharges.length) {
      return (
        setFilterName(search),
        setImageNavClient(navClient),
        setImageNavHome(true),
        setImageNavCharge(navCharge),
        setTitleNameSecond(""),
        setTitleNameThird("")
      );
    }

    await ListCharges();
    setFilterName(search);

    setImageNavClient(navClient);
    setImageNavHome(true);
    setImageNavCharge(navCharge);
    setTitleNameSecond("");
    setTitleNameThird("");
  }

  async function filterActiveInformationHomeClient() {
    if (clientRegisters.length) {
      return (
        setFilterNameClient(search),
        setImageNavClient(navClient),
        setImageNavHome(true),
        setImageNavCharge(navCharge),
        setTitleNameSecond(""),
        setTitleNameThird("")
      );
    }

    await ClientCadaster();
    setFilterNameClient(search);

    setImageNavClient(navClient),
      setImageNavHome(true),
      setImageNavCharge(navCharge),
      setTitleNameSecond(""),
      setTitleNameThird("");
  }

  function modalDetailDashbordCharges(client) {
    if (!isClientData) {
      setOpenModalDetailCharges({
        status: true,
        informationDetail: { charges: client },
      });
    } else {
      setIdClientDetail({
        status: true,
        id_client: client.id_cliente,
      });
      setImageNavClient(navClient);
      setImageNavHome(true);
      setImageNavCharge(navCharge);
      setTitleNameSecond("");
      setTitleNameThird("");
    }
  }

  return (
    <div className={`card ${isLastCard ? "last-card" : "initial-card"}`}>
      <div className="headerCard initial">
        <div className="initial">
          <div
            className="iconCard"
            style={{ backgroundImage: `url(${iconCard})` }}
          ></div>
          <h3 className="title-card">{titleCard}</h3>
        </div>
        <div
          className="numberClient initial"
          style={backgroundColorTotalClient}
        >
          {totalClient}
        </div>
      </div>
      <div className="table-container">
        <table className="table-main-card">
          <thead className="titlesTable">
            <tr>
              <th>Clientes</th>
              <th className="class-id-max">
                {isClientData ? "ID do Cliente" : "ID da cob."}
              </th>
              <th>{isClientData ? "CPF" : "Valor"}</th>
            </tr>
          </thead>
          {
            <tbody>
              {cardL &&
                cardL.map((client) => {
                  return (
                    <tr
                      key={client.id_cobranca || client.id_cliente}
                      onClick={() => modalDetailDashbordCharges(client)}
                      className="mouse-pointer extract-table-dashbord"
                    >
                      <td>
                        {client.cliente || completedName(client.nome_cliente)}
                      </td>
                      <td>
                        {isClientData
                          ? client.id_cliente
                          : client.id_cobranca || "-"}
                      </td>
                      <td>
                        {isClientData
                          ? maskCPF(client.cpf)
                          : moneyMask(client.valor || "-")}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          }
        </table>
      </div>
      <div className="footerTable initial">
        <span
          onClick={
            isLastCard
              ? filterActiveInformationHomeClient
              : filterActiveInformationHome
          }
        >
          Ver todos
        </span>
      </div>
    </div>
  );
}
