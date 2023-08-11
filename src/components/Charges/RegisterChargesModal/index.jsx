import { NumericFormat, PatternFormat } from "react-number-format";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api/api";
import checkboxGreen from "../../../assets/Checkbox.svg";
import IconCharge from "../../../assets/IconCharge.svg";
import success from "../../../assets/Success-Toast.svg";
import closed from "../../../assets/close.svg";
import useUser from "../../../hooks/useUser";
import { completedName, dateDDMMYYYYMask } from "../../../utils/inputMasks";
import { clearAll } from "../../../utils/localStorage";
import useCharges from "../../../hooks/useCharges";
import "./style.css";

export default function RegisterChargesModal() {
  const {
    openModalCharges,
    setOpenModalCharges,
    errorDate,
    setErrorDate,
    errorDescription,
    setErrorDescription,
    errorValue,
    setErrorValue,
    setVerifyDate,
    verifyDate,
  } = useCharges();
  const { token, setGetInformationClientDetail, getInformationClientDetail } =
    useUser();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [numberValueCharges, setNumberValueCharges] = useState("");
  let validate = 0;
  const [verifyCheckbox, setVerifyCheckbox] = useState(true);
  const [formRegisterCharges, setFormRegisterCharges] = useState({
    descricao: "",
    vencimento: "",
    valor: numberValueCharges,
    status: "Paga",
  });
  function handleSubmitCharges(event) {
    setFormRegisterCharges({
      ...formRegisterCharges,
      [event.target.name]: event.target.value,
    });
  }
  function statusCharges(event) {
    if (event) {
      setVerifyCheckbox(event);
      return setFormRegisterCharges({ ...formRegisterCharges, status: "Paga" });
    }
    if (!event) {
      setVerifyCheckbox(event);
      return setFormRegisterCharges({
        ...formRegisterCharges,
        status: "Pendente",
      });
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
  async function sendInformationCharges(event) {
    event.preventDefault();
    setErrorDescription(""),
      setErrorDate(""),
      setErrorValue("");
    if (!formRegisterCharges.descricao) {
      setErrorDescription("Este campo deve ser preenchido");
      validate = +1;
    }
    if (!numberValueCharges) {
      setErrorValue("Este campo deve ser preenchido");
      validate = +1;
    }
    if (verifyDate > 0) {
      setErrorDate("Este campo deve ser preenchido");
    }
    if (!formRegisterCharges.vencimento) {
      setErrorDate("Este campo deve ser preenchido");
      validate = +1;
    }
    if (validate === 0 && verifyDate === 0) {
      try {
        const response = await api.post(
          `cobranca/cadastro/${openModalCharges.id_user}`,
          {
            ...formRegisterCharges,
            valor: numberValueCharges.replace(/\./g, ""),
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        setOpenModalCharges(() => ({ ...openModalCharges, status: false }));
        setGetInformationClientDetail(!getInformationClientDetail);
        toast.success("Cobrança Cadastrada com Sucesso!", {
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
    setErrorDescription(""),
      setErrorDate(""),
      setErrorValue("");
  }, []);
  return (
    <div className="main-modal-flex modal-charge">
      {/*       <div></div> */}
      <img
        src={closed}
        className="main-modal-flex-close mouse-pointer"
        alt="fechar"
        onClick={() =>
          setOpenModalCharges(() => ({ ...openModalCharges, status: false }))
        }
      />
      <div className="main-modal-flex-header initial">
        <img src={IconCharge} alt="" />
        <h2>Cadastro de Cobrança</h2>
      </div>
      <form onSubmit={sendInformationCharges}>
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
              value={completedName(openModalCharges.nome_user)}
            />
          </div>
          <div className="container-input-description">
            <label htmlFor="descriptionInput" className="mouse-pointer">
              Descrição*
            </label>
            <textarea
              className={`charges-input-description ${errorDescription ? "errorChargesLine" : " "}`}
              id="descriptionInput"
              ref={inputRef}
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
                value={dateDDMMYYYYMask(formRegisterCharges.vencimento)}
                placeholder="  /   /   "
                format="##/##/####"
                name="vencimento"
                onBlur={(event) =>
                  setFormRegisterCharges({
                    ...formRegisterCharges,
                    vencimento: dateSendDatebase(event.target.defaultValue),
                  })} />
              {errorDate && (<span className="errorCharges"><h1>{errorDate}</h1></span>)}
            </div>
            <div className="container-input-value">
              <label htmlFor="valueInput" className="mouse-pointer">
                Valor*
              </label>
              <NumericFormat
                id="valueInput"
                className={`${errorValue ? "errorChargesLine" : ""}`}
                value={formRegisterCharges.valor}
                thousandSeparator="."
                prefix={"R$ "}
                decimalScale={2}
                decimalSeparator=","
                fixedDecimalScale={true}
                allowNegative={false}
                placeholder="0,00"
                name="vencimento"
                onValueChange={(number) => setNumberValueCharges(number.value)}
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
            <div className="testeInput mouse-pointer" onClick={() => statusCharges(true)}>
              <div className="inputParaCheck mouse-pointer" onClick={() => statusCharges(true)}>
                {verifyCheckbox && <img src={checkboxGreen} alt="" />}
              </div>
              <h1>Cobrança Paga</h1>
            </div>
            <div className="testeInput mouse-pointer" onClick={() => statusCharges(false)}>
              <div className="inputParaCheck mouse-pointer" onClick={() => statusCharges(false)}>
                {!verifyCheckbox && <img src={checkboxGreen} alt="" />}
              </div>
              <h1>Cobrança Pendente</h1>
            </div>
          </div>
          <div className="button-form initial">
            <button
              type="button"
              onClick={() =>
                setOpenModalCharges(() => ({
                  ...openModalCharges,
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
