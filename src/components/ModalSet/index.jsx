import './style.css';
import set from '../../assets/set.svg';
import edit from '../../assets/Edit.svg';
import exit from '../../assets/Exit.svg'

export default function ModalSet({ SetOpenModalEditPerfil, openModalEditPerfil }) {

    function openModal() {
        SetOpenModalEditPerfil(!openModalEditPerfil)
    }

    return (
        <div className='modalExit initial'>
            <img className='set' src={set} alt="" />
            <img src={edit} alt="editar" onClick={openModal} />
            <img src={exit} alt="sair" />
        </div>
    )
}

