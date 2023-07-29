import { useNavigate } from "react-router-dom";
import edit from "../../assets/Edit.svg";
import exit from "../../assets/Exit.svg";
import set from "../../assets/Set.svg";
import "./style.css";

export default function ModalSet({ SetOpenModalEditPerfil, setModalExit, SetOpenModalEdit }) {
    const navigate = useNavigate();

    function openModal() {
        SetOpenModalEditPerfil(true)
        setModalExit(false)
        SetOpenModalEdit(true)
    }

    function onClickExit() {
        localStorage.clear();
        navigate('/Login')
    }
    return (
        <div className='modalExit initial'>
            <img className='set' src={set} alt="" />
            <img src={edit} alt="editar" onClick={openModal} />
            <img src={exit} alt="sair" onClick={onClickExit} />

        </div>
    )
}
