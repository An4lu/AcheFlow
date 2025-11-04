import { useContext, useMemo } from 'react';
import { Title } from "../../components/Title";
import { ProjectsContext } from '../../contexts/ProjectContext';
import { useAuth } from '../../hooks/useAuth';
import { Container, Header, DailyGrid } from "./styles"; // Importa DailyGrid
import { Dashboard } from '../../components/Dashboard';
import { PageLoader } from '../../components/PageLoader'; // Importa Loader
import { MyTasks } from '../../components/MyTasks'; // Importa Novo Componente
import { UpcomingDeadlines } from '../../components/UpcomingDeadlines'; // Importa Novo Componente
import { UpcomingEvents } from '../../components/UpcomingEvents'; // Importa Novo Componente

export const Home = () => {
  const { user } = useAuth();
  // Adiciona 'loading' do contexto
  const { projects, tasks, funcionarios, loading } = useContext(ProjectsContext);

  const dashboardMetrics = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // --- Métricas de Projetos ---
    const totalProjects = projects.length;
    const inProgressProjects = projects.filter(p => p.situacao?.toLowerCase() === 'em andamento').length;
    const completedProjects = projects.filter(p => p.situacao?.toLowerCase() === 'concluído').map(p => p.nome);

    // --- Métricas de Tarefas ---
    const overdueTasks = tasks
      .filter(task => {
        const dataFim = new Date(task.data_fim + 'T00:00:00Z');
        return dataFim < now && task.status?.toLowerCase() !== 'concluída';
      })
      .map(task => {
        const dataFim = new Date(task.data_fim + 'T00:00:00Z');
        const diffTime = Math.abs(now.getTime() - dataFim.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { name: task.nome, days: diffDays };
      })
      .slice(0, 5);

    const statusCounts = tasks.reduce((acc, task) => {
      const status = task.status?.toLowerCase() || 'desconhecido';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const tasksByStatus = [
      ['Status', 'Quantidade'],
      ['Não Iniciada', statusCounts['não iniciada'] || 0],
      ['Em Andamento', statusCounts['em andamento'] || 0],
      ['Concluída', statusCounts['concluída'] || 0],
      ['Congelada', statusCounts['congelada'] || 0],
      ['Desconhecido', statusCounts['desconhecido'] || 0],
    ];

    const taskCountsByEmployee = tasks.reduce((acc, task) => {
      if (task.responsavel?._id) {
        acc[task.responsavel._id] = (acc[task.responsavel._id] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const busiestEmployeeId = Object.keys(taskCountsByEmployee).sort((a, b) => taskCountsByEmployee[b] - taskCountsByEmployee[a])[0];
    const busiestEmployee = funcionarios.find(f => f._id === busiestEmployeeId);

    const busiestEmployeeData = busiestEmployee ? {
      name: busiestEmployee.nome,
      count: taskCountsByEmployee[busiestEmployeeId]
    } : null;


    return { totalProjects, inProgressProjects, completedProjects, overdueTasks, tasksByStatus, busiestEmployee: busiestEmployeeData };
  }, [projects, tasks, funcionarios]);

  return (
    <Container>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Header>
            <Title>Bem-vindo(a) de volta, {user?.nome}!</Title>
          </Header>
          <Dashboard
            totalProjects={dashboardMetrics.totalProjects}
            inProgressProjects={dashboardMetrics.inProgressProjects}
            completedProjects={dashboardMetrics.completedProjects}
            overdueTasks={dashboardMetrics.overdueTasks}
            tasksByStatus={dashboardMetrics.tasksByStatus}
            busiestEmployee={dashboardMetrics.busiestEmployee}
          />

          <Title css={{ fontSize: '$2xl', marginTop: '$6' }}>Seu Dia a Dia</Title>
          <DailyGrid>
            <MyTasks />
            <UpcomingDeadlines />
            <UpcomingEvents />
          </DailyGrid>
        </>
      )}
    </Container>
  );
}