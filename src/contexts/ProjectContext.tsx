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
    responsavel: NestedResponsible;
    descricao?: string;
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

export interface CalendarEvent {
    _id: string;
    tipoEvento: string;
    data_hora_evento: string;
    projeto_id?: string;
    tarefa_id?: string;
}

interface ProjectContextData {
    projects: Project[];
    funcionarios: User[];
    tasks: Task[];
    events: CalendarEvent[];
    isProjectModalOpen: boolean;
    isTaskModalOpen: boolean;
    isEmployeeModalOpen: boolean;
    loading: boolean;
    openProjectModal: () => void;
    closeProjectModal: () => void;
    openTaskModal: () => void;
    closeTaskModal: () => void;
    openEmployeeModal: () => void;
    closeEmployeeModal: () => void;
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
    const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
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
            isEmployeeModalOpen,
            openProjectModal: () => setProjectModalOpen(true),
            closeProjectModal: () => setProjectModalOpen(false),
            openTaskModal: () => setTaskModalOpen(true),
            closeTaskModal: () => setTaskModalOpen(false),
            openEmployeeModal: () => setEmployeeModalOpen(true),
            closeEmployeeModal: () => setEmployeeModalOpen(false),
            refreshData: fetchData
        }}>
            {children}
        </ProjectsContext.Provider>
    );
}