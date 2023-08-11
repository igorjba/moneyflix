import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/api";
import apiCep from "../../../api/apiCep";
import clientSFont from "../../../assets/Client(2).svg";
import success from "../../../assets/Success-Toast.svg";
import closed from "../../../assets/close.svg";
import toastError from "../../../assets/toastError.svg";
import useClient from "../../../hooks/useClient";
import useUser from "../../../hooks/useUser";
import {
  cellPhoneMask,
  cellPhoneUnmask,
  cepMask,
  cepUnmask,
  completedName,
  cpfMask,
  cpfUnmask
} from "../../../utils/inputMasks";
import { clearAll } from "../../../utils/localStorage";
import {
  validateCPF,
  validateEmail,
  validateName,
} from "../../../utils/validation";
import "./style.css";

export default function EditClientModal() {
  const { idListChargesClick, token, getInformationClientDetail, setGetInformationClientDetail } = useUser();
  const { setOpenModalEditClient } = useClient();
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorCPF, setErrorCPF] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: idListChargesClick.client[0].nome_cliente === null ? '' : idListChargesClick.client[0].nome_cliente,
    email: idListChargesClick.client[0].email === null ? '' : idListChargesClick.client[0].email,
    cpf: idListChargesClick.client[0].cpf === null ? '' : cpfMask(idListChargesClick.client[0].cpf),
    telefone: idListChargesClick.client[0].telefone === null ? '' : cellPhoneMask(idListChargesClick.client[0].telefone),
  });
  const [formAdressEditClient, setFormAdressEditClient] = useState({
    logradouro: idListChargesClick.client[0].endereco === null ? '' : idListChargesClick.client[0].endereco,
    bairro: idListChargesClick.client[0].bairro === null ? '' : idListChargesClick.client[0].bairro,
    cep: idListChargesClick.client[0].cep == null ? "" : idListChargesClick.client[0].cep,
    cidade: idListChargesClick.client[0].cidade === null ? '' : idListChargesClick.client[0].cidade,
    estado: idListChargesClick.client[0].estado === null ? '' : idListChargesClick.client[0].estado,
    complemento: idListChargesClick.client[0].complemento === null ? '' : idListChargesClick.client[0].complemento,
  });
  let validate = 0;
  function handleChangeForm(event) {
    return setForm({ ...form, [event.target.name]: event.target.value });
  }
  function handleChangeFormAdress(event) {
    return setFormAdressEditClient({ ...formAdressEditClient, [event.target.name]: event.target.value, });
  }
  function handleChangeFormTel(e) {
    const inputNumberTel = e.target.value.replace(/\D/g, '')

    if (inputNumberTel.length > 11) {
      return;
    }

    let value = inputNumberTel;
    let phone = '';
    if (value.length > 0) {
      phone += '(' + value.slice(0, 2);
    }
    if (value.length > 2) {
      if (value.length <= 10) {
        phone += ') ' + value.slice(2, 6);
      } else if (value.length === 11) {
        phone += ') ' + value.slice(2, 3) + ' ' + value.slice(3, 7);
      }
    }
    if (value.length > 6 && value.length <= 10) {
      phone += '-' + value.slice(6);
    } else if (value.length === 11) {
      phone += '-' + value.slice(7);
    }
    return setForm({ ...form, telefone: phone })
  }
  async function searchCep(event) {
    try {
      const response = await apiCep.get(`${event.target.value}/json/`);
      setFormAdressEditClient({
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        cep: response.data.cep,
        cidade: response.data.localidade,
        estado: response.data.uf,
        complemento: "",
      });
      if (response.data.erro) {
        toast.error("CEP não encontrado", {
          className: "customToastify-error",
          icon: ({ theme, type }) => <img src={toastError} alt="" />,
        });
      }
    } catch (error) {
      toast.error("CEP inválido", {
        className: "customToastify-error",
        icon: ({ theme, type }) => <img src={toastError} alt="" />,
      });
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    setErrorName("");
    setErrorEmail("");
    setErrorCPF("");
    setErrorPhone("");
    const validationName = validateName(form.nome);
    if (!validationName.isValid) {
      setErrorName(validationName.message);
      validate = +1;
    }
    const validationEmail = validateEmail(form.email);
    if (!validationEmail.isValid) {
      setErrorEmail(validationEmail.message);
      validate = +1;
    }
    const validationCPF = validateCPF(cpfUnmask(form.cpf));
    if (!validationCPF.isValid) {
      setErrorCPF(validationCPF.message);
      validate = +1;
    }
    if (!form.telefone) {
      setErrorPhone("Este campo deve ser preenchido");
      validate = +1;
    }
    if (validate === 0) {
      updateClient();
      setOpenModalEditClient(false);
    }
  }
  async function updateClient() {
    try {
      const response = await api.put(`cliente/${idListChargesClick.client[0].id_cliente}`, {
        ...form,
        cpf: cpfUnmask(form.cpf),
        telefone: cellPhoneUnmask(form.telefone),
        logradouro: formAdressEditClient.logradouro === '' || formAdressEditClient.logradouro === null ? '' : formAdressEditClient.logradouro,
        bairro: formAdressEditClient.bairro === '' || formAdressEditClient.bairro === null ? '' : formAdressEditClient.bairro,
        cidade: formAdressEditClient.cidade === '' || formAdressEditClient.cidade === null ? '' : formAdressEditClient.cidade,
        estado: formAdressEditClient.estado === '' || formAdressEditClient.estado === null ? '' : formAdressEditClient.estado,
        complemento: formAdressEditClient.complemento === '' || formAdressEditClient.complemento === null ? '' : formAdressEditClient.complemento,
        cep: formAdressEditClient.cep === '' || formAdressEditClient.cep === null ? '' : cepUnmask(formAdressEditClient.cep)
      }, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      setGetInformationClientDetail(!getInformationClientDetail)
      toast.success(
        'Cliente Atualizado com Sucesso!', {
        className: 'customToastify-success',
        icon: ({ theme, type }) => <img src={success} alt="" />
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 && error.response.data.message === "token expirado") {
          clearAll()
          navigate("/login");
        } else if (error.response.status === 400 && error.response.data.message === "Não autorizado") {
          clearAll()
          navigate("/login");
        }
      }
      toast.error(error.response.data.message, {
        className: 'customToastify-error',
        icon: ({ theme, type }) => <img src={toastError} alt="" />
      })
    }
  }

  return (
    <>
      <div className="default-modal edit-client-modal">
        <div className="initial default-header-modal">
          <div className="initial">
            <img src={clientSFont} alt="" />
            <h2>Editar Cliente</h2>
          </div>
          <img
            className="default-modal-close mouse-pointer"
            src={closed}
            alt="fechar"
            onClick={() => setOpenModalEditClient(false)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="divs-inputs-form">
            <label htmlFor="inputName" className="mouse-pointer">
              <h1>Nome</h1>
            </label>
            <input
              className={`${errorName ? "errorLine" : ""} disable-name`}
              type="text"
              id="inputName"
              ref={inputRef}
              placeholder="Digite o nome"
              name="nome"
              disabled={true}
              value={completedName(form.nome)}
              maxLength={200}
              onChange={(event) => handleChangeForm(event)}
            />
            {errorName && (
              <span className="mainModalRegister error">
                <h1>{errorName}</h1>
              </span>
            )}
            <label htmlFor="inputEmail" className="mouse-pointer">
              <h1>E-mail*</h1>
            </label>
            <input
              className={`${errorEmail ? "errorLine" : ""}`}
              type="email"
              id="inputEmail"
              ref={inputRef}
              placeholder="Digite o e-mail"
              value={form.email}
              name="email"
              maxLength={200}
              onChange={(event) => handleChangeForm(event)}
            />
            {errorEmail && (
              <span className="error">
                <h1>{errorEmail}</h1>
              </span>
            )}
            <div className="formInformation">
              <div>
                <label htmlFor="inputCPF" className="mouse-pointer">
                  <h1>CPF*</h1>
                </label>
                <input
                  className={`${errorCPF ? "errorLine" : ""}`}
                  type="text"
                  id="inputCPF"
                  ref={inputRef}
                  placeholder="Digite o CPF"
                  name="cpf"
                  value={cpfMask(form.cpf)}
                  maxLength={14}
                  onChange={(event) => handleChangeForm(event)}
                />
                {errorCPF && (
                  <span className="error">
                    <h1>{errorCPF}</h1>
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="inputPhone" className="mouse-pointer">
                  <h1>Telefone*</h1>
                </label>
                <input
                  className={`${errorPhone ? "errorLine" : ""}`}
                  type="text"
                  id="inputPhone"
                  maxLength={16}
                  ref={inputRef}
                  placeholder="Digite o telefone"
                  name="telefone"
                  value={form.telefone}
                  onChange={(event) => handleChangeFormTel(event)}
                />
                {errorPhone && (
                  <span className="error">
                    <h1>{errorPhone}</h1>
                  </span>
                )}
              </div>
            </div>
            <div className="formInformation">
              <div>
                <label htmlFor="inputCEP" className="mouse-pointer">
                  <h1>CEP</h1>
                </label>
                <input
                  type="text"
                  maxLength={9}
                  placeholder="Digite o CEP"
                  id="inputCEP"
                  ref={inputRef}
                  name="cep"
                  value={cepMask(formAdressEditClient.cep)}
                  onChange={(event) => handleChangeFormAdress(event)}
                  onBlur={(event) => searchCep(event)}
                />
              </div>
              <div>
                <label htmlFor="inputNeighborhood" className="mouse-pointer">
                  <h1>Bairro</h1>
                </label>
                <input
                  type="text"
                  placeholder="Digite o Bairro"
                  name="bairro"
                  id="inputNeighborhood"
                  value={formAdressEditClient.bairro}
                  ref={inputRef}
                  onChange={(event) => handleChangeFormAdress(event)}
                />
              </div>
            </div>
            <div className="AdressEditClientModal">
              <label htmlFor="inputCompl" className="mouse-pointer">
                <h1>Complemento</h1>
              </label>
              <input
                type="text"
                placeholder="Digite o complemento"
                id="inputCompl"
                ref={inputRef}
                name="complemento"
                value={formAdressEditClient.complemento}
                onChange={(event) => handleChangeFormAdress(event)}
              />
              <label htmlFor="inputAdress" className="mouse-pointer">
                <h1>Endereço</h1>
              </label>
              <input
                type="text"
                placeholder="Digite o endereço"
                id="inputAdress"
                ref={inputRef}
                name="logradouro"
                value={formAdressEditClient.logradouro}
                onChange={(event) => handleChangeFormAdress(event)}
              />
            </div>
            <div className="formAndress">
              <div>
                <label htmlFor="inputCity" className="mouse-pointer">
                  <h1>Cidade</h1>
                </label>
                <input
                  type="text"
                  placeholder="Digite o Cidade"
                  name="cidade"
                  id="inputCity"
                  ref={inputRef}
                  value={formAdressEditClient.cidade}
                  onChange={(event) => handleChangeFormAdress(event)}
                />
              </div>
              <div>
                <label htmlFor="inputUF" className="mouse-pointer">
                  <h1>UF</h1>
                </label>
                <input
                  type="text"
                  placeholder="Digite o UF"
                  name="estado"
                  id="inputUF"
                  ref={inputRef}
                  value={formAdressEditClient.estado}
                  onChange={(event) => handleChangeFormAdress(event)}
                />
              </div>
            </div>
          </div>
          <div className="default-double-buttons-modal edit-client-double-buttons-modal initial">
            <button type="button" onClick={() => setOpenModalEditClient(false)}>
              Cancelar
            </button>
            <button type="submit">Aplicar</button>
          </div>
        </form>
      </div>
    </>

  );
}
