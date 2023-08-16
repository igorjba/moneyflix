import closeIcon from '../../assets/close.svg';
import useUser from "../../hooks/useUser";
import './styles.css';


export default function EditLogoutMobileModal() {
    const { setOpenEditLogoutMobileModal, setOpenModalLogoutMobile, setOpenModalEdit,
        setOpenModalEditProfile, getUserDetails } = useUser()


    async function openEditUserModal() {
        setOpenModalEditProfile(true)
        setOpenEditLogoutMobileModal(false)
        await getUserDetails();
        setOpenModalEdit(true)
    }

    function openModalLogout() {
        setOpenModalLogoutMobile(true),
            setOpenEditLogoutMobileModal(false)
    }

    return (
        <div className='container-edit-logout-mobile-modal'>
            <div>
                <img className='default-modal-close' src={closeIcon} alt="Fechar" onClick={() => setOpenEditLogoutMobileModal(false)} />
                <div className='modal-edit-logout container-modal-pat'>
                    <div className='container-edit-mobile'>
                        <button onClick={openEditUserModal} className='edit-user-mobile-modal-button'>Editar</button>
                    </div>
                    <div className='container-logout-mobile'>
                        <button className='edit-user-mobile-modal-button' onClick={openModalLogout}>Logout</button>
                    </div>

                </div>
            </div>
        </div>
    )
}