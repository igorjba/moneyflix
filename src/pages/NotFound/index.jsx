import "./style.css";
import ImgError404 from "../../assets/404 Error.svg";

export default function NotFound() {
  return (
    <div className="container-not-found initial">
      <img
        className="img-not-found"
        src={ImgError404}
        alt="Página não encontrada"
      />
      <h2 className="text-not-found">Página não encontrada</h2>
    </div>
  );
}
