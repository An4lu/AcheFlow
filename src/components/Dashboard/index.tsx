import { BriefcaseIcon, ChartLineUpIcon, UserFocusIcon, WarningCircleIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { Chart } from "react-google-charts";
import { Card, CardGrid, CardTitle, CardValue, CompletedList, CompletedListItem, Container, ChartContainer, OverdueList, OverdueListItem } from './styles';
import { theme } from '../../styles';

interface DashboardProps {
    totalProjects: number;
    inProgressProjects: number;
    completedProjects: string[];
    overdueTasks: { name: string, days: number }[];
    tasksByStatus: (string | number)[][];
    busiestEmployee: { name: string, count: number } | null;
}

const chartColors = [
    theme.colors.brandQuaternary.value, // #F46685
    theme.colors.brandSecondary.value,  // #FF7F2A
    theme.colors.success.value,         // #2E7D32
    theme.colors.textMuted.value        // #9E9E9E
];

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
                        <span style={{ fontSize: '14px', color: theme.colors.textSecondary.value }}>{busiestEmployee.count} tarefas</span>
                    </Card>
                )}

                <Card style={{ gridColumn: '1 / -1' }}>
                    <WarningCircleIcon size={32} weight="light" color={theme.colors.danger.value} />
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
                        <CardValue style={{ fontSize: '16px', marginTop: '1rem', color: theme.colors.success.value }}>Nenhuma tarefa vencida!</CardValue>
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
                            colors: chartColors, 
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