import { toast } from 'react-toastify';
import api from '../../../api/api';
import Notification from '../../../assets/Notification.svg';
import success from '../../../assets/Success-Toast.svg';
import closed from '../../../assets/close.svg';
import toastError from '../../../assets/toastError.svg';
import useUser from '../../../hooks/useUser';
import './style.css';

export default function DeleteCharge(){
    const { openModalDelete, setModalDelete, token, setInfoClientCharges } = useUser();

    async function deleteChargesList(){
        try {
            const response = await api.delete(`cobranca/delete/${openModalDelete.id_charges}`, {
                headers: {
                    authorization: `${token}`
                }
            });
            setModalDelete({...openModalDelete, status: false})
            toast.success(
                'Cobrança excluída com Sucesso!', {
                className: 'customToastify-success',
                icon: ({ theme, type }) => <img src={success} alt="" />
            });
            ListCharges()
        } catch (error) {
            toast.error(
                error.response.data.message, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            });
        }
    }

    async function ListCharges() {
        try {
            const response = await api.get('cobranca', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setInfoClientCharges(response.data)
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 && error.response.data.message === "token expirado") {
                    clearAll()
                    navigate("/login");
                } else if (error.response.status === 400 && error.response.data.message === "Não autorizado") {
                    clearAll()
                    navigate("/login");
                }
            }
            toast.error(error.response.data.message, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            })

        }
    }

    return(
        <div className='container-delete-main'>
            <img src={closed} alt="Fechar" className='mousePointer closer-container-delete' onClick={() => setModalDelete({...openModalDelete, status: false})} />
            <img src={Notification} alt="Atenção" />
            <h2>Tem certeza que deseja excluir esta cobrança ?</h2>
            <div className='container-button'>
                <button className='container-delete-no' onClick={() => setModalDelete({...openModalDelete, status: false})}><h1>Não</h1></button>
                <button className='container-delete-yes' onClick={deleteChargesList}><h1>Sim</h1></button>
            </div>
        </div>

    )
}