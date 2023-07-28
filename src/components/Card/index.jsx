import "./style.css";

export default function Card({
  iconCard,
  titleCard,
  totalClient,
  cardL,
  backgroundColorTotalClient,
  isClientData = false,
}) {

  return (
    <div className="card">
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
      <table className="table-main-card">
        <thead className="titlesTable">
          <tr>
            <th>Clientes</th>
            <th>{isClientData ? "ID do Cliente" : "ID da cob."}</th>
            <th>{isClientData ? "CPF" : "Valor"}</th>
          </tr>
        </thead>
        {<tbody>
          {cardL && cardL.map((client) => {
            return (
              <tr key={client.id_cobranca || client.id_cliente}>
                <td>{client.cliente || client.id_cliente}</td>
                <td>{isClientData ? client.id_cliente : client.id_cobranca || '-'}</td>
                <td>{isClientData ? client.cpf : 'R$ ' + (client.valor || '-')}</td>
              </tr>
            );
          })}
        </tbody>}
      </table>
      <div className="footerTable initial">
        <span>Ver todos</span>
      </div>
    </div>
  );
}