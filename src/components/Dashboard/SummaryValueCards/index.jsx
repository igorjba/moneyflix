import "./style.css";

export default function SummaryValueCards({
  IconCard,
  BackgroundColor,
  TitleCard,
  ValueCard,
}) {

  return (
    <div
      className="resumeCharge initial"
      style={{ background: `${BackgroundColor}` }}
    >
      <img src={IconCard} alt="cobranças pagas" />
      <div className="initial">
        <h2 className="title-card">{TitleCard}</h2>
        <h2 className="value">{ValueCard}</h2>
      </div>
    </div>
  );
}
