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
        setOpenModalEdit,
        setOpenModalEditProfile,
        getUserDetails,
        setIdClientDetail,
    } = useUser();

    const onClick = (type) => {
        if (type === 'home') {
            setImageNavClient(true);
            setImageNavHome(false);
            setImageNavCharge(true);
        } else if (type === 'client') {
            setImageNavClient(false);
            setImageNavHome(true);
            setIdClientDetail(false);
            setImageNavCharge(true);
        } else if (type === 'charge') {
            setImageNavClient(true);
            setImageNavHome(true);
            setImageNavCharge(false);
        }
    }

    async function openModal() {
        setOpenModalEditProfile(true)
        setModalExit(false);
        await getUserDetails();
        setOpenModalEdit(true)
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
                <div className="title circle-perfil" onClick={openModal}>
                    <h1>{resumeName}</h1>
                </div>
            </nav>
        </>
    );
}
