import { useContext, useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { FileUploader } from '../../components/FileUploader'; // Importando com o nome correto
import { CalendarContainer } from './styles';
import { ProjectsContext, type Task } from '../../contexts/ProjectContext';
import { Title } from '../../components/Title';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resource: {
    projectName: string;
  };
}

export const Calendar = () => {
  const { projects, addProject } = useContext(ProjectsContext);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const allEvents: CalendarEvent[] = [];
    projects.forEach(project => {
      const projectEvents = project.tasks
        .filter(task => task.Nome && task.Duração)
        .map(task => {
          const startDate = new Date();
          const durationMatch = task.Duração.match(/(\d+)/);
          const durationInDays = durationMatch ? parseInt(durationMatch[0], 10) : 1;
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + durationInDays);

          return {
            title: task.Nome,
            start: startDate,
            end: endDate,
            resource: { projectName: project.name },
          };
        });
      allEvents.push(...projectEvents);
    });
    setEvents(allEvents);
  }, [projects]);

  const handleDataLoaded = (projectName: string, tasks: Task[]) => {
    addProject({ name: projectName, tasks });
  };

  return (
    <CalendarContainer>
      <Title>Calendário de Projetos</Title>
      <FileUploader onDataLoaded={handleDataLoaded} />
      <div style={{ height: '70vh' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
          }}
        />
      </div>
    </CalendarContainer>
  );
};