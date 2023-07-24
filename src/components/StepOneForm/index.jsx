import { useState } from 'react';
import { toast } from 'react-toastify';
import './style.css';

const StepOneForm = ({ setCurrentStep, signUpForm, setSignUpForm }) => {
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
        if (!localForm.username || !localForm.email) {
            toast.error('Por favor preencha todos os campos');
        } else {
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
                        className='step-one-form-input input-forms'
                        type='text'
                        name="username"
                        value={localForm.username}
                        onChange={handleChangeStepOne}
                        placeholder='Nome'
                    />
                </div>
                <div className='container-email-step-one-form container-input'>
                    <span className='step-one-form-email span-forms'>E-mail*</span>
                    <input
                        className='step-one-form-input input-forms'
                        type='email'
                        name="email"
                        value={localForm.email}
                        onChange={handleChangeStepOne}
                        placeholder='E-mail'
                    />
                </div>
            </form>
            <div className='container-step-one-form-button'>
                <button className='step-one-next-page-button' onClick={handleSubmitStepOne}>Continuar</button>
            </div>
            <div className='container-step-one-form-subtitle'>
                <span className='step-one-form-subtitle'>Já tem uma conta? Faça seu <a href="#">Login</a> </span>
            </div>
        </div>
    )
}

export default StepOneForm