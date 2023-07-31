import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api/api';
import apiCep from '../../../api/apiCep';
import clientSFont from '../../../assets/Client(2).svg';
import success from '../../../assets/Success-Toast.svg';
import closed from '../../../assets/close.svg';
import toastError from '../../../assets/toastError.svg';
import useUser from '../../../hooks/useUser';
import './style.css';
import { validateCPF, validateEmail, validateName } from '../../../utils/validation';
import { cpfUnmask, cellPhoneUnmask, cepUnmask, cellPhoneMask, cpfMask, cepMask } from '../../../utils/inputMasks';

export default function RegisterClientModal() {
  const { setOpenModalRegister, setClientRegisters, token, setCorArrowBottom, setCorArrowTop } = useUser();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
  });
  const [numberHouse, setNumberHouse] = useState('')
  const [formAdress, setFormAdress] = useState({
    logradouro: ''.concat(numberHouse),
    complemento: '',
    cep: '',
    bairro: '',
    cidade: '',
    estado: ''
  })
  let validate = 0
  const [formErrorRegisterModal, setFormErrorRegisterModal] = useState({
    errorName: '',
    errorEmail: '',
    errorCPF: '',
    errorPhone: ''
  })
  



  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorCPF, setErrorCPF] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
/*   const [numberCPF, setNumberCPF] = useState('');
  const [numberTel, setNumberTel] = useState('');
  const [numberCEP, setNumberCEP] = useState(''); */
  const [validationInputDisabled, setValidationInputDisabled] = useState(false)
  

 

 /*  function handleChangeNumber(e){
    const inputNumberTel = e.target.value.replace(/\D/g, '')
    setNumberHouse(inputNumberTel)
    
  } */
  /* function handleChangeFormTel(e) {
    setNumberTel(cellPhoneMask(e.target.value))
  } */
  /* function handleChangeFormCPF(e) {
    setNumberCPF(cpfMask(e.target.value))
  } */
  /* async function handleChangeFormCEP(e) {
    setNumberCEP(cepMask(e.target.value));
  } */
  /* function handleChangeFormAdress(event) {
    if (event.target.name === 'numero') {
      const inputNumberHouse = event.target.value.replace(/\D/g, '')
      setFormAdress({ ...formAdress, numero: inputNumberHouse })
    }

    setFormAdress({ ...formAdress, [event.target.name]: event.target.value })
  } */
  /* function handleChangeForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  } */

  function handleChangeForm(event){
    if(event.target.name === 'nome' || event.target.name === 'email'){
      return setForm({ ...form, [event.target.name]: event.target.value });
    }

    if(event.target.name === 'logradouro' || event.target.name === 'complemento' || event.target.name === 'bairro' ||  event.target.name === 'cidade' || event.target.name === 'estado'){
      return setFormAdress({ ...formAdress, [event.target.name]: event.target.value })
    }

    if(event.target.name === 'cpf'){
      return setForm({ ...form, [event.target.name]: cpfMask(event.target.value) });
    }

    if(event.target.name === 'telefone'){
      return setForm({...form, [event.target.name]: cellPhoneMask(event.target.value)})
    }

    if(event.target.name === 'cep'){
      return setFormAdress({ ...formAdress, [event.target.name]: setNumberCEP(cepMask(event.target.value)) });
    }

    if(event.target.name === 'numero'){
      const inputNumberTel = event.target.value.replace(/\D/g, '')
    setNumberHouse(inputNumberTel)
    }
  }




  async function searchCep(event) {
    const cepSearch = event.target.value.replace(/\D/g, '')
    try {
      const response = await apiCep.get(`${cepSearch}/json/`)
      setFormAdress({
        logradouro: (response.data.logradouro).concat(),
        bairro: response.data.bairro,
        cep: cepUnmask(response.data.cep),
        cidade: response.data.localidade,
        estado: response.data.uf
      })
      setValidationInputDisabled(true)
      if(response.data.erro){
        toast.error("CEP não encontrado", {
          className: 'customToastify-error',
          icon: ({ theme, type }) => <img src={toastError} alt="" />
        });
        setValidationInputDisabled(false)
      }
    } catch (error) {
      toast.error("CEP inválido", {
        className: 'customToastify-error',
        icon: ({ theme, type }) => <img src={toastError} alt="" />
      });
      setValidationInputDisabled(false)
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    setErrorName('')
    setErrorEmail('')
    setErrorCPF('')
    setErrorPhone('')
    const validationName = validateName(form.nome)
    if (!validationName.isValid) {
      setErrorName(`${validationName.message}`)
      validate = +1
    }

    const validationEmail = validateEmail(form.email)
    if (!validationEmail.isValid) {
      setErrorEmail(`${validationEmail.message}`)
      validate = +1
    }

    const validationCPF = validateCPF(cpfUnmask(form.cpf))
    if (!validationCPF.isValid) {
      setErrorCPF(`${validationCPF.message}`);
      validate = +1
    }
    if (!form.telefone) {
      setErrorPhone('Este campo deve ser preenchido');
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
        cpf: cpfUnmask(form.cpf),
        email: form.email,
        telefone: cellPhoneUnmask(form.telefone),
        ...formAdress
      }, {
        headers: {
          authorization: token,
        }
      });
      console.log(response)
      ClientCadaster()
      toast.success(
        'Cliente Cadastro com Sucesso!', {
        className: 'customToastify-success',
        icon: ({ theme, type }) => <img src={success} alt="" />
      });
    } catch (error) {
      console.log(error)
      toast.error(
        error.response.data.message, {
        className: 'customToastify-error',
        icon: ({ theme, type }) => <img src={error} alt="" />
      });
    }
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
          {errorName && <span className='mainModalRegister error'><h1>{errorName}</h1></span>}
          <label htmlFor=""><h1>E-mail*</h1></label>
          <input className={`${errorEmail ? 'errorLine' : ''}`} type="email" placeholder='Digite o e-mail' name='email' value={form.email} maxLength={200} onChange={(event) => handleChangeForm(event)} />
          {errorEmail && <span className='error'><h1>{errorEmail}</h1></span>}
          <div className='formInformation'>
            <div>
              <label htmlFor=""><h1>CPF*</h1></label>
              <input className={`${errorCPF ? 'errorLine' : ''}`} type="text" placeholder='Digite o CPF' name='cpf' maxLength={14} value={form.cpf} onChange={(event) => handleChangeForm(event)} />
              {errorCPF && <span className='error'><h1>{errorCPF}</h1></span>}
            </div>
            <div>
              <label htmlFor=""><h1>Telefone*</h1></label>
              <input className={`${errorPhone ? 'errorLine' : ''}`} type="text" placeholder='Digite o telefone' name='telefone' value={form.telefone} maxLength={20} onChange={(event) => handleChangeForm(event)} />
              {errorPhone && <span className='error'><h1>{errorPhone}</h1></span>}
            </div>
          </div>
          <div className='formAndress'>
            <div>
              <label htmlFor=""><h1>CEP</h1></label>
              <input type="text" maxLength={9} placeholder='Digite o CEP' name='cep' value={formAdress.cep} onBlur={(event) => searchCep(event)} onChange={(event) => handleChangeForm(event)} />
            </div>
            <div>
              <label htmlFor=""><h1>Número da Residência</h1></label>
              <input type="text" maxLength={4} placeholder='Digite número da residência' name='numero' value={numberHouse} onChange={(event) => handleChangeForm(event)} />
            </div>
          </div>
          <label htmlFor=""><h1>Complemento</h1></label>
          <input type="text" placeholder='Digite o complemento' name='complemento' value={formAdress.complemento} onChange={(event) => handleChangeForm(event)} />
          <div className='formInformation'>
            <div>
              <label htmlFor=""><h1>Endereço</h1></label>
              <input type="text" placeholder='Digite o endereço' name='logradouro' disabled={validationInputDisabled} value={formAdress.logradouro} onChange={(event) => handleChangeForm(event)} />
            </div>
            <div>
              <label htmlFor=""><h1>Bairro</h1></label>
              <input type="text" placeholder='Digite o Bairro' name='bairro' value={formAdress.bairro} disabled={validationInputDisabled} onChange={(event) => handleChangeForm(event)} />
            </div>
          </div>
          <div className='formAndress'>
            <div>
              <label htmlFor=""><h1>Cidade</h1></label>
              <input type="text" placeholder='Digite o Cidade' name='cidade' disabled={validationInputDisabled} value={formAdress.cidade} onChange={(event) => handleChangeForm(event)} />
            </div>
            <div>
              <label htmlFor=""><h1>UF</h1></label>
              <input type="text" placeholder='Digite o UF' name='estado' disabled={validationInputDisabled } value={formAdress.estado} onChange={(event) => handleChangeForm(event)} />
            </div>
          </div>
        </div>
        <div className='formButton initial'>
          <button type='button' onClick={() => setOpenModalRegister(false)}>Cancelar</button>
          <button type='submit'>Aplicar</button>
        </div>
      </form>
    </div>
  )
}
