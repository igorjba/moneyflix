import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api/api';
import success from '../../../assets/Success-Toast.svg';
import closed from '../../../assets/close.svg';
import toastError from '../../../assets/toastError.svg';
import useUser from '../../../hooks/useUser';
import './style.css';
import { cellPhoneMask, cellPhoneUnmask, cpfMask, cpfUnmask } from '../../../utils/inputMasks';
import { validateEmail, validateName, validatePassword } from '../../../utils/validation';

export default function ModalEdit({ SetOpenModalEdit }) {
    const { SetOpenModalEditPerfil, openModalEditPerfil, token, formEdit, setFormEdit } = useUser();

    const [errorName, setErrorName] = useState('')
    const [errorEmailEdit, setErrorEmailEdit] = useState('');
    const [errorPasswordEdit, setErrorPasswordEdit] = useState('');
    const [errorNewPasswordEdit, setErrorNewPasswordEdit] = useState('')
    const [errorPasswordAgainEdit, setErrorPasswordAgainEdit] = useState('')




    const [numberCPF, setNumberCPF] = useState(cpfMask(formEdit.cpf));
    const [numberTel, setNumberTel] = useState(cellPhoneMask(formEdit.telefone));

    function onclickCloseModal() {
        SetOpenModalEditPerfil(!openModalEditPerfil)
        SetOpenModalEdit(false)
    }
    async function handleSubmitEdit(event) {
        event.preventDefault();
        setErrorName('')
        setErrorPasswordEdit('')
        setErrorEmailEdit('')
        setErrorPasswordAgainEdit('')

        const validationName = validateName(formEdit.nome)
        if (!validationName.isValid) {
            setErrorName(`${validationName.message}`)
        }
        const validationEmail = validateEmail(formEdit.email)
        if (!validationEmail.isValid) {
            setErrorEmailEdit(`${validationName.message}`)
        }
        const validationPassword = validatePassword(formEdit.email)
        if (!validationPassword.isValid) {
            setErrorPasswordEdit(`${validationPassword.message}`)
        }
        if (formEdit.senha !== formEdit.confirmeSenha) {
            setErrorPasswordAgainEdit('As senhas não coincidem');
        }
        try {
            const response = await api.put('usuario/atualizar', {
                nome: formEdit.nome,
                cpf: cpfUnmask(formEdit.cpf),
                email: formEdit.email,
                telefone: cellPhoneUnmask(formEdit.telefone),
                senhaAtual: formEdit.senhaAtual,
                senha: formEdit.senha,
                confirmeSenha: formEdit.confirmeSenha
            }, {
                headers: {
                    authorization: token,
                }
            });
            console.log(response)
            toast.success(
                'Cliente Atualizado com Sucesso!', {
                className: 'customToastify-success',
                icon: ({ theme, type }) => <img src={success} alt="" />
            })
            SetOpenModalEditPerfil(false)
            SetOpenModalEdit(false)
        } catch (error) {
            toast.error(error.response.data.message, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            })
        }
    }

    /* async function UserLogged() {
        try {
            const response = await api.get('usuario', {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            if (response && response.data) {
                cpfInitial = response.data.cpf;
                telefoneInitial = response.data.telefone;
                setNameUser(response.data.nome_usuario)
                setForm({
                    nome: response.data.nome_usuario,
                    email: response.data.email,
                    cpf: response.data.cpf,
                    telefone: response.data.telefone,
                    senha: '',
                    confirmeSenha: ''
                });
                CPFormated(cpfInitial);
                TelFormated(telefoneInitial);
            } else {
                toast.error('Erro ao obter dados do usuário', {
                    className: 'customToastify-error',
                    icon: ({ theme, type }) => <img src={toastError} alt="" />
                });
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            })
        }
    } */
    /* function CPFormated() {
        const inputNumberCPF = cpfInitial.replace(/\D/g, '')
        let formattedValue = inputNumberCPF;
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
    function TelFormated() {
        const inputNumberTel = telefoneInitial.replace(/\D/g, '')
        let formattedValue = inputNumberTel
        if (inputNumberTel.length > 2) {
            formattedValue = `(${inputNumberTel.slice(0, 2)})${inputNumberTel.slice(2)}`;
        }
        if (inputNumberTel.length > 7) {
            formattedValue = `${formattedValue.slice(0, 9)}-${formattedValue.slice(9, 13)}`;
        }
        setNumberTel(formattedValue);

    } */
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
        setFormEdit({ ...formEdit, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        /* CPFormated(formEdit.cpf)
        TelFormated(formEdit.telefone) */
        /* UserLogged() */
    }, [])
    return (
        <div className="main-Modal Modal-Edit">
            <div className='header-ModalEdit initial'>
                <h2>Edite seu cadastro</h2>
                <img className='closedEdit' src={closed} alt="Fechar" onClick={(onclickCloseModal)} />
            </div>
            <div className='main-ModalEdit'>
                <form onSubmit={handleSubmitEdit}>
                    <div className='divs-inputs-form'>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Nome*</h1></label>
                            <input className={`${errorName ? 'errorLine' : ''}`} type="text" placeholder='Digite seu nome' name='nome' value={formEdit.nome} maxLength={200} onChange={handleChangeForm} />
                            {errorName && <span className='error'><h1>{errorName}</h1></span>}
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>E-mail*</h1></label>
                            <input className={`${errorEmailEdit ? 'errorLine' : ''}`} type="text" placeholder='Digite seu e-mail' name='email' value={formEdit.email} maxLength={200} onChange={handleChangeForm} />
                            {errorEmailEdit && <span className='error'><h1>{errorEmailEdit}</h1></span>}
                        </div>
                        <div className='information-ModalEdit'>
                            <div>
                                <label htmlFor=""><h1>CPF</h1></label>
                                <input className='cpf' type="text" placeholder='Digite seu CPF' name='cpf' value={numberCPF} maxLength={14} onChange={handleChangeFormCPF} />
                                {errorPasswordEdit && <span className='error'><h1>{errorPasswordEdit}</h1></span>}
                            </div>
                            <div>
                                <label htmlFor=""><h1>Telefone</h1></label>
                                <input type="text" placeholder='Digite seu telefone' name='telefone' value={numberTel} maxLength={15} onChange={handleChangeFormTel} />
                            </div>
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Senha Atual*</h1></label>
                            <input type="password" placeholder='Digite sua Senha' name='senhaAtual' value={formEdit.senha} maxLength={200} onChange={handleChangeForm} />
                            {errorPasswordEdit && <span className='error'><h1>{errorPasswordEdit}</h1></span>}
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Nova Senha*</h1></label>
                            <input type="password" placeholder='Digite sua Senha' name='senha' value={formEdit.senha} maxLength={200} onChange={handleChangeForm} />
                            {errorNewPasswordEdit && <span className='error'><h1>{errorNewPasswordEdit}</h1></span>}
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Confirmar a Senha*</h1></label>
                            <input className={`${errorPasswordEdit ? 'errorLine' : ''}`} type="passwordAgain" placeholder='Confirme sua senha' name='confirmeSenha' value={formEdit.confirmeSenha} maxLength={200} onChange={handleChangeForm} />
                            {errorPasswordEdit && <span className='error'><h1>{errorPasswordAgainEdit}</h1></span>}
                        </div>
                    </div>
                    <button className='ModalEdit-Button'>Continuar</button>
                </form>
            </div>
        </div>
    )
}