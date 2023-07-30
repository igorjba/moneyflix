import { useNavigate } from 'react-router-dom';
import imageSuccess from '../../../assets/Success.svg';
import './style.css';

export default function StepThreeForm() {
    const navigate = useNavigate();

    const handleButtonSuccess = () => {
        navigate('/login');
    };

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
                    onClick={handleButtonSuccess}
                >
                    Ir para Login
                </button>
            </div>
        </>
    )
}