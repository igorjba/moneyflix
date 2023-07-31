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

export default function EditUserModal({ SetOpenModalEdit }) {
    const { SetOpenModalEditPerfil, openModalEditPerfil, token, formEdit, setFormEdit } = useUser();

    const [errorName, setErrorName] = useState('')
    const [errorEmailEdit, setErrorEmailEdit] = useState('');
    const [errorSenhaAtual, setErrorSenhaAtual] = useState('');
    const [errorCpfEdit, setErrorCpfEdit] = useState('');
    const [errorPasswordAgainEdit, setErrorPasswordAgainEdit] = useState('')



    const [numberCPF, setNumberCPF] = useState(cpfMask(formEdit.cpf || ''));
    const [numberTel, setNumberTel] = useState(cellPhoneMask(formEdit.telefone || ''));
    function onclickCloseModal() {
        SetOpenModalEditPerfil(!openModalEditPerfil)
        SetOpenModalEdit(false)

    }

    function isValidCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11) {
            return false;
        }

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    }
    async function handleSubmitEdit(event) {
        event.preventDefault();
        setErrorName('');
        setErrorEmailEdit('');
        setErrorCpfEdit('');
        setErrorSenhaAtual('');
        setErrorPasswordAgainEdit('');

        const validationName = validateName(formEdit.nome);
        if (!validationName.isValid) {
            setErrorName(`${validationName.message}`);
        }

        const validationEmail = validateEmail(formEdit.email);
        if (!validationEmail.isValid) {
            setErrorEmailEdit(`${validationEmail.message}`);
        }

        const validationPassword = validatePassword(formEdit.senhaAtual);
        if (!validationPassword.isValid) {
            setErrorSenhaAtual(`${validationPassword.message}`);
        }


        const cpfValue = cpfUnmask(formEdit.cpf);
        if (!cpfValue) {
            setErrorCpfEdit('CPF deve ser preenchido');
        } else if (!isValidCPF(cpfValue)) {
            setErrorCpfEdit('CPF inválido');
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
                senha: formEdit.senha,
                senhaAtual: formEdit.senhaAtual,
                confirmeSenha: formEdit.confirmeSenha
            }, {
                headers: {
                    authorization: token,
                }
            });

            toast.success(
                'Cliente Atualizado com Sucesso!', {
                className: 'customToastify-success',
                icon: ({ theme, type }) => <img src={success} alt="" />
            })
            SetOpenModalEditPerfil(false)
            SetOpenModalEdit(false)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, {
                    className: 'customToastify-error',
                    icon: ({ theme, type }) => <img src={toastError} alt="" />
                });
            } else {
                // Lidar com outros erros inesperados
                console.error('Ocorreu um erro inesperado:', error);
            }
        }
    }


    function handleChangeFormTel(e) {
        const inputNumberTel = e.target.value.replace(/\D/g, '');
        setNumberTel(cellPhoneMask(inputNumberTel));
        setFormEdit({ ...formEdit, telefone: cellPhoneUnmask(inputNumberTel) });
    }

    function handleChangeFormCPF(e) {
        const inputNumberCPF = e.target.value.replace(/\D/g, '');
        setNumberCPF(cpfMask(inputNumberCPF));
        setFormEdit({ ...formEdit, cpf: cpfUnmask(inputNumberCPF) });
    }
    function handleChangeForm(e) {
        setFormEdit({ ...formEdit, [e.target.name]: e.target.value })
    }
    useEffect(() => {
    }, [formEdit.nome])
    return (
        <div className="Modal-Edit">
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
                                <label htmlFor=""><h1>CPF*</h1></label>
                                <input className='cpf' type="text" placeholder='Digite seu CPF' name='cpf' value={numberCPF} maxLength={14} onChange={handleChangeFormCPF} />
                                {errorCpfEdit && <span className='error'><h1>{errorCpfEdit}</h1></span>}
                            </div>
                            <div>
                                <label htmlFor=""><h1>Telefone</h1></label>
                                <input type="text" placeholder='Digite seu telefone' name='telefone' value={numberTel} maxLength={15} onChange={handleChangeFormTel} />
                            </div>
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Senha Atual*</h1></label>
                            <input type="password" placeholder='Digite sua Senha' name='senhaAtual' value={formEdit.senhaAtual} maxLength={200} onChange={handleChangeForm} />
                            {errorSenhaAtual && <span className='error'><h1>{errorSenhaAtual}</h1></span>}
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Nova Senha</h1></label>
                            <input type="password" placeholder='Digite sua Senha' name='senha' value={formEdit.senha} maxLength={200} onChange={handleChangeForm} />
                        </div>
                        <div className='box-info'>
                            <label htmlFor=""><h1>Confirmar a Senha</h1></label>
                            <input className={`${errorPasswordAgainEdit ? 'errorLine' : ''}`} type="password" placeholder='Confirme sua senha' name='confirmeSenha' value={formEdit.confirmeSenha} maxLength={200} onChange={handleChangeForm} />                            {errorPasswordAgainEdit && <span className='error'><h1>{errorPasswordAgainEdit}</h1></span>}
                        </div>
                    </div>
                    <button className='ModalEdit-Button'>Continuar</button>
                </form>
            </div>
        </div>
    )
}