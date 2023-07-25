import ClienteOK from "../../assets/ClienteOK.svg";
import ClienteOverdue from "../../assets/ClienteOverdue.svg";
import Expired from "../../assets/Expired.svg";
import Paid from "../../assets/Paid.svg";
import Pending from "../../assets/Pending.svg";
import Card from "../Card/index";
import CardResume from "../CardResume/index";
import './style.css';

export default function PageHome() {


    return (
        <>
            <div className="contentResume initial">
                <CardResume IconCard={Paid} backgroundColor="#eef6f6" />
                <CardResume IconCard={Expired} backgroundColor="#ffefef" />
                <CardResume IconCard={Pending} backgroundColor="#fcf6dc" />
            </div>
            <div className="contentCards">
                <Card />
                <Card />
                <Card />
                <Card iconCard={ClienteOverdue} />
                <Card iconCard={ClienteOK} />
            </div>
        </>
    )
}