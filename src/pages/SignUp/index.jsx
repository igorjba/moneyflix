import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StepDoneImg from '../../assets/StepDone.svg'
import StepInProgressImg from '../../assets/StepInProgress.svg'
import StepUndoneImg from '../../assets/StepUndone.svg'
import StepOneForm from '../../components/Sign/StepOneForm'
import StepThreeForm from '../../components/Sign/StepThreeForm'
import StepTwoForm from '../../components/Sign/StepTwoForm'
import './style.css'

const SignUp = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [signUpForm, setSignUpForm] = useState({
        username: '',
        email: '',
        password: '',
    })

    return (
        <div className='container-sign-up initial'>
            <div className='sign-up-steps'>
                <div className={`sign-up-steps-item`}>
                    <div className='container-sign-up-steps'>
                        <div
                            className='sign-up-step-one-circle sign-up-circle'
                            style={{
                                backgroundImage: `url(${currentStep === 0 ? StepInProgressImg : StepDoneImg})`
                            }}
                        />
                        <h1 className='sign-up-step-one-title'>Cadastre-se</h1>
                    </div>
                    <div className='container-sign-up-steps'>
                        <div className='sign-up-step-one-bar sign-up-bar'></div>
                        <h1 className='sign-up-step-subtitle'>Por favor, escreva seu nome e e-mail</h1>
                    </div>
                    <div className='container-sign-up-steps'>
                        <div
                            className='sign-up-step-two-circle sign-up-circle'
                            style={{
                                backgroundImage: `url(${currentStep === 0 ? StepUndoneImg :
                                    currentStep === 1 ? StepInProgressImg :
                                        StepDoneImg})`
                            }}
                        />
                        <h1 className='sign-up-step-one-title'>Escolha uma senha</h1>
                    </div>
                    <div className='container-sign-up-steps'>
                        <div className='sign-up-step-one-bar sign-up-bar'></div>
                        <h1 className='sign-up-step-subtitle'>Por favor, escreva seu nome e e-mail</h1>
                    </div>
                    <div className='container-sign-up-steps'>
                        <div
                            className='sign-up-step-two-circle sign-up-circle'
                            style={{
                                backgroundImage: `url(${currentStep === 0 ? StepUndoneImg :
                                    currentStep === 1 ? StepUndoneImg :
                                        StepDoneImg})`
                            }}
                        />
                        <h1 className='sign-up-step-one-title'>Escolha uma senha</h1>
                    </div>
                    <div className='container-sign-up-steps'>
                        <h1 className='sign-up-step-subtitle sign-up-last-step-subtitle'>Por favor, escreva seu nome e e-mail</h1>
                    </div>
                </div>
            </div>

            <div className='container-sign-up-forms'>
                {currentStep === 0 &&
                    <StepOneForm
                        setCurrentStep={setCurrentStep}
                        signUpForm={signUpForm}
                        setSignUpForm={setSignUpForm}
                    />}
                {currentStep === 1 &&
                    <StepTwoForm
                        setCurrentStep={setCurrentStep}
                        signUpForm={signUpForm}
                        setSignUpForm={setSignUpForm}
                    />}
                {currentStep === 2 &&
                    <StepThreeForm
                        setCurrentStep={setCurrentStep}
                        signUpForm={signUpForm}
                        setSignUpForm={setSignUpForm}
                    />}

                <div className='container-sign-up-indicator-forms'>
                    <div className='sign-up-indicator-forms-one steps-bar'
                        style={{
                            backgroundColor: '#0E8750',
                        }}
                    />
                    <div className='sign-up-indicator-forms-two steps-bar'
                        style={{
                            backgroundColor: `${currentStep > 0 ? '#0E8750' : '#DEDEE9'}`,
                        }}
                    />
                    <div className='sign-up-indicator-forms-three steps-bar'
                        style={{ backgroundColor: `${currentStep === 2 ? '#0E8750' : '#DEDEE9'}` }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SignUp