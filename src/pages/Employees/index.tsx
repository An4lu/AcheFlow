import { useContext, useMemo } from 'react';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { PageLoader } from '../../components/PageLoader';
import { Title } from '../../components/Title';
import { Container, Header, EmployeeGrid, EmployeeCard, EmployeeHeader, EmployeeInfo, EmployeeName, EmployeeRole, Stats, Stat, ProjectList, ProjectTag } from './styles';
import { User, Briefcase, CheckCircle } from '@phosphor-icons/react';
import { theme } from '../../styles';

export function Employees() {
    const { funcionarios, projects, tasks, loading } = useContext(ProjectsContext);

    // Mapeia projetos e tarefas para cada funcionário
    const employeeData = useMemo(() => {
        // A lista 'funcionarios' usa "_id"
        return funcionarios.map(func => {

            // 1. Projetos que o funcionário gerencia
            // A lista 'projects' usa 'responsavel.id'
            const managedProjects = projects.filter(
                p => p.responsavel?.id === func._id
            );

            // 2. Tarefas pelas quais o funcionário é responsável
            // A lista 'tasks' usa 'responsavel.id'
            const assignedTasks = tasks.filter(
                t => t.responsavel?.id === func._id
            );

            // 3. Tarefas concluídas por ele
            const completedTasks = assignedTasks.filter(
                t => t.status === 'concluída'
            ).length;

            // 4. Projetos únicos nos quais o funcionário tem tarefas
            const involvedInProjects = assignedTasks.reduce((acc, task) => {
                if (task.projeto && !acc.has(task.projeto.id)) {
                    acc.set(task.projeto.id, task.projeto.nome);
                }
                return acc;
            }, new Map<string, string>());

            // Adiciona os projetos que ele gerencia à lista
            managedProjects.forEach(proj => {
                if (!involvedInProjects.has(proj._id)) {
                    involvedInProjects.set(proj._id, proj.nome);
                }
            });

            return {
                ...func,
                managedProjectsCount: managedProjects.length,
                assignedTasksCount: assignedTasks.length,
                completedTasksCount: completedTasks,
                involvedInProjects: Array.from(involvedInProjects.entries()),
            };
        });
    }, [funcionarios, projects, tasks]);

    return (
        <Container>
            <Header>
                <Title>Equipe e Responsabilidades</Title>
            </Header>

            {loading ? (
                <PageLoader />
            ) : (
                <EmployeeGrid>
                    {employeeData.map(func => (
                        <EmployeeCard key={func._id}>
                            <EmployeeHeader>
                                <User size={32} weight="light" color={theme.colors.brandPrimary.value} />
                                <EmployeeInfo>
                                    <EmployeeName>{func.nome} {func.sobrenome}</EmployeeName>
                                    <EmployeeRole>{func.cargo}</EmployeeRole>
                                </EmployeeInfo>
                            </EmployeeHeader>
                            <Stats>
                                <Stat>
                                    <Briefcase size={20} weight="light" />
                                    {func.assignedTasksCount} {func.assignedTasksCount === 1 ? 'Tarefa Atribuída' : 'Tarefas Atribuídas'}
                                </Stat>
                                <Stat>
                                    <CheckCircle size={20} weight="light" color={theme.colors.success.value} />
                                    {func.completedTasksCount} Tarefas Concluídas
                                </Stat>
                            </Stats>
                            <ProjectList>
                                <h4>Projetos Envolvido(a):</h4>
                                {func.involvedInProjects.length > 0 ? (
                                    <div>
                                        {func.involvedInProjects.map(([id, nome]) => (
                                            <ProjectTag key={id} isManager={projects.some(p => p._id === id && p.responsavel?.id === func._id)}>
                                                {nome}
                                            </ProjectTag>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Nenhum projeto no momento.</p>
                                )}
                            </ProjectList>
                        </EmployeeCard>
                    ))}
                </EmployeeGrid>
            )}
        </Container>
    );
}