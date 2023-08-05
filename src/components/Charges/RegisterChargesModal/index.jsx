import { useRef, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api/api';
import checkboxGreen from '../../../assets/Checkbox.svg';
import IconCharge from '../../../assets/IconCharge.svg';
import success from '../../../assets/Success-Toast.svg';
import closed from '../../../assets/close.svg';
import useUser from '../../../hooks/useUser';
import { completedName } from '../../../utils/inputMasks';
import { clearAll } from '../../../utils/localStorage';
import './style.css';


export default function RegisterChargesModal() {
    const { setOpenModalRegisterCharges, token, openModalRegisterCharges, setGetInformationClientDetail, getInformationClientDetail } = useUser();
    const [inputTypeChargesDate, setInputTypeChargeDate] = useState('text');
    const [dateValueIso, setDateValueIso] = useState('');
    const [dateValueBr, setDateValueBr] = useState('');
    const [verifyCheckbox, setVerifyCheckbox] = useState(true);
    const [testeNumero, setTesteNumero] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [errorValue, setErrorValue] = useState('')
    const navigate = useNavigate();
    const inputRef = useRef(null);
    let validate = 0
    const [formRegisterCharges, setFormRegisterCharges] = useState({
        descricao: '',
        vencimento: '',
        valor: '',
        status: 'Paga'
    })
    function statusCharges(event) {
        if (event) {
            setVerifyCheckbox(event)
            return setFormRegisterCharges({ ...formRegisterCharges, status: 'Paga' })
        }
        if (!event) {
            setVerifyCheckbox(event)
            return setFormRegisterCharges({ ...formRegisterCharges, status: 'Pendente' })
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

    function handleSubmitCharges(event) {
        setFormRegisterCharges({ ...formRegisterCharges, [event.target.name]: event.target.value });
    }

function backgroundSituation() {
    const situation = document.querySelectorAll(".situation");
    situation.forEach((element) => {
        if (element.textContent == "Inadimplente") {
            element.classList.remove("situationOk");
            return element.classList.add("situationDefaulter");
        }
        element.classList.remove("situationDefaulter");
        return element.classList.add("situationOk");
    });
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
        if (!testeNumero) {
            setErrorValue('Este campo deve ser preenchido')
            validate = +1
        }

        if (!formRegisterCharges.vencimento) {
            setErrorDate('Este campo deve ser preenchido')
            validate = +1
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
                setOpenModalRegisterCharges(() => ({ ...openModalRegisterCharges, status: false }))
                backgroundSituation()
                setGetInformationClientDetail(!getInformationClientDetail)
                toast.success(
                    'Cobrança Cadastrada com Sucesso!', {
                    className: 'customToastify-success',
                    icon: ({ theme, type }) => <img src={success} alt="" />
                });
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401 && error.response.data.message === "token expirado") {
                        clearAll()
                        navigate("/login");
                    } else if (error.response.status === 400 && error.response.data.message === "Não autorizado") {
                        clearAll()
                        navigate("/login");
                    }
                }
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
            <img src={closed} className="main-modal-flex-close mousePointer" alt="fechar" onClick={() => setOpenModalRegisterCharges(() => ({ ...openModalRegisterCharges, status: false }))} />
            <div className='main-modal-flex-header initial'>
                <img src={IconCharge} alt="" />
                <h2>Cadastro de Cobrança</h2>
            </div>
            <form onSubmit={sendInformationCharges}>
                <div className='container-inputs-form'>
                    <div className='container-input-name'>
                        <label htmlFor="nameInput" className='mousePointer'>Nome</label>
                        <input className='charges-input-name' id="nameInput" ref={inputRef} type="text" placeholder='Digite o nome' name='nome' disabled value={completedName(openModalRegisterCharges.nome_user)} />
                    </div>
                    <div className='container-input-description'>
                        <label htmlFor="descriptionInput" className='mousePointer'>Descrição*</label>
                        <textarea className={`charges-input-description ${errorDescription ? 'errorChargesLine' : ' '}`} id="descriptionInput" ref={inputRef} placeholder='Digite a descrição' name='descricao' rows="3" cols="50" onChange={(event) => handleSubmitCharges(event)}>
                        </textarea>
                        {errorDescription && <span className='errorCharges'><h1>{errorDescription}</h1></span>}
                    </div>
                    <div className='container-inputs-value-date'>
                        <div className='container-input-date'>
                            <label htmlFor="dateInput" className='mousePointer'>Vencimento*</label>
                            <input
                                className={`charges-input-date ${errorDate ? 'errorChargesLine' : ''}`}
                                id="dateInput"
                                ref={inputRef}
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
                            <label htmlFor="valueInput" className='mousePointer'>Valor*</label>
                            <NumericFormat
                                id='valueInput'
                                ref={inputRef}
                                className={`${errorValue ? 'errorChargesLine' : ''}`}
                                value={formRegisterCharges.valor}
                                thousandSeparator={true}
                                prefix={'R$ '}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                placeholder="0,00"
                                name='vencimento'
                                onValueChange={(sourceInfo) => { setTesteNumero(sourceInfo.value.replace(/\./g, "")) }}
                            />
                            {errorValue && <span className='errorCharges'><h1>{errorValue}</h1></span>}
                        </div>
                    </div>
                    <div>
                        <h1>Status</h1>
                        <div className='testeInput mousePointer' onClick={() => statusCharges(true)}>
                            <div className='inputParaCheck' onClick={() => statusCharges(true)}>
                                {verifyCheckbox && <img src={checkboxGreen} alt="" />}
                            </div>
                            <h1 >Cobrança Paga</h1>
                        </div>
                        <div className='testeInput mousePointer' onClick={() => statusCharges(false)}>
                            <div className='inputParaCheck' onClick={() => statusCharges(false)}>
                                {!verifyCheckbox && <img src={checkboxGreen} alt="" />}
                            </div>
                            <h1 >Cobrança Pendente</h1>
                        </div>
                    </div>
                    <div className='formButton initial'>
                        <button type='button' onClick={() => setOpenModalRegisterCharges(() => ({ ...openModalRegisterCharges, status: false }))}>Cancelar</button>
                        <button type='submit'>Aplicar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

