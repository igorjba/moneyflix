import { useEffect, useState } from 'react';
import deleteCharge from '../../../assets/DeleteCharge.svg';
import editCharge from '../../../assets/Edit.svg';
import filter from '../../../assets/Filter.svg';
import lupa from '../../../assets/Lupa.svg';
import iconCharge from '../../../assets/IconCharge.svg';
import useUser from '../../../hooks/useUser';
import api from '../../../api/api'
import './style.css';
import { completedName, dateDDMMYYYYMask, moneyMask } from '../../../utils/inputMasks';
import { clearAll } from '../../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import success from '../../../assets/Success-Toast.svg';
import toastError from '../../../assets/toastError.svg';
import { toast } from 'react-toastify';

export default function ChargesListPage() {
    const { setTitle, token } = useUser();
    const [infoClientCharges, setInfoClientCharges] = useState([])
    const [countOrder, setCountOrder] = useState(1)
    const [countOrderIdCharges, setcountOrderIdCharges] = useState(1)
    const [corarrowTop, setCorArrowTop] = useState('#3F3F55')
    const [corarrowBottom, setCorArrowBottom] = useState('#3F3F55')
    const [corarrowTopId, setCorArrowTopId] = useState('#3F3F55')
    const [corarrowBottomId, setCorArrowBottomId] = useState('#3F3F55')
    const navigate = useNavigate()
    function backgroundSituation() {
        const status = document.querySelectorAll('.status-text');
        status.forEach(element => {
            if (element.textContent === 'Vencida') {
                return element.classList.add('statusDefeated')
            }
            else if (element.textContent === 'Pendente') {
                return element.classList.add('statusPending')
            } else if (element.textContent === 'Paga') {
                return element.classList.add('statusPay')
            }
        });
    }
    async function ListCharges(){
        try {
            const response = await api.get('cobranca', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setInfoClientCharges(response.data)
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 401 || error.response.status === 400 ) {
                clearAll()
                navigate("/login");
                            }
                            toast.error(error.response.data.message, {
                                className: 'customToastify-error',
                                icon: ({ theme, type }) => <img src={toastError} alt="" />
                            })

        }
    }
    
    function orderName() {
        setCountOrder(countOrder + 1)
        if (countOrder === 1) {
            const order = infoClientCharges.slice().sort(function (a, b) {
                let x = a.cliente.toUpperCase()
                let y = b.cliente.toUpperCase()

                return x == y ? 0 : x > y ? 1 : - 1
            })
            setCorArrowTop('#3F3F55')
            setCorArrowBottom('#DA0175')
            setInfoClientCharges(order)
        }
        if (countOrder === 2) {
            const order = infoClientCharges.slice().sort(function (a, b) {
                let x = a.cliente.toUpperCase()
                let y = b.cliente.toUpperCase()
                return x == y ? 0 : x < y ? 1 : - 1
            })
            setCorArrowBottom('#3F3F55')
            setCorArrowTop('#DA0175')
            setInfoClientCharges(order)
        }
        if (countOrder === 3) {
            ListCharges()
            setCorArrowBottom('#3F3F55')
            setCorArrowTop('#3F3F55')
            setCountOrder(1);
        }
    }
    function orderIdCharges() {
        setcountOrderIdCharges(countOrderIdCharges + 1)
        if (countOrderIdCharges === 1) {
            const orderId = infoClientCharges.slice().sort(function (a, b) {
                return a.id_cobranca - b.id_cobranca
            })
            setCorArrowTopId('#3F3F55')
            setCorArrowBottomId('#DA0175')
            setInfoClientCharges(orderId)
        }
        if (countOrderIdCharges === 2) {
            ListCharges()
            setCorArrowBottomId('#3F3F55')
            setCorArrowTopId('#3F3F55')
            setcountOrderIdCharges(1);
        }
    }
    useEffect(() => {
        backgroundSituation()
    }, [infoClientCharges])
    useEffect(() =>{
        ListCharges()
        setTitle('Cobranças')
        backgroundSituation()
    }, [])


    return (
        <>
            <div className='container-page-charges initial'>
                <div className='initial charge-header'>
                    <img src={iconCharge} alt="Cobrança" />
                    <h2>Cobrança</h2>
                </div>
                <div className='initial search-filter-client'>
                    <button className='button-filter'>
                        <img src={filter} alt="Filtrar" />
                    </button>
                    <div>
                        <input placeholder='Pesquisa' type="text" name="Filter nome" />
                        <img src={lupa} alt="Lupa" className='search' />
                    </div>
                </div>
            </div>
            <div className='tableAll'>
                <table>
                    <thead className='header-table-client'>
                        <tr >
                            <th className='PageOrderClient mousePointer' onClick={() => orderName()}>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <g id="Frame" clipPath="url(#clip0_84440_3278)">
                                        <g id="Group">
                                            <path id="Vector" d="M9.5 10.5L9.5 23.25" stroke={corarrowBottom} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path id="Vector_2" d="M12.5 20.25L9.5 23.25L6.5 20.25" stroke={corarrowBottom} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path id="Vector_3" d="M15.5 13.5L15.5 0.75" stroke={corarrowTop} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path id="Vector_4" d="M12.5 3.75L15.5 0.75L18.5 3.75" stroke={corarrowTop} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_84440_3278">
                                            <rect width="24" height="24" fill="white" transform="translate(24.5) rotate(90)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <h1>Cliente</h1>
                            </th>
                            <th className='PageOrderID mousePointer' onClick={() => orderIdCharges()}>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <g id="Frame" clipPath="url(#clip0_84440_3278)">
                                        <g id="Group">
                                            <path id="Vector" d="M9.5 10.5L9.5 23.25" stroke={corarrowBottomId} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path id="Vector_2" d="M12.5 20.25L9.5 23.25L6.5 20.25" stroke={corarrowBottomId} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path id="Vector_3" d="M15.5 13.5L15.5 0.75" stroke={corarrowTopId} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path id="Vector_4" d="M12.5 3.75L15.5 0.75L18.5 3.75" stroke={corarrowTopId} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_84440_3278">
                                            <rect width="24" height="24" fill="white" transform="translate(24.5) rotate(90)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <h1>ID Cob.</h1>
                            </th>
                            <th><h1>Valor</h1></th>
                            <th><h1>Data de venc.</h1></th>
                            <th><h1>Status</h1></th>
                            <th className='description-table-header'><h1>Descrição</h1></th>
                            <th className='imagem-table-header'></th> {/* Juntar as imagem com a descrição ou fazer um a parte porém retornando vazio */}
                        </tr>
                    </thead>
                    <tbody>
                        {infoClientCharges.map((charges) =>{
                            return( 
                        <tr className='extract-table' key={charges.id_cobranca}>
                            <td className='description-table'><h1 >{completedName(charges.cliente)}</h1></td>
                            <td><h1>{charges.id_cobranca}</h1></td>
                            <td><h1>{moneyMask(charges.valor)}</h1></td>
                            <td><h1>{dateDDMMYYYYMask(charges.vencimento)}</h1></td>
                            <td><div className='div-status-charge'><h1 className='status-text'>{charges.status}</h1></div></td>
                            <td className='description-table description-table-charge'><h1>{charges.descricao}</h1></td>
                            <td className='imagem-table-charge'>
                                <img src={editCharge} alt="Editar" />
                                <img src={deleteCharge} alt="Deletar" />
                            </td>
                        </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}