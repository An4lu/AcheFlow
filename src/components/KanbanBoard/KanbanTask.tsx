import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard, TaskTitle, TaskFooter, TaskOwner } from './styles';
import type { Task } from '../../contexts/ProjectContext';

interface KanbanTaskProps {
    task: Task;
    onClick: (task: Task) => void; 
}

export function KanbanTask({ task, onClick }: KanbanTaskProps) { 
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard onClick={() => onClick(task)}> 
                <TaskTitle>{task.nome}</TaskTitle>
                <TaskFooter>
                    <TaskOwner>{`${task.responsavel.nome} ${task.responsavel.sobrenome || ''}`.trim()}</TaskOwner>
                </TaskFooter>
            </TaskCard>
        </div>
    );
}