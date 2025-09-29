import type { Task } from "gantt-task-react";

// Interfaces para os dados da sua API
interface ApiProject {
    _id: string;
    nome: string;
    prazo: string;
}

interface ApiTask {
    _id: string;
    nome: string;
    prazo: string;
    projeto: { id: string; nome: string };
    status: string;
    responsavel: { nome: string; sobrenome: string };
}

/**
 * Converte uma string 'YYYY-MM-DD' para um objeto Date de forma segura.
 */
function parseValidDate(dateString: string): Date | null {
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return null;
    }
    const date = new Date(dateString + 'T00:00:00Z');
    if (isNaN(date.getTime())) {
        return null;
    }
    return date;
}

/**
 * Define a porcentagem de conclusão (0 a 100) com base no status.
 */
const getPercentComplete = (status: string): number => {
    switch (status?.toLowerCase()) {
        case 'concluída': return 100;
        case 'em andamento': return 50;
        default: return 0;
    }
};

/**
 * Transforma os dados da API para o formato da biblioteca gantt-task-react.
 */
export const transformDataForGantt = (projects: ApiProject[], tasks: ApiTask[]): Task[] => {
    const ganttTasks: Task[] = [];
    const projectMap = new Map<string, ApiProject>();
    projects.forEach(p => projectMap.set(p._id, p));

    // Adiciona os projetos
    for (const project of projects) {
        const startDate = parseValidDate(project.prazo);
        if (!startDate) continue;

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        ganttTasks.push({
            id: project._id,
            name: `[PROJETO] ${project.nome}`,
            type: 'project',
            start: startDate,
            end: endDate,
            progress: 100,
            isDisabled: true,
            styles: {
                backgroundColor: '#FF7F2A',
                backgroundSelectedColor: '#FF7F2A',
                progressColor: '#F9AC39',
                progressSelectedColor: '#F9AC39',
            },
        });
    }

    // Adiciona as tarefas
    for (const task of tasks) {
        const endDate = parseValidDate(task.prazo);
        const parentProject = task.projeto ? projectMap.get(task.projeto.id) : undefined;

        if (!endDate || !parentProject || !task.responsavel) {
            continue;
        }

        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 5);

        // AQUI ESTÁ A CORREÇÃO: Usamos "as Task" para resolver o erro de tipagem.
        const ganttTask = {
            id: task._id,
            name: task.nome,
            type: 'task' as const,
            start: startDate,
            end: endDate,
            progress: getPercentComplete(task.status),
            project: parentProject._id,
            // Adiciona um campo 'extra' com os dados para o tooltip
            extra: {
                status: task.status,
                responsavel: `${task.responsavel.nome} ${task.responsavel.sobrenome}`.trim(),
            }
        } as Task; // Esta conversão de tipo (type assertion) corrige o erro.

        ganttTasks.push(ganttTask);
    }

    return ganttTasks;
};