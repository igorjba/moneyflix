import { useRef, useState } from 'react';
import clientSFont from '../../../assets/Client(2).svg';
import closed from '../../../assets/close.svg';
import useUser from '../../../hooks/useUser';
import apiCep from '../../../api/apiCep';
import './style.css';
import { cellPhoneMask, cepMask, cepUnmask} from '../../../utils/inputMasks';
import { validateCPF, validateEmail, validateName } from '../../../utils/validation';

export default function EditClientModal() {
    const {setOpenModalEditClient, idListChargesClick} = useUser()
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorCPF, setErrorCPF] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const inputRef = useRef(null);
    const [numberHouse, setNumberHouse] = useState('')
    const [form, setForm] = useState({
    nome: idListChargesClick.client[0].nome_cliente,
    email: idListChargesClick.client[0].email,
    cpf: idListChargesClick.client[0].cpf,
    telefone: cellPhoneMask(idListChargesClick.client[0].telefone),
      });
    const [formAdressEditClient, setFormAdressEditClient] = useState({
        logradouro: (idListChargesClick.client[0].logradouro)/* .concat() */,
            bairro: idListChargesClick.client[0].bairro,
            cep: idListChargesClick.client[0].cep,
            cidade: idListChargesClick.client[0].cidade,
            estado: idListChargesClick.client[0].estado,
            complemento: idListChargesClick.client[0].complemento
      })
      let validate = 0;
      function handleChangeForm(event){
          return setForm({ ...form, [event.target.name]: event.target.value });
        }
      function handleChangeFormAdress(event){
            return setFormAdressEditClient({ ...formAdressEditClient, [event.target.name]: event.target.value });
          }
      async function searchCep(event) {
        try {
          const response = await apiCep.get(`${event.target.value}/json/`)
          setFormAdressEditClient({
            logradouro: response.data.logradouro,/* .concat() */
            bairro: response.data.bairro,
            cep: response.data.cep,
            cidade: response.data.localidade,
            estado: response.data.uf,
            complemento: ''
          })
          console.log(response)
          console.log(formAdressEditClient)
          if(response.data.erro){
            toast.error("CEP não encontrado", {
              className: 'customToastify-error',
              icon: ({ theme, type }) => <img src={toastError} alt="" />
            });
          }
        } catch (error) {
            console.log(error)
          /* toast.error("CEP inválido", {
            className: 'customToastify-error',
            icon: ({ theme, type }) => <img src={toastError} alt="" />
          }); */

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
          setErrorName(validationName.message)
          validate = +1
        }
        const validationEmail = validateEmail(form.email)
        if (!validationEmail.isValid) {
          setErrorEmail(validationEmail.message)
          validate = +1
        }
        const validationCPF = validateCPF(form.cpf)
        if (!validationCPF.isValid) {
          setErrorCPF(validationCPF.message);
          validate = +1
        }
        if (!form.telefone) {
          setErrorPhone('Este campo deve ser preenchido');
          validate = +1
        }
        if (validate === 0) {
            updateClient()
          setOpenModalEditClient(false)
        }
      }
      async function updateClient() {
        try {
          const response = await api.put(`cliente/${idListChargesClick.client[0].id_cliente}`,{
            ...form
          }, {
            headers: {
              authorization: `Bearer ${token}`,
            }
          });
        } catch (error) {
            console.log(error)
          /* toast.error(
            error.response.data.message, {
            className: 'customToastify-error',
            icon: ({ theme, type }) => <img src={error} alt="" />
          }); */
        }
      }


    return (
        <>
            <div className='main-Modal Modal-Register'>
            <div className='initial headerModal'>
        <div className='initial'>
          <img src={clientSFont} alt="" />
          <h2>Editar Cliente</h2>
        </div>
        <img className='mousePointer' src={closed} alt="fechar" onClick={() => setOpenModalEditClient(false)} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='divs-inputs-form'>
          <label htmlFor="inputName"><h1>Nome*</h1></label>
          <input className={`${errorName ? 'errorLine' : ''}`} type="text" id='inputName' ref={inputRef} placeholder='Digite o nome' name='nome' disabled={true} value={form.nome} maxLength={200} onChange={(event) => handleChangeForm(event)} />
          {errorName && <span className='mainModalRegister error'><h1>{errorName}</h1></span>}
          <label htmlFor="inputEmail"><h1>E-mail*</h1></label>
          <input className={`${errorEmail ? 'errorLine' : ''}`} type="email" id='inputEmail' ref={inputRef} placeholder='Digite o e-mail' value={form.email} name='email' maxLength={200} onChange={(event) => handleChangeForm(event)} />
          {errorEmail && <span className='error'><h1>{errorEmail}</h1></span>}
          <div className='formInformation'>
            <div>
              <label htmlFor="inputCPF"><h1>CPF*</h1></label>
              <input className={`${errorCPF ? 'errorLine' : ''}`} type="text" id='inputCPF' ref={inputRef} placeholder='Digite o CPF' name='cpf' value={form.cpf} maxLength={14}  onChange={(event) => handleChangeForm(event)} />
              {errorCPF && <span className='error'><h1>{errorCPF}</h1></span>}
            </div>
            <div>
              <label htmlFor="inputPhone"><h1>Telefone*</h1></label>
              <input className={`${errorPhone ? 'errorLine' : ''}`} type="text" id='inputPhone' ref={inputRef} placeholder='Digite o telefone' name='telefone' value={form.telefone} onChange={(event) => handleChangeForm(event)} />
              {errorPhone && <span className='error'><h1>{errorPhone}</h1></span>}
            </div>
          </div>
          <div className='formAndress'>
            <div>
              <label htmlFor="inputCEP"><h1>CEP</h1></label>
              <input type="text" maxLength={9} placeholder='Digite o CEP' id='inputCEP' ref={inputRef} name='cep' value={formAdressEditClient.cep} onBlur={(event) => searchCep(event)} onChange={(event) => handleChangeFormAdress(event)} />
            </div>
            <div>
              <label htmlFor="inputNumber"><h1>Número da Residência</h1></label>
              <input type="text" maxLength={4} placeholder='Digite número da residência' id='inputNumber' ref={inputRef} name='numero' value={numberHouse} onChange={(event) => handleChangeFormAdress(event)} />
            </div>
          </div>
          <label htmlFor="inputCompl"><h1>Complemento</h1></label>
          <input type="text" placeholder='Digite o complemento' id='inputCompl' ref={inputRef} name='complemento' value={formAdressEditClient.complemento} onChange={(event) => handleChangeFormAdress(event)} />
          <div className='formInformation'>
            <div>
              <label htmlFor="inputAdress"><h1>Endereço</h1></label>
              <input type="text" placeholder='Digite o endereço' id='inputAdress' ref={inputRef} name='logradouro' value={formAdressEditClient.logradouro} onChange={(event) => handleChangeFormAdress(event)} />
            </div>
            <div>
              <label htmlFor="inputNeighborhood"><h1>Bairro</h1></label>
              <input type="text" placeholder='Digite o Bairro' name='bairro' id='inputNeighborhood' value={formAdressEditClient.bairro} ref={inputRef} onChange={(event) => handleChangeFormAdress(event)}/>
            </div>
          </div>
          <div className='formAndress'>
            <div>
              <label htmlFor="inputCity"><h1>Cidade</h1></label>
              <input type="text" placeholder='Digite o Cidade' name='cidade' id='inputCity' ref={inputRef} value={formAdressEditClient.cidade} onChange={(event) => handleChangeFormAdress(event)} />
            </div>
            <div>
              <label htmlFor="inputUF"><h1>UF</h1></label>
              <input type="text" placeholder='Digite o UF' name='estado' id='inputUF' ref={inputRef} value={formAdressEditClient.estado} onChange={(event) => handleChangeFormAdress(event)} />
            </div>
          </div>
        </div>
        <div className='formButton initial'>
          <button type='button' onClick={() => {}}>Cancelar</button>
          <button type='submit'>Aplicar</button>
        </div>
      </form>
            </div>
        </>
    )
}