import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/api';
import success from '../../assets/Success-Toast.svg';
import closed from '../../assets/close.svg';
import { getItem } from '../../utils/storage';
import toastError from '../../assets/toastError.svg'
import './style.css';

export default function ModalEdit({ openModalEditPerfil, SetOpenModalEditPerfil, SetOpenModalEdit }) {

    const [userPerfil, setUserPerfil] = useState([]);
    const token = getItem('token');
    const id = getItem('id')
    const [errorEmailEdit, setErrorEmailEdit] = useState('');
    const [errorPasswordEdit, setPasswordEdit] = useState('');
    const [form, setForm] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        senha: ''
    });
    const [senhaigual, SetSenhaIgual] = useState('')


    function onclickCloseModal() {
        SetOpenModalEditPerfil(!openModalEditPerfil)
        SetOpenModalEdit(false)
    }

    async function UserLogged() {
        console.log('entrou aqui')
        try {
            const response = await api.get('usuario/listar', {
                headers: {
                    'authorization': token,
                    'id': id
                }
            });
            setForm(
                {
                    nome: response.data.nome_usuario,
                    email: response.data.email,
                    telefone: response.data.telefone,
                    cpf: response.data.cpf
                }
            )


            setUserPerfil(response.data)
            console.log(userPerfil)
        } catch (error) {
            toast.error(error.response.data.message, {
                className: 'customToastify-error',
                icon: ({ theme, type }) => <img src={toastError} alt="" />
            })
            console.log(error)
        }
    }

    async function handleSubmitEdit(event) {
        event.preventDefault();
        setPasswordEdit('')
        setErrorEmailEdit('')
        console.log(form)

        /* if (form.senha !== form.senhaigual) {
            return setPasswordEdit('As senhas não coincidem')
        } */

        try {
            const response = await api.put('usuario/atualizar', {
                headers: {
                    authorization: token,
                    'id': id
                }
            }, {
                body: {
                    form
                }
            });

            toast.success(
                'Cliente Cadastro com Sucesso!', {
                className: 'customToastify-success',
                icon: ({ theme, type }) => <img src={success} alt="" />
            })

        } catch (error) {
            console.log(error)
        }


        SetOpenModalEditPerfil(false)
        SetOpenModalEdit(false)

    }

    useEffect(() => {
        UserLogged()
    }, [])

    function handleChangeForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="ModalEdit-Main">
            <div className='header-ModalEdit initial'>
                <h2>Edite seu cadastro</h2>
                <img className='closedEdit' src={closed} alt="Fechar" onClick={(onclickCloseModal)} />
            </div>
            <div className='main-ModalEdit'>
                <form onSubmit={handleSubmitEdit}>
                    <label htmlFor=""><h1>Nome*</h1></label>
                    <input type="text" placeholder='Digite seu nome' name='nome' defaultValue={form.nome} maxLength={200} onChange={(event) => handleChangeForm(event)} />
                    <label htmlFor=""><h1>E-mail*</h1></label>
                    <input className={`${errorEmailEdit ? 'errorLine' : ''}`} type="text" placeholder='Digite seu e-mail' name='email' defaultValue={form.email} maxLength={200} onChange={(event) => handleChangeForm(event)} />
                    {errorEmailEdit && <span className='error'>{errorEmailEdit}</span>}
                    <div className='information-ModalEdit'>
                        <div>
                            <label htmlFor=""><h1>CPF</h1></label>
                            <input type="text" placeholder='Digite seu CPF' name='cpf' defaultValue={form.cpf} maxLength={200} onChange={(event) => handleChangeForm(event)} />
                        </div>
                        <div>
                            <label htmlFor=""><h1>Telefone</h1></label>
                            <input type="text" placeholder='Digite seu telefone' name='telefone' defaultValue={form.telefone} maxLength={200} onChange={(event) => handleChangeForm(event)} />
                        </div>
                    </div>
                    <label htmlFor=""><h1>Nova Senha</h1></label>
                    <input type="password" name='senha' value={form.senha} maxLength={200} onChange={(event) => handleChangeForm(event)} />
                    <label htmlFor=""><h1>Confirmar a Senha*</h1></label>
                    <input className={`${errorPasswordEdit ? 'errorLine' : ''}`} type="password" name='senhaigual' /* value={form.senhaigual} */ maxLength={200} onChange={(event) => SetSenhaIgual(event.target.value)} />
                    {errorPasswordEdit && <span className='error'>{errorPasswordEdit}</span>}
                    <button className='ModalEdit-Button' onClick={handleSubmitEdit}>Continuar</button>
                </form>
            </div>
        </div>
    )
}