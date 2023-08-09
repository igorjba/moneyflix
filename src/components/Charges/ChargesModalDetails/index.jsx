import React from 'react';
import { dateDDMMYYYYMask, moneyMask } from '../../../utils/inputMasks';
import closed from '../../../assets/close.svg';
import iconCharge from '../../../assets/IconCharge.svg';
import './style.css';
import useCharges from '../../../hooks/useCharges';

export default function ChargesModal() {
    const {setOpenModalDetailCharges, openModalDetailCharges} = useCharges()

    return (
        <div className="charges-modal-container">
            <div className="charges-modal">
                <img src={closed} alt="Fechar" className="close-button" onClick={() => setOpenModalDetailCharges({...openModalDetailCharges, status:false})} />
                <div className="modal-title-container">
                    <img src={iconCharge} alt="Ícone de Cobrança" className="charge-icon" />
                    <h2 className="modal-title">Detalhes da Cobrança</h2>
                </div>
                <div className="charges-details">
                    <div className="info-detail">
                        <p><strong>Nome</strong></p>
                        <p>{openModalDetailCharges.informationDetail.charges.cliente}</p>
                    </div>
                    <div className="description-detail">
                        <p><strong>Descrição</strong></p>
                        <p>{openModalDetailCharges.informationDetail.charges.descricao}</p>
                    </div>
                    <div className="vencimento-valor">
                        <div className="info-detail">
                            <p><strong>Vencimento</strong></p>
                            <p>{dateDDMMYYYYMask(openModalDetailCharges.informationDetail.charges.vencimento)}</p>
                        </div>
                        <div className="info-detail">
                            <p><strong>Valor</strong></p>
                            <p>{moneyMask(openModalDetailCharges.informationDetail.charges.valor)}</p>
                        </div>
                    </div>
                    <div className='id-status'>
                        <div className="info-detail id-detail">
                            <p><strong>ID de Cobrança</strong></p>
                            <p>{openModalDetailCharges.informationDetail.charges.id_cobranca}</p>
                        </div>
                        <div className="info-detail">
                            <p><strong>Status</strong></p>
                            <p className={`status-text ${openModalDetailCharges.informationDetail.charges.status === 'Vencida' ? 'statusDefeated' : openModalDetailCharges.informationDetail.charges.status === 'Pendente' ? 'statusPending' : openModalDetailCharges.informationDetail.charges.status === 'Paga' ? 'statusPay' : ''}`}>
                                {openModalDetailCharges.informationDetail.charges.status}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}