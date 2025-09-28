import { createContext, useState, type ReactNode, useCallback, useEffect } from 'react';
import api from '../services/api';
import type { User } from '../types/user';

interface SimpleProject {
    _id: string;
    nome: string;
}

interface ProjectContextData {
    projects: SimpleProject[];
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
    const [projects, setProjects] = useState<SimpleProject[]>([]);
    const [funcionarios, setFuncionarios] = useState<User[]>([]);
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);

    const fetchData = useCallback(async () => {
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
    }, []);

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