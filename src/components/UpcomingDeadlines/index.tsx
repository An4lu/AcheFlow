import { useContext, useMemo } from 'react';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { Card, CardTitle } from '../Dashboard/styles';
import { ClockCountdownIcon } from '@phosphor-icons/react';
import { theme } from '../../styles';
import { Placeholder } from '../MyTasks/styles';
import { DeadlineDate, TaskItem, TaskList, TaskOwner } from './styles';

const getDaysRemaining = (dateStr: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(dateStr + 'T00:00:00Z');
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export function UpcomingDeadlines() {
    const { tasks } = useContext(ProjectsContext);

    const upcomingTasks = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        return tasks
            .filter(task => {
                if (task.status === 'concluída') return false;
                const endDate = new Date(task.data_fim + 'T00:00:00Z');
                return endDate >= today && endDate <= nextWeek;
            })
            .sort((a, b) => new Date(a.data_fim).getTime() - new Date(b.data_fim).getTime())
            .slice(0, 7);
    }, [tasks]);

    return (
        <Card>
            <ClockCountdownIcon size={32} weight="light" color={theme.colors.brandSecondary.value} />
            <CardTitle>Prazos Próximos (7 dias)</CardTitle>

            {upcomingTasks.length === 0 ? (
                <Placeholder>Nenhum prazo nos próximos 7 dias.</Placeholder>
            ) : (
                <TaskList>
                    {upcomingTasks.map(task => {
                        const daysLeft = getDaysRemaining(task.data_fim);
                        return (
                            <TaskItem key={task._id}>
                                <div>
                                    <span>{task.nome}</span>
                                    <TaskOwner>{task.responsavel.nome}</TaskOwner>
                                </div>
                                <DeadlineDate days={daysLeft}>
                                    {daysLeft === 0 ? 'Hoje' : `Vence em ${daysLeft}d`}
                                </DeadlineDate>
                            </TaskItem>
                        );
                    })}
                </TaskList>
            )}
        </Card>
    );
}