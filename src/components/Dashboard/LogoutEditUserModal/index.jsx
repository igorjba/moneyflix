import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../api/api";
import edit from "../../../assets/Edit.svg";
import exit from "../../../assets/Exit.svg";
import set from "../../../assets/Set.svg";
import toastError from '../../../assets/toastError.svg';
import useUser from "../../../hooks/useUser";
import { clearAll } from "../../../utils/localStorage";
import "./style.css";

export default function LogoutEditUserModal() {
    const navigate = useNavigate()
    const { setOpenModalEditProfile, token, setGetProfile, getUserDetails, setModalExit, setOpenModalEdit } = useUser();

    async function openModal() {
        setOpenModalEditProfile(true)
        setModalExit(false);
        await getUserDetails();
        setOpenModalEdit(true)
    }

    function onClickExit() {
        setModalExit(false)
        localStorage.clear();
        navigate('/Login')
    }

    return (
        <div id="modalExit" className='modalExit initial'>
            <img className='set' src={set} alt="" />
            <img className="mouse-pointer" src={edit} alt="editar" onClick={openModal} />
            <img className="mouse-pointer" src={exit} alt="sair" onClick={onClickExit} />
        </div>
    )
}
