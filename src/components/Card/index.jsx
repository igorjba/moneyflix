import "./style.css";

export default function Card() {
  return (
    <div className="card">
      <div className="headerCard initial">
        <h3>Cobranças Vencidas</h3>
        <div className="numberClient initial fontStyleMontserrat">08</div>
      </div>

      <div className="titlesTable">
        <strong>Clintes</strong>
        <strong>ID da cob.</strong>
        <strong>Valor</strong>
      </div>

      <div className="columnsTable">
        <p>Sara Silva</p>
        <p>223456787</p>
        <p>R$ 1000,00</p>
      </div>
      <div className="columnsTable">
        <p>Sara Silva</p>
        <p>223456787</p>
        <p>R$ 1000,00</p>
      </div>
      <div className="columnsTable">
        <p>Sara Silva</p>
        <p>223456787</p>
        <p>R$ 1000,00</p>
      </div>

      <div className="footerTable initial">Ver todos</div>
    </div>
  );
}
