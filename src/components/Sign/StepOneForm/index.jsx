import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import toastError from '../../../assets/toastError.svg';
import { validateEmail, validateName } from '../../../utils/validation';
import api from "../../../api/api.jsx"
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

    const handleSubmitStepOne = async () => {
        setErrorName('');
        setErrorEmail('');

        const validationName = validateName(localForm.username);
        if (!validationName.isValid) {
            setErrorName(validationName.message);
            // toast.error(validationName.message, {
            //     toastClassName: 'customToastify-error',
            //     icon: ({ theme, type }) => <img src={toastError} alt="" />
            // });
            return;
        }

        const validationEmail = validateEmail(localForm.email);
        if (!validationEmail.isValid) {
            setErrorEmail(validationEmail.message);
            // toast.error(validationEmail.message, {
            //     toastClassName: 'customToastify-error',
            //     icon: ({ theme, type }) => <img src={toastError} alt="" />
            // });
            return;
        }

        try {
            const response = await api.get('email/', { params: { email: localForm.email } });
            if (response.status !== 200) {
                setErrorEmail(error.response.data.message);
                toast.error(
                    error.response.data.message, {
                    className: 'customToastify-error',
                    icon: ({ theme, type }) => <img src={error} alt="" />
                });
                return;
            }
        } catch (error) {
            toast.error(
                error.response.data.message, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={error} alt="" />
            });
            return;
        }

        setSignUpForm({
            ...signUpForm,
            ...localForm,
        });
        setCurrentStep(1);
    };

    return (
        <div className='sign-up-form-step-one'>
            <h1 className='step-one-tittle'>Adicione seus dados</h1>
            <form className='step-one-form'>
                <div className='container-name-step-one-form container-input'>
                    <span className='step-one-form-name label-forms'>Nome*</span>
                    <input
                        className={`step-one-form-input input-forms ${errorName ? 'step-one-form-input input-forms errorLine' : 'step-one-form-input input-forms'}`}
                        type='text'
                        name="username"
                        value={localForm.username}
                        onChange={handleChangeStepOne}
                        placeholder='Digite seu nome'
                    />
                    {errorName && <span className='error error-step-one'>{errorName}</span>}
                </div>
                <div className='container-email-step-one-form container-input'>
                    <span className='step-one-form-email label-forms'>E-mail*</span>
                    <input
                        className={`step-one-form-input input-forms ${errorEmail ? 'step-one-form-input input-forms errorLine' : 'step-one-form-input input-forms'}`}
                        type='email'
                        name="email"
                        value={localForm.email}
                        onChange={handleChangeStepOne}
                        placeholder='Digite seu e-mail'
                    />
                    {errorEmail && <span className='error error-step-one'>{errorEmail}</span>}
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