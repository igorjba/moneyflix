import { createContext } from "react";
import useChargesUser from "../hooks/useChargesUser";

const UserChargesContext = createContext({})

export function UserCharges(props) {
    const userCharges = useChargesUser();

    return (
        <UserChargesContext.Provider value={userCharges}> {props.children} </UserChargesContext.Provider>
    )
}

export default UserChargesContext;

