import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageSuccess from '../../../assets/Success.svg';
import './style.css';

export default function StepThreeForm() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <div className='modal-home-success'>
                <div className='success-img' style={{
                    backgroundImage: `url(${imageSuccess})`
                }} alt="Sucesso" />

                <h2 className='.modal-home-success-h2'>Cadastro realizado com sucesso!</h2>
            </div>
        </>
    )
}