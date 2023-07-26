import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/api';
import success from '../../assets/Success-Toast.svg';
import closed from '../../assets/close.svg';
import { getItem } from '../../utils/storage';
import toastError from '../../assets/toastError.svg'
import './style.css';

export default function ModalEdit({ SetOpenModalEditPerfil, openModalEditPerfil, SetOpenModalEdit }) {
    const [userData, setUserData] = useState([]);
    const token = getItem('token');
    const [errorEmailEdit, setErrorEmailEdit] = useState('');
    const [errorPasswordEdit, setErrorPasswordEdit] = useState('');
    const [form, setForm] = useState({
        name: 'teste',
        email: 'teste@email.com',
        cpf: '123456789',
        phone: '123456789',
        password: '',
        confirmPassword: ''
    });

    function onclickCloseModal() {
        SetOpenModalEditPerfil(!openModalEditPerfil)
        SetOpenModalEdit(false)
    }

    async function UserLogged() {
        try {
            const response = await api.get('usuario/listar', {
                headers: {
                    Authorization: token
                }
            });
            setUserData(response.data)
            console.log(response)
        } catch (error) {
            toast.error(error.response.data.message, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            })
            console.log(error)
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setErrorPasswordEdit('')
        setErrorEmailEdit('')

        if (form.password !== form.confirmPassword) {
            return setErrorPasswordEdit('As senhas não coincidem')
        }

        toast.success(
            'Cliente Cadastro com Sucesso!', {
            className: 'customToastify-success',
            icon: ({ theme, type }) => <img src={success} alt="" />
        })
        SetOpenModalEditPerfil(false)
        SetOpenModalEdit(false)
        console.log(form)
    }

    useEffect(() => {
        UserLogged()
    }, [])

    function handleChangeForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="ModalEdit-Main">
            <div className="header-ModalEdit initial">
                <h2>Edite seu cadastro</h2>
                <img className="closedEdit" src={closed} alt="Fechar" onClick={onclickCloseModal} />
            </div>
            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChangeForm}
                        placeholder="Digite seu nome"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChangeForm}
                        placeholder="Digite seu e-mail"
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={form.cpf}
                            onChange={handleChangeForm}
                            placeholder="Digite seu CPF"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChangeForm}
                            placeholder="Digite seu Telefone"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Nova Senha*</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChangeForm}
                        placeholder="********"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Senha*</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChangeForm}
                        placeholder="********"
                    />
                </div>
                <div className="submit-div">
                    <button className="submit-button">Aplicar</button>
                </div>
            </form>
        </div>
    );
}