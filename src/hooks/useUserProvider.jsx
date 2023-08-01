import { useState } from "react";
import { getItem } from "../utils/localStorage";

function useUserProvider() {
    const [openModalEditPerfil, SetOpenModalEditPerfil] = useState(false);
    const [title, setTitle] = useState("Resumo de Cobranças");
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [clientRegisters, setClientRegisters] = useState([]);
    const token = getItem("token");
    const [nameUser, setNameUser] = useState('');
    const [idListChargesClick, setIdListChargesClick] = useState([]);
    const [openModalEditClient, setOpenModalEditClient] = useState(false)
    const [openModalRegisterCharges, setOpenModalRegistercharges] = useState({
        status: false,
        id_user: '',
        nome_user: ''
    })
    const [formEdit, setFormEdit] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        senhaAtual: '',
        senha: '',
        confirmeSenha: ''
    });

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
            nameUser,
            setNameUser,
            formEdit,
            setFormEdit,
            idListChargesClick,
            setIdListChargesClick,
            openModalEditClient,
            setOpenModalEditClient,
            openModalRegisterCharges,
            setOpenModalRegistercharges
        }
    )
}

export default useUserProvider

