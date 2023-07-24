import './style.css';
import imageSuccess from '../../assets/success.svg'


export default function StepThreeForm() {
    return (
        <>
            <div className='modal-home-success'>
                <div className='success-img' style={{
                    backgroundImage: `url(${imageSuccess})`
                }} alt="Sucesso" />

                <h2 className='.modal-home-success-h2'>Cadastro realizado com sucesso!</h2>
            </div>
            <div className='container-step-three-form-button'>
                <button
                    className='step-three-next-page-button'
                >
                    Ir para Login
                </button>
            </div>
        </>
    )
}