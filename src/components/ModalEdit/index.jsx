import './style.css'
import closed from '../../assets/close.svg'

export default function ModalEdit({ SetOpenModalEditPerfil, openModalEditPerfil }) {

    function onclickCloseModal() {
        SetOpenModalEditPerfil(!openModalEditPerfil)
    }

    return (
        <div className="ModalEdit-Main">
            <div className='header-ModalEdit initial'>
                <h2>Edite seu cadastro</h2>
                <img className='closedEdit' src={closed} alt="Fechar" onClick={(onclickCloseModal)} />
            </div>
        </div>
    )
}