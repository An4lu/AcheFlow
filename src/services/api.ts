import axios from 'axios';


const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) {
    throw new Error('A variável de ambiente VITE_API_BASE_URL (API Principal/Render) não está definida.');
}

const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('@AcheFlow:token');
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


const iaBaseURL = import.meta.env.VITE_IA_SERVICE_URL;
if (!iaBaseURL) {
    throw new Error('A variável de ambiente VITE_IA_SERVICE_URL (Serviço de IA/Cloud Run) não está definida.');
}

const iaApiKey = import.meta.env.VITE_API_KEY;
if (!iaApiKey) {
    throw new Error('A variável de ambiente VITE_API_KEY (Chave da IA) não está definida.');
}

export const api_ia = axios.create({
    baseURL: iaBaseURL,
    headers: {
        'x-api-key': iaApiKey 
    }
});


const token = localStorage.getItem('@AcheFlow:token');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

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
    data_inicio?: string;
    data_fim?: string; 
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
    como_fazer?: string;
    porcentagem?: number;
    numero?: string;
    classificacao?: string;
    fase?: string;
    condicao?: string;
    documento_referencia?: string;
    concluido?: boolean;
}

export interface FuncionarioPayload {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    cargo: string;
    departamento: string;
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
export const updateProject = (id: string, data: Partial<ProjectPayload>) => {
    return api.put(`/projetos/${id}`, data);
};
export const deleteProject = (id: string) => {
    return api.delete(`/projetos/${id}`);
};

export const createTask = (data: TaskPayload) => {
    return api.post('/tarefas', data);
};
export const updateTask = (id: string, data: TaskUpdatePayload) => {
    return api.put(`/tarefas/${id}`, data);
};

export const deleteTask = (id: string) => {
    return api.delete(`/tarefas/${id}`);
};

export const createFuncionario = (data: FuncionarioPayload) => {
    return api.post('/funcionarios', data);
};


export const deleteFuncionario = (id: string) => {
    return api.delete(`/funcionarios/${id}`);
};


export const importTasks = (formData: FormData) => {
    return api.post('/tarefas/importar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default api;