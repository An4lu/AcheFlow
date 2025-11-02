import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
    throw new Error('A variável de ambiente VITE_API_BASE_URL não está definida.');
}

const api = axios.create({
    baseURL: baseURL,
});

// api.interceptors.request.use(async config => {
//     const token = localStorage.getItem('@AcheFlow:token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export interface ProjectPayload {
    nome: string;
    responsavel_id: string;
    descricao?: string;
    categoria?: string;
    situacao: string;
    prazo: string;
}

export interface TaskUpdatePayload {
    nome?: string;
    descricao?: string;
    prioridade?: 'baixa' | 'média' | 'alta';
    status?: 'em andamento' | 'congelada' | 'não iniciada' | 'concluída';
    prazo?: string;
    responsavel_id?: string;
    projeto_id?: string;
}

export interface TaskPayload {
    nome: string;
    projeto_id: string;
    responsavel_id: string;
    descricao?: string;
    prioridade: 'baixa' | 'média' | 'alta';
    status: 'em andamento' | 'congelada' | 'não iniciada' | 'concluída';
    prazo: string;
    numero?: string;
    classificacao?: string;
    fase?: string;
    condicao?: string;
    documento_referencia?: string;
    concluido?: boolean;
}

export interface TaskFilterParams {
    departamento?: string;
    projeto_id?: string;
    responsavel_id?: string;
    urgencia?: boolean;
}

export const getFilteredTasks = (params: TaskFilterParams) => {
    return api.get('/tarefas', { params });
};

export const createProject = (data: ProjectPayload) => {
    return api.post('/projetos', data);
};

export const createTask = (data: TaskPayload) => {
    return api.post('/tarefas', data);
};

export const updateTask = (id: string, data: TaskUpdatePayload) => {
    return api.put(`/tarefas/${id}`, data);
};

export default api;