import { useContext, useMemo } from 'react';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { Card, CardTitle } from '../Dashboard/styles';
import { EventList, EventItem, EventDate, EventInfo } from './styles';
import { FolderNotchIcon } from '@phosphor-icons/react';
import { theme } from '../../styles';
import { Placeholder } from '../MyTasks/styles';

const getDaysRemaining = (dateStr: string): number => {
    if (!dateStr) return 0; 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(dateStr + 'T00:00:00Z'); 
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export function UpcomingEvents() {
    const { projects } = useContext(ProjectsContext);

    const upcomingProjects = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const futureLimit = new Date();
        futureLimit.setDate(today.getDate() + 30); 

        return projects
            .filter(project => {
                if (!project.prazo || project.situacao === 'Concluído') {
                    return false;
                }
                
                const projectDeadline = new Date(project.prazo + 'T00:00:00Z');
                
                return projectDeadline >= today && projectDeadline <= futureLimit;
            })
            .sort((a, b) => new Date(a.prazo).getTime() - new Date(b.prazo).getTime())
            .slice(0, 5); 
    }, [projects]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00Z'); 
        return {
            day: date.toLocaleDateString('pt-BR', { day: '2-digit', timeZone: 'UTC' }),
            month: date.toLocaleDateString('pt-BR', { month: 'short', timeZone: 'UTC' }).replace('.', ''),
        };
    };

    return (
        <Card>
            <FolderNotchIcon size={32} weight="light" color={theme.colors.brandPrimary.value} />
            <CardTitle>Prazos de Projetos (30 dias)</CardTitle>

            {upcomingProjects.length === 0 ? (
                <Placeholder>Nenhum projeto com prazo nos próximos 30 dias.</Placeholder>
            ) : (
                <EventList>
                    {upcomingProjects.map(project => {
                        const { day, month } = formatDate(project.prazo);
                        const daysLeft = getDaysRemaining(project.prazo);

                        return (
                            <EventItem key={project._id}>
                                <EventDate>
                                    <span>{day}</span>
                                    <span>{month}</span>
                                </EventDate>
                                <EventInfo>
                                    <span>{project.nome}</span>
                                    <span style={{ color: theme.colors.textSecondary.value, fontSize: '13px' }}>
                                        Resp: {project.responsavel?.nome || 'N/D'} (Vence em {daysLeft}d)
                                    </span>
                                </EventInfo>
                            </EventItem>
                        );
                    })}
                </EventList>
            )}
        </Card>
    );
}