import { useContext } from "react";
import UserClientContext from "../contexts/UserClientContext.jsx";

function useClient() {
    return (useContext(UserClientContext));
}

export default useClient;