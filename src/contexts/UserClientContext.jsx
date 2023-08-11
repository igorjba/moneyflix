import { createContext } from "react";
import useClientUser from "../hooks/useClientUser";

const UserClientContext = createContext({});

export function UserClientProvider(props) {
    const useClientProvider = useClientUser();

    return (
        <UserClientContext.Provider value={useClientProvider}>{props.children}</UserClientContext.Provider>
    )
}

export default UserClientContext;