import './style.css';
import set from '../../assets/set.svg';
import edit from '../../assets/Edit.svg';
import exit from '../../assets/Exit.svg'

export default function ModalSet() {
    return (
        <div className='modalExit initial'>
            <img className='set' src={set} alt="" />
            <img src={edit} alt="editar" />
            <img src={exit} alt="sair" />
        </div>
    )
}

