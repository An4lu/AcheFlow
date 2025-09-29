import type { Task } from "gantt-task-react";

// Interfaces que correspondem exatamente ao seu JSON
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
    const date = new Date(dateString + 'T00:00:00Z'); // Trata como UTC
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
 * Transforma os dados da sua API para o formato que a biblioteca gantt-task-react precisa.
 */
export const transformDataForGantt = (projects: ApiProject[], tasks: ApiTask[]): Task[] => {
    const ganttTasks: Task[] = [];

    // Adiciona os projetos como itens principais no gráfico
    for (const project of projects) {
        const startDate = parseValidDate(project.prazo);
        if (!startDate) continue;

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1); // Duração de 1 dia para o marco do projeto

        ganttTasks.push({
            id: project._id,
            name: `[PROJETO] ${project.nome}`,
            type: 'project',
            start: startDate,
            end: endDate,
            progress: 100,
            isDisabled: true, // Impede que o usuário arraste o projeto
            styles: {
                backgroundColor: '#FF7F2A',
                backgroundSelectedColor: '#FF7F2A',
                progressColor: '#F9AC39',
                progressSelectedColor: '#F9AC39',
            },
        });
    }

    // Adiciona as tarefas, vinculadas aos seus projetos
    for (const task of tasks) {
        const endDate = parseValidDate(task.prazo);

        // Pula a tarefa se não tiver data válida, projeto ou responsável
        if (!endDate || !task.projeto?.id || !task.responsavel) {
            continue;
        }

        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 5); // Duração visual de 5 dias

        ganttTasks.push({
            id: task._id,
            name: `${task.nome} (${task.responsavel.nome})`, // Adiciona o nome do responsável
            type: 'task',
            start: startDate,
            end: endDate,
            progress: getPercentComplete(task.status),
            project: task.projeto.id, // Vincula a tarefa ao projeto pai
        });
    }

    return ganttTasks;
};