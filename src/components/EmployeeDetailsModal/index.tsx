import { useContext, useMemo } from 'react';
import { Modal } from '../Modal';
import { ProjectsContext,type Task } from '../../contexts/ProjectContext'; // Importa Task
import { DetailsContainer, DetailItem, Label, Value, StatsGrid } from './styles';
import { Stat, ProjectList, ProjectTag } from '../../pages/Employees/styles';
import { UserIcon, EnvelopeIcon, BriefcaseIcon, CalendarIcon, CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react';
import { theme } from '../../styles';

// Função helper para obter a data final (prazo ou data_fim)
const getEndDate = (task: Task) => (task.prazo || task.data_fim);

export function EmployeeDetailsModal() {
    const {
        isEmployeeDetailsModalOpen,
        closeEmployeeDetailsModal,
        selectedEmployee,
        tasks,
        projects
    } = useContext(ProjectsContext);

    // Calcula as estatísticas e listas do funcionário selecionado
    const employeeStats = useMemo(() => {
        if (!selectedEmployee) return null;

        const allTasks = tasks.filter(t => t.responsavel?.id === selectedEmployee._id);

        const completedTasks = allTasks.filter(t => t.status === 'concluída');

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const overdueTasks = allTasks.filter(t => {
            const endDateStr = getEndDate(t); // Correção
            if (!endDateStr) return false;
            
            const dataFim = new Date(endDateStr + 'T00:00:00Z');
            return dataFim < now && t.status !== 'concluída';
        });

        // Projetos que o funcionário gerencia
        const managedProjects = projects.filter(
            p => p.responsavel?.id === selectedEmployee._id
        );

        // Projetos em que o funcionário tem tarefas
        const involvedInProjects = allTasks.reduce((acc, task) => {
            if (task.projeto && !acc.has(task.projeto.id)) {
                acc.set(task.projeto.id, task.projeto.nome);
            }
            return acc;
        }, new Map<string, string>());

        // Adiciona os projetos gerenciados à lista
        managedProjects.forEach(proj => {
            if (!involvedInProjects.has(proj._id)) {
                involvedInProjects.set(proj._id, proj.nome);
            }
        });

        return {
            completedTasksCount: completedTasks.length,
            overdueTasksCount: overdueTasks.length,
            involvedInProjects: Array.from(involvedInProjects.entries()),
            isManager: (projectId: string) => managedProjects.some(p => p._id === projectId)
        };

    }, [selectedEmployee, tasks, projects]);

    if (!selectedEmployee || !employeeStats) {
        return null;
    }

    const registrationDate = new Date(selectedEmployee.dataCadastro).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });

    return (
        <Modal isOpen={isEmployeeDetailsModalOpen} onClose={closeEmployeeDetailsModal} title="Detalhes do Funcionário">
            <DetailsContainer>
                <DetailItem>
                    <Label><UserIcon size={16} /> Nome Completo</Label>
                    <Value>{selectedEmployee.nome} {selectedEmployee.sobrenome}</Value>
                </DetailItem>

                <DetailItem>
                    <Label><EnvelopeIcon size={16} /> Email</Label>
                    <Value>{selectedEmployee.email}</Value>
                </DetailItem>

                <DetailItem>
                    <Label><BriefcaseIcon size={16} /> Departamento / Cargo</Label>
                    <Value>{selectedEmployee.departamento} / {selectedEmployee.cargo}</Value>
                </DetailItem>

                <DetailItem>
                    <Label><CalendarIcon size={16} /> Data de Cadastro</Label>
                    <Value>{registrationDate}</Value>
                </DetailItem>

                <StatsGrid>
                    <Stat>
                        <CheckCircleIcon size={20} weight="light" color={theme.colors.success.value} />
                        {employeeStats.completedTasksCount} Tarefas Concluídas
                    </Stat>
                    <Stat>
                        <WarningCircleIcon size={20} weight="light" color={theme.colors.danger.value} />
                        {employeeStats.overdueTasksCount} Tarefas em Atraso
                    </Stat>
                </StatsGrid>

                <ProjectList>
                    <h4>Projetos Envolvido(a):</h4>
                    {employeeStats.involvedInProjects.length > 0 ? (
                        <div>
                            {employeeStats.involvedInProjects.map(([id, nome]) => (
                                <ProjectTag key={id} isManager={employeeStats.isManager(id)}>
                                    {nome}
                                </ProjectTag>
                            ))}
                        </div>
                    ) : (
                        <p>Nenhum projeto no momento.</p>
                    )}
                </ProjectList>

            </DetailsContainer>
        </Modal>
    );
}