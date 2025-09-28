import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
    throw new Error('A variável de ambiente VITE_API_BASE_URL não está definida.');
}

const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;