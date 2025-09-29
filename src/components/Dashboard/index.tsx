import { BriefcaseIcon, ChartLineUpIcon, CheckCircleIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react';
import { Card, CardGrid, CardTitle, CardValue, CompletedList, CompletedListItem, Container } from './styles';

interface DashboardProps {
    totalProjects: number;
    inProgressProjects: number;
    planningProjects: number;
    completedProjects: string[];
}

export function Dashboard({
    totalProjects,
    inProgressProjects,
    planningProjects,
    completedProjects,
}: DashboardProps) {
    return (
        <Container>
            <CardGrid>
                {/* Card: Total de Projetos */}
                <Card>
                    <BriefcaseIcon size={32} weight="light" />
                    <CardTitle>Total de Projetos</CardTitle>
                    <CardValue>{totalProjects}</CardValue>
                </Card>

                {/* Card: Projetos em Andamento */}
                <Card>
                    <ChartLineUpIcon size={32} weight="light" />
                    <CardTitle>Em Andamento</CardTitle>
                    <CardValue>{inProgressProjects}</CardValue>
                </Card>

                {/* Card: Projetos em Planejamento (Sugestão) */}
                <Card>
                    <PaperPlaneTiltIcon size={32} weight="light" />
                    <CardTitle>Em Planejamento</CardTitle>
                    <CardValue>{planningProjects}</CardValue>
                </Card>

                {/* Card: Projetos Concluídos */}
                <Card style={{ gridColumn: 'span 2' }}>
                    <CheckCircleIcon size={32} weight="light" />
                    <CardTitle>Projetos Concluídos Recentemente</CardTitle>
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