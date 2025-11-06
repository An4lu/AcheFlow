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
    dataCriacao?: string; // Correção: Campo novo
    data_inicio?: string; // Campo antigo
    prazo?: string;       // Correção: Campo novo
    data_fim?: string;    // Campo antigo
    status: string;
    responsavel: NestedResponsible;
    projeto: { id: string; nome: string; };
    descricao?: string | null;
    dataConclusao?: string | null;
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
    isEmployeeCreateModalOpen: boolean;
    isEmployeeDetailsModalOpen: boolean;
    selectedEmployee: User | null;
    loading: boolean;
    openProjectModal: () => void;
    closeProjectModal: () => void;
    openTaskModal: () => void;
    closeTaskModal: () => void;
    openEmployeeCreateModal: () => void;
    closeEmployeeCreateModal: () => void;
    openEmployeeDetailsModal: (employee: User) => void;
    closeEmployeeDetailsModal: () => void;
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
    const [isEmployeeCreateModalOpen, setEmployeeCreateModalOpen] = useState(false);
    const [isEmployeeDetailsModalOpen, setEmployeeDetailsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);

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

    const handleOpenEmployeeDetails = (employee: User) => {
        setSelectedEmployee(employee);
        setEmployeeDetailsModalOpen(true);
    };

    const handleCloseEmployeeDetails = () => {
        setEmployeeDetailsModalOpen(false);
        setSelectedEmployee(null);
    };

    return (
        <ProjectsContext.Provider value={{
            projects,
            funcionarios,
            tasks,
            events,
            loading,
            isProjectModalOpen,
            isTaskModalOpen,
            isEmployeeCreateModalOpen,
            isEmployeeDetailsModalOpen,
            selectedEmployee,
            openProjectModal: () => setProjectModalOpen(true),
            closeProjectModal: () => setProjectModalOpen(false),
            openTaskModal: () => setTaskModalOpen(true),
            closeTaskModal: () => setTaskModalOpen(false),
            openEmployeeCreateModal: () => setEmployeeCreateModalOpen(true),
            closeEmployeeCreateModal: () => setEmployeeCreateModalOpen(false),
            openEmployeeDetailsModal: handleOpenEmployeeDetails,
            closeEmployeeDetailsModal: handleCloseEmployeeDetails,
            refreshData: fetchData
        }}>
            {children}
        </ProjectsContext.Provider>
    );
}