import "./style.css";

export default function CardResume({
  IconCard,
  BackgroundColor,
  TitleCard,
  ValueCard,
}) {
  function formatValue(value) {
    return value?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  const valueCardFormated = formatValue(parseInt(ValueCard));

  return (
    <div
      className="resumeCharge initial"
      style={{ background: `${BackgroundColor}` }}
    >
      <img src={IconCard} alt="cobranças pagas" />
      <div className="initial">
        <h3 className="">{TitleCard}</h3>
        <h3 className="value">{valueCardFormated}</h3>
      </div>
    </div>
  );
}
