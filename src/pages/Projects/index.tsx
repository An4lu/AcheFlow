import { useState, useEffect, useContext, useMemo } from 'react';
import { Title } from '../../components/Title';
import { Container, Header, ActionButton, ChartArea, Placeholder } from './styles';
import { GanttChart } from '../../components/GanttChart';
import { ProjectFilters, type ActiveFilters, type FilterValues } from '../../components/ProjectFilters';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { getFilteredTasks, type TaskFilterParams } from '../../services/api';
import { transformDataForGantt } from '../../utils/dataTransformer';
import type { User } from '../../types/user';
import { TaskDetailsModal } from '../../components/TaskDetailsModal';
import type { Task } from 'gantt-task-react';

// Exportar a interface para que o modal possa usá-la
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
  const { openProjectModal, projects: allProjects } = useContext(ProjectsContext);
  const [tasks, setTasks] = useState<ApiTask[]>([]);
  const [loading, setLoading] = useState(true);

  // Novos estados para o modal de detalhes
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ApiTask | null>(null);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    projeto: false, responsavel: false, urgencia: false, prazo: false,
  });

  const [filterValues, setFilterValues] = useState<FilterValues>({
    projeto_id: '', responsavel_id: '', startDate: '', endDate: '',
  });

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const params: TaskFilterParams = {};
      if (activeFilters.projeto && filterValues.projeto_id) params.projeto_id = filterValues.projeto_id;
      if (activeFilters.responsavel && filterValues.responsavel_id) params.responsavel_id = filterValues.responsavel_id;
      if (activeFilters.urgencia) params.urgencia = true;

      try {
        const response = await getFilteredTasks(params);
        let fetchedTasks = response.data || [];

        if (activeFilters.prazo && filterValues.startDate && filterValues.endDate) {
          const start = new Date(filterValues.startDate + 'T00:00:00Z');
          const end = new Date(filterValues.endDate + 'T23:59:59Z');
          fetchedTasks = fetchedTasks.filter((task: ApiTask) => {
            const taskDate = new Date(task.prazo + 'T00:00:00Z');
            return taskDate >= start && taskDate <= end;
          });
        }
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Falha ao buscar tarefas:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [filterValues, activeFilters]);

  // Função para abrir o modal com os dados da tarefa clicada
  const handleTaskClick = (task: Task) => {
    const foundTask = tasks.find(t => t._id === task.id);
    if (foundTask) {
      setSelectedTask(foundTask);
      setDetailsModalOpen(true);
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
          <GanttChart data={ganttData} onTaskClick={handleTaskClick} />
        ) : (
          <Placeholder>Nenhuma tarefa encontrada. Tente ajustar os filtros.</Placeholder>
        )}
      </ChartArea>

      <TaskDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        task={selectedTask}
      />
    </Container>
  );
};