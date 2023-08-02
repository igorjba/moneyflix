import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api/api';
import IconCharge from '../../../assets/IconCharge.svg';
import success from '../../../assets/Success-Toast.svg';
import closed from '../../../assets/close.svg';
import toastError from '../../../assets/toastError.svg';
import checkboxGreen from '../../../assets/Checkbox.svg'
import useUser from '../../../hooks/useUser';
import {NumericFormat} from 'react-number-format';
import './style.css';

export default function RegisterChargesModal() {
    const {setOpenModalRegistercharges, token, openModalRegisterCharges} = useUser();
    const [inputTypeChargesDate, setInputTypeChargeDate] = useState('text');
    const [dateValueIso, setDateValueIso] = useState('');
    const [dateValueBr, setDateValueBr] = useState('');
    const [verifyCheckbox, setVerifyCheckbox] = useState(true);
    const [testeNumero, setTesteNumero] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [errorValue, setErrorValue] = useState('')
    /* let numeroEnvoar = 0 */
    let validate = 0
    const [formRegisterCharges, setFormRegisterCharges] = useState({
        descricao: '',
        vencimento: '',
        valor: '',
        status: 'Paga'
    })
    function statusCharges(event){
        if(event){
            setVerifyCheckbox(event)
            return setFormRegisterCharges({...formRegisterCharges, status: 'Paga'})
        }
        if(!event) {
            setVerifyCheckbox(event)
            return setFormRegisterCharges({...formRegisterCharges, status: 'Pendente'})
        }
    }
    const handleFocusInputCharge = () => {
        setInputTypeChargeDate('date');
    }

    const handleBlurInputCharge = () => {
        setInputTypeChargeDate('text');
    }

    const handleChangeInputCharge = (event) => {
        const value = event.target.value;
        setDateValueIso(value);
        if (value.includes('-')) {
            const parts = value.split('-');
            setDateValueBr(`${parts[2]}/${parts[1]}/${parts[0]}`);
        }

        formRegisterCharges.vencimento = event.target.value
    }

    /* function handleSubmitChargesNumber(event){
        numeroEnvoar = event.replace(/,/g, "").replace(/\./g, "")
    } */

    function handleSubmitCharges(event){
        setFormRegisterCharges({ ...formRegisterCharges, [event.target.name]: event.target.value });   
    }


async function sendInformationCharges(event) {
    event.preventDefault()
    setErrorDescription(''),
    setErrorDate(''),
    setErrorValue('')

    if (!formRegisterCharges.descricao) {
        setErrorDescription('Este campo deve ser preenchido');
        validate = +1
      }
      if(!testeNumero){
        setErrorValue('Este campo deve ser preenchido')
        validate =+1
      }

      if(!formRegisterCharges.vencimento){
        setErrorDate('Este campo deve ser preenchido')
        validate =+1
      }

      if (validate === 0) {
    try {
      const response = await api.post(`cobranca/cadastro/${openModalRegisterCharges.id_user}`, {
        ...formRegisterCharges,
        valor: testeNumero
      }, {
        headers: {
          authorization: token,
        }
      });
      setOpenModalRegistercharges({...openModalRegisterCharges, status: false })
      toast.success(
        'Cobrança Cadastrada com Sucesso!', {
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
}
    
    return (
        <div className='main-modal-flex modal-charge'>
            <div></div>
            <img src={closed} className="main-modal-flex-close" alt="fechar" onClick={() => setOpenModalRegistercharges({...openModalRegisterCharges, status: false })} />
            <div className='main-modal-flex-header initial'>
                <img src={IconCharge} alt="" />
                <h2>Cadastro de Cobrança</h2>
            </div>
            <form onSubmit={sendInformationCharges}>
                <div className='container-inputs-form'>
                    <div className='container-input-name'>
                        <label for="nameInput">Nome</label>
                        <input className='charges-input-name' id="nameInput" type="text" placeholder='Digite o nome' name='nome' disabled value={openModalRegisterCharges.nome_user} />
                    </div>
                    <div className='container-input-description'>
                        <label for="descriptionInput">Descrição*</label>
                        <textarea className={`charges-input-description ${errorDescription ? 'errorChargesLine' : ' '}`} id="descriptionInput" placeholder='Digite a descrição' name='descricao' rows="3" cols="50" onChange={(event) => handleSubmitCharges(event)}>
                        </textarea>
                        {errorDescription && <span className='errorCharges'><h1>{errorDescription}</h1></span>}
                    </div>
                    <div className='container-inputs-value-date'>
                        <div className='container-input-date'>
                            <label for="dateInput">Vencimento*</label>
                            <input
                                className={`charges-input-date ${errorDate ? 'errorChargesLine' : ''}`}
                                id="dateInput"
                                type={inputTypeChargesDate}
                                onFocus={handleFocusInputCharge}
                                onBlur={handleBlurInputCharge}
                                onChange={handleChangeInputCharge}
                                placeholder='Data de vencimento'
                                value={inputTypeChargesDate === 'date' ? dateValueIso : dateValueBr}
                                name='vencimento'
                                max="9999-12-28"
                            />
                            {errorDate && <span className='errorCharges'><h1>{errorDate}</h1></span>}
                        </div>
                        <div className='container-input-value'>
                            <label for="valueInput">Valor*</label>
                            <NumericFormat 
                            className={`${errorValue ? 'errorChargesLine' : ''}`}
                            value={formRegisterCharges.valor}
                            thousandSeparator={true}
                            prefix={'R$ '}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            allowNegative={false}
                            placeholder="0,00"
                            name='vencimento'
                            /* onValueChange={(sourceInfo) => {handleSubmitChargesNumber(sourceInfo.value)}} */
                            //onValueChange={(sourceInfo) => {numeroEnvoar = sourceInfo.value.replace(/\./g, "")}}
                            onValueChange={(sourceInfo) => {setTesteNumero(sourceInfo.value.replace(/\./g, ""))}}
                            />
                            {errorValue && <span className='errorCharges'><h1>{errorValue}</h1></span>}
                            {/* <input id="valueInput" type="text" placeholder='Digite o valor' name='valor' value={formRegisterCharges.valor} onChange={(event) => handleSubmitCharges(event)} /> */}
                        </div>
                    </div>
                    <div>
                    <h1>Status</h1>
                    <div className='testeInput'>
                    <div className='inputParaCheck' onClick={() => statusCharges(true) }>
                    {verifyCheckbox && <img src={checkboxGreen} alt="" />}
                    </div>
                    <h1>Cobrança Paga</h1>
                    </div>
                    <div className='testeInput'>
                    <div className='inputParaCheck' onClick={() => statusCharges(false)}>
                    {!verifyCheckbox && <img src={checkboxGreen} alt="" /> }
                    </div>
                    <h1>Cobrança Pendente</h1>
                    </div>
                    </div>
                    <div className='formButton initial'>
                        <button type='button' onClick={() => setOpenModalRegistercharges({...openModalRegisterCharges, status: false })}>Cancelar</button>
                        <button type='submit'>Aplicar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

