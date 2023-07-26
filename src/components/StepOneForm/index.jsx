import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './style.css';

const StepOneForm = ({ setCurrentStep, signUpForm, setSignUpForm }) => {
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [localForm, setLocalForm] = useState({
        username: signUpForm.username,
        email: signUpForm.email,
    });

    const handleChangeStepOne = (event) => {
        setLocalForm({
            ...localForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmitStepOne = () => {
        setErrorName('');
        setErrorEmail('');

        if (!localForm.username) {
            setErrorName('O Nome é obrigatório');
        }
        if (!localForm.email) {
            setErrorEmail('O Email é obrigatório');
        }
        if (localForm.username && localForm.email) {
            setSignUpForm({
                ...signUpForm,
                ...localForm,
            });
            setCurrentStep(1);
        }
    };

    return (
        <div className='sign-up-form'>
            <h1 className='step-one-tittle'>Adicione seus dados</h1>
            <form className='step-one-form'>
                <div className='container-name-step-one-form container-input'>
                    <span className='step-one-form-name span-forms'>Nome*</span>
                    <input
                        className={`step-one-form-input input-forms ${errorName ? 'step-one-form-input input-forms errorLine' : 'step-one-form-input input-forms'}`}
                        type='text'
                        name="username"
                        value={localForm.username}
                        onChange={handleChangeStepOne}
                        placeholder='Digite seu nome'
                    />
                    {errorName && <span className='error'>{errorName}</span>}
                </div>
                <div className='container-email-step-one-form container-input'>
                    <span className='step-one-form-email span-forms'>E-mail*</span>
                    <input
                        className={`step-one-form-input input-forms ${errorEmail ? 'step-one-form-input input-forms errorLine' : 'step-one-form-input input-forms'}`}
                        type='email'
                        name="email"
                        value={localForm.email}
                        onChange={handleChangeStepOne}
                        placeholder='Digite seu e-mail'
                    />
                    {errorEmail && <span className='error'>{errorEmail}</span>}
                </div>
            </form>
            <div className='container-step-one-form-button'>
                <button className='step-one-next-page-button' onClick={handleSubmitStepOne}>Continuar</button>
            </div>
            <div className='container-step-one-form-subtitle'>
                <span className="step-one-form-subtitle">
                    Já tem uma conta? Faça seu <Link to="/login">Login</Link>
                </span>
            </div>
        </div>
    )
}

export default StepOneForm