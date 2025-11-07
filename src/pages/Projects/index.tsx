import { useState, useEffect, useContext, useMemo } from 'react';
import { Title } from '../../components/Title';
import { Container, Header, ActionButton, ChartArea, Placeholder, ViewSwitcher, ViewButton } from './styles';
import { GanttChart } from '../../components/GanttChart';
import { ProjectFilters, type ActiveFilters, type FilterValues } from '../../components/ProjectFilters';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { getFilteredTasks, updateTask, deleteTask, type TaskFilterParams, type TaskUpdatePayload } from '../../services/api';
import { transformDataForGantt } from '../../utils/dataTransformer';
import { TaskEditModal } from '../../components/TaskEditModal';
import { ViewMode, type Task } from 'gantt-task-react';
import { PageLoader } from '../../components/PageLoader';

interface TaskResponsavel {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
}

// Interface corrigida para aceitar os dois tipos de data
export interface ApiTask {
  _id: string;
  nome: string;
  dataCriacao?: string; // Correção
  data_inicio?: string; // Antigo
  prazo?: string;       // Correção
  data_fim?: string;    // Antigo
  descricao: string | null;
  projeto: { id: string; nome: string; };
  responsavel: TaskResponsavel;
  status: string;
}

export const Project = () => {
  const { openProjectModal, projects: allProjects, refreshData, loading } = useContext(ProjectsContext);
  const [tasks, setTasks] = useState<ApiTask[]>([]);
  const [view, setView] = useState<ViewMode>(ViewMode.Day);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ApiTask | null>(null);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    projeto: false, responsavel: false, urgencia: false, prazo: false,
  });

  const [filterValues, setFilterValues] = useState<FilterValues>({
    projeto_id: '', responsavel_id: '', startDate: '', endDate: '',
  });

  useEffect(() => {
    const fetchAndProcessTasks = async () => {

      const params: Omit<TaskFilterParams, 'urgencia'> = {};
      if (activeFilters.projeto && filterValues.projeto_id) params.projeto_id = filterValues.projeto_id;
      if (activeFilters.responsavel && filterValues.responsavel_id) params.responsavel_id = filterValues.responsavel_id;

      try {
        const response = await getFilteredTasks(params);
        let processedTasks = response.data || [];

        if (activeFilters.urgencia) {
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          processedTasks = processedTasks.filter((task: ApiTask) => {
            const dataFim = new Date((task.prazo || task.data_fim) + 'T00:00:00Z');
            return dataFim < now && task.status?.toLowerCase() !== 'concluída';
          });
        }

        if (activeFilters.prazo && filterValues.startDate && filterValues.endDate) {
          const start = new Date(filterValues.startDate + 'T00:00:00Z');
          const end = new Date(filterValues.endDate + 'T23:59:59Z');
          processedTasks = processedTasks.filter((task: ApiTask) => {
            const taskDate = new Date((task.prazo || task.data_fim) + 'T00:00:00Z');
            return taskDate >= start && taskDate <= end;
          });
        }

        processedTasks.sort((a: ApiTask, b: ApiTask) => {
            const dateA = new Date((a.prazo || a.data_fim) + 'T00:00:00Z').getTime();
            const dateB = new Date((b.prazo || b.data_fim) + 'T00:00:00Z').getTime();
            return dateA - dateB;
        });
        
        setTasks(processedTasks);
      } catch (error) {
        console.error("Falha ao buscar tarefas:", error);
        setTasks([]);
      }
    };

    fetchAndProcessTasks();
  }, [filterValues, activeFilters]);

  const handleTaskClick = (task: Task) => {
    const foundTask = tasks.find(t => t._id === task.id);
    if (foundTask) {
      setSelectedTask(foundTask);
      setEditModalOpen(true);
    }
  };

  const handleUpdateTask = async (taskId: string, payload: TaskUpdatePayload) => {
    try {
      await updateTask(taskId, payload);
      alert('Tarefa atualizada com sucesso!');
      setEditModalOpen(false);
      refreshData();
    } catch (error) {
      alert('Falha ao atualizar a tarefa.');
      console.error(error);
    }
  };

  // *** ADICIONADO ***
  const handleDeleteTask = async (taskId: string) => {
    try {
        await deleteTask(taskId);
        alert('Tarefa excluída com sucesso!');
        setEditModalOpen(false); // Fecha o modal
        refreshData(); // Atualiza os dados do contexto (e o gráfico)
    } catch (error) {
        alert('Falha ao excluir a tarefa.');
        console.error(error);
    }
  };

  const ganttData = useMemo(() => {
    const relevantProjectIds = new Set(tasks.map(task => task.projeto?.id).filter(Boolean));
    const visibleProjects = allProjects.filter(p => relevantProjectIds.has(p._id));
    return transformDataForGantt(visibleProjects, tasks);
  }, [tasks, allProjects]);

  return (
    <Container>
      <Header>
        <Title>Visão Geral dos Projetos</Title>
        <ViewSwitcher>
          <ViewButton active={view === ViewMode.Day} onClick={() => setView(ViewMode.Day)}>Dia</ViewButton>
          <ViewButton active={view === ViewMode.Week} onClick={() => setView(ViewMode.Week)}>Semana</ViewButton>
          <ViewButton active={view === ViewMode.Month} onClick={() => setView(ViewMode.Month)}>Mês</ViewButton>
        </ViewSwitcher>
        <ActionButton onClick={openProjectModal}>+ Novo Projeto</ActionButton>
      </Header>

      <ProjectFilters
        activeFilters={activeFilters}
        filterValues={filterValues}
        onToggleFilter={(name) => setActiveFilters(prev => ({ ...prev, [name]: !prev[name] }))}
        onFilterValueChange={(name, value) => setFilterValues(prev => ({ ...prev, [name]: value }))}
      />


      <ChartArea>
        {loading ? (
          <PageLoader />
        ) : ganttData.length > 0 ? (
          <GanttChart
            data={ganttData}
            onTaskClick={handleTaskClick}
            viewMode={view}
          />
        ) : (
          <Placeholder>Nenhuma tarefa encontrada. Tente ajustar os filtros.</Placeholder>
        )}
      </ChartArea>
      <TaskEditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        task={selectedTask}
        onSave={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </Container>
  );
};