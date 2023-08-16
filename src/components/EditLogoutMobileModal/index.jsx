import useUser from "../../hooks/useUser"
import closeIcon from '../../assets/close.svg'
import { useNavigate } from "react-router-dom";
import './styles.css'
import ModalEditMobile from "../ModalEditMobile";
import { useState } from "react";
import LogoutModalMobile from "../LogoutModalMobile";


export default function EditLogoutMobileModal() {
    const { setOpenEditLogoutMobileModal,
        getUserDetails,
        setOpenModalEdit,
        setOpenModalEditProfile,

    } = useUser()
    const navigate = useNavigate();

    const [openModalEditMobile, setModalEditMobile] = useState(false)

    async function openEditUserModal() {
        setOpenModalEditProfile(true)
        setOpenEditLogoutMobileModal(false)
        await getUserDetails();
        setOpenModalEdit(true)
    }


    return (
        <div className='container-edit-logout-mobile-modal'>
            <div>
            <img className='default-modal-close' src={closeIcon} alt="Fechar" onClick={() => setOpenEditLogoutMobileModal(false)} />
            <ModalEditMobile></ModalEditMobile>
            </div>
        </div>
    )
}