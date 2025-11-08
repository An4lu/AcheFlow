import { TaskCard, TaskTitle, TaskFooter, TaskOwner, EditButton, TaskTag, ProgressBarContainer, ProgressBar } from './styles';
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

    const progressPercent = task.percentual_concluido
        ? `${(task.percentual_concluido * 100).toFixed(0)}%`
        : '0%';

    const minBarWidth = task.percentual_concluido! > 0 ? 40 : 0;

    return (
        <TaskCard>
            {task.classificacao && (
                <TaskTag>{task.classificacao}</TaskTag>
            )}
            <TaskTitle>{task.nome}</TaskTitle>
            {task.percentual_concluido !== undefined && task.percentual_concluido > 0 && (
                <ProgressBarContainer title={`Progresso: ${progressPercent}`}>
                    <ProgressBar style={{ width: progressPercent, minWidth: `${minBarWidth}px`}}>
                        {progressPercent} 
                    </ProgressBar>
                </ProgressBarContainer>
            )}
            <TaskFooter>
                <EditButton onClick={handleEditClick}>
                    <PencilSimpleIcon size={18} weight="bold" />
                </EditButton>
                <TaskOwner>{`${task.responsavel.nome} ${task.responsavel.sobrenome || ''}`.trim()}</TaskOwner>
            </TaskFooter>
        </TaskCard>
    );
}