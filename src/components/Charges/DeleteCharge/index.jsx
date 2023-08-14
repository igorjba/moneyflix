import { toast } from "react-toastify";
import api from "../../../api/api";
import Notification from "../../../assets/Notification.svg";
import success from "../../../assets/Success-Toast.svg";
import closed from "../../../assets/close.svg";
import toastError from "../../../assets/toastError.svg";
import useCharges from "../../../hooks/useCharges";
import useUser from "../../../hooks/useUser";
import "./style.css";

export default function DeleteCharge() {
  const {
    token,
    setGetInformationClientDetail,
    getInformationClientDetail,
    imageNavCharge,
    search
  } = useUser();
  const { ListCharges, openModalDelete, setModalDelete, arrayFilterChargesList, filterName } = useCharges();

  async function deleteChargesList() {
    try {
      const response = await api.delete(
        `cobranca/delete/${openModalDelete.id_charges}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setModalDelete({ ...openModalDelete, status: false });
      
      toast.success("Cobrança excluída com Sucesso!", {
        className: "customToastify-success",
        icon: ({ theme, type }) => <img src={success} alt="" />,
      });
      if(filterName || search){
        const indiceArrayChargesDelete = arrayFilterChargesList.findIndex(cobranca =>  cobranca.id_cobranca === openModalDelete.id_charges);
        arrayFilterChargesList.splice(indiceArrayChargesDelete, 1)
      }
      if (imageNavCharge) {
        return setGetInformationClientDetail(!getInformationClientDetail);
      } else {
        ListCharges();
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={toastError} alt="" />,
      });
    }
  }

  return (
    <div className="container-delete-main">
      <img
        src={closed}
        alt="Fechar"
        className="mouse-pointer closer-container-delete"
        onClick={() => setModalDelete({ ...openModalDelete, status: false })}
      />
      <img src={Notification} alt="Atenção" />
      <h2>Tem certeza que deseja excluir esta cobrança ?</h2>
      <div className="container-button">
        <button
          className="container-delete-no"
          onClick={() => setModalDelete({ ...openModalDelete, status: false })}
        >
          <h1>Não</h1>
        </button>
        <button className="container-delete-yes" onClick={deleteChargesList}>
          <h1>Sim</h1>
        </button>
      </div>
    </div>
  );
}
