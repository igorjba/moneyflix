
import React from 'react';
import { dateDDMMYYYYMask, moneyMask } from '../../../utils/inputMasks';
import closed from '../../../assets/close.svg';
import './style.css';

export default function ChargesModal({ chargeDetails, closeModal }) {
    return (
        <div className="charges-modal-container">
            <div className="charges-modal">
                <img src={closed} alt="Fechar" className="close-button" onClick={closeModal} />
                <h2 className="modal-title">Detalhes da Cobrança</h2>
                <div className="charges-details">
                    <div className="info-detail">
                        <p><strong>Nome:</strong></p>
                        <p>{chargeDetails.cliente}</p>
                    </div>
                    <div className="info-detail">
                        <p><strong>Descrição:</strong></p>
                        <p>{chargeDetails.descricao}</p>
                    </div>
                    <div className="vencimento-valor">
                        <div className="info-detail">
                            <p><strong>Vencimento:</strong></p>
                            <p>{dateDDMMYYYYMask(chargeDetails.vencimento)}</p>
                        </div>
                        <div className="info-detail">
                            <p><strong>Valor:</strong></p>
                            <p>{moneyMask(chargeDetails.valor)}</p>
                        </div>
                    </div>
                    <div className='id-status'>
                        <div className="info-detail id-detail">
                            <p><strong>ID de Cobrança:</strong></p>
                            <p>{chargeDetails.id_cobranca}</p>
                        </div>
                        <div className="info-detail">
                            <p><strong>Status:</strong></p>
                            <p>{chargeDetails.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
