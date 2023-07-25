const instance = axios.create({
    baseURL: 'https://404notfound.cyclic.app/',
    timeout: 10000,
    headers: { 'Content-Type': 'Application/json' }
});

export default instance