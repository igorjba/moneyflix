import useUser from "../../hooks/useUser"
import closeIcon from '../../assets/close.svg'
import { useNavigate } from "react-router-dom";
import './styles.css'


export default function EditLogoutMobileModal() {
    const { setOpenEditLogoutMobileModal,
        getUserDetails,
        setOpenModalEdit,
        setOpenModalEditProfile,

    } = useUser()
    const navigate = useNavigate();

    async function openEditUserModal() {
        setOpenModalEditProfile(true)
        setOpenEditLogoutMobileModal(false)
        await getUserDetails();
        setOpenModalEdit(true)
    }

    function logoutOnClick() {
        setOpenEditLogoutMobileModal(false)
        localStorage.removeItem('token')
        navigate('/Login')
    }

    return (
        <div className='container-edit-logout-mobile-modal'>
            <img className='default-modal-close' src={closeIcon} alt="Fechar" onClick={() => setOpenEditLogoutMobileModal(false)} />
            <button className='edit-user-mobile-modal-button' onClick={openEditUserModal}>
                Editar
            </button>
            <button className='logout-user-mobile-modal-button' onClick={logoutOnClick}>
                Logout
            </button>
        </div>
    )
}