import { useContext, useMemo } from 'react';
import { Title } from "../../components/Title";
import { ProjectsContext } from '../../contexts/ProjectContext';
import { useAuth } from '../../hooks/useAuth';
import { Container, Header } from "./styles";
import { Dashboard } from '../../components/Dashboard';

export const Home = () => {
  const { user } = useAuth();
  const { projects } = useContext(ProjectsContext);

  // Calcula as métricas usando useMemo para otimização
  const dashboardMetrics = useMemo(() => {
    const totalProjects = projects.length;

    const inProgressProjects = projects.filter(p =>
      p.situacao.toLowerCase() === 'em andamento'
    ).length;

    const planningProjects = projects.filter(p =>
      p.situacao.toLowerCase() === 'em planejamento'
    ).length;

    const completedProjects = projects
      .filter(p => p.situacao.toLowerCase() === 'concluído')
      .map(p => p.nome);

    return { totalProjects, inProgressProjects, planningProjects, completedProjects };
  }, [projects]);

  return (
    <Container>
      <Header>
        <Title>Bem-vindo(a) de volta, {user?.nome}!</Title>
      </Header>
      <Dashboard
        totalProjects={dashboardMetrics.totalProjects}
        inProgressProjects={dashboardMetrics.inProgressProjects}
        planningProjects={dashboardMetrics.planningProjects}
        completedProjects={dashboardMetrics.completedProjects}
      />
    </Container>
  );
}