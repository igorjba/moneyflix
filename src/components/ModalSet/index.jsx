import edit from '../../assets/Edit.svg';
import exit from '../../assets/Exit.svg';
import set from '../../assets/set.svg';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function ModalSet() {
    const navigate = useNavigate();

    function onClickExit() {
        navigate('/Login')
    }

    return (
        <div className='modalExit initial'>
            <img className='set' src={set} alt="" />
            <img src={edit} alt="editar" />
            <img src={exit} alt="sair"
                onClick={onClickExit}
            />
        </div>
    )
}

