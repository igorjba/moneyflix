import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageSuccess from '../../../assets/Success.svg';
import useUser from '../../../hooks/useUser';
import './style.css';

export default function SuccessEditUserModal() {
    const {setOpenModalEditProfileSuccess} = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpenModalEditProfileSuccess(false)
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <div className='edit-user-modal-success'>
                <div className='success-img' style={{
                    backgroundImage: `url(${imageSuccess})`
                }} alt="Sucesso" />
                <h2 className='.edit-user-modal-success-h2'>Cadastro alterado com sucesso!</h2>
            </div>
        </>
    )
}