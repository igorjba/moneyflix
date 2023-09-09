# Moneyflix

**Moneyflix** é uma aplicação de gerenciamento financeiro que permite aos usuários manterem um controle detalhado de suas finanças pessoais. O projeto foi desenvolvido em duas partes: frontend e backend.

- [Repositório Frontend](https://github.com/igorjba/moneyflix-front)
- [Repositório Backend](https://github.com/igorjba/moneyflix-back)
- [Demonstração](https://moneyflix-front.vercel.app/)

## Frontend

Desenvolvido utilizando React, o frontend proporciona uma interface amigável para os usuários gerenciarem suas transações e visualizarem relatórios detalhados.

### Principais Características:

- Cadastro de usuários.
- Gestão de transações.
- Resumos financeiros e relatórios detalhados.
- Design responsivo e interativo.

### Tecnologias Utilizadas:

- React
- Axios
- react-router-dom
- Vite
- react-toastify

### Instalação e Uso:

1. Clone o repositório: `git clone https://github.com/igorjba/moneyflix-front.git`
2. Entre no diretório do projeto: `cd moneyflix-front`
3. Instale as dependências: `npm install`
4. Inicie o servidor de desenvolvimento: `npm run dev`

## Backend

Desenvolvido com Node.js e Express, o backend gerencia a lógica por trás da aplicação, tratando dados, autenticações e interações com o banco de dados.

### Principais Características:

- Autenticação de usuários.
- CRUD de transações.
- Interação com banco de dados PostgreSQL.

### Tecnologias Utilizadas:

- Express
- PostgreSQL (pg e knex)
- JSON Web Token (jsonwebtoken)
- bcrypt
- joi

### Instalação e Uso:

1. Clone o repositório: `git clone https://github.com/igorjba/moneyflix-back.git`
2. Entre no diretório do projeto: `cd moneyflix-back`
3. Instale as dependências: `npm install`
4. Configure o `.env` com suas variáveis de ambiente.
5. Inicie o servidor: `npm run dev`

## Demonstração

Confira o projeto em ação: [Moneyflix](https://moneyflix-front.vercel.app/)