import { createContext, useState, type ReactNode } from 'react';

// Define a estrutura de uma tarefa
export interface Task {
    Nome: string;
    Duração: string;
    // Outros campos do seu CSV
    [key: string]: any;
}

// Define a estrutura de um projeto
export interface Project {
    name: string;
    tasks: Task[];
}

interface ProjectsContextData {
    projects: Project[];
    addProject: (project: Project) => void;
}

export const ProjectsContext = createContext({} as ProjectsContextData);

interface ProjectsProviderProps {
    children: ReactNode;
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
    const [projects, setProjects] = useState<Project[]>([]);

    const addProject = (project: Project) => {
        // Adiciona o novo projeto à lista de projetos existentes
        setProjects((prevProjects) => [...prevProjects, project]);
    };

    return (
        <ProjectsContext.Provider value={{ projects, addProject }}>
            {children}
        </ProjectsContext.Provider>
    );
}