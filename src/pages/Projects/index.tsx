import { useState, useEffect, useContext, useMemo } from 'react';
import { Title } from '../../components/Title';
import { Container, Header, ActionButton, ExportButton, HeaderActions, ChartArea, Placeholder, ViewSwitcher, ViewButton } from './styles';
import { GanttChart } from '../../components/GanttChart';
import { ProjectFilters, type ActiveFilters, type FilterValues } from '../../components/ProjectFilters';
import { ProjectsContext } from '../../contexts/ProjectContext'; // Importa Task do contexto
import { updateTask, deleteTask, type TaskUpdatePayload } from '../../services/api';
import { transformDataForGantt } from '../../utils/dataTransformer';
import { TaskEditModal } from '../../components/TaskEditModal';
import { ViewMode, type Task } from 'gantt-task-react';
import { PageLoader } from '../../components/PageLoader';
import { toast } from 'react-toastify';
import { DownloadSimpleIcon } from '@phosphor-icons/react';
import * as XLSX from 'xlsx';

interface TaskResponsavel {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
}
export interface ApiTask {
  _id: string;
  nome: string;
  dataCriacao?: string;
  data_inicio?: string;
  prazo?: string;
  data_fim?: string;
  descricao?: string | null;
  projeto: { id: string; nome: string; };
  responsavel: TaskResponsavel;
  status: string;
  classificacao?: string;
  fase?: string;
  condicao?: string;
  percentual_concluido?: number;
}

export const VisaoGeral = () => {
  const {
    openProjectModal,
    projects: allProjects,
    refreshData,
    loading: contextLoading,
    tasks: allTasks
  } = useContext(ProjectsContext);

  const [filteredTasks, setFilteredTasks] = useState<ApiTask[]>([]);
  const [isFiltering, setIsFiltering] = useState(true);
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
    if (contextLoading) {
      setIsFiltering(true);
      return;
    }
    setIsFiltering(true);

    let processedTasks: ApiTask[] = [...allTasks] as ApiTask[];

    if (activeFilters.projeto && filterValues.projeto_id) {
      processedTasks = processedTasks.filter(task => task.projeto?.id === filterValues.projeto_id);
    }
    if (activeFilters.responsavel && filterValues.responsavel_id) {
      processedTasks = processedTasks.filter(task => task.responsavel?.id === filterValues.responsavel_id);
    }
    if (activeFilters.urgencia) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      processedTasks = processedTasks.filter((task) => {
        const dataFim = new Date((task.prazo || task.data_fim) + 'T00:00:00Z');
        return dataFim < now && task.status?.toLowerCase() !== 'concluída';
      });
    }
    if (activeFilters.prazo && filterValues.startDate && filterValues.endDate) {
      const start = new Date(filterValues.startDate + 'T00:00:00Z');
      const end = new Date(filterValues.endDate + 'T23:59:59Z');
      processedTasks = processedTasks.filter((task) => {
        const taskDate = new Date((task.prazo || task.data_fim) + 'T00:00:00Z');
        return taskDate >= start && taskDate <= end;
      });
    }

    processedTasks.sort((a, b) => {
      const dateA = new Date((a.prazo || a.data_fim) + 'T00:00:00Z').getTime();
      const dateB = new Date((b.prazo || b.data_fim) + 'T00:00:00Z').getTime();
      return dateA - dateB;
    });

    setFilteredTasks(processedTasks);
    setIsFiltering(false);

  }, [filterValues, activeFilters, allTasks, contextLoading]);

  const handleTaskClick = (task: Task) => {
    const foundTask = filteredTasks.find(t => t._id === task.id);
    if (foundTask) {
      setSelectedTask(foundTask);
      setEditModalOpen(true);
    }
  };

  const handleUpdateTask = async (taskId: string, payload: TaskUpdatePayload) => {
    try {
      await updateTask(taskId, payload);
      toast.success('Tarefa atualizada com sucesso!');
      setEditModalOpen(false);
      refreshData();
    } catch (error) {
      toast.error('Falha ao atualizar a tarefa.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success('Tarefa excluída com sucesso!');
      setEditModalOpen(false);
      refreshData(); // Atualiza o contexto
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        toast.error('Erro 404: A API (backend) não encontrou a rota de exclusão.');
      } else {
        toast.error('Falha ao excluir a tarefa.');
      }
    }
  };

  const handleClientExport = () => {
    try {
      // 1. Formata os dados (usando as tarefas já filtradas na tela)
      const dataToExport = filteredTasks.map(task => ({
        'Projeto': task.projeto.nome,
        'Tarefa': task.nome,
        'Responsável': `${task.responsavel.nome} ${task.responsavel.sobrenome || ''}`.trim(),
        'Início': (task.dataCriacao || task.data_inicio)?.split('T')[0] || 'N/D',
        'Prazo': (task.prazo || task.data_fim)?.split('T')[0] || 'N/D',
        'Status': task.status,
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Tarefas");

      XLSX.writeFile(wb, "Relatorio_Tarefas_Gantt.xlsx");

      toast.success("Relatório gerado com sucesso!");

    } catch (error) {
      toast.error("Falha ao gerar o relatório Excel.");
    }
  };


  const ganttData = useMemo(() => {
    const relevantProjectIds = new Set(filteredTasks.map(task => task.projeto?.id).filter(Boolean));
    const visibleProjects = allProjects.filter(p => relevantProjectIds.has(p._id));
    return transformDataForGantt(visibleProjects, filteredTasks);
  }, [filteredTasks, allProjects]);

  const isLoading = contextLoading || isFiltering;

  return (
    <Container>
      <Header>
        <Title>Visão Geral (Gantt)</Title>
        <ViewSwitcher>
          <ViewButton active={view === ViewMode.Day} onClick={() => setView(ViewMode.Day)}>Dia</ViewButton>
          <ViewButton active={view === ViewMode.Week} onClick={() => setView(ViewMode.Week)}>Semana</ViewButton>
          <ViewButton active={view === ViewMode.Month} onClick={() => setView(ViewMode.Month)}>Mês</ViewButton>
        </ViewSwitcher>

        <HeaderActions>
          <ExportButton onClick={handleClientExport}>
            <DownloadSimpleIcon size={20} />
            Exportar (Excel)
          </ExportButton>
          <ActionButton onClick={openProjectModal}>
            + Novo Projeto
          </ActionButton>
        </HeaderActions>
      </Header>

      <ProjectFilters
        activeFilters={activeFilters}
        filterValues={filterValues}
        onToggleFilter={(name) => setActiveFilters(prev => ({ ...prev, [name]: !prev[name] }))}
        onFilterValueChange={(name, value) => setFilterValues(prev => ({ ...prev, [name]: value }))}
      />

      <ChartArea>
        {isLoading ? (
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