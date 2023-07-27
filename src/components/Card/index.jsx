import "./style.css";

export default function Card({
  iconCard,
  titleCard,
  totalClient,
  cardL,
  backgroundColorTotalClient,
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
            <th>Clintes</th>
            <th>ID da cob.</th>
            <th>Valor</th>
          </tr>
        </thead>
        {<tbody>
          {cardL.map((client) => {
            return (
              <tr key={client.id_cobranca}>
                <td>{client.cliente}</td>
                <td>{client.id_cobranca}</td>
                <td>R$ {client.valor}</td>
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
