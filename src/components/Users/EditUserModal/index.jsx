import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api/api';
import success from '../../../assets/Success-Toast.svg';
import closed from '../../../assets/close.svg';
import toastError from '../../../assets/toastError.svg';
import useUser from '../../../hooks/useUser';
import openEye from "../../../assets/OpenEye.svg";
import closedEye from "../../../assets/ClosedEye.svg";
import { cellPhoneMask, cellPhoneUnmask, cpfMask, cpfUnmask } from '../../../utils/inputMasks';
import { validateEmail, validateName, validatePassword } from '../../../utils/validation';
import { clearAll } from '../../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function EditUserModal({ setOpenModalEdit }) {
    const { SetOpenModalEditProfile, openModalEditProfile, token, setNameUser, setGetProfile, GetProfile, setOpenModalEditProfileSuccess } = useUser();
    const [errorName, setErrorName] = useState('')
    const [errorEmailEdit, setErrorEmailEdit] = useState('');
    const [errorPasswordEdit, setErrorPasswordEdit] = useState('');
    const [errorNewPasswordEdit, setErrorNewPasswordEdit] = useState('')
    const [errorPasswordAgainEdit, setErrorPasswordAgainEdit] = useState('')
    const [numberCPF, setNumberCPF] = useState('');
    const [numberTel, setNumberTel] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setNumberCPF(cpfMask(GetProfile.cpf));
        setNumberTel(cellPhoneMask(GetProfile.telefone));
    }, [GetProfile]);

    function onclickCloseModal() {
        SetOpenModalEditProfile(!openModalEditProfile)
        setOpenModalEdit(false)
    }

    async function handleSubmitEdit(event) {
        event.preventDefault();
        setErrorName('')
        setErrorPasswordEdit('')
        setErrorEmailEdit('')
        setErrorPasswordAgainEdit('')

        const validationName = validateName(GetProfile.nome)
        if (!validationName.isValid) {
            setErrorName(`${validationName.message}`)
        }
        const validationEmail = validateEmail(GetProfile.email)
        if (!validationEmail.isValid) {
            setErrorEmailEdit(`${validationName.message}`)
        }
        const validationPassword = validatePassword(GetProfile.email)
        if (!validationPassword.isValid) {
            setErrorPasswordEdit(`${validationPassword.message}`)
        }
        if (GetProfile.senha !== GetProfile.confirmeSenha) {
            setErrorPasswordAgainEdit('As senhas não coincidem');
        }
        try {
            const response = await api.put('usuario/atualizar', {
                nome: GetProfile.nome,
                cpf: cpfUnmask(GetProfile.cpf),
                email: GetProfile.email,
                telefone: cellPhoneUnmask(GetProfile.telefone),
                senhaAtual: GetProfile.senhaAtual,
                senha: GetProfile.senha,
                confirmeSenha: GetProfile.confirmeSenha
            }, {
                headers: {
                    authorization: token,
                }
            });
            localStorage.setItem("name", GetProfile.nome);
            setNameUser(GetProfile.nome);
            toast.success(
                'Cliente Atualizado com Sucesso!', {
                className: 'customToastify-success',
                icon: ({ theme, type }) => <img src={success} alt="" />
            })
            SetOpenModalEditProfile(false)
            setOpenModalEdit(false)
            setOpenModalEditProfileSuccess(true)

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 && error.response.data.message === "token expirado") {
                    clearAll()
                    navigate("/login");
                } else if (error.response.status === 400 && error.response.data.message === "Não autorizado") {
                    clearAll()
                    navigate("/login");
                }
            }
            toast.error(error.response.data.message, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            })
        }
    }



    function handleChangeFormTel(e) {
        const inputNumberTel = e.target.value.replace(/\D/g, '')
        let formattedValue = inputNumberTel
        if (inputNumberTel.length > 2) {
            formattedValue = `(${inputNumberTel.slice(0, 2)}) ${inputNumberTel.slice(2)}`;
        }
        if (inputNumberTel.length > 7) {
            formattedValue = ` ${formattedValue.slice(0, 9)}-${formattedValue.slice(9, 13)}`;
        }
        setNumberTel(formattedValue);
    }

    function handleChangeFormCPF(e) {
        const inputNumberCPF = e.target.value.replace(/\D/g, '')
        let formattedValue = inputNumberCPF

        if (inputNumberCPF.length > 3) {
            formattedValue = `${inputNumberCPF.slice(0, 3)}.${inputNumberCPF.slice(3)}`;
        }
        if (inputNumberCPF.length > 6) {
            formattedValue = `${formattedValue.slice(0, 7)}.${formattedValue.slice(7)}`;
        }
        if (inputNumberCPF.length > 9) {
            formattedValue = `${formattedValue.slice(0, 11)}-${formattedValue.slice(11, 13)}`;
        }

        setNumberCPF(formattedValue);
    }
    function handleChangeForm(e) {
        setGetProfile(prevState => {
            const newState = { ...prevState, [e.target.name]: e.target.value };
            return newState;
        });
    }

    return (
        <div className="main-modal-flex Modal-Edit">
            <div className='header-ModalEdit initial'>
                <h2>Edite seu cadastro</h2>
                <img className='main-modal-flex-close' src={closed} alt="Fechar" onClick={(onclickCloseModal)} />
            </div>
            <div className='main-ModalEdit'>
                <form onSubmit={handleSubmitEdit}>
                    <div className='divs-inputs-form'>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Nome*</h1></label>
                            <input className={`${errorName ? 'errorLine' : ''}`} type="text" placeholder='Digite seu nome' name='nome' value={GetProfile.nome} maxLength={200} onChange={handleChangeForm} />
                            {errorName && <span className='error'><h1>{errorName}</h1></span>}
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>E-mail*</h1></label>
                            <input className={`${errorEmailEdit ? 'errorLine' : ''}`} type="text" placeholder='Digite seu e-mail' name='email' value={GetProfile.email} maxLength={200} onChange={handleChangeForm} />
                            {errorEmailEdit && <span className='error'><h1>{errorEmailEdit}</h1></span>}
                        </div>
                        <div className='information-ModalEdit'>
                            <div>
                                <label htmlFor=""><h1>CPF*</h1></label>
                                <input className='cpf' type="text" placeholder='Digite seu CPF' name='cpf' value={numberCPF} maxLength={14} onChange={handleChangeFormCPF} />
                                {errorPasswordEdit && <span className='error'><h1>{errorPasswordEdit}</h1></span>}
                            </div>
                            <div>
                                <label htmlFor=""><h1>Telefone*</h1></label>
                                <input type="text" placeholder='Digite seu telefone' name='telefone' value={numberTel} maxLength={15} onChange={handleChangeFormTel} />
                            </div>
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Senha Atual*</h1></label>
                            <div className="password-input">
                                <input type={showPassword ? "text" : "password"} placeholder='Digite sua Senha' name='senhaAtual' value={GetProfile.senhaAtual} maxLength={200} onChange={handleChangeForm} />
                                <div
                                    className='password-toggle-visibility'
                                    onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                                    style={{
                                        backgroundImage: `url(${showPassword ? openEye : closedEye})`,
                                    }}
                                />
                            </div>
                            {errorPasswordEdit && <span className='error'><h1>{errorPasswordEdit}</h1></span>}
                        </div>
                        <div className='box-info'>
                            <label htmlFor=''><h1>Nova Senha</h1></label>
                            <div className='password-input'>
                                <input
                                    type={showNewPassword ? 'text' : 'password'} placeholder='Digite sua Senha' name='senha' value={GetProfile.senha} maxLength={200} onChange={handleChangeForm} />
                                <div
                                    className='password-toggle-visibility' onClick={() => setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword)}
                                    style={{ backgroundImage: `url(${showNewPassword ? openEye : closedEye})`, }} />
                            </div>
                            {errorNewPasswordEdit && <span className='error'><h1>{errorNewPasswordEdit}</h1></span>}
                        </div>

                        <div className='box-info'>
                            <label htmlFor=''><h1>Confirmar a Senha</h1></label>
                            <div className='password-input'>
                                <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirme sua senha' name='confirmeSenha' value={GetProfile.confirmeSenha} maxLength={200} onChange={handleChangeForm} />
                                <div className='password-toggle-visibility' onClick={() => setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)} style={{ backgroundImage: `url(${showConfirmPassword ? openEye : closedEye})`, }} />
                            </div>
                            {errorPasswordAgainEdit && <span className='error'><h1>{errorPasswordAgainEdit}</h1></span>}
                        </div>
                    </div>
                    <button className='ModalEdit-Button'>Continuar</button>
                </form>
            </div >
        </div >
    )
}