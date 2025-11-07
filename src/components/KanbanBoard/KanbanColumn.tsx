import { ColumnContainer, ColumnTitle, TaskList } from './styles';
import type { Task } from '../../contexts/ProjectContext';
import { KanbanTask } from './KanbanTask';

interface KanbanColumnProps {
    id: string;
    title: string;
    tasks: Task[];
    onEditClick: (task: Task) => void;
}

export function KanbanColumn({ id, title, tasks, onEditClick }: KanbanColumnProps) { 

    return (
        <div>
            <ColumnContainer>
                <ColumnTitle>{title} ({tasks.length})</ColumnTitle>
                <TaskList>
                    {tasks.map(task => (
                        <KanbanTask 
                            key={task._id} 
                            task={task} 
                            onEditClick={onEditClick}
                        />
                    ))}
                </TaskList>
            </ColumnContainer>
        </div>
    );
}