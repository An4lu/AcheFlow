import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { BoardContainer } from './styles';
import type { Task } from '../../contexts/ProjectContext';
import { KanbanColumn } from './KanbanColumn';

// Define a estrutura das colunas do Kanban
export interface KanbanColumnData {
    id: string;
    title: string;
    tasks: Task[];
}

interface KanbanBoardProps {
    columns: KanbanColumnData[];
    onTaskMove: (taskId: string, newStatus: string) => void;
}

export function KanbanBoard({ columns, onTaskMove }: KanbanBoardProps) {

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Se o item for solto fora de uma coluna, não faz nada
        if (!over) return;

        const taskId = active.id as string;
        const newColumnId = over.id as string;

        // Verifica se a tarefa foi movida para uma coluna diferente
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
                        <KanbanColumn key={column.id} id={column.id} title={column.title} tasks={column.tasks} />
                    ))}
                </BoardContainer>
            </SortableContext>
        </DndContext>
    );
}