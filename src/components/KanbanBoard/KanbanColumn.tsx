import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ColumnContainer, ColumnTitle, TaskList } from './styles';
import type { Task } from '../../contexts/ProjectContext';
import { KanbanTask } from './KanbanTask';

interface KanbanColumnProps {
    id: string;
    title: string;
    tasks: Task[];
}

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
    const { setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style}>
            <ColumnContainer>
                <ColumnTitle>{title} ({tasks.length})</ColumnTitle>
                <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
                    <TaskList>
                        {tasks.map(task => (
                            <KanbanTask key={task._id} task={task} />
                        ))}
                    </TaskList>
                </SortableContext>
            </ColumnContainer>
        </div>
    );
}