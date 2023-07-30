import { useContext } from "react";
import UserContext from '../contexts/UserContext.jsx';

function useUser() {
    return (useContext(UserContext));
}

export default useUser;