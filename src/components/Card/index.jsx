import "./style.css";

export default function Card({ iconCard }) {
  return (
    <div className="card">
      <div className="headerCard initial">
        <div
          className="iconCard"
          style={{ backgroundImage: `url(${iconCard})` }}
        ></div>
        <h3 className="title-card">Cobranças Vencidas</h3>
        <div className="numberClient initial">08</div>
      </div>
      <table className="table-main-card">
        <thead className="titlesTable">
          <tr>
            <th>Clintes</th>
            <th>ID da cob.</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sara Silva</td>
            <td>223456787</td>
            <td>R$ 1000,00</td>
          </tr>
          <tr>
            <td>Sara Silva</td>
            <td>223456787</td>
            <td>R$ 1000,00</td>
          </tr>
          <tr>
            <td>Sara Silva</td>
            <td>223456787</td>
            <td>R$ 1000,00</td>
          </tr>
          <tr>
            <td>Sara Silva</td>
            <td>223456787</td>
            <td>R$ 1000,00</td>
          </tr>
        </tbody>
      </table>
      <div className="footerTable initial">Ver todos</div>
    </div>
  );
}
