interface ApiProject {
    _id: string;
    nome: string;
    prazo: string;
}

interface ApiTask {
    _id: string;
    nome: string;
    prazo: string;
    projeto: { _id: string };
    responsavel: { _id: string };
}

interface GanttEntity {
    id: string;
    text: string;
    start_date: string;
    end_date: string;
    parent?: string;
    open?: boolean;
    type?: string;
}

const formatDateForGantt = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('-');
    return `${day}-${month}-${year}`;
};

export const transformDataForGantt = (projects: ApiProject[], tasks: ApiTask[]): GanttEntity[] => {
    const ganttData: GanttEntity[] = [];

    for (const project of projects) {
        ganttData.push({
            id: project._id,
            text: `[PROJETO] ${project.nome}`,
            start_date: formatDateForGantt(project.prazo),
            end_date: formatDateForGantt(project.prazo),
            open: true,
            type: 'project',
        });
    }

    for (const task of tasks) {
        if (!task.projeto?._id) continue;

        const endDate = new Date(task.prazo);
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 5);

        const formattedStartDate = `${startDate.getDate().toString().padStart(2, '0')}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getFullYear()}`;
        const formattedEndDate = formatDateForGantt(task.prazo);

        ganttData.push({
            id: task._id,
            text: task.nome,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            parent: task.projeto._id,
        });
    }

    return ganttData;
};