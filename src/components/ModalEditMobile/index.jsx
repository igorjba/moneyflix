import { useState } from 'react'
import './styles.css'
import useUser from '../../hooks/useUser'


export default function ModalEditMobile({}) {
    const {setOpenEditLogoutMobileModal, setOpenModalLogoutMobile, setOpenModalEdit,
        setOpenModalEditProfile, getUserDetails} = useUser()

    async function openEditUserModal() {
        setOpenModalEditProfile(true)
        setOpenEditLogoutMobileModal(false)
        await getUserDetails();
        setOpenModalEdit(true)
    }

    function openModalLogout(){
        setOpenModalLogoutMobile(true),
        setOpenEditLogoutMobileModal(false)
    }
    
    return (
        <div className='modal-edit-logout container-modal-pat'>
            <div className='container-edit-mobile'>
        <button onClick={openEditUserModal} className='edit-user-mobile-modal-button'>Editar</button>
            </div>
            <div className='container-logout-mobile'>
        <button className='edit-user-mobile-modal-button' onClick={openModalLogout}>Logout</button>
            </div>

        </div>
    )
}