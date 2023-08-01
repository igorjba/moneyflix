import "./style.css";
import useUser from "../../../hooks/useUser";
import clientSFont from "../../../assets/Client(2).svg";
import EditGreen from "../../../assets/Edit-green.svg";
import deleteCharge from "../../../assets/DeleteCharge.svg";
import editCharge from "../../../assets/Edit.svg";

export default function ClientDetail() {
  const { setTitle, setOpenModalRegisterCharges } = useUser();
  setTitle("Clientes    >    Detalhes do cliente");
  return (
    <>
      <div className="initial header">
        <div className="initial client-header">
          <img src={clientSFont} alt="Client" />
          <h2>Sara Lage Silva</h2>
        </div>
      </div>
      <div className="tables">
        <div className="table-client-data tableAll">
          <table>
            <thead>
              <tr className="table-first-title">
                <th className="table-title">Dados do Cliente</th>
                <th>
                  <button className="button-edit-client">
                    <img src={EditGreen} alt="editar cliente" />
                    <h4>Editar Cliente</h4>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="header-table-client subtitle-top">
                <td>
                  <h1>E-mail</h1>
                </td>
                <td>
                  <h1>Telefone</h1>
                </td>
                <td>
                  <h1>CPF</h1>
                </td>
              </tr>
              <tr className="extract-table">
                <td>
                  <h1>sarasilva@gmail.com</h1>
                </td>
                <td>
                  <h1>71 9 9462 8654</h1>
                </td>
                <td>
                  <h1>054 365 255 87</h1>
                </td>
              </tr>
              <tr className="header-table-client subtitle-bottom">
                <td>
                  <h1>Endereço</h1>
                </td>
                <td>
                  <h1>Bairro</h1>
                </td>
                <td>
                  <h1>Complemento</h1>
                </td>
                <td>
                  <h1>CEP</h1>
                </td>
                <td>
                  <h1>Cidade</h1>
                </td>
                <td className="td-uf">
                  <h1>UF</h1>
                </td>
              </tr>
              <tr className="extract-table">
                <td>
                  <h1>Rua das Cornélias; nº 512</h1>
                </td>
                <td>
                  <h1>Oliveiras</h1>
                </td>
                <td>
                  <h1>Ap: 502</h1>
                </td>
                <td>
                  <h1>031 654 524 04</h1>
                </td>
                <td>
                  <h1>Salvador</h1>
                </td>
                <td className="td-uf">
                  <h1>BA</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-charge-data tableAll ">
          <table>
            <thead>
              <tr className="table-first-title">
                <th className="table-title">Dados do Cliente</th>
                <th>
                  <button
                    className="addClient"
                    onClick={() => setOpenModalRegister(true)}
                  >
                    <h1> + Nova cobrança </h1>
                  </button>
                </th>
              </tr>
            </thead>
            <thead className="header-table-client">
              <tr>
                <th className="PageOrderClient">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Frame" clip-path="url(#clip0_84440_3278)">
                      <g id="Group">
                        <path
                          id="Vector"
                          d="M9.5 10.5L9.5 23.25"
                          stroke="#3F3F55"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M12.5 20.25L9.5 23.25L6.5 20.25"
                          stroke="#3F3F55"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M15.5 13.5L15.5 0.75"
                          stroke="#3F3F55"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M12.5 3.75L15.5 0.75L18.5 3.75"
                          stroke="#3F3F55"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_84440_3278">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(24.5) rotate(90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <h1>Cliente</h1>
                </th>
                <th className="PageOrderID">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Frame" clip-path="url(#clip0_84440_3278)">
                      <g id="Group">
                        <path
                          id="Vector"
                          d="M9.5 10.5L9.5 23.25"
                          stroke="#3F3F55"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M12.5 20.25L9.5 23.25L6.5 20.25"
                          stroke="#3F3F55"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M15.5 13.5L15.5 0.75"
                          stroke="#3F3F55"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M12.5 3.75L15.5 0.75L18.5 3.75"
                          stroke="#3F3F55"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_84440_3278">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(24.5) rotate(90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <h1>ID Cob.</h1>
                </th>
                <th>
                  <h1>Valor</h1>
                </th>
                <th>
                  <h1>Data de venc.</h1>
                </th>
                <th>
                  <h1>Status</h1>
                </th>
                <th className="description-table-header">
                  <h1>Descrição</h1>
                </th>
                <th className="imagem-table-header"></th>{" "}
              </tr>
            </thead>
            <tbody>
              <tr className="extract-table">
                <td>
                  <h1>Sara Silva</h1>
                </td>
                <td>
                  <h1>248563147</h1>
                </td>
                <td>
                  <h1>R$ 500,00</h1>
                </td>
                <td>
                  <h1>26/01/2021</h1>
                </td>
                <td>
                  <div className="div-status-charge">
                    <h1 className="status-text">Vencida</h1>
                  </div>
                </td>
                <td className="description-table description-table-charge">
                  <h1>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vero, earum.
                  </h1>
                </td>
                <td className="imagem-table-charge">
                  <img src={editCharge} alt="Editar" />
                  <img src={deleteCharge} alt="Deletar" />
                </td>
              </tr>
              <tr className="extract-table">
                <td>
                  <h1>Sara Silva</h1>
                </td>
                <td>
                  <h1>248563147</h1>
                </td>
                <td>
                  <h1>R$ 500,00</h1>
                </td>
                <td>
                  <h1>26/01/2021</h1>
                </td>
                <td>
                  <div className="div-status-charge">
                    <h1 className="status-text">Paga</h1>
                  </div>
                </td>
                <td className="description-table description-table-charge">
                  <h1>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vero, earum.
                  </h1>
                </td>
                <td className="imagem-table-charge">
                  <img src={editCharge} alt="Editar" />
                  <img src={deleteCharge} alt="Deletar" />
                </td>
              </tr>
              <tr className="extract-table">
                <td>
                  <h1>Sara Silva</h1>
                </td>
                <td>
                  <h1>248563147</h1>
                </td>
                <td>
                  <h1>R$ 500,00</h1>
                </td>
                <td>
                  <h1>26/01/2021</h1>
                </td>
                <td>
                  <div className="div-status-charge">
                    <h1 className="status-text">Pendente</h1>
                  </div>
                </td>
                <td className="description-table description-table-charge">
                  <h1>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vero, earum.
                  </h1>
                </td>
                <td className="imagem-table-charge">
                  <img src={editCharge} alt="Editar" />
                  <img src={deleteCharge} alt="Deletar" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
