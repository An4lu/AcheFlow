import { BoardContainer } from './styles';
import type { Task } from '../../contexts/ProjectContext';
import { KanbanColumn } from './KanbanColumn';

export interface KanbanColumnData {
    id: string;
    title: string;
    tasks: Task[];
}

interface KanbanBoardProps {
    columns: KanbanColumnData[];
    onEditClick: (task: Task) => void;
}

export function KanbanBoard({ columns, onEditClick }: KanbanBoardProps) { 


    return (
        <BoardContainer>
            {columns.map(column => (
                <KanbanColumn 
                    key={column.id} 
                    id={column.id} 
                    title={column.title} 
                    tasks={column.tasks} 
                    onEditClick={onEditClick}
                />
            ))}
        </BoardContainer>
    );
}