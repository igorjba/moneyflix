import { useEffect } from "react";
import { moneyMask } from "../../../utils/inputMasks";
import "./style.css";

export default function SummaryValueCards({
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
