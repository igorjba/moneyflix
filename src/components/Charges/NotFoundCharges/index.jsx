import './style.css'
import imageErrorNot from '../../../assets/ImageNotError.svg'
import imageErrorNot1 from '../../../assets/ImageNotError1.svg'

export default function NotFoundCharges(){

    return(
        <div className='modal-Not-Charges'>
            <div className='div-error-image'>
            <img src={imageErrorNot} alt="" />
            <img src={imageErrorNot1} alt="" />
            </div>
            <div className='container-text-notfound-charges'>
            <h2>Nenhum resultado foi encontrado!</h2>
            <h2>Verifique se escrita está correta</h2>
            </div>
        </div>
    )
}