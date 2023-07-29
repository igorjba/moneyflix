import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/api';
import success from '../../assets/Success-Toast.svg';
import closed from '../../assets/close.svg';
import toastError from '../../assets/toastError.svg';
import { getItem } from '../../utils/localStorage';
import './style.css';

export default function ModalEdit({ openModalEditPerfil, SetOpenModalEditPerfil, SetOpenModalEdit, formUser }) {
    const [userPerfil, setUserPerfil] = useState([]);
    const token = getItem('token');
    const [errorEmailEdit, setErrorEmailEdit] = useState('');
    const [errorPasswordEdit, setPasswordEdit] = useState('');
    const [form, setForm] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        senha: '',
        confirmeSenha: ''
    });
    const [numberCPF, setNumberCPF] = useState(form.cpf);
    const [numberTel, setNumberTel] = useState(form.telefone);
    let cpfInitial = '';
    let telefoneInitial
    function onclickCloseModal() {
        SetOpenModalEditPerfil(!openModalEditPerfil)
        SetOpenModalEdit(false)
    }
    async function handleSubmitEdit(event) {
        event.preventDefault();
        setPasswordEdit('')
        setErrorEmailEdit('')
        if (form.senha !== form.confirmeSenha) {
            return setPasswordEdit('As senhas não coincidem')
        }
        try {
            const response = await api.put('usuario/atualizar', {
                nome: form.nome,
                cpf: numberCPF.replace(/[.-]/g, ''),
                email: form.email,
                telefone: numberTel.replace(/[.-]/g, '').slice(1, 3).concat(numberTel.replace(/[.-]/g, '').slice(4, 15)),
                senha: form.senha,
                confirmeSenha: form.confirmeSenha
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
            toast.error(error.response.data.error, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            })
        }
    }
    function handleChangeForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    async function UserLogged() {
        try {
            const response = await api.get('usuario', {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            cpfInitial = response.data.cpf
            telefoneInitial = response.data.telefone
            setForm(
                {
                    nome: response.data.nome_usuario,
                    email: response.data.email,
                    cpf: response.data.cpf,
                    telefone: response.data.telefone,
                }
            )
            CPFormated(cpfInitial)
            TelFormated(telefoneInitial)
        } catch (error) {
            toast.error(error.response.data.message, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            })
        }
    }
    function CPFormated() {
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

    }
    function handleChangeFormTel(e) {
        const inputNumberTel = e.target.value.replace(/\D/g, '')
        let formattedValue = inputNumberTel
        if (inputNumberTel.length > 2) {
            formattedValue = `(${inputNumberTel.slice(0, 2)})${inputNumberTel.slice(2)}`;
        }
        if (inputNumberTel.length > 7) {
            formattedValue = `${formattedValue.slice(0, 9)}-${formattedValue.slice(9, 13)}`;
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
    useEffect(() => {
        UserLogged()
    }, [])
    return (
        <div className="ModalEdit-Main">
            <div className='header-ModalEdit initial'>
                <h2>Edite seu cadastro</h2>
                <img className='closedEdit' src={closed} alt="Fechar" onClick={(onclickCloseModal)} />
            </div>
            <div className='main-ModalEdit'>
                <form onSubmit={handleSubmitEdit}>
                    <label htmlFor=""><h1>Nome*</h1></label>
                    <input type="text" placeholder='Digite seu nome' name='nome' value={form.nome} defaultValue={form.nome} maxLength={200} onChange={(event) => handleChangeForm(event)} />
                    <label htmlFor=""><h1>E-mail*</h1></label>
                    <input className={`${errorEmailEdit ? 'errorLine' : ''}`} type="text" placeholder='Digite seu e-mail' name='email' value={form.email} defaultValue={form.email} maxLength={200} onChange={(event) => handleChangeForm(event)} />
                    {errorEmailEdit && <span className='error'>{errorEmailEdit}</span>}
                    <div className='information-ModalEdit'>
                        <div>
                            <label htmlFor=""><h1>CPF</h1></label>
                            <input className='cpf' type="text" placeholder='Digite seu CPF' name='cpf' value={numberCPF} defaultValue={numberCPF} maxLength={14} onChange={(event) => handleChangeFormCPF(event)} />
                        </div>
                        <div>
                            <label htmlFor=""><h1>Telefone</h1></label>
                            <input type="text" placeholder='Digite seu telefone' name='telefone' value={numberTel} defaultValue={numberTel} maxLength={15} onChange={(event) => handleChangeFormTel(event)} />
                        </div>
                    </div>
                    <label htmlFor=""><h1>Nova Senha</h1></label>
                    <input type="password" name='senha' value={form.senha} maxLength={200} onChange={(event) => handleChangeForm(event)} />
                    <label htmlFor=""><h1>Confirmar a Senha*</h1></label>
                    <input className={`${errorPasswordEdit ? 'errorLine' : ''}`} type="password" name='confirmeSenha' value={form.confirmeSenha} maxLength={200} onChange={(event) => handleChangeForm(event)} />
                    {errorPasswordEdit && <span className='error'>{errorPasswordEdit}</span>}
                    <button className='ModalEdit-Button' onClick={handleSubmitEdit}>Continuar</button>
                </form>
            </div>
        </div>
    )
}