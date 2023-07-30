import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api/api';
<<<<<<< HEAD
import apiCep from '../../../api/apiCep'
import clientSFont from '../../assets/Client(2).svg';
import success from '../../assets/Success-Toast.svg';
import closed from '../../assets/close.svg';
import toastError from '../../assets/toastError.svg';
import { getItem } from '../../../utils/localStorage';
=======
import apiCep from '../../../api/apiCep';
import clientSFont from '../../../assets/Client(2).svg';
import success from '../../../assets/Success-Toast.svg';
import closed from '../../../assets/close.svg';
import toastError from '../../../assets/toastError.svg';
import useUser from '../../../hooks/useUser';
>>>>>>> d0043d54050eb124ad8505073768d0d00d310c8d
import './style.css';

export default function ModalRegister() {
  const { setOpenModalRegister, setClientRegisters, token, setCorArrowBottom, setCorArrowTop } = useUser();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
  });
  const [formAdress, setFormAdress] = useState({
    logradouro: '',
    numero: '',
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
  const [numberCPF, setNumberCPF] = useState('');
  const [numberTel, setNumberTel] = useState('');
  const [numberCEP, setNumberCEP] = useState('')
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
    if (!numberCPF) {
      setErrorCPF('O CPF é obrigatório');
      validate = +1
    }
    if (!numberTel) {
      setErrorPhone('O Telefone é obrigatório');
      validate = +1
    }
    if (validate === 0) {
      sendInformation()
      setOpenModalRegister(false)
    }
    setCorArrowBottom('#3F3F55')
    setCorArrowTop('#3F3F55')
  }
  async function sendInformation() {
    try {
      const response = await api.post("cliente", {
        nome: form.nome,
        cpf: numberCPF.replace(/[.-]/g, ''),
        email: form.email,
        telefone: numberTel.replace(/[.-]/g, '').slice(1, 3).concat(numberTel.replace(/[.-]/g, '').slice(4, 15)),
        ...formAdress
      }, {
        headers: {
          authorization: token,
        }
      });
      ClientCadaster()
      toast.success(
        'Cliente Cadastro com Sucesso!', {
        className: 'customToastify-success',
        icon: ({ theme, type }) => <img src={success} alt="" />
      });
    } catch (error) {
      toast.error(
        error.response.data.message, {
        className: 'customToastify-error',
        icon: ({ theme, type }) => <img src={error} alt="" />
      });
    }
  }
  async function searchCep(event) {
    try {
      const response = await apiCep.get(`${event.target.value}/json/`)
      setFormAdress({
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        cep: event.target.value,
        cidade: response.data.localidade,
        estado: response.data.uf
      })
    } catch (error) {
      toast.error("CEP não encontrado", {
        className: 'customToastify-error',
        icon: ({ theme, type }) => <img src={toastError} alt="" />
      });
    }
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
  function handleChangeFormCEP(e) {
    const inputNumberCEP = e.target.value.replace(/\D/g, '')
    let formattedValue = inputNumberCEP

    if (inputNumberCEP.length > 5) {
      formattedValue = `${inputNumberCEP.slice(0, 5)}-${inputNumberCEP.slice(5, 8)}`;
    }

    setNumberCEP(formattedValue);

    searchCep(numberCEP.replace(/\D/g, ''))
    console.log(numberCEP.replace(/\D/g, ''))
  }
  /* function handleChangeFormNumber(e) {
    const inputNumberCPF = e.target.value.replace(/\D/g, '')

    setFormAdress([...formAdress], numero: inputNumberCPF)
  } */
  function handleChangeFormAdress(event) {
    if (event.target.name === 'numero') {
      const inputNumberHouse = event.target.value.replace(/\D/g, '')
      console.log('entrou aqui')
      setFormAdress({ ...formAdress, numero: inputNumberHouse })
    }

    setFormAdress({ ...formAdress, [event.target.name]: event.target.value })
  }
  function handleChangeForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function ClientCadaster() {
    try {
      const response = await api.get('cliente', {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setClientRegisters((response.data).slice(0, 10));
    } catch (error) {
      toast.error(
        error.response.data.message, {
        className: 'customToastify-error',
        icon: ({ theme, type }) => <img src={error} alt="" />
      });
    }
  }
  return (
    <div className='main-Modal Modal-Register'>
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
              <input className={`${errorCPF ? 'errorLine' : ''}`} type="text" placeholder='Digite o CPF' name='cpf' maxLength={14} value={numberCPF} onChange={(event) => handleChangeFormCPF(event)} />
              {errorCPF && <span className='error'>{errorCPF}</span>}
            </div>
            <div>
              <label htmlFor=""><h1>Telefone*</h1></label>
              <input className={`${errorPhone ? 'errorLine' : ''}`} type="text" placeholder='Digite o telefone' name='telefone' value={numberTel} maxLength={20} onChange={(event) => handleChangeFormTel(event)} />
              {errorPhone && <span className='error'>{errorPhone}</span>}
            </div>
          </div>

          <div className='formAndress'>
            <div>
              <label htmlFor=""><h1>CEP</h1></label>
              <input type="text" maxLength={8} placeholder='Digite o CEP' name='cep' onBlur={(event) => handleChangeFormCEP(event)} />
            </div>
            <div>
              <label htmlFor=""><h1>Número da Residência</h1></label>
              <input type="text" maxLength={4} placeholder='Digite número da residência' name='numero' value={formAdress.numero} onChange={(event) => handleChangeFormAdress(event)} />
            </div>
          </div>
          <label htmlFor=""><h1>Endereço</h1></label>
          <input type="text" placeholder='Digite o endereço' name='logradouro' value={formAdress.logradouro} onChange={(event) => handleChangeFormAdress(event)} />
          <div className='formInformation'>
            <div>
              <label htmlFor=""><h1>Complemento</h1></label>
              <input type="text" placeholder='Digite o complemento' name='complemento' value={formAdress.complemento} onChange={(event) => handleChangeFormAdress(event)} />
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
