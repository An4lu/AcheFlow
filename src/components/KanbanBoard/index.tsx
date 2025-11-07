import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
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
    onTaskMove: (taskId: string, newStatus: string) => void;
    onTaskClick: (task: Task) => void; 
}

export function KanbanBoard({ columns, onTaskMove, onTaskClick }: KanbanBoardProps) {

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id as string;
        
        const overId = over.id as string;
        const overIsColumn = columns.some(c => c.id === overId);
        
        let newColumnId = overId;
        if (!overIsColumn) {
            for (const col of columns) {
                if (col.tasks.some(t => t._id === overId)) {
                    newColumnId = col.id;
                    break;
                }
            }
        }

        const originalColumn = columns.find(col => col.tasks.some(task => task._id === taskId));
        
        if (originalColumn && originalColumn.id !== newColumnId) {
            onTaskMove(taskId, newColumnId);
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={columns.map(c => c.id)} strategy={horizontalListSortingStrategy}>
                <BoardContainer>
                    {columns.map(column => (
                        <KanbanColumn 
                            key={column.id} 
                            id={column.id} 
                            title={column.title} 
                            tasks={column.tasks} 
                            onTaskClick={onTaskClick} 
                        />
                    ))}
                </BoardContainer>
            </SortableContext>
        </DndContext>
    );
}