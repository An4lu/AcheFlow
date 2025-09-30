import { useState, useEffect, useContext, useMemo } from 'react';
import { Title } from '../../components/Title';
import { Container, Header, ActionButton, ChartArea, Placeholder, ViewSwitcher, ViewButton } from './styles';
import { GanttChart } from '../../components/GanttChart';
import { ProjectFilters, type ActiveFilters, type FilterValues } from '../../components/ProjectFilters';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { getFilteredTasks, updateTask, type TaskFilterParams, type TaskUpdatePayload } from '../../services/api';
import { transformDataForGantt } from '../../utils/dataTransformer';
import type { User } from '../../types/user';
import { TaskEditModal } from '../../components/TaskEditModal';
import { ViewMode, type Task } from 'gantt-task-react';

export interface ApiTask {
  _id: string;
  nome: string;
  prazo: string;
  descricao: string | null;
  projeto: { id: string; nome: string; };
  responsavel: User;
  status: string;
}

export const Project = () => {
  const { openProjectModal, projects: allProjects, refreshData } = useContext(ProjectsContext);
  const [tasks, setTasks] = useState<ApiTask[]>([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
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
            const prazo = new Date(task.prazo + 'T00:00:00Z');
            return prazo < now && task.status.toLowerCase() !== 'concluída';
          });
        }

        if (activeFilters.prazo && filterValues.startDate && filterValues.endDate) {
          const start = new Date(filterValues.startDate + 'T00:00:00Z');
          const end = new Date(filterValues.endDate + 'T23:59:59Z');
          processedTasks = processedTasks.filter((task: ApiTask) => {
            const taskDate = new Date(task.prazo + 'T00:00:00Z');
            return taskDate >= start && taskDate <= end;
          });
        }

        processedTasks.sort((a: any, b: any) => new Date(a.prazo).getTime() - new Date(b.prazo).getTime());
        setTasks(processedTasks);
      } catch (error) {
        console.error("Falha ao buscar tarefas:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAndProcessTasks();
  }, [filterValues, activeFilters, refreshData]);

  const handleTaskDoubleClick = (task: Task) => {
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
      refreshData(); // Recarrega todos os dados para refletir a mudança
    } catch (error) {
      alert('Falha ao atualizar a tarefa.');
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
          <Placeholder>Carregando gráfico...</Placeholder>
        ) : ganttData.length > 0 ? (
          <GanttChart
            data={ganttData}
            onTaskClick={handleTaskDoubleClick}
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
      />
    </Container>
  );
};