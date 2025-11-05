import { useContext, useMemo, useState } from 'react';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { PageLoader } from '../../components/PageLoader';
import { Title } from '../../components/Title';
import { Container, Header, EmployeeGrid, EmployeeCard, EmployeeHeader, EmployeeInfo, EmployeeName, EmployeeRole, Stats, Stat, ProjectList, ProjectTag, ActionButton, DeleteButton } from './styles';
import { BriefcaseIcon, CheckCircleIcon, TrashIcon, UserIcon, UserPlusIcon } from '@phosphor-icons/react';
import { theme } from '../../styles';
import { deleteFuncionario } from '../../services/api';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import type { User as UserType } from '../../types/user';

export function Employees() {
    const { funcionarios, projects, tasks, loading, refreshData, openEmployeeModal } = useContext(ProjectsContext);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedFunc, setSelectedFunc] = useState<UserType | null>(null);

    const employeeData = useMemo(() => {
        return funcionarios.map(func => {
            const managedProjects = projects.filter(
                p => p.responsavel?.id === func._id
            );
            const assignedTasks = tasks.filter(
                t => t.responsavel?.id === func._id
            );
            const completedTasks = assignedTasks.filter(
                t => t.status === 'concluída'
            ).length;
            const involvedInProjects = assignedTasks.reduce((acc, task) => {
                if (task.projeto && !acc.has(task.projeto.id)) {
                    acc.set(task.projeto.id, task.projeto.nome);
                }
                return acc;
            }, new Map<string, string>());
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

    const handleDeleteClick = (func: UserType) => {
        setSelectedFunc(func);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedFunc) return;

        try {
            await deleteFuncionario(selectedFunc._id);
            alert('Funcionário excluído com sucesso!');
            refreshData();
        } catch (err: any) {
            console.error("Falha ao excluir funcionário:", err);
            alert(err.response?.data?.detalhe || 'Não foi possível excluir o funcionário.');
        } finally {
            setIsConfirmOpen(false);
            setSelectedFunc(null);
        }
    };


    return (
        <Container>
            <Header>
                <Title>Equipe e Responsabilidades</Title>
                <ActionButton onClick={openEmployeeModal}>
                    <UserPlusIcon size={20} weight="bold" />
                    Novo Funcionário
                </ActionButton>
            </Header>

            {loading ? (
                <PageLoader />
            ) : (
                <EmployeeGrid>
                    {employeeData.map(func => (
                        <EmployeeCard key={func._id}>
                            <DeleteButton onClick={() => handleDeleteClick(func)}>
                                <TrashIcon size={20} />
                            </DeleteButton>

                            <EmployeeHeader>
                                <UserIcon size={32} weight="light" color={theme.colors.brandPrimary.value} />
                                <EmployeeInfo>
                                    <EmployeeName>{func.nome} {func.sobrenome}</EmployeeName>
                                    <EmployeeRole>{func.cargo}</EmployeeRole>
                                </EmployeeInfo>
                            </EmployeeHeader>
                            <Stats>
                                <Stat>
                                    <BriefcaseIcon size={20} weight="light" />
                                    {func.assignedTasksCount} {func.assignedTasksCount === 1 ? 'Tarefa Atribuída' : 'Tarefas Atribuídas'}
                                </Stat>
                                <Stat>
                                    <CheckCircleIcon size={20} weight="light" color={theme.colors.success.value} />
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

            <ConfirmDeleteModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Exclusão"
                message={`Tem certeza que deseja excluir o funcionário ${selectedFunc?.nome} ${selectedFunc?.sobrenome}? Esta ação não pode ser desfeita.`}
            />
        </Container>
    );
}