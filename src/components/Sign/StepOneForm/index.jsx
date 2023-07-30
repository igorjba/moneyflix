import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import toastError from '../../../assets/toastError.svg';
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
            return toast.error("Por favor preencha todos os campos", {
                toastClassName: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            });
        }
        if (!localForm.email || localForm.email == "") {
            setErrorEmail('O Email é obrigatório');
            return toast.error("Por favor preencha todos os campos", {
                toastClassName: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            });
        }
        if (!localForm.username && !localForm.email) {
            return toast.error("Por favor preencha todos os campos", {
                toastClassName: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            });
        } else {

            setSignUpForm({
                ...signUpForm,
                ...localForm,
            });
            setCurrentStep(1);
        }
    };

    return (
        <div className='sign-up-form-step-one'>
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