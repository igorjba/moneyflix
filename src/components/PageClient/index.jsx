import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clientSFont from '../../assets/Client(2).svg';
import defaulter from '../../assets/defaulter.svg';
import filter from '../../assets/filter.svg';
import lupa from '../../assets/lupa.svg';
import sets from '../../assets/sets.svg';
import './style.css';
const situation = document.querySelectorAll('.situation');

export default function PageClient({ setOpenModalRegister, setTitle }) {
    setTitle('Clientes')
    function backgroundSituation() {
        situation.forEach(element => {
            if (element.outerText === 'Inadimplente') {
                return element.classList.add('situationDefaulter')
            }

            return element.classList.add('situationOk')
        });
    }
    useEffect(() => {
        backgroundSituation()
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
                                <img src={sets} alt="setas" />
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
                        <tr >
                            <td><h1>Sara da Silva</h1></td>
                            <td><h1>054 365 255 87</h1></td>
                            <td><h1>salasilva@cubos.io</h1></td>
                            <td><h1>71 9 9462 8654</h1></td>
                            <td><div className='div-status'><h1 className='situation'>Inadimplente</h1></div></td>
                            <td>
                                <img src={defaulter} alt="inadimplente" />
                            </td>
                        </tr>
                        <tr >
                            <td><h1>Sara da Silva</h1></td>
                            <td><h1>054 365 255 87</h1></td>
                            <td><h1>salasilva@cubos.io</h1></td>
                            <td><h1>71 9 9462 8654</h1></td>
                            <td><div className='div-status' ><h1 className='situation'>Em dia</h1></div></td>
                            <td>
                                <img src={defaulter} alt="inadimplente" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                theme="light"
            />
        </>
    )
}