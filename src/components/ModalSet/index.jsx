import edit from '../../assets/Edit.svg';
import exit from '../../assets/Exit.svg';
import set from '../../assets/set.svg';
import { useNavigate } from 'react-router-dom';
import './style.css';


export default function ModalSet({ SetOpenModalEditPerfil, openModalEditPerfil }) {

    function openModal() {
        SetOpenModalEditPerfil(!openModalEditPerfil)
    }
      
    const navigate = useNavigate();

    function onClickExit() {
        navigate('/Login')
    }

    return (
        <div className='modalExit initial'>
            <img className='set' src={set} alt="" />

            <img src={edit} alt="editar" onClick={openModal} />
            <
              img src={exit} 
              alt="sair"
              onClick={onClickExit}
            />
        </div>
    )
}

