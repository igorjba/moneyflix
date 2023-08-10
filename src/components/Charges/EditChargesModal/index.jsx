import { useEffect, useRef, useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api/api";
import checkboxGreen from "../../../assets/Checkbox.svg";
import IconCharge from "../../../assets/IconCharge.svg";
import success from "../../../assets/Success-Toast.svg";
import closed from "../../../assets/close.svg";
import useCharges from "../../../hooks/useCharges";
import useUser from "../../../hooks/useUser";
import useClientUser from "../../../hooks/useClientUser";
import { completedName, dateDDMMYYYYMask } from "../../../utils/inputMasks";
import { clearAll } from "../../../utils/localStorage";
import "./style.css";

export default function EditChargesModal() {
  const {
    openModalEditCharges,
    setOpenModalEditCharges,
    errorDate,
    setErrorDate,
    errorDescription,
    setErrorDescription,
    errorValue,
    setErrorValue,
    ListCharges,
    verifyDate,
    setVerifyDate,
  } = useCharges();
  const { token, setGetInformationClientDetail, getInformationClientDetail } =
    useUser();
  const { idClientDetail } = useClientUser();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  let validate = 0;

  const [formEditCharges, setFormEditCharges] = useState({
    descricao: openModalEditCharges.description,
    vencimento: openModalEditCharges.date,
    valor: openModalEditCharges.value,
    status: openModalEditCharges.statusPage,
  });
  const [verifyCheckboxCharges, setVerifyCheckboxCharges] = useState(
    openModalEditCharges.statusPage === "Paga" ? true : false
  );
  function handleSubmitCharges(event) {
    setFormEditCharges({
      ...formEditCharges,
      [event.target.name]: event.target.value,
    });
  }
  function statusCharges(event) {
    if (event) {
      setVerifyCheckboxCharges(event);
      return setFormEditCharges({ ...formEditCharges, status: "Paga" });
    }
    if (!event) {
      setVerifyCheckboxCharges(event);
      return setFormEditCharges({ ...formEditCharges, status: "Pendente" });
    }
  }
  function dateSendDatebase(event) {
    const spreadNumber = event.split("/");
    const [day, month, year] = spreadNumber;
    setVerifyDate(0);

    if (spreadNumber.length !== 3) {
      setVerifyDate(1);
    }
    return `${year}-${month}-${day}`;
  }
  async function sendInformationEditCharges(event) {
    event.preventDefault();
    setErrorDescription(""), setErrorDate(""), setErrorValue("");
    if (!formEditCharges.descricao) {
      setErrorDescription("Este campo deve ser preenchido");
      validate = +1;
    }
    if (!formEditCharges.valor) {
      setErrorValue("Este campo deve ser preenchido");
      validate = +1;
    }
    if (verifyDate > 0) {
      setErrorDate("Este campo deve ser preenchido");
    }
    if (validate === 0 && verifyDate === 0) {
      try {
        const response = await api.put(
          `cobranca/editar/${openModalEditCharges.id_charges}`,
          {
            ...formEditCharges,
            valor: formEditCharges.valor.replace(/\./g, ""),
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        setOpenModalEditCharges(() => ({
          ...openModalEditCharges,
          status: false,
        }));
        idClientDetail && ListCharges();
        setGetInformationClientDetail(!getInformationClientDetail);

        toast.success("Cobrança Atualizada com Sucesso!", {
          className: "customToastify-success",
          icon: ({ theme, type }) => <img src={success} alt="" />,
        });
      } catch (error) {
        if (error.response) {
          if (
            error.response.status === 401 &&
            error.response.data.message === "token expirado"
          ) {
            clearAll();
            navigate("/login");
          } else if (
            error.response.status === 400 &&
            error.response.data.message === "Não autorizado"
          ) {
            clearAll();
            navigate("/login");
          }
        }
        toast.error(console.log(error), error.response.data.message, {
          className: "customToastify-error",
          icon: ({ theme, type }) => <img src={error} alt="" />,
        });
      }
    }
  }
  useEffect(() => {
    setErrorDescription(""), setErrorDate(""), setErrorValue("");
  }, []);
  return (
    <div className="main-modal-flex modal-charge">
      <div></div>
      <img
        src={closed}
        className="main-modal-flex-close mouse-pointer"
        alt="fechar"
        onClick={() =>
          setOpenModalEditCharges(() => ({
            ...openModalEditCharges,
            status: false,
          }))
        }
      />
      <div className="main-modal-flex-header initial">
        <img src={IconCharge} alt="" />
        <h2>Editar de Cobrança</h2>
      </div>
      <form onSubmit={sendInformationEditCharges}>
        <div className="container-inputs-form">
          <div className="container-input-name">
            <label htmlFor="nameInput" className="mouse-pointer">
              Nome
            </label>
            <input
              className="charges-input-name"
              id="nameInput"
              ref={inputRef}
              type="text"
              placeholder="Digite o nome"
              name="nome"
              disabled
              value={completedName(openModalEditCharges.nome_user)}
            />
          </div>
          <div className="container-input-description">
            <label htmlFor="descriptionInput" className="mouse-pointer">
              Descrição*
            </label>
            <textarea
              className={`charges-input-description ${
                errorDescription ? "errorChargesLine" : " "
              }`}
              id="descriptionInput"
              ref={inputRef}
              value={formEditCharges.descricao}
              placeholder="Digite a descrição"
              name="descricao"
              rows="3"
              cols="50"
              onChange={(event) => handleSubmitCharges(event)}
            ></textarea>
            {errorDescription && (
              <span className="errorCharges">
                <h1>{errorDescription}</h1>
              </span>
            )}
          </div>
          <div className="container-inputs-value-date">
            <div className="container-input-date">
              <label htmlFor="dateInput" className="mouse-pointer">
                Vencimento*
              </label>
              <PatternFormat
                id="dateInput"
                className={`${errorDate ? "errorChargesLine" : ""}`}
                displayType="input"
                value={dateDDMMYYYYMask(formEditCharges.vencimento)}
                format="##/##/####"
                name="vencimento"
                onBlur={(event) =>
                  setFormEditCharges({
                    ...formEditCharges,
                    vencimento: dateSendDatebase(event.target.defaultValue),
                  })
                }
              />
              {errorDate && (
                <span className="errorCharges">
                  <h1>{errorDate}</h1>
                </span>
              )}
            </div>
            <div className="container-input-value">
              <label htmlFor="valueInput" className="mouse-pointer">
                Valor*
              </label>
              <NumericFormat
                id="valueInput"
                ref={inputRef}
                className={`${errorValue ? "errorChargesLine" : ""}`}
                value={openModalEditCharges.value / 100}
                thousandSeparator="."
                prefix={"R$ "}
                decimalScale={2}
                decimalSeparator=","
                placeholder="0,00"
                name="vencimento"
                allowNegative={false} //não pode numero negativo
                fixedDecimalScale={true} //fixar numeros decimais só 2 casas nao sei confirmar
                onValueChange={(number) => {
                  setFormEditCharges({
                    ...formEditCharges,
                    valor: number.value,
                  });
                }}
              />
              {errorValue && (
                <span className="errorCharges">
                  <h1>{errorValue}</h1>
                </span>
              )}
            </div>
          </div>
          <div>
            <h1>Status</h1>
            <div
              className="testeInput mouse-pointer"
              onClick={() => statusCharges(true)}
            >
              <div
                className="inputParaCheck"
                onClick={() => statusCharges(true)}
              >
                {verifyCheckboxCharges && <img src={checkboxGreen} alt="" />}
              </div>
              <h1>Cobrança Paga</h1>
            </div>
            <div
              className="testeInput mouse-pointer"
              onClick={() => statusCharges(false)}
            >
              <div
                className="inputParaCheck"
                onClick={() => statusCharges(false)}
              >
                {!verifyCheckboxCharges && <img src={checkboxGreen} alt="" />}
              </div>
              <h1>Cobrança Pendente</h1>
            </div>
          </div>
          <div className="formButton initial">
            <button
              type="button"
              onClick={() =>
                setOpenModalEditCharges(() => ({
                  ...openModalEditCharges,
                  status: false,
                }))
              }
            >
              Cancelar
            </button>
            <button type="submit">Aplicar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
