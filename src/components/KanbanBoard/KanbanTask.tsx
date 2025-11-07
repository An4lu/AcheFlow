import { TaskCard, TaskTitle, TaskFooter, TaskOwner, EditButton } from './styles';
import type { Task } from '../../contexts/ProjectContext';
import { PencilSimpleIcon } from '@phosphor-icons/react';

interface KanbanTaskProps {
    task: Task;
    onEditClick: (task: Task) => void;
}

export function KanbanTask({ task, onEditClick }: KanbanTaskProps) {
    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        onEditClick(task);
    };

    return (
        <TaskCard>
            <TaskTitle>{task.nome}</TaskTitle>
            <TaskFooter>
                <EditButton onClick={handleEditClick}>
                    <PencilSimpleIcon size={18} weight="bold" />
                </EditButton>
                <TaskOwner>{`${task.responsavel.nome} ${task.responsavel.sobrenome || ''}`.trim()}</TaskOwner>
            </TaskFooter>
        </TaskCard>
    );
}