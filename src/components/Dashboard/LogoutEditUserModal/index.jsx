import { useNavigate } from "react-router-dom";
import edit from "../../../assets/Edit.svg";
import exit from "../../../assets/Exit.svg";
import set from "../../../assets/Set.svg";
import useUser from "../../../hooks/useUser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import api from "../../../api/api";

export default function LogoutEditUserModal({ setModalExit, setOpenModalEdit }) {
    const navigate = useNavigate()
    const { SetOpenModalEditProfile, token, setGetProfile } = useUser();

    async function getUserDetails() {
        try {
            const response = await api.get("/usuario", {
                headers: {
                    authorization: token,
                }
            });
  
            if (response && response.data) {
                setGetProfile({
                    nome: response.data.nome_usuario || "",
                    email: response.data.email || "",
                    cpf: response.data.cpf || "",
                    telefone: response.data.telefone || "",
                    senhaAtual: "",
                    senha: "",
                    confirmeSenha: ""
                });
            } else {
                setGetProfile({
                    nome: '',
                    email: '',
                    cpf: '',
                    telefone: '',
                    senhaAtual: '',
                    senha: '',
                    confirmeSenha: ''
                });
            }
        } catch (error) {
            if(error.response && error.response.data) {
                toast.error(error.response.data.message, {
                    className: "customToastify-error",
                    icon: ({ theme, type }) => <img src={toastError} alt="" />,
                });
            }
        }
    }
    
   async function openModal() {
        SetOpenModalEditProfile(true)
        setModalExit(false);
        await getUserDetails(); 
        setOpenModalEdit(true)
    }

    function onClickExit() {
        localStorage.clear();
        navigate('/Login')
    }

    return (
        <div id="modalExit" className='modalExit initial'>
            <img className='set' src={set} alt="" />
            <img src={edit} alt="editar" onClick={openModal} />
            <img src={exit} alt="sair" onClick={onClickExit} />
        </div>
    )
}
