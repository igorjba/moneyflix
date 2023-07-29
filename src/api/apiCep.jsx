const apiCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    timeout: 10000,
    headers: { 'Content-Type': 'Application/json' }
});

export default apiCep