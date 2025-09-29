import { BriefcaseIcon, ChartLineUpIcon, UserFocusIcon, WarningCircleIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { Chart } from "react-google-charts";
import { Card, CardGrid, CardTitle, CardValue, CompletedList, CompletedListItem, Container, ChartContainer, OverdueList, OverdueListItem } from './styles';

interface DashboardProps {
    totalProjects: number;
    inProgressProjects: number;
    completedProjects: string[];
    overdueTasks: { name: string, days: number }[];
    tasksByStatus: (string | number)[][];
    busiestEmployee: { name: string, count: number } | null;
}

export function Dashboard({
    totalProjects,
    inProgressProjects,
    completedProjects,
    overdueTasks,
    tasksByStatus,
    busiestEmployee
}: DashboardProps) {
    return (
        <Container>
            <CardGrid>
                <Card>
                    <BriefcaseIcon size={32} weight="light" />
                    <CardTitle>Total de Projetos</CardTitle>
                    <CardValue>{totalProjects}</CardValue>
                </Card>
                <Card>
                    <ChartLineUpIcon size={32} weight="light" />
                    <CardTitle>Em Andamento</CardTitle>
                    <CardValue>{inProgressProjects}</CardValue>
                </Card>
                {busiestEmployee && (
                    <Card>
                        <UserFocusIcon size={32} weight="light" />
                        <CardTitle>Funcionário Mais Ativo</CardTitle>
                        <CardValue style={{ fontSize: '1.8rem' }}>{busiestEmployee.name}</CardValue>
                        <span style={{ fontSize: '14px', color: '#666' }}>{busiestEmployee.count} tarefas</span>
                    </Card>
                )}

                <Card style={{ gridColumn: '1 / -1' }}>
                    <WarningCircleIcon size={32} weight="light" color="#c53030" />
                    <CardTitle>Tarefas com Prazo Vencido</CardTitle>
                    {overdueTasks.length > 0 ? (
                        <OverdueList>
                            {overdueTasks.map((task, index) => (
                                <OverdueListItem key={index}>
                                    {task.name} <span>({task.days} {task.days === 1 ? 'dia' : 'dias'} atrás)</span>
                                </OverdueListItem>
                            ))}
                        </OverdueList>
                    ) : (
                        <CardValue style={{ fontSize: '16px', marginTop: '1rem', color: '#38A169' }}>Nenhuma tarefa vencida!</CardValue>
                    )}
                </Card>

                <ChartContainer>
                    <CardTitle>Distribuição de Tarefas por Status</CardTitle>
                    <Chart
                        chartType="PieChart"
                        data={tasksByStatus}
                        width={"100%"}
                        height={"250px"}
                        options={{
                            pieHole: 0.4,
                            is3D: false,
                            legend: { position: 'bottom' },
                            colors: ['#F46685', '#FF7F2A', '#38A169', '#A0AEC0'], // Cores do seu tema
                            fontName: 'Outfit',
                        }}
                    />
                </ChartContainer>

                <Card style={{ gridRow: 'span 2' }}>
                    <CheckCircleIcon size={32} weight="light" />
                    <CardTitle>Projetos Concluídos</CardTitle>
                    {completedProjects.length > 0 ? (
                        <CompletedList>
                            {completedProjects.map((name, index) => (
                                <CompletedListItem key={index}>{name}</CompletedListItem>
                            ))}
                        </CompletedList>
                    ) : (
                        <CardValue style={{ fontSize: '16px', marginTop: '1rem' }}>Nenhum</CardValue>
                    )}
                </Card>
            </CardGrid>
        </Container>
    );
}