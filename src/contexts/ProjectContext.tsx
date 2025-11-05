import { createContext, useState, type ReactNode, useCallback, useEffect, useContext } from 'react';
import api from '../services/api';
import type { User } from '../types/user';
import { AuthContext } from './AuthContext';

interface NestedResponsible {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
}

export interface Project {
    _id: string;
    nome: string;
    prazo: string;
    situacao: string;
    descricao?: string;
    responsavel: NestedResponsible;
    categoria?: string;
}

export interface Task {
    _id: string;
    nome: string;
    data_inicio: string;
    data_fim: string;
    status: string;
    responsavel: NestedResponsible;
    projeto: { id: string; nome: string; };
}

// Novo tipo para os eventos do calendário
export interface CalendarEvent {
    _id: string;
    tipoEvento: string;
    data_hora_evento: string; // ISO String
    projeto_id?: string;
    tarefa_id?: string;
}

interface ProjectContextData {
    projects: Project[];
    funcionarios: User[];
    tasks: Task[];
    events: CalendarEvent[]; // Adicionado
    isProjectModalOpen: boolean;
    isTaskModalOpen: boolean;
    loading: boolean; // Adicionado
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
    const [tasks, setTasks] = useState<Task[]>([]);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true); // Começa o loading
        if (signed) {
            try {
                const [projectsRes, funcionariosRes, tasksRes, eventsRes] = await Promise.all([
                    api.get('/projetos'),
                    api.get('/funcionarios'),
                    api.get('/tarefas'),
                    api.get('/calendario')
                ]);
                setProjects(projectsRes.data);
                setFuncionarios(funcionariosRes.data);
                setTasks(tasksRes.data);
                setEvents(eventsRes.data);
            } catch (error) {
                console.error("Falha ao buscar dados para o contexto", error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
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
            events,
            loading,
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