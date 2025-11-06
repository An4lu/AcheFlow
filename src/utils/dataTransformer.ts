import type { Task } from "gantt-task-react";
import { theme } from "../styles";

interface ApiProject {
    _id: string;
    nome: string;
    prazo: string;
}

// Interface local atualizada para refletir a API (com "dataCriacao" e "prazo")
// e também os nomes antigos como opcionais
interface ApiTask {
    _id: string;
    nome: string;
    dataCriacao?: string; // Campo novo
    data_inicio?: string; // Campo antigo
    prazo?: string;       // Campo novo
    data_fim?: string;    // Campo antigo
    projeto: { id: string; nome: string };
    status: string;
    responsavel: {
        id: string;
        nome: string;
        sobrenome: string;
        email: string;
    };
}

function parseValidDate(dateString: string | undefined): Date | null {
    if (!dateString) {
        return null;
    }

    // Remove o horário (T...) se existir
    const dateOnlyString = dateString.split('T')[0];

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOnlyString)) {
        return null;
    }

    const date = new Date(dateOnlyString + 'T00:00:00Z');

    if (isNaN(date.getTime())) {
        return null;
    }
    return date;
}

const getPercentComplete = (status: string): number => {
    switch (status?.toLowerCase()) {
        case 'concluída': return 100;
        case 'em andamento': return 50;
        default: return 0;
    }
};

export const transformDataForGantt = (projects: ApiProject[], tasks: ApiTask[]): Task[] => {
    const ganttTasks: Task[] = [];
    const projectMap = new Map<string, ApiProject>(projects.map(p => [p._id, p]));

    // for (const project of projects) {
    //     const projectDate = parseValidDate(project.prazo); 
    //     if (!projectDate) continue;

    //     const endDate = new Date(projectDate);
    //     endDate.setDate(projectDate.getDate() + 1); 

    //     ganttTasks.push({
    //         id: project._id,
    //         name: `[PROJETO] ${project.nome}`,
    //         type: 'project',
    //         start: projectDate, 
    //         end: endDate,
    //         progress: 100,
    //         isDisabled: true,
    //         styles: {
    //             backgroundColor: theme.colors.brandSecondary.value,
    //             progressColor: theme.colors.brandSecondaryHover.value
    //         },
    //     });
    // }

    for (const task of tasks) {
        const startDate = parseValidDate(task.dataCriacao || task.data_inicio);
        const endDate = parseValidDate(task.prazo || task.data_fim);

        const parentProject = task.projeto ? projectMap.get(task.projeto.id) : undefined;

        if (!startDate || !endDate || !parentProject || !task.responsavel?.nome) {
            console.warn("Tarefa pulada por dados ausentes:", task.nome, { startDate, endDate, parentProject, resp: task.responsavel });
            continue;
        }

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const isOverdue = endDate < now && task.status?.toLowerCase() !== 'concluída';
        const status = task.status?.toLowerCase();

        let barStyles = {
            backgroundColor: theme.colors.brandPrimary.value,
            progressColor: theme.colors.brandQuaternary.value,
            progressSelectedColor: theme.colors.brandQuaternary.value,
        };

        if (isOverdue) {
            barStyles = {
                backgroundColor: theme.colors.danger.value,
                progressColor: theme.colors.brandTertiary.value,
                progressSelectedColor: theme.colors.brandTertiary.value,
            };
        } else if (status === 'não iniciada') {
            barStyles = {
                backgroundColor: theme.colors.textMuted.value,
                progressColor: theme.colors.borderDefault.value,
                progressSelectedColor: theme.colors.borderDefault.value,
            };
        } else if (status === 'concluída') {
            barStyles = {
                backgroundColor: theme.colors.success.value,
                progressColor: theme.colors.success.value,
                progressSelectedColor: theme.colors.success.value,
            };
        }

        const ganttTask = {
            id: task._id,
            name: task.nome,
            type: 'task' as const,
            start: startDate,
            end: endDate,
            progress: getPercentComplete(task.status),
            project: parentProject._id,
            styles: barStyles,
            extra: {
                projetoNome: parentProject.nome, 
                status: task.status,
                responsavel: `${task.responsavel.nome} ${task.responsavel.sobrenome || ''}`.trim(),
            },
        } as Task;
        ganttTasks.push(ganttTask);
    }

    return ganttTasks;
};