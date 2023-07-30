import { useState } from "react";
import { getItem } from "../utils/localStorage";

function useUserProvider() {
    const [openModalEditPerfil, SetOpenModalEditPerfil] = useState(false);
    const [title, setTitle] = useState("Resumo de Cobranças");
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [clientRegisters, setClientRegisters] = useState([]);
    const token = getItem("token");
    const [corarrowTop, setCorArrowTop] = useState('#3F3F55')
    const [corarrowBottom, setCorArrowBottom] = useState('#3F3F55')

    return (
        {
            openModalEditPerfil,
            SetOpenModalEditPerfil,
            title,
            setTitle,
            openModalRegister,
            setOpenModalRegister,
            clientRegisters,
            setClientRegisters,
            token,
            corarrowTop,
            setCorArrowTop,
            corarrowBottom,
            setCorArrowBottom
        }
    )
}

export default useUserProvider

