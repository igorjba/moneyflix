import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clientSFont from '../../assets/Client(2).svg';
import closed from '../../assets/close.svg';
import success from '../../assets/Success-Toast.svg'
import './style.css';

export default function ModalRegister({ setOpenModalRegister }) {

  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
  });

  const [formAdress, setFormAdress] = useState({
    logradouro: '',
    complemento: '',
    cep: '',
    bairro: '',
    cidade: '',
    estado: ''
  })

  let validate = 0

  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorCPF, setErrorCPF] = useState('');
  const [errorPhone, setErrorPhone] = useState('');

  const customToastify = {
    background: '#C3D4FE',
    color: '#243F80',
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorName('')
    setErrorEmail('')
    setErrorCPF('')
    setErrorPhone('')
    if (!form.nome) {
      setErrorName('O Nome é obrigatório');
      validate = +1
    }
    if (!form.email) {
      setErrorEmail('O Email é obrigatório');
      validate = +1
    }
    if (!form.cpf) {
      setErrorCPF('O CPF é obrigatório');
      validate = +1
    }
    if (!form.telefone) {
      setErrorPhone('O Telefone é obrigatório');
      validate = +1
    }

    if (validate === 0) {
      toast.success(
        'Cliente Cadastro com Sucesso!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        delay: 1000,
        style: customToastify,
        icon: ({ theme, type }) => <img src={success} alt="" />
      });
      setOpenModalRegister(false)
      sendInformation()

    }
  }

  function sendInformation() {
    console.log(Object.assign(form, formAdress)) //enviar isso para api

    let enviarParaAPI = { ...form, ...formAdress } //da na mesma
  }

  async function searchCep(event) {
    try {
      const response = await apiCep.get(`${event.target.value}/json/`)
      setFormAdress({
        logradouro: response.data.logradouro,
        cep: response.data.cep,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        estado: response.data.uf
      })
    } catch (error) {
      console.log(error)
    }
  }

  function handleChangeForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleChangeFormAdress(event) {
    setFormAdress({ ...formAdress, [event.target.name]: event.target.value })
  }

  return (
    <div className='mainModalRegister'>
      <div className='headerModal initial'>
        <div className='initial'>
          <img src={clientSFont} alt="" />
          <h2>Cadastro do Cliente</h2>
        </div>
        <img src={closed} alt="fechar" onClick={() => setOpenModalRegister(false)} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='divs-inputs-form'>
          <label htmlFor=""><h1>Nome*</h1></label>
          <input className={`${errorName ? 'errorLine' : ''}`} type="text" placeholder='Digite o nome' name='nome' value={form.name} maxLength={200} onChange={(event) => handleChangeForm(event)} />
          {errorName && <span className='error'>{errorName}</span>}
          <label htmlFor=""><h1>E-mail*</h1></label>
          <input className={`${errorEmail ? 'errorLine' : ''}`} type="email" placeholder='Digite o e-mail' name='email' value={form.email} maxLength={200} onChange={(event) => handleChangeForm(event)} />
          {errorEmail && <span className='error'>{errorEmail}</span>}
          <div className='formInformation'>
            <div>
              <label htmlFor=""><h1>CPF*</h1></label>
              <input className={`${errorCPF ? 'errorLine' : ''}`} type="number" placeholder='Digite o CPF' name='cpf' value={form.cpf} maxLength={11} onChange={(event) => handleChangeForm(event)} />
              {errorCPF && <span className='error'>{errorCPF}</span>}
            </div>
            <div>
              <label htmlFor=""><h1>Telefone*</h1></label>
              <input className={`${errorPhone ? 'errorLine' : ''}`} type="number" placeholder='Digite o telefone' name='telefone' value={form.telefone} maxLength={11} onChange={(event) => handleChangeForm(event)} />
              {errorPhone && <span className='error'>{errorPhone}</span>}
            </div>
          </div>
          <label htmlFor=""><h1>Endereço</h1></label>
          <input type="text" placeholder='Digite o endereço' name='logradouro' value={formAdress.logradouro} onChange={(event) => handleChangeFormAdress(event)} />
          <label htmlFor=""><h1>Complemento</h1></label>
          <input type="text" placeholder='Digite o complemento' name='complemento' value={formAdress.complemento} onChange={(event) => handleChangeFormAdress(event)} />
          <div className='formInformation'>
            <div>
              <label htmlFor=""><h1>CEP</h1></label>
              <input type="text" placeholder='Digite o CEP' name='cep' value={formAdress.cep} onChange={(event) => handleChangeFormAdress(event)} onBlur={(event) => searchCep(event)} />
            </div>
            <div>
              <label htmlFor=""><h1>Bairro</h1></label>
              <input type="text" placeholder='Digite o Bairro' name='bairro' value={formAdress.bairro} onChange={(event) => handleChangeFormAdress(event)} />
            </div>
          </div>
          <div className='formAndress'>
            <div>
              <label htmlFor=""><h1>Cidade</h1></label>
              <input type="text" placeholder='Digite o Cidade' name='cidade' value={formAdress.cidade} onChange={(event) => handleChangeFormAdress(event)} />
            </div>
            <div>
              <label htmlFor=""><h1>UF</h1></label>
              <input type="text" placeholder='Digite o UF' name='estado' value={formAdress.estado} onChange={(event) => handleChangeFormAdress(event)} />
            </div>
          </div>
        </div>
        <div className='formButton initial'>
          <button onClick={() => setOpenModalRegister(false)}>Cancelar</button>
          <button type='submit'>Aplicar</button>
        </div>
      </form>

    </div>
  )
}
