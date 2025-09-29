import { createContext, useState, type ReactNode, useCallback, useEffect, useContext } from 'react';
import api from '../services/api';
import type { User } from '../types/user';
import { AuthContext } from './AuthContext';

interface Project {
    _id: string;
    nome: string;
    prazo: string;
    situacao: string;
    descricao?: string;
    categoria?: string;
}

interface ProjectContextData {
    projects: Project[];
    funcionarios: User[];
    isProjectModalOpen: boolean;
    isTaskModalOpen: boolean;
    openProjectModal: () => void;
    closeProjectModal: () => void;
    openTaskModal: () => void;
    closeTaskModal: () => void;
    refreshData: () => void;
}

export const ProjectsContext = createContext({} as ProjectContextData);

export function ProjectsProvider({ children }: { children: ReactNode }) {
    const { signed } = useContext(AuthContext); // Usar o status de autenticação
    const [projects, setProjects] = useState<Project[]>([]);
    const [funcionarios, setFuncionarios] = useState<User[]>([]);
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);

    const fetchData = useCallback(async () => {
        // SÓ BUSCA OS DADOS SE O USUÁRIO ESTIVER LOGADO
        if (signed) {
            try {
                const [projectsRes, funcionariosRes] = await Promise.all([
                    api.get('/projetos'),
                    api.get('/funcionarios')
                ]);
                setProjects(projectsRes.data);
                setFuncionarios(funcionariosRes.data);
            } catch (error) {
                console.error("Falha ao buscar dados para o contexto", error);
            }
        }
    }, [signed]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <ProjectsContext.Provider value={{
            projects,
            funcionarios,
            isProjectModalOpen,
            isTaskModalOpen,
            openProjectModal: () => setProjectModalOpen(true),
            closeProjectModal: () => setProjectModalOpen(false),
            openTaskModal: () => setTaskModalOpen(true),
            closeTaskModal: () => setTaskModalOpen(false),
            refreshData: fetchData
        }}>
            {children}
        </ProjectsContext.Provider>
    );
}