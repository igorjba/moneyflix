import { useEffect } from 'react';
import deleteCharge from '../../../assets/DeleteCharge.svg';
import editCharge from '../../../assets/Edit.svg';
import filter from '../../../assets/Filter.svg';
import lupa from '../../../assets/Lupa.svg';
import iconCharge from '../../../assets/IconCharge.svg';
import useUser from '../../../hooks/useUser';
import './style.css';

export default function ChargesListPage() {
    const { setTitle } = useUser();
    setTitle('Cobranças')
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
    useEffect(() => {
        backgroundSituation()
    })


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
                            <th className='PageOrderClient'>
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Frame" clip-path="url(#clip0_84440_3278)">
                                        <g id="Group">
                                            <path id="Vector" d="M9.5 10.5L9.5 23.25" stroke="#3F3F55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Vector_2" d="M12.5 20.25L9.5 23.25L6.5 20.25" stroke="#3F3F55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Vector_3" d="M15.5 13.5L15.5 0.75" stroke="#3F3F55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Vector_4" d="M12.5 3.75L15.5 0.75L18.5 3.75" stroke="#3F3F55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
                            <th className='PageOrderID'>
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Frame" clip-path="url(#clip0_84440_3278)">
                                        <g id="Group">
                                            <path id="Vector" d="M9.5 10.5L9.5 23.25" stroke="#3F3F55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Vector_2" d="M12.5 20.25L9.5 23.25L6.5 20.25" stroke="#3F3F55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Vector_3" d="M15.5 13.5L15.5 0.75" stroke="#3F3F55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path id="Vector_4" d="M12.5 3.75L15.5 0.75L18.5 3.75" stroke="#3F3F55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_84440_3278">
                                            <rect width="24" height="24" fill="white" transform="translate(24.5) rotate(90)" />
                                        </clipPath>
                                    </defs></svg>
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
                        <tr className='extract-table'>
                            <td><h1>Sara Silva</h1></td>
                            <td><h1>248563147</h1></td>
                            <td><h1>R$ 500,00</h1></td>
                            <td><h1>26/01/2021</h1></td>
                            <td><div className='div-status-charge'><h1 className='status-text'>Vencida</h1></div></td>
                            <td className='description-table description-table-charge'><h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, earum.</h1></td>
                            <td className='imagem-table-charge'>
                                <img src={editCharge} alt="Editar" />
                                <img src={deleteCharge} alt="Deletar" />
                            </td>
                        </tr>
                        <tr className='extract-table'>
                            <td><h1>Sara Silva</h1></td>
                            <td><h1>248563147</h1></td>
                            <td><h1>R$ 500,00</h1></td>
                            <td><h1>26/01/2021</h1></td>
                            <td><div className='div-status-charge'><h1 className='status-text'>Paga</h1></div></td>
                            <td className='description-table description-table-charge'><h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, earum.</h1></td>
                            <td className='imagem-table-charge'>
                                <img src={editCharge} alt="Editar" />
                                <img src={deleteCharge} alt="Deletar" />
                            </td>
                        </tr>
                        <tr className='extract-table'>
                            <td><h1>Sara Silva</h1></td>
                            <td><h1>248563147</h1></td>
                            <td><h1>R$ 500,00</h1></td>
                            <td><h1>26/01/2021</h1></td>
                            <td><div className='div-status-charge'><h1 className='status-text'>Pendente</h1></div></td>
                            <td className='description-table description-table-charge'><h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, earum.</h1></td>
                            <td className='imagem-table-charge'>
                                <img src={editCharge} alt="Editar" />
                                <img src={deleteCharge} alt="Deletar" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}