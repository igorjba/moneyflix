import React from 'react';
import chargeIcon from "../../assets/chargesIconBlack.svg";
import chargeIconPink from "../../assets/chargesIconPink.svg";
import clientIcon from "../../assets/clientsIconBlack.svg";
import clientIconPink from "../../assets/clientsIconPink.svg";
import homeIcon from "../../assets/homeIconBlack.svg";
import homePinkIcon from "../../assets/homeIconPink.svg";
import useClient from '../../hooks/useClient';
import useUser from '../../hooks/useUser';

export default function BottomNav() {
    const { resumeName,
        imageNavHome,
        setImageNavHome,
        imageNavClient,
        setImageNavClient,
        imageNavCharge,
        setImageNavCharge,
        setOpenEditLogoutMobileModal,
    } = useUser();

    const { idClientDetail, setIdClientDetail } = useClient()

    const onClick = (type) => {
        if (type === 'home') {
            setImageNavClient(true);
            setImageNavHome(false);
            setImageNavCharge(true);
        } else if (type === 'client') {
            setImageNavClient(false);
            setImageNavHome(true);
            setIdClientDetail({ ...idClientDetail, status: false });
            setImageNavCharge(true);
        } else if (type === 'charge') {
            setImageNavClient(true);
            setImageNavHome(true);
            setImageNavCharge(false);
        }
    }

    function handleOpenEditLogoutMobileModal() {
        setOpenEditLogoutMobileModal(true)
    }
    return (
        <>
            <nav className="bottom-nav">
                <div
                    className={`nav-icon ${!imageNavHome && 'bottom-active'}`}
                    onClick={() => onClick('home')}
                >
                    <img src={imageNavHome ? homeIcon : homePinkIcon} alt="Inicio" />
                </div>
                <div
                    className={`nav-icon ${!imageNavClient && 'bottom-active'}`}
                    onClick={() => onClick('client')}
                >
                    <img src={imageNavClient ? clientIcon : clientIconPink} alt="Cliente" />
                </div>
                <div
                    className={`nav-icon ${!imageNavCharge && 'bottom-active'}`}
                    onClick={() => onClick('charge')}
                >
                    <img src={imageNavCharge ? chargeIcon : chargeIconPink} alt="Cobranças" />
                </div>
                <div className="title circle-perfil" onClick={handleOpenEditLogoutMobileModal}>
                    <h1>{resumeName}</h1>
                </div>
            </nav>
        </>
    );
}
