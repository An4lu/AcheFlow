import { useContext, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ProjectsContext, type Task } from '../../contexts/ProjectContext'; // Importa Task
import { Card, CardTitle, TaskGroup, TaskItem, TaskList, TaskProject, Placeholder } from './styles';
import { UserFocusIcon } from '@phosphor-icons/react';
import { theme } from '../../styles';

// Função helper para obter a data final (prazo ou data_fim)
const getEndDate = (task: Task) => new Date((task.prazo || task.data_fim) + 'T00:00:00Z');

export function MyTasks() {
    const { user } = useAuth();
    const { tasks } = useContext(ProjectsContext);

    const myTasks = useMemo(() => {
        if (!user) return { todo: [], inProgress: [] };

        const filtered = tasks.filter(task => task.responsavel?.id === user._id);

        const todo = filtered
            .filter(t => t.status === 'não iniciada')
            .sort((a, b) => getEndDate(a).getTime() - getEndDate(b).getTime()); // Correção

        const inProgress = filtered
            .filter(t => t.status === 'em andamento')
            .sort((a, b) => getEndDate(a).getTime() - getEndDate(b).getTime()); // Correção

        return { todo, inProgress };
    }, [tasks, user]);

    const hasTasks = myTasks.todo.length > 0 || myTasks.inProgress.length > 0;

    return (
        <Card>
            <UserFocusIcon size={32} weight="light" color={theme.colors.brandPrimary.value} />
            <CardTitle>Minhas Tarefas Ativas</CardTitle>

            {!hasTasks ? (
                <Placeholder>Você não tem tarefas ativas.</Placeholder>
            ) : (
                <TaskList>
                    {myTasks.inProgress.length > 0 && (
                        <TaskGroup>
                            <h4>Em Andamento ({myTasks.inProgress.length})</h4>
                            {myTasks.inProgress.map(task => (
                                <TaskItem key={task._id}>
                                    <span>{task.nome}</span>
                                    <TaskProject>{task.projeto.nome}</TaskProject>
                                </TaskItem>
                            ))}
                        </TaskGroup>
                    )}
                    {myTasks.todo.length > 0 && (
                        <TaskGroup>
                            <h4>A Fazer ({myTasks.todo.length})</h4>
                            {myTasks.todo.map(task => (
                                <TaskItem key={task._id}>
                                    <span>{task.nome}</span>
                                    <TaskProject>{task.projeto.nome}</TaskProject>
                                </TaskItem>
                            ))}
                        </TaskGroup>
                    )}
                </TaskList>
            )}
        </Card>
    );
}