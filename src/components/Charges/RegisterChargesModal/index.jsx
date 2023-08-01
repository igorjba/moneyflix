import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api/api';
import IconCharge from '../../../assets/IconCharge.svg';
import success from '../../../assets/Success-Toast.svg';
import closed from '../../../assets/close.svg';
import toastError from '../../../assets/toastError.svg';
import useUser from '../../../hooks/useUser';
import './style.css';

export default function RegisterChargesModal() {
    const { setOpenModalRegisterCharges, token } = useUser();
    const [checkedInputCharge, setCheckedInputCharge] = useState('Pago');
    const [inputTypeChargesDate, setInputTypeChargeDate] = useState('text');
    const [dateValueIso, setDateValueIso] = useState('');
    const [dateValueBr, setDateValueBr] = useState('');

    const handleChangeChargeStatus = (event) => {
        setCheckedInputCharge(event.target.value);
    };

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
    }

    return (
        <div className='main-modal-flex modal-charge'>
            <div></div>
            <img src={closed} className="main-modal-flex-close" alt="fechar" onClick={() => setOpenModalRegisterCharges(false)} />
            <div className='main-modal-flex-header initial'>
                <img src={IconCharge} alt="" />
                <h2>Cadastro de Cobrança</h2>
            </div>
            <form>
                <div className='container-inputs-form'>
                    <div className='container-input-name'>
                        <label for="nameInput">Nome*</label>
                        <input className='charges-input-name' id="nameInput" type="text" placeholder='Digite o nome' name='nome' disabled value={"sara"} />
                    </div>
                    <div className='container-input-description'>
                        <label for="descriptionInput">Descrição*</label>
                        <textarea className='charges-input-description' id="descriptionInput" placeholder='Digite a descrição' name='description' rows="3" cols="50">
                        </textarea>
                    </div>
                    <div className='container-inputs-value-date'>
                        <div className='container-input-date'>
                            <label for="dateInput">Vencimento*</label>
                            {/* <input className='charges-input-date' id="dateInput" type="date" placeholder='Data de vencimento' name='vencimento' /> */}
                            <input
                                className='charges-input-date'
                                id="dateInput"
                                type={inputTypeChargesDate}
                                onFocus={handleFocusInputCharge}
                                onBlur={handleBlurInputCharge}
                                onChange={handleChangeInputCharge}
                                placeholder='Data de vencimento'
                                value={inputType === 'date' ? dateValueIso : dateValueBr}
                                name='vencimento'
                                max="9999-12-28"
                            />
                        </div>
                        <div className='container-input-value'>
                            <label for="valueInput">Valor*</label>
                            <input id="valueInput" type="text" placeholder='Digite o valor' name='valor' />
                        </div>
                    </div>
                    <label for="statusInput">Status*</label>
                    <div className='container-input-status'>
                        <div className='container-input-status container-input-status-paid'>
                            <input id="statusInputPaid" type='checkbox' name='status' value="Pago"
                                checked={checkedInputCharge === 'Pago'}
                                onChange={handleChangeChargeStatus} />
                            <label for="statusInputPaid"></label>
                            {/* <label for="statusInputPaid">Cobrança Paga</label> */}
                        </div>
                        <div className='container-input-status container-input-status-pending'>
                            <input id="statusInputPending" type='checkbox' name='status' value="Pendente"
                                checked={checkedInputCharge === 'Pendente'}
                                onChange={handleChangeChargeStatus} />
                            <label for="statusInputPending"></label>
                            {/* <label for="statusInputPending">Cobrança Pendente</label> */}
                        </div>
                    </div>

                    <div className='formButton initial'>
                        <button type='button' onClick={() => setOpenModalRegisterCharges(false)}>Cancelar</button>
                        <button type='submit'>Aplicar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
