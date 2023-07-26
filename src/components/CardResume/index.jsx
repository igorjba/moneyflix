import "./style.css";

export default function CardResume({ IconCard, backgroundColor }) {
  return (
    <div
      className="resumeCharge initial"
      style={{ background: `${backgroundColor}` }}
    >
      <img src={IconCard} alt="cobranças pagas" />
      <div className="initial">
        <h3 className="">Cobraças Pagas</h3>
        <h3 className="value">R$ 30.000</h3>
      </div>
    </div>
  );
}
