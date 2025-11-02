import { createContext, useState, type ReactNode, useCallback, useEffect, useContext } from 'react';
import api from '../services/api';
import type { User } from '../types/user';
import { AuthContext } from './AuthContext';

export interface Project {
    _id: string;
    nome: string;
    prazo: string;
    situacao: string;
    descricao?: string;
    categoria?: string;
}

export interface Task {
    _id: string;
    nome: string;
    prazo: string;
    status: string;
    responsavel: User;
    projeto: { id: string; nome: string; };
}

interface ProjectContextData {
    projects: Project[];
    funcionarios: User[];
    tasks: Task[];
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
    const { signed } = useContext(AuthContext);
    const [projects, setProjects] = useState<Project[]>([]);
    const [funcionarios, setFuncionarios] = useState<User[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]); // Estado para as tarefas
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);

    const fetchData = useCallback(async () => {
        if (signed) {
            try {
                // Agora buscamos projetos, funcionários e tarefas de uma vez
                const [projectsRes, funcionariosRes, tasksRes] = await Promise.all([
                    api.get('/projetos'),
                    api.get('/funcionarios'),
                    api.get('/tarefas')
                ]);
                setProjects(projectsRes.data);
                setFuncionarios(funcionariosRes.data);
                setTasks(tasksRes.data);
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
            tasks,
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