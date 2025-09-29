import { useContext, useMemo } from 'react';
import { Title } from '../../components/Title';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { KanbanBoard } from '../../components/KanbanBoard';
import api from '../../services/api';

export function Kanban() {
  const { tasks, refreshData } = useContext(ProjectsContext);

  const columnMapping: Record<string, string> = {
    'não iniciada': 'Não Iniciada',
    'em andamento': 'Em Andamento',
    'concluída': 'Concluída',
    'congelada': 'Congelada',
  };

  const onTaskMove = async (taskId: string, newStatus: string) => {
    const originalTask = tasks.find(t => t._id === taskId);
    if (!originalTask) return;

    try {
      await api.put(`/tarefas/${taskId}`, { status: newStatus });
      refreshData();
    } catch (error) {
      console.error("Falha ao atualizar o status da tarefa:", error);
    }
  };

  // Organiza as tarefas nas colunas corretas
  const columns = useMemo(() => {
    const statuses = ['não iniciada', 'em andamento', 'concluída', 'congelada'];
    return statuses.map(status => ({
      id: status,
      title: columnMapping[status],
      tasks: tasks.filter(task => task.status === status)
    }));
  }, [tasks]);

  return (
    <div style={{ padding: '2rem' }}>
      <Title>Quadro Kanban</Title>
      <KanbanBoard columns={columns} onTaskMove={onTaskMove} />
    </div>
  );
}