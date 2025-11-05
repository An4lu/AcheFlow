import { useContext, useMemo } from 'react';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { Card, CardTitle } from '../Dashboard/styles';
import { EventList, EventItem, EventDate, EventInfo } from './styles';
import { CalendarBlankIcon } from '@phosphor-icons/react';
import { theme } from '../../styles';
import { Placeholder } from '../MyTasks/styles';

export function UpcomingEvents() {
    const { events } = useContext(ProjectsContext);

    const upcomingEvents = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return events
            .filter(event => new Date(event.data_hora_evento) >= today)
            .sort((a, b) => new Date(a.data_hora_evento).getTime() - new Date(b.data_hora_evento).getTime())
            .slice(0, 5); // Limita a 5 eventos
    }, [events]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            day: date.toLocaleDateString('pt-BR', { day: '2-digit' }),
            month: date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
            time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        <Card>
            <CalendarBlankIcon size={32} weight="light" color={theme.colors.brandPrimary.value} />
            <CardTitle>Próximos Eventos</CardTitle>

            {upcomingEvents.length === 0 ? (
                <Placeholder>Nenhum evento agendado.</Placeholder>
            ) : (
                <EventList>
                    {upcomingEvents.map(event => {
                        const { day, month, time } = formatDate(event.data_hora_evento);
                        return (
                            <EventItem key={event._id}>
                                <EventDate>
                                    <span>{day}</span>
                                    <span>{month}</span>
                                </EventDate>
                                <EventInfo>
                                    <span>{event.tipoEvento}</span>
                                    <span>{time}h</span>
                                </EventInfo>
                            </EventItem>
                        );
                    })}
                </EventList>
            )}
        </Card>
    );
}