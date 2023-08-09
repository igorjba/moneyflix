import React from 'react';
import chargeIcon from "../../assets/chargesIconBlack.svg";
import chargeIconPink from "../../assets/chargesIconPink.svg";
import clientIcon from "../../assets/clientsIconBlack.svg";
import clientIconPink from "../../assets/clientsIconPink.svg";
import homeIcon from "../../assets/homeIconBlack.svg";
import homePinkIcon from "../../assets/homeIconPink.svg";
import useUser from '../../hooks/useUser';
import setBottom from "../../assets/chevron-up.svg";
import './style.css';

export default function BottomNav() {
    const { resumeName,
        imageNavHome,
        modalExit,
        setModalExit,
        setImageNavHome,
        imageNavClient,
        setImageNavClient,
        imageNavCharge,
        setImageNavCharge,
        openModalEdit,
        setOpenModalEdit
    } = useUser();

    // Define a função onClick aqui
    const onClick = (type) => {
        if (type === 'home') {
            setImageNavClient(true);
            setImageNavHome(false);
            setImageNavCharge(true);
        } else if (type === 'client') {
            setImageNavClient(false);
            setImageNavHome(true);
            setImageNavCharge(true);
        } else if (type === 'charge') {
            setImageNavClient(true);
            setImageNavHome(true);
            setImageNavCharge(false);
        }
    }

    return (
        <>
            <nav className="bottom-nav">
                <div
                    className={`nav-icon ${!imageNavHome && 'active'}`}
                    onClick={() => onClick('home')}
                >
                    <img src={imageNavHome ? homeIcon : homePinkIcon} alt="Inicio" />
                </div>
                <div
                    className={`nav-icon ${!imageNavClient && 'active'}`}
                    onClick={() => onClick('client')}
                >
                    <img src={imageNavClient ? clientIcon : clientIconPink} alt="Cliente" />
                </div>
                <div
                    className={`nav-icon ${!imageNavCharge && 'active'}`}
                    onClick={() => onClick('charge')}
                >
                    <img src={imageNavCharge ? chargeIcon : chargeIconPink} alt="Cobranças" />
                </div>
                <div className="title circle-perfil">
                    <h1>{resumeName}</h1>
                </div>
                <div className="arrow">
                    <img
                        src={setBottom}
                        alt="seta"
                        onClick={() => setModalExit(!modalExit)}
                    />
                    {modalExit && (
                        <LogoutEditUserModal
                            setModalExit={setModalExit}
                            setOpenModalEdit={setOpenModalEdit}
                        />
                    )}
                </div>
            </nav>
        </>
    );
}
