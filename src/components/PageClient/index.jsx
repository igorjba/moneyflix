import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import clientSFont from '../../assets/Client(2).svg';
import defaulter from '../../assets/defaulter.svg';
import filter from '../../assets/filter.svg';
import lupa from '../../assets/lupa.svg';
import api from '../../api/api.jsx'
import './style.css';
import { getItem } from '../../utils/storage';

export default function PageClient({ setOpenModalRegister }) {
    const [clientRegisters, setClientRegisters] = useState([])
    const [corarrowTop, setCorArrowTop] = useState('#3F3F55')
    const [corarrowBottom, setCorArrowBottom] = useState('#3F3F55')
    const [countOrder, setCountOrder] = useState(0)
    const token = getItem('token')
    async function ClientCadaster() {
        try {
            const response = await api.get('cliente', {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            setClientRegisters(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    function backgroundSituation() {
        const situation = document.querySelectorAll('.situation');
        situation.forEach(element => {
            if (element.textContent == 'Inadimplente') {
                return element.classList.add('situationDefaulter')
            }
            return element.classList.add('situationOk')
        });
    }
    function orderName() {
        setCountOrder(countOrder + 1)
        if (countOrder === 1) {
            const order = clientRegisters.slice().sort(function (a, b) {
                let x = a.nome_cliente
                let y = b.nome_cliente

                return x == y ? 0 : x > y ? 1 : - 1
            })
            setCorArrowTop('#3F3F55')
            setCorArrowBottom('#DA0175')
            setClientRegisters(order)
        }
        if (countOrder === 2) {
            const order = clientRegisters.slice().sort(function (a, b) {
                let x = a.nome_cliente
                let y = b.nome_cliente
                return x == y ? 0 : x < y ? 1 : - 1
            })
            setCorArrowBottom('#3F3F55')
            setCorArrowTop('#DA0175')
            setClientRegisters(order)
        }
        if (countOrder === 3) {
            ClientCadaster()
            setCorArrowBottom('#3F3F55')
            setCorArrowTop('#3F3F55')
            setCountOrder(0);
        }


    }
    useEffect(() => {
        backgroundSituation()
    })
    useEffect(() => {
        ClientCadaster()
    }, [])
    return (
        <>
            <div className='initial header'>
                <div className='initial client-header'>
                    <img src={clientSFont} alt="Client" />
                    <h2>Clientes</h2>
                </div>
                <div className='initial search-filter-client'>
                    <button className='addClient' onClick={() => setOpenModalRegister(true)}><h1> + Adicionar Cliente </h1></button>
                    <button className='button-filter'>
                        <img src={filter} alt="Filtrar" />
                    </button>
                    <div>
                        <input placeholder='Pesquisa' type="text" name="Filter nome" />
                        <img src={lupa} alt="" className='search' />
                    </div>
                </div>
            </div>
            <div className='tableClient'>
                <table>
                    <thead className='header-table-client'>
                        <tr >
                            <th className='ClientOrder'>
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => orderName()}>
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
                            <th><h1>CPF</h1></th>
                            <th><h1>E-mail</h1></th>
                            <th><h1>Telefone</h1></th>
                            <th><h1>Status</h1></th>
                            <th><h1>Criar Cobrança</h1></th>
                        </tr>
                    </thead>
                    <tbody className='extract-table-client'>
                        {clientRegisters.map((client) => {
                            return (
                                <tr key={client.id_cliente}>
                                    <td><h1>{client.nome_cliente}</h1></td>
                                    <td><h1>{client.cpf}</h1></td>
                                    <td><h1>{client.email}</h1></td>
                                    <td><h1>{client.telefone}</h1></td>
                                    <td><div className='div-status'><h1 className='situation'>{client.status}</h1></div></td>
                                    <td>
                                        <img src={defaulter} alt="inadimplente" />
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