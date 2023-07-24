import "./style.css";

export default function CardResume({ IconCard, backgroundColor }) {
  return (
    <div
      className="resumeCharge initial"
      style={{ background: `${backgroundColor}` }}
    >
      <img src={IconCard} alt="cobranças pagas" />
      <div className="initial">
        <h3 className="fontStyleMontserrat">Cobraças Pagas</h3>
        <h3 className="fontStyleMontserrat value">R$ 30.000</h3>
      </div>
    </div>
  );
}

{
  /* <div className="resumeCharge expiredCharge initial">
        <img src={Expired} alt="Cobranças Vencidas" />
        <div className="initial">
          <h3 className="fontStyleMontserrat">Cobranças Vencidas</h3>
          <h3 className="fontStyleMontserrat value">R$ 7.000</h3>
        </div>
      </div>
      <div className="resumeCharge pendingCharge initial">
        <img src={Pending} alt="Cobranças Vencidas" />
        <div className="initial">
          <h3 className="fontStyleMontserrat">Cobranças Previstas</h3>
          <h3 className="fontStyleMontserrat value">R$ 10.000</h3>
        </div>
      </div> */
}
