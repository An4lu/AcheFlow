import type { Task } from "gantt-task-react";

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
            styles: { backgroundColor: '#FF7F2A', progressColor: '#F9AC39' },
        });
    }

    for (const task of tasks) {
        const endDate = parseValidDate(task.prazo);
        const parentProject = task.projeto ? projectMap.get(task.projeto.id) : undefined;
        if (!endDate || !parentProject || !task.responsavel) continue;

        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 5);

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const isOverdue = endDate < now && task.status.toLowerCase() !== 'concluída';
        const status = task.status.toLowerCase();

        // Lógica para definir as cores das barras
        let barStyles = {
            backgroundColor: '#E4113F', // Rosa (padrão para 'em andamento')
            progressColor: '#F46685',
            progressSelectedColor: '#F46685',
        };

        if (isOverdue) {
            // Vermelho para vencidas
            barStyles = {
                backgroundColor: '#c53030',
                progressColor: '#9B2C2C',
                progressSelectedColor: '#9B2C2C',
            };
        } else if (status === 'não iniciada') {
            // Cinza para não iniciadas
            barStyles = {
                backgroundColor: '#A0AEC0',
                progressColor: '#718096',
                progressSelectedColor: '#718096',
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
                status: task.status,
                responsavel: `${task.responsavel.nome} ${task.responsavel.sobrenome}`.trim(),
            },
        } as Task;
        ganttTasks.push(ganttTask);
    }

    return ganttTasks;
};