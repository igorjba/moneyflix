import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../api/api';
import closedEye from "../../../assets/ClosedEye.svg";
import openEye from "../../../assets/OpenEye.svg";
import closed from '../../../assets/close.svg';
import toastError from '../../../assets/toastError.svg';
import useUser from '../../../hooks/useUser';
import { FullName, cellPhoneMask, cellPhoneUnmask, completedName, cpfMask, cpfUnmask, removeSpace } from '../../../utils/inputMasks';
import { clearAll } from '../../../utils/localStorage';
import { validateEmail, validateName, validatePassword } from '../../../utils/validation';
import './style.css';

export default function EditUserModal({ setOpenModalEdit }) {
    const { setOpenModalEditProfile, openModalEditProfile, token, setNameUser, setGetProfile, getProfile, setOpenModalEditProfileSuccess } = useUser();
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
    const inputRef = useRef(null);

    useEffect(() => {
        setNumberCPF(cpfMask(getProfile.cpf));
        setNumberTel(cellPhoneMask(getProfile.telefone));
        setGetProfile({ ...getProfile, nome: completedName(getProfile.nome) })
    }, []);

    function onclickCloseModal() {
        setOpenModalEditProfile(!openModalEditProfile)
        setOpenModalEdit(false)
    }

    async function handleSubmitEdit(event) {
        event.preventDefault();
        setErrorName('')
        setErrorPasswordEdit('')
        setErrorEmailEdit('')
        setErrorPasswordAgainEdit('')

        const validationName = validateName(getProfile.nome)
        if (!validationName.isValid) {
            setErrorName(`${validationName.message}`)
        }
        const validationEmail = validateEmail(getProfile.email)
        if (!validationEmail.isValid) {
            setErrorEmailEdit(`${validationName.message}`)
        }
        const validationPassword = validatePassword(getProfile.senhaAtual)
        if (!validationPassword.isValid) {
            setErrorPasswordEdit(`${validationPassword.message}`)
        }
        if (getProfile.senha !== getProfile.confirmeSenha) {
            setErrorPasswordAgainEdit('As senhas não coincidem');
        }
        if (!getProfile.senhaAtual) {
            setErrorPasswordEdit('Digite sua senha')
        }

        try {
            const response = await api.put('usuario/atualizar', {
                nome: getProfile.nome,
                cpf: cpfUnmask(numberCPF),
                email: getProfile.email,
                telefone: numberTel === '' || numberTel === null ? '' : cellPhoneUnmask(numberTel),
                senhaAtual: getProfile.senhaAtual,
                senha: getProfile.senha,
                confirmeSenha: getProfile.confirmeSenha
            }, {
                headers: {
                    authorization: token,
                }
            });
            localStorage.setItem("name", getProfile.nome);
            setNameUser(getProfile.nome);
            setOpenModalEditProfile(false)
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
        setGetProfile({ ...getProfile, [e.target.name]: e.target.value });
    }

    return (
        <div className="edit-user-modal Modal-Edit">
            <div className='header-ModalEdit initial'>
                <h2>Edite seu cadastro</h2>
                <img className='main-modal-flex-close' src={closed} alt="Fechar" onClick={(onclickCloseModal)} />
            </div>
            <form className="edit-user-modal-form" onSubmit={handleSubmitEdit}>
                <div className='box-info'>
                    <label htmlFor="nameEditUser" className='mouse-pointer'><h1>Nome*</h1></label>
                    <input className={`${errorName ? 'errorLine' : ''}`} id='nameEditUser' ref={inputRef} type="text" placeholder='Digite seu nome' name='nome' value={getProfile.nome} maxLength={200} onChange={(e) => handleChangeForm(e)} />
                    {errorName && <span className='error'>{errorName}</span>}
                </div>
                <div className='box-info'>
                    <label htmlFor="emailEditUser" className='mouse-pointer'><h1>E-mail*</h1></label>
                    <input className={`${errorEmailEdit ? 'errorLine' : ''}`} id='emailEditUser' ref={inputRef} type="text" placeholder='Digite seu e-mail' name='email' value={getProfile.email} maxLength={200} onChange={(e) => handleChangeForm(e)} />
                    {errorEmailEdit && <span className='error'>{errorEmailEdit}</span>}
                </div>
                <div className='information-ModalEdit'>
                    <div>
                        <label htmlFor="cpfEditUser" className='mouse-pointer'><h1>CPF</h1></label>
                        <input id='cpfEditUser' ref={inputRef} className='cpf' type="text" placeholder='Digite seu CPF' name='cpf' value={numberCPF} maxLength={14} onChange={(e) => handleChangeFormCPF(e)} />
                    </div>
                    <div>
                        <label htmlFor="phoneEditUser" className='mouse-pointer'><h1>Telefone</h1></label>
                        <input id='phoneEditUser' ref={inputRef} type="text" placeholder='Digite seu telefone' name='telefone' value={numberTel} maxLength={16} onChange={(e) => handleChangeFormTel(e)} />
                    </div>
                </div>
                <div className='box-info'>
                    <label htmlFor="passwordEditUser" className='mouse-pointer'><h1>Senha Atual*</h1></label>
                    <div className="password-input">
                        <input className={`${errorPasswordEdit ? 'errorLine' : ''}`} id='passwordEditUser' ref={inputRef} type={showPassword ? "text" : "password"} placeholder='Digite sua Senha' name='senhaAtual' value={getProfile.senhaAtual} maxLength={200} onChange={(e) => handleChangeForm(e)} />
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
                    <label htmlFor='passwordNewEditUser' className='mouse-pointer'><h1>Nova Senha</h1></label>
                    <div className='password-input'>
                        <input
                            className={`${errorNewPasswordEdit ? 'errorLine' : ''}`} type={showNewPassword ? 'text' : 'password'} id='passwordNewEditUser' ref={inputRef} placeholder='Digite sua Senha' name='senha' value={getProfile.senha} maxLength={200} onChange={(e) => handleChangeForm(e)} />
                        <div
                            className='password-toggle-visibility' onClick={() => setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword)}
                            style={{ backgroundImage: `url(${showNewPassword ? openEye : closedEye})`, }} />
                    </div>
                    {errorNewPasswordEdit && <span className='error'>{errorNewPasswordEdit}</span>}
                </div>
                <div className='box-info'>
                    <label htmlFor='confPasswordNewEditUser' className='mouse-pointer'><h1>Confirmar a Senha</h1></label>
                    <div className='password-input'>
                        <input className={`${errorPasswordAgainEdit ? 'errorLine' : ''}`} type={showConfirmPassword ? 'text' : 'password'} id='confPasswordNewEditUser' ref={inputRef} placeholder='Confirme sua senha' name='confirmeSenha' value={getProfile.confirmeSenha} maxLength={200} onChange={(e) => handleChangeForm(e)} />
                        <div className='password-toggle-visibility' onClick={() => setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)} style={{ backgroundImage: `url(${showConfirmPassword ? openEye : closedEye})`, }} />
                    </div>
                    {errorPasswordAgainEdit && <span className='error'>{errorPasswordAgainEdit}</span>}
                </div>
                <div className='ModalDiv-Button'>
                    <button className='edit-modal-button'>Aplicar</button>
                </div>
            </form>
        </div >
    )
}