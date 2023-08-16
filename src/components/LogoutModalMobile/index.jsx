import './styles.css'
import gifBye from '../../assets/gato-chorao.gif'
import useUser from '../../hooks/useUser'
import { Navigate, useNavigate } from 'react-router-dom'

export default function LogoutModalMobile() {
    const {setOpenEditLogoutMobileModal, setOpenModalLogoutMobile} = useUser()
    const navigate = useNavigate();
    function openModalEditLogout(){
        setOpenModalLogoutMobile(false),
        setOpenEditLogoutMobileModal(true)
    }

    function logoutOnClick() {
        setOpenEditLogoutMobileModal(false)
        setOpenModalLogoutMobile(false)
        localStorage.removeItem('token')
        navigate('/Login')
    }

    return (
            <div className='container-edit-logout-mobile-modal modal-logout'>
                 <img src={gifBye} className='image-bye-cat' alt="" />
                 <div className='container-button-modal'>
                 <button onClick={logoutOnClick}>Sim ... por que vás embora mi amigo</button>
                 <button onClick={openModalEditLogout}>Não ... Ebaaa s2</button>
                 </div>
            </div>
    )
    }