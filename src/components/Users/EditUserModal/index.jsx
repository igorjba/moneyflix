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
    }, []);

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
        if(!GetProfile.senha){
            setErrorPasswordEdit('Digite sua senha')
        }

        console.log(numberCPF);
        console.log(numberTel);
        try {
            const response = await api.put('usuario/atualizar', {
                nome: GetProfile.nome,
                cpf: cpfUnmask(numberCPF),
                email: GetProfile.email,
                telefone: numberTel === '' || numberTel === null ? '' : cellPhoneUnmask(numberTel),
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
            /* toast.success(
                'Cliente Atualizado com Sucesso!', {
                className: 'customToastify-success',
                icon: ({ theme, type }) => <img src={success} alt="" />
            }) */
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

        if (inputNumberTel.length > 11) {
            return;
        }

        let value = inputNumberTel;
        let phone = '';
        if (value.length > 0) {
            phone += '(' + value.slice(0, 2);
        }
        if (value.length > 2) {
            if (value.length <= 10) {
                phone += ') ' + value.slice(2, 6);
            } else if (value.length === 11) {
                phone += ') ' + value.slice(2, 3) + ' ' + value.slice(3, 7);
            }
        }
        if (value.length > 6 && value.length <= 10) {
            phone += '-' + value.slice(6);
        } else if (value.length === 11) {
            phone += '-' + value.slice(7);
        }
        setNumberTel(phone);
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
        setGetProfile({ ...GetProfile, [e.target.name]: e.target.value });
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
                            <input className={`${errorName ? 'errorLine' : ''}`} type="text" placeholder='Digite seu nome' name='nome' value={GetProfile.nome} maxLength={200} onChange={(e) => handleChangeForm(e)} />
                            {errorName && <span className='error'><h1>{errorName}</h1></span>}
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>E-mail*</h1></label>
                            <input className={`${errorEmailEdit ? 'errorLine' : ''}`} type="text" placeholder='Digite seu e-mail' name='email' value={GetProfile.email} maxLength={200} onChange={(e) => handleChangeForm(e)} />
                            {errorEmailEdit && <span className='error'><h1>{errorEmailEdit}</h1></span>}
                        </div>
                        <div className='information-ModalEdit'>
                            <div>
                                <label htmlFor=""><h1>CPF*</h1></label>
                                <input className='cpf' type="text" placeholder='Digite seu CPF' name='cpf' value={numberCPF} maxLength={14} onChange={(e) => handleChangeFormCPF(e)} />
                            </div>
                            <div>
                                <label htmlFor=""><h1>Telefone*</h1></label>
                                <input type="text" placeholder='Digite seu telefone' name='telefone' value={numberTel} maxLength={16} onChange={(e) => handleChangeFormTel(e)} />
                            </div>
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Senha Atual*</h1></label>
                            <div className="password-input">
                                <input className={`${errorPasswordEdit ? 'errorLine' : ''}`} type={showPassword ? "text" : "password"} placeholder='Digite sua Senha' name='senhaAtual' value={GetProfile.senhaAtual} maxLength={200} onChange={(e) => handleChangeForm(e)} />
                                {/* {errorPasswordEdit && <span className='error'><h1>{errorPasswordEdit}</h1></span>} */}
                                <div
                                    className='password-toggle-visibility'
                                    onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                                    style={{
                                        backgroundImage: `url(${showPassword ? openEye : closedEye})`,
                                    }}
                                />
                            </div>
                        </div>
                        <div className='box-info'>
                            <label htmlFor=''><h1>Nova Senha</h1></label>
                            <div className='password-input'>
                                <input
                                    type={showNewPassword ? 'text' : 'password'} placeholder='Digite sua Senha' name='senha' value={GetProfile.senha} maxLength={200} onChange={(e) => handleChangeForm(e)} />
                                <div
                                    className='password-toggle-visibility' onClick={() => setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword)}
                                    style={{ backgroundImage: `url(${showNewPassword ? openEye : closedEye})`, }} />
                            </div>
                            {errorNewPasswordEdit && <span className='error'><h1>{errorNewPasswordEdit}</h1></span>}
                        </div>
                        <div className='box-info'>
                            <label htmlFor=''><h1>Confirmar a Senha</h1></label>
                            <div className='password-input'>
                                <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirme sua senha' name='confirmeSenha' value={GetProfile.confirmeSenha} maxLength={200} onChange={(e) => handleChangeForm(e)} />
                                <div className='password-toggle-visibility' onClick={() => setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)} style={{ backgroundImage: `url(${showConfirmPassword ? openEye : closedEye})`, }} />
                            </div>
                            {errorPasswordAgainEdit && <span className='error'><h1>{errorPasswordAgainEdit}</h1></span>}
                        </div>
                        <div className='ModalDiv-Button'>
                    <button className='ModalEdit-Button'>Continuar</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}