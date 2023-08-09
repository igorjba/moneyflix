import { useContext } from "react";
import UserChargesContext from "../contexts/UserChargesContext";


function useCharges() {
    return (useContext(UserChargesContext));
}

export default useCharges
