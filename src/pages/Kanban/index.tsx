import { useContext, useMemo, useState } from 'react';
import { Title } from '../../components/Title';
import { ProjectsContext, type Task } from '../../contexts/ProjectContext';
import { KanbanBoard } from '../../components/KanbanBoard';
import { deleteTask, updateTask, type TaskUpdatePayload } from '../../services/api'; // 'api' não é mais necessário
import { KanbanContainer, Header, FilterSelect } from './styles';
import { PageLoader } from '../../components/PageLoader';
import { TaskEditModal } from '../../components/TaskEditModal';
import { type ApiTask } from '../Projects'; 

export function Kanban() {
  const { tasks, refreshData, loading, funcionarios } = useContext(ProjectsContext);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTaskEdit, setSelectedTaskEdit] = useState<ApiTask | null>(null);

  const [selectedResponsavelId, setSelectedResponsavelId] = useState<string>('');

  const columnMapping: Record<string, string> = {
    'não iniciada': 'Não Iniciada',
    'em andamento': 'Em Andamento',
    'concluída': 'Concluída',
    'congelada': 'Congelada',
  };

  const handleEditClick = (task: Task) => {
    setSelectedTaskEdit(task as ApiTask); 
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedTaskEdit(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
        await deleteTask(taskId);
        alert('Tarefa excluída com sucesso!');
        handleCloseEditModal();   
        refreshData(); 
    } catch (error) {
        alert('Falha ao excluir a tarefa.');
        console.error(error);
    }
  };

  // Handler para SALVAR a edição
  const handleUpdateTask = async (taskId: string, payload: TaskUpdatePayload) => {
    try {
      await updateTask(taskId, payload);
      alert('Tarefa atualizada com sucesso!');
      handleCloseEditModal();
      refreshData();
    } catch (error) {
      alert('Falha ao atualizar a tarefa.');
      console.error(error);
    }
  };

  const columns = useMemo(() => {
    const statuses = ['não iniciada', 'em andamento', 'concluída', 'congelada'];

    const tasksToShow = tasks.filter(task => {
        if (selectedResponsavelId === '') {
            return true;
        }
        return task.responsavel?.id === selectedResponsavelId;
    });

    return statuses.map(status => ({
      id: status,
      title: columnMapping[status],
      tasks: tasksToShow.filter(task => task.status === status)
                   .sort((a, b) => new Date(a.prazo || a.data_fim || 0).getTime() - new Date(b.prazo || b.data_fim || 0).getTime())
    }));
  }, [tasks, selectedResponsavelId]);

  return (
    <KanbanContainer>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Header>
            <Title>Quadro Kanban</Title>
            <FilterSelect 
              value={selectedResponsavelId} 
              onChange={(e) => setSelectedResponsavelId(e.target.value)}
            >
              <option value="">Todos os Responsáveis</option>
              {funcionarios.map(func => (
                <option key={func._id} value={func._id}>
                  {func.nome} {func.sobrenome}
                </option>
              ))}
            </FilterSelect>
          </Header>
          
          <KanbanBoard 
            columns={columns} 
            onEditClick={handleEditClick}  
          />
        </>
      )}


      <TaskEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        task={selectedTaskEdit}
        onSave={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </KanbanContainer>
  );
}