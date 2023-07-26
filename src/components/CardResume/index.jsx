import "./style.css";

export default function CardResume({
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
        <h3 className="">{TitleCard}</h3>
        <h3 className="value">R$ {ValueCard}</h3>
      </div>
    </div>
  );
}
