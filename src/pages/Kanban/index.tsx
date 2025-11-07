import { useContext, useMemo, useState } from 'react';
import { Title } from '../../components/Title';
import { ProjectsContext, type Task } from '../../contexts/ProjectContext';
import { KanbanBoard } from '../../components/KanbanBoard';
import api, { deleteTask } from '../../services/api'; 
import { KanbanContainer } from './styles';
import { PageLoader } from '../../components/PageLoader';
import { TaskDetailsModal } from '../../components/TaskDetailsModal'; 

export function Kanban() {
  const { tasks, refreshData, loading } = useContext(ProjectsContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
      refreshData();
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
        await deleteTask(taskId);
        alert('Tarefa excluída com sucesso!');
        handleCloseModal(); 
        refreshData(); 
    } catch (error) {
        alert('Falha ao excluir a tarefa.');
        console.error(error);
    }
  };

  const columns = useMemo(() => {
    const statuses = ['não iniciada', 'em andamento', 'concluída', 'congelada'];
    return statuses.map(status => ({
      id: status,
      title: columnMapping[status],
      tasks: tasks.filter(task => task.status === status)
                   .sort((a, b) => new Date(a.prazo || a.data_fim || 0).getTime() - new Date(b.prazo || b.data_fim || 0).getTime())
    }));
  }, [tasks]);

  return (
    <KanbanContainer>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Title>Quadro Kanban</Title>
          <KanbanBoard 
            columns={columns} 
            onTaskMove={onTaskMove}
            onTaskClick={handleTaskClick} 
          />
        </>
      )}

      <TaskDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask as any} 
        onDelete={handleDeleteTask}
      />
    </KanbanContainer>
  );
}